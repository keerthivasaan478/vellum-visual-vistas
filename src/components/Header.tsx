import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold font-playfair text-off-black">
          Vellum
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/gallery" className="font-inter text-off-black hover:text-burnt-gold transition-colors">
            Gallery
          </Link>
          <Button asChild className="bg-burnt-gold hover:bg-burnt-gold/90 text-white">
            <Link to="/get-started">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-off-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden p-4">
          <div className="flex flex-col space-y-4">
            <Link
              to="/gallery"
              className="font-inter text-lg text-off-black hover:bg-gray-100 p-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>
            <Button asChild className="w-full bg-burnt-gold hover:bg-burnt-gold/90 text-white mt-4">
              <Link to="/get-started">Get Started</Link>
            </Button>
          </div>
        </div>
        )}
      </div>
    </header>
  );
};

export default Header;
