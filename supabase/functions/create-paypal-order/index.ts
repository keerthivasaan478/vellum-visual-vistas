import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CreateOrderRequest {
  amount: string;
  currency: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, currency }: CreateOrderRequest = await req.json();

    const PAYPAL_CLIENT_ID = "AcQuA4YJmax_N2i6rjANleE3RCiFP7Bpvva15vruniaulpK7tIuiYTYdyw96A43UeFlRWLYI1kxM2lAN"; //Deno.env.get("PAYPAL_CLIENT_ID");
    const PAYPAL_CLIENT_SECRET = Deno.env.get("PAYPAL_CLIENT_SECRET");
    const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com"; // Use https://api-m.paypal.com for production

    console.log("Function is using PayPal Client ID:", PAYPAL_CLIENT_ID ? `${PAYPAL_CLIENT_ID.substring(0, 8)}...` : "Not Set");

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

    // Create PayPal order
    const orderResponse = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authData.access_token}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          amount: {
            currency_code: currency,
            value: amount,
          },
          description: "Virtual Home Staging Service",
        }],
        application_context: {
          return_url: `${req.headers.get("origin")}/payment-success`,
          cancel_url: `${req.headers.get("origin")}/payment-cancelled`,
        },
      }),
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      console.error("PayPal order creation error:", orderData);
      throw new Error("Failed to create PayPal order");
    }

    return new Response(JSON.stringify(orderData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in create-paypal-order function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
