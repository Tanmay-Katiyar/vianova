
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface DestinationProps {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  category: string;
}

const DestinationCard = ({ id, name, location, image, price, rating, category }: DestinationProps) => {
  return (
    <Link to={`/destination/${id}`}>
      <Card className="overflow-hidden border-none shadow-md hover:shadow-xl destination-card">
        <div className="relative h-56 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-travel-primary hover:bg-travel-secondary text-white">{category}</Badge>
          </div>
          <div className="absolute top-4 right-4">
            <div className="bg-white/80 backdrop-blur-sm text-travel-primary px-2 py-1 rounded-md flex items-center text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {rating.toFixed(1)}
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg line-clamp-1">{name}</h3>
              <p className="text-muted-foreground text-sm">{location}</p>
            </div>
            <div className="text-travel-primary font-bold">
              ${price}<span className="text-muted-foreground text-xs font-normal">/day</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DestinationCard;
