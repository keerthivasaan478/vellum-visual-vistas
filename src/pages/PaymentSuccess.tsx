import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentSuccess: React.FC = () => {
  return (
    <div className="container mx-auto my-10 flex items-center justify-center">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-600">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Thank you for your order. A confirmation email has been sent to you.</p>
          <p className="mb-6">Our team will begin processing your request shortly.</p>
          <Button asChild>
            <Link to="/">Return to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess; 