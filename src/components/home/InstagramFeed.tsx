
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Instagram } from 'lucide-react';

const instagramPosts = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg"
];

const InstagramFeed = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

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
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Instagram size={24} className="text-brand-silver" />
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat">
              @CHROME
            </h2>
          </div>
          <p className="text-white/70 max-w-xl mx-auto">
            Follow us on Instagram for grooming tips, style inspiration, and behind-the-scenes content.
          </p>
        </motion.div>
        
        {/* Instagram grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          style={{ y }}
        >
          {instagramPosts.map((post, index) => (
            <motion.div
              key={index}
              className="aspect-square overflow-hidden relative group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <img 
                src={post} 
                alt="Instagram post" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white text-sm font-medium">View Post</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Follow button */}
        <div className="mt-12 text-center">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 border border-brand-silver px-8 py-3 text-white hover:bg-brand-silver hover:text-brand-black transition-colors"
          >
            <Instagram size={18} />
            <span className="font-montserrat font-medium text-sm">FOLLOW @CHROME</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
