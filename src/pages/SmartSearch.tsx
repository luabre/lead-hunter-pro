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
import { enrichCompanyWithGPT } from "@/utils/companyEnrichment";
import { supabase } from "@/integrations/supabase/client";

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

// Sample company names map - updated to be more specific by segment
const segmentCompanyMap: Record<string, string[]> = {
  "tecnologia": [
    "TechSolutions Brasil", 
    "InnovaTech Sistemas", 
    "ByteCode Tecnologia", 
    "DataTech Informática", 
    "CyberSoft Brasil"
  ],
  "saúde": [
    "MedVida Clínicas", 
    "SaúdeTech Brasil", 
    "ViverBem Hospitalar", 
    "MedCenter Diagnósticos", 
    "CliniCare Saúde"
  ],
  "alimentação": [
    "NutriFood Alimentos", 
    "SaborBrasil Indústria", 
    "AlimentoBem Distribuidora", 
    "NaturalTaste Orgânicos", 
    "DeliFood Processados"
  ],
  "logística": [
    "TransporteBrasil Logística", 
    "ExpressCargo Entregas", 
    "LogiTech Transportadora", 
    "MoveCargo Brasil", 
    "FreteFácil Logística"
  ],
  "construção": [
    "ConstruBrasil Engenharia", 
    "EdificarTech Construtora", 
    "ObraPrima Incorporadora", 
    "EstruturaFirme Construções", 
    "EngeCivil Projetos"
  ],
  "educação": [
    "EduTech Brasil", 
    "LearnWay Cursos", 
    "SaberMais Educação", 
    "ConhecerJá Instituto", 
    "AprendizTech Ensino"
  ],
  "varejo": [
    "MegaShop Comércio", 
    "CompraTudo Varejo", 
    "LojaBrasil Rede", 
    "MercadoFácil Comércio", 
    "VendaMais Distribuição"
  ],
  "finanças": [
    "FinanceTech Brasil", 
    "InvestBrasil Corretora", 
    "CapitalSmart Investimentos", 
    "CreditoBrasil Financeira", 
    "MoneyWise Consultoria"
  ],
  "agronegócio": [
    "AgroBrasil Commodities",
    "RuralTech Insumos",
    "CampoForte Agropecuária",
    "TerraFértil Agricultura",
    "AgricolaVerde Produção"
  ],
  "imobiliário": [
    "ImóveisPrime Incorporação",
    "LarIdeal Imobiliária",
    "MoraBem Empreendimentos",
    "CasaNova Negócios",
    "TerraCerta Administração"
  ]
};

// Enhanced function to get segment-specific company names
const getSegmentCompanies = (segment: string): string[] => {
  // Normalize the segment for matching (lowercase, remove accents)
  const normalizedSegment = segment.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Try to find an exact match first
  for (const key in segmentCompanyMap) {
    if (key === normalizedSegment) {
      return segmentCompanyMap[key];
    }
  }
  
  // If no exact match, try partial match with keywords
  for (const key in segmentCompanyMap) {
    if (normalizedSegment.includes(key) || key.includes(normalizedSegment)) {
      return segmentCompanyMap[key];
    }
  }
  
  // If no match at all, generate segment-specific company names
  const segmentPrefix = segment.split(' ')[0];
  const suffixes = ["Brasil", "Tech", "Soluções", "Serviços", "Group"];
  const types = ["Ltda", "S.A.", "Empresarial", "Corporativo", "Nacional"];
  
  // Generate 5 companies with the segment name incorporated
  return Array(5).fill(0).map((_, i) => {
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    return `${segmentPrefix} ${suffix} ${type}`;
  });
};

// Generate Brazilian states
const brazilianStates = [
  "SP", "RJ", "MG", "PR", "RS", "SC", "BA", "ES", "GO", "PE"
];

// Generate random employee count
const employeeRanges = [
  "1-10", "11-50", "51-100", "101-200", "201-500", "500+"
];

