
import { Instagram, Facebook, Twitter, Youtube, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-black border-t border-brand-charcoal py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-montserrat font-bold text-white mb-6">CHROME</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Premium men's grooming essentials crafted for the modern gentleman. Elevate your self-care routine with our luxury skincare and hair solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-montserrat font-semibold text-white mb-6">SHOP</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">All Products</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Skincare</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Hair Care</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Beard Care</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Grooming Sets</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-montserrat font-semibold text-white mb-6">COMPANY</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Our Story</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Ingredients</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Sustainability</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Journal</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-montserrat font-semibold text-white mb-6">NEWSLETTER</h4>
            <p className="text-white/70 text-sm mb-4">Subscribe for exclusive offers, grooming tips, and new product launches.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-transparent border border-brand-charcoal px-4 py-2 text-white/70 text-sm focus:outline-none focus:border-brand-silver w-full"
              />
              <button className="bg-brand-silver px-3 text-brand-black hover:bg-white transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-brand-charcoal flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">© 2025 CHROME. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/50 hover:text-white/70 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/50 hover:text-white/70 text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-white/50 hover:text-white/70 text-xs transition-colors">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
