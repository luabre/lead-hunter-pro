import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import AiAgentCard from "@/components/ai/AiAgentCard";
import BusinessTypeChart from "@/components/dashboard/BusinessTypeChart";
import MarketChart from "@/components/dashboard/MarketChart";
import CompanyHeatMap from "@/components/search/CompanyHeatMap";
import { 
  Database, Users, TrendingUp, Brain, Rocket, Calendar, 
  Flame, Lightbulb, ChevronRight, AlertTriangle, Edit, ArrowRight, Search
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertBox } from "@/components/common/AlertBox";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import CompanyDetails from "@/components/company/CompanyDetails";

// Mock Data - mantido o mesmo
const mockCompanies = [
  {
    id: "1",
    name: "Tech Solutions Ltda",
    fantasyName: "TechSol",
    cnpj: "12.345.678/0001-90",
    city: "São Paulo",
    state: "SP",
    segment: "Tecnologia",
    employees: "50-100",
    opportunity: "hot" as const,
    aiDetected: true,
    digitalMaturity: 82,
    website: "techsol.com.br",
    yearFounded: "2015",
    porterAnalysis: {
      competition: 8,
      clientPower: 6,
      substitutes: 4,
      newEntrants: 7,
      supplierPower: 3,
    },
  },
  {
    id: "2",
    name: "Logística Express Eireli",
    fantasyName: "LogEx",
    cnpj: "23.456.789/0001-01",
    city: "Rio de Janeiro",
    state: "RJ",
    segment: "Logística",
    employees: "100-200",
    opportunity: "warm" as const,
  },
  {
    id: "3",
    name: "Saúde & Bem-estar S.A.",
    fantasyName: "SaudeBem",
    cnpj: "34.567.890/0001-12",
    city: "Belo Horizonte",
    state: "MG",
    segment: "Saúde",
    employees: "200-300",
    opportunity: "cold" as const,
  },
  {
    id: "4",
    name: "Construções Urbanas Ltda",
    fantasyName: "UrbanCon",
    cnpj: "45.678.901/0001-23",
    city: "Curitiba",
    state: "PR",
    segment: "Construção",
    employees: "300-400",
    opportunity: "warm" as const,
    aiDetected: true,
  },
  {
    id: "5",
    name: "Alimentos Naturais S.A.",
    fantasyName: "NaturFood",
    cnpj: "56.789.012/0001-34",
    city: "Porto Alegre",
    state: "RS",
    segment: "Alimentação",
    employees: "100-200",
    opportunity: "hot" as const,
  },
];

const stateData = [
  { name: "SP", value: 1245 },
  { name: "RJ", value: 860 },
  { name: "MG", value: 745 },
  { name: "PR", value: 520 },
  { name: "RS", value: 480 },
  { name: "SC", value: 390 },
  { name: "BA", value: 350 },
  { name: "DF", value: 310 },
];

const businessTypeData = [
  { name: "LTDA", value: 2500 },
  { name: "MEI", value: 1800 },
  { name: "S.A.", value: 800 },
  { name: "EIRELI", value: 600 },
  { name: "EI", value: 400 },
];

const heatMapStates = [
  { uf: "SP", name: "São Paulo", count: 1245 },
  { uf: "RJ", name: "Rio de Janeiro", count: 860 },
  { uf: "MG", name: "Minas Gerais", count: 745 },
  { uf: "PR", name: "Paraná", count: 520 },
  { uf: "RS", name: "Rio Grande do Sul", count: 480 },
  { uf: "SC", name: "Santa Catarina", count: 390 },
  { uf: "BA", name: "Bahia", count: 350 },
  { uf: "DF", name: "Distrito Federal", count: 310 },
  { uf: "GO", name: "Goiás", count: 290 },
  { uf: "PE", name: "Pernambuco", count: 280 },
  { uf: "AM", name: "Amazonas", count: 200 },
  { uf: "CE", name: "Ceará", count: 220 },
  { uf: "MT", name: "Mato Grosso", count: 180 },
  { uf: "ES", name: "Espírito Santo", count: 170 },
  { uf: "PB", name: "Paraíba", count: 140 },
];

// Novos dados para os cards de ação imediata
const actionCards = [
  {
    id: "leads-ready",
    title: "🔥 3 Leads estão prontos para Fechamento",
    description: "A IA Closer sinalizou interesse alto",
    buttonText: "Ver agora",
    buttonAction: "/pipeline",
    priority: "high",
  },
  {
    id: "script-below",
    title: "📈 Script de João está abaixo da média",
    description: "IA sugere ajuste urgente",
    buttonText: "Ajustar",
    buttonAction: "/ia-sdr",
    priority: "medium",
  },
  {
    id: "new-opportunity",
    title: "🧠 Nova Oportunidade: Educação Online em Alta",
    description: "Setor com aumento de 28% nas buscas",
    buttonText: "Criar campanha",
    buttonAction: "/market-intel",
    priority: "high",
  },
];

// Mini guia interativo
const quickStartGuide = [
  { text: "Ver Oportunidades do Dia", route: "/companies", filter: "hot" },
  { text: "Reorganizar Funil", route: "/pipeline" },
  { text: "Acompanhar Leads com Propostas Abertas", route: "/meetings" },
];

