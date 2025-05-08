
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Calendar } from "lucide-react";

interface InventoryItemCardProps {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expirationDate?: string;
  stockStatus: "ok" | "low" | "critical";
  onEdit: () => void;
}

export const InventoryItemCard: React.FC<InventoryItemCardProps> = ({
  name,
  category,
  quantity,
  unit,
  expirationDate,
  stockStatus,
  onEdit,
}) => {
  const getStockStatusBadge = () => {
    switch (stockStatus) {
      case "ok":
        return <Badge className="bg-green-500 hover:bg-green-600">Stock OK</Badge>;
      case "low":
        return <Badge variant="secondary" className="bg-amber-500 hover:bg-amber-600 text-white">Stock Bajo</Badge>;
      case "critical":
        return <Badge variant="destructive">Stock Crítico</Badge>;
      default:
        return null;
    }
  };

  const formattedExpirationDate = expirationDate 
    ? new Date(expirationDate).toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short',
        year: 'numeric'
      }) 
    : null;

  return (
    <Card className="ag-card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{name}</CardTitle>
          {getStockStatusBadge()}
        </div>
        <div className="text-xs text-muted-foreground">{category}</div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Cantidad:</span>
          </div>
          <span className="text-sm font-medium">
            {quantity} {unit}
          </span>
        </div>
        
        {expirationDate && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Vence:</span>
            </div>
            <span className="text-sm font-medium">{formattedExpirationDate}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onEdit}>
          Editar
        </Button>
      </CardFooter>
    </Card>
  );
};
