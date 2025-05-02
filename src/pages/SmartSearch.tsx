
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import CompanySearch from "@/components/search/CompanySearch";
import CompanyCard from "@/components/search/CompanyCard";
import CompanyDetails from "@/components/company/CompanyDetails";
import { CompanyFilters } from "@/components/search/CompanySearch";
import AiAgentCard from "@/components/ai/AiAgentCard";
import BusinessTypeChart from "@/components/dashboard/BusinessTypeChart";
import MarketChart from "@/components/dashboard/MarketChart";
import CompanyHeatMap from "@/components/search/CompanyHeatMap";
import { Database, Users, TrendingUp, Search, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import StatsCard from "@/components/dashboard/StatsCard";

// Mock Data - using the same data as in Index.tsx
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

const SmartSearch = () => {
  const navigate = useNavigate();
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof mockCompanies>([]);
  const [selectedCompany, setSelectedCompany] = useState<typeof mockCompanies[0] | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "opportunity" | "state">("name");
  const [filterText, setFilterText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (filters: CompanyFilters) => {
    if (!filters.segment) {
      toast({
        title: "Por favor, informe um segmento",
        description: "O segmento é obrigatório para a busca.",
        variant: "destructive",
      });
      return;
    }

    // Show loading state
    setIsSearching(true);

    // Simulate API call with delay
    setTimeout(() => {
      setIsSearching(false);
      
      // Apply any text filtering from filters
      let filtered = [...mockCompanies];
      if (filters.segment) {
        setFilterText(filters.segment);
        // Simple filtering - in a real app this would be done server-side with AI
        filtered = filtered.filter(company => 
          company.segment.toLowerCase().includes(filters.segment.toLowerCase())
        );
      }
      
      // Sort the results based on current sort parameter
      const sortedResults = sortResults([...filtered], sortBy);
      
      setSearchResults(sortedResults);
      setSearchPerformed(true);
      toast({
        title: "Busca IA realizada com sucesso",
        description: `Nossa IA encontrou ${sortedResults.length} empresas no segmento de ${filters.segment}.`,
      });
    }, 1500);
  };

  const sortResults = (companies: typeof mockCompanies, sortField: string) => {
    return [...companies].sort((a, b) => {
      switch (sortField) {
        case "name":
          return a.fantasyName.localeCompare(b.fantasyName);
        case "opportunity":
          // Convert opportunity to numeric value for sorting
          const opportunityValue = {
            hot: 3,
            warm: 2,
            cold: 1,
            undefined: 0
          };
          const aValue = a.opportunity ? opportunityValue[a.opportunity] : 0;
          const bValue = b.opportunity ? opportunityValue[b.opportunity] : 0;
          return bValue - aValue; // Descending order (hot first)
        case "state":
          return a.state.localeCompare(b.state);
        default:
          return 0;
      }
    });
  };

  const handleSortChange = (newSortBy: "name" | "opportunity" | "state") => {
    setSortBy(newSortBy);
    // Re-sort the existing results
    const sortedResults = sortResults([...searchResults], newSortBy);
    setSearchResults(sortedResults);
  };

  const handleCompanyClick = (company: typeof mockCompanies[0]) => {
    setSelectedCompany(company);
  };

  const handleCloseDetails = () => {
    setSelectedCompany(null);
  };

  // Filter results by current filterText
  const filteredResults = searchResults.filter(company => 
    filterText ? 
    company.fantasyName.toLowerCase().includes(filterText.toLowerCase()) || 
    company.segment.toLowerCase().includes(filterText.toLowerCase()) ||
    company.state.toLowerCase().includes(filterText.toLowerCase())
    : true
  );

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">Descoberta de Empresas com IA</h1>
            <Sparkles className="h-6 w-6 text-amber-500" />
          </div>
          <p className="text-muted-foreground text-lg">
            Digite apenas o segmento e nossa IA encontrará empresas do mercado para você
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="mb-8">
        <CompanySearch onSearch={handleSearch} />
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="text-center py-12 animate-pulse">
          <Sparkles className="mx-auto h-12 w-12 mb-4 text-amber-500" />
          <p className="text-lg font-medium">Nossa IA está buscando empresas no mercado...</p>
          <p className="text-muted-foreground mt-2">Isso pode levar alguns segundos</p>
        </div>
      )}

      {/* Search Results */}
      {searchPerformed && !isSearching && selectedCompany === null && (
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

          {/* Companies List with Sorting Controls */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Empresas Encontradas ({filteredResults.length})
              </h2>
              <div className="flex gap-2">
                <button 
                  className={`px-3 py-1 text-sm border rounded-md ${sortBy === 'name' ? 'bg-primary text-white' : 'border-gray-300'}`}
                  onClick={() => handleSortChange("name")}
                >
                  Nome
                </button>
                <button 
                  className={`px-3 py-1 text-sm border rounded-md ${sortBy === 'opportunity' ? 'bg-primary text-white' : 'border-gray-300'}`}
                  onClick={() => handleSortChange("opportunity")}
                >
                  Oportunidade
                </button>
                <button 
                  className={`px-3 py-1 text-sm border rounded-md ${sortBy === 'state' ? 'bg-primary text-white' : 'border-gray-300'}`}
                  onClick={() => handleSortChange("state")}
                >
                  Estado
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {filteredResults.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onClick={() => handleCompanyClick(company)}
                />
              ))}
              {filteredResults.length === 0 && (
                <div className="text-center p-6 border border-dashed rounded-lg">
                  <p className="text-muted-foreground">
                    Nenhuma empresa encontrada com os filtros atuais.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* AI Agents */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Assistentes de IA</h2>
            <div className="space-y-4">
              <AiAgentCard type="search" onClick={() => {}} />
              <AiAgentCard type="sdr" onClick={() => navigate("/ia-sdr")} />
              <AiAgentCard type="closer" onClick={() => navigate("/ia-closer")} />
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
      {searchPerformed && !isSearching && selectedCompany === null && (
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
      {!searchPerformed && !isSearching && !selectedCompany && (
        <div className="text-center py-12">
          <div className="flex justify-center mb-8">
            <AiAgentCard type="search" onClick={() => {
              // Scroll to search input
              const searchInput = document.querySelector('#segment') as HTMLElement;
              if (searchInput) {
                searchInput.focus();
                searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }} />
          </div>
          <p className="text-lg text-muted-foreground mt-6">
            Informe um segmento para que nossa IA descubra empresas do mercado para você
          </p>
        </div>
      )}
    </AppLayout>
  );
};

export default SmartSearch;
