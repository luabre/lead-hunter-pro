
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, Database, Archive, Radar, Check, Play } from "lucide-react";
import { LeadSourceSelector } from "./LeadSourceSelector";
import { CampaignScriptSelector } from "./CampaignScriptSelector";

interface CampaignCreationFlowProps {
  onCancel: () => void;
  onCreationComplete: (campaignName: string) => void;
}

const CampaignCreationFlow = ({ onCancel, onCreationComplete }: CampaignCreationFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: "",
    objective: "prospecting",
    approachType: "whatsapp",
    leadSource: "",
    duration: "14",
    selectedLeads: [],
    script: ""
  });

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCampaignDataChange = (field: string, value: any) => {
    setCampaignData({
      ...campaignData,
      [field]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally save the campaign to the database
    onCreationComplete(campaignData.name);
  };

  const renderProgressBar = () => {
    return (
      <div className="relative mb-8">
        <div className="flex justify-between mb-2">
          <div className="text-center z-10">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              1
            </div>
            <div className="text-xs mt-1">Básico</div>
          </div>
          <div className="text-center z-10">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              2
            </div>
            <div className="text-xs mt-1">Leads</div>
          </div>
          <div className="text-center z-10">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              3
            </div>
            <div className="text-xs mt-1">Conteúdo</div>
          </div>
          <div className="text-center z-10">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              4
            </div>
            <div className="text-xs mt-1">Revisão</div>
          </div>
        </div>
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted">
          <div className={`h-full bg-primary transition-all`} style={{ width: `${(currentStep - 1) * 33.33}%` }}></div>
        </div>
      </div>
    );
  };

  const renderBasicInfoStep = () => {
    return (
      <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="campaign-name">Nome da Campanha</Label>
            <Input 
              id="campaign-name" 
              placeholder="Ex: Prospecção Tecnologia Q2" 
              value={campaignData.name}
              onChange={(e) => handleCampaignDataChange("name", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="campaign-objective">Objetivo</Label>
            <Select 
              value={campaignData.objective}
              onValueChange={(value) => handleCampaignDataChange("objective", value)}
            >
              <SelectTrigger id="campaign-objective">
                <SelectValue placeholder="Selecione um objetivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prospecting">Prospecção</SelectItem>
                <SelectItem value="nurture">Nutrição</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
                <SelectItem value="upsell">Upsell</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Tipo de Abordagem</Label>
            <RadioGroup 
              value={campaignData.approachType}
              onValueChange={(value) => handleCampaignDataChange("approachType", value)}
              className="grid grid-cols-1 gap-4 md:grid-cols-3"
            >
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="whatsapp" id="whatsapp" />
                <Label htmlFor="whatsapp" className="flex-1">WhatsApp (IA SDR)</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email" className="flex-1">Email</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual" className="flex-1">Manual</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="campaign-duration">Duração da Campanha</Label>
            <Select 
              value={campaignData.duration}
              onValueChange={(value) => handleCampaignDataChange("duration", value)}
            >
              <SelectTrigger id="campaign-duration">
                <SelectValue placeholder="Selecione a duração" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 dias</SelectItem>
                <SelectItem value="14">14 dias</SelectItem>
                <SelectItem value="30">30 dias</SelectItem>
                <SelectItem value="60">60 dias</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            Próximo
          </Button>
        </div>
      </form>
    );
  };

  const renderLeadSelectionStep = () => {
    return (
      <div>
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="search" className="flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Busca Inteligente
            </TabsTrigger>
            <TabsTrigger value="import" className="flex items-center">
              <Archive className="h-4 w-4 mr-2" />
              Base Importada
            </TabsTrigger>
            <TabsTrigger value="radar" className="flex items-center">
              <Radar className="h-4 w-4 mr-2" />
              Radar IA
            </TabsTrigger>
            <TabsTrigger value="existing" className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              Base Existente
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="mt-4">
            <LeadSourceSelector 
              sourceType="search"
              onLeadsSelected={(leads) => handleCampaignDataChange("selectedLeads", leads)} 
            />
          </TabsContent>
          
          <TabsContent value="import" className="mt-4">
            <LeadSourceSelector 
              sourceType="import" 
              onLeadsSelected={(leads) => handleCampaignDataChange("selectedLeads", leads)}
            />
          </TabsContent>
          
          <TabsContent value="radar" className="mt-4">
            <LeadSourceSelector 
              sourceType="radar" 
              onLeadsSelected={(leads) => handleCampaignDataChange("selectedLeads", leads)}
            />
          </TabsContent>
          
          <TabsContent value="existing" className="mt-4">
            <LeadSourceSelector 
              sourceType="existing" 
              onLeadsSelected={(leads) => handleCampaignDataChange("selectedLeads", leads)}
            />
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 flex justify-between">
          <Button type="button" variant="outline" onClick={handlePreviousStep}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <Button onClick={handleNextStep}>
            Próximo
          </Button>
        </div>
      </div>
    );
  };

  const renderScriptStep = () => {
    return (
      <div>
        <CampaignScriptSelector 
          campaignType={campaignData.objective}
          approachType={campaignData.approachType}
          onScriptSelected={(script) => handleCampaignDataChange("script", script)}
        />
        
        <div className="mt-8 flex justify-between">
          <Button type="button" variant="outline" onClick={handlePreviousStep}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <Button onClick={handleNextStep}>
            Próximo
          </Button>
        </div>
      </div>
    );
  };

  const renderReviewStep = () => {
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Revise sua campanha</CardTitle>
            <CardDescription>
              Confirme os detalhes da campanha antes de ativá-la
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Nome</h3>
                <p>{campaignData.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Objetivo</h3>
                <p>
                  {
                    campaignData.objective === "prospecting" ? "Prospecção" :
                    campaignData.objective === "nurture" ? "Nutrição" :
                    campaignData.objective === "follow-up" ? "Follow-up" : "Upsell"
                  }
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tipo de Abordagem</h3>
                <p>
                  {
                    campaignData.approachType === "whatsapp" ? "WhatsApp (IA SDR)" :
                    campaignData.approachType === "email" ? "Email" : "Manual"
                  }
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Duração</h3>
                <p>{campaignData.duration} dias</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Leads Selecionados</h3>
              <div className="border rounded-md p-3 bg-muted/50">
                <span className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  {campaignData.selectedLeads.length} leads selecionados
                </span>
              </div>
            </div>
            
            {campaignData.script && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Script</h3>
                <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
                  <p className="text-sm whitespace-pre-line">{campaignData.script}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="mt-8 flex justify-between">
          <Button type="button" variant="outline" onClick={handlePreviousStep}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Play className="h-4 w-4" />
            Ativar Campanha
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onCancel} className="mr-4 p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Nova Campanha</h1>
          <p className="text-muted-foreground">
            Configure sua campanha de prospecção automatizada
          </p>
        </div>
      </div>
      
      {renderProgressBar()}
      
      {currentStep === 1 && renderBasicInfoStep()}
      {currentStep === 2 && renderLeadSelectionStep()}
      {currentStep === 3 && renderScriptStep()}
      {currentStep === 4 && renderReviewStep()}
    </div>
  );
};

export default CampaignCreationFlow;
