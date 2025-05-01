
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import CompanySearch from "@/components/search/CompanySearch";
import CompanyCard from "@/components/search/CompanyCard";
import MarketChart from "@/components/dashboard/MarketChart";
import BusinessTypeChart from "@/components/dashboard/BusinessTypeChart";
import CompanyHeatMap from "@/components/search/CompanyHeatMap";
import CompanyDetails from "@/components/company/CompanyDetails";
import AiAgentCard from "@/components/ai/AiAgentCard";
import { Database, Search, Users, TrendingUp } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { CompanyFilters } from "@/components/search/CompanySearch";

// Mock Data
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

const Index = () => {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof mockCompanies>([]);
  const [selectedCompany, setSelectedCompany] = useState<typeof mockCompanies[0] | null>(null);

  const handleSearch = (filters: CompanyFilters) => {
    if (!filters.segment) {
      toast({
        title: "Por favor, informe um segmento",
        description: "O segmento é obrigatório para a busca.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call with delay
    setTimeout(() => {
      setSearchResults(mockCompanies);
      setSearchPerformed(true);
      toast({
        title: "Busca realizada com sucesso",
        description: `Encontramos ${mockCompanies.length} empresas no segmento de ${filters.segment}.`,
      });
    }, 500);
  };

  const handleCompanyClick = (company: typeof mockCompanies[0]) => {
    setSelectedCompany(company);
  };

  const handleCloseDetails = () => {
    setSelectedCompany(null);
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Busca Inteligente</h1>
          <p className="text-muted-foreground">
            Encontre e analise empresas com potencial para seu negócio
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Search Section */}
        <div className="grid gap-6">
          <CompanySearch onSearch={handleSearch} />

          {searchPerformed && selectedCompany === null && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Stats Cards */}
              <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  title="Conversão Média" 
                  value="4.8%" 
                  description="De abordagem para reunião" 
                  trend="up" 
                  trendValue="+0.5% vs período anterior" 
                  icon={<Search className="h-8 w-8" />}
                />
              </div>

              {/* Companies List */}
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">
                  Empresas Encontradas ({searchResults.length})
                </h2>
                <div className="space-y-4">
                  {searchResults.map((company) => (
                    <CompanyCard
                      key={company.id}
                      company={company}
                      onClick={() => handleCompanyClick(company)}
                    />
                  ))}
                </div>
              </div>

              {/* AI Agents */}
              <div className="col-span-1 md:col-span-1">
                <h2 className="text-xl font-semibold mb-4">Assistentes de IA</h2>
                <div className="space-y-4">
                  <AiAgentCard type="sdr" />
                  <AiAgentCard type="closer" />
                </div>
              </div>

              {/* Market Distribution Chart */}
              <div className="col-span-1 md:col-span-1">
                <BusinessTypeChart 
                  title="Tipos de Empresa"
                  data={businessTypeData}
                />
              </div>
            </div>
          )}

          {/* Search visualization section */}
          {searchPerformed && selectedCompany === null && (
            <div className="grid grid-cols-1 gap-6">
              <MarketChart 
                title="Distribuição por Estado"
                description="Total de empresas por estado"
                data={stateData}
              />
              
              <CompanyHeatMap 
                title="Mapa de Calor por Estado"
                description="Concentração de empresas do segmento por estado"
                states={heatMapStates}
                maxCount={Math.max(...heatMapStates.map(state => state.count))}
              />
            </div>
          )}

          {/* Company Details View */}
          {selectedCompany && (
            <CompanyDetails company={selectedCompany} onClose={handleCloseDetails} />
          )}

          {/* Initial state - no search performed yet */}
          {!searchPerformed && !selectedCompany && (
            <div className="bg-muted/40 rounded-lg p-8 mt-6 text-center">
              <h2 className="text-2xl font-semibold mb-4">Bem-vindo ao LeadHunter Pro</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Inicie sua busca informando um segmento de mercado. 
                Nossa IA irá mapear empresas, decisores e oportunidades para seu negócio.
              </p>
              <div className="mt-4 flex justify-center">
                <img 
                  src="/placeholder.svg" 
                  alt="Ilustração" 
                  className="w-64 h-64 opacity-50"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
