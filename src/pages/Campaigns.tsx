
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, PlusCircle, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import CampaignsList from "@/components/campaigns/CampaignsList";
import CampaignCreationFlow from "@/components/campaigns/CampaignCreationFlow";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useToast } from "@/components/ui/use-toast";

const Campaigns = () => {
  const [showCampaignCreation, setShowCampaignCreation] = useState(false);
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
      title: "Campanha criada",
      description: `A campanha ${campaignName} foi criada com sucesso!`,
    });
  };
  
  if (showCampaignCreation) {
    return (
      <AppLayout>
        <CampaignCreationFlow 
          onCancel={handleCancelCreation}
          onCreationComplete={handleCampaignCreated}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Campanhas</h1>
          <p className="text-muted-foreground">
            Gerencie suas campanhas de prospecção e automatize seu pipeline
          </p>
        </div>
        <Button onClick={handleCreateCampaign}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Campanha
        </Button>
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
              <Card key={campaign.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <CardDescription>{campaign.objective}</CardDescription>
                    </div>
                    <Badge variant={campaign.status === "active" ? "default" : "outline"}>
                      {campaign.status === "active" ? "Ativo" : "Pausado"}
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
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="flex w-full justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {campaign.remainingDays} dias restantes
                    </span>
                    <Button variant="ghost" size="sm">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Detalhes
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="active">Ativas</TabsTrigger>
          <TabsTrigger value="draft">Rascunhos</TabsTrigger>
          <TabsTrigger value="completed">Completas</TabsTrigger>
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
      </Tabs>
    </AppLayout>
  );
};

export default Campaigns;
