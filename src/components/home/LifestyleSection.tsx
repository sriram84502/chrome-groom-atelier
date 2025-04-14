
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const images = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg"
];

const LifestyleSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const x = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={containerRef} className="py-24 bg-brand-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <motion.div
          ref={ref}
          className="mb-16 text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            THE CHROME <span className="text-brand-silver">LIFESTYLE</span>
          </h2>
          <p className="text-white/70 max-w-xl">
            For the modern man who values confidence, sophistication, and impeccable self-care.
          </p>
        </motion.div>
        
        {/* Main feature image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            className="aspect-[4/5] overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <img 
              src="/placeholder.svg" 
              alt="Man using Chrome products" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div 
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h3 className="text-2xl font-montserrat font-bold mb-6">CONFIDENCE IN EVERY DETAIL</h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              Chrome products are designed for men who understand that grooming is not just about appearance—it's about confidence, self-respect, and making a statement without saying a word.
            </p>
            <p className="text-white/70 mb-8 leading-relaxed">
              Our premium formulations are crafted to enhance your natural features while addressing the specific needs of men's skin and hair. The result is a noticeable difference that others will recognize but can't quite place.
            </p>
            <div className="flex space-x-6">
              <div>
                <p className="text-3xl font-bold text-brand-silver">97%</p>
                <p className="text-sm text-white/50">Report improved skin texture</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-brand-silver">92%</p>
                <p className="text-sm text-white/50">Would recommend to friends</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-brand-silver">16K+</p>
                <p className="text-sm text-white/50">Satisfied customers</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Image gallery */}
        <motion.div style={{ x }} className="flex space-x-6 py-8">
          {images.map((image, index) => (
            <motion.div 
              key={index}
              className="min-w-[300px] aspect-square overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
            >
              <img 
                src={image} 
                alt="Lifestyle" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LifestyleSection;
