
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { InventoryItem } from "@/pages/Inventario";

interface InventoryItemFormProps {
  item?: InventoryItem;
  categories: string[];
  onSave: (item: InventoryItem) => void;
  onCancel: () => void;
}

export const InventoryItemForm: React.FC<InventoryItemFormProps> = ({
  item,
  categories,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    name: "",
    category: "",
    quantity: 0,
    unit: "",
    expirationDate: "",
    stockStatus: "ok"
  });

  useEffect(() => {
    if (item) {
      setFormData({ ...item });
    }
  }, [item]);

  const handleChange = (field: keyof InventoryItem, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || formData.quantity === undefined || !formData.unit) {
      return; // Should add validation error messages
    }

    onSave({
      id: item?.id || 0,
      name: formData.name || "",
      category: formData.category || "",
      quantity: Number(formData.quantity),
      unit: formData.unit || "",
      expirationDate: formData.expirationDate,
      stockStatus: formData.stockStatus as "ok" | "low" | "critical" || "ok"
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre del ítem</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Ej: Fertilizante NPK"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => handleChange("category", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
                <SelectItem value="nueva-categoria">+ Nueva categoría</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Cantidad</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={(e) => handleChange("quantity", Number(e.target.value))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">Unidad de medida</Label>
            <Input
              id="unit"
              value={formData.unit}
              onChange={(e) => handleChange("unit", e.target.value)}
              placeholder="Ej: kg, L, unidades"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="expirationDate">Fecha de vencimiento (opcional)</Label>
          <Input
            id="expirationDate"
            type="date"
            value={formData.expirationDate}
            onChange={(e) => handleChange("expirationDate", e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="stockStatus">Estado del inventario</Label>
          <Select 
            value={formData.stockStatus} 
            onValueChange={(value) => handleChange("stockStatus", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ok">Stock OK</SelectItem>
              <SelectItem value="low">Stock Bajo</SelectItem>
              <SelectItem value="critical">Stock Crítico</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-agro-green-dark text-white">
          {item ? "Actualizar Ítem" : "Guardar Ítem"}
        </Button>
      </DialogFooter>
    </form>
  );
};
