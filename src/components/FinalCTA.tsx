
import { Button } from '@/components/ui/button';

const FinalCTA = () => {
  return (
    <section className="py-16 bg-deep-teal">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-lora text-3xl md:text-4xl font-medium text-white mb-4">
          Ready to Transform Your Listings?
        </h2>
        <p className="font-inter text-lg text-teal-100 mb-8 max-w-2xl mx-auto">
          Join thousands of agents who've discovered the power of handcrafted virtual staging. 
          Get started today for just $50.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button className="bg-white text-deep-teal hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
            Get Started Now
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-deep-teal px-8 py-4 text-lg">
            View Pricing
          </Button>
        </div>
        
        <p className="font-inter text-sm text-teal-200 mt-6">
          No setup fees • 4-hour delivery • Unlimited revisions
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
