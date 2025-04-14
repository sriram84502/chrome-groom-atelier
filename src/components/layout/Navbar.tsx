
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'py-2 glass-effect' : 'py-6 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <a href="/" className="text-2xl font-montserrat font-bold tracking-wider text-white">
              CHROME
            </a>
            
            <nav className="hidden md:flex space-x-8">
              <a href="/products" className="text-sm text-white/80 hover:text-white transition-colors">
                PRODUCTS
              </a>
              <a href="/collections" className="text-sm text-white/80 hover:text-white transition-colors">
                COLLECTIONS
              </a>
              <a href="/routines" className="text-sm text-white/80 hover:text-white transition-colors">
                ROUTINES
              </a>
              <a href="/lifestyle" className="text-sm text-white/80 hover:text-white transition-colors">
                LIFESTYLE
              </a>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-white/80 hover:text-white transition-colors">
              <Search size={20} />
            </button>
            <button className="text-white/80 hover:text-white transition-colors">
              <User size={20} />
            </button>
            <button className="text-white/80 hover:text-white transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
          
          <button 
            className="md:hidden text-white z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-brand-black z-40 pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="container mx-auto px-4 py-10 flex flex-col space-y-8">
            <a href="/products" className="text-xl font-montserrat text-white border-b border-white/10 pb-4">
              PRODUCTS
            </a>
            <a href="/collections" className="text-xl font-montserrat text-white border-b border-white/10 pb-4">
              COLLECTIONS
            </a>
            <a href="/routines" className="text-xl font-montserrat text-white border-b border-white/10 pb-4">
              ROUTINES
            </a>
            <a href="/lifestyle" className="text-xl font-montserrat text-white border-b border-white/10 pb-4">
              LIFESTYLE
            </a>
            
            <div className="flex space-x-6 pt-4">
              <button className="text-white">
                <Search size={24} />
              </button>
              <button className="text-white">
                <User size={24} />
              </button>
              <button className="text-white relative">
                <ShoppingBag size={24} />
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
