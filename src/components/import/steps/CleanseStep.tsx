
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { ProcessedData } from '../LeadImportStepper';
import { useToast } from '@/hooks/use-toast';
import { exportAsCSV } from '@/utils/exportUtils';
import { Download, CheckCircle, XCircle, Copy, Lightbulb, FileDown, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface CleanseStepProps {
  file: File;
  onComplete: (data: ProcessedData) => void;
}

const CleanseStep: React.FC<CleanseStepProps> = ({ file, onComplete }) => {
  const [processing, setProcessing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Iniciando processamento...');
  const [activeTab, setActiveTab] = useState('resumo');
  const { toast } = useToast();
  
  // Mock processed data
  const [mockData, setMockData] = useState<{
    total: number;
    accepted: number;
    rejected: number;
    duplicates: number;
    enriched: number;
    rejectionReasons: Record<string, number>;
    sample: any[];
  }>({
    total: 0,
    accepted: 0,
    rejected: 0,
    duplicates: 0,
    enriched: 0,
    rejectionReasons: {},
    sample: []
  });
  
  // Simulated cleansing and enrichment process
  useEffect(() => {
    const mockProcessFile = async () => {
      // Initial delay to simulate file parsing
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(10);
      setStatus('Analisando estrutura do arquivo...');
      
      // Generate mock data
      const total = 250;
      const accepted = 198;
      const rejected = 27;
      const duplicates = 25;
      const enriched = 187;
      
      // Rejection reasons
      const rejectionReasons = {
        'CNPJ inválido': 12,
        'Email inválido': 8,
        'Dados insuficientes': 7,
      };
      
      // Sample data
      const sampleData = Array(12).fill(null).map((_, i) => {
        const status = i < 9 ? 'Aprovado' : i === 9 ? 'Rejeitado' : 'Duplicado';
        const enriched = i % 3 === 0;
        
        return {
          id: `lead-${i}`,
          companyName: `Empresa ${i+1}`,
          cnpj: `${Math.floor(10000000000000 + Math.random() * 90000000000000)}`,
          contactName: `Contato ${i+1}`,
          email: status === 'Rejeitado' ? `invalido@email` : `contato${i+1}@empresa${i+1}.com`,
          phone: status === 'Rejeitado' ? '' : `(11) 9${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
          segment: ['Tecnologia', 'Saúde', 'Educação', 'Varejo', 'Finanças'][Math.floor(Math.random() * 5)],
          status,
          enriched,
          reason: status === 'Rejeitado' ? Object.keys(rejectionReasons)[i % 3] : null,
          changes: enriched ? {
            segment: true,
            classification: true
          } : null
        };
      });
      
      // Simulate CNPJ validation
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProgress(30);
      setStatus('Validando CNPJs e removendo duplicados...');
      
      // Update mock data
      setMockData({
        total,
        accepted,
        rejected,
        duplicates,
        enriched,
        rejectionReasons,
        sample: sampleData
      });
      
      // Simulate email validation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setProgress(50);
      setStatus('Corrigindo e validando e-mails...');
      
      // Simulate AI enrichment
      await new Promise(resolve => setTimeout(resolve, 2500));
      setProgress(70);
      setStatus('Enriquecendo dados com IA...');
      
      // Simulate segmentation
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProgress(90);
      setStatus('Classificando leads por potencial...');
      
      // Simulate completion
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(100);
      setStatus('Processamento concluído');
      
      // Mock processed data for next step
      const mockProcessedData: ProcessedData = {
        total,
        corrected: 45,
        enriched,
        failed: rejected,
        leads: sampleData.filter(item => item.status === 'Aprovado').map((item) => ({
          ...item,
          status: item.enriched ? "Enriquecido" : "OK"
        }))
      };
      
      setProcessing(false);
      toast({
        title: "Base processada com sucesso!",
        description: `${mockProcessedData.total} leads processados, ${mockProcessedData.failed} falhas.`
      });
      
      // Use timeout to ensure the UI is updated before continuing
      setTimeout(() => {
        onComplete(mockProcessedData);
      }, 500);
    };
    
    mockProcessFile();
  }, [file, onComplete, toast]);
  
  const handleExportReport = () => {
    // Define headers for the CSV export
    const headers = {
      companyName: "Empresa",
      cnpj: "CNPJ",
      contactName: "Contato",
      email: "Email",
      phone: "Telefone",
      segment: "Segmento",
      status: "Status",
      reason: "Motivo de Rejeição",
      enriched: "Enriquecido"
    };
    
    exportAsCSV(mockData.sample, headers, "relatorio_importacao");
    
    toast({
      title: "Relatório exportado",
      description: "O relatório completo foi baixado com sucesso."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Processando sua base de leads</h2>
        <p className="text-muted-foreground">
          Estamos limpando, validando e enriquecendo automaticamente seus dados
        </p>
      </div>
      
      <Card className="border border-muted">
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-4 dark:bg-gray-700">
              <div 
                className="bg-primary h-4 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            {/* Status text */}
            <div className="text-center text-sm font-medium">
              {status}
            </div>
            
            {/* Processing activities */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Verificação de CNPJs</span>
                {progress < 30 ? <Skeleton className="h-4 w-20" /> : <span className="text-green-600">✓ Concluído</span>}
              </div>
              <div className="flex justify-between items-center">
                <span>Validação de e-mails</span>
                {progress < 50 ? <Skeleton className="h-4 w-20" /> : <span className="text-green-600">✓ Concluído</span>}
              </div>
              <div className="flex justify-between items-center">
                <span>Enriquecimento com IA</span>
                {progress < 70 ? <Skeleton className="h-4 w-20" /> : <span className="text-green-600">✓ Concluído</span>}
              </div>
              <div className="flex justify-between items-center">
                <span>Classificação por potencial</span>
                {progress < 90 ? <Skeleton className="h-4 w-20" /> : <span className="text-green-600">✓ Concluído</span>}
              </div>
            </div>
            
            {/* Processing results (only show when complete) */}
            {progress === 100 && (
              <>
                <div className="border-t border-border pt-4 mt-4">
                  <h3 className="text-lg font-medium mb-4">Resultado do processamento</h3>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="resumo">Resumo</TabsTrigger>
                      <TabsTrigger value="amostra">Amostra dos Dados</TabsTrigger>
                      <TabsTrigger value="rejeicoes">Rejeições</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="resumo" className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm text-blue-700 dark:text-blue-300">Total de registros</p>
                              <p className="text-xl font-bold">{mockData.total}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm text-green-700 dark:text-green-300">Registros aceitos</p>
                              <p className="text-xl font-bold">{mockData.accepted}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                          <div className="flex items-start">
                            <Lightbulb className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm text-amber-700 dark:text-amber-300">Registros enriquecidos</p>
                              <p className="text-xl font-bold">{mockData.enriched}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-800">
                          <div className="flex items-start">
                            <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm text-red-700 dark:text-red-300">Registros rejeitados</p>
                              <p className="text-xl font-bold">{mockData.rejected}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
                          <div className="flex items-start">
                            <Copy className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm text-purple-700 dark:text-purple-300">Duplicatas removidas</p>
                              <p className="text-xl font-bold">{mockData.duplicates}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center p-4 rounded-lg border border-dashed">
                          <Button variant="outline" className="w-full" onClick={handleExportReport}>
                            <FileDown className="mr-2 h-4 w-4" />
                            Exportar relatório
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Ações adicionais recomendadas
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>Acionar o IA SDR para contato imediato com leads de alto potencial</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>Segmentar empresas por setor para campanhas personalizadas</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>Revisar manualmente os {mockData.rejected} leads com problemas</span>
                          </li>
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="amostra" className="pt-4">
                      <div className="rounded-md border">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-muted/50">
                              <tr>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Empresa</th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-medium">CNPJ</th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Contato</th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Email</th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {mockData.sample.map((item, i) => (
                                <tr key={i} className="border-t">
                                  <td className="px-4 py-3">{item.companyName}</td>
                                  <td className="px-4 py-3 font-mono text-xs">{item.cnpj}</td>
                                  <td className="px-4 py-3">{item.contactName}</td>
                                  <td className="px-4 py-3">{item.email}</td>
                                  <td className="px-4 py-3">
                                    {item.status === 'Aprovado' && (
                                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                        {item.enriched ? "Enriquecido" : "Aprovado"}
                                      </Badge>
                                    )}
                                    {item.status === 'Rejeitado' && (
                                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                        Rejeitado
                                      </Badge>
                                    )}
                                    {item.status === 'Duplicado' && (
                                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                        Duplicado
                                      </Badge>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="mt-4 text-center text-sm text-muted-foreground">
                        Mostrando 12 registros de exemplo dos {mockData.total} processados
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="rejeicoes" className="pt-4">
                      <div className="space-y-4">
                        <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900/20">
                          <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Motivos de rejeição</h4>
                          <div className="space-y-3">
                            {Object.entries(mockData.rejectionReasons).map(([reason, count]) => (
                              <div key={reason} className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <XCircle className="h-4 w-4 text-red-500 mr-2" />
                                  <span>{reason}</span>
                                </div>
                                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                                  {count} registros
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">Correções automáticas</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span>Formatação de CNPJs</span>
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                23 corrigidos
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Padronização de telefones</span>
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                54 corrigidos
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Remoção de caracteres especiais</span>
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                17 corrigidos
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" disabled>
          Voltar
        </Button>
        <Button disabled={processing} onClick={() => onComplete({
          total: mockData.total,
          corrected: 45,
          enriched: mockData.enriched,
          failed: mockData.rejected,
          leads: mockData.sample.filter(item => item.status === 'Aprovado').map((item) => ({
            ...item,
            status: item.enriched ? "Enriquecido" : "OK"
          }))
        })}>
          {processing ? "Processando..." : "Prosseguir"}
        </Button>
      </div>
    </div>
  );
};

export default CleanseStep;
