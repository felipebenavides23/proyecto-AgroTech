
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { WeatherCard } from "@/components/dashboard/WeatherCard";
import { CultureStatusCard } from "@/components/dashboard/CultureStatusCard";
import { SensorCard } from "@/components/dashboard/SensorCard";
import { 
  Calendar,
  CloudRain,
  FileText,
  AlertTriangle,
  User,
  Database
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  const handleViewCultureDetails = () => {
    toast({
      title: "Detalles del cultivo",
      description: "Mostrando información detallada del cultivo",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-2">
            Bienvenido a AgroTech Integral. Aquí tienes el resumen de tus actividades.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Cultivos Activos"
            value="5"
            icon={<FileText />}
            trend={{ value: 20, positive: true }}
          />
          <StatCard
            title="Alertas Activas"
            value="2"
            icon={<AlertTriangle />}
            className="border-amber-200"
          />
          <StatCard
            title="Próximas Cosechas"
            value="3"
            icon={<Calendar />}
            description="En los próximos 30 días"
          />
          <StatCard
            title="Insumos por Agotarse"
            value="4"
            icon={<Database />}
            className="border-red-200"
          />
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Estado del clima */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-medium mb-3">Clima Local</h3>
            <WeatherCard
              location="Mi Parcela"
              temperature={24}
              condition="sunny"
              humidity={65}
              precipitation={0}
              windSpeed={12}
            />
          </div>

          {/* Estado de cultivos */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-medium mb-3">Estado de Cultivos</h3>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <CultureStatusCard
                name="Maíz - Parcela Norte"
                progress={65}
                startDate="2025-02-15"
                estimatedHarvestDate="2025-05-30"
                healthStatus="good"
                onViewDetails={handleViewCultureDetails}
              />
              <CultureStatusCard
                name="Frijol - Parcela Este"
                progress={25}
                startDate="2025-03-10"
                estimatedHarvestDate="2025-06-20"
                healthStatus="warning"
                onViewDetails={handleViewCultureDetails}
              />
            </div>
          </div>
        </div>

        {/* Sensores */}
        <div>
          <h3 className="text-lg font-medium mb-3">Lecturas de Sensores</h3>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <SensorCard
              name="Sensor de Humedad"
              location="Parcela Norte"
              value={65}
              unit="%"
              status="active"
              type="humidity"
              timestamp="2025-04-06T10:30:00"
            />
            <SensorCard
              name="Sensor de Temperatura"
              location="Parcela Este"
              value={28}
              unit="°C"
              status="active"
              type="temperature"
              timestamp="2025-04-06T10:35:00"
            />
            <SensorCard
              name="Sensor de Nutrientes"
              location="Parcela Sur"
              value={82}
              unit="ppm"
              status="inactive"
              type="nutrient"
              timestamp="2025-04-06T09:15:00"
            />
          </div>
        </div>

        {/* Próximas actividades */}
        <div>
          <h3 className="text-lg font-medium mb-3">Próximas Actividades</h3>
          <div className="bg-card rounded-lg border p-4">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-md">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Fertilización Maíz</h4>
                  <p className="text-sm text-muted-foreground">
                    Programado para mañana, 7 de abril
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-md">
                  <CloudRain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Riego Parcela Este</h4>
                  <p className="text-sm text-muted-foreground">
                    Programado para el 8 de abril
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-md">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Visita Técnica</h4>
                  <p className="text-sm text-muted-foreground">
                    Programado para el 10 de abril
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
