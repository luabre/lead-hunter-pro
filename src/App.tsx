
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
 import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Contacts from "./pages/Contacts";
import Meetings from "./pages/Meetings";
import Pipeline from "./pages/Pipeline";
import MyPipeline from "./pages/MyPipeline";
import SmartSearch from "./pages/SmartSearch";
import SocialSelling from "./pages/SocialSelling";
import MarketIntel from "./pages/MarketIntel";
import LeadImport from "./pages/LeadImport";
import Campaigns from "./pages/Campaigns";
import IaSdr from "./pages/IaSdr";
import IaCloser from "./pages/IaCloser";
import AiManager from "./pages/AiManager";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";

// Add the import for our new page
import PerformanceDashboard from "./pages/PerformanceDashboard";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
         <Route path="/vendas" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/my-pipeline" element={<MyPipeline />} />
        <Route path="/smart-search" element={<SmartSearch />} />
        <Route path="/social-selling" element={<SocialSelling />} />
        <Route path="/market-intel" element={<MarketIntel />} />
        <Route path="/lead-import" element={<LeadImport />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/ia-sdr" element={<IaSdr />} />
        <Route path="/ia-closer" element={<IaCloser />} />
        <Route path="/ai-manager" element={<AiManager />} />
        
        {/* Add the new performance dashboard route */}
        <Route path="/performance" element={<PerformanceDashboard />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
