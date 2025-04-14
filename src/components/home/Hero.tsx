
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import ThreeContainer from '../3d/ThreeContainer';
import ProductCarousel from '../3d/ProductCarousel';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const isMobile = useIsMobile();
  
  const handleProductSelect = (id: number) => {
    setSelectedProduct(id);
  };

  // Enhanced parallax effect
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return;
      
      const layers = parallaxRef.current.querySelectorAll('.parallax-layer');
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      layers.forEach((layer: Element, index) => {
        const depth = 0.02 * (index + 1);
        const moveX = mouseX * depth;
        const moveY = mouseY * depth;
        
        // Apply transform using translate3d for better performance
        (layer as HTMLElement).style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const productDescriptions = {
    1: {name: "FACE WASH", price: "$38", description: "Cleanse and refresh your face with our signature face wash enriched with hydrating ingredients."},
    2: {name: "FACIAL SERUM", price: "$45", description: "Potent formula that targets aging signs and provides deep nourishment to the skin."},
    3: {name: "MOISTURIZER", price: "$42", description: "Lightweight yet powerful hydration that lasts all day without greasy residue."},
    4: {name: "BEARD OIL", price: "$36", description: "Condition and soften beard hair while nourishing the skin underneath."},
    5: {name: "HAIR SHAMPOO", price: "$32", description: "Gentle cleansing that removes buildup while adding volume and shine."},
  };

  return (
    <div className="h-screen w-full relative overflow-hidden bg-brand-black">
      {/* Ambient background with enhanced parallax effect */}
      <div ref={parallaxRef} className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y: y1 }} className="parallax-layer absolute top-0 left-0 w-full h-full">
          <div className="absolute top-28 left-1/4 w-64 h-64 rounded-full bg-brand-navy opacity-20 blur-3xl"></div>
        </motion.div>
        <motion.div style={{ y: y2 }} className="parallax-layer absolute top-0 left-0 w-full h-full">
          <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-brand-accent opacity-10 blur-3xl"></div>
        </motion.div>
        <motion.div style={{ y: y3 }} className="parallax-layer absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-[#FF6B6B] opacity-10 blur-3xl"></div>
        </motion.div>
      </div>
      
      {/* Content */}
      <motion.div style={{ opacity }} className="container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full pt-16">
          {/* Left column - Text content with enhanced animations */}
          <motion.div 
            className="text-left z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.2, 
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1] 
            }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.4, 
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              <motion.span 
                className="text-white block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                ELEVATE YOUR
              </motion.span>
              <motion.span 
                className="text-stroke font-extrabold block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                GROOMING GAME
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-white/80 text-lg md:text-xl mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              Premium skincare and hair products crafted specifically for the modern man. Discover your perfect look.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.a 
                href="/products" 
                className="bg-brand-silver text-brand-black px-6 sm:px-8 py-4 font-montserrat font-semibold text-sm hover:bg-white transition-colors flex items-center justify-center sm:justify-start"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                EXPLORE COLLECTION <ArrowRight size={16} className="ml-2" />
              </motion.a>
              <motion.a 
                href="/routines" 
                className="border border-brand-silver text-white px-6 sm:px-8 py-4 font-montserrat font-semibold text-sm hover:bg-brand-silver hover:text-brand-black transition-colors flex items-center justify-center sm:justify-start"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                BUILD ROUTINE
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Right column - 3D product carousel with enhanced container */}
          <motion.div 
            className="h-[400px] sm:h-[500px] w-full relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <ThreeContainer environmentPreset="studio">
              <ProductCarousel selectProduct={handleProductSelect} />
            </ThreeContainer>
            
            <AnimatePresence mode="wait">
              {selectedProduct && (
                <motion.div 
                  key={selectedProduct}
                  className="absolute bottom-10 left-0 right-0 text-center bg-brand-black/50 backdrop-blur-sm p-4 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.p 
                    className="text-white font-montserrat text-lg sm:text-xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {productDescriptions[selectedProduct as keyof typeof productDescriptions].name} - {productDescriptions[selectedProduct as keyof typeof productDescriptions].price}
                  </motion.p>
                  <motion.p 
                    className="text-white/70 text-sm mt-2 hidden sm:block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {productDescriptions[selectedProduct as keyof typeof productDescriptions].description}
                  </motion.p>
                  <motion.button 
                    className="mt-3 text-brand-silver hover:text-white transition-colors text-sm flex items-center mx-auto group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    VIEW DETAILS 
                    <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <p className="text-white/50 text-xs mb-2 font-montserrat">SCROLL</p>
        <div className="w-0.5 h-10 bg-white/20 relative">
          <motion.div 
            className="absolute top-0 w-full h-1/3 bg-white" 
            animate={{ 
              top: ["0%", "66%", "0%"],
              opacity: [1, 0.5, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5,
              ease: "easeInOut"
            }}
          />
        </div>
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={16} className="text-white/50 mt-2" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
