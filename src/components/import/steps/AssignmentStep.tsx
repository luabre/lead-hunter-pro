
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Brain, Check, Import } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock SDR data
const mockSdrs = [
  { id: "1", name: "Ana Silva", specialty: "Tecnologia", leads: 34, efficiency: 78 },
  { id: "2", name: "Carlos Oliveira", specialty: "Saúde", leads: 27, efficiency: 82 },
  { id: "3", name: "Daniela Santos", specialty: "Varejo", leads: 42, efficiency: 65 },
  { id: "4", name: "Eduardo Lima", specialty: "Finanças", leads: 19, efficiency: 91 },
];

interface AssignmentStepProps {
  onComplete: (assignmentType: string) => void;
  onBack: () => void;
}

const AssignmentStep = ({ onComplete, onBack }: AssignmentStepProps) => {
  const [assignmentType, setAssignmentType] = useState<string>("auto");
  const [selectedSdr, setSelectedSdr] = useState<string>("");
  const { toast } = useToast();

  const handleAssignmentTypeChange = (value: string) => {
    setAssignmentType(value);
    
    if (value === "auto" || value === "ai") {
      setSelectedSdr("");
    }
  };

  const handleContinue = () => {
    // Validate that an SDR is selected if manual assignment
    if (assignmentType === "manual" && !selectedSdr) {
      toast({
        title: "Selecione um SDR",
        description: "Você precisa selecionar um SDR para atribuição manual.",
        variant: "destructive",
      });
      return;
    }

    const assignmentTypeWithSdr = assignmentType === "manual" ? `manual:${selectedSdr}` : assignmentType;
    onComplete(assignmentTypeWithSdr);
    
    toast({
      title: "Atribuição configurada",
      description: assignmentType === "auto" 
        ? "Leads serão distribuídos automaticamente"
        : assignmentType === "ai"
        ? "IA irá determinar a melhor atribuição"
        : `Leads atribuídos para ${mockSdrs.find(sdr => sdr.id === selectedSdr)?.name}`
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Atribuição de Leads</h2>
        <p className="text-muted-foreground mt-1">
          Escolha como deseja atribuir os leads ao seu time de vendas
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`cursor-pointer transition-all ${assignmentType === "auto" ? "border-primary ring-1 ring-primary" : ""}`} onClick={() => handleAssignmentTypeChange("auto")}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Import className="h-5 w-5 mr-2 text-muted-foreground" />
              Round-robin automático
            </CardTitle>
            <CardDescription>
              Distribui leads igualmente entre todos os SDRs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Distribuição balanceada
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Atribuição imediata
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Leva em conta carga atual
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer transition-all ${assignmentType === "manual" ? "border-primary ring-1 ring-primary" : ""}`} onClick={() => handleAssignmentTypeChange("manual")}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Check className="h-5 w-5 mr-2 text-muted-foreground" />
              Atribuição manual
            </CardTitle>
            <CardDescription>
              Selecione um SDR específico para todos os leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ul className="space-y-2 text-sm mb-4">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Controle total da atribuição
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Ideal para leads específicos
                </li>
              </ul>
              
              <Select
                disabled={assignmentType !== "manual"}
                value={selectedSdr}
                onValueChange={(value) => setSelectedSdr(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um SDR" />
                </SelectTrigger>
                <SelectContent>
                  {mockSdrs.map((sdr) => (
                    <SelectItem key={sdr.id} value={sdr.id}>
                      {sdr.name} ({sdr.specialty})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer transition-all ${assignmentType === "ai" ? "border-primary ring-1 ring-primary" : ""}`} onClick={() => handleAssignmentTypeChange("ai")}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-muted-foreground" />
              Sugestão por IA
            </CardTitle>
            <CardDescription>
              IA determina o melhor SDR para cada lead
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Baseado em histórico de conversão
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Considera especialidade por setor
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Otimiza potencial de fechamento
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={handleContinue}>
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default AssignmentStep;
