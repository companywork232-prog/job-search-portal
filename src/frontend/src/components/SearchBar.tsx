import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import { Grid3X3, MapPin, Search } from "lucide-react";
import { useState } from "react";

const LOCATIONS = [
  "Any Location",
  "New York, NY",
  "San Francisco, CA",
  "Austin, TX",
  "Chicago, IL",
  "Seattle, WA",
  "Boston, MA",
  "Remote",
];

const CATEGORIES = [
  "All Categories",
  "Technology",
  "Finance",
  "Healthcare",
  "Marketing",
  "Education",
  "Design",
  "Sales",
  "Operations",
  "Legal",
];

interface SearchBarProps {
  defaultKeyword?: string;
  defaultLocation?: string;
  defaultCategory?: string;
  variant?: "hero" | "compact";
}

export function SearchBar({
  defaultKeyword = "",
  defaultLocation = "",
  defaultCategory = "",
  variant = "hero",
}: SearchBarProps) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [location, setLocation] = useState(defaultLocation || "any");
  const [category, setCategory] = useState(defaultCategory || "all");

  const handleSearch = () => {
    const params: Record<string, string> = {};
    if (keyword.trim()) params.keyword = keyword.trim();
    if (location && location !== "any") params.location = location;
    if (category && category !== "all") params.category = category;
    navigate({ to: "/jobs", search: params });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const isHero = variant === "hero";

  return (
    <div
      className={`flex ${isHero ? "flex-col sm:flex-row" : "flex-row"} gap-2 ${
        isHero ? "bg-card rounded-2xl p-2 shadow-lg border border-border" : ""
      }`}
      data-ocid="search.panel"
    >
      {/* Keyword */}
      <div
        className={`flex items-center gap-2 flex-1 ${
          isHero ? "bg-background rounded-xl px-3 py-2" : ""
        }`}
      >
        <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={onKey}
          placeholder="Job title, keywords, or company"
          className={`border-0 bg-transparent shadow-none focus-visible:ring-0 p-0 ${isHero ? "text-sm" : ""}`}
          data-ocid="search.input"
        />
      </div>

      {/* Divider */}
      {isHero && (
        <div className="hidden sm:block w-px bg-border self-stretch" />
      )}

      {/* Location */}
      <div
        className={`flex items-center gap-2 ${
          isHero ? "bg-background rounded-xl px-3 py-1" : ""
        }`}
      >
        <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger
            className="border-0 bg-transparent shadow-none focus:ring-0 min-w-[140px] p-0 h-auto"
            data-ocid="search.location_select"
          >
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Location</SelectItem>
            {LOCATIONS.slice(1).map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Divider */}
      {isHero && (
        <div className="hidden sm:block w-px bg-border self-stretch" />
      )}

      {/* Category */}
      <div
        className={`flex items-center gap-2 ${
          isHero ? "bg-background rounded-xl px-3 py-1" : ""
        }`}
      >
        <Grid3X3 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger
            className="border-0 bg-transparent shadow-none focus:ring-0 min-w-[140px] p-0 h-auto"
            data-ocid="search.category_select"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.slice(1).map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search button */}
      <Button
        onClick={handleSearch}
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 font-semibold"
        data-ocid="search.submit_button"
      >
        <Search className="w-4 h-4 mr-1" />
        {isHero ? "Search Jobs" : "Search"}
      </Button>
    </div>
  );
}
