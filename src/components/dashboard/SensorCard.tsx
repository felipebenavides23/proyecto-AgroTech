
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SensorCardProps {
  name: string;
  location: string;
  value: number;
  unit: string;
  status: "active" | "inactive";
  type: "humidity" | "temperature" | "nutrient";
  timestamp: string;
  className?: string;
}

export const SensorCard: React.FC<SensorCardProps> = ({
  name,
  location,
  value,
  unit,
  status,
  type,
  timestamp,
  className,
}) => {
  const getSensorColor = () => {
    switch (type) {
      case "humidity":
        return "text-agro-blue";
      case "temperature":
        return "text-agro-orange";
      case "nutrient":
        return "text-agro-green-dark";
      default:
        return "text-muted-foreground";
    }
  };

  const formattedTime = new Date(timestamp).toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <Card className={cn("ag-card-hover", status === "active" ? "sensor-active" : "", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{name}</CardTitle>
          <span className="text-xs text-muted-foreground">{location}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className={cn("text-2xl font-bold", getSensorColor())}>
              {value} {unit}
            </div>
            <p className="text-xs text-muted-foreground">
              Última actualización: {formattedTime}
            </p>
          </div>
          <div className="text-xs px-2 py-1 rounded-full bg-muted">
            {status === "active" ? "Activo" : "Inactivo"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
