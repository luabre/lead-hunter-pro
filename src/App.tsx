
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Companies from "./pages/Companies";
import Contacts from "./pages/Contacts";
import Pipeline from "./pages/Pipeline";
import MyPipeline from "./pages/MyPipeline";
import Dashboard from "./pages/Dashboard";
import IaSdr from "./pages/IaSdr";
import IaCloser from "./pages/IaCloser";
import Meetings from "./pages/Meetings";
import MarketIntel from "./pages/MarketIntel";
import AiManager from "./pages/AiManager";
import SocialSelling from "./pages/SocialSelling";
import LeadImport from "./pages/LeadImport";
import SmartSearch from "./pages/SmartSearch";
import { useState, useEffect } from "react";

const App = () => {
  // Create a client inside the component
  const [queryClient] = useState(() => new QueryClient());
  // This is just a placeholder - in a real app you'd use auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // This simulates checking if the user is logged in
  // In a real app, you would use your auth provider here
  useEffect(() => {
    const checkAuth = () => {
      const hasAuth = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(hasAuth);
    };
    
    checkAuth();
    
    // Listen for auth changes (simulated)
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Simulate login for demo purposes
  const handleLoginSuccess = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/" replace /> : 
                <Login onLoginSuccess={handleLoginSuccess} />
              } 
            />
            
            {/* Protected routes - wrapped with SidebarProvider */}
            <Route 
              path="/*" 
              element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={true}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/companies" element={<Companies />} />
                      <Route path="/contacts" element={<Contacts />} />
                      <Route path="/pipeline" element={<Pipeline />} />
                      <Route path="/my-pipeline" element={<MyPipeline />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/ia-sdr" element={<IaSdr />} />
                      <Route path="/ia-closer" element={<IaCloser />} />
                      <Route path="/meetings" element={<Meetings />} />
                      <Route path="/market-intel" element={<MarketIntel />} />
                      <Route path="/ai-manager" element={<AiManager />} />
                      <Route path="/social-selling" element={<SocialSelling />} />
                      <Route path="/lead-import" element={<LeadImport />} />
                      <Route path="/smart-search" element={<SmartSearch />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
