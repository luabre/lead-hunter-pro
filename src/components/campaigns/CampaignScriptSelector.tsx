
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wand2, Save } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for templates
const mockTemplates = [
  {
    id: "1",
    name: "Abordagem Inicial B2B",
    content: "Olá {{nome}}, tudo bem?\n\nEstou acompanhando o crescimento da {{empresa}} e percebi que vocês têm expandido a atuação no setor de {{segmento}}.\n\nNossa solução tem ajudado empresas similares a aumentarem em 35% a eficiência operacional.\n\nTeria interesse em uma demonstração rápida de 15 minutos na próxima semana?",
    type: "whatsapp",
    category: "prospecting"
  },
  {
    id: "2",
    name: "Follow-up após Demonstração",
    content: "Olá {{nome}}, como vai?\n\nEspero que esteja bem desde nossa última conversa sobre como podemos ajudar a {{empresa}} a otimizar seus processos.\n\nGostaria de saber se você teve a oportunidade de discutir internamente a solução que apresentamos e se surgiram novas dúvidas.\n\nEstou à disposição para um novo bate-papo.",
    type: "whatsapp",
    category: "follow-up"
  },
  {
    id: "3",
    name: "Nutrição - Novo Conteúdo",
    content: "Olá {{nome}},\n\nEspero que esteja tudo bem com você e com a equipe da {{empresa}}.\n\nAcabamos de lançar um estudo de caso sobre como uma empresa do setor de {{segmento}} conseguiu aumentar em 40% sua produtividade usando nossa solução.\n\nAcredito que possa trazer insights valiosos para vocês: [link]\n\nQualquer dúvida, estou à disposição.",
    type: "email",
    category: "nurture"
  },
  {
    id: "4",
    name: "Upsell para Cliente Atual",
    content: "Olá {{nome}},\n\nTenho observado o excelente uso que a {{empresa}} tem feito da nossa ferramenta nos últimos meses.\n\nNotei que vocês poderiam se beneficiar ainda mais com o módulo avançado de {{módulo}} que acabamos de lançar, especialmente desenvolvido para empresas do setor de {{segmento}}.\n\nPodemos conversar sobre como isso poderia trazer ainda mais resultados para vocês?",
    type: "email",
    category: "upsell"
  },
];

interface CampaignScriptSelectorProps {
  campaignType: string;
  approachType: string;
  onScriptSelected: (script: string) => void;
}

