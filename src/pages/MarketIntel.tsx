
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, TrendingUp, BarChart3 } from "lucide-react";
import CompanyHeatMap from "@/components/search/CompanyHeatMap";
import BenchmarkModal from "@/components/market-intel/BenchmarkModal";
import OpportunityRadar from "@/components/market-intel/OpportunityRadar";
import PotentialScorecard from "@/components/market-intel/PotentialScorecard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useState } from "react";

// Mock Data
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

const marketTrendsData = [
  { year: "2020", tech: 850, health: 650, finance: 730, retail: 590, manufacturing: 480, education: 420 },
  { year: "2021", tech: 920, health: 710, finance: 690, retail: 540, manufacturing: 510, education: 445 },
  { year: "2022", tech: 1050, health: 780, finance: 750, retail: 610, manufacturing: 530, education: 438 },
  { year: "2023", tech: 1190, health: 840, finance: 820, retail: 670, manufacturing: 580, education: 421 },
  { year: "2024", tech: 1320, health: 910, finance: 870, retail: 720, manufacturing: 640, education: 415 },
];

const growthData = [
  { quarter: "Q1/23", growth: 2.8 },
  { quarter: "Q2/23", growth: 3.2 },
  { quarter: "Q3/23", growth: 2.5 },
  { quarter: "Q4/23", growth: 3.7 },
  { quarter: "Q1/24", growth: 4.1 },
  { quarter: "Q2/24", growth: 3.9 },
];

const segmentDistribution = [
  { segment: "Tecnologia", count: 1320, percentage: "25.8" },
  { segment: "Saúde", count: 910, percentage: "17.8" },
  { segment: "Finanças", count: 870, percentage: "17.0" },
  { segment: "Varejo", count: 720, percentage: "14.1" },
  { segment: "Manufatura", count: 640, percentage: "12.5" },
  { segment: "Educação", count: 415, percentage: "8.1" },
  { segment: "Outros", count: 245, percentage: "4.8" },
];

