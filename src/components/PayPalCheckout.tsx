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
  onCancel?: () => void;
}

const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({ amount, onSuccess, onError, onCancel }) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const isRendered = useRef(false);

  useEffect(() => {
    const loadPayPalScript = () => {
      // Temporarily hardcoded for testing - replace with environment variable in production
      const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || "AcQuA4YJmax_N2i6rjANleE3RCiFP7Bpvva15vruniaulpK7tIuiYTYdyw96A43UeFlRWLYI1kxM2lAN";
      
      if (!clientId) {
        console.error('PayPal Client ID is not configured');
        toast.error('PayPal is not properly configured');
        onError();
        return;
      }

      console.log('Loading PayPal with Client ID:', clientId);

      if (window.paypal && !isRendered.current) {
        renderPayPalButton();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      script.addEventListener('load', () => {
        console.log('PayPal SDK loaded successfully');
        if (!isRendered.current) {
          renderPayPalButton();
        }
      });
      script.addEventListener('error', () => {
        console.error('Failed to load PayPal SDK');
        toast.error('Failed to load PayPal. Please try again.');
        onError();
      });
      document.body.appendChild(script);
    };

    const renderPayPalButton = () => {
      if (!window.paypal || !paypalRef.current || isRendered.current) return;

      console.log('Rendering PayPal button');
      isRendered.current = true;

      window.paypal.Buttons({
        createOrder: async () => {
          try {
            console.log('Creating PayPal order for amount:', amount);
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

            console.log('PayPal order created:', data.id);
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
            console.log('Capturing PayPal payment for order:', data.orderID);
            const { data: captureData, error } = await supabase.functions.invoke('capture-paypal-order', {
              body: {
                orderId: data.orderID,
              },
            });

            if (error) {
              console.error('Error capturing PayPal payment:', error);
              throw new Error('Failed to capture PayPal payment');
            }
            
            console.log('PayPal payment captured successfully:', captureData);
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
          console.log('PayPal payment cancelled');
          if (onCancel) {
            onCancel();
          } else {
            toast.info('Payment cancelled.');
          }
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
  }, [amount, onSuccess, onError, onCancel]);

  return <div ref={paypalRef} className="paypal-button-container"></div>;
};

export default PayPalCheckout;
