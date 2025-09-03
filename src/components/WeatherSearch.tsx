import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

interface WeatherSearchProps {
  onSearch: (location: string) => void;
  isLoading?: boolean;
}

export const WeatherSearch = ({ onSearch, isLoading = false }: WeatherSearchProps) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location.trim());
    }
  };

  const handleAutoDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onSearch(`${latitude},${longitude}`);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Use coordinates for a default location (New York)
          onSearch("40.7128,-74.0060");
        }
      );
    } else {
      console.error("Geolocation is not supported");
      onSearch("40.7128,-74.0060");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Enter city or pincode..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-white/90 backdrop-blur-sm border-white/30 shadow-card text-foreground placeholder:text-muted-foreground"
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          variant="weather" 
          disabled={isLoading || !location.trim()}
          className="px-6"
        >
          <Search className="w-4 h-4 mr-2" />
          {isLoading ? "Loading..." : "Get Forecast"}
        </Button>
      </form>
      
      <div className="text-center">
        <Button
          type="button"
          variant="glass"
          onClick={handleAutoDetect}
          disabled={isLoading}
          className="text-sm"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Auto-detect Location
        </Button>
      </div>
    </div>
  );
};