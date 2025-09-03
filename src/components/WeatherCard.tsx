import { Card } from "@/components/ui/card";

interface WeatherMetric {
  icon: string;
  label: string;
  value: string;
  unit: string;
}

interface WeatherCardProps {
  metric: WeatherMetric;
}

export const WeatherCard = ({ metric }: WeatherCardProps) => {
  return (
    <Card className="bg-gradient-weather-card backdrop-blur-sm border border-white/20 p-6 shadow-card hover:shadow-glow transition-all duration-300 animate-float">
      <div className="text-center space-y-3">
        <div className="text-3xl mb-2">{metric.icon}</div>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {metric.label}
        </h3>
        <div className="text-2xl font-bold text-foreground">
          {metric.value}
          <span className="text-lg font-normal text-muted-foreground ml-1">
            {metric.unit}
          </span>
        </div>
      </div>
    </Card>
  );
};