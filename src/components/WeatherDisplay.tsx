import { WeatherCard } from "./WeatherCard";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface WeatherData {
  location: string;
  temperature: number;
  rainChance: number;
  humidity: number;
  windSpeed: number;
}

interface WeatherDisplayProps {
  weather: WeatherData;
  onRefresh: () => void;
  isLoading?: boolean;
}

export const WeatherDisplay = ({ weather, onRefresh, isLoading = false }: WeatherDisplayProps) => {
  const weatherMetrics = [
    {
      icon: "🌡️",
      label: "Temperature",
      value: weather.temperature.toString(),
      unit: "°C"
    },
    {
      icon: "☔",
      label: "Rain Chance",
      value: weather.rainChance.toString(),
      unit: "%"
    },
    {
      icon: "💧",
      label: "Humidity",
      value: weather.humidity.toString(),
      unit: "%"
    },
    {
      icon: "🌬️",
      label: "Wind Speed",
      value: weather.windSpeed.toString(),
      unit: "km/h"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{weather.location}</h2>
        <Button
          variant="glass"
          onClick={onRefresh}
          disabled={isLoading}
          className="text-sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? "Updating..." : "Refresh"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {weatherMetrics.map((metric, index) => (
          <div key={metric.label} style={{ animationDelay: `${index * 0.1}s` }}>
            <WeatherCard metric={metric} />
          </div>
        ))}
      </div>
    </div>
  );
};