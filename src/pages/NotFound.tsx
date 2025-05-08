
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Usuario intentó acceder a una ruta inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="text-agro-orange text-7xl font-bold mb-4">404</div>
        <h1 className="text-4xl font-bold mb-4">Página no encontrada</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación.
        </p>
        <Button asChild size="lg">
          <Link to="/">
            Regresar al Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
