
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CompletionStepProps {
  file: File | null;
  processedData: any;
  assignmentType: string;
  onFinish: () => void;
}

const CompletionStep = ({ file, processedData, assignmentType, onFinish }: CompletionStepProps) => {
  const { toast } = useToast();
  
  if (!file || !processedData) {
    return <div>Erro ao processar dados.</div>;
  }
  
  const validLeads = processedData.leads.filter((lead: any) => 
    lead.status !== "Falhou"
  ).length;
  
  const getAssignmentDescription = () => {
    if (assignmentType.startsWith("manual:")) {
      const sdrId = assignmentType.split(":")[1];
      return "Atribuição manual para um SDR específico";
    } else if (assignmentType === "auto") {
      return "Atribuição automática (round-robin)";
    } else if (assignmentType === "ai") {
      return "Atribuição otimizada por IA";
    }
    return "Atribuição configurada";
  };

  const showComplianceToast = () => {
    toast({
      title: "Relatório de Compliance (LGPD)",
      description: "O relatório detalhado de compliance foi gerado e está disponível para download.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Importação Concluída!</h2>
        <p className="text-muted-foreground mt-1">
          {validLeads} leads foram importados com sucesso
        </p>
      </div>
      
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center text-green-800">
              <Check className="h-5 w-5 mr-2" />
              <span className="font-medium">Leads adicionados ao pipeline</span>
            </div>
            
            <div className="flex items-center text-green-800">
              <Check className="h-5 w-5 mr-2" />
              <span className="font-medium">Dados limpos e enriquecidos</span>
            </div>
            
            <div className="flex items-center text-green-800">
              <Check className="h-5 w-5 mr-2" />
              <span className="font-medium">{getAssignmentDescription()}</span>
            </div>
            
            <div className="flex items-center text-green-800">
              <Check className="h-5 w-5 mr-2" />
              <span className="font-medium">Registro de auditoria LGPD criado</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-medium mb-3">Resumo da importação</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Arquivo</span>
            <span className="font-medium">{file.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tamanho</span>
            <span className="font-medium">{(file.size / 1024).toFixed(1)} KB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Leads importados</span>
            <span className="font-medium">{validLeads}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dados enriquecidos</span>
            <span className="font-medium">{processedData.stats.enriched}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Taxa de aproveitamento</span>
            <span className="font-medium">
              {Math.round((validLeads / processedData.stats.total) * 100)}%
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <Button 
          variant="outline"
          className="flex items-center"
          onClick={showComplianceToast}
        >
          <FileCheck className="h-4 w-4 mr-2" />
          Relatório de Compliance
        </Button>
        
        <Button onClick={onFinish}>
          Ir para Pipeline
        </Button>
      </div>
    </div>
  );
};

export default CompletionStep;
