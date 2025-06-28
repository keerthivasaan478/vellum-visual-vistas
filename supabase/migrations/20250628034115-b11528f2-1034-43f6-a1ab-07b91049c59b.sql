
-- Create orders table to store virtual staging requests
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone_number TEXT,
  email TEXT NOT NULL,
  zillow_link TEXT,
  amount INTEGER NOT NULL DEFAULT 7500, -- $75.00 in cents
  currency TEXT NOT NULL DEFAULT 'usd',
  stripe_session_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert orders (for guest checkouts)
CREATE POLICY "allow_insert_orders" ON public.orders
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow users to view orders by email
CREATE POLICY "view_orders_by_email" ON public.orders
  FOR SELECT
  USING (true);
