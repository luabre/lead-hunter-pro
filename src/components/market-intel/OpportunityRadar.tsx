
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

  const handleViewCompanies = () => {
    navigate('/smart-search', { 
      state: { 
        preFiltered: true, 
        segment: userSegment,
        recentGrowth: true 
      } 
    });
  };

  const handleCreateCampaign = () => {
    navigate('/campaigns', { 
      state: { 
        fromIntel: true,
        segment: userSegment,
        suggestedMessage: true
      } 
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
                  🧠 A IA identificou <span className="font-bold text-leadhunter-blue">117 novas empresas</span> no setor de {userSegment} nos últimos 30 dias.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-leadhunter-teal bg-opacity-20 p-2 rounded-full mt-1">
                <Rocket className="h-4 w-4 text-leadhunter-teal" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  🚀 Potenciais oportunidades com <span className="font-bold text-leadhunter-teal">28,5% mais conversão</span> que a média.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-leadhunter-green bg-opacity-20 p-2 rounded-full mt-1">
                <MapPin className="h-4 w-4 text-leadhunter-green" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  📍 Concentração em <span className="font-bold">SP e MG</span> | ⚙️ Veja no Mapa
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
            <span className="font-medium"> Confiança:</span> 94%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpportunityRadar;
