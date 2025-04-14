
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Mock product data
const featuredProducts = [
  {
    id: 1,
    name: 'PREMIUM FACE SERUM',
    price: 45,
    rating: 4.8,
    reviews: 124,
    image: '/placeholder.svg',
    description: 'Hydrating serum with hyaluronic acid and vitamin C for bright, revitalized skin.',
    ingredients: ['Hyaluronic Acid', 'Vitamin C', 'Niacinamide', 'Green Tea Extract']
  },
  {
    id: 2,
    name: 'HYDRATING FACE MOISTURIZER',
    price: 42,
    rating: 4.9,
    reviews: 97,
    image: '/placeholder.svg',
    description: 'Lightweight daily moisturizer that hydrates without clogging pores.',
    ingredients: ['Squalane', 'Ceramides', 'Jojoba Oil', 'Aloe Vera']
  },
  {
    id: 3,
    name: 'LUXURY BEARD OIL',
    price: 36,
    rating: 4.7,
    reviews: 183,
    image: '/placeholder.svg',
    description: 'Premium beard oil to soften, condition, and promote healthy beard growth.',
    ingredients: ['Argan Oil', 'Jojoba Oil', 'Grapeseed Oil', 'Vitamin E']
  }
];

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(featuredProducts[0]);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
  };

  return (
    <section ref={containerRef} className="py-24 bg-brand-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <motion.div
          ref={ref}
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            FEATURED <span className="text-brand-silver">PRODUCTS</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Our best-selling products, crafted with premium ingredients to elevate your daily grooming routine.
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Product image */}
          <motion.div 
            className="aspect-square relative bg-gradient-to-br from-brand-charcoal to-brand-black p-10 flex items-center justify-center rounded-lg"
            style={{ y, opacity }}
          >
            <div className="relative w-full h-full">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full h-full object-contain"
              />
              
              {/* Floating badges */}
              <motion.div 
                className="absolute top-0 left-0 bg-brand-silver text-brand-black px-3 py-1 text-sm font-medium"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                BEST SELLER
              </motion.div>
              
              <motion.div 
                className="absolute bottom-4 right-4 glass-effect px-3 py-1 rounded-full flex items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Star size={14} className="text-brand-silver mr-1" fill="currentColor" />
                <span className="text-white text-sm">{selectedProduct.rating}</span>
                <span className="text-white/50 text-xs ml-1">({selectedProduct.reviews})</span>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right: Product info and selection */}
          <div>
            {/* Product details */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              key={selectedProduct.id} // Force animation on product change
            >
              <h3 className="text-2xl font-bold font-montserrat mb-2">{selectedProduct.name}</h3>
              <p className="text-brand-silver text-xl font-medium mb-4">${selectedProduct.price}</p>
              <p className="text-white/70 mb-6">{selectedProduct.description}</p>
              
              <div className="mb-6">
                <h4 className="text-white text-sm font-medium mb-2">KEY INGREDIENTS:</h4>
                <ul className="flex flex-wrap gap-2">
                  {selectedProduct.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="bg-brand-charcoal text-white/70 text-xs px-3 py-1 rounded-full">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex space-x-4">
                <button className="bg-brand-silver text-brand-black px-6 py-3 font-medium text-sm hover:bg-white transition-colors">
                  ADD TO CART
                </button>
                <button className="border border-brand-silver text-white px-6 py-3 font-medium text-sm hover:bg-brand-silver hover:text-brand-black transition-colors">
                  VIEW DETAILS
                </button>
              </div>
            </motion.div>
            
            {/* Product selection */}
            <div className="border-t border-brand-charcoal pt-8">
              <h4 className="text-white text-sm font-medium mb-4">EXPLORE MORE:</h4>
              <div className="grid grid-cols-3 gap-4">
                {featuredProducts.map((product) => (
                  <button 
                    key={product.id}
                    className={`aspect-square p-4 flex items-center justify-center border transition-all ${
                      selectedProduct.id === product.id
                        ? 'border-brand-silver bg-brand-charcoal/50'
                        : 'border-brand-charcoal hover:border-brand-silver/50'
                    }`}
                    onClick={() => handleProductClick(product)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* View all button */}
        <div className="mt-16 text-center">
          <a 
            href="/products" 
            className="inline-flex items-center text-brand-silver hover:text-white border-b border-brand-silver pb-1 transition-colors"
          >
            VIEW ALL PRODUCTS <ArrowRight size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
