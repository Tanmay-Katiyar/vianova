
import React from 'react';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import Footer from '@/components/Footer';
import ChatbotButton from '@/components/ChatbotButton';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedDestinations />
        <section className="py-16 bg-accent">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center mb-4 gap-2 px-4 py-1.5 rounded-full bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered Travel Assistant</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Discover Your Perfect Destination</h2>
              <p className="text-lg mb-8 text-muted-foreground">
                Take our personality quiz and let our AI find the ideal destination based on your mood, budget, and interests.
              </p>
              <Button asChild size="lg" className="mb-10 bg-primary hover:bg-primary/90 text-white">
                <Link to="/destinations">Take the Travel Quiz</Link>
              </Button>
              <div 
                className="bg-white rounded-2xl overflow-hidden shadow-xl p-6 md:p-8 border border-border"
              >
                <div className="aspect-video max-w-2xl mx-auto rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center relative">
                  <img 
                    src="https://images.unsplash.com/photo-1682687220566-5599dbbebf11?q=80&w=1770&auto=format&fit=crop" 
                    alt="AI Travel Assistant" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6 text-white text-left">
                      <h3 className="text-2xl font-bold mb-2">Your Personal AI Guide</h3>
                      <p className="text-sm text-white/80">
                        Get personalized recommendations and travel insights with our AI assistant
                      </p>
                    </div>
                  </div>
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
