
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const ChatbotPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your AI Travel Guide</h1>
            <p className="text-muted-foreground md:text-lg">
              Ask me anything about destinations, travel tips, local customs, or get personalized recommendations!
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border h-[600px]">
            <Chatbot />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatbotPage;
