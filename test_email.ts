// This is a temporary script to test the email sending functionality directly.

const url = "https://xdronqrixomniqvakyov.supabase.co/functions/v1/send-confirmation";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhkcm9ucXJpeG9tbmlxdmFreW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNzk3MzEsImV4cCI6MjA2NjY1NTczMX0.x-AxFcfHoZsvx-AMXKbzjJU-LIvKDZLO6TwUkFO4etM";

const body = {
  email: "keerthivasanrajaram1@gmail.com",
  name: "Test User",
  orderId: "test-order-123",
};

console.log("Sending test request to the 'send-confirmation' function...");
console.log(`Recipient: ${body.email}`);

try {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${anonKey}`,
      "Content-Type": "application/json",
      // The anon key is often also passed as the apikey header for Supabase functions
      "apikey": anonKey,
    },
    body: JSON.stringify(body),
  });

  console.log(`\nResponse Status: ${response.status} ${response.statusText}`);
  const responseData = await response.json();
  console.log("Response Data:", responseData);

  if (response.ok) {
    console.log("\n✅ Test request sent successfully! Please check your email.");
  } else {
    console.error("\n❌ Test request failed. Check the 'send-confirmation' function logs in your Supabase dashboard for errors.");
  }
} catch (error) {
  console.error("\nAn error occurred while sending the request:", error);
}

export {}; 