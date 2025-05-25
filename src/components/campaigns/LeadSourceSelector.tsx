
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Archive, 
  Database, 
  Radar, 
  Building2, 
  MapPin, 
  Users,
  User,
  Phone,
  Mail
} from "lucide-react";

type SourceType = "search" | "import" | "radar" | "existing" | "import-cpf" | "existing-cpf";
type CampaignType = "cnpj" | "cpf";

interface LeadSourceSelectorProps {
  sourceType: SourceType;
  campaignType?: CampaignType;
  onLeadsSelected: (leads: any[]) => void;
}

const LeadSourceSelector = ({ sourceType, campaignType = "cnpj", onLeadsSelected }: LeadSourceSelectorProps) => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const handleLeadSelection = (leadId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedLeads([...selectedLeads, leadId]);
    } else {
      setSelectedLeads(selectedLeads.filter(id => id !== leadId));
    }
  };

  const handleSelectAll = (leads: any[]) => {
    const allIds = leads.map(lead => lead.id);
    setSelectedLeads(allIds);
    onLeadsSelected(leads);
  };

  // Dados mock para pessoas físicas
  const mockCPFLeads = [
    {
      id: "pf1",
      name: "Maria Silva Santos",
      email: "maria.santos@gmail.com",
      phone: "(11) 98765-4321",
      city: "São Paulo",
      interest: "Investimentos",
      source: "Landing Page"
    },
    {
      id: "pf2", 
      name: "João Carlos Lima",
      email: "joao.lima@hotmail.com",
      phone: "(21) 97654-3210",
      city: "Rio de Janeiro",
      interest: "Educação Financeira",
      source: "Facebook Ads"
    },
    {
      id: "pf3",
      name: "Ana Paula Costa",
      email: "ana.costa@yahoo.com",
      phone: "(31) 96543-2109",
      city: "Belo Horizonte", 
      interest: "Renda Extra",
      source: "Indicação"
    }
  ];

  // Dados mock para empresas (mantendo os existentes)
  const mockCNPJLeads = [
    {
      id: "1",
      company: "TechStart Soluções",
      cnpj: "12.345.678/0001-90",
      segment: "Tecnologia",
      employees: "50-100",
      city: "São Paulo",
      contact: "Carlos Silva",
      email: "carlos@techstart.com.br"
    },
    {
      id: "2",
      company: "InnovateBR",
      cnpj: "98.765.432/0001-10",
      segment: "Consultoria",
      employees: "10-50",
      city: "Rio de Janeiro", 
      contact: "Ana Santos",
      email: "ana@innovatebr.com"
    }
  ];

  const getSourceConfig = () => {
    const configs = {
      "search": {
        title: "🔍 Busca Inteligente",
        description: "Encontre empresas usando IA com critérios avançados",
        icon: Search,
        data: mockCNPJLeads
      },
      "import": {
        title: "📂 Base Importada",
        description: "Leads empresariais importados de planilhas",
        icon: Archive,
        data: mockCNPJLeads
      },
      "radar": {
        title: "🎯 Radar IA",
        description: "Empresas identificadas automaticamente pela IA",
        icon: Radar,
        data: mockCNPJLeads
      },
      "existing": {
        title: "🗄️ Base Existente",
        description: "Empresas já cadastradas no sistema",
        icon: Database,
        data: mockCNPJLeads
      },
      "import-cpf": {
        title: "📂 Importar Base PF",
        description: "Importe sua base de contatos de pessoas físicas",
        icon: Archive,
        data: mockCPFLeads
      },
      "existing-cpf": {
        title: "🗄️ Base Existente PF", 
        description: "Contatos PF já cadastrados no sistema",
        icon: Database,
        data: mockCPFLeads
      }
    };

    return configs[sourceType];
  };

  const config = getSourceConfig();

  const renderCNPJLead = (lead: any) => (
    <Card key={lead.id} className="p-4">
      <div className="flex items-start space-x-3">
        <Checkbox
          checked={selectedLeads.includes(lead.id)}
          onCheckedChange={(checked) => handleLeadSelection(lead.id, checked as boolean)}
        />
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {lead.company}
            </h4>
            <Badge variant="outline">{lead.segment}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {lead.employees} funcionários
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {lead.city}
            </div>
            <div className="col-span-2">
              <strong>Contato:</strong> {lead.contact} - {lead.email}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderCPFLead = (lead: any) => (
    <Card key={lead.id} className="p-4">
      <div className="flex items-start space-x-3">
        <Checkbox
          checked={selectedLeads.includes(lead.id)}
          onCheckedChange={(checked) => handleLeadSelection(lead.id, checked as boolean)}
        />
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              {lead.name}
            </h4>
            <Badge variant="outline">{lead.interest}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {lead.email}
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {lead.phone}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {lead.city}
            </div>
            <div>
              <strong>Origem:</strong> {lead.source}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <config.icon className="h-5 w-5" />
            {config.title}
          </CardTitle>
          <CardDescription>{config.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">
              {config.data.length} {campaignType === "cpf" ? "contatos" : "leads"} disponíveis
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleSelectAll(config.data)}
            >
              Selecionar Todos
            </Button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {config.data.map((lead) => 
              campaignType === "cpf" ? renderCPFLead(lead) : renderCNPJLead(lead)
            )}
          </div>
          
          {selectedLeads.length > 0 && (
            <div className="mt-4 p-3 bg-primary/10 rounded-md">
              <p className="text-sm font-medium">
                ✅ {selectedLeads.length} {campaignType === "cpf" ? "contatos" : "leads"} selecionados
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { LeadSourceSelector };
