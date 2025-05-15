import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Helmet } from "react-helmet";
import NotFound from "@/pages/not-found";

// Import all pages
import Home from "@/pages/home";
import ProductGenerator from "@/pages/product-generator";
import ContentGenerator from "@/pages/content-generator";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product-generator" component={ProductGenerator} />
      <Route path="/content-generator" component={ContentGenerator} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
        <title>VendeConIA - Crea tu tienda de productos virales con IA</title>
        <meta name="description" content="Crea una tienda online de productos virales en minutos con inteligencia artificial. Genera ideas, encuentra productos ganadores y crea contenido promocional." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
