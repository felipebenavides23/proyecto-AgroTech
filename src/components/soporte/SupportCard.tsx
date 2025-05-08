
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface SupportCardProps {
  title: string;
  description: string;
  type: "chat" | "video" | "expert";
  availability: "disponible" | "ocupado" | "programado";
  icon: React.ReactNode;
  onRequest: () => void;
}

export const SupportCard: React.FC<SupportCardProps> = ({
  title,
  description,
  type,
  availability,
  icon,
  onRequest,
}) => {
  const getAvailabilityBadge = () => {
    switch (availability) {
      case "disponible":
        return <Badge className="bg-green-500 hover:bg-green-600">Disponible ahora</Badge>;
      case "ocupado":
        return <Badge variant="outline" className="text-agro-red">Ocupado</Badge>;
      case "programado":
        return <Badge variant="secondary">Programar</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="ag-card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Avatar className="h-6 w-6 bg-muted">
              <AvatarFallback className="text-xs">{icon}</AvatarFallback>
            </Avatar>
            {title}
          </CardTitle>
          {getAvailabilityBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={availability === "ocupado" ? "outline" : "default"}
          disabled={availability === "ocupado"}
          onClick={onRequest}
        >
          {availability === "programado" ? "Programar" : "Solicitar ayuda"}
        </Button>
      </CardFooter>
    </Card>
  );
};
