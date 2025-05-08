
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  level: "básico" | "intermedio" | "avanzado";
  onContinue: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  totalLessons,
  completedLessons,
  duration,
  level,
  onContinue,
}) => {
  const progress = Math.round((completedLessons / totalLessons) * 100);

  const getLevelColor = () => {
    switch (level) {
      case "básico":
        return "bg-green-100 text-green-800";
      case "intermedio":
        return "bg-amber-100 text-amber-800";
      case "avanzado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="ag-card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor()}`}>
            {level}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>{completedLessons}/{totalLessons} lecciones</span>
          </div>
          <span>{duration}</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progreso</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onContinue}>
          {completedLessons === 0 ? "Comenzar" : "Continuar"}
        </Button>
      </CardFooter>
    </Card>
  );
};
