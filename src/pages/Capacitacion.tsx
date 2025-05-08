
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CourseCard } from "@/components/capacitacion/CourseCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Capacitacion = () => {
  const { toast } = useToast();

  const handleContinueCourse = (courseTitle: string) => {
    toast({
      title: "Curso seleccionado",
      description: `Abriendo curso: ${courseTitle}`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Centro de Capacitación</h2>
          <p className="text-muted-foreground mt-2">
            Aprende técnicas modernas para mejorar tus cultivos y optimiza tu producción.
          </p>
        </div>

        {/* Buscador de cursos */}
        <div className="flex gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar cursos..."
              className="pl-8"
            />
          </div>
          <Button>Buscar</Button>
        </div>

        {/* Tabs de categorías */}
        <Tabs defaultValue="todos" className="space-y-6">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="cultivos">Cultivos</TabsTrigger>
            <TabsTrigger value="riego">Riego</TabsTrigger>
            <TabsTrigger value="tecnologia">Tecnología</TabsTrigger>
            <TabsTrigger value="gestion">Gestión</TabsTrigger>
          </TabsList>

          {/* Contenido de las tabs */}
          <TabsContent value="todos" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Cursos Recomendados</h3>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <CourseCard
                  title="Fundamentos de Agricultura Sostenible"
                  description="Aprende prácticas sostenibles para mejorar la salud del suelo y aumentar el rendimiento de tus cultivos."
                  totalLessons={12}
                  completedLessons={3}
                  duration="4 horas"
                  level="básico"
                  onContinue={() => handleContinueCourse("Fundamentos de Agricultura Sostenible")}
                />
                <CourseCard
                  title="Sistemas de Riego Eficientes"
                  description="Técnicas modernas de riego que maximizan el uso del agua y reducen costos operativos."
                  totalLessons={8}
                  completedLessons={0}
                  duration="3 horas"
                  level="intermedio"
                  onContinue={() => handleContinueCourse("Sistemas de Riego Eficientes")}
                />
                <CourseCard
                  title="Uso de Sensores en la Agricultura"
                  description="Cómo implementar y aprovechar la tecnología de sensores para monitorear tus cultivos."
                  totalLessons={10}
                  completedLessons={0}
                  duration="5 horas"
                  level="avanzado"
                  onContinue={() => handleContinueCourse("Uso de Sensores en la Agricultura")}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Tutoriales Más Vistos</h3>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <CourseCard
                  title="Preparación del Suelo"
                  description="Guía paso a paso para preparar correctamente el suelo antes de sembrar."
                  totalLessons={5}
                  completedLessons={5}
                  duration="1 hora"
                  level="básico"
                  onContinue={() => handleContinueCourse("Preparación del Suelo")}
                />
                <CourseCard
                  title="Control Natural de Plagas"
                  description="Métodos ecológicos para controlar plagas sin usar productos químicos dañinos."
                  totalLessons={7}
                  completedLessons={2}
                  duration="2 horas"
                  level="intermedio"
                  onContinue={() => handleContinueCourse("Control Natural de Plagas")}
                />
                <CourseCard
                  title="Interpretación de Datos Climáticos"
                  description="Cómo entender y utilizar datos climáticos para tomar mejores decisiones en tu cultivo."
                  totalLessons={6}
                  completedLessons={0}
                  duration="2 horas"
                  level="intermedio"
                  onContinue={() => handleContinueCourse("Interpretación de Datos Climáticos")}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cultivos" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Cultivos Populares</h3>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <CourseCard
                  title="Cultivo Eficiente de Maíz"
                  description="Técnicas modernas para maximizar la producción de maíz en diferentes condiciones."
                  totalLessons={9}
                  completedLessons={0}
                  duration="3 horas"
                  level="básico"
                  onContinue={() => handleContinueCourse("Cultivo Eficiente de Maíz")}
                />
                <CourseCard
                  title="Gestión de Cultivos de Café"
                  description="Métodos especializados para el cultivo de café de alta calidad."
                  totalLessons={11}
                  completedLessons={0}
                  duration="4 horas"
                  level="avanzado"
                  onContinue={() => handleContinueCourse("Gestión de Cultivos de Café")}
                />
              </div>
            </div>
          </TabsContent>

          {/* Otras tabs tendrían contenido similar */}
          <TabsContent value="riego">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <CourseCard
                title="Sistemas de Riego por Goteo"
                description="Instalación y mantenimiento de sistemas de riego por goteo eficientes."
                totalLessons={8}
                completedLessons={0}
                duration="3 horas"
                level="intermedio"
                onContinue={() => handleContinueCourse("Sistemas de Riego por Goteo")}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="tecnologia">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <CourseCard
                title="Uso de Drones en Agricultura"
                description="Cómo implementar drones para monitoreo de cultivos y análisis avanzado."
                totalLessons={7}
                completedLessons={0}
                duration="3.5 horas"
                level="avanzado"
                onContinue={() => handleContinueCourse("Uso de Drones en Agricultura")}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="gestion">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <CourseCard
                title="Gestión Financiera del Campo"
                description="Herramientas y técnicas para la administración financiera de tu producción."
                totalLessons={10}
                completedLessons={0}
                duration="4 horas"
                level="intermedio"
                onContinue={() => handleContinueCourse("Gestión Financiera del Campo")}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Capacitacion;
