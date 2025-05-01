
import AppLayout from "@/components/layout/AppLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import MarketChart from "@/components/dashboard/MarketChart";
import BusinessTypeChart from "@/components/dashboard/BusinessTypeChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBar, FileText, TrendingUp, Users, Database, MessageSquare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Mock Data
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

const trendsData = [
  { month: "Jan", leads: 245, meetings: 45, deals: 12 },
  { month: "Fev", leads: 285, meetings: 53, deals: 18 },
  { month: "Mar", leads: 320, meetings: 64, deals: 24 },
  { month: "Abr", leads: 375, meetings: 72, deals: 28 },
  { month: "Mai", leads: 410, meetings: 85, deals: 32 },
];

const opportunityData = [
  { name: "Quentes", value: 287, color: "#FF5252" },
  { name: "Mornas", value: 563, color: "#FFC107" },
  { name: "Frias", value: 824, color: "#1E88E5" },
];

const conversionData = [
  { stage: "Contato Enviado", conversion: 65 },
  { stage: "Qualificação", conversion: 42 },
  { stage: "Reunião", conversion: 28 },
  { stage: "Proposta", conversion: 15 },
  { stage: "Fechamento", conversion: 8 },
];

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Análises e inteligência de negócios
          </p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 3 meses</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Total de Empresas" 
          value="5.120" 
          description="No segmento selecionado" 
          icon={<Database className="h-8 w-8" />}
        />
        <StatsCard 
          title="Oportunidades Quentes" 
          value="287" 
          description="Identificadas pela IA" 
          trend="up" 
          trendValue="+12% este mês" 
          icon={<TrendingUp className="h-8 w-8" />}
        />
        <StatsCard 
          title="Decisores Mapeados" 
          value="3.842" 
          description="Com contatos validados" 
          icon={<Users className="h-8 w-8" />}
        />
        <StatsCard 
          title="Mensagens Enviadas" 
          value="1.458" 
          description="Via IA SDR" 
          trend="up" 
          trendValue="+8.2% vs período anterior" 
          icon={<MessageSquare className="h-8 w-8" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Tendências de Prospecção</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#1E88E5" strokeWidth={2} />
                <Line type="monotone" dataKey="meetings" stroke="#00BFA5" strokeWidth={2} />
                <Line type="monotone" dataKey="deals" stroke="#FFC107" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Oportunidades</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={opportunityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {opportunityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value} leads`, 'Quantidade']}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Conversão por Etapa</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={conversionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="stage" width={100} />
                <Tooltip formatter={(value) => [`${value}%`, 'Taxa de Conversão']} />
                <Bar 
                  dataKey="conversion" 
                  fill="#00BFA5" 
                  radius={[0, 4, 4, 0]}
                  label={{ position: 'right', formatter: (value: number) => `${value}%` }}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <BusinessTypeChart title="Tipos de Empresa" data={businessTypeData} />
      </div>

      <MarketChart 
        title="Distribuição por Estado"
        description="Total de empresas por estado"
        data={stateData}
        color="#1E88E5"
      />
    </AppLayout>
  );
};

export default Dashboard;
