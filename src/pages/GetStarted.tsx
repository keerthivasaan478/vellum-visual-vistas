
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import PayPalCheckout from '@/components/PayPalCheckout';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  zillowLink: z.string().url('Please enter a valid Zillow URL').optional().or(z.literal('')),
});

type FormData = z.infer<typeof formSchema>;

const GetStarted = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  const [orderData, setOrderData] = useState<FormData | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      zillowLink: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Store form data and show PayPal
      setOrderData(data);
      setShowPayPal(true);
      toast.success('Please complete your payment to proceed');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = async (paypalOrderId: string, paypalPayerId: string) => {
    if (!orderData) return;

    try {
      // Create order in database
      const { error } = await supabase
        .from('orders')
        .insert({
          name: orderData.name,
          email: orderData.email,
          phone_number: orderData.phone || null,
          zillow_link: orderData.zillowLink || null,
          paypal_order_id: paypalOrderId,
          paypal_payer_id: paypalPayerId,
          status: 'completed',
          amount: 7500, // $75.00
          currency: 'usd',
        });

      if (error) {
        console.error('Database error:', error);
        toast.error('Payment successful but failed to save order. Please contact support.');
        return;
      }

      // Send confirmation email
      try {
        const response = await fetch('/api/send-confirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: orderData.email,
            name: orderData.name,
            orderId: paypalOrderId,
          }),
        });

        if (!response.ok) {
          console.error('Email sending failed');
        }
      } catch (emailError) {
        console.error('Email error:', emailError);
      }

      toast.success('Payment successful! You\'ll receive a confirmation email shortly.');
      
      // Reset form
      form.reset();
      setShowPayPal(false);
      setOrderData(null);
    } catch (error) {
      console.error('Error saving order:', error);
      toast.error('Payment successful but failed to save order. Please contact support.');
    }
  };

  if (showPayPal && orderData) {
    return (
      <div className="min-h-screen bg-canvas-white py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Complete Your Payment</CardTitle>
              <CardDescription className="text-center">
                You're ordering Virtual Home Staging for $75.00
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Order Summary:</h3>
                <p><strong>Name:</strong> {orderData.name}</p>
                <p><strong>Email:</strong> {orderData.email}</p>
                {orderData.phone && <p><strong>Phone:</strong> {orderData.phone}</p>}
                {orderData.zillowLink && <p><strong>Zillow Link:</strong> {orderData.zillowLink}</p>}
                <p><strong>Service:</strong> Virtual Home Staging</p>
                <p><strong>Amount:</strong> $75.00</p>
              </div>
              
              <PayPalCheckout
                amount="75.00"
                onSuccess={handlePaymentSuccess}
                onError={() => {
                  toast.error('Payment failed. Please try again.');
                  setShowPayPal(false);
                }}
              />
              
              <Button
                variant="outline"
                onClick={() => setShowPayPal(false)}
                className="w-full mt-4"
              >
                Back to Form
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas-white py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-off-black mb-4">Get Started</h1>
          <p className="text-lg text-gray-600">
            Transform your property with professional virtual staging for just $75
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Virtual Home Staging Request</CardTitle>
            <CardDescription>
              Fill out the form below to get started with your virtual staging project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter your email address" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="Enter your phone number" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zillowLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zillow Link (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Paste the Zillow listing URL here (optional)"
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-burnt-gold/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-burnt-gold mb-2">Service Details</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Virtual Home Staging</strong> - $75.00
                  </p>
                  <p className="text-sm text-gray-600">
                    Professional virtual staging to help your property stand out and sell faster
                  </p>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-burnt-gold hover:bg-burnt-gold/90 text-white"
                >
                  {isSubmitting ? 'Processing...' : 'Proceed to Payment - $75.00'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GetStarted;
