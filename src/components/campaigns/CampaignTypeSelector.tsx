
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Building2, User } from "lucide-react";

export type CampaignType = "cnpj" | "cpf";

interface CampaignTypeSelectorProps {
  selectedType: CampaignType;
  onTypeChange: (type: CampaignType) => void;
}

const CampaignTypeSelector = ({ selectedType, onTypeChange }: CampaignTypeSelectorProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📇 Tipo de Campanha
        </CardTitle>
        <CardDescription>
          Selecione o tipo de público para sua campanha
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedType}
          onValueChange={(value) => onTypeChange(value as CampaignType)}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-colors ${
            selectedType === "cnpj" 
              ? "border-primary bg-primary/5" 
              : "border-muted hover:border-primary/50"
          }`}>
            <RadioGroupItem value="cnpj" id="cnpj" />
            <div className="flex items-center space-x-3 flex-1">
              <Building2 className="h-5 w-5 text-primary" />
              <div>
                <Label htmlFor="cnpj" className="text-base font-medium cursor-pointer">
                  🏢 Pessoa Jurídica (CNPJ)
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Empresas, organizações e negócios
                </p>
              </div>
            </div>
          </div>
          
          <div className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-colors ${
            selectedType === "cpf" 
              ? "border-primary bg-primary/5" 
              : "border-muted hover:border-primary/50"
          }`}>
            <RadioGroupItem value="cpf" id="cpf" />
            <div className="flex items-center space-x-3 flex-1">
              <User className="h-5 w-5 text-primary" />
              <div>
                <Label htmlFor="cpf" className="text-base font-medium cursor-pointer">
                  👤 Pessoa Física (CPF)
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Indivíduos e consumidores finais
                </p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default CampaignTypeSelector;