export const CampaignScriptSelector = ({ campaignType, approachType, onScriptSelected }: CampaignScriptSelectorProps) => {
  const [currentScript, setCurrentScript] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filter templates based on campaign type and approach type
  const filteredTemplates = mockTemplates.filter(template => 
    (template.category === campaignType || template.category === "general") &&
    (template.type === approachType || template.type === "any")
  );

  // Simulate loading data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Update parent component with the script
  useEffect(() => {
    onScriptSelected(currentScript);
  }, [currentScript, onScriptSelected]);

  const handleTemplateSelect = (templateId: string) => {
    const template = mockTemplates.find(t => t.id === templateId);
    if (template) {
      setCurrentScript(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const handleGenerateWithAI = () => {
    setIsGenerating(true);
    // Simulate AI generating script
    setTimeout(() => {
      setIsGenerating(false);
      // Example AI-generated script based on campaign type
      let aiScript = "";
      
      if (approachType === "whatsapp") {
        if (campaignType === "prospecting") {
          aiScript = "Olá {{nome}}, tudo bem? 👋\n\nSou da equipe de inovação e estou estudando o setor de {{segmento}} onde a {{empresa}} se destaca.\n\nIdentificamos algumas oportunidades que estão gerando 30% de otimização em operações para empresas como a sua.\n\nFaz sentido uma conversa rápida para compartilhar essas descobertas com você? Temos disponibilidade na próxima semana.";
        } else if (campaignType === "nurture") {
          aiScript = "Olá {{nome}}, como vai? 👋\n\nEspero que esteja tudo bem por aí na {{empresa}}!\n\nCompartilho um conteúdo exclusivo que preparamos sobre tendências de inovação em {{segmento}} para 2023:\n\n[link do material]\n\nAcredito que pode ser valioso para os próximos passos que conversamos. O que achou?";
        } else if (campaignType === "follow-up") {
          aiScript = "Olá {{nome}}, tudo bem? 👋\n\nEstou retomando contato sobre as soluções que conversamos para a {{empresa}}.\n\nGostaria de saber se conseguiu avaliar a proposta e se surgiram novas questões que eu possa ajudar a esclarecer.\n\nFicamos à disposição para avançarmos quando for conveniente para vocês.";
        } else {
          aiScript = "Olá {{nome}}, como vai? 👋\n\nTemos observado o excelente uso que a {{empresa}} tem feito da nossa plataforma e queria compartilhar que lançamos um novo recurso que tem tudo a ver com os objetivos que você mencionou na nossa última conversa.\n\nPodemos agendar uma demonstração rápida para mostrar como isso pode potencializar ainda mais seus resultados?";
        }
      } else {
        if (campaignType === "prospecting") {
          aiScript = "Assunto: Oportunidade de otimização para {{empresa}}\n\nOlá {{nome}},\n\nEspero que esteja tudo bem com você.\n\nEstou acompanhando o crescimento da {{empresa}} no setor de {{segmento}} e acredito que posso contribuir com algumas soluções que têm gerado excelentes resultados para empresas similares.\n\nNossos clientes deste segmento têm alcançado:\n\n• Redução de 25% nos custos operacionais\n• Aumento de 30% na produtividade da equipe\n• ROI positivo em menos de 6 meses\n\nGostaria de agendar uma breve conversa para entender melhor seus desafios e mostrar como podemos ajudar?\n\nAtenciosamente,\n[Seu nome]";
        } else if (campaignType === "nurture") {
          aiScript = "Assunto: Conteúdo exclusivo para {{empresa}} - Tendências em {{segmento}}\n\nOlá {{nome}},\n\nEspero que este email o encontre bem.\n\nPreparei um material exclusivo sobre as principais tendências e inovações no setor de {{segmento}} que acredito ser extremamente relevante para os desafios que a {{empresa}} enfrenta atualmente.\n\nVocê pode acessá-lo através deste link: [link do material]\n\nFicarei feliz em discutir qualquer insight que desperte seu interesse ou responder qualquer dúvida que possa surgir.\n\nAtenciosamente,\n[Seu nome]";
        } else if (campaignType === "follow-up") {
          aiScript = "Assunto: Continuidade da nossa conversa - {{empresa}}\n\nOlá {{nome}},\n\nEstou retomando contato referente à nossa conversa sobre as soluções que apresentamos para a {{empresa}}.\n\nGostaria de saber se você teve a oportunidade de analisar a proposta e se surgiram novas questões que eu possa ajudar a esclarecer.\n\nContinuo à disposição para agendar um novo momento para conversarmos ou para fornecer qualquer informação adicional que facilite sua tomada de decisão.\n\nAtenciosamente,\n[Seu nome]";
        } else {
          aiScript = "Assunto: Novos recursos exclusivos para a {{empresa}}\n\nOlá {{nome}},\n\nEspero que esteja tudo bem com você e com toda a equipe da {{empresa}}.\n\nGostaria de compartilhar que acabamos de lançar um novo módulo em nossa plataforma que pode potencializar significativamente os resultados que vocês já estão obtendo, especialmente na área de [área específica].\n\nAlguns de nossos clientes já estão utilizando este recurso e relataram:\n\n• Aumento de 40% na eficiência dos processos\n• Redução de 20% no tempo de implementação\n• Melhor visibilidade sobre métricas-chave de desempenho\n\nGostaria de agendar uma breve demonstração para mostrar como isso pode ser valioso para vocês?\n\nAtenciosamente,\n[Seu nome]";
        }
      }
      
      setCurrentScript(aiScript);
      setSelectedTemplate(null);
    }, 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Script da Campanha</h3>
        <p className="text-muted-foreground text-sm">
          Selecione um modelo existente ou gere um novo com IA
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h4 className="text-sm font-medium mb-3">Templates Disponíveis</h4>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-24" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? 'ring-2 ring-primary'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-medium text-sm">{template.name}</h5>
                      <Badge variant="outline" className="text-xs">
                        {template.type === 'whatsapp' ? 'WhatsApp' : 'Email'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {template.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
              
              <Button
                className="w-full"
                variant="outline"
                size="sm"
                onClick={handleGenerateWithAI}
                disabled={isGenerating}
              >
                <Wand2 className="h-3 w-3 mr-1" />
                {isGenerating ? 'Gerando script...' : 'Gerar com IA'}
              </Button>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-medium">Editor de Script</h4>
            <Button variant="ghost" size="sm" disabled={!currentScript}>
              <Save className="h-3 w-3 mr-1" />
              Salvar template
            </Button>
          </div>
          <Textarea
            value={currentScript}
            onChange={(e) => setCurrentScript(e.target.value)}
            placeholder={`Escreva ou selecione um script para sua campanha de ${
              campaignType === 'prospecting' ? 'prospecção' :
              campaignType === 'nurture' ? 'nutrição' :
              campaignType === 'follow-up' ? 'follow-up' : 'upsell'
            }...`}
            className="min-h-[300px] font-mono text-sm"
          />
          <div className="mt-2 text-xs text-muted-foreground">
            <p>
              Use <code className="bg-muted px-1 rounded">{'{{nome}}'}</code> para o nome do contato, 
              <code className="bg-muted px-1 rounded">{'{{empresa}}'}</code> para o nome da empresa e 
              <code className="bg-muted px-1 rounded">{'{{segmento}}'}</code> para o segmento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
