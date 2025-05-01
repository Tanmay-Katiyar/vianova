
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortAsc } from "lucide-react";

interface SortDropdownProps {
  sortOption: string;
  setSortOption: (option: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sortOption, setSortOption }) => {
  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-sm">
      <SortAsc className="h-4 w-4 text-travel-secondary" />
      <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
      <Select value={sortOption} onValueChange={setSortOption}>
        <SelectTrigger className="w-[180px] bg-white border-travel-primary/20 focus:ring-travel-primary">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recommended">Recommended</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="rating">Highest Rated</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortDropdown;
