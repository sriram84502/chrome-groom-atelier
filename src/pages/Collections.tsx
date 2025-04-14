
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Collections data
const collections = [
  {
    id: 1,
    name: "MORNING RITUAL",
    description: "Essential products for your morning grooming routine.",
    image: "/placeholder.svg",
    products: 5,
    bg: "bg-brand-navy/50"
  },
  {
    id: 2,
    name: "WEEKEND GETAWAY",
    description: "Travel-sized essentials for short trips and adventures.",
    image: "/placeholder.svg",
    products: 3,
    bg: "bg-brand-charcoal/70"
  },
  {
    id: 3,
    name: "FACIAL CARE",
    description: "Premium products focused on facial skincare and rejuvenation.",
    image: "/placeholder.svg",
    products: 4,
    bg: "bg-brand-navy/50"
  },
  {
    id: 4,
    name: "BEARD MASTER",
    description: "Everything you need for a well-groomed, healthy beard.",
    image: "/placeholder.svg",
    products: 3,
    bg: "bg-brand-charcoal/70"
  }
];

const exclusiveCollection = {
  name: "CHROME SIGNATURE",
  description: "Our flagship collection featuring premium ingredients and innovative formulations.",
  image: "/placeholder.svg",
  products: 7
};

const Collections = () => {
  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar />
      <main>
        {/* Hero section */}
        <section className="pt-28 pb-16 px-4 container mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">COLLECTIONS</h1>
            <p className="text-white/70 max-w-xl mx-auto">
              Carefully curated product sets designed to work together for optimal results.
            </p>
          </motion.div>
        </section>
        
        {/* Featured collection */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/3] bg-brand-charcoal/70 overflow-hidden">
                <img 
                  src={exclusiveCollection.image} 
                  alt={exclusiveCollection.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-bold text-white mb-4">{exclusiveCollection.name}</h2>
                <p className="text-white/70 mb-6 leading-relaxed">{exclusiveCollection.description}</p>
                <p className="text-brand-silver mb-8">{exclusiveCollection.products} Products</p>
                <Button className="bg-brand-silver text-brand-black hover:bg-white">
                  VIEW COLLECTION <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Collections grid */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection, index) => (
              <motion.div 
                key={collection.id}
                className={`${collection.bg} p-8 lg:p-12 group relative overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
                  <img 
                    src={collection.image} 
                    alt={collection.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-3">{collection.name}</h3>
                  <p className="text-white/70 mb-4 max-w-xs">{collection.description}</p>
                  <p className="text-brand-silver mb-6">{collection.products} Products</p>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-black group-hover:bg-white group-hover:text-brand-black transition-colors duration-300">
                    VIEW COLLECTION <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Personalized collection */}
        <section className="py-16 bg-brand-navy/30">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">CREATE YOUR OWN COLLECTION</h2>
              <p className="text-white/70 max-w-xl mx-auto mb-8">
                Build a personalized grooming routine tailored to your specific needs and preferences.
              </p>
              <Button className="bg-brand-silver text-brand-black hover:bg-white">
                START BUILDING <ArrowRight className="ml-2" size={16} />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
