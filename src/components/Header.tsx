
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-canvas-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-burnt-gold rounded-sm flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
            </div>
            <span className="font-playfair text-2xl font-bold text-off-black">Vellum</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/how-it-works" className="font-inter text-off-black hover:text-burnt-gold transition-colors">
              How It Works
            </Link>
            <Link to="/gallery" className="font-inter text-off-black hover:text-burnt-gold transition-colors">
              Gallery
            </Link>
            <Button className="btn-primary">
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 relative">
              <span className={`block absolute h-0.5 w-6 bg-off-black transform transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-0'}`}></span>
              <span className={`block absolute h-0.5 w-6 bg-off-black transform transition duration-300 ${isMenuOpen ? 'opacity-0' : 'translate-y-2'}`}></span>
              <span className={`block absolute h-0.5 w-6 bg-off-black transform transition duration-300 ${isMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-4'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-4">
              <Link to="/how-it-works" className="font-inter text-off-black hover:text-burnt-gold transition-colors">
                How It Works
              </Link>
              <Link to="/gallery" className="font-inter text-off-black hover:text-burnt-gold transition-colors">
                Gallery
              </Link>
              <Button className="btn-primary w-full">
                Get Started
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
