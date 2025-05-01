
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { Sparkles } from 'lucide-react';

const ChatbotPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-light to-white">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-travel-primary to-travel-secondary bg-clip-text text-transparent">Your AI Travel Guide</h1>
              <Sparkles className="h-6 w-6 text-travel-secondary animate-pulse" />
            </div>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              Ask me anything about destinations, travel tips, local customs, or get personalized recommendations tailored just for you!
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-travel-accent h-[600px] transform transition-all hover:shadow-2xl">
            <Chatbot />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatbotPage;