const SmartSearch = () => {
  const navigate = useNavigate();
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof mockCompanies>([]);
  const [selectedCompany, setSelectedCompany] = useState<typeof mockCompanies[0] | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "opportunity" | "state">("name");
  const [filterText, setFilterText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const checkAuthStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setAuthError("Você precisa estar autenticado para usar esta funcionalidade.");
      return false;
    }
    return true;
  };

  const handleSearch = async (filters: CompanyFilters) => {
    if (!filters.segment) {
      toast({
        title: "Por favor, informe um segmento",
        description: "O segmento é obrigatório para a busca.",
        variant: "destructive",
      });
      return;
    }

    // Check authentication status before proceeding
    const isAuthenticated = await checkAuthStatus();
    if (!isAuthenticated) {
      toast({
        title: "Autenticação necessária",
        description: "Você precisa estar logado para realizar buscas.",
        variant: "destructive",
      });
      return;
    }

    // Show loading state
    setIsSearching(true);
    setAuthError(null);

    try {
      console.log("Starting search with segment:", filters.segment);
      
      // Get segment-specific company names
      const segmentCompanies = getSegmentCompanies(filters.segment);
      const generatedCompanies = [];
      
      // Generate companies based on the segment with enriched data
      for (let i = 0; i < segmentCompanies.length; i++) {
        const companyName = segmentCompanies[i];
        const randomState = brazilianStates[Math.floor(Math.random() * brazilianStates.length)];
        const randomCity = randomState === "SP" ? "São Paulo" : 
                          randomState === "RJ" ? "Rio de Janeiro" : 
                          randomState === "MG" ? "Belo Horizonte" : "Cidade Principal";
        
        // Generate CNPJ
        const cnpj = `${Math.floor(10 + Math.random() * 90)}.${Math.floor(100 + Math.random() * 900)}.${Math.floor(100 + Math.random() * 900)}/0001-${Math.floor(10 + Math.random() * 90)}`;
        
        // Opportunity level
        const opportunities = ["hot", "warm", "cold"];
        const opportunity = opportunities[Math.floor(Math.random() * opportunities.length)] as "hot" | "warm" | "cold";
        
        // AI detected for some companies
        const aiDetected = Math.random() > 0.6;
        
        // Enrich company data using GPT with explicit segment parameter
        let enrichedData = null;
        try {
          console.log(`Enriching company data for: ${companyName} (${filters.segment})`);
          enrichedData = await enrichCompanyWithGPT(companyName, randomCity, filters.segment);
          console.log("Enriched data for", companyName, enrichedData);

          // Use enriched data for employee count if available, otherwise use random
          const employeeCount = enrichedData?.employees || employeeRanges[Math.floor(Math.random() * employeeRanges.length)];
          
          // Generate company object with enriched data
          generatedCompanies.push({
            id: `gen-${i + 1}`,
            name: companyName,
            fantasyName: companyName.split(" ")[0],
            cnpj,
            city: randomCity,
            state: randomState,
            segment: filters.segment,
            employees: employeeCount,
            opportunity,
            aiDetected,
            website: enrichedData?.website,
            digitalPresence: enrichedData?.digitalPresence,
            revenue: enrichedData?.revenue,
            sector: enrichedData?.sector,
            subSector: enrichedData?.subSector,
            decisionMakerName: enrichedData?.decisionMaker?.name,
            decisionMakerPosition: enrichedData?.decisionMaker?.position,
            companyType: enrichedData?.companyType,
            opportunitySignals: enrichedData?.opportunitySignals,
            recommendedChannels: enrichedData?.recommendedChannels,
            yearFounded: Math.floor(1990 + Math.random() * 30).toString(), // Random year between 1990-2020
            creator: {
              name: "IA LeadHunter",
              email: "ia@leadhunter.ai",
              origin: "radar",
              createdAt: new Date().toISOString(),
            }
          });
        } catch (error) {
          console.error("Failed to enrich company data:", error);
          // Skip adding this company or add with minimal data
        }
      }
      
      // Apply any text filtering from filters
      setFilterText(filters.segment);
      
      // Sort the results based on current sort parameter
      const sortedResults = sortResults([...generatedCompanies], sortBy);
      
      // Update state with the generated companies
      setSearchResults(sortedResults);
      setSearchPerformed(true);
      toast({
        title: "Busca IA realizada com sucesso",
        description: `Nossa IA encontrou ${sortedResults.length} empresas no segmento de ${filters.segment}.`,
      });
    } catch (error) {
      console.error("Error during AI search:", error);
      toast({
        title: "Erro na busca",
        description: "Ocorreu um erro ao processar sua busca. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
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

      {/* Authentication Error */}
      {authError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          <p>{authError}</p>
          <Button 
            variant="link" 
            className="p-0 text-red-700 underline" 
            onClick={() => navigate('/login')}
          >
            Fazer login
          </Button>
        </div>
      )}

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
        <CompanyDetails 
          company={selectedCompany} 
          onClose={handleCloseDetails}
          isFromAiSearch={true} 
        />
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
