
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CloudRain, Sun, Wind, Cloud } from "lucide-react";

interface WeatherCardProps {
  location: string;
  temperature: number;
  condition: "sunny" | "cloudy" | "rainy";
  humidity: number;
  precipitation: number;
  windSpeed: number;
  className?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  location,
  temperature,
  condition,
  humidity,
  precipitation,
  windSpeed,
  className,
}) => {
  const getWeatherIcon = () => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-10 h-10 text-agro-orange weather-icon" />;
      case "rainy":
        return <CloudRain className="w-10 h-10 text-agro-blue weather-icon" />;
      case "cloudy":
        return <Cloud className="w-10 h-10 text-gray-400 weather-icon" />;
      default:
        return <Sun className="w-10 h-10 text-agro-orange weather-icon" />;
    }
  };

  return (
    <Card className={cn("ag-card-hover", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">{location}</CardTitle>
          <span className="text-xs text-muted-foreground">Actualizado hoy</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {getWeatherIcon()}
            <div className="space-y-1">
              <div className="text-3xl font-bold">{temperature}°C</div>
              <p className="text-muted-foreground text-sm capitalize">
                {condition}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Humedad</span>
            <p className="text-sm font-medium">{humidity}%</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Lluvia</span>
            <p className="text-sm font-medium">{precipitation} mm</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Viento</span>
            <p className="text-sm font-medium">{windSpeed} km/h</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
