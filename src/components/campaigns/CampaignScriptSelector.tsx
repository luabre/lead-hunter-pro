
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Edit, Sparkles, Eye } from "lucide-react";

interface CampaignScriptSelectorProps {
  campaignType: string;
  approachType: string;
  targetType?: "cnpj" | "cpf";
  onScriptSelected: (script: string) => void;
}

const CampaignScriptSelector = ({ 
  campaignType, 
  approachType, 
  targetType = "cnpj",
  onScriptSelected 
}: CampaignScriptSelectorProps) => {
  const [selectedScript, setSelectedScript] = useState("");
  const [customScript, setCustomScript] = useState("");

  const getCNPJTemplates = () => {
    if (approachType === "whatsapp") {
      return [
        {
          id: "corp-intro",
          name: "Apresentação Corporativa",
          preview: "Olá {nome}, sou {vendedor} da {empresa}. Vi que vocês trabalham com {segmento} e gostaria de apresentar uma solução que pode otimizar seus resultados em até 40%...",
          tags: ["Formal", "B2B", "Resultados"]
        },
        {
          id: "problem-solution",
          name: "Problema → Solução",
          preview: "Oi {nome}! Muitas empresas do setor {segmento} enfrentam desafios com {problema_comum}. Temos uma solução específica que já ajudou +200 empresas similares...",
          tags: ["Consultivo", "Específico", "Social Proof"]
        }
      ];
    }
    
    if (approachType === "email") {
      return [
        {
          id: "email-formal",
          name: "Email Corporativo Formal",
          preview: "Prezado(a) {nome},\n\nEspero que esta mensagem o(a) encontre bem. Sou {vendedor} da {empresa}, especializada em soluções para o setor {segmento}...",
          tags: ["Formal", "Estruturado", "Profissional"]
        }
      ];
    }
    
    return [];
  };

  const getCPFTemplates = () => {
    if (approachType === "whatsapp") {
      return [
        {
          id: "pf-friendly",
          name: "Abordagem Amigável",
          preview: "Oi {nome}! Tudo bem? Vi que você se interessou por {interesse}. Queria te contar sobre uma oportunidade que pode te ajudar a {beneficio}...",
          tags: ["Casual", "Amigável", "Personal"]
        },
        {
          id: "pf-opportunity", 
          name: "Oportunidade Exclusiva",
          preview: "Olá {nome}! 😊 Tenho uma oportunidade especial relacionada a {interesse} que pode ser perfeita para você. Tem 2 minutinhos para eu te explicar?",
          tags: ["Exclusivo", "Emoji", "Direto"]
        }
      ];
    }
    
    if (approachType === "email") {
      return [
        {
          id: "pf-newsletter",
          name: "Email Marketing PF",
          preview: "Oi {nome}!\n\nEspero que esteja tudo bem com você! Queria compartilhar uma informação valiosa sobre {interesse} que pode fazer a diferença na sua vida...",
          tags: ["Newsletter", "Pessoal", "Educativo"]
        }
      ];
    }
    
    if (approachType === "sms") {
      return [
        {
          id: "pf-sms-short",
          name: "SMS Direto",
          preview: "Oi {nome}! Nova oportunidade de {interesse} disponível. Link: {link} Para sair da lista: SAIR",
          tags: ["Curto", "Direto", "CTA"]
        }
      ];
    }
    
    return [];
  };

  const templates = targetType === "cpf" ? getCPFTemplates() : getCNPJTemplates();

  const handleTemplateSelect = (template: any) => {
    setSelectedScript(template.preview);
    onScriptSelected(template.preview);
  };

  const handleCustomScript = () => {
    setSelectedScript(customScript);
    onScriptSelected(customScript);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">
          {targetType === "cpf" ? "📱 Scripts para Pessoa Física" : "💼 Scripts Corporativos"}
        </h3>
        <p className="text-muted-foreground">
          {targetType === "cpf" 
            ? "Escolha um template otimizado para comunicação com consumidores finais"
            : "Selecione um template profissional para abordagem B2B"
          }
        </p>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Templates IA
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Script Personalizado
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-4">
          {templates.length > 0 ? (
            <div className="grid gap-4">
              {templates.map((template) => (
                <Card 
                  key={template.id} 
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedScript === template.preview ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        {template.name}
                      </CardTitle>
                      <div className="flex gap-1">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 p-3 rounded-md">
                      <p className="text-sm whitespace-pre-line">
                        {template.preview}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h4 className="font-medium mb-2">Templates em desenvolvimento</h4>
                <p className="text-sm text-muted-foreground">
                  Templates para {approachType} {targetType === "cpf" ? "pessoa física" : "corporativo"} 
                  estarão disponíveis em breve.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Criar Script Personalizado
              </CardTitle>
              <CardDescription>
                Escreva seu próprio script. Use variáveis como {targetType === "cpf" ? "{nome}, {interesse}, {cidade}" : "{nome}, {empresa}, {segmento}"} para personalização.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={
                  targetType === "cpf" 
                    ? "Oi {nome}! Tudo bem? Vi que você tem interesse em {interesse}..."
                    : "Olá {nome}, sou da {empresa} e gostaria de apresentar uma solução para {segmento}..."
                }
                value={customScript}
                onChange={(e) => setCustomScript(e.target.value)}
                rows={6}
                className="resize-none"
              />
              
              <div className="flex items-center gap-2">
                <Button 
                  onClick={handleCustomScript}
                  disabled={!customScript.trim()}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Usar Este Script
                </Button>
                
                {customScript && (
                  <Badge variant="outline" className="text-xs">
                    {customScript.length} caracteres
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedScript && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-green-800">
              ✅ Script Selecionado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-3 rounded-md border">
              <p className="text-sm whitespace-pre-line">
                {selectedScript}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export { CampaignScriptSelector };
