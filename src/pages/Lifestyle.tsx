
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, User, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Articles data
const articles = [
  {
    id: 1,
    title: "The Science of Anti-Aging for Men",
    excerpt: "Understanding how men's skin ages differently and the most effective ingredients to combat it.",
    image: "/placeholder.svg",
    category: "skincare",
    author: "Dr. James Mitchell",
    date: "April 10, 2025",
    readTime: "6 min read"
  },
  {
    id: 2,
    title: "Mastering the Perfect Beard Shape for Your Face",
    excerpt: "How to identify your face shape and the beard style that will complement it best.",
    image: "/placeholder.svg",
    category: "grooming",
    author: "Thomas Reynolds",
    date: "April 5, 2025",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "Travel Grooming: Maintaining Your Routine on the Road",
    excerpt: "Simplified routines and space-saving products that deliver results while traveling.",
    image: "/placeholder.svg",
    category: "travel",
    author: "Alex Winters",
    date: "March 28, 2025",
    readTime: "5 min read"
  },
  {
    id: 4,
    title: "Building Confidence Through Self-Care",
    excerpt: "How a consistent grooming ritual can boost your mental wellbeing and confidence.",
    image: "/placeholder.svg",
    category: "wellness",
    author: "Dr. Sarah Chen",
    date: "March 20, 2025",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "Haircare 101: Understanding Your Hair Type",
    excerpt: "Identifying your hair type and choosing the right products and techniques for optimal care.",
    image: "/placeholder.svg",
    category: "haircare",
    author: "Marcus Johnson",
    date: "March 15, 2025",
    readTime: "6 min read"
  },
  {
    id: 6,
    title: "The Evolution of Men's Grooming",
    excerpt: "From basic necessities to modern luxury: how men's grooming has transformed over decades.",
    image: "/placeholder.svg",
    category: "culture",
    author: "Elizabeth Harper",
    date: "March 8, 2025",
    readTime: "9 min read"
  }
];

// Events data
const events = [
  {
    id: 1,
    title: "CHROME Pop-Up Shop",
    description: "Visit our exclusive pop-up store featuring product demonstrations and personalized consultations.",
    location: "SoHo, New York City",
    date: "May 15-17, 2025",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Grooming Masterclass",
    description: "Learn expert techniques from our master barbers and skincare specialists.",
    location: "The Modern Hotel, Chicago",
    date: "June 5, 2025",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Men's Wellness Summit",
    description: "Join us for a day focused on men's physical and mental wellbeing, featuring CHROME products.",
    location: "Pacific Design Center, Los Angeles",
    date: "July 12, 2025",
    image: "/placeholder.svg"
  }
];

const Lifestyle = () => {
  const [articleCategory, setArticleCategory] = useState("all");
  
  const filteredArticles = articleCategory === "all" 
    ? articles 
    : articles.filter(article => article.category === articleCategory);

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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">THE CHROME LIFESTYLE</h1>
            <p className="text-white/70 max-w-xl mx-auto">
              Discover articles, events, and inspiration to elevate every aspect of your daily life.
            </p>
          </motion.div>
        </section>
        
        {/* Featured article */}
        <section className="py-10 container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-video bg-brand-charcoal/70 overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="Featured article" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 lg:p-0">
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-brand-silver text-brand-black text-xs px-3 py-1">FEATURED</span>
                <span className="text-white/50 text-sm">April 12, 2025</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">The Modern Man's Guide to Self-Care</h2>
              <p className="text-white/70 mb-6 leading-relaxed">
                Beyond basic grooming: how to develop a comprehensive self-care routine that enhances your physical appearance, mental wellbeing, and confidence.
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-charcoal"></div>
                <div>
                  <p className="text-white text-sm">Written by</p>
                  <p className="text-white/70 text-sm">James Wilson</p>
                </div>
              </div>
              <Button className="bg-brand-silver text-brand-black hover:bg-white">
                READ ARTICLE <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          </motion.div>
        </section>
        
        {/* Journal / Articles */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8">JOURNAL</h2>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setArticleCategory}>
            <TabsList className="bg-transparent border-b border-brand-charcoal w-full justify-start gap-6 h-auto pb-2 mb-10">
              <TabsTrigger value="all" className="text-white/70 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-brand-silver rounded-none bg-transparent">
                ALL
              </TabsTrigger>
              <TabsTrigger value="skincare" className="text-white/70 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-brand-silver rounded-none bg-transparent">
                SKINCARE
              </TabsTrigger>
              <TabsTrigger value="grooming" className="text-white/70 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-brand-silver rounded-none bg-transparent">
                GROOMING
              </TabsTrigger>
              <TabsTrigger value="wellness" className="text-white/70 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-brand-silver rounded-none bg-transparent">
                WELLNESS
              </TabsTrigger>
              <TabsTrigger value="culture" className="text-white/70 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-brand-silver rounded-none bg-transparent">
                CULTURE
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </TabsContent>
            
            {["skincare", "grooming", "wellness", "culture", "travel", "haircare"].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-12 text-center">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-black">
              VIEW ALL ARTICLES <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </section>
        
        {/* Events section */}
        <section className="py-16 bg-brand-navy/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-12">UPCOMING EVENTS</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <motion.div 
                  key={event.id}
                  className="bg-brand-charcoal/40 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: event.id * 0.1 }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Calendar size={16} className="text-brand-silver" />
                      <span className="text-white/70 text-sm">{event.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                    <p className="text-white/60 mb-4">{event.description}</p>
                    <p className="text-white/70 text-sm mb-6">{event.location}</p>
                    <Button size="sm" className="bg-brand-silver text-brand-black hover:bg-white">
                      LEARN MORE
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Community section */}
        <section className="py-16 container mx-auto px-4 text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">JOIN THE CONVERSATION</h2>
            <p className="text-white/70 mb-8">
              Connect with like-minded individuals who share your passion for grooming, self-care, and personal growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-brand-silver text-brand-black hover:bg-white">
                CHROME COMMUNITY
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-black">
                #CHROMESTYLE
              </Button>
            </div>
          </motion.div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-brand-charcoal/40">
                <img 
                  src="/placeholder.svg" 
                  alt={`Community highlight ${i}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Article card component
const ArticleCard = ({ article }) => {
  return (
    <motion.div 
      className="group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="aspect-[4/3] bg-brand-charcoal/40 overflow-hidden mb-4">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div>
        <div className="flex items-center space-x-4 mb-3">
          <span className="text-brand-silver text-xs">{article.category.toUpperCase()}</span>
          <div className="flex items-center text-white/50 text-xs">
            <Clock size={14} className="mr-1" />
            {article.readTime}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-brand-silver transition-colors">
          {article.title}
        </h3>
        <p className="text-white/70 mb-4 line-clamp-2">{article.excerpt}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <User size={14} className="text-white/50" />
            <span className="text-white/50 text-sm">{article.author}</span>
          </div>
          <a href="#" className="text-brand-silver hover:text-white text-sm flex items-center">
            Read more <ArrowRight size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Lifestyle;
