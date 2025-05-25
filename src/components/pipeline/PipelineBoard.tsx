import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Mail, Calendar, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import CampaignBadge from "./CampaignBadge";
import LeadTooltip from "./LeadTooltip";

interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  lastAction?: string;
  lastActionDate?: string;
  status: "new" | "contacted" | "qualifying" | "meeting" | "negotiation" | "won" | "lost";
  opportunity?: "hot" | "warm" | "cold";
  aiRecommendation?: string;
  campaign?: string;
  assignedTo?: string;
  campaignType?: "ai" | "manual";
}

interface PipelineBoardProps {
  leads: Lead[];
  onLeadClick?: (lead: Lead) => void;
  onLeadStatusChange?: (lead: Lead, newStatus: Lead["status"]) => void;
}

const PIPELINE_STAGES = [
  { id: "new", title: "Novo" },
  { id: "contacted", title: "Contato Enviado" },
  { id: "qualifying", title: "Em Qualificação" },
  { id: "meeting", title: "Reunião Agendada" },
  { id: "negotiation", title: "Negociação" },
  { id: "won", title: "Fechado - Ganhou" },
  { id: "lost", title: "Fechado - Perdeu" },
];

const PipelineBoard = ({ leads, onLeadClick, onLeadStatusChange }: PipelineBoardProps) => {
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const { toast } = useToast();

  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (stageId: string) => {
    if (draggedLead && draggedLead.status !== stageId) {
      // In a real app, this would update the lead status in your state or backend
      const updatedLead = { ...draggedLead, status: stageId as Lead["status"] };
      
      // Call the callback if provided
      if (onLeadStatusChange) {
        onLeadStatusChange(draggedLead, stageId as Lead["status"]);
      }
      
      toast({
        title: "Lead movido com sucesso",
        description: `${draggedLead.companyName} foi movido para ${PIPELINE_STAGES.find(stage => stage.id === stageId)?.title}`,
      });
      
      setDraggedLead(null);
    }
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-[1200px]">
        {PIPELINE_STAGES.map((stage) => (
          <PipelineColumn 
            key={stage.id} 
            title={stage.title} 
            stageId={stage.id}
            leads={leads.filter((lead) => lead.status === stage.id)}
            onLeadClick={onLeadClick}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(stage.id)}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
    </div>
  );
};

interface PipelineColumnProps {
  title: string;
  stageId: string;
  leads: Lead[];
  onLeadClick?: (lead: Lead) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: () => void;
  onDragStart: (lead: Lead) => void;
}

const PipelineColumn = ({ 
  title, 
  stageId,
  leads, 
  onLeadClick,
  onDragOver,
  onDrop,
  onDragStart 
}: PipelineColumnProps) => {
  return (
    <div className="w-[250px] flex-shrink-0">
      <div className="bg-muted rounded-t-lg p-2 border">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">{title}</h3>
          <Badge variant="outline">{leads.length}</Badge>
        </div>
      </div>
      
      <div 
        className="bg-background rounded-b-lg border border-t-0 h-[calc(100vh-260px)] overflow-y-auto p-2 space-y-2"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {leads.map((lead) => (
          <LeadCard 
            key={lead.id} 
            lead={lead} 
            onClick={() => onLeadClick?.(lead)}
            onDragStart={() => onDragStart(lead)}
          />
        ))}
        
        {leads.length === 0 && (
          <div className="flex items-center justify-center h-20 text-sm text-muted-foreground">
            Nenhum lead nesta etapa
          </div>
        )}
      </div>
    </div>
  );
};

interface LeadCardProps {
  lead: Lead;
  onClick?: () => void;
  onDragStart: () => void;
}

const LeadCard = ({ lead, onClick, onDragStart }: LeadCardProps) => {
  const { toast } = useToast();

  // Determinar tipo de campanha
  const campaignType = lead.campaignType || 
                      (lead.campaign?.toLowerCase().includes("ia") || 
                       lead.campaign?.toLowerCase().includes("ai") ? "ai" : "manual");

  const handleActionClick = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    switch(action) {
      case 'call':
        toast({
          title: "Iniciando ligação",
          description: `Ligando para ${lead.contactName} da ${lead.companyName}`,
        });
        break;
      case 'email':
        toast({
          title: "Novo e-mail",
          description: `Preparando e-mail para ${lead.contactName}`,
        });
        break;
      case 'meeting':
        toast({
          title: "Agendar reunião",
          description: `Configurando reunião com ${lead.companyName}`,
        });
        break;
      case 'message':
        toast({
          title: "Nova mensagem",
          description: `Redigindo mensagem para ${lead.contactName}`,
        });
        break;
      case 'accept':
        toast({
          title: "Oportunidade ganha",
          description: `${lead.companyName} marcada como cliente!`,
        });
        break;
      case 'reject':
        toast({
          title: "Oportunidade perdida",
          description: `${lead.companyName} marcada como perdida.`,
        });
        break;
    }
  };

  return (
    <LeadTooltip lead={lead}>
      <Card 
        className="cursor-grab active:cursor-grabbing hover:shadow-md transition-all border-l-4 animate-fade-in"
        style={{ 
          borderLeftColor: lead.opportunity === 'hot' 
            ? 'var(--leadhunter-red)' 
            : lead.opportunity === 'warm' 
            ? 'var(--leadhunter-gold)' 
            : 'var(--leadhunter-blue)' 
        }}
        onClick={onClick}
        draggable
        onDragStart={onDragStart}
      >
        <CardHeader className="p-3 pb-1">
          <div className="flex justify-between items-start">
            <CardTitle className="text-sm">{lead.companyName}</CardTitle>
            <div className="flex items-center gap-1">
              <CampaignBadge campaignType={campaignType} />
              {lead.opportunity && (
                <Badge 
                  className={
                    lead.opportunity === 'hot'
                      ? 'bg-leadhunter-red text-white text-xs'
                      : lead.opportunity === 'warm'
                      ? 'bg-leadhunter-gold text-white text-xs'
                      : 'bg-leadhunter-blue text-white text-xs'
                  }
                >
                  {lead.opportunity === 'hot' ? 'Quente' : lead.opportunity === 'warm' ? 'Morno' : 'Frio'}
                </Badge>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{lead.contactName}</p>
          {lead.assignedTo && (
            <p className="text-xs text-muted-foreground">Responsável: {lead.assignedTo}</p>
          )}
        </CardHeader>
        <CardContent className="p-3 pt-1">
          {lead.lastAction && lead.lastActionDate && (
            <div className="text-xs text-muted-foreground mb-2">
              <p>Última ação: {lead.lastAction}</p>
              <p>{lead.lastActionDate}</p>
            </div>
          )}
          
          {/* Action buttons - top row */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-1">
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-7 w-7 p-0" 
                onClick={(e) => handleActionClick('message', e)}
                title="Enviar mensagem"
              >
                <MessageSquare className="h-3.5 w-3.5" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-7 w-7 p-0" 
                onClick={(e) => handleActionClick('call', e)}
                title="Ligar"
              >
                <Phone className="h-3.5 w-3.5" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-7 w-7 p-0" 
                onClick={(e) => handleActionClick('email', e)}
                title="Enviar e-mail"
              >
                <Mail className="h-3.5 w-3.5" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-7 w-7 p-0" 
                onClick={(e) => handleActionClick('meeting', e)}
                title="Agendar reunião"
              >
                <Calendar className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          
          {/* Conditional buttons for Won/Lost stages */}
          {(lead.status === 'negotiation') && (
            <div className="flex justify-end mt-2 gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="h-7 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700" 
                onClick={(e) => handleActionClick('accept', e)}
              >
                <Check className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs">Ganhou</span>
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-7 border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700" 
                onClick={(e) => handleActionClick('reject', e)}
              >
                <X className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs">Perdeu</span>
              </Button>
            </div>
          )}
          
          {lead.aiRecommendation && (
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs w-full justify-start">
                <span className="text-leadhunter-teal mr-1">IA:</span> {lead.aiRecommendation}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </LeadTooltip>
  );
};

export default PipelineBoard;
