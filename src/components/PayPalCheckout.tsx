
import React, { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    paypal?: any;
  }
}

interface PayPalCheckoutProps {
  amount: string;
  onSuccess: (orderId: string, payerId: string) => void;
  onError: () => void;
}

const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({ amount, onSuccess, onError }) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const isRendered = useRef(false);

  useEffect(() => {
    const loadPayPalScript = () => {
      if (window.paypal && !isRendered.current) {
        renderPayPalButton();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&currency=USD`;
      script.addEventListener('load', () => {
        if (!isRendered.current) {
          renderPayPalButton();
        }
      });
      document.body.appendChild(script);
    };

    const renderPayPalButton = () => {
      if (!window.paypal || !paypalRef.current || isRendered.current) return;

      isRendered.current = true;

      window.paypal.Buttons({
        createOrder: async () => {
          try {
            const { data, error } = await supabase.functions.invoke('create-paypal-order', {
              body: {
                amount: amount,
                currency: 'USD'
              },
            });

            if (error) {
              console.error('Error creating PayPal order:', error);
              throw new Error('Failed to create PayPal order');
            }

            return data.id;
          } catch (error) {
            console.error('Error creating PayPal order:', error);
            toast.error('Failed to initialize payment. Please try again.');
            onError();
            throw error;
          }
        },
        onApprove: async (data: any) => {
          try {
            const { data: captureData, error } = await supabase.functions.invoke('capture-paypal-order', {
              body: {
                orderId: data.orderID,
              },
            });

            if (error) {
              console.error('Error capturing PayPal payment:', error);
              throw new Error('Failed to capture PayPal payment');
            }
            
            // Extract payer ID from the capture response
            const payerId = captureData.payer?.payer_id || captureData.payer?.id || 'unknown';
            
            onSuccess(data.orderID, payerId);
          } catch (error) {
            console.error('Error capturing PayPal payment:', error);
            toast.error('Payment capture failed. Please contact support.');
            onError();
          }
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          toast.error('Payment failed. Please try again.');
          onError();
        },
        onCancel: () => {
          toast.info('Payment cancelled.');
        },
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
        },
      }).render(paypalRef.current);
    };

    loadPayPalScript();

    return () => {
      // Cleanup if needed
      if (paypalRef.current) {
        paypalRef.current.innerHTML = '';
      }
      isRendered.current = false;
    };
  }, [amount, onSuccess, onError]);

  return <div ref={paypalRef} className="paypal-button-container"></div>;
};

export default PayPalCheckout;
