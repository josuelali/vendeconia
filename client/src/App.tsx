import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Helmet } from "react-helmet-async";

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

        {/* GOOGLE ANALYTICS GA4 */}
        <Helmet>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-XBK5WGCDBQ"></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XBK5WGCDBQ');
            `}
          </script>
        </Helmet>

        <Toaster />

        {/* BOTÓN AMAZON PRINCIPAL (GLOBAL) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "12px 12px",
          }}
        >
          <a
            href="https://amzn.to/46kUcsT"
            target="_blank"
            rel="nofollow sponsored"
            style={{
              padding: "12px 20px",
              backgroundColor: "#FF9900",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "10px",
              textDecoration: "none",
              boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
              maxWidth: 360,
              width: "100%",
              textAlign: "center",
            }}
          >
            Ver producto recomendado en Amazon
          </a>
        </div>

        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;