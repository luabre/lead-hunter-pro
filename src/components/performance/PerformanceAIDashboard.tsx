
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Calendar as CalendarIcon, Users as UsersIcon, TrendingUp, AlertTriangle, CheckCircle, Lightbulb, ArrowRight, RotateCcw, Beaker } from 'lucide-react';
import ScenarioSimulatorModal from './ScenarioSimulatorModal';

// Define the strict status type to match what StatusIndicator expects
type StatusType = "onTrack" | "atRisk" | "critical";

// Simulation scenario type
interface AppliedScenario {
  id: string;
  name: string;
  revenueGoal: number;
  averageTicket: number;
  conversionRate: number;
  cycleTime: number;
  closingsNeeded: number;
  proposalsNeeded: number;
  meetingsNeeded: number;
  leadsNeeded: number;
  effortReduction: number;
}

// Mock data for charts
const originalData = {
  revenueGoal: 100000,
  averageTicket: 10000,
  conversionRate: 4.8,
  cycleTime: 21,
  closingsNeeded: 10,
  proposalsNeeded: 25,
  meetingsNeeded: 42,
  leadsNeeded: 208,
  value: 71,
  target: 100,
  status: "onTrack" as StatusType,
};

const monthlyProgress = [
  { name: 'Jan', value: 65 },
  { name: 'Fev', value: 72 },
  { name: 'Mar', value: 68 },
  { name: 'Abr', value: 71 },
  { name: 'Mai', value: 0 }, // Future month
  { name: 'Jun', value: 0 }, // Future month
];

const performanceData = [
  { name: 'Leads Gerados', value: 428, target: 400 },
  { name: 'Reuniões', value: 74, target: 100 },
  { name: 'Propostas', value: 32, target: 40 },
  { name: 'Fechamentos', value: 12, target: 15 },
];

const radialData = [
  {
    name: 'Meta Mensal',
    value: 71,
    fill: '#10b981',
  }
];

const actionItems = [
  {
    id: 1,
    title: "Enviar follow-up para 12 leads em aberto",
    priority: "high",
    completed: false
  },
  {
    id: 2,
    title: "Ativar campanha para segmento Tecnologia",
    priority: "medium",
    completed: true
  },
  {
    id: 3,
    title: "Revisar objeções de preço nos leads recentes",
    priority: "high",
    completed: false
  },
];

const insightData = [
  {
    title: "Taxa de conversão acima da média",
    description: "Seu time está 18% acima da média do setor em conversão de reuniões para propostas.",
    type: "positive"
  },
  {
    title: "Gargalo identificado",
    description: "Leads do segmento Saúde estão demorando 3x mais para avançar após a primeira reunião.",
    type: "warning"
  },
  {
    title: "Oportunidade detectada",
    description: "Aumento de 27% nas buscas por seu produto no segmento Educação.",
    type: "insight"
  },
];

