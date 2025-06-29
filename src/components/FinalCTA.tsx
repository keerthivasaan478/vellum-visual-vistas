import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-16 bg-deep-teal">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-playfair text-3xl md:text-5xl font-bold text-off-black mb-6">Ready to Transform Your Listings?</h2>
        <p className="font-inter text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Stop letting empty rooms kill your sales potential. Get stunning, virtually staged photos in just 4 hours.
        </p>
        <Button 
          size="lg"
          className="bg-burnt-gold hover:bg-burnt-gold/90 text-white" 
          asChild
        >
          <Link to="/get-started">Get Started Now for $1</Link>
        </Button>
        
        <p className="font-inter text-sm text-teal-200 mt-6">
          No setup fees • 4-hour delivery • Unlimited revisions
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
