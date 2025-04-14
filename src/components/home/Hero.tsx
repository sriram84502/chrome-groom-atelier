
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ThreeContainer from '../3d/ThreeContainer';
import ProductCarousel from '../3d/ProductCarousel';

const Hero = () => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const handleProductSelect = (id: number) => {
    setSelectedProduct(id);
  };

  // Mouse parallax effect
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return;
      
      const layers = parallaxRef.current.querySelectorAll('.parallax-layer');
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      layers.forEach((layer: Element, index) => {
        const depth = 0.01 * (index + 1);
        const moveX = mouseX * depth;
        const moveY = mouseY * depth;
        
        // Apply transform using translate3d for better performance
        (layer as HTMLElement).style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="h-screen w-full relative overflow-hidden bg-brand-black">
      {/* Ambient background with parallax effect */}
      <div ref={parallaxRef} className="absolute inset-0 overflow-hidden">
        <div className="parallax-layer absolute top-0 left-0 w-full h-full">
          <div className="absolute top-28 left-1/4 w-64 h-64 rounded-full bg-brand-navy opacity-20 blur-3xl"></div>
        </div>
        <div className="parallax-layer absolute top-0 left-0 w-full h-full">
          <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-brand-accent opacity-10 blur-3xl"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full pt-16">
          {/* Left column - Text content */}
          <motion.div 
            className="text-left z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">ELEVATE YOUR</span> <br />
              <span className="text-stroke font-extrabold">GROOMING GAME</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg">
              Premium skincare and hair products crafted specifically for the modern man. Discover your perfect look.
            </p>
            <div className="flex space-x-4">
              <a 
                href="/products" 
                className="bg-brand-silver text-brand-black px-8 py-4 font-montserrat font-semibold text-sm hover:bg-white transition-colors flex items-center"
              >
                EXPLORE COLLECTION <ArrowRight size={16} className="ml-2" />
              </a>
              <a 
                href="/routines" 
                className="border border-brand-silver text-white px-8 py-4 font-montserrat font-semibold text-sm hover:bg-brand-silver hover:text-brand-black transition-colors"
              >
                BUILD ROUTINE
              </a>
            </div>
          </motion.div>
          
          {/* Right column - 3D product carousel */}
          <motion.div 
            className="h-[500px] w-full relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <ThreeContainer>
              <ProductCarousel selectProduct={handleProductSelect} />
            </ThreeContainer>
            {selectedProduct && (
              <motion.div 
                className="absolute bottom-10 left-0 right-0 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white font-montserrat text-lg">
                  {selectedProduct === 1 && "FACE WASH - $38"}
                  {selectedProduct === 2 && "FACIAL SERUM - $45"}
                  {selectedProduct === 3 && "MOISTURIZER - $42"}
                  {selectedProduct === 4 && "BEARD OIL - $36"}
                  {selectedProduct === 5 && "HAIR SHAMPOO - $32"}
                </p>
                <button className="mt-3 text-brand-silver hover:text-white transition-colors text-sm flex items-center mx-auto">
                  VIEW DETAILS <ArrowRight size={14} className="ml-1" />
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
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
      </motion.div>
    </div>
  );
};

export default Hero;
