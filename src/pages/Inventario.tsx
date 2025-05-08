
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { InventoryItemCard } from "@/components/inventory/InventoryItemCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { PlusCircle, Search } from "lucide-react";
import { toast } from "sonner";
import { InventoryItemForm } from "@/components/inventory/InventoryItemForm";

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expirationDate?: string;
  stockStatus: "ok" | "low" | "critical";
}

// Datos de ejemplo para el inventario
const mockInventoryItems: InventoryItem[] = [
  {
    id: 1,
    name: "Fertilizante NPK",
    category: "Insumos",
    quantity: 500,
    unit: "kg",
    expirationDate: "2025-12-31",
    stockStatus: "ok"
  },
  {
    id: 2,
    name: "Semillas de maíz",
    category: "Semillas",
    quantity: 50,
    unit: "kg",
    expirationDate: "2025-06-30",
    stockStatus: "low"
  },
  {
    id: 3,
    name: "Insecticida orgánico",
    category: "Insumos",
    quantity: 25,
    unit: "L",
    expirationDate: "2024-11-15",
    stockStatus: "critical"
  },
  {
    id: 4,
    name: "Herramientas de poda",
    category: "Herramientas",
    quantity: 12,
    unit: "unidades",
    stockStatus: "ok"
  },
  {
    id: 5,
    name: "Sistema de riego por goteo",
    category: "Equipos",
    quantity: 3,
    unit: "sistemas",
    stockStatus: "low"
  },
  {
    id: 6,
    name: "Abono orgánico",
    category: "Insumos",
    quantity: 300,
    unit: "kg",
    expirationDate: "2025-05-20",
    stockStatus: "ok"
  }
];

const Inventario = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [items, setItems] = useState<InventoryItem[]>(mockInventoryItems);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  // Manejar la edición de un ítem
  const handleEditItem = (id: number) => {
    const itemToEdit = items.find(item => item.id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setIsAddDialogOpen(true);
    }
  };

  // Manejar la adición o actualización de un ítem
  const handleSaveItem = (item: InventoryItem) => {
    if (editingItem) {
      // Update existing item
      setItems(prevItems => 
        prevItems.map(i => i.id === item.id ? item : i)
      );
      toast.success("Ítem actualizado correctamente");
    } else {
      // Add new item
      const newItem = {
        ...item,
        id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
      };
      setItems(prevItems => [...prevItems, newItem]);
      toast.success("Ítem agregado correctamente");
    }
    setIsAddDialogOpen(false);
    setEditingItem(null);
  };

  // Filtrar ítems según los criterios de búsqueda y filtros
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesStatus = !selectedStatus || item.stockStatus === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Obtener categorías únicas para el filtro
  const categories = Array.from(new Set(items.map(item => item.category)));

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Inventario de Insumos y Equipos</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-agro-green-dark text-white"
                onClick={() => setEditingItem(null)}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Añadir Ítem
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Editar Ítem" : "Añadir Nuevo Ítem"}</DialogTitle>
                <DialogDescription>
                  {editingItem 
                    ? "Actualiza la información del ítem seleccionado." 
                    : "Completa el formulario para añadir un nuevo ítem al inventario."}
                </DialogDescription>
              </DialogHeader>
              <InventoryItemForm 
                item={editingItem || undefined} 
                categories={categories}
                onSave={handleSaveItem}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filtros y búsqueda */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-gray-500" />
            <Input
              placeholder="Buscar por nombre o categoría..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
          
          <Select 
            value={selectedCategory || "all"} 
            onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select 
            value={selectedStatus || "all"} 
            onValueChange={(value) => setSelectedStatus(value === "all" ? null : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="ok">Stock OK</SelectItem>
                <SelectItem value="low">Stock Bajo</SelectItem>
                <SelectItem value="critical">Stock Crítico</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Lista de items */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <InventoryItemCard
              key={item.id}
              name={item.name}
              category={item.category}
              quantity={item.quantity}
              unit={item.unit}
              expirationDate={item.expirationDate}
              stockStatus={item.stockStatus}
              onEdit={() => handleEditItem(item.id)}
            />
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No se encontraron ítems con los criterios de búsqueda.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Inventario;
