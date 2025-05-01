
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import PipelineBoard from "@/components/pipeline/PipelineBoard";
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
import { Plus, FileText } from "lucide-react";

// Mock Data
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
  },
  {
    id: "2",
    companyName: "LogEx",
    contactName: "Maria Souza",
    lastAction: "Ligação realizada",
    lastActionDate: "Ontem, 16:45",
    status: "qualifying" as const,
    opportunity: "warm" as const,
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

const Pipeline = () => {
  const [selectedLead, setSelectedLead] = useState<(typeof mockLeads)[0] | null>(null);
  const [isAddLeadDialogOpen, setIsAddLeadDialogOpen] = useState(false);

  const handleLeadClick = (lead: (typeof mockLeads)[0]) => {
    setSelectedLead(lead);
    // In a real application, you would open a lead details view
    console.log("Lead clicked:", lead);
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Pipeline de Vendas</h1>
          <p className="text-muted-foreground">
            Gerenciamento de oportunidades e workflow de vendas
          </p>
        </div>
        <div className="flex gap-3">
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

      {/* Pipeline KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-muted-foreground text-sm">Total de Leads</div>
          <div className="text-2xl font-bold mt-1">{mockLeads.length}</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-muted-foreground text-sm">Em Negociação</div>
          <div className="text-2xl font-bold mt-1">
            {mockLeads.filter((lead) => lead.status === "negotiation").length}
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-muted-foreground text-sm">Taxa de Conversão</div>
          <div className="text-2xl font-bold mt-1">23.5%</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-muted-foreground text-sm">Valor Previsto</div>
          <div className="text-2xl font-bold mt-1">R$ 458.750</div>
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="bg-card p-4 rounded-lg border">
        <PipelineBoard leads={mockLeads} onLeadClick={handleLeadClick} />
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
