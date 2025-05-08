
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { SupportCard } from "@/components/soporte/SupportCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { HelpCircle, Search, SendHorizontal } from "lucide-react";

// Mock data for support tickets
const mockSupportTickets = [
  {
    id: 1,
    title: "Problemas con el sistema de riego",
    status: "open",
    date: "2025-03-28",
    priority: "high"
  },
  {
    id: 2,
    title: "Consulta sobre fertilizantes",
    status: "closed",
    date: "2025-03-15",
    priority: "medium"
  },
  {
    id: 3,
    title: "Error en la aplicación móvil",
    status: "in-progress",
    date: "2025-03-20",
    priority: "high"
  }
];

// FAQ items
const faqItems = [
  {
    question: "¿Cómo puedo registrar un nuevo cultivo?",
    answer: "Para registrar un nuevo cultivo, dirígete a la sección 'Cultivos' y haz clic en el botón 'Añadir Cultivo'. Completa la información requerida como tipo de cultivo, fecha de siembra, área cultivada y cualquier otra información relevante."
  },
  {
    question: "¿Cómo configuro las alertas de clima?",
    answer: "Para configurar alertas climáticas, ve a la sección 'Clima', selecciona 'Configurar Alertas' y establece las condiciones climáticas (temperatura, precipitación, etc.) que deseas monitorear. También puedes ajustar la frecuencia de las notificaciones."
  },
  {
    question: "¿Puedo acceder a la plataforma sin conexión a internet?",
    answer: "Algunas funciones básicas están disponibles sin conexión a internet. La aplicación guardará los datos localmente y se sincronizarán cuando recuperes la conexión. Sin embargo, funciones como pronósticos climáticos y asistencia técnica en tiempo real requieren conexión a internet."
  },
  {
    question: "¿Cómo actualizo mi perfil y datos de contacto?",
    answer: "Ve a 'Configuración' en el menú principal, selecciona 'Mi Perfil' y podrás editar tu información personal, datos de contacto y preferencias de notificación."
  },
  {
    question: "¿Qué hago si olvidé mi contraseña?",
    answer: "En la pantalla de inicio de sesión, haz clic en '¿Olvidaste tu contraseña?'. Sigue las instrucciones enviadas a tu correo electrónico registrado para restablecerla. Si sigues teniendo problemas, contacta al soporte técnico."
  }
];

const Soporte = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    priority: "medium"
  });

  // Filter tickets based on search and filters
  const filteredTickets = mockSupportTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter FAQs based on search
  const filteredFaqs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle ticket submission
  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.title || !newTicket.description) {
      toast.error("Por favor completa todos los campos requeridos.");
      return;
    }

    // In a real app, this would send the ticket to an API
    toast.success("Ticket de soporte creado correctamente. Nuestro equipo te contactará pronto.");
    setNewTicket({ title: "", description: "", priority: "medium" });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Centro de Soporte</h1>
          <Button className="bg-agro-green-dark text-white">
            <HelpCircle className="mr-2 h-4 w-4" /> Solicitar Asistencia Inmediata
          </Button>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tickets o preguntas frecuentes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="open">Abiertos</SelectItem>
              <SelectItem value="in-progress">En progreso</SelectItem>
              <SelectItem value="closed">Cerrados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Tickets */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-medium">Mis Tickets de Soporte</h2>
            {filteredTickets.length > 0 ? (
              <div className="grid gap-4">
                {filteredTickets.map((ticket) => (
                  <SupportCard
                    key={ticket.id}
                    title={ticket.title}
                    date={ticket.date}
                    priority={ticket.priority as 'low' | 'medium' | 'high'}
                    status={ticket.status as 'open' | 'closed' | 'in-progress'}
                    onClick={() => console.log(`View ticket ${ticket.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 border rounded-lg">
                <p className="text-muted-foreground">No se encontraron tickets con los criterios de búsqueda.</p>
              </div>
            )}

            {/* New Ticket Form */}
            <div className="bg-card border rounded-lg p-4 mt-6">
              <h3 className="text-lg font-medium mb-4">Crear Nuevo Ticket</h3>
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Título del problema"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Describe detalladamente tu problema o consulta..."
                    rows={4}
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  />
                </div>
                <div className="flex gap-4">
                  <Select
                    value={newTicket.priority}
                    onValueChange={(value) => setNewTicket({...newTicket, priority: value})}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="submit" className="bg-agro-green-dark text-white">
                    <SendHorizontal className="mr-2 h-4 w-4" /> Enviar Ticket
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Preguntas Frecuentes</h2>
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-10 border rounded-lg">
                <p className="text-muted-foreground">No se encontraron preguntas que coincidan con tu búsqueda.</p>
              </div>
            )}

            <div className="bg-card border rounded-lg p-4 mt-6">
              <h3 className="text-lg font-medium mb-2">¿No encontraste lo que buscas?</h3>
              <p className="text-muted-foreground mb-4">Nuestro equipo de expertos está listo para ayudarte con cualquier consulta técnica o agronómica.</p>
              <Button className="w-full">Contactar a un Especialista</Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Soporte;
