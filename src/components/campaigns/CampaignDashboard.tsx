
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  MessageCircle, 
  Eye, 
  MousePointer, 
  Calendar,
  DollarSign,
  UserX,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  Brain
} from "lucide-react";

interface CampaignMetrics {
  leadsReached: number;
  openRate: number;
  clickRate: number;
  responseRate: number;
  meetingsScheduled: number;
  sales: number;
  optOuts: number;
  reengaged: number;
}

interface CampaignDashboardProps {
  campaignId?: string;
  campaignName?: string;
  metrics?: CampaignMetrics;
}

const CampaignDashboard = ({ 
  campaignId = "demo-campaign", 
  campaignName = "Visão Geral das Campanhas", 
  metrics = {
    leadsReached: 150,
    openRate: 24,
    clickRate: 8,
    responseRate: 12,
    meetingsScheduled: 18,
    sales: 5,
    optOuts: 3,
    reengaged: 8
  }
}: CampaignDashboardProps) => {
  const aiSuggestions = [
    {
      type: "warning",
      icon: <TrendingDown className="h-4 w-4" />,
      message: "Taxa de abertura baixa (12%). Sugira assunto mais direto.",
      action: "Aplicar sugestão"
    },
    {
      type: "danger", 
      icon: <UserX className="h-4 w-4" />,
      message: "Alto número de opt-out após toque 2. Reduza WhatsApp.",
      action: "Editar campanha"
    },
    {
      type: "info",
      icon: <MousePointer className="h-4 w-4" />,
      message: "Lead clicou no vídeo, mas não respondeu. Envie CTA direto.",
      action: "Reengajar"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{campaignName}</h1>
          <p className="text-muted-foreground">Análise e resultados da campanha</p>
        </div>
        <Badge variant="default">Ativa</Badge>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Leads Alcançados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.leadsReached}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Taxa de Abertura
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.openRate}%</div>
            <div className="text-xs text-muted-foreground">
              {metrics.openRate > 15 ? (
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Boa performance
                </span>
              ) : (
                <span className="text-red-600 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" /> Abaixo da média
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              Cliques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.clickRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Respostas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.responseRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Métricas Secundárias */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Reuniões
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.meetingsScheduled}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.sales}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <UserX className="h-4 w-4" />
              Opt-outs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.optOuts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Reengajados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.reengaged}</div>
          </CardContent>
        </Card>
      </div>

      {/* Painel de Recomendações da IA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Recomendações da IA
          </CardTitle>
          <CardDescription>
            A IA monitora sua campanha e sugere melhorias baseadas nos dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className={`p-2 rounded-full ${
                  suggestion.type === "warning" ? "bg-yellow-100 text-yellow-600" :
                  suggestion.type === "danger" ? "bg-red-100 text-red-600" :
                  "bg-blue-100 text-blue-600"
                }`}>
                  {suggestion.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{suggestion.message}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    {suggestion.action}
                  </Button>
                  <Button size="sm" variant="ghost">
                    Ignorar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Funil de Conversão */}
      <Card>
        <CardHeader>
          <CardTitle>Funil de Conversão</CardTitle>
          <CardDescription>Acompanhe a jornada dos seus leads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { stage: "Leads Importados", count: metrics.leadsReached, percentage: 100 },
              { stage: "E-mails Abertos", count: Math.round(metrics.leadsReached * metrics.openRate / 100), percentage: metrics.openRate },
              { stage: "Links Clicados", count: Math.round(metrics.leadsReached * metrics.clickRate / 100), percentage: metrics.clickRate },
              { stage: "Respostas Recebidas", count: Math.round(metrics.leadsReached * metrics.responseRate / 100), percentage: metrics.responseRate },
              { stage: "Reuniões Agendadas", count: metrics.meetingsScheduled, percentage: (metrics.meetingsScheduled / metrics.leadsReached) * 100 }
            ].map((stage, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium">{stage.stage}</div>
                <div className="flex-1 bg-muted rounded-full h-6 relative">
                  <div 
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${stage.percentage}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                    {stage.count} leads ({stage.percentage.toFixed(1)}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignDashboard;
