
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Rocket, MapPin, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OpportunityRadarProps {
  userSegment?: string;
}

const OpportunityRadar = ({ userSegment = "Educação" }: OpportunityRadarProps) => {
  const navigate = useNavigate();

  // Dados do insight para passar para outras telas
  const insightData = {
    id: "insight_2024_educacao_117",
    segmento: userSegment,
    qtde_empresas: 117,
    periodo_referencia: "últimos 30 dias",
    conversao_estimativa: "28.5",
    regioes_destaque: ["SP", "MG"],
    filtro_aplicado: {
      segmento: userSegment,
      origem: "Radar Ativo",
      status: "nova",
      localizacao: ["SP", "MG"],
      score_ia: ">75"
    }
  };

  const handleViewCompanies = () => {
    // Navegar para Smart Search com filtros automáticos aplicados baseados no insight
    navigate('/smart-search', { 
      state: { 
        fromInsight: true,
        insightId: insightData.id,
        preFiltered: true, 
        segment: userSegment,
        recentGrowth: true,
        location: ["SP", "MG"],
        aiDetected: true,
        period: "30_days",
        expectedCompanies: 117,
        conversionBoost: "28.5%",
        alertMessage: `🚀 Estas ${insightData.qtde_empresas} empresas têm ${insightData.conversao_estimativa}% mais chance de conversão que a média.`
      } 
    });
  };

  const handleCreateCampaign = () => {
    // Navegar para criação de campanha com dados pré-preenchidos baseados no insight
    const campaignPreset = {
      fromIntel: true,
      insightId: insightData.id,
      nome: `Campanha ${userSegment} - Alta Conversão SP/MG`,
      segmento: userSegment,
      publicoAlvo: insightData.qtde_empresas,
      objetivo: "Agendar reunião com decisores",
      canaisSugeridos: ["email", "whatsapp"],
      regioes: insightData.regioes_destaque,
      conversaoEstimativa: insightData.conversao_estimativa,
      suggestedMessage: true,
      leadsPrecCarregados: true,
      toquesInteligentes: [
        {
          tipo: "email",
          mensagem: `Olá {{nome}},\n\nNotei que sua empresa atua no setor de ${userSegment.toLowerCase()} — justamente um dos que mais cresceu nos últimos trimestres.\n\nTenho uma solução específica que pode ajudar empresas como a sua a capturar ainda mais oportunidades nesse cenário favorável.\n\nPodemos conversar?\n\nAtenciosamente,\n{{remetente}}`,
          agendamento: "D+0"
        },
        {
          tipo: "whatsapp",
          mensagem: `Oi {{nome}}, tudo bem? Vi que ainda não retornou sobre nossa proposta para o setor de ${userSegment.toLowerCase()}. Podemos agendar uma conversa rápida?`,
          agendamento: "D+2"
        },
        {
          tipo: "ligacao",
          mensagem: "Ligar para discutir oportunidades de parceria",
          agendamento: "D+5"
        }
      ]
    };

    navigate('/campaigns', { 
      state: campaignPreset
    });
  };

  return (
    <Card className="border-l-4 border-l-leadhunter-blue">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-leadhunter-blue" />
            <CardTitle>Oportunidades para sua empresa</CardTitle>
          </div>
          <Badge variant="outline" className="bg-leadhunter-blue/10 text-leadhunter-blue border-leadhunter-blue/20">
            Radar Ativo
          </Badge>
        </div>
        <CardDescription>
          Insights personalizados baseados no seu segmento de atuação
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-leadhunter-blue bg-opacity-20 p-2 rounded-full mt-1">
                <TrendingUp className="h-4 w-4 text-leadhunter-blue" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  🧠 A IA identificou <span className="font-bold text-leadhunter-blue">{insightData.qtde_empresas} novas empresas</span> no setor de {userSegment} nos últimos 30 dias.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-leadhunter-teal bg-opacity-20 p-2 rounded-full mt-1">
                <Rocket className="h-4 w-4 text-leadhunter-teal" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  🚀 Potenciais oportunidades com <span className="font-bold text-leadhunter-teal">{insightData.conversao_estimativa}% mais conversão</span> que a média.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-leadhunter-green bg-opacity-20 p-2 rounded-full mt-1">
                <MapPin className="h-4 w-4 text-leadhunter-green" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  📍 Concentração em <span className="font-bold">{insightData.regioes_destaque.join(" e ")}</span> | ⚙️ Veja no Mapa
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleViewCompanies} className="flex-1">
            🔎 Ver empresas agora
          </Button>
          <Button onClick={handleCreateCampaign} variant="outline" className="flex-1">
            🚀 Criar campanha com base neste insight
          </Button>
        </div>

        <div className="pt-3 border-t">
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Última atualização:</span> há 2 horas | 
            <span className="font-medium"> Confiança:</span> 94% |
            <span className="font-medium"> ID do Insight:</span> {insightData.id}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpportunityRadar;
