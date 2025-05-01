
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
import { Search } from "lucide-react";

interface CompanySearchProps {
  onSearch: (filters: CompanyFilters) => void;
}

export interface CompanyFilters {
  segment: string;
  state?: string;
  size?: string;
  revenue?: string;
  employees?: string;
  type?: string;
  yearsInBusiness?: string;
}

const brazilianStates = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", 
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const CompanySearch = ({ onSearch }: CompanySearchProps) => {
  const [filters, setFilters] = useState<CompanyFilters>({
    segment: "",
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
        <CardTitle>Busca de Empresas</CardTitle>
        <CardDescription>
          Encontre empresas por segmento, região, porte e mais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="segment">Segmento</Label>
            <div className="flex gap-2">
              <Input
                id="segment"
                placeholder="Ex: Tecnologia, Logística, Saúde..."
                className="flex-1"
                value={filters.segment}
                onChange={(e) => handleInputChange("segment", e.target.value)}
              />
              <Button onClick={handleSearchClick}>
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
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
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanySearch;
