import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import all pages
import Home from "@/pages/home";
import ProductGenerator from "@/pages/product-generator";
import ContentGenerator from "@/pages/content-generator";
import Pricing from "@/pages/pricing";
import Templates from "@/pages/templates";
import Dashboard from "@/pages/dashboard";
import Subscribe from "@/pages/subscribe";

// Import legal pages
import Privacidad from "@/pages/legal/Privacidad";
import Terminos from "@/pages/legal/Terminos";
import Cookies from "@/pages/legal/Cookies";

function NotFound() {
  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      <h2 style={{ marginBottom: 8 }}>Página no encontrada</h2>
      <p style={{ marginBottom: 12 }}>Vuelve al inicio y sigue creando.</p>
      <a href="/" style={{ textDecoration: "underline" }}>
        Ir al inicio
      </a>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Main pages */}
      <Route path="/" component={Home} />
      <Route path="/product-generator" component={ProductGenerator} />
      <Route path="/content-generator" component={ContentGenerator} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/templates" component={Templates} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/subscribe" component={Subscribe} />

      {/* Legal pages */}
      <Route path="/politica-de-privacidad" component={Privacidad} />
      <Route path="/terminos-y-condiciones" component={Terminos} />
      <Route path="/cookies" component={Cookies} />

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
