import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-16 md:py-24 bg-canvas-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-playfair text-4xl md:text-6xl font-bold text-off-black mb-6 leading-tight">
          Handcrafted Virtual Staging.<br />
          <span className="text-burnt-gold">Ready in 4 Hours.</span>
        </h1>
        
        <p className="font-inter text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Get flawless, professional listing photos in hours with our consistent system. 
          No AI, no algorithms—just beautiful, photorealistic staging that sells homes faster.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size={isMobile ? "sm" : "lg"} 
            className="bg-burnt-gold hover:bg-burnt-gold/90 text-white" 
            asChild
          >
            <Link to="/get-started">Get Started for $1</Link>
          </Button>
          <Button variant="outline" className="btn-secondary text-lg px-8 py-4">
            View Gallery
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success-green rounded-full"></div>
            <span>4-hour delivery</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success-green rounded-full"></div>
            <span>Unlimited revisions</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success-green rounded-full"></div>
            <span>Consistent quality system</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
