import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CaptureOrderRequest {
  orderId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId }: CaptureOrderRequest = await req.json();

    const PAYPAL_CLIENT_ID = Deno.env.get("PAYPAL_CLIENT_ID");
    const PAYPAL_CLIENT_SECRET = Deno.env.get("PAYPAL_CLIENT_SECRET");
    const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com"; // Use https://api-m.paypal.com for production

    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("PayPal credentials not configured");
    }

    // Get PayPal access token
    const authResponse = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`)}`,
      },
      body: "grant_type=client_credentials",
    });

    const authData = await authResponse.json();

    if (!authResponse.ok) {
      console.error("PayPal auth error:", authData);
      throw new Error("Failed to authenticate with PayPal");
    }

    // Capture PayPal order
    const captureResponse = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authData.access_token}`,
      },
    });

    const captureData = await captureResponse.json();

    if (!captureResponse.ok) {
      console.error("PayPal capture error:", captureData);
      throw new Error("Failed to capture PayPal payment");
    }

    // Save order to Supabase and send confirmation
    try {
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      // Get user from JWT
      const user = await getUserFromRequest(req, supabaseAdmin);

      const purchase_unit = captureData.purchase_units?.[0];
      const payment = purchase_unit?.payments?.captures?.[0];

      if (!purchase_unit || !payment) {
        throw new Error("Invalid payment details from PayPal");
      }

      const { data: orderData, error: dbError } = await supabaseAdmin.from("orders").insert({
        order_id: captureData.id,
        payer_id: captureData.payer?.payer_id,
        amount: parseFloat(payment.amount?.value),
        currency: payment.amount?.currency_code,
        status: captureData.status,
        user_id: user.id,
      }).select().single();

      if (dbError) {
        console.error("Database insert error:", dbError);
        throw new Error("Failed to save order details");
      }

      // Invoke send-confirmation function
      const { error: functionError } = await supabaseAdmin.functions.invoke('send-confirmation', {
          body: {
              email: user.email,
              name: user.user_metadata?.full_name || 'Valued Customer',
              orderId: orderData.order_id,
          },
      });

      if (functionError) {
          console.error('Error invoking send-confirmation function:', functionError);
          // Don't throw here, as payment was successful. Log for reconciliation.
      }

    } catch (dbError) {
      console.error("Error during post-payment processing:", dbError);
      // Even if DB write or function invocation fails, the payment was successful.
      // This requires a reconciliation process.
      // For now, we'll log the error but still return success to the client.
    }

    return new Response(JSON.stringify(captureData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in capture-paypal-order function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

const getUserFromRequest = async (req: Request, supabaseAdmin: SupabaseClient) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
        throw new Error('Missing Authorization header');
    }
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error) {
        throw new Error('Invalid token');
    }
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

serve(handler);
