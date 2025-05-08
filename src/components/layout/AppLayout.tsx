
import React from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarInset } from "@/components/ui/sidebar";
import { MobileNavbar } from "./MobileNavbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/sonner";
import { MainSidebar } from "./MainSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        {/* Sidebar for desktop */}
        <MainSidebar />
        
        {/* Content */}
        <SidebarInset>
          {/* Navbar móvil */}
          {isMobile && <MobileNavbar />}
          
          {/* Contenido */}
          <main className="container py-6 md:py-10">
            {children}
          </main>
          
          <Toaster />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
