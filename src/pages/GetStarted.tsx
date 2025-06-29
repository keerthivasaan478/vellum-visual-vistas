import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import PayPalCheckout from '@/components/PayPalCheckout';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
    // Here you could save the form data to a temporary state or table if needed
    // before the user completes the payment. For now, we'll just show PayPal.
    setShowPayPal(true);
    setIsSubmitting(false);
    toast.info('Please complete your payment to proceed.');
  };

  const handlePaymentSuccess = useCallback(() => {
    toast.success('Payment successful! Redirecting...');
    navigate('/payment-success');
  }, [navigate]);

  const handlePaymentError = useCallback(() => {
    toast.error('Payment failed. Please try again.');
    setShowPayPal(false);
  }, []);
  
  const handlePaymentCancel = useCallback(() => {
    toast.info('Payment cancelled.');
    setShowPayPal(false);
  }, []);

  if (showPayPal) {
    return (
      <div className="min-h-screen bg-canvas-white py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Complete Your Payment</CardTitle>
              <CardDescription className="text-center">
                You're ordering Virtual Home Staging for $1.00
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PayPalCheckout
                amount="1.00"
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                onCancel={handlePaymentCancel}
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
            Transform your property with professional virtual staging for just $1
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
                    <strong>Virtual Home Staging</strong> - $1.00
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
                  {isSubmitting ? 'Processing...' : 'Proceed to Payment - $1.00'}
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
