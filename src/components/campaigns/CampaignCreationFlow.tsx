import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, Database, Archive, Radar, Check, Play, Upload } from "lucide-react";
import { LeadSourceSelector } from "./LeadSourceSelector";
import { CampaignScriptSelector } from "./CampaignScriptSelector";
import CampaignTypeSelector, { CampaignType } from "./CampaignTypeSelector";
import CampaignBasicInfoStep from "./CampaignBasicInfoStep";

interface CampaignCreationFlowProps {
  onCancel: () => void;
  onCreationComplete: (campaignName: string) => void;
}

const CampaignCreationFlow = ({ onCancel, onCreationComplete }: CampaignCreationFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0); // Começar em 0 para o seletor de tipo
  const [campaignType, setCampaignType] = useState<CampaignType>("cnpj");
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
    onCreationComplete(campaignData.name);
  };

  const renderProgressBar = () => {
    // Não mostrar barra de progresso no step 0 (seletor de tipo)
    if (currentStep === 0) return null;
    
    const actualStep = currentStep; // Steps 1-4
    return (
      <div className="relative mb-8">
        <div className="flex justify-between mb-2">
          <div className="text-center z-10">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${actualStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              1
            </div>
            <div className="text-xs mt-1">Básico</div>
          </div>
          <div className="text-center z-10">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${actualStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              2
            </div>
            <div className="text-xs mt-1">{campaignType === "cpf" ? "Base PF" : "Leads"}</div>
          </div>
          <div className="text-center z-10">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${actualStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              3
            </div>
            <div className="text-xs mt-1">Conteúdo</div>
          </div>
          <div className="text-center z-10">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${actualStep >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              4
            </div>
            <div className="text-xs mt-1">Revisão</div>
          </div>
        </div>
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted">
          <div className={`h-full bg-primary transition-all`} style={{ width: `${(actualStep - 1) * 33.33}%` }}></div>
        </div>
      </div>
    );
  };

  const renderLeadSelectionStep = () => {
    // Para CPF, mostrar apenas opção de importar base própria
    if (campaignType === "cpf") {
      return (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">👤 Base de Pessoas Físicas</h3>
            <p className="text-muted-foreground">
              Para campanhas PF, você pode importar sua base própria de contatos ou utilizar leads já cadastrados.
            </p>
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>⚠️ Lembrete LGPD:</strong> Certifique-se de ter consentimento válido para todos os contatos.
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="import" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="import" className="flex items-center">
                <Archive className="h-4 w-4 mr-2" />
                Importar Base PF
              </TabsTrigger>
              <TabsTrigger value="existing" className="flex items-center">
                <Database className="h-4 w-4 mr-2" />
                Base Existente PF
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="import" className="mt-4">
              <div className="text-center p-6 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                <Archive className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h4 className="font-medium mb-2">Importar nova base de contatos PF</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Faça upload de sua planilha com contatos de pessoas físicas
                </p>
                <Button 
                  onClick={() => {
                    // Redirecionar para importação com tipo CPF
                    window.open('/lead-import?type=cpf', '_blank');
                  }}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Ir para Importação PF
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="existing" className="mt-4">
              <LeadSourceSelector 
                sourceType="existing-cpf"
                campaignType="cpf"
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
    }

    // Para CNPJ, mostrar todas as opções (busca inteligente, radar, etc.)
    return (
      <div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">🏢 Seleção de Leads Empresariais</h3>
          <p className="text-muted-foreground">
            Escolha a fonte dos seus leads empresariais com enriquecimento automático de dados.
          </p>
        </div>
        
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
              campaignType="cnpj"
              onLeadsSelected={(leads) => handleCampaignDataChange("selectedLeads", leads)} 
            />
          </TabsContent>
          
          <TabsContent value="import" className="mt-4">
            <LeadSourceSelector 
              sourceType="import" 
              campaignType="cnpj"
              onLeadsSelected={(leads) => handleCampaignDataChange("selectedLeads", leads)}
            />
          </TabsContent>
          
          <TabsContent value="radar" className="mt-4">
            <LeadSourceSelector 
              sourceType="radar" 
              campaignType="cnpj"
              onLeadsSelected={(leads) => handleCampaignDataChange("selectedLeads", leads)}
            />
          </TabsContent>
          
          <TabsContent value="existing" className="mt-4">
            <LeadSourceSelector 
              sourceType="existing" 
              campaignType="cnpj"
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
          targetType={campaignType}
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
                <h3 className="text-sm font-medium text-muted-foreground">Tipo</h3>
                <p className="flex items-center gap-2">
                  {campaignType === "cpf" ? "👤 Pessoa Física (CPF)" : "🏢 Pessoa Jurídica (CNPJ)"}
                </p>
              </div>
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
                    campaignData.objective === "follow-up" ? "Follow-up" :
                    campaignData.objective === "upsell" ? "Upsell" :
                    campaignData.objective === "lead-generation" ? "Geração de Leads" :
                    campaignData.objective === "product-launch" ? "Lançamento de Produto" :
                    campaignData.objective === "education" ? "Educação/Conteúdo" :
                    campaignData.objective === "conversion" ? "Conversão de Interesse" : 
                    campaignData.objective
                  }
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tipo de Abordagem</h3>
                <p>
                  {
                    campaignData.approachType === "whatsapp" ? "💬 WhatsApp (IA SDR)" :
                    campaignData.approachType === "email" ? "📧 Email" : 
                    campaignData.approachType === "linkedin" ? "💼 LinkedIn" :
                    campaignData.approachType === "sms" ? "📱 SMS" : "✋ Manual"
                  }
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Duração</h3>
                <p>{campaignData.duration} dias</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                {campaignType === "cpf" ? "Contatos PF Selecionados" : "Leads Empresariais Selecionados"}
              </h3>
              <div className="border rounded-md p-3 bg-muted/50">
                <span className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  {campaignData.selectedLeads.length} {campaignType === "cpf" ? "contatos" : "leads"} selecionados
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
            {currentStep === 0 
              ? "Selecione o tipo de campanha para começar"
              : "Configure sua campanha de prospecção automatizada"
            }
          </p>
        </div>
      </div>
      
      {renderProgressBar()}
      
      {currentStep === 0 && (
        <div>
          <CampaignTypeSelector 
            selectedType={campaignType}
            onTypeChange={setCampaignType}
          />
          <div className="mt-8 flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button onClick={handleNextStep}>
              Continuar
            </Button>
          </div>
        </div>
      )}
      
      {currentStep === 1 && (
        <CampaignBasicInfoStep
          campaignType={campaignType}
          campaignData={campaignData}
          onDataChange={handleCampaignDataChange}
          onNext={handleNextStep}
          onCancel={onCancel}
        />
      )}
      
      {currentStep === 2 && renderLeadSelectionStep()}
      {currentStep === 3 && renderScriptStep()}
      {currentStep === 4 && renderReviewStep()}
    </div>
  );
};

export default CampaignCreationFlow;
