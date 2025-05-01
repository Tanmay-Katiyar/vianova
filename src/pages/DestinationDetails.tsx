
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatbotButton from '@/components/ChatbotButton';
import { getDestinationById } from '@/data/destinations';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DestinationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const destination = getDestinationById(id || '');

  const [activeImage, setActiveImage] = useState(0);

  // Mock data for details page
  const images = [
    destination?.image,
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1770&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1773&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1499856871958-5b9357976b82?q=80&w=1767&auto=format&fit=crop',
  ];

  const amenities = [
    "Free WiFi", 
    "Swimming Pool", 
    "Air Conditioning", 
    "Restaurant", 
    "Room Service",
    "Fitness Center",
    "Spa",
    "Airport Shuttle"
  ];

  const reviews = [
    {
      id: 1,
      name: "Alex Johnson",
      rating: 5,
      date: "October 15, 2024",
      comment: "Amazing place! The views were breathtaking and the staff was incredibly friendly. Would definitely recommend to anyone looking for a perfect getaway."
    },
    {
      id: 2,
      name: "Sarah Williams",
      rating: 4,
      date: "September 20, 2024",
      comment: "Great location and facilities. The rooms were clean and comfortable. Only giving 4 stars because the restaurant was a bit expensive."
    },
    {
      id: 3,
      name: "Michael Chen",
      rating: 5,
      date: "August 5, 2024",
      comment: "One of the best travel experiences I've ever had. The location is perfect and the activities available are endless. Can't wait to come back!"
    }
  ];

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Destination not found</h1>
            <Button 
              onClick={() => navigate('/destinations')}
              className="bg-travel-primary hover:bg-travel-secondary"
            >
              Back to Destinations
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="mb-4"
              onClick={() => navigate('/destinations')}
            >
              &larr; Back to All Destinations
            </Button>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{destination.name}</h1>
                <p className="text-muted-foreground flex items-center gap-2">
                  <span>{destination.location}</span>
                  <span className="inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-travel-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1">{destination.rating.toFixed(1)} rating</span>
                  </span>
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <p className="text-3xl font-bold text-travel-primary">
                  ${destination.price}<span className="text-sm text-muted-foreground">/night</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Main image */}
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden h-[400px] shadow-md">
                <img 
                  src={images[activeImage]}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Image gallery */}
            <div className="grid grid-cols-2 gap-4 h-fit">
              {images.map((image, index) => (
                <div 
                  key={index}
                  className={`rounded-lg overflow-hidden h-[120px] cursor-pointer transition-all ${activeImage === index ? 'ring-4 ring-travel-primary' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={image}
                    alt={`${destination.name} view ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
                    <p className="text-muted-foreground mb-4">
                      Located in the beautiful {destination.location}, {destination.name} offers an unforgettable experience for travelers seeking {destination.category.toLowerCase()} adventures. 
                      Surrounded by breathtaking views and local attractions, this destination provides the perfect balance of relaxation and excitement.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      The property features modern accommodations with all the amenities you need for a comfortable stay. 
                      Whether you're looking to explore the local culture, enjoy outdoor activities, or simply unwind in a peaceful setting,
                      {destination.name} has something for everyone.
                    </p>
                    <p className="text-muted-foreground">
                      With a stellar rating of {destination.rating.toFixed(1)}/5 from previous guests, 
                      you can be confident that your stay will exceed expectations.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="amenities">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-travel-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Guest Reviews</h2>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6">
                          <div className="flex justify-between mb-2">
                            <h3 className="font-semibold">{review.name}</h3>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex mb-2">
                            {Array(5).fill(0).map((_, i) => (
                              <svg 
                                key={i}
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-4 w-4 ${i < review.rating ? 'text-travel-primary' : 'text-gray-300'}`} 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 border">
                <h2 className="text-xl font-bold mb-4">Book this destination</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Check In</label>
                      <input 
                        type="date" 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-travel-primary/20 focus:border-travel-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Check Out</label>
                      <input 
                        type="date" 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-travel-primary/20 focus:border-travel-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Guests</label>
                    <select 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-travel-primary/20 focus:border-travel-primary"
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4+ Guests</option>
                    </select>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <span>${destination.price} x 5 nights</span>
                      <span>${destination.price * 5}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Service fee</span>
                      <span>${(destination.price * 5 * 0.12).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                      <span>Total</span>
                      <span>${(destination.price * 5 * 1.12).toFixed(2)}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-travel-primary hover:bg-travel-secondary">
                    Book Now
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    You won't be charged yet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatbotButton selectedDestination={destination.name} />
    </div>
  );
};

export default DestinationDetails;
