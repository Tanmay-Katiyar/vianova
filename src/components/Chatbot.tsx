
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  selectedDestination?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ selectedDestination }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: selectedDestination 
        ? `Hello! I'm your AI travel guide. Ask me anything about ${selectedDestination}!` 
        : "Hello! I'm your AI travel guide. Ask me about any destination or travel tips!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle message when a destination is selected from the main app
  useEffect(() => {
    if (selectedDestination) {
      handleBotResponse(`I see you're interested in ${selectedDestination}! What would you like to know about it?`);
    }
  }, [selectedDestination]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      generateBotResponse(input);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let botResponse = '';

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      botResponse = "Hello there! How can I help with your travel plans today?";
    } else if (lowerCaseMessage.includes('best time') || lowerCaseMessage.includes('when to visit')) {
      botResponse = "The best time to visit depends on your destination. For tropical places, dry seasons are usually best. European destinations are lovely in late spring or early fall to avoid crowds. Would you like specific information about a destination?";
    } else if (lowerCaseMessage.includes('budget') || lowerCaseMessage.includes('cheap') || lowerCaseMessage.includes('expensive')) {
      botResponse = "If you're traveling on a budget, Southeast Asia, Eastern Europe, and parts of Latin America offer incredible experiences at lower costs. For luxury travel, consider the Maldives, Switzerland, or Japan. Would you like budget tips for a specific destination?";
    } else if (lowerCaseMessage.includes('food') || lowerCaseMessage.includes('eat') || lowerCaseMessage.includes('restaurant')) {
      botResponse = "Local food is one of the best ways to experience a destination! I can recommend authentic restaurants and dishes to try. Do you have a specific place in mind?";
    } else if (lowerCaseMessage.includes('safety') || lowerCaseMessage.includes('safe')) {
      botResponse = "Safety is an important consideration. Most popular tourist destinations are generally safe, but it's always good to research current conditions, follow local guidelines, and get proper travel insurance. Is there a specific location you're concerned about?";
    } else if (
      lowerCaseMessage.includes('paris') || 
      lowerCaseMessage.includes('france')
    ) {
      botResponse = "Paris is known as the City of Light! Beyond the iconic Eiffel Tower and Louvre, I recommend exploring the charming neighborhoods like Montmartre and Le Marais. The best time to visit is spring (April-June) or fall (September-October). Don't miss trying authentic croissants, visiting local markets, and taking a Seine river cruise at sunset!";
    } else if (
      lowerCaseMessage.includes('japan') || 
      lowerCaseMessage.includes('tokyo')
    ) {
      botResponse = "Japan offers an amazing blend of ancient traditions and cutting-edge modernity! Tokyo is incredibly vibrant, with districts like Shibuya and Shinjuku. Cherry blossom season (late March-early April) is spectacular but crowded. Consider visiting in fall for autumn colors. Don't miss trying ramen, visiting temples, and experiencing a traditional onsen bath!";
    } else if (
      lowerCaseMessage.includes('bali') || 
      lowerCaseMessage.includes('indonesia')
    ) {
      botResponse = "Bali is a paradise island with beautiful beaches, lush rice terraces, and a rich spiritual culture! Ubud is the cultural heart, while areas like Seminyak and Canggu offer great beaches and dining. The dry season (April-October) is ideal. Don't miss visiting temples like Tanah Lot, trying local dishes like Babi Guling, and watching a traditional Balinese dance performance!";
    } else if (selectedDestination) {
      botResponse = `About ${selectedDestination}: This is a beautiful destination with unique cultural experiences and amazing sights. I'd recommend visiting the local landmarks, trying the regional cuisine, and experiencing the unique local customs. Would you like more specific information about accommodations, activities, or travel tips for ${selectedDestination}?`;
    } else {
      botResponse = "That's an interesting question about travel! I can provide information about destinations, travel tips, local cuisine, attractions, or help you plan your next adventure. Feel free to ask about a specific place or aspect of travel you're curious about.";
    }

    handleBotResponse(botResponse);
  };

  const handleBotResponse = (text: string) => {
    const botMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="w-full h-full flex flex-col shadow-md overflow-hidden">
      <CardHeader className="bg-travel-primary text-white py-4">
        <CardTitle className="text-center">AI Travel Guide</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col max-w-[80%] ${
                message.sender === 'user' ? 'ml-auto' : 'mr-auto'
              }`}
            >
              <div 
                className={`px-4 py-3 rounded-2xl ${
                  message.sender === 'user' 
                    ? 'chatbot-message-user' 
                    : 'chatbot-message-bot'
                }`}
              >
                {message.text}
              </div>
              <span className={`text-xs text-muted-foreground mt-1 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}>
                {formatTime(message.timestamp)}
              </span>
            </div>
          ))}
          {isTyping && (
            <div className="flex max-w-[80%] mr-auto">
              <div className="chatbot-message-bot px-4 py-3 rounded-2xl">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-travel-primary/50 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-travel-primary/50 rounded-full animate-pulse" style={{animationDelay: "0.2s"}}></div>
                  <div className="w-2 h-2 bg-travel-primary/50 rounded-full animate-pulse" style={{animationDelay: "0.4s"}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSend} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about any destination..."
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isTyping || input.trim() === ''} 
            className="bg-travel-primary hover:bg-travel-secondary"
          >
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Chatbot;
