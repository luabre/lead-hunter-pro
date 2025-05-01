
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import CompanyCard from "@/components/search/CompanyCard";
import CompanyDetails from "@/components/company/CompanyDetails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddCompanyDialog from "@/components/company/AddCompanyDialog";

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
    companyType: "LTDA",
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
    companyType: "EIRELI",
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
    companyType: "S.A.",
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
    companyType: "LTDA",
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
    companyType: "S.A.",
  },
  {
    id: "6",
    name: "Varejo Digital Ltda",
    fantasyName: "DigShop",
    cnpj: "67.890.123/0001-45",
    city: "Brasília",
    state: "DF",
    segment: "E-commerce",
    employees: "50-100",
    opportunity: "hot" as const,
    companyType: "LTDA",
  },
  {
    id: "7",
    name: "Consultoria Financeira S.A.",
    fantasyName: "FinCon",
    cnpj: "78.901.234/0001-56",
    city: "Florianópolis",
    state: "SC",
    segment: "Finanças",
    employees: "20-50",
    opportunity: "cold" as const,
    companyType: "S.A.",
  },
  {
    id: "8",
    name: "Educação Online Eireli",
    fantasyName: "EduOn",
    cnpj: "89.012.345/0001-67",
    city: "Salvador",
    state: "BA",
    segment: "Educação",
    employees: "20-50",
    opportunity: "warm" as const,
    aiDetected: true,
    companyType: "EIRELI",
  },
];

const Companies = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [oppFilter, setOppFilter] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState<typeof mockCompanies[0] | null>(null);
  const [companies, setCompanies] = useState(mockCompanies);

  const handleCompanyClick = (company: typeof mockCompanies[0]) => {
    setSelectedCompany(company);
  };

  const handleCloseDetails = () => {
    setSelectedCompany(null);
  };

  const handleAddCompany = (newCompany: typeof mockCompanies[0]) => {
    setCompanies(prevCompanies => [newCompany, ...prevCompanies]);
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.fantasyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.segment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.state.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesOpportunity =
      oppFilter === "all" ||
      (oppFilter === "hot" && company.opportunity === "hot") ||
      (oppFilter === "warm" && company.opportunity === "warm") ||
      (oppFilter === "cold" && company.opportunity === "cold");

    return matchesSearch && matchesOpportunity;
  });

  // Sort companies based on the selected sort option
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortOption === "name") {
      return a.fantasyName.localeCompare(b.fantasyName);
    } else if (sortOption === "opportunity") {
      const opportunityRank = {
        hot: 3,
        warm: 2,
        cold: 1,
        undefined: 0,
      };
      return (
        (opportunityRank[b.opportunity || "undefined"] || 0) -
        (opportunityRank[a.opportunity || "undefined"] || 0)
      );
    } else {
      return a.state.localeCompare(b.state);
    }
  });

  // Group companies by opportunity type for Kanban view
  const hotCompanies = sortedCompanies.filter(company => company.opportunity === "hot");
  const warmCompanies = sortedCompanies.filter(company => company.opportunity === "warm");
  const coldCompanies = sortedCompanies.filter(company => company.opportunity === "cold");
  const unclassifiedCompanies = sortedCompanies.filter(company => !company.opportunity);

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Empresas</h1>
          <p className="text-muted-foreground">
            Gerencie e analise todas as empresas mapeadas
          </p>
        </div>
        <div className="flex gap-3">
          <AddCompanyDialog onAddCompany={handleAddCompany} />
          <Button onClick={() => navigate("/")}>
            Nova Busca
          </Button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      {!selectedCompany && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, segmento, cidade..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={oppFilter} onValueChange={setOppFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Oportunidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filtrar por oportunidade</SelectLabel>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="hot">Quentes</SelectItem>
                <SelectItem value="warm">Mornas</SelectItem>
                <SelectItem value="cold">Frias</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Ordenar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
                <DropdownMenuRadioItem value="name">Nome</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="opportunity">Oportunidade</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="location">Localização</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Companies Kanban View */}
      {!selectedCompany && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hot Companies Column */}
          <div className="kanban-column">
            <div className="bg-red-50 p-3 rounded-lg mb-4">
              <h2 className="font-semibold text-red-600 flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-600 mr-2"></span>
                Quente ({hotCompanies.length})
              </h2>
            </div>
            <div className="space-y-4">
              {hotCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onClick={() => handleCompanyClick(company)}
                  className="border border-red-100 hover:border-red-300 rounded-lg p-4 cursor-pointer transition-all"
                />
              ))}
              {hotCompanies.length === 0 && (
                <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg">
                  <p className="text-muted-foreground">Nenhuma empresa quente encontrada</p>
                </div>
              )}
            </div>
          </div>

          {/* Warm Companies Column */}
          <div className="kanban-column">
            <div className="bg-yellow-50 p-3 rounded-lg mb-4">
              <h2 className="font-semibold text-yellow-600 flex items-center">
                <span className="w-3 h-3 rounded-full bg-yellow-600 mr-2"></span>
                Morno ({warmCompanies.length})
              </h2>
            </div>
            <div className="space-y-4">
              {warmCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onClick={() => handleCompanyClick(company)}
                  className="border border-yellow-100 hover:border-yellow-300 rounded-lg p-4 cursor-pointer transition-all"
                />
              ))}
              {warmCompanies.length === 0 && (
                <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg">
                  <p className="text-muted-foreground">Nenhuma empresa morna encontrada</p>
                </div>
              )}
            </div>
          </div>

          {/* Cold Companies Column */}
          <div className="kanban-column">
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <h2 className="font-semibold text-blue-600 flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-600 mr-2"></span>
                Frio ({coldCompanies.length})
              </h2>
            </div>
            <div className="space-y-4">
              {coldCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onClick={() => handleCompanyClick(company)}
                  className="border border-blue-100 hover:border-blue-300 rounded-lg p-4 cursor-pointer transition-all"
                />
              ))}
              {coldCompanies.length === 0 && (
                <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg">
                  <p className="text-muted-foreground">Nenhuma empresa fria encontrada</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Show unclassified companies if there are any and we're not filtering */}
      {!selectedCompany && oppFilter === "all" && unclassifiedCompanies.length > 0 && (
        <div className="mt-8">
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <h2 className="font-semibold text-gray-600 flex items-center">
              <span className="w-3 h-3 rounded-full bg-gray-600 mr-2"></span>
              Não classificadas ({unclassifiedCompanies.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unclassifiedCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onClick={() => handleCompanyClick(company)}
                className="border border-gray-100 hover:border-gray-300 rounded-lg p-4 cursor-pointer transition-all"
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!selectedCompany && sortedCompanies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nenhuma empresa encontrada com os filtros atuais.
          </p>
        </div>
      )}

      {/* Company Details View */}
      {selectedCompany && (
        <CompanyDetails company={selectedCompany} onClose={handleCloseDetails} />
      )}
    </AppLayout>
  );
};

export default Companies;
