
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
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const App = () => {
  // Create a client inside the component
  const [queryClient] = useState(() => new QueryClient());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      try {
        // Check for an active session in Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        // Also check localStorage for backward compatibility
        const hasLocalAuth = localStorage.getItem('isAuthenticated') === 'true';
        
        setIsAuthenticated(!!session || hasLocalAuth);
      } catch (error) {
        console.error("Error checking authentication:", error);
        toast({
          title: "Erro de autenticação",
          description: "Houve um problema ao verificar seu login. Por favor, tente novamente.",
          variant: "destructive"
        });
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Simulate login for demo purposes
  const handleLoginSuccess = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };
  
  // Show loading indicator while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {isAuthenticated === false ? (
            // If definitely not authenticated, show just the login route
            <Routes>
              <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/*" element={<Navigate to="/login" replace />} />
            </Routes>
          ) : (
            // If authenticated or still checking, show all routes with protection
            <Routes>
              <Route path="/login" element={
                isAuthenticated ? <Navigate to="/" replace /> : <Login onLoginSuccess={handleLoginSuccess} />
              } />
              
              <Route path="/" element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={true}>
                    <Index />
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
              
              <Route path="/companies" element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={true}>
                    <Companies />
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
              
              <Route path="/contacts" element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={true}>
                    <Contacts />
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
              
              <Route path="/pipeline" element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={true}>
                    <Pipeline />
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
              
              <Route path="/my-pipeline" element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={true}>
                    <MyPipeline />
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
              
              <Route path="/dashboard" element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={true}>
                    <Dashboard />
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
              
              <Route path="/ia-sdr" element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={true}>
                    <IaSdr />
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
              
              <Route path="/ia-closer" element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={true}>
                    <IaCloser />
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
              
              <Route path="/meetings" element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={true}>
                    <Meetings />
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
              
              <Route path="/market-intel" element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={true}>
                    <MarketIntel />
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
              
              <Route path="/ai-manager" element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={true}>
                    <AiManager />
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
              
              <Route path="/social-selling" element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={true}>
                    <SocialSelling />
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
              
              <Route path="/lead-import" element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={true}>
                    <LeadImport />
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
              
              <Route path="/smart-search" element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={true}>
                    <SmartSearch />
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
              
              <Route path="*" element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={true}>
                    <NotFound />
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
            </Routes>
          )}
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
