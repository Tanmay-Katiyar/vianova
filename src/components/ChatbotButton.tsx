
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Chatbot from "./Chatbot";
import { MessageCircle } from "lucide-react";

interface ChatbotButtonProps {
  selectedDestination?: string;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ selectedDestination }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg bg-gradient-to-r from-travel-primary to-travel-secondary hover:shadow-xl hover:scale-105 transition-all duration-300"
          size="icon"
        >
          <MessageCircle size={26} className="text-white" />
          <span className="sr-only">Open AI Travel Guide</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-center">AI Travel Guide</DialogTitle>
        </DialogHeader>
        <div className="h-full">
          <Chatbot selectedDestination={selectedDestination} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotButton;
