
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, Users, MessageSquare, FileText, Calendar, Globe, Briefcase, Database, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
    socialActive?: boolean;
    digitalPresence?: string;
    revenue?: string;
    decisionMakerName?: string;
    decisionMakerPosition?: string;
    opportunitySignals?: string[];
    recommendedChannels?: string[];
    website?: string; // Added this property
    yearFounded?: string; // Added this property
    creator?: {
      email: string;
      name: string;
      origin: string;
      createdAt: string;
    };
  };
  onClick?: () => void;
  className?: string;
  showSaveButton?: boolean;
}

const CompanyCard = ({ company, onClick, className, showSaveButton = false }: CompanyCardProps) => {
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

  // Handle Social Selling activation
  const handleSocialSellingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/social-selling`);
  };

  // Handle Save to Database
  const handleSaveToDatabase = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      // Map the company data to the structure expected by the database
      const companyData = {
        name: company.name,
        fantasy_name: company.fantasyName,
        cnpj: company.cnpj,
        city: company.city,
        state: company.state,
        segment: company.segment,
        employees: company.employees,
        opportunity: company.opportunity,
        ai_detected: company.aiDetected || false,
        website: company.website || company.digitalPresence,
        year_founded: company.yearFounded,
        digital_maturity: 50, // Default value
        created_at: new Date().toISOString() // Fixed: Convert Date to string
      };

      // Insert the company into the database
      const { data, error } = await supabase
        .from('companies')
        .insert(companyData)
        .select();

      if (error) {
        console.error("Error saving company to database:", error);
        toast({
          title: "Erro ao salvar",
          description: "Não foi possível incluir a empresa na base de dados.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Empresa salva com sucesso",
        description: `${company.fantasyName} foi adicionada à base de dados.`,
      });

      // Redirect to the companies page to view the saved company
      navigate('/companies');
    } catch (error) {
      console.error("Error in save operation:", error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive",
      });
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy", { locale: ptBR });
    } catch (e) {
      return "Data desconhecida";
    }
  };

  // Get origin label
  const getOriginLabel = (origin: string) => {
    switch (origin) {
      case "manual": return "Entrada Manual";
      case "radar": return "Radar IA";
      default: return origin;
    }
  };

  // Get digital presence badge style
  const getDigitalPresenceBadge = () => {
    if (!company.digitalPresence) return null;
    
    const presence = company.digitalPresence.toLowerCase();
    if (presence.includes('alta')) {
      return <Badge className="bg-green-600 text-white hover:bg-green-700">Alta Presença Digital</Badge>;
    } else if (presence.includes('média')) {
      return <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">Média Presença Digital</Badge>;
    } else if (presence.includes('baixa')) {
      return <Badge className="bg-gray-500 text-white hover:bg-gray-600">Baixa Presença Digital</Badge>;
    }
    return null;
  };

  return (
    <div className={cn("company-card animate-fade-in", className)} onClick={onClick}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{company.fantasyName}</h3>
          <p className="text-sm text-muted-foreground">{company.name}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {company.opportunity && (
            <Badge 
              variant="outline"
              className={cn(
                getBadgeStyles()
              )}
            >
              {getOpportunityLabel()}
            </Badge>
          )}
          {company.socialActive && (
            <Badge className="bg-green-600 text-white hover:bg-green-700">
              Social Ativo
            </Badge>
          )}
          {getDigitalPresenceBadge()}
        </div>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {company.city}, {company.state}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          {company.employees} funcionários
        </div>
        {company.revenue && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4 mr-1" />
            {company.revenue}
          </div>
        )}
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

      {/* Decision maker information if available */}
      {(company.decisionMakerName || company.decisionMakerPosition) && (
        <div className="mt-2 text-sm border-t pt-2">
          <span className="font-medium">Decisor: </span>
          {company.decisionMakerName}
          {company.decisionMakerPosition && `, ${company.decisionMakerPosition}`}
        </div>
      )}
      
      {/* Creator information */}
      {company.creator && (
        <div className="mt-2 flex items-center text-xs text-muted-foreground">
          <FileText className="h-3 w-3 mr-1" />
          <span>
            {getOriginLabel(company.creator.origin)} por {company.creator.name} • {formatDate(company.creator.createdAt)}
          </span>
        </div>
      )}
      
      <div className="mt-4 flex justify-between gap-2 flex-wrap">
        <Button 
          size="sm" 
          className="bg-leadhunter-teal hover:bg-leadhunter-teal/90 text-white font-medium"
          onClick={handleIaSdrClick}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Ativar IA SDR
        </Button>
        
        {company.socialActive && (
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
            onClick={handleSocialSellingClick}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Social Selling
          </Button>
        )}
        
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

        {showSaveButton && (
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
            onClick={handleSaveToDatabase}
          >
            <Database className="h-4 w-4 mr-1" />
            Incluir na Base de Dados
          </Button>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;
