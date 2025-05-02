
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Companies from "./pages/Companies";
import Contacts from "./pages/Contacts";
import Pipeline from "./pages/Pipeline";
import Dashboard from "./pages/Dashboard";
import IaSdr from "./pages/IaSdr";
import IaCloser from "./pages/IaCloser";
import Meetings from "./pages/Meetings";
import MarketIntel from "./pages/MarketIntel";
import AiManager from "./pages/AiManager";
import SocialSelling from "./pages/SocialSelling";
import { useState } from "react";

const App = () => {
  // Create a client inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ia-sdr" element={<IaSdr />} />
            <Route path="/ia-closer" element={<IaCloser />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/market-intel" element={<MarketIntel />} />
            <Route path="/ai-manager" element={<AiManager />} />
            <Route path="/social-selling" element={<SocialSelling />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
