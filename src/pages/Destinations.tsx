
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard';
import FilterSidebar from '@/components/FilterSidebar';
import SortDropdown from '@/components/SortDropdown';
import ChatbotButton from '@/components/ChatbotButton';
import MoodRecommender from '@/components/MoodRecommender';
import { 
  getFilteredDestinations, 
  categories, 
  locations 
} from '@/data/destinations';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

const Destinations = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('recommended');
  const [destinations, setDestinations] = useState(getFilteredDestinations({
    priceRange,
    selectedCategories,
    selectedRatings,
    selectedLocations,
    sortOption
  }));
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const ratings = [5, 4, 3, 2, 1];

  useEffect(() => {
    const filtered = getFilteredDestinations({
      priceRange,
      selectedCategories,
      selectedRatings,
      selectedLocations,
      sortOption
    });
    setDestinations(filtered);
  }, [priceRange, selectedCategories, selectedRatings, selectedLocations, sortOption]);

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedRatings([]);
    setSelectedLocations([]);
    setSortOption('recommended');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-travel-secondary">Discover Amazing Destinations</h1>
            <p className="text-muted-foreground">
              Find and book the perfect getaway from our curated selection of destinations
            </p>
          </div>

          {/* Mood Recommender Section */}
          <div className="mb-10 max-w-3xl mx-auto">
            <MoodRecommender />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4 flex items-center justify-between">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-travel-primary/20"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter size={18} />
                Filters
              </Button>
              <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
            </div>

            {/* Sidebar - Desktop & Mobile */}
            <div 
              className={`
                ${showMobileFilters ? 'block' : 'hidden'} 
                lg:block w-full lg:w-64 flex-shrink-0
              `}
            >
              <FilterSidebar 
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                categories={categories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                ratings={ratings}
                selectedRatings={selectedRatings}
                setSelectedRatings={setSelectedRatings}
                locations={locations}
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
                resetFilters={resetFilters}
              />
            </div>

            {/* Destination Cards */}
            <div className="flex-1">
              <div className="hidden lg:flex justify-between items-center mb-6">
                <div>
                  <span className="text-muted-foreground">
                    {destinations.length} destinations found
                  </span>
                </div>
                <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
              </div>

              {destinations.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2 text-travel-secondary">No destinations found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters to see more results
                  </p>
                  <Button 
                    onClick={resetFilters}
                    className="bg-travel-primary hover:bg-travel-secondary"
                  >
                    Reset All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destinations.map((destination) => (
                    <DestinationCard key={destination.id} {...destination} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatbotButton />
    </div>
  );
};

export default Destinations;
