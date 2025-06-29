CREATE TABLE public.orders (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    user_id uuid NULL,
    order_id text NOT NULL,
    payer_id text NULL,
    amount numeric NOT NULL,
    currency text NOT NULL,
    status text NOT NULL,
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders." ON public.orders
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id); 