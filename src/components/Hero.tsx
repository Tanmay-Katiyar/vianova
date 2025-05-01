
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-travel-accent to-white pt-24 md:min-h-[700px] flex items-center">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
              <span className="text-travel-secondary">Discover</span> the World's Most Amazing Destinations
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{animationDelay: "0.2s"}}>
              Find your perfect travel destination with personalized recommendations and AI-powered travel guides.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: "0.4s"}}>
              <Button asChild size="lg" className="bg-travel-primary hover:bg-travel-secondary text-lg">
                <Link to="/destinations">Explore Destinations</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-travel-primary text-travel-primary hover:bg-travel-accent hover:text-travel-primary text-lg">
                <Link to="/chatbot">Chat with AI Guide</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex justify-end">
            <div className="relative">
              <div className="w-[400px] h-[500px] rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1682687982107-14492010e05e?q=80&w=1470&auto=format&fit=crop" 
                  alt="Travel destinations" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-16 w-48 h-48 rounded-2xl overflow-hidden shadow-lg animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1682687220363-35e4621ed990?q=80&w=1470&auto=format&fit=crop" 
                  alt="Beach destination" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full overflow-hidden shadow-lg animate-float" style={{animationDelay: "1s"}}>
                <img 
                  src="https://images.unsplash.com/photo-1703933400efe-798ca872c9aa?q=80&w=1470&auto=format&fit=crop" 
                  alt="Mountain destination" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-travel-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-travel-secondary/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Hero;
