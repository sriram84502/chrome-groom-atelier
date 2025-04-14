
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import IngredientsSection from '@/components/home/IngredientsSection';
import LifestyleSection from '@/components/home/LifestyleSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import InstagramFeed from '@/components/home/InstagramFeed';
import NewsletterSection from '@/components/home/NewsletterSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <IngredientsSection />
        <LifestyleSection />
        <TestimonialsSection />
        <InstagramFeed />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
