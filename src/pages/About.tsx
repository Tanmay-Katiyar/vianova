
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import ChatbotButton from '@/components/ChatbotButton';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Savvy<span className="text-travel-primary">Travel</span></h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your AI-powered travel companion for discovering the world's best destinations
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At SavvyTravel, we believe that travel is more than just visiting new places—it's about creating meaningful experiences and connections. Our mission is to make travel planning easier, more personalized, and more enjoyable for everyone.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Through our innovative AI-powered platform, we help travelers discover destinations that truly match their preferences, provide genuine insights about locations around the world, and offer personalized recommendations that make each journey special.
              </p>
              <Button className="bg-travel-primary hover:bg-travel-secondary">Learn More</Button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=1770&auto=format&fit=crop"
                alt="Team planning travel destinations" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="bg-travel-accent rounded-3xl p-8 md:p-12 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-travel-primary text-2xl font-bold">50+</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Countries</h3>
                <p className="text-muted-foreground">Destinations from over 50 countries across 6 continents</p>
              </div>
              <div>
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-travel-primary text-2xl font-bold">500+</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Destinations</h3>
                <p className="text-muted-foreground">Carefully curated destinations for every type of traveler</p>
              </div>
              <div>
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-travel-primary text-2xl font-bold">24/7</span>
                </div>
                <h3 className="text-xl font-bold mb-2">AI Support</h3>
                <p className="text-muted-foreground">Our AI travel guide is always ready to assist you</p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Tanu Sharma",
                  role: "Founder & CEO",
                  image: "https://erp.psit.ac.in/assets/img/Simages/2412436.jpg"
                },
                {
                  name: "Harsh Awasthi",
                  role: "Chief Travel Officer",
                  image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop"
                },
                {
                  name: "Vaibhav Pathak",
                  role: "AI Development Lead",
                  image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1374&auto=format&fit=crop"
                },
                {
                  name: "Tanmay Katiyar",
                  role: "Head of Partnerships",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop"
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're just getting started on our mission to transform travel planning. 
              Sign up for our newsletter to stay updated on new features, destinations, and travel insights.
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-travel-primary/20 focus:border-travel-primary"
              />
              <Button className="bg-travel-primary hover:bg-travel-secondary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <ChatbotButton />
    </div>
  );
};

export default About;
