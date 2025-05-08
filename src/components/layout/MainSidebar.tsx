
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { 
  Calendar, 
  Database, 
  FileText, 
  Settings, 
  User,
  Cloud,
  Map,
  Search,
  HelpCircle
} from "lucide-react";

export const MainSidebar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: Map,
    },
    {
      title: "Cultivos",
      href: "/cultivos",
      icon: FileText,
    },
    {
      title: "Clima",
      href: "/clima",
      icon: Cloud,
    },
    {
      title: "Inventario",
      href: "/inventario",
      icon: Database,
    },
    {
      title: "Calendario",
      href: "/calendario",
      icon: Calendar,
    },
    {
      title: "Capacitación",
      href: "/capacitacion",
      icon: Search,
    },
    {
      title: "Soporte",
      href: "/soporte",
      icon: HelpCircle,
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 font-semibold p-2">
          <div className="p-1 px-2 rounded-md bg-agro-green-dark text-white font-bold">
            Agro
          </div>
          <span className="text-lg">Tech Integral</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link to={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/configuracion"}
                  tooltip="Configuración"
                >
                  <Link to="/configuracion">
                    <Settings />
                    <span>Configuración</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};
