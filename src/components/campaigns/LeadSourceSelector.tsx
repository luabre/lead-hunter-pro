
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, CheckSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for demonstration
const mockLeads = [
  { id: "1", name: "TechSol Ltda", segment: "Tecnologia", temperature: "hot", city: "São Paulo", state: "SP" },
  { id: "2", name: "Financeira Capital", segment: "Financeiro", temperature: "warm", city: "Rio de Janeiro", state: "RJ" },
  { id: "3", name: "Manufatura Express", segment: "Manufatura", temperature: "cold", city: "Belo Horizonte", state: "MG" },
  { id: "4", name: "Saúde Total", segment: "Saúde", temperature: "hot", city: "Brasília", state: "DF" },
  { id: "5", name: "Varejista Moderna", segment: "Varejo", temperature: "warm", city: "Curitiba", state: "PR" },
  { id: "6", name: "Construções Rápidas", segment: "Construção", temperature: "cold", city: "Salvador", state: "BA" },
  { id: "7", name: "Agro Sustentável", segment: "Agronegócio", temperature: "hot", city: "Goiânia", state: "GO" },
  { id: "8", name: "Educação Avançada", segment: "Educação", temperature: "warm", city: "Recife", state: "PE" },
];

interface Lead {
  id: string;
  name: string;
  segment: string;
  temperature: string;
  city: string;
  state: string;
}

interface LeadSourceSelectorProps {
  sourceType: 'search' | 'import' | 'radar' | 'existing';
  onLeadsSelected: (leads: string[]) => void;
}

export const LeadSourceSelector = ({ sourceType, onLeadsSelected }: LeadSourceSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading data
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Update parent component with selected leads
  useEffect(() => {
    onLeadsSelected(selectedLeads);
  }, [selectedLeads, onLeadsSelected]);

  const filteredLeads = mockLeads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.segment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${lead.city}, ${lead.state}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleSelect = (leadId: string) => {
    setSelectedLeads(prevSelected => {
      const isSelected = prevSelected.includes(leadId);
      
      if (isSelected) {
        return prevSelected.filter(id => id !== leadId);
      } else {
        return [...prevSelected, leadId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    }
  };

  const getSourceTitle = () => {
    switch (sourceType) {
      case 'search': return 'Busca Inteligente';
      case 'import': return 'Base Importada';
      case 'radar': return 'Leads Recentes do Radar IA';
      case 'existing': return 'Base Existente';
      default: return 'Selecione Leads';
    }
  };

  const renderTemperatureBadge = (temperature: string) => {
    switch (temperature) {
      case 'hot':
        return <Badge className="bg-red-500">Quente</Badge>;
      case 'warm':
        return <Badge className="bg-orange-500">Morno</Badge>;
      case 'cold':
        return <Badge className="bg-blue-500">Frio</Badge>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">{getSourceTitle()}</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Selecione os leads que deseja incluir na campanha
        </p>
        
        <div className="flex space-x-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar leads por nome, segmento ou localização..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={handleSelectAll}
            >
              <CheckSquare className="h-3 w-3 mr-1" />
              {selectedLeads.length === filteredLeads.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
            </Button>
          </div>
          <div className="text-sm">
            <span className="font-medium">{selectedLeads.length}</span> de <span>{filteredLeads.length}</span> leads selecionados
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-32" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLeads.map((lead) => (
            <Card 
              key={lead.id}
              className={`cursor-pointer transition-all ${
                selectedLeads.includes(lead.id) 
                  ? 'ring-2 ring-primary ring-inset' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => handleToggleSelect(lead.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-base">{lead.name}</h3>
                    <div className="text-muted-foreground text-sm">{lead.segment}</div>
                    <div className="text-muted-foreground text-xs mt-1">{lead.city}, {lead.state}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {renderTemperatureBadge(lead.temperature)}
                    <div className={`w-4 h-4 border rounded ${
                      selectedLeads.includes(lead.id) 
                        ? 'bg-primary border-primary' 
                        : 'border-gray-300'
                    } flex items-center justify-center`}>
                      {selectedLeads.includes(lead.id) && (
                        <CheckSquare className="h-3 w-3 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
