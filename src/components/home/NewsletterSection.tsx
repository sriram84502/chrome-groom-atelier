
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to your newsletter service
      console.log('Email submitted:', email);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className="py-24 bg-brand-charcoal relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-brand-black/30 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            JOIN THE <span className="text-brand-silver">MOVEMENT</span>
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter for exclusive offers, grooming tips, and early access to new product launches.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border border-brand-silver px-6 py-4 text-white placeholder:text-white/50 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-brand-silver text-brand-black px-6 py-4 font-medium flex items-center justify-center group hover:bg-white transition-colors"
            >
              {submitted ? (
                <>
                  <Check size={20} className="mr-2" /> SUBSCRIBED
                </>
              ) : (
                <>
                  SUBSCRIBE 
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <p className="text-white/50 text-sm mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