// Status indicator component
const StatusIndicator = ({ status }: { status: StatusType }) => {
  const getStatusInfo = () => {
    switch (status) {
      case "onTrack":
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          text: "Você está no caminho certo",
          color: "text-green-500",
          bgColor: "bg-green-100"
        };
      case "atRisk":
        return {
          icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
          text: "Atenção: risco de não atingir a meta",
          color: "text-amber-500",
          bgColor: "bg-amber-100"
        };
      case "critical":
        return {
          icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
          text: "Meta comprometida: aja agora!",
          color: "text-red-500",
          bgColor: "bg-red-100"
        };
      default:
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          text: "Status desconhecido",
          color: "text-gray-500",
          bgColor: "bg-gray-100"
        };
    }
  };

  const { icon, text, color, bgColor } = getStatusInfo();

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${bgColor}`}>
      {icon}
      <span className={`text-sm font-medium ${color}`}>{text}</span>
    </div>
  );
};

// Action item component
const ActionItem = ({ action }: { action: typeof actionItems[0] }) => {
  const priorityClass = action.priority === "high" ? "border-red-400" : "border-amber-400";
  
  return (
    <div className={`border-l-4 ${priorityClass} bg-white p-3 rounded-md shadow-sm`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={action.completed} 
            className="rounded text-blue-600" 
            readOnly
          />
          <span className={action.completed ? "line-through text-gray-500" : ""}>{action.title}</span>
        </div>
        <Button variant="ghost" size="sm">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Insight card component
const InsightCard = ({ insight }: { insight: typeof insightData[0] }) => {
  const getInsightIcon = () => {
    switch (insight.type) {
      case "positive":
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "insight":
        return <Lightbulb className="h-5 w-5 text-blue-500" />;
      default:
        return <Lightbulb className="h-5 w-5 text-blue-500" />;
    }
  };

  const getInsightClass = () => {
    switch (insight.type) {
      case "positive":
        return "bg-green-50 border-green-200";
      case "warning":
        return "bg-amber-50 border-amber-200";
      case "insight":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className={`border rounded-md p-3 ${getInsightClass()}`}>
      <div className="flex items-center gap-2 mb-1">
        {getInsightIcon()}
        <h4 className="font-medium">{insight.title}</h4>
      </div>
      <p className="text-sm text-gray-600 ml-7">{insight.description}</p>
    </div>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PerformanceAIDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [appliedScenario, setAppliedScenario] = useState<AppliedScenario | null>(null);

  // Calculate current data based on applied scenario or original data
  const currentData = appliedScenario || originalData;

  // Calculate performance data based on current scenario
  const performanceData = [
    { name: 'Leads Gerados', value: 428, target: currentData.leadsNeeded },
    { name: 'Reuniões', value: 74, target: currentData.meetingsNeeded },
    { name: 'Propostas', value: 32, target: currentData.proposalsNeeded },
    { name: 'Fechamentos', value: 12, target: currentData.closingsNeeded },
  ];

  const radialData = [
    {
      name: 'Meta Mensal',
      value: currentData.value,
      fill: '#10b981',
    }
  ];

  // Function to apply a scenario
  const applyScenario = (scenarioType: 'ticketIncrease' | 'conversionIncrease') => {
    let newScenario: AppliedScenario;

    if (scenarioType === 'ticketIncrease') {
      const newTicket = originalData.averageTicket * 1.2; // +20%
      const newClosingsNeeded = Math.ceil(originalData.revenueGoal / newTicket);
      const newProposalsNeeded = Math.ceil(newClosingsNeeded / 0.4);
      const newMeetingsNeeded = Math.ceil(newProposalsNeeded / 0.6);
      const newLeadsNeeded = Math.ceil(newClosingsNeeded / (originalData.conversionRate / 100));
      const effortReduction = Math.round(((originalData.leadsNeeded - newLeadsNeeded) / originalData.leadsNeeded) * 100);

      newScenario = {
        id: 'ticket-20',
        name: 'Ticket Médio +20%',
        revenueGoal: originalData.revenueGoal,
        averageTicket: newTicket,
        conversionRate: originalData.conversionRate,
        cycleTime: originalData.cycleTime,
        closingsNeeded: newClosingsNeeded,
        proposalsNeeded: newProposalsNeeded,
        meetingsNeeded: newMeetingsNeeded,
        leadsNeeded: newLeadsNeeded,
        effortReduction,
        value: originalData.value,
        target: originalData.target,
        status: originalData.status
      };
    } else {
      const newConversionRate = originalData.conversionRate * 1.3; // +30%
      const newLeadsNeeded = Math.ceil(originalData.closingsNeeded / (newConversionRate / 100));
      const newProposalsNeeded = Math.ceil(originalData.closingsNeeded / 0.4);
      const newMeetingsNeeded = Math.ceil(newProposalsNeeded / 0.6);
      const effortReduction = Math.round(((originalData.leadsNeeded - newLeadsNeeded) / originalData.leadsNeeded) * 100);

      newScenario = {
        id: 'conversion-30',
        name: 'Conversão +30%',
        revenueGoal: originalData.revenueGoal,
        averageTicket: originalData.averageTicket,
        conversionRate: newConversionRate,
        cycleTime: originalData.cycleTime,
        closingsNeeded: originalData.closingsNeeded,
        proposalsNeeded: newProposalsNeeded,
        meetingsNeeded: newMeetingsNeeded,
        leadsNeeded: newLeadsNeeded,
        effortReduction,
        value: originalData.value,
        target: originalData.target,
        status: originalData.status
      };
    }

    setAppliedScenario(newScenario);
  };

  // Function to reset to original scenario
  const resetToOriginal = () => {
    setAppliedScenario(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  return (
    <div className="space-y-6">
      {/* Simulation Alert */}
      {appliedScenario && (
        <Alert className="border-blue-200 bg-blue-50">
          <Beaker className="h-4 w-4 text-blue-600" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-blue-800">
              🧪 <strong>Simulação ativa:</strong> {appliedScenario.name} - 
              {appliedScenario.effortReduction > 0 && ` ${appliedScenario.effortReduction}% menos prospecção`}
            </span>
            <Button variant="outline" size="sm" onClick={resetToOriginal} className="text-blue-700 border-blue-300">
              <RotateCcw className="h-4 w-4 mr-2" />
              Voltar ao original
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="actions">Plano de Ação</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="simulator">Simulador</TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          {/* Main Goal Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">Meta Mensal: {formatCurrency(currentData.revenueGoal)}</CardTitle>
                <StatusIndicator status={currentData.status} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso atual: {currentData.value}%</span>
                    <span className="text-muted-foreground">Meta: 100%</span>
                  </div>
                  <Progress value={currentData.value} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatCurrency((currentData.value / 100) * currentData.revenueGoal)}</span>
                    <span>{formatCurrency(currentData.revenueGoal)}</span>
                  </div>
                </div>

                {/* Key metrics summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center p-3 bg-gray-50 rounded-md">
                    <div className="text-2xl font-bold text-blue-600">{currentData.closingsNeeded}</div>
                    <div className="text-xs text-gray-600">Fechamentos necessários</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-md">
                    <div className="text-2xl font-bold text-green-600">{currentData.leadsNeeded}</div>
                    <div className="text-xs text-gray-600">Leads necessários</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-md">
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(currentData.averageTicket)}</div>
                    <div className="text-xs text-gray-600">Ticket médio</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-md">
                    <div className="text-2xl font-bold text-orange-600">{currentData.conversionRate.toFixed(1)}%</div>
                    <div className="text-xs text-gray-600">Taxa de conversão</div>
                  </div>
                </div>

                {/* Radial chart */}
                <div className="flex justify-center mt-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <RadialBarChart 
                      cx="50%" 
                      cy="50%" 
                      innerRadius="60%" 
                      outerRadius="100%" 
                      data={radialData} 
                      startAngle={180} 
                      endAngle={0}
                    >
                      <RadialBar
                        background
                        dataKey="value"
                        cornerRadius={10}
                      />
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="radial-chart-text"
                        fill="#333"
                        fontSize={24}
                        fontWeight={600}
                      >
                        {currentData.value}%
                      </text>
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>

                {/* Monthly trend */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Evolução mensal</h4>
                  <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={monthlyProgress}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis hide />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Métricas de Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={performanceData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" name="Atual" />
                    <Bar dataKey="target" fill="#e5e7eb" name="Meta" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Distribuição de Conversão</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={performanceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Actions Tab Content */}
        <TabsContent value="actions">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Plano de Ação Inteligente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Para alcançar sua meta de {formatCurrency(currentData.revenueGoal)} faltando 18 dias, a IA sugere as seguintes ações:
                </p>

                <div className="space-y-3">
                  {actionItems.map(action => (
                    <ActionItem key={action.id} action={action} />
                  ))}
                </div>

                <div className="mt-4">
                  <Button className="w-full">
                    Gerar mais ações recomendadas
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarIcon className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Acompanhamento de Execução</h3>
                </div>
                <div className="pl-7">
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Ações completadas</span>
                        <span>1/3</span>
                      </div>
                      <Progress value={33} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso no plano</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-blue-600">
                    <p>Próxima atualização em: <strong>6 horas</strong></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab Content */}
        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Insights de Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {insightData.map((insight, index) => (
                  <InsightCard key={index} insight={insight} />
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <UsersIcon className="h-5 w-5 text-gray-700" />
                  <h3 className="font-medium">Comparativo de Time</h3>
                </div>
                <div className="pl-7">
                  <p className="text-sm text-gray-600 mb-3">
                    Seu desempenho comparado com outros vendedores:
                  </p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Taxa de conversão</span>
                        <span className="text-green-600">+15% acima</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Volume de propostas</span>
                        <span className="text-amber-600">-5% abaixo</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Ticket médio</span>
                        <span className="text-green-600">+22% acima</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Simulator Tab Content */}
        <TabsContent value="simulator">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Simulador de Cenários</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-3">Meta de Faturamento: {formatCurrency(currentData.revenueGoal)}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Parâmetros atuais</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Ticket médio:</span>
                        <span className="font-medium">{formatCurrency(currentData.averageTicket)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversão Lead → Fechamento:</span>
                        <span className="font-medium">{currentData.conversionRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tempo médio de conversão:</span>
                        <span className="font-medium">{currentData.cycleTime} dias</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">O que você precisa</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Fechamentos:</span>
                        <span className="font-medium">{currentData.closingsNeeded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Propostas:</span>
                        <span className="font-medium">{currentData.proposalsNeeded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reuniões:</span>
                        <span className="font-medium">{currentData.meetingsNeeded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Leads ativos:</span>
                        <span className="font-medium">{currentData.leadsNeeded}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Experimente diferentes cenários</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-2">E se o ticket médio subir 20%?</h4>
                    <div className="text-sm space-y-1">
                      <p>Ticket: <span className="font-medium">{formatCurrency(originalData.averageTicket * 1.2)}</span></p>
                      <p>Fechamentos necessários: <span className="font-medium">{Math.ceil(originalData.revenueGoal / (originalData.averageTicket * 1.2))}</span></p>
                      <p><span className="text-green-600 font-medium">-16% de esforço</span></p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-2 text-xs"
                      onClick={() => applyScenario('ticketIncrease')}
                      disabled={appliedScenario?.id === 'ticket-20'}
                    >
                      📊 Ver impacto na meta
                    </Button>
                  </div>
                  
                  <div className="border p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-2">E se a conversão aumentar 30%?</h4>
                    <div className="text-sm space-y-1">
                      <p>Taxa: <span className="font-medium">{(originalData.conversionRate * 1.3).toFixed(1)}%</span></p>
                      <p>Leads necessários: <span className="font-medium">{Math.ceil(originalData.closingsNeeded / ((originalData.conversionRate * 1.3) / 100))}</span></p>
                      <p><span className="text-green-600 font-medium">-30% de prospecção</span></p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-2 text-xs"
                      onClick={() => applyScenario('conversionIncrease')}
                      disabled={appliedScenario?.id === 'conversion-30'}
                    >
                      🧪 Testar esse cenário
                    </Button>
                  </div>
                  
                  <div className="border p-3 rounded-md bg-blue-50">
                    <h4 className="text-sm font-medium mb-2">Simule seu cenário ideal</h4>
                    <div className="text-sm mb-3">
                      <p>Configure parâmetros personalizados para simular diferentes situações de mercado.</p>
                    </div>
                    <ScenarioSimulatorModal />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceAIDashboard;
