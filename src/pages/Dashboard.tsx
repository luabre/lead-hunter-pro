import AppLayout from "@/components/layout/AppLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import MarketChart from "@/components/dashboard/MarketChart";
import BusinessTypeChart from "@/components/dashboard/BusinessTypeChart";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBar, FileText, TrendingUp, Users, Database, MessageSquare, ChevronRight, FileDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { exportAsCSV } from "@/utils/exportUtils";
import { toast } from "sonner";

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

// Mocked recent companies data
const recentCompanies = [
  {
    id: "6",
    name: "Varejo Digital Ltda",
    fantasyName: "DigShop",
    cnpj: "67.890.123/0001-45",
    city: "Brasília",
    state: "DF",
    segment: "E-commerce",
    opportunity: "hot" as const,
    creator: {
      name: "Pedro Santos",
      email: "pedro.sdr@empresa.com",
      origin: "manual",
      createdAt: "2025-04-30T08:45:00Z",
    }
  },
  {
    id: "2",
    name: "Logística Express Eireli",
    fantasyName: "LogEx",
    cnpj: "23.456.789/0001-01",
    city: "Rio de Janeiro",
    state: "RJ", 
    segment: "Logística",
    opportunity: "warm" as const,
    creator: {
      name: "João Silva",
      email: "joao.sdr@empresa.com",
      origin: "manual", 
      createdAt: "2025-04-29T14:30:00Z",
    }
  },
  {
    id: "8",
    name: "Educação Online Eireli",
    fantasyName: "EduOn", 
    cnpj: "89.012.345/0001-67",
    city: "Salvador",
    state: "BA",
    segment: "Educação",
    opportunity: "warm" as const,
    creator: {
      name: "Radar IA",
      email: "radar@ia.com",
      origin: "radar",
      createdAt: "2025-04-28T13:10:00Z",
    }
  },
  {
    id: "3",
    name: "Saúde & Bem-estar S.A.",
    fantasyName: "SaudeBem",
    cnpj: "34.567.890/0001-12",
    city: "Belo Horizonte",
    state: "MG",
    segment: "Saúde",
    opportunity: "cold" as const,
    creator: {
      name: "Maria Costa",
      email: "maria.sdr@empresa.com", 
      origin: "manual",
      createdAt: "2025-04-28T09:15:00Z",
    }
  },
  {
    id: "7",
    name: "Consultoria Financeira S.A.",
    fantasyName: "FinCon",
    cnpj: "78.901.234/0001-56",
    city: "Florianópolis", 
    state: "SC",
    segment: "Finanças",
    opportunity: "cold" as const, 
    creator: {
      name: "João Silva",
      email: "joao.sdr@empresa.com",
      origin: "manual",
      createdAt: "2025-04-25T15:30:00Z",
    }
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleNavigateToCompanies = () => {
    navigate('/companies');
  };

  const handleNavigateToHotOpportunities = () => {
    navigate('/companies', { state: { filter: 'hot' } });
  };

  const handleNavigateToContacts = () => {
    navigate('/contacts');
  };

  const handleNavigateToMeetings = () => {
    navigate('/meetings');
  };

  // Export recent companies function
  const handleExportRecentCompanies = () => {
    // Define headers for the CSV file
    const headers = {
      'id': 'ID',
      'fantasyName': 'Nome Fantasia',
      'name': 'Razão Social',
      'cnpj': 'CNPJ',
      'city': 'Cidade',
      'state': 'Estado',
      'segment': 'Segmento',
      'opportunity': 'Oportunidade',
      'creator.origin': 'Origem',
      'creator.name': 'Inserido por',
      'creator.email': 'Email do Responsável',
      'creator.createdAt': 'Data de Inserção'
    };

    // Format data for export
    const dataToExport = recentCompanies.map(company => {
      // Format opportunity values to Portuguese
      let opportunityValue = '';
      if (company.opportunity === 'hot') opportunityValue = 'Quente';
      else if (company.opportunity === 'warm') opportunityValue = 'Morna';
      else if (company.opportunity === 'cold') opportunityValue = 'Fria';
      
      // Clone company object for export
      const exportCompany = { 
        ...company,
        opportunity: opportunityValue
      };
      
      // Format date if it exists
      if (company.creator?.createdAt) {
        try {
          const date = new Date(company.creator.createdAt);
          exportCompany.creator = {
            ...company.creator,
            createdAt: format(date, 'dd/MM/yyyy HH:mm')
          };
        } catch (e) {
          console.error('Error formatting date', e);
        }
      }
      
      return exportCompany;
    });

    // Generate CSV and download
    const timestamp = format(new Date(), 'yyyy-MM-dd_HHmm');
    exportAsCSV(dataToExport, headers, `empresas_recentes_${timestamp}`);
    
    toast.success(`Relatório exportado com sucesso: ${dataToExport.length} empresas recentes`);
  };

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
          onClick={handleNavigateToCompanies}
          className="relative after:content-[''] after:absolute after:bottom-3 after:right-3 after:w-5 after:h-5 after:bg-muted-foreground/10 after:rounded-full after:flex after:items-center after:justify-center after:text-muted-foreground"
        >
          <ChevronRight className="absolute bottom-3 right-3 w-5 h-5 text-muted-foreground/70" />
        </StatsCard>
        <StatsCard 
          title="Oportunidades Quentes" 
          value="287" 
          description="Identificadas pela IA" 
          trend="up" 
          trendValue="+12% este mês" 
          icon={<TrendingUp className="h-8 w-8" />}
          onClick={handleNavigateToHotOpportunities}
          className="relative"
        >
          <ChevronRight className="absolute bottom-3 right-3 w-5 h-5 text-muted-foreground/70" />
        </StatsCard>
        <StatsCard 
          title="Decisores Mapeados" 
          value="3.842" 
          description="Com contatos validados" 
          icon={<Users className="h-8 w-8" />}
          onClick={handleNavigateToContacts}
          className="relative"
        >
          <ChevronRight className="absolute bottom-3 right-3 w-5 h-5 text-muted-foreground/70" />
        </StatsCard>
        <StatsCard 
          title="Mensagens Enviadas" 
          value="1.458" 
          description="Via IA SDR" 
          trend="up" 
          trendValue="+8.2% vs período anterior" 
          icon={<MessageSquare className="h-8 w-8" />}
          onClick={handleNavigateToMeetings}
          className="relative"
        >
          <ChevronRight className="absolute bottom-3 right-3 w-5 h-5 text-muted-foreground/70" />
        </StatsCard>
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

      {/* Recent Companies Table */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Empresas Recentemente Adicionadas</CardTitle>
          <Button variant="outline" size="sm" onClick={handleExportRecentCompanies}>
            <FileDown className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Segmento</TableHead>
                  <TableHead>Oportunidade</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Inserido por</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCompanies.map((company) => (
                  <TableRow 
                    key={company.id}
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => navigate(`/companies?id=${company.id}`)}
                  >
                    <TableCell className="font-medium">{company.fantasyName}</TableCell>
                    <TableCell>{company.segment}</TableCell>
                    <TableCell>
                      {company.opportunity === "hot" && <Badge className="bg-red-500">Quente</Badge>}
                      {company.opportunity === "warm" && <Badge className="bg-yellow-500">Morna</Badge>}
                      {company.opportunity === "cold" && <Badge className="bg-blue-500">Fria</Badge>}
                    </TableCell>
                    <TableCell>
                      {company.creator?.origin === "manual" ? (
                        <Badge variant="outline" className="border-green-500 text-green-700">Manual</Badge>
                      ) : (
                        <Badge variant="outline" className="border-blue-500 text-blue-700">Radar IA</Badge>
                      )}
                    </TableCell>
                    <TableCell>{company.creator?.name || "-"}</TableCell>
                    <TableCell>
                      {company.creator?.createdAt 
                        ? format(new Date(company.creator.createdAt), "dd/MM/yyyy") 
                        : "-"
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1"
            onClick={() => navigate('/companies')}
          >
            Ver todas as empresas
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

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
