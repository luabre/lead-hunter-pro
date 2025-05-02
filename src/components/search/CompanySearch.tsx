
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CompanySearchProps {
  onSearch: (filters: CompanyFilters) => void;
}

export interface CompanyFilters {
  searchTerm: string; // Unified search term for segment, company name, and keywords
  state?: string;
  size?: string;
  revenue?: string;
  employees?: string;
  type?: string;
  yearsInBusiness?: string;
  sortBy?: 'name' | 'opportunity' | 'state';
}

const brazilianStates = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", 
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const CompanySearch = ({ onSearch }: CompanySearchProps) => {
  const [filters, setFilters] = useState<CompanyFilters>({
    searchTerm: "",
    sortBy: "name", // Default sort by name
  });
  
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  
  const handleInputChange = (field: keyof CompanyFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const handleSearchClick = () => {
    onSearch(filters);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Descoberta de Empresas com IA</CardTitle>
          <Sparkles className="text-amber-500 h-5 w-5" />
        </div>
        <CardDescription>
          Digite segmento, nome da empresa ou palavras-chave para que nossa IA encontre empresas no mercado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="searchTerm">Busca</Label>
              <div className="flex gap-2">
                <Input
                  id="searchTerm"
                  placeholder="Ex: Tecnologia, TechSol, inovação..."
                  className="flex-1"
                  value={filters.searchTerm}
                  onChange={(e) => handleInputChange("searchTerm", e.target.value)}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="w-8 p-0">?</Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Digite segmento (ex: Tecnologia), nome da empresa (ex: TechSol), ou palavras-chave (ex: inovação, sustentável) para sua busca</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <Button onClick={handleSearchClick} className="w-full gap-1">
              <Search className="h-4 w-4 mr-1" />
              Descobrir Empresas
            </Button>
            
            <p className="text-sm text-muted-foreground mt-1">
              Nossa IA buscará empresas de acordo com os critérios acima e trará dados enriquecidos automaticamente.
            </p>
          </div>
          
          <div className="flex items-center">
            <Button 
              variant="link" 
              onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
              className="p-0 text-sm"
            >
              {isAdvancedSearch ? "Ocultar filtros avançados" : "Mostrar filtros avançados"}
            </Button>
          </div>
          
          {isAdvancedSearch && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="state">Estado</Label>
                <Select
                  onValueChange={(value) => handleInputChange("state", value)}
                  value={filters.state}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {brazilianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="size">Porte da Empresa</Label>
                <Select
                  onValueChange={(value) => handleInputChange("size", value)}
                  value={filters.size}
                >
                  <SelectTrigger id="size">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="small">Pequena</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="revenue">Faturamento Estimado</Label>
                <Select
                  onValueChange={(value) => handleInputChange("revenue", value)}
                  value={filters.revenue}
                >
                  <SelectTrigger id="revenue">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="up-to-1m">Até R$ 1 milhão</SelectItem>
                    <SelectItem value="1m-10m">R$ 1 - 10 milhões</SelectItem>
                    <SelectItem value="10m-50m">R$ 10 - 50 milhões</SelectItem>
                    <SelectItem value="above-50m">Acima de R$ 50 milhões</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="employees">Nº Funcionários</Label>
                <Select
                  onValueChange={(value) => handleInputChange("employees", value)}
                  value={filters.employees}
                >
                  <SelectTrigger id="employees">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="1-10">1 - 10</SelectItem>
                    <SelectItem value="11-50">11 - 50</SelectItem>
                    <SelectItem value="51-200">51 - 200</SelectItem>
                    <SelectItem value="201-500">201 - 500</SelectItem>
                    <SelectItem value="above-500">Acima de 500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo Jurídico</Label>
                <Select
                  onValueChange={(value) => handleInputChange("type", value)}
                  value={filters.type}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="mei">MEI</SelectItem>
                    <SelectItem value="ei">EI</SelectItem>
                    <SelectItem value="ltda">LTDA</SelectItem>
                    <SelectItem value="sa">S.A.</SelectItem>
                    <SelectItem value="eireli">EIRELI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="yearsInBusiness">Tempo de Mercado</Label>
                <Select
                  onValueChange={(value) => handleInputChange("yearsInBusiness", value)}
                  value={filters.yearsInBusiness}
                >
                  <SelectTrigger id="yearsInBusiness">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="0-1">Menos de 1 ano</SelectItem>
                    <SelectItem value="1-3">1 - 3 anos</SelectItem>
                    <SelectItem value="3-5">3 - 5 anos</SelectItem>
                    <SelectItem value="5-10">5 - 10 anos</SelectItem>
                    <SelectItem value="above-10">Mais de 10 anos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="sortBy">Ordenar por</Label>
                <Select
                  onValueChange={(value) => handleInputChange("sortBy", value as 'name' | 'opportunity' | 'state')}
                  value={filters.sortBy}
                >
                  <SelectTrigger id="sortBy">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nome</SelectItem>
                    <SelectItem value="opportunity">Oportunidade</SelectItem>
                    <SelectItem value="state">Estado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanySearch;
