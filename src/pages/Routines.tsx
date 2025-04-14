
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, ArrowDown, CheckCircle } from "lucide-react";
import ThreeContainer from '@/components/3d/ThreeContainer';
import ProductModel from '@/components/3d/ProductModel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Routine steps data
const morningRoutine = [
  {
    id: 1,
    step: "Step 1",
    title: "Cleanse",
    description: "Start with our Hydrating Face Wash to remove impurities and prepare skin for the day.",
    productId: 1,
    productName: "Hydrating Face Wash",
    productColor: "#8AC7DB",
    timeRequired: "1 minute"
  },
  {
    id: 2,
    step: "Step 2",
    title: "Treat",
    description: "Apply our Revitalizing Serum to target specific concerns and boost skin health.",
    productId: 2,
    productName: "Revitalizing Serum",
    productColor: "#C0C0C0",
    timeRequired: "30 seconds"
  },
  {
    id: 3,
    step: "Step 3",
    title: "Moisturize",
    description: "Finish with Daily Moisturizer to hydrate and protect your skin throughout the day.",
    productId: 3,
    productName: "Daily Moisturizer",
    productColor: "#385170",
    timeRequired: "30 seconds"
  }
];

const eveningRoutine = [
  {
    id: 1,
    step: "Step 1",
    title: "Cleanse",
    description: "Remove the day's buildup with our Hydrating Face Wash.",
    productId: 1,
    productName: "Hydrating Face Wash",
    productColor: "#8AC7DB",
    timeRequired: "1 minute"
  },
  {
    id: 2,
    step: "Step 2",
    title: "Exfoliate",
    description: "Use our Exfoliating Scrub twice weekly to remove dead skin cells.",
    productId: 7,
    productName: "Exfoliating Scrub",
    productColor: "#90EE90",
    timeRequired: "2 minutes"
  },
  {
    id: 3,
    step: "Step 3",
    title: "Treat",
    description: "Apply our Revitalizing Serum to repair and rejuvenate skin overnight.",
    productId: 2,
    productName: "Revitalizing Serum",
    productColor: "#C0C0C0",
    timeRequired: "30 seconds"
  },
  {
    id: 4,
    step: "Step 4",
    title: "Moisturize",
    description: "Apply a slightly thicker layer of Daily Moisturizer for overnight hydration.",
    productId: 3,
    productName: "Daily Moisturizer",
    productColor: "#385170",
    timeRequired: "30 seconds"
  }
];

