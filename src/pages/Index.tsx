
import React from 'react';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import Footer from '@/components/Footer';
import ChatbotButton from '@/components/ChatbotButton';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedDestinations />
        <section className="py-16 bg-travel-accent">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Personal AI Travel Guide</h2>
              <p className="text-lg mb-8">
                Get personalized recommendations, travel tips, and information about any destination with our AI-powered travel assistant.
              </p>
              <div 
                className="bg-white rounded-2xl overflow-hidden shadow-xl p-6 md:p-8"
              >
                <div className="aspect-video max-w-2xl mx-auto rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1682687220566-5599dbbebf11?q=80&w=1770&auto=format&fit=crop" 
                    alt="AI Travel Assistant" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatbotButton />
    </div>
  );
};

export default Index;
