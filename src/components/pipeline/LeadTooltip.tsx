
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lead } from "@/hooks/useLeads";

interface LeadTooltipProps {
  lead: Lead;
  children: React.ReactNode;
}

const LeadTooltip = ({ lead, children }: LeadTooltipProps) => {
  const campaignType = lead.campaign?.includes("IA") || lead.campaign?.includes("ia") ? "IA" : "Manual";
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium">
              Lead da campanha {campaignType}
            </p>
            {lead.lastAction && lead.lastActionDate && (
              <p className="text-sm">
                Último toque: {lead.lastAction} - {lead.lastActionDate}
              </p>
            )}
            {lead.assignedTo && (
              <p className="text-sm text-muted-foreground">
                Responsável: {lead.assignedTo}
              </p>
            )}
            {lead.campaign && (
              <p className="text-sm text-muted-foreground">
                Campanha: {lead.campaign}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LeadTooltip;
