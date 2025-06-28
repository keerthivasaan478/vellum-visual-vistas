
-- Update orders table to use PayPal instead of Stripe
ALTER TABLE public.orders 
DROP COLUMN stripe_session_id,
ADD COLUMN paypal_order_id TEXT,
ADD COLUMN paypal_payer_id TEXT;
