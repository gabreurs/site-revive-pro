import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Bairro from "./Bairro";

const NotFound = () => {
  const location = useLocation();

  // Dispatch to Bairro page for /terraplanagem-<slug> URLs
  // (React Router v6 doesn't support partial-segment params natively)
  if (location.pathname.startsWith("/terraplanagem-")) {
    return <Bairro />;
  }

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
