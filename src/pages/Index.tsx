import { useState } from "react";
import { WeatherSearch } from "@/components/WeatherSearch";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { fetchWeatherForecast, type WeatherData } from "@/services/weatherApi";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/weather-hero.jpg";

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async (location: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const forecastData = await fetchWeatherForecast(location);
      setWeather(forecastData);
      toast({
        title: "Forecast Updated",
        description: `Weather data loaded for ${forecastData.location}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

          {/* Error Section */}
          {error && (
            <section className="max-w-md mx-auto">
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            </section>
          )}

          {/* Results Section */}
          {weather && !error && (
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