
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-off-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-burnt-gold rounded-sm flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
              </div>
              <span className="font-playfair text-2xl font-bold">Vellum</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Professional virtual staging with consistent quality systems. Transform empty listings into dream homes in just 4 hours.
            </p>
            <p className="text-burnt-gold font-medium">
              Flawless results, every time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-inter font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/how-it-works" className="block text-gray-300 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link to="/gallery" className="block text-gray-300 hover:text-white transition-colors">
                Gallery
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-inter font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-300">hello@vellum.com</p>
              <p className="text-gray-300">4-hour turnaround</p>
              <p className="text-gray-300">$50 flat rate</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 Vellum. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
