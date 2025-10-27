import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  sortBy: string;
  onSortChange: (value: string) => void;
  resultsCount: number;
  onClear: () => void;
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  sortBy,
  onSortChange,
  resultsCount,
  onClear,
}: SearchFilterProps) {
  const hasActiveFilters = searchQuery || selectedCategory !== "all";

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
            data-testid="input-search"
          />
        </div>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full md:w-48" data-testid="select-category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full md:w-48" data-testid="select-sort">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest First</SelectItem>
            <SelectItem value="date-asc">Oldest First</SelectItem>
            <SelectItem value="title-asc">Title (A-Z)</SelectItem>
            <SelectItem value="title-desc">Title (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count and Clear */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground" data-testid="text-results-count">
          {resultsCount} {resultsCount === 1 ? "result" : "results"} found
        </span>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            data-testid="button-clear-filters"
          >
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
