
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import CompanySearch from "@/components/search/CompanySearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp, MapPin, Zap } from "lucide-react";

const SmartSearch = () => {
  const location = useLocation();
  const [isFromInsight, setIsFromInsight] = useState(false);
  const [insightData, setInsightData] = useState<any>(null);

  useEffect(() => {
    if (location.state?.fromInsight) {
      setIsFromInsight(true);
      setInsightData(location.state);
    }
  }, [location.state]);

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Busca Inteligente</h1>
          <p className="text-muted-foreground">
            {isFromInsight 
              ? `Resultados baseados no insight de IA - ${insightData?.segment || 'Segmento não identificado'}`
              : "Encontre empresas usando filtros avançados e IA"
            }
          </p>
        </div>
        {isFromInsight && (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Zap className="h-3 w-3 mr-1" />
            Filtros de IA Aplicados
          </Badge>
        )}
      </div>

      {isFromInsight && insightData && (
        <div className="mb-6 space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <TrendingUp className="h-4 w-4" />
            <AlertDescription className="font-medium">
              {insightData.alertMessage || `🚀 Estas empresas têm ${insightData.conversionBoost || 'alta'} chance de conversão que a média.`}
            </AlertDescription>
          </Alert>

          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                Insight Ativo - Radar de Oportunidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Empresas detectadas</p>
                    <p className="font-bold text-blue-600">{insightData.expectedCompanies || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Regiões de destaque</p>
                    <p className="font-bold text-green-600">{insightData.location?.join(", ") || 'Nacional'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Zap className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Boost de conversão</p>
                    <p className="font-bold text-purple-600">+{insightData.conversionBoost || 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t text-xs text-muted-foreground">
                <span className="font-medium">ID do Insight:</span> {insightData.insightId || 'N/A'} | 
                <span className="font-medium"> Período:</span> {insightData.period?.replace('_', ' ') || 'N/A'} | 
                <span className="font-medium"> Segmento:</span> {insightData.segment || 'N/A'}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <CompanySearch 
        initialFilters={isFromInsight ? {
          segment: insightData?.segment,
          locations: insightData?.location,
          aiDetected: insightData?.aiDetected,
          recentGrowth: insightData?.recentGrowth,
          fromInsight: true,
          insightId: insightData?.insightId
        } : undefined}
      />
    </AppLayout>
  );
};

export default SmartSearch;
