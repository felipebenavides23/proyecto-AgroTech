
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CultureStatusCardProps {
  name: string;
  progress: number;
  startDate: string;
  estimatedHarvestDate: string;
  healthStatus: "good" | "warning" | "alert";
  className?: string;
  onViewDetails: () => void;
}

export const CultureStatusCard: React.FC<CultureStatusCardProps> = ({
  name,
  progress,
  startDate,
  estimatedHarvestDate,
  healthStatus,
  className,
  onViewDetails,
}) => {
  const healthStatusColor = {
    good: "bg-green-500",
    warning: "bg-amber-500",
    alert: "bg-red-500",
  };

  const formattedStartDate = new Date(startDate).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  });

  const formattedHarvestDate = new Date(estimatedHarvestDate).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <Card className={cn("ag-card-hover", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{name}</CardTitle>
          <div className={cn("w-3 h-3 rounded-full", healthStatusColor[healthStatus])}></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progreso</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Siembra:</span>
              <span className="font-medium">{formattedStartDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Cosecha:</span>
              <span className="font-medium">{formattedHarvestDate}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onViewDetails}>
          Ver detalles
        </Button>
      </CardFooter>
    </Card>
  );
};
