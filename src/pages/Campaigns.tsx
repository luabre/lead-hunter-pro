
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, PlusCircle, BarChart3, Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import CampaignsList from "@/components/campaigns/CampaignsList";
import IntelligentCampaignFlow from "@/components/campaigns/IntelligentCampaignFlow";
import CampaignDashboard from "@/components/campaigns/CampaignDashboard";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useToast } from "@/components/ui/use-toast";

const Campaigns = () => {
  const [showCampaignCreation, setShowCampaignCreation] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { campaigns, activeCampaigns, isLoading } = useCampaigns();
  const { toast } = useToast();
  
  const handleCreateCampaign = () => {
    setShowCampaignCreation(true);
  };

  const handleCancelCreation = () => {
    setShowCampaignCreation(false);
  };
  
  const handleCampaignCreated = (campaignName: string) => {
    setShowCampaignCreation(false);
    toast({
      title: "Campanha Inteligente Criada!",
      description: `A campanha ${campaignName} foi criada com sucesso e está pronta para adicionar leads!`,
    });
  };

  const handleViewDashboard = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
  };
  
  if (showCampaignCreation) {
    return (
      <AppLayout>
        <IntelligentCampaignFlow 
          onCancel={handleCancelCreation}
          onCreationComplete={handleCampaignCreated}
        />
      </AppLayout>
    );
  }

  if (selectedCampaignId) {
    const campaign = campaigns.find(c => c.id === selectedCampaignId);
    if (campaign) {
      return (
        <AppLayout>
          <div className="mb-4">
            <Button variant="outline" onClick={() => setSelectedCampaignId(null)}>
              ← Voltar para Campanhas
            </Button>
          </div>
          <CampaignDashboard 
            campaignId={campaign.id}
            campaignName={campaign.name}
            metrics={{
              leadsReached: campaign.totalLeads,
              openRate: 12.5,
              clickRate: 3.2,
              responseRate: campaign.responses / campaign.totalLeads * 100,
              meetingsScheduled: campaign.meetings,
              sales: 2,
              optOuts: 5,
              reengaged: 8
            }}
          />
        </AppLayout>
      );
    }
  }

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            Campanhas Inteligentes
          </h1>
          <p className="text-muted-foreground">
            Crie sequências de até 5 toques personalizados com IA e acompanhe em tempo real
          </p>
        </div>
        <Button onClick={handleCreateCampaign} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Nova Campanha Inteligente
        </Button>
      </div>

      {/* Cards de Introdução */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              O que é uma Campanha Inteligente?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Uma sequência de até 5 toques personalizados (e-mail, WhatsApp, tarefas etc.), 
              enviados automaticamente ou manualmente, com base em comportamento do lead. 
              A IA sugere melhorias e você acompanha tudo em tempo real com indicadores.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline">📧 E-mail automático</Badge>
              <Badge variant="outline">📱 WhatsApp</Badge>
              <Badge variant="outline">📞 Ligações</Badge>
              <Badge variant="outline">✅ Tarefas</Badge>
              <Badge variant="outline">🧠 IA Inteligente</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar campanhas..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {activeCampaigns.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {activeCampaigns.slice(0, 3).map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <CardDescription>{campaign.objective}</CardDescription>
                    </div>
                    <Badge variant={campaign.status === "active" ? "default" : "outline"}>
                      {campaign.status === "active" ? "Ativa" : "Pausada"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Progresso</span>
                        <span className="font-medium">{campaign.progress}%</span>
                      </div>
                      <Progress value={campaign.progress} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Leads:</span>
                        <span className="font-medium ml-1">{campaign.totalLeads}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Respostas:</span>
                        <span className="font-medium ml-1">{campaign.responses}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Reuniões:</span>
                        <span className="font-medium ml-1">{campaign.meetings}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Conversão:</span>
                        <span className="font-medium ml-1">{campaign.conversionRate}%</span>
                      </div>
                    </div>
                    
                    {/* AI Insights */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                      <div className="flex items-center gap-1 text-xs text-blue-700 font-medium mb-1">
                        <Brain className="h-3 w-3" />
                        Insight da IA
                      </div>
                      <p className="text-xs text-blue-600">
                        Taxa de abertura boa (18%). Continue com assuntos diretos.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="flex w-full justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {campaign.remainingDays} dias restantes
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewDashboard(campaign.id)}
                    >
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Dashboard
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="active">Ativas</TabsTrigger>
          <TabsTrigger value="draft">Rascunhos</TabsTrigger>
          <TabsTrigger value="completed">Completas</TabsTrigger>
          <TabsTrigger value="paused">Pausadas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <CampaignsList 
            campaigns={campaigns}
            isLoading={isLoading}
            searchTerm={searchTerm}
          />
        </TabsContent>
        
        <TabsContent value="active" className="mt-4">
          <CampaignsList 
            campaigns={campaigns.filter(c => c.status === "active")}
            isLoading={isLoading}
            searchTerm={searchTerm}
          />
        </TabsContent>
        
        <TabsContent value="draft" className="mt-4">
          <CampaignsList 
            campaigns={campaigns.filter(c => c.status === "draft")}
            isLoading={isLoading} 
            searchTerm={searchTerm}
          />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <CampaignsList 
            campaigns={campaigns.filter(c => c.status === "completed")}
            isLoading={isLoading}
            searchTerm={searchTerm}
          />
        </TabsContent>
        
        <TabsContent value="paused" className="mt-4">
          <CampaignsList 
            campaigns={campaigns.filter(c => c.status === "paused")}
            isLoading={isLoading}
            searchTerm={searchTerm}
          />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Campaigns;
