
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CampaignType } from "./CampaignTypeSelector";

interface CampaignBasicInfoStepProps {
  campaignType: CampaignType;
  campaignData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onCancel: () => void;
}

const CampaignBasicInfoStep = ({ 
  campaignType, 
  campaignData, 
  onDataChange, 
  onNext, 
  onCancel 
}: CampaignBasicInfoStepProps) => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const getObjectiveOptions = () => {
    if (campaignType === "cpf") {
      return [
        { value: "lead-generation", label: "Geração de Leads" },
        { value: "product-launch", label: "Lançamento de Produto" },
        { value: "education", label: "Educação/Conteúdo" },
        { value: "conversion", label: "Conversão de Interesse" }
      ];
    }
    
    return [
      { value: "prospecting", label: "Prospecção" },
      { value: "nurture", label: "Nutrição" },
      { value: "follow-up", label: "Follow-up" },
      { value: "upsell", label: "Upsell" }
    ];
  };

  const getApproachOptions = () => {
    if (campaignType === "cpf") {
      return [
        { value: "whatsapp", label: "WhatsApp (IA SDR)", icon: "💬" },
        { value: "email", label: "Email Marketing", icon: "📧" },
        { value: "sms", label: "SMS", icon: "📱" }
      ];
    }
    
    return [
      { value: "whatsapp", label: "WhatsApp (IA SDR)", icon: "💬" },
      { value: "email", label: "Email Corporativo", icon: "📧" },
      { value: "linkedin", label: "LinkedIn", icon: "💼" },
      { value: "manual", label: "Manual", icon: "✋" }
    ];
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="campaign-name">Nome da Campanha</Label>
          <Input 
            id="campaign-name" 
            placeholder={
              campaignType === "cpf" 
                ? "Ex: Campanha Renda Extra Q2" 
                : "Ex: Prospecção Tecnologia Q2"
            }
            value={campaignData.name}
            onChange={(e) => onDataChange("name", e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="campaign-objective">Objetivo</Label>
          <Select 
            value={campaignData.objective}
            onValueChange={(value) => onDataChange("objective", value)}
          >
            <SelectTrigger id="campaign-objective">
              <SelectValue placeholder="Selecione um objetivo" />
            </SelectTrigger>
            <SelectContent>
              {getObjectiveOptions().map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Tipo de Abordagem</Label>
          <RadioGroup 
            value={campaignData.approachType}
            onValueChange={(value) => onDataChange("approachType", value)}
            className="grid grid-cols-1 gap-4"
          >
            {getApproachOptions().map((option) => (
              <div key={option.value} className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 flex items-center gap-2">
                  <span>{option.icon}</span>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="campaign-duration">Duração da Campanha</Label>
          <Select 
            value={campaignData.duration}
            onValueChange={(value) => onDataChange("duration", value)}
          >
            <SelectTrigger id="campaign-duration">
              <SelectValue placeholder="Selecione a duração" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 dias</SelectItem>
              <SelectItem value="14">14 dias</SelectItem>
              <SelectItem value="30">30 dias</SelectItem>
              <SelectItem value="60">60 dias</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {campaignType === "cpf" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">👤 Campanha Pessoa Física</h4>
            <p className="text-sm text-blue-700">
              Esta campanha será otimizada para indivíduos. Você poderá importar sua base própria 
              de CPFs e configurar abordagens personalizadas para consumidores finais.
            </p>
          </div>
        )}

        {campaignType === "cnpj" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">🏢 Campanha Pessoa Jurídica</h4>
            <p className="text-sm text-green-700">
              Esta campanha incluirá busca inteligente, enriquecimento de dados empresariais 
              e segmentação avançada por CNAE, porte e outros critérios corporativos.
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          Próximo
        </Button>
      </div>
    </form>
  );
};

export default CampaignBasicInfoStep;