const Index = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState<typeof mockCompanies[0] | null>(null);

  const handleCloseDetails = () => {
    setSelectedCompany(null);
  };

  const handleNavigateToCompanies = () => {
    navigate('/companies');
  };

  const handleNavigateToHotOpportunities = () => {
    navigate('/companies', { state: { filter: 'hot' } });
  };

  const handleNavigateToContacts = () => {
    navigate('/contacts');
  };

  const handleActivateAiScan = () => {
    toast({
      title: "Varredura IA Iniciada",
      description: "Nossa IA está analisando seu mercado. Você receberá notificações quando encontrarmos novas oportunidades.",
    });
  };

  const handleDiscoverOpportunities = () => {
    navigate('/market-intel');
  };

  const handleNavigateToAiManager = () => {
    navigate('/ai-manager');
  };

  const handleNavigateToRoute = (route: string) => {
    navigate(route);
  };

  const handleNavigateToSmartSearch = () => {
    navigate('/smart-search');
  };

  return (
    <AppLayout>
      {/* Header com nova abordagem estratégica */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold">Seu Dia Começa Aqui</h1>
            <Badge className="bg-blue-500 hover:bg-blue-600">07:15</Badge>
          </div>
          <p className="text-muted-foreground text-lg">
            O Gerente de IA já trabalhou enquanto você dormia.
          </p>
        </div>
        <Button onClick={handleNavigateToSmartSearch} className="gap-2">
          <Search className="h-4 w-4" />
          Buscar Empresas com IA
        </Button>
      </div>

      {/* Frase de impacto do Gerente de IA */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Brain className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-blue-800 text-lg font-medium italic">
              "Você não precisa correr atrás de oportunidades. Elas já estão esperando sua resposta."
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard atualizado por IA */}
      <Card className="mb-6 border-green-200 bg-green-50/40">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Brain className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">🧠 Painel otimizado às 07h15 por IA</h3>
                <p className="text-muted-foreground">
                  Última análise: 19 empresas novas, 4 leads reclassificados, 1 campanha pausada.
                </p>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-green-300 text-green-700 hover:bg-green-100"
              onClick={handleNavigateToAiManager}
            >
              Ver detalhes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CTA com status dinâmico do usuário */}
      <Card className="mb-6 bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">🎯 Você já está 21% acima da média no seu setor!</h3>
              </div>
              <div className="w-full">
                <Progress value={71} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Média do setor: 50%</span>
                  <span>Seu desempenho: 71%</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/market-intel')}
              className="bg-amber-500 hover:bg-amber-600 whitespace-nowrap"
            >
              Ativar Modo Campanha
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Intelligence Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Empresas Detectadas Hoje" 
            value="19" 
            description="Novas oportunidades" 
            icon={<Rocket className="h-8 w-8" />}
            onClick={handleNavigateToCompanies}
          />
          <StatsCard 
            title="Leads Quentes" 
            value="7" 
            description="Na sua conta" 
            icon={<Flame className="h-8 w-8" />}
            onClick={handleNavigateToHotOpportunities}
          />
          <StatsCard 
            title="Reuniões Agendadas" 
            value="3" 
            description="Esta semana" 
            icon={<Calendar className="h-8 w-8" />}
            onClick={() => navigate('/meetings')}
          />
          <StatsCard 
            title="Melhor Conversão" 
            value="21%" 
            description="Segmento: Clínicas Estéticas" 
            icon={<TrendingUp className="h-8 w-8" />}
          />
        </div>

        {/* Cards com Ações Imediatas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actionCards.map(card => (
            <Card 
              key={card.id} 
              className={`border-l-4 ${
                card.priority === 'high' ? 'border-l-red-500' : 
                card.priority === 'medium' ? 'border-l-amber-500' : 'border-l-blue-500'
              }`}
            >
              <CardContent className="p-5">
                <h3 className="font-medium text-base mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{card.description}</p>
                <Button 
                  size="sm" 
                  onClick={() => navigate(card.buttonAction)}
                  className="w-full"
                >
                  {card.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mini Guia + Alertas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mini guia interativo */}
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Não sabe por onde começar?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickStartGuide.map((item, index) => (
                <Button 
                  key={index} 
                  variant="ghost" 
                  className="w-full justify-start gap-2 text-left hover:bg-slate-100" 
                  onClick={() => navigate(item.route, item.filter ? { state: { filter: item.filter } } : undefined)}
                >
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  {item.text}
                </Button>
              ))}
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 text-left hover:bg-slate-100" 
                onClick={handleNavigateToSmartSearch}
              >
                <ArrowRight className="h-4 w-4 text-blue-500" />
                Buscar empresas com IA
              </Button>
            </CardContent>
          </Card>
              
          {/* Alertas e Dicas */}
          <div className="col-span-1">
            <AlertBox 
              title="Alertas & Novidades" 
              alerts={[
                {
                  icon: "bell",
                  text: "2 leads responderam à IA SDR nas últimas 24h",
                  type: "alert",
                  action: () => navigate('/ia-sdr')
                },
                {
                  icon: "pin",
                  text: "Teste o novo módulo de Degustação com IA Closer",
                  type: "tip",
                  action: () => navigate('/ia-closer')
                },
                {
                  icon: "megaphone",
                  text: "Atualização v1.2 com painel de benchmarking liberado!",
                  type: "update"
                }
              ]}
            />
          </div>
        </div>

        {/* AI suggestion and call to action */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">IA Sugere:</h3>
                  <p className="text-muted-foreground">"Aproveite o aumento de buscas no setor de Educação Online"</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={handleDiscoverOpportunities}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Descobrir Oportunidades
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleActivateAiScan}
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  <Rocket className="h-5 w-5 mr-2" />
                  Ativar Varredura Inteligente
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Gerente de IA Button */}
        <div className="mt-6 flex justify-center">
          <Button 
            onClick={handleNavigateToAiManager}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 gap-2"
          >
            <Brain className="h-5 w-5" />
            Acessar Gerente de IA
          </Button>
        </div>

        {/* Company Details View */}
        {selectedCompany && (
          <CompanyDetails company={selectedCompany} onClose={handleCloseDetails} />
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
