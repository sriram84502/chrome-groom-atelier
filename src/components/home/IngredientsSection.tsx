
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ingredients = [
  {
    name: "Hyaluronic Acid",
    description: "Deeply hydrates and plumps skin by attracting and retaining moisture.",
    image: "/placeholder.svg"
  },
  {
    name: "Niacinamide",
    description: "Improves skin texture, minimizes pores and balances oil production.",
    image: "/placeholder.svg"
  },
  {
    name: "Vitamin C",
    description: "Brightens skin, reduces dark spots and stimulates collagen production.",
    image: "/placeholder.svg"
  }
];

const IngredientsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} className="py-24 bg-brand-charcoal relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-brand-black"></div>
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-brand-silver opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-brand-navy opacity-10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section title */}
        <motion.div
          ref={ref}
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            PREMIUM <span className="text-brand-silver">INGREDIENTS</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto">
            We source only the finest ingredients, backed by science and selected for their efficacy.
          </p>
        </motion.div>
        
        {/* Ingredients grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{ y }}
        >
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.name}
              className="bg-brand-black/50 backdrop-blur-sm p-8 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
            >
              <div className="w-20 h-20 mb-6 mx-auto">
                <img 
                  src={ingredient.image} 
                  alt={ingredient.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium font-montserrat text-white text-center mb-3">
                {ingredient.name}
              </h3>
              <p className="text-white/70 text-center">
                {ingredient.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Commitment statement */}
        <motion.div
          className="mt-16 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-white/80 text-lg italic">
            "Our formulas are meticulously crafted with ingredients chosen specifically for men's unique skincare needs. We never compromise on quality."
          </p>
          <p className="text-brand-silver mt-3 font-montserrat font-medium">
            — CHROME LABORATORIES
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IngredientsSection;