const MarketIntel = () => {
  const [selectedSegment, setSelectedSegment] = useState("education"); // Default para o segmento do usuário
  const [isBenchmarkOpen, setIsBenchmarkOpen] = useState(false);
  
  // Simular segmento do usuário logado
  const userSegment = "Educação";

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Inteligência de Mercado</h1>
          <p className="text-muted-foreground">
            Análises de tendências e crescimento de mercado
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={() => setIsBenchmarkOpen(true)}
            className="flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            📊 Comparar Segmentos
          </Button>
          <Select value={selectedSegment} onValueChange={setSelectedSegment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Segmento de mercado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os segmentos</SelectItem>
              <SelectItem value="education">Educação (Seu segmento)</SelectItem>
              <SelectItem value="tech">Tecnologia</SelectItem>
              <SelectItem value="health">Saúde</SelectItem>
              <SelectItem value="finance">Finanças</SelectItem>
              <SelectItem value="retail">Varejo</SelectItem>
              <SelectItem value="manufacturing">Manufatura</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Exportar relatório
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">Crescimento do mercado</CardTitle>
            <TrendingUp className="h-5 w-5 text-leadhunter-green" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.9%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Últimos 12 meses
            </p>
            <div className="h-[70px] mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <Line
                    type="monotone"
                    dataKey="growth"
                    stroke="#00BFA5"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">Segmento em alta</CardTitle>
            <TrendingUp className="h-5 w-5 text-leadhunter-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Tecnologia</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12.4% no último trimestre
            </p>
            <div className="flex items-center mt-3">
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-leadhunter-blue h-2 rounded-full" style={{ width: "76%" }}></div>
              </div>
              <span className="text-xs font-semibold ml-2">76%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">Oportunidades novas</CardTitle>
            <TrendingUp className="h-5 w-5 text-leadhunter-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">842</div>
            <p className="text-xs text-muted-foreground mt-1">
              +187 comparado ao mês anterior
            </p>
            <div className="flex items-center mt-3">
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-leadhunter-teal h-2 rounded-full" style={{ width: "64%" }}></div>
              </div>
              <span className="text-xs font-semibold ml-2">+28.5%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Novo bloco: Oportunidades para sua empresa */}
      <div className="mb-6">
        <OpportunityRadar userSegment={userSegment} />
      </div>

      {/* Novo bloco: Seu Potencial neste Cenário */}
      <div className="mb-6">
        <PotentialScorecard userSegment={userSegment} />
      </div>

      <Tabs defaultValue="growth" className="w-full mb-16">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="growth">Crescimento do Segmento</TabsTrigger>
          <TabsTrigger value="distribution">Distribuição</TabsTrigger>
          <TabsTrigger value="concentration">Concentração Geográfica</TabsTrigger>
        </TabsList>
        <TabsContent value="growth" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Crescimento por Segmento (2020-2024)</CardTitle>
              <CardDescription>Quantidade de empresas por segmento ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ChartContainer
                  config={{
                    tech: { label: "Tecnologia", color: "#1E88E5" },
                    health: { label: "Saúde", color: "#00BFA5" },
                    finance: { label: "Finanças", color: "#FFC107" },
                    retail: { label: "Varejo", color: "#FF5252" },
                    manufacturing: { label: "Manufatura", color: "#9C27B0" },
                    education: { label: "Educação", color: "#FF9800" }
                  }}
                >
                  <LineChart data={marketTrendsData} margin={{ top: 20, right: 30, left: 0, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltipContent
                              className="bg-background border-border shadow-md"
                              hideLabel={false}
                            />
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="tech" stroke="#1E88E5" strokeWidth={2} />
                    <Line type="monotone" dataKey="health" stroke="#00BFA5" strokeWidth={2} />
                    <Line type="monotone" dataKey="finance" stroke="#FFC107" strokeWidth={2} />
                    <Line type="monotone" dataKey="retail" stroke="#FF5252" strokeWidth={2} />
                    <Line type="monotone" dataKey="manufacturing" stroke="#9C27B0" strokeWidth={2} />
                    <Line type="monotone" dataKey="education" stroke="#FF9800" strokeWidth={2} />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distribution" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Segmento</CardTitle>
              <CardDescription>Percentual e quantidade de empresas por segmento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={segmentDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 30 }} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="segment" width={100} />
                    <Tooltip 
                      formatter={(value: number) => [`${value} empresas`, 'Quantidade']}
                      labelFormatter={(label) => `Segmento: ${label}`}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="#1E88E5" 
                      radius={[0, 4, 4, 0]}
                      label={{ 
                        position: 'right', 
                        formatter: (value: any, name: string, props: any) => {
                          if (props?.payload?.percentage) {
                            return `${props.payload.percentage}%`;
                          }
                          return '';
                        } 
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="concentration" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Concentração Geográfica</CardTitle>
              <CardDescription>Distribuição das empresas por estado</CardDescription>
            </CardHeader>
            <CardContent>
              <CompanyHeatMap 
                title="Mapa de Calor por Estado"
                description="Concentração de empresas por estado"
                states={heatMapStates}
                maxCount={Math.max(...heatMapStates.map(state => state.count))}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Insights de Mercado</CardTitle>
          <CardDescription>Oportunidades e tendências detectadas por IA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg flex gap-4">
              <div className="bg-leadhunter-blue bg-opacity-20 p-3 rounded-full h-fit">
                <TrendingUp className="h-6 w-6 text-leadhunter-blue" />
              </div>
              <div>
                <h3 className="font-semibold">Mercado em crescimento: Tecnologia</h3>
                <p className="text-sm text-muted-foreground my-2">
                  O setor de tecnologia teve um crescimento contínuo nos últimos 4 anos, apresentando um aumento de 55,3% 
                  no número de empresas desde 2020. Este crescimento supera significativamente outros setores.
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium">Confiança: 92%</span> 
                  <span className="text-muted-foreground">Baseado em dados de 1320 empresas</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg flex gap-4">
              <div className="bg-leadhunter-teal bg-opacity-20 p-3 rounded-full h-fit">
                <TrendingUp className="h-6 w-6 text-leadhunter-teal" />
              </div>
              <div>
                <h3 className="font-semibold">Região com maior potencial: Sudeste</h3>
                <p className="text-sm text-muted-foreground my-2">
                  A região Sudeste concentra 55,7% das empresas analisadas, com São Paulo liderando com 1245 empresas. 
                  O crescimento nesta região foi 28% maior que a média nacional.
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium">Confiança: 87%</span> 
                  <span className="text-muted-foreground">Baseado em dados regionais dos últimos 24 meses</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg flex gap-4">
              <div className="bg-leadhunter-blue bg-opacity-20 p-3 rounded-full h-fit">
                <TrendingUp className="h-6 w-6 text-leadhunter-blue" />
              </div>
              <div>
                <h3 className="font-semibold">Segmento emergente: Saúde Digital</h3>
                <p className="text-sm text-muted-foreground my-2">
                  A intersecção entre saúde e tecnologia mostra um crescimento acelerado de 40% no último ano, 
                  com taxas de conversão 22% maiores que a média do mercado.
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium">Confiança: 83%</span> 
                  <span className="text-muted-foreground">Baseado em análise de nicho de 410 empresas</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <BenchmarkModal 
        isOpen={isBenchmarkOpen}
        onClose={() => setIsBenchmarkOpen(false)}
      />
    </AppLayout>
  );
};

export default MarketIntel;
