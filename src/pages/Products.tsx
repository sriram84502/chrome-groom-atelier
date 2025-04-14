
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Filter, ChevronDown } from "lucide-react";
import ThreeContainer from '@/components/3d/ThreeContainer';
import ProductModel from '@/components/3d/ProductModel';

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
    color: "#C0C0C0",
    description: "Powerful antioxidant formulation that brightens and reduces fine lines."
  },
  {
    id: 3,
    name: "Daily Moisturizer",
    price: 42,
    category: "skincare",
    color: "#385170",
    description: "Lightweight moisturizer that hydrates and strengthens the skin barrier."
  },
  {
    id: 4,
    name: "Premium Beard Oil",
    price: 36,
    category: "beard",
    color: "#5D8AA8",
    description: "Luxurious oil that softens beard hair and soothes the skin underneath."
  },
  {
    id: 5,
    name: "Clarifying Shampoo",
    price: 32,
    category: "hair",
    color: "#71797E",
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

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">SHOP CHROME</h1>
            <p className="text-white/70 max-w-xl mx-auto">
              Premium grooming essentials made for the modern man. Discover products that elevate your daily routine.
            </p>
          </motion.div>
        </section>
        
        {/* Filter section */}
        <section className="py-6 border-t border-b border-brand-charcoal">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
                <TabsList className="bg-transparent border-b border-brand-charcoal w-full justify-start gap-8 h-auto pb-2">
                  <TabsTrigger value="all" className="text-white/70 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-brand-silver rounded-none bg-transparent">
                    ALL PRODUCTS
                  </TabsTrigger>
                  <TabsTrigger value="skincare" className="text-white/70 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-brand-silver rounded-none bg-transparent">
                    SKINCARE
                  </TabsTrigger>
                  <TabsTrigger value="hair" className="text-white/70 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-brand-silver rounded-none bg-transparent">
                    HAIR
                  </TabsTrigger>
                  <TabsTrigger value="beard" className="text-white/70 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-brand-silver rounded-none bg-transparent">
                    BEARD
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button variant="outline" className="border-brand-charcoal text-white hidden md:flex items-center gap-2">
                <Filter size={16} />
                <span>FILTER</span>
                <ChevronDown size={16} />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Products grid */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <motion.div 
                key={product.id}
                className="group bg-brand-charcoal/30 rounded-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: product.id * 0.1 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="h-[300px] relative overflow-hidden">
                  <div className="w-full h-full">
                    <ThreeContainer>
                      <ProductModel 
                        position={[0, 0, 0]} 
                        color={product.color} 
                        hovered={hoveredProduct === product.id}
                      />
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                    </ThreeContainer>
                  </div>
                  {product.tags && product.tags.includes("bestseller") && (
                    <div className="absolute top-4 left-4 bg-brand-silver text-xs text-brand-black px-2 py-1">
                      BESTSELLER
                    </div>
                  )}
                  {product.tags && product.tags.includes("new") && (
                    <div className="absolute top-4 right-4 bg-white text-xs text-brand-black px-2 py-1">
                      NEW
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-white text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-medium">${product.price}</span>
                    <Button size="sm" className="bg-brand-silver text-brand-black hover:bg-white">
                      <ShoppingBag size={16} className="mr-2" /> ADD
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
