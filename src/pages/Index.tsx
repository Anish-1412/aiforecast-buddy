import { useState } from "react";
import { WeatherSearch } from "@/components/WeatherSearch";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import heroImage from "@/assets/weather-hero.jpg";

interface WeatherData {
  location: string;
  temperature: number;
  rainChance: number;
  humidity: number;
  windSpeed: number;
}

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock weather data generator
  const generateMockWeather = (location: string): WeatherData => {
    return {
      location: location.includes(",") ? "Current Location" : location,
      temperature: Math.floor(Math.random() * 30) + 10, // 10-40°C
      rainChance: Math.floor(Math.random() * 100), // 0-100%
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 20) + 5 // 5-25 km/h
    };
  };

  const handleSearch = async (location: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockWeather = generateMockWeather(location);
      setWeather(mockWeather);
      setIsLoading(false);
    }, 1500);
  };

  const handleRefresh = () => {
    if (weather) {
      handleSearch(weather.location);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-sky opacity-40" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center py-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 drop-shadow-lg">
            AI Weather Forecast
          </h1>
          <p className="text-xl text-muted-foreground drop-shadow-sm">
            Get accurate weather predictions powered by artificial intelligence
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-12">
          {/* Search Section */}
          <section className="text-center">
            <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />
          </section>

          {/* Results Section */}
          {weather && (
            <section className="max-w-6xl mx-auto">
              <WeatherDisplay 
                weather={weather} 
                onRefresh={handleRefresh}
                isLoading={isLoading}
              />
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-12 mt-16">
          <p className="text-sm text-muted-foreground drop-shadow-sm">
            Powered by AI Forecast API
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;