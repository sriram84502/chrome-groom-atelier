
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Filter, ChevronDown, Heart } from "lucide-react";
import ThreeContainer from '@/components/3d/ThreeContainer';
import ProductModel from '@/components/3d/ProductModel';
import { useToast } from '@/components/ui/use-toast';

// Product data
const products = [
  {
    id: 1,
    name: "Hydrating Face Wash",
    price: 38,
    category: "skincare",
    color: "#8AC7DB",
    description: "Gentle daily cleanser that removes impurities without stripping moisture.",
    tags: ["bestseller", "new"]
  },
  {
    id: 2,
    name: "Revitalizing Serum",
    price: 45,
    category: "skincare",
    color: "#FF6B6B",
    description: "Powerful antioxidant formulation that brightens and reduces fine lines."
  },
  {
    id: 3,
    name: "Daily Moisturizer",
    price: 42,
    category: "skincare",
    color: "#4E937A",
    description: "Lightweight moisturizer that hydrates and strengthens the skin barrier."
  },
  {
    id: 4,
    name: "Premium Beard Oil",
    price: 36,
    category: "beard",
    color: "#FFB347",
    description: "Luxurious oil that softens beard hair and soothes the skin underneath."
  },
  {
    id: 5,
    name: "Clarifying Shampoo",
    price: 32,
    category: "hair",
    color: "#B19CD9",
    description: "Removes buildup while maintaining natural moisture balance."
  },
  {
    id: 6,
    name: "Strengthening Conditioner",
    price: 34,
    category: "hair",
    color: "#967BB6",
    description: "Repairs and fortifies hair with essential nutrients and proteins."
  },
  {
    id: 7,
    name: "Exfoliating Scrub",
    price: 38,
    category: "skincare",
    color: "#90EE90",
    description: "Removes dead skin cells and unclogs pores for smoother skin."
  },
  {
    id: 8,
    name: "Styling Pomade",
    price: 28,
    category: "hair",
    color: "#DAA520",
    description: "Medium hold with matte finish for versatile styling options."
  }
];

// Animate variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const { toast } = useToast();
  
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Add animation on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (productId: number, productName: string) => {
    toast({
      title: "Added to Cart",
      description: `${productName} has been added to your cart.`,
      duration: 2000,
    });
  };

  const toggleLikeProduct = (productId: number, productName: string) => {
    if (likedProducts.includes(productId)) {
      setLikedProducts(likedProducts.filter(id => id !== productId));
      toast({
        title: "Removed from Wishlist",
        description: `${productName} has been removed from your wishlist.`,
        duration: 2000,
      });
    } else {
      setLikedProducts([...likedProducts, productId]);
      toast({
        title: "Added to Wishlist",
        description: `${productName} has been added to your wishlist.`,
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar />
      <main>
        {/* Hero section with enhanced animations */}
        <section className="pt-28 pb-16 px-4 container mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              SHOP CHROME
            </motion.h1>
            <motion.p 
              className="text-white/70 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Premium grooming essentials made for the modern man. Discover products that elevate your daily routine.
            </motion.p>
          </motion.div>
        </section>
        
        {/* Filter section with responsive design and animations */}
        <motion.section 
          className="py-6 border-t border-b border-brand-charcoal"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
                <div className="flex justify-between items-center w-full mb-2 md:mb-0">
                  <TabsList className="bg-transparent border-b border-brand-charcoal w-full md:w-auto justify-start gap-4 md:gap-8 h-auto pb-2 overflow-x-auto hide-scrollbar">
                    <TabsTrigger value="all" className="text-white/70 whitespace-nowrap data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-brand-silver rounded-none bg-transparent">
                      ALL PRODUCTS
                    </TabsTrigger>
                    <TabsTrigger value="skincare" className="text-white/70 whitespace-nowrap data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-brand-silver rounded-none bg-transparent">
                      SKINCARE
                    </TabsTrigger>
                    <TabsTrigger value="hair" className="text-white/70 whitespace-nowrap data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-brand-silver rounded-none bg-transparent">
                      HAIR
                    </TabsTrigger>
                    <TabsTrigger value="beard" className="text-white/70 whitespace-nowrap data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-brand-silver rounded-none bg-transparent">
                      BEARD
                    </TabsTrigger>
                  </TabsList>
                  
                  <Button 
                    variant="outline" 
                    className="border-brand-charcoal text-white hidden md:flex items-center gap-2"
                    onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                  >
                    <Filter size={16} />
                    <span>FILTER</span>
                    <ChevronDown size={16} />
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-brand-charcoal text-white md:hidden flex items-center gap-2 mt-4"
                  onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                >
                  <Filter size={14} />
                  <span>FILTER</span>
                  <ChevronDown size={14} className={`transition-transform ${showFiltersMobile ? 'rotate-180' : ''}`} />
                </Button>
                
                {/* Mobile filters dropdown */}
                <AnimatePresence>
                  {showFiltersMobile && (
                    <motion.div 
                      className="mt-4 p-4 bg-brand-charcoal/50 rounded-md"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <Button size="sm" variant="ghost" className="text-white/70 hover:text-white">Price: Low to High</Button>
                        <Button size="sm" variant="ghost" className="text-white/70 hover:text-white">Price: High to Low</Button>
                        <Button size="sm" variant="ghost" className="text-white/70 hover:text-white">Newest</Button>
                        <Button size="sm" variant="ghost" className="text-white/70 hover:text-white">Best Selling</Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Tabs>
            </div>
          </div>
        </motion.section>
        
        {/* Products grid with enhanced animations and responsiveness */}
        <section className="py-16 container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map(product => (
              <motion.div 
                key={product.id}
                className="group bg-brand-charcoal/30 backdrop-blur-sm rounded-sm overflow-hidden"
                variants={itemVariants}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-[300px] relative overflow-hidden">
                  <div className="w-full h-full">
                    <ThreeContainer environmentPreset={hoveredProduct === product.id ? "studio" : "warehouse"}>
                      <ProductModel 
                        position={[0, 0, 0]} 
                        color={product.color} 
                        hovered={hoveredProduct === product.id}
                      />
                    </ThreeContainer>
                  </div>
                  
                  {/* Product tags with animated entrance */}
                  <AnimatePresence>
                    {product.tags && product.tags.includes("bestseller") && (
                      <motion.div 
                        className="absolute top-4 left-4 bg-brand-silver text-xs text-brand-black px-2 py-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        BESTSELLER
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <AnimatePresence>
                    {product.tags && product.tags.includes("new") && (
                      <motion.div 
                        className="absolute top-4 right-4 bg-white text-xs text-brand-black px-2 py-1"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        NEW
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Wishlist button */}
                  <motion.button
                    className={`absolute top-4 ${product.tags && product.tags.includes("new") ? "right-16" : "right-4"} w-8 h-8 rounded-full flex items-center justify-center ${likedProducts.includes(product.id) ? 'bg-white' : 'bg-brand-charcoal/50 backdrop-blur-sm'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLikeProduct(product.id, product.name);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart 
                      size={16} 
                      className={likedProducts.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-white'} 
                    />
                  </motion.button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-white text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-medium">${product.price}</span>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="sm" 
                        className="bg-brand-silver text-brand-black hover:bg-white"
                        onClick={() => handleAddToCart(product.id, product.name)}
                      >
                        <ShoppingBag size={16} className="mr-2" /> ADD
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {filteredProducts.length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-white text-lg">No products found in this category.</p>
            </motion.div>
          )}
        </section>
      </main>
      <Footer />
      
      {/* Add custom styles for hiding scrollbars while allowing scrolling */}
      <style>
        {`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default Products;
