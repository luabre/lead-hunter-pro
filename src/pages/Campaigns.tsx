
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import CampaignDashboard from "@/components/campaigns/CampaignDashboard";
import CampaignsList from "@/components/campaigns/CampaignsList";
import IntelligentCampaignFlow from "@/components/campaigns/IntelligentCampaignFlow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Rocket, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Campaigns = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFromIntel, setIsFromIntel] = useState(false);
  const [campaignPreset, setCampaignPreset] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (location.state?.fromIntel) {
      setIsFromIntel(true);
      setCampaignPreset(location.state);
      // Automaticamente abrir a tab de criação quando vier do insight
      setActiveTab("create");
    }
  }, [location.state]);

  const handleCampaignCancel = () => {
    setActiveTab("overview");
    setIsFromIntel(false);
    setCampaignPreset(null);
  };

  const handleCampaignCreationComplete = (campaignName: string) => {
    toast({
      title: "Campanha criada com sucesso!",
      description: `A campanha "${campaignName}" foi criada e está pronta para ser iniciada.`,
    });
    setActiveTab("campaigns");
    setIsFromIntel(false);
    setCampaignPreset(null);
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Campanhas</h1>
          <p className="text-muted-foreground">
            {isFromIntel 
              ? `Criação inteligente baseada em insight de IA`
              : "Gerencie suas campanhas de prospecção"
            }
          </p>
        </div>
        {isFromIntel && (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            <Brain className="h-3 w-3 mr-1" />
            IA Pré-configurada
          </Badge>
        )}
      </div>

      {isFromIntel && campaignPreset && (
        <div className="mb-6">
          <Alert className="border-purple-200 bg-purple-50">
            <Brain className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">
                  🧠 Campanha inteligente pré-configurada com base no insight de {campaignPreset.segmento}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Rocket className="h-3 w-3 text-purple-600" />
                    <span><strong>{campaignPreset.publicoAlvo}</strong> leads pré-carregados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-purple-600" />
                    <span><strong>+{campaignPreset.conversaoEstimativa}%</strong> conversão estimada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="h-3 w-3 text-purple-600" />
                    <span><strong>{campaignPreset.toquesInteligentes?.length || 0}</strong> toques sugeridos</span>
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="campaigns">Minhas Campanhas</TabsTrigger>
          <TabsTrigger value="create">
            {isFromIntel ? "Criar com IA" : "Criar Nova"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <CampaignDashboard />
        </TabsContent>
        
        <TabsContent value="campaigns" className="mt-6">
          <CampaignsList />
        </TabsContent>
        
        <TabsContent value="create" className="mt-6">
          {isFromIntel && campaignPreset ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Campanha Inteligente - {campaignPreset.nome}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <IntelligentCampaignFlow 
                  preset={campaignPreset}
                  fromInsight={true}
                  onCancel={handleCampaignCancel}
                  onCreationComplete={handleCampaignCreationComplete}
                />
              </CardContent>
            </Card>
          ) : (
            <IntelligentCampaignFlow 
              onCancel={handleCampaignCancel}
              onCreationComplete={handleCampaignCreationComplete}
            />
          )}
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Campaigns;
