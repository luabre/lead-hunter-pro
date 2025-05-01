
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, Users, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface CompanyCardProps {
  company: {
    id: string;
    name: string;
    fantasyName: string;
    cnpj: string;
    city: string;
    state: string;
    segment: string;
    employees: string;
    opportunity?: 'hot' | 'warm' | 'cold';
    aiDetected?: boolean;
  };
  onClick?: () => void;
  className?: string;
}

const CompanyCard = ({ company, onClick, className }: CompanyCardProps) => {
  const navigate = useNavigate();

  // Define badge styles based on opportunity type
  const getBadgeStyles = () => {
    if (!company.opportunity) return "";
    
    switch (company.opportunity) {
      case "hot":
        return "bg-red-100 text-red-700 border-red-200";
      case "warm":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "cold":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "";
    }
  };

  // Label text based on opportunity type
  const getOpportunityLabel = () => {
    if (!company.opportunity) return "";
    
    switch (company.opportunity) {
      case "hot":
        return "Quente";
      case "warm":
        return "Morno";
      case "cold":
        return "Frio";
      default:
        return "";
    }
  };

  // Handle IA SDR activation
  const handleIaSdrClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/ia-sdr?company=${company.id}&name=${encodeURIComponent(company.fantasyName)}`);
  };

  return (
    <div className={cn("company-card animate-fade-in", className)} onClick={onClick}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{company.fantasyName}</h3>
          <p className="text-sm text-muted-foreground">{company.name}</p>
        </div>
        {company.opportunity && (
          <div>
            <Badge 
              variant="outline"
              className={cn(
                getBadgeStyles()
              )}
            >
              {getOpportunityLabel()}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="mt-3 flex gap-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {company.city}, {company.state}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          {company.employees} funcionários
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">{company.cnpj}</div>
        {company.aiDetected && (
          <Badge className="bg-leadhunter-teal hover:bg-leadhunter-teal/90 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Oportunidade IA
          </Badge>
        )}
      </div>
      
      <div className="mt-4 flex justify-between">
        <Button 
          size="sm" 
          className="bg-leadhunter-teal hover:bg-leadhunter-teal/90"
          onClick={handleIaSdrClick}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Ativar IA SDR
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
};

export default CompanyCard;
