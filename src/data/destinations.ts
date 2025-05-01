
import { DestinationProps } from '@/components/DestinationCard';

export const destinations: DestinationProps[] = [
  {
    id: "1",
    name: "Bali Paradise Resort",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1738&auto=format&fit=crop",
    price: 120,
    rating: 4.8,
    category: "Beach"
  },
  {
    id: "2",
    name: "Alpine Lodge",
    location: "Swiss Alps, Switzerland",
    image: "https://images.unsplash.com/photo-1548588627-f978862b85e1?q=80&w=1470&auto=format&fit=crop",
    price: 250,
    rating: 4.9,
    category: "Mountain"
  },
  {
    id: "3",
    name: "Tokyo Sky View",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1587&auto=format&fit=crop",
    price: 180,
    rating: 4.7,
    category: "City"
  },
  {
    id: "4",
    name: "Santorini Villa",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1738&auto=format&fit=crop",
    price: 320,
    rating: 5.0,
    category: "Beach"
  },
  {
    id: "5",
    name: "Amazon Jungle Lodge",
    location: "Amazon, Brazil",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1574&auto=format&fit=crop",
    price: 150,
    rating: 4.5,
    category: "Nature"
  },
  {
    id: "6",
    name: "Paris Apartment",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?q=80&w=1664&auto=format&fit=crop",
    price: 210,
    rating: 4.6,
    category: "City"
  },
  {
    id: "7",
    name: "Marrakech Riad",
    location: "Marrakech, Morocco",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1776&auto=format&fit=crop",
    price: 90,
    rating: 4.4,
    category: "Cultural"
  },
  {
    id: "8",
    name: "Grand Canyon Lodge",
    location: "Arizona, USA",
    image: "https://images.unsplash.com/photo-1527333656061-ca7adf608ae1?q=80&w=1769&auto=format&fit=crop",
    price: 175,
    rating: 4.7,
    category: "Nature"
  },
  {
    id: "9",
    name: "Sydney Harbor View",
    location: "Sydney, Australia",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1770&auto=format&fit=crop",
    price: 230,
    rating: 4.8,
    category: "City"
  },
  {
    id: "10",
    name: "Maldives Water Villa",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1665&auto=format&fit=crop",
    price: 550,
    rating: 5.0,
    category: "Luxury"
  },
  {
    id: "11",
    name: "African Safari Lodge",
    location: "Serengeti, Tanzania",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1772&auto=format&fit=crop",
    price: 420,
    rating: 4.9,
    category: "Adventure"
  },
  {
    id: "12",
    name: "New York Loft",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1522083165195-3424ed129620?q=80&w=1760&auto=format&fit=crop",
    price: 290,
    rating: 4.6,
    category: "City"
  },
  {
    id: "13",
    name: "Kyoto Traditional Inn",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1770&auto=format&fit=crop",
    price: 190,
    rating: 4.7,
    category: "Cultural"
  },
  {
    id: "14",
    name: "Costa Rica Eco Resort",
    location: "Costa Rica",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1770&auto=format&fit=crop",
    price: 160,
    rating: 4.8,
    category: "Eco-friendly"
  },
  {
    id: "15",
    name: "Venice Canal House",
    location: "Venice, Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1769&auto=format&fit=crop",
    price: 280,
    rating: 4.5,
    category: "Cultural"
  },
  {
    id: "16",
    name: "Dubai Luxury Suite",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1770&auto=format&fit=crop",
    price: 450,
    rating: 4.9,
    category: "Luxury"
  },
  {
    id: "17",
    name: "Reykjavik Nature Cabin",
    location: "Reykjavik, Iceland",
    image: "https://images.unsplash.com/photo-1504233529578-6d46baba6d34?q=80&w=1774&auto=format&fit=crop",
    price: 220,
    rating: 4.6,
    category: "Nature"
  },
  {
    id: "18",
    name: "Bangkok River House",
    location: "Bangkok, Thailand",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c8dd0d5?q=80&w=1650&auto=format&fit=crop",
    price: 110,
    rating: 4.3,
    category: "Cultural"
  }
];

export const categories = [
  "Beach",
  "Mountain",
  "City",
  "Nature",
  "Cultural",
  "Adventure",
  "Luxury",
  "Eco-friendly"
];

export const locations = [
  "Indonesia",
  "Switzerland",
  "Japan",
  "Greece",
  "Brazil",
  "France",
  "Morocco",
  "USA",
  "Australia",
  "Maldives",
  "Tanzania",
  "Italy",
  "UAE",
  "Iceland",
  "Thailand"
];

export const getAllDestinations = () => destinations;

export const getDestinationById = (id: string) => {
  return destinations.find((destination) => destination.id === id);
};

export const getFilteredDestinations = ({
  priceRange,
  selectedCategories,
  selectedRatings,
  selectedLocations,
  sortOption
}: {
  priceRange: [number, number];
  selectedCategories: string[];
  selectedRatings: number[];
  selectedLocations: string[];
  sortOption: string;
}) => {
  let filtered = [...destinations];

  // Filter by price range
  filtered = filtered.filter(
    (dest) => dest.price >= priceRange[0] && dest.price <= priceRange[1]
  );

  // Filter by category
  if (selectedCategories.length > 0) {
    filtered = filtered.filter((dest) => selectedCategories.includes(dest.category));
  }

  // Filter by rating
  if (selectedRatings.length > 0) {
    filtered = filtered.filter((dest) => {
      return selectedRatings.some((rating) => dest.rating >= rating);
    });
  }

  // Filter by location
  if (selectedLocations.length > 0) {
    filtered = filtered.filter((dest) => {
      const destCountry = dest.location.split(', ')[1] || dest.location;
      return selectedLocations.some((loc) => destCountry.includes(loc));
    });
  }

  // Sort destinations
  switch (sortOption) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      // For this example, we'll just reverse the order as a mockup
      filtered.reverse();
      break;
    default:
      // 'recommended' - no special sorting for now, could implement an algorithm later
      break;
  }

  return filtered;
};
