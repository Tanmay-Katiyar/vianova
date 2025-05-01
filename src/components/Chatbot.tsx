
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Send, Settings, Loader2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert"; 
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generateTravelResponse, hasApiKey, setApiKey, getApiKey } from '@/lib/gemini-api';

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
  const [apiKey, setApiKeyState] = useState<string>(getApiKey() || '');
  const [showApiKeyDialog, setShowApiKeyDialog] = useState<boolean>(!hasApiKey());
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

  const handleSend = async (e: React.FormEvent) => {
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

    try {
      // Get AI response using Gemini
      const aiResponse = await generateTravelResponse(input, selectedDestination);
      handleBotResponse(aiResponse);
    } catch (error) {
      console.error("Error generating response:", error);
      handleBotResponse("I'm having trouble connecting to my knowledge base. Please try again later.");
    } finally {
      setIsTyping(false);
    }
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

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    setApiKey(apiKey);
    setShowApiKeyDialog(false);
    toast.success("API key saved successfully!");
  };

  return (
    <>
      <Card className="w-full h-full flex flex-col shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-travel-primary to-travel-secondary text-white py-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-center">AI Travel Guide</CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowApiKeyDialog(true)}
              className="text-white hover:bg-white/20"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0 bg-gradient-to-b from-travel-light/50 to-white">
          <ScrollArea className="h-full max-h-[400px] md:max-h-[500px] w-full">
            <div className="flex flex-col space-y-4 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col max-w-[80%] ${
                    message.sender === 'user' ? 'ml-auto' : 'mr-auto'
                  } animate-fade-in`}
                >
                  <div 
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
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
                <div className="flex max-w-[80%] mr-auto animate-fade-in">
                  <div className="chatbot-message-bot px-6 py-4 rounded-2xl shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-travel-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-travel-primary rounded-full animate-pulse" style={{animationDelay: "0.2s"}}></div>
                      <div className="w-2 h-2 bg-travel-primary rounded-full animate-pulse" style={{animationDelay: "0.4s"}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t bg-white">
          <form onSubmit={handleSend} className="flex w-full gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about any destination..."
              className="flex-1 border-travel-primary/20 focus-visible:ring-travel-primary"
              disabled={isTyping || !hasApiKey()}
            />
            <Button 
              type="submit" 
              disabled={isTyping || input.trim() === '' || !hasApiKey()} 
              className="bg-travel-primary hover:bg-travel-secondary transition-colors"
            >
              {isTyping ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>

      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>AI API Key Required</DialogTitle>
            <DialogDescription>
              Enter your Gemini API key to enable the AI travel guide features.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Alert className="bg-travel-light border-travel-primary/30">
              <AlertDescription>
                Your API key is stored locally on your device and not sent to our servers.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiKey" className="text-right">
                API Key
              </Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKeyState(e.target.value)}
                className="col-span-3"
                placeholder="Enter your Gemini API key"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={handleSaveApiKey}
              className="bg-travel-primary hover:bg-travel-secondary"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Chatbot;
