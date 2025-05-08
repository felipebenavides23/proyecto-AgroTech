
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar, 
  Database, 
  FileText, 
  Settings, 
  User,
  Cloud,
  Map,
  Search
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: <Map className="size-5" />,
    },
    {
      title: "Cultivos",
      href: "/cultivos",
      icon: <FileText className="size-5" />,
    },
    {
      title: "Clima",
      href: "/clima",
      icon: <Cloud className="size-5" />,
    },
    {
      title: "Inventario",
      href: "/inventario",
      icon: <Database className="size-5" />,
    },
    {
      title: "Calendario",
      href: "/calendario",
      icon: <Calendar className="size-5" />,
    },
    {
      title: "Capacitación",
      href: "/capacitacion",
      icon: <Search className="size-5" />,
    },
    {
      title: "Soporte",
      href: "/soporte",
      icon: <User className="size-5" />,
    }
  ];

  return (
    <div className={cn("w-64 border-r bg-sidebar border-sidebar-border", className)}>
      <div className="flex h-16 items-center px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-sidebar-foreground">
          <div className="p-1 px-2 rounded-md bg-sidebar-accent text-sidebar-accent-foreground font-bold">
            Agro
          </div>
          <span className="text-lg">Tech Integral</span>
        </Link>
      </div>
      <Separator className="bg-sidebar-border" />
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="px-3 py-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground transition-colors",
                  isActive(item.href)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                )}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            ))}
          </div>
          <Separator className="my-4 bg-sidebar-border" />
          <div className="space-y-1">
            <Link
              to="/configuracion"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground transition-colors",
                isActive("/configuracion")
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
              )}
            >
              <Settings className="size-5" />
              <span className="text-sm font-medium">Configuración</span>
            </Link>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
