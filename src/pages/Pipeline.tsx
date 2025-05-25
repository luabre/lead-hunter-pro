import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import PipelineBoard from "@/components/pipeline/PipelineBoard";
import PipelineFilters from "@/components/pipeline/PipelineFilters";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, FileText, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock Data expandido com informações de campanha
const mockLeads = [
  {
    id: "1",
    companyName: "TechSol",
    contactName: "João Silva",
    lastAction: "E-mail enviado",
    lastActionDate: "Hoje, 14:32",
    status: "contacted" as const,
    opportunity: "hot" as const,
    aiRecommendation: "Seguir com reunião",
    campaign: "IA Prospecção Tech",
    assignedTo: "Maria Santos",
    campaignType: "ai" as const
  },
  {
    id: "2",
    companyName: "LogEx",
    contactName: "Maria Souza",
    lastAction: "Ligação realizada",
    lastActionDate: "Ontem, 16:45",
    status: "qualifying" as const,
    opportunity: "warm" as const,
    campaign: "Manual Enterprise",
    assignedTo: "João Silva",
    campaignType: "manual" as const
  },
  {
    id: "3",
    companyName: "SaudeBem",
    contactName: "Pedro Santos",
    status: "new" as const,
    opportunity: "cold" as const,
  },
  {
    id: "4",
    companyName: "UrbanCon",
    contactName: "Ana Oliveira",
    lastAction: "Reunião agendada",
    lastActionDate: "25/04, 10:00",
    status: "meeting" as const,
    opportunity: "warm" as const,
  },
  {
    id: "5",
    companyName: "NaturFood",
    contactName: "Carlos Pereira",
    lastAction: "Proposta enviada",
    lastActionDate: "20/04, 15:20",
    status: "negotiation" as const,
    opportunity: "hot" as const,
    aiRecommendation: "Fechar negócio hoje",
  },
  {
    id: "6",
    companyName: "DigShop",
    contactName: "Fernanda Lima",
    lastAction: "Contrato assinado",
    lastActionDate: "15/04, 11:30",
    status: "won" as const,
    opportunity: "hot" as const,
  },
  {
    id: "7",
    companyName: "FinCon",
    contactName: "Ricardo Alves",
    lastAction: "Cliente desistiu",
    lastActionDate: "10/04, 09:15",
    status: "lost" as const,
    opportunity: "cold" as const,
  },
  {
    id: "8",
    companyName: "EduOn",
    contactName: "Juliana Costa",
    status: "new" as const,
    opportunity: "warm" as const,
  },
];

const mockUsers = [
  { id: "1", name: "Maria Santos" },
  { id: "2", name: "João Silva" },
  { id: "3", name: "Pedro Costa" },
  { id: "4", name: "Ana Oliveira" }
];

const Pipeline = () => {
  const [selectedLead, setSelectedLead] = useState<(typeof mockLeads)[0] | null>(null);
  const [isAddLeadDialogOpen, setIsAddLeadDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("todos");
  const [selectedCampaignType, setSelectedCampaignType] = useState("todos");
  const navigate = useNavigate();

  // Filtrar leads baseado nos filtros selecionados
  const filteredLeads = mockLeads.filter(lead => {
    const userMatch = selectedUser === "todos" || 
                     (selectedUser === "meus" && lead.assignedTo === "Usuário Atual") ||
                     lead.assignedTo === mockUsers.find(u => u.id === selectedUser)?.name;
    
    const campaignMatch = selectedCampaignType === "todos" ||
                         (selectedCampaignType === "ia" && lead.campaignType === "ai") ||
                         (selectedCampaignType === "manual" && lead.campaignType === "manual");
    
    return userMatch && campaignMatch;
  });

  // Calcular estatísticas dinâmicas baseadas nos filtros
  const totalLeads = filteredLeads.length;
  const negotiationLeads = filteredLeads.filter(lead => lead.status === "negotiation").length;
  const conversionRate = totalLeads > 0 ? ((filteredLeads.filter(lead => lead.status === "won").length / totalLeads) * 100).toFixed(1) : "0";
  const projectedValue = "R$ " + (filteredLeads.length * 10250).toLocaleString();

  const handleLeadClick = (lead: (typeof mockLeads)[0]) => {
    setSelectedLead(lead);
    console.log("Lead clicked:", lead);
  };

  const handleViewPerformance = (userName?: string) => {
    if (userName) {
      navigate(`/performance?user=${encodeURIComponent(userName)}`);
    } else {
      navigate('/performance');
    }
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Pipeline de Vendas</h1>
          <p className="text-muted-foreground">
            Gestão e controle da operação de vendas
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => handleViewPerformance()}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Ver Performance
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Relatórios
          </Button>
          <Button onClick={() => setIsAddLeadDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Lead
          </Button>
        </div>
      </div>

      {/* Filtros Gerenciais */}
      <div className="mb-6">
        <PipelineFilters
          selectedUser={selectedUser}
          selectedCampaignType={selectedCampaignType}
          onUserChange={setSelectedUser}
          onCampaignTypeChange={setSelectedCampaignType}
          users={mockUsers}
        />
      </div>

      {/* Pipeline KPIs - Dinâmicos baseados nos filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-muted-foreground text-sm">Total de Leads</div>
          <div className="text-2xl font-bold mt-1">{totalLeads}</div>
          {selectedUser !== "todos" && (
            <div className="text-xs text-muted-foreground mt-1">
              Filtrado por: {selectedUser === "meus" ? "Meus leads" : mockUsers.find(u => u.id === selectedUser)?.name}
            </div>
          )}
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-muted-foreground text-sm">Em Negociação</div>
          <div className="text-2xl font-bold mt-1">{negotiationLeads}</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-muted-foreground text-sm">Taxa de Conversão</div>
          <div className="text-2xl font-bold mt-1">{conversionRate}%</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-muted-foreground text-sm">Valor Previsto</div>
          <div className="text-2xl font-bold mt-1">{projectedValue}</div>
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="bg-card p-4 rounded-lg border">
        <PipelineBoard leads={filteredLeads} onLeadClick={handleLeadClick} />
      </div>

      {/* Add Lead Dialog */}
      <Dialog open={isAddLeadDialogOpen} onOpenChange={setIsAddLeadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Lead</DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo para adicionar um novo lead ao pipeline.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input id="company" placeholder="Nome da empresa" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contato</Label>
              <Input id="contact" placeholder="Nome do decisor" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Email do contato" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" placeholder="Telefone do contato" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stage">Etapa</Label>
              <Select defaultValue="new">
                <SelectTrigger id="stage">
                  <SelectValue placeholder="Selecione uma etapa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Novo</SelectItem>
                  <SelectItem value="contacted">Contato Enviado</SelectItem>
                  <SelectItem value="qualifying">Em Qualificação</SelectItem>
                  <SelectItem value="meeting">Reunião Agendada</SelectItem>
                  <SelectItem value="negotiation">Negociação</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setIsAddLeadDialogOpen(false)}>Adicionar Lead</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Pipeline;
