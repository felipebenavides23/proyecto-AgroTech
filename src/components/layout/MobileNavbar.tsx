
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { MainSidebar } from "./MainSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const MobileNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="flex h-16 items-center border-b px-4">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <MainSidebar />
        </SheetContent>
      </Sheet>
      <div className="ml-4 flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="p-1 px-2 rounded-md bg-agro-green-dark text-white font-bold">
            Agro
          </div>
          <span>Tech Integral</span>
        </Link>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>
    </div>
  );
};
