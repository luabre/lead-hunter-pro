
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";

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
                "opportunity-badge",
                company.opportunity === 'hot' && "opportunity-hot",
                company.opportunity === 'warm' && "opportunity-warm",
                company.opportunity === 'cold' && "opportunity-cold"
              )}
            >
              {company.opportunity === 'hot' ? 'Quente' : 
               company.opportunity === 'warm' ? 'Morno' : 'Frio'}
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
      
      <div className="mt-4 flex justify-end">
        <Button size="sm" variant="outline" onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}>
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
};

export default CompanyCard;
