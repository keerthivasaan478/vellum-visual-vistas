
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  email: string;
  name: string;
  orderId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, orderId }: ConfirmationEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Virtual Staging <onboarding@resend.dev>",
      to: [email],
      subject: "Your Virtual Home Staging Order Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #B28A5B;">Thank you for your order!</h1>
          
          <p>Dear ${name},</p>
          
          <p>We've received your payment for Virtual Home Staging services. Here are your order details:</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Order Details</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Service:</strong> Virtual Home Staging</p>
            <p><strong>Amount:</strong> $75.00</p>
            <p><strong>Status:</strong> Payment Confirmed</p>
          </div>
          
          <h3>What's Next?</h3>
          <ol>
            <li>Our team will review your order within 24 hours</li>
            <li>We'll contact you to gather any additional property photos needed</li>
            <li>Your virtually staged photos will be delivered within 3-5 business days</li>
          </ol>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>
          The Virtual Staging Team</p>
        </div>
      `,
    });

    console.log("Confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation function:", error);
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