const Routines = () => {
  const [selectedRoutine, setSelectedRoutine] = useState("morning");
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const currentRoutine = selectedRoutine === "morning" ? morningRoutine : eveningRoutine;
  const totalTime = currentRoutine.reduce((acc, step) => {
    const timeInMinutes = parseFloat(step.timeRequired.split(' ')[0]);
    return acc + timeInMinutes;
  }, 0);

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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">DAILY ROUTINES</h1>
            <p className="text-white/70 max-w-xl mx-auto">
              Optimize your grooming ritual with our carefully structured routines designed for maximum results.
            </p>
          </motion.div>
        </section>
        
        {/* Routine selector */}
        <section className="py-10 container mx-auto px-4">
          <Tabs 
            defaultValue="morning" 
            className="w-full max-w-3xl mx-auto" 
            onValueChange={setSelectedRoutine}
          >
            <TabsList className="grid w-full grid-cols-2 bg-brand-charcoal/40">
              <TabsTrigger value="morning" className="data-[state=active]:bg-brand-silver data-[state=active]:text-brand-black">
                MORNING ROUTINE
              </TabsTrigger>
              <TabsTrigger value="evening" className="data-[state=active]:bg-brand-silver data-[state=active]:text-brand-black">
                EVENING ROUTINE
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-8 mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {selectedRoutine === "morning" ? "MORNING ROUTINE" : "EVENING ROUTINE"}
              </h2>
              <div className="flex items-center text-white/70 text-sm">
                <Clock size={16} className="mr-2" />
                <span>Total time: {totalTime} minutes</span>
              </div>
            </div>
            
            <TabsContent value="morning">
              <div className="space-y-8">
                {morningRoutine.map((step, index) => (
                  <RoutineStep 
                    key={step.id}
                    step={step}
                    isActive={activeStep === step.id}
                    onToggle={() => setActiveStep(activeStep === step.id ? null : step.id)}
                    isLast={index === morningRoutine.length - 1}
                  />
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Button className="bg-brand-silver text-brand-black hover:bg-white">
                  SHOP MORNING ROUTINE PRODUCTS <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="evening">
              <div className="space-y-8">
                {eveningRoutine.map((step, index) => (
                  <RoutineStep 
                    key={step.id}
                    step={step}
                    isActive={activeStep === step.id}
                    onToggle={() => setActiveStep(activeStep === step.id ? null : step.id)}
                    isLast={index === eveningRoutine.length - 1}
                  />
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Button className="bg-brand-silver text-brand-black hover:bg-white">
                  SHOP EVENING ROUTINE PRODUCTS <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Custom routine section */}
        <section className="py-16 bg-brand-navy/30 mt-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">CREATE YOUR CUSTOM ROUTINE</h2>
              <p className="text-white/70 mb-8">
                Everyone's skin is different. Build a personalized routine that addresses your specific needs and concerns.
              </p>
              <Button className="bg-brand-silver text-brand-black hover:bg-white">
                START BUILDING <ArrowRight className="ml-2" size={16} />
              </Button>
            </motion.div>
          </div>
        </section>
        
        {/* FAQ section */}
        <section className="py-16 container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">FREQUENTLY ASKED QUESTIONS</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-brand-charcoal">
              <AccordionTrigger className="text-white hover:text-brand-silver">
                How long should I follow each routine?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Consistency is key. For optimal results, follow your chosen routine for at least 4-6 weeks to allow your skin to adjust and show improvement.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b border-brand-charcoal">
              <AccordionTrigger className="text-white hover:text-brand-silver">
                Can I mix products from different routines?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Yes, our products are designed to work well together. However, we recommend consulting our custom routine builder to ensure product compatibility.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b border-brand-charcoal">
              <AccordionTrigger className="text-white hover:text-brand-silver">
                How do I adjust my routine for different seasons?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                During colder months, focus on additional hydration. In warmer months, lighter formulations and increased SPF protection are recommended. Our seasonal guides provide specific adjustments.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-b border-brand-charcoal">
              <AccordionTrigger className="text-white hover:text-brand-silver">
                Can these routines help with specific skin concerns?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Our standard routines address general skin health. For specific concerns like acne, hyperpigmentation, or aging, check out our targeted routines or use our custom routine builder.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Routine step component
const RoutineStep = ({ step, isActive, onToggle, isLast }) => {
  return (
    <motion.div 
      className={`border ${isActive ? 'border-brand-silver' : 'border-brand-charcoal/70'} bg-brand-charcoal/20`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: step.id * 0.1 }}
    >
      <div 
        className="p-6 flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${isActive ? 'bg-brand-silver text-brand-black' : 'bg-brand-charcoal text-white/70'}`}>
            {step.id}
          </div>
          <div>
            <p className="text-white/50 text-sm">{step.step}</p>
            <h3 className="text-white font-semibold">{step.title}</h3>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-white/70 mr-4 hidden md:block">{step.timeRequired}</span>
          <ArrowDown 
            size={20} 
            className={`transition-transform text-white/70 ${isActive ? 'rotate-180' : ''}`} 
          />
        </div>
      </div>
      
      {isActive && (
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-brand-charcoal/70">
          <div className="p-6 md:col-span-2">
            <p className="text-white/70 mb-6">{step.description}</p>
            <div className="flex items-center text-sm text-white/50 mb-4">
              <Clock size={16} className="mr-2" />
              <span>Time required: {step.timeRequired}</span>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-white/70 text-sm">
                <CheckCircle size={16} className="mr-2 text-brand-silver" />
                <span>Apply using gentle patting motions</span>
              </li>
              <li className="flex items-center text-white/70 text-sm">
                <CheckCircle size={16} className="mr-2 text-brand-silver" />
                <span>Wait 30 seconds before proceeding to next step</span>
              </li>
            </ul>
            <Button size="sm">LEARN MORE</Button>
          </div>
          <div className="aspect-square md:h-full bg-brand-charcoal/40 flex items-center justify-center">
            <div className="w-full h-52 relative">
              <ThreeContainer>
                <ProductModel 
                  position={[0, 0, 0]} 
                  color={step.productColor} 
                  hovered={true}
                />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
              </ThreeContainer>
              <div className="absolute bottom-0 left-0 right-0 text-center p-4">
                <p className="text-white font-medium">{step.productName}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!isLast && !isActive && (
        <div className="h-8 relative">
          <div className="absolute left-10 top-0 bottom-0 w-px bg-brand-charcoal/50"></div>
        </div>
      )}
    </motion.div>
  );
};

export default Routines;
