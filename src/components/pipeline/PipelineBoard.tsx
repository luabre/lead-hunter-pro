
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  lastAction?: string;
  lastActionDate?: string;
  status: "new" | "contacted" | "qualifying" | "meeting" | "negotiation" | "won" | "lost";
  opportunity?: "hot" | "warm" | "cold";
  aiRecommendation?: string;
}

interface PipelineBoardProps {
  leads: Lead[];
  onLeadClick?: (lead: Lead) => void;
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

const PipelineBoard = ({ leads, onLeadClick }: PipelineBoardProps) => {
  // Adding drag and drop functionality
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (stageId: string) => {
    if (draggedLead && draggedLead.status !== stageId) {
      console.log(`Moving lead ${draggedLead.id} from ${draggedLead.status} to ${stageId}`);
      // In a real app, this would update the lead status in your state or backend
      // For now, we'll just log it
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
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all" 
      onClick={onClick}
      draggable
      onDragStart={onDragStart}
    >
      <CardHeader className="p-3 pb-1">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm">{lead.companyName}</CardTitle>
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
        <p className="text-xs text-muted-foreground mt-1">{lead.contactName}</p>
      </CardHeader>
      <CardContent className="p-3 pt-1">
        {lead.lastAction && lead.lastActionDate && (
          <div className="text-xs text-muted-foreground mb-2">
            <p>Última ação: {lead.lastAction}</p>
            <p>{lead.lastActionDate}</p>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-7 px-2" 
            onClick={(e) => { 
              e.stopPropagation();
              // Handle reply action
            }}
          >
            <MessageSquare className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Responder</span>
          </Button>
          
          {lead.aiRecommendation && (
            <Badge variant="secondary" className="text-xs">
              <span className="text-leadhunter-teal mr-1">IA:</span> {lead.aiRecommendation}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PipelineBoard;
