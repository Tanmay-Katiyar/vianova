
import React from 'react';
import { motion } from 'framer-motion';
import DestinationCard from './DestinationCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { destinations } from '@/data/destinations';

const FeaturedDestinations = () => {
  const featuredDestinations = destinations.slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Indian Destinations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our hand-picked selection of the most amazing places to visit around India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <DestinationCard {...destination} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild className="bg-travel-primary hover:bg-travel-secondary">
            <Link to="/destinations">View All Indian Destinations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
