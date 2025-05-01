
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-travel-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">S</span>
            <span className="font-bold text-xl">Savvy<span className="text-travel-primary">Travel</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-travel-primary font-medium">Home</Link>
            <Link to="/destinations" className="text-foreground hover:text-travel-primary font-medium">Destinations</Link>
            <Link to="/about" className="text-foreground hover:text-travel-primary font-medium">About</Link>
            <Button variant="ghost" className="hover:bg-travel-accent hover:text-travel-primary">Sign In</Button>
            <Button className="bg-travel-primary hover:bg-travel-secondary">Sign Up</Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-travel-primary font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/destinations" 
                className="text-foreground hover:text-travel-primary font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Destinations
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-travel-primary font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <div className="flex flex-col gap-2 mt-2">
                <Button variant="ghost" className="justify-start hover:bg-travel-accent hover:text-travel-primary w-full">Sign In</Button>
                <Button className="bg-travel-primary hover:bg-travel-secondary w-full">Sign Up</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
