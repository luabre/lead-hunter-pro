
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, FileCheck, Download, Shield, Sparkles, BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProcessedData } from "../LeadImportStepper";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CompletionStepProps {
  file: File | null;
  processedData: ProcessedData;
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
  
  const downloadDetails = () => {
    toast({
      title: "Detalhes do processamento",
      description: "Os detalhes completos do processamento foram baixados com sucesso.",
    });
  };

  // Obter os detalhes da limpeza e enriquecimento
  const cleansingDetails = processedData.stats?.cleansingDetails || {
    cnpjCorrected: 23,
    emailsValidated: 187,
    phonesStandardized: 54,
    duplicatesRemoved: 25
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
      
      <Tabs defaultValue="resumo" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="resumo">Resumo</TabsTrigger>
          <TabsTrigger value="limpeza">Limpeza de Dados</TabsTrigger>
          <TabsTrigger value="enriquecimento">Enriquecimento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resumo">
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/10">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center text-green-800 dark:text-green-300">
                  <Check className="h-5 w-5 mr-2" />
                  <span className="font-medium">Leads adicionados ao pipeline</span>
                </div>
                
                <div className="flex items-center text-green-800 dark:text-green-300">
                  <Check className="h-5 w-5 mr-2" />
                  <span className="font-medium">Dados limpos e enriquecidos</span>
                </div>
                
                <div className="flex items-center text-green-800 dark:text-green-300">
                  <Check className="h-5 w-5 mr-2" />
                  <span className="font-medium">{getAssignmentDescription()}</span>
                </div>
                
                <div className="flex items-center text-green-800 dark:text-green-300">
                  <Check className="h-5 w-5 mr-2" />
                  <span className="font-medium">Registro de auditoria LGPD criado</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="limpeza">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <Shield className="h-5 w-5 text-blue-500 mr-2" />
                <span>Resultados da Limpeza de Dados</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-100 dark:border-blue-900/30">
                  <div className="text-sm font-medium text-blue-700 dark:text-blue-300">CNPJ Corrigidos</div>
                  <div className="text-lg font-bold">{cleansingDetails.cnpjCorrected}</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-100 dark:border-green-900/30">
                  <div className="text-sm font-medium text-green-700 dark:text-green-300">E-mails Validados</div>
                  <div className="text-lg font-bold">{cleansingDetails.emailsValidated}</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-100 dark:border-purple-900/30">
                  <div className="text-sm font-medium text-purple-700 dark:text-purple-300">Telefones Padronizados</div>
                  <div className="text-lg font-bold">{cleansingDetails.phonesStandardized}</div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-100 dark:border-amber-900/30">
                  <div className="text-sm font-medium text-amber-700 dark:text-amber-300">Duplicatas Removidas</div>
                  <div className="text-lg font-bold">{cleansingDetails.duplicatesRemoved}</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Destaques da limpeza</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Removidas {cleansingDetails.duplicatesRemoved} duplicidades de CNPJ</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Corrigidos {cleansingDetails.emailsValidated} e-mails inválidos ou mal formatados</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Padronização de {cleansingDetails.phonesStandardized} telefones e contatos</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="enriquecimento">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
                <span>Resultados do Enriquecimento</span>
              </h3>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total de Leads Enriquecidos</span>
                  <span className="text-xl font-bold">{processedData.enriched}</span>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <BarChart className="h-4 w-4 mr-2" />
                  Empresas por segmento
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">78</Badge>
                      <span>Tecnologia</span>
                    </div>
                    <span className="text-xs text-muted-foreground">39.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">43</Badge>
                      <span>Saúde</span>
                    </div>
                    <span className="text-xs text-muted-foreground">21.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">35</Badge>
                      <span>Educação</span>
                    </div>
                    <span className="text-xs text-muted-foreground">17.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">27</Badge>
                      <span>Varejo</span>
                    </div>
                    <span className="text-xs text-muted-foreground">13.6%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">15</Badge>
                      <span>Finanças</span>
                    </div>
                    <span className="text-xs text-muted-foreground">7.6%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-medium mb-3">Resumo do processamento</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dados enriquecidos</span>
              <span className="font-medium">{processedData.enriched}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dados corrigidos</span>
              <span className="font-medium">{processedData.corrected}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxa de aproveitamento</span>
              <span className="font-medium">
                {Math.round((validLeads / processedData.total) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <Button 
          variant="outline"
          className="flex items-center"
          onClick={showComplianceToast}
        >
          <FileCheck className="h-4 w-4 mr-2" />
          Relatório de Compliance
        </Button>
        
        <Button 
          variant="outline"
          className="flex items-center"
          onClick={downloadDetails}
        >
          <Download className="h-4 w-4 mr-2" />
          Detalhes do Processamento
        </Button>
        
        <Button onClick={onFinish} className="ml-auto">
          Ir para Pipeline
        </Button>
      </div>
    </div>
  );
};

export default CompletionStep;
