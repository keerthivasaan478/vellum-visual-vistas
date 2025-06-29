import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentCancelled: React.FC = () => {
  return (
    <div className="container mx-auto my-10 flex items-center justify-center">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-yellow-600">Payment Cancelled</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Your payment has been cancelled.</p>
          <p className="mb-6">You have not been charged. You can return to the previous page or go to the homepage.</p>
          <Button asChild>
            <Link to="/get-started">Try Again</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/">Return to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCancelled; 