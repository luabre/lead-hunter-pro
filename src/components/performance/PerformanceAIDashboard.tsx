
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Calendar as CalendarIcon, Users as UsersIcon, TrendingUp, AlertTriangle, CheckCircle, Lightbulb, ArrowRight } from 'lucide-react';

// Mock data for charts
const statusData = {
  value: 71,
  target: 100,
  status: "onTrack", // "onTrack", "atRisk", "critical"
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

const simulatorData = {
  currentMetrics: {
    ticketAvg: 10000,
    conversionRate: {
      leadToMeeting: 20,
      meetingToProposal: 60,
      proposalToClose: 40,
      leadToClose: 4.8
    },
    cycleTime: 21,
    target: 1000000
  },
  projections: {
    closings: 100,
    proposals: 250,
    meetings: 416,
    leadsNeeded: 1000
  }
};

// Status indicator component
const StatusIndicator = ({ status }: { status: "onTrack" | "atRisk" | "critical" }) => {
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
  
  return (
    <div className="space-y-6">
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
                <CardTitle className="text-xl">Meta Mensal: R$100.000</CardTitle>
                <StatusIndicator status={statusData.status} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso atual: {statusData.value}%</span>
                    <span className="text-muted-foreground">Meta: 100%</span>
                  </div>
                  <Progress value={statusData.value} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>R$ {(statusData.value / 100 * 100000).toLocaleString()}</span>
                    <span>R$ 100.000</span>
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
                        {statusData.value}%
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
                  Para alcançar sua meta de R$100K faltando 18 dias, a IA sugere as seguintes ações:
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
                <h3 className="font-medium mb-3">Meta de Faturamento: R$ {simulatorData.currentMetrics.target.toLocaleString()}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Parâmetros atuais</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Ticket médio:</span>
                        <span className="font-medium">R$ {simulatorData.currentMetrics.ticketAvg.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversão Lead → Fechamento:</span>
                        <span className="font-medium">{simulatorData.currentMetrics.conversionRate.leadToClose}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tempo médio de conversão:</span>
                        <span className="font-medium">{simulatorData.currentMetrics.cycleTime} dias</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">O que você precisa</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Fechamentos:</span>
                        <span className="font-medium">{simulatorData.projections.closings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Propostas:</span>
                        <span className="font-medium">{simulatorData.projections.proposals}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reuniões:</span>
                        <span className="font-medium">{simulatorData.projections.meetings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Leads ativos:</span>
                        <span className="font-medium">{simulatorData.projections.leadsNeeded}</span>
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
                      <p>Ticket: <span className="font-medium">R$ 12.000</span></p>
                      <p>Fechamentos necessários: <span className="font-medium">84</span></p>
                      <p><span className="text-green-600 font-medium">-16% de esforço</span></p>
                    </div>
                    <Button variant="outline" className="w-full mt-2 text-xs">
                      Aplicar cenário
                    </Button>
                  </div>
                  
                  <div className="border p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-2">E se a conversão aumentar 30%?</h4>
                    <div className="text-sm space-y-1">
                      <p>Taxa: <span className="font-medium">6.24%</span></p>
                      <p>Leads necessários: <span className="font-medium">700</span></p>
                      <p><span className="text-green-600 font-medium">-30% de prospecção</span></p>
                    </div>
                    <Button variant="outline" className="w-full mt-2 text-xs">
                      Aplicar cenário
                    </Button>
                  </div>
                  
                  <div className="border p-3 rounded-md bg-blue-50">
                    <h4 className="text-sm font-medium mb-2">Personalize seu cenário</h4>
                    <div className="text-sm">
                      <p>Configure parâmetros personalizados para simular diferentes situações de mercado.</p>
                    </div>
                    <Button className="w-full mt-2 text-xs">
                      Personalizar
                    </Button>
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
