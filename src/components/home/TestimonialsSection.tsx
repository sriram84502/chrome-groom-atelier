
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "James Wilson",
    role: "Entrepreneur",
    image: "/placeholder.svg",
    quote: "The Chrome skincare line has completely transformed my morning routine. My skin feels healthier, looks clearer, and I've received numerous compliments since making the switch.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Thompson",
    role: "Creative Director",
    image: "/placeholder.svg",
    quote: "After trying countless products over the years, I've finally found a brand that delivers results. The beard oil is exceptional - no more itchiness and it smells incredible.",
    rating: 5
  },
  {
    id: 3,
    name: "Daniel Chen",
    role: "Architect",
    image: "/placeholder.svg",
    quote: "The attention to detail in these products is impressive. The packaging is sleek, the formulations are effective, and they integrate seamlessly into my daily routine.",
    rating: 4
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-brand-charcoal to-brand-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            CLIENT <span className="text-brand-silver">TESTIMONIALS</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their Chrome experience.
          </p>
        </motion.div>
        
        {/* Testimonials */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation buttons */}
          <div className="absolute left-0 -top-12 flex space-x-2">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 border border-brand-charcoal hover:border-brand-silver text-white/70 hover:text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 border border-brand-charcoal hover:border-brand-silver text-white/70 hover:text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Current testimonial */}
          <motion.div 
            key={testimonials[currentIndex].id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-brand-black/70 border border-brand-charcoal p-8 md:p-12 rounded-lg"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex mb-3">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-brand-silver fill-brand-silver" />
                  ))}
                  {[...Array(5 - testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i + testimonials[currentIndex].rating} size={16} className="text-brand-silver/30" />
                  ))}
                </div>
                
                <blockquote className="text-white text-lg md:text-xl italic mb-6">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                
                <div>
                  <p className="font-montserrat font-medium text-white">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-white/50 text-sm">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Indicators */}
          <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-brand-silver' : 'bg-brand-charcoal'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
