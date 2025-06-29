# Progress

_This document will track what works, what's left to build, current status, and known issues._

## Current Status

### What Works
- **End-to-End PayPal Payment Flow:**
  - Users can fill out a form on the "Get Started" page.
  - The PayPal button is presented to the user.
  - The `create-paypal-order` function correctly creates an order.
  - The `capture-paypal-order` function securely processes the payment, saves the order details to the `orders` table (including the user's ID), and triggers a confirmation email.
  - The `send-confirmation` function is set up to send an email via Resend.
  - The user is redirected to a success or cancellation page based on the outcome.
- **Component & Page Structure:**
  - The frontend has a well-defined structure with reusable components and dedicated pages.

### What's Left to Build
- The next set of features is yet to be defined. See `activeContext.md` for potential next steps.

### Known Issues
- **Hardcoded PayPal Credentials:** To resolve configuration issues, the `VITE_PAYPAL_CLIENT_ID` has been temporarily hardcoded in `src/components/PayPalCheckout.tsx`, and the `PAYPAL_CLIENT_ID` has been hardcoded in the `supabase/functions/create-paypal-order/index.ts` function. This is a security risk and should be reverted to using only environment variables as soon as possible.
- **Manual Environment Setup:** Supabase environment variables (especially `PAYPAL_CLIENT_SECRET`) must be set correctly in the Supabase project dashboard.
- **Sandbox Environment:** The application is still configured to use the PayPal sandbox environment. This will need to be switched to production for a live release. 