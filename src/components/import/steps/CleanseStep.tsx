
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { ProcessedData } from '../LeadImportStepper';
import { useToast } from '@/hooks/use-toast';

interface CleanseStepProps {
  file: File;
  onComplete: (data: ProcessedData) => void;
}

const CleanseStep: React.FC<CleanseStepProps> = ({ file, onComplete }) => {
  const [processing, setProcessing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Iniciando processamento...');
  const { toast } = useToast();
  
  // Simulated cleansing and enrichment process
  useEffect(() => {
    const mockProcessFile = async () => {
      // Initial delay to simulate file parsing
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(10);
      setStatus('Analisando estrutura do arquivo...');
      
      // Simulate CNPJ validation
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProgress(30);
      setStatus('Validando CNPJs e removendo duplicados...');
      
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
      
      // Mock data
      const mockData: ProcessedData = {
        total: 250,
        corrected: 45,
        enriched: 187,
        failed: 8,
        leads: Array(250).fill(null).map((_, i) => ({
          id: `lead-${i}`,
          companyName: `Empresa ${i+1}`,
          cnpj: `${Math.floor(10000000000000 + Math.random() * 90000000000000)}`,
          contactName: `Contato ${i+1}`,
          email: `contato${i+1}@empresa${i+1}.com`,
          segment: ['Tecnologia', 'Saúde', 'Educação', 'Varejo', 'Finanças'][Math.floor(Math.random() * 5)]
        }))
      };
      
      setProcessing(false);
      toast({
        title: "Base processada com sucesso!",
        description: `${mockData.total} leads processados, ${mockData.failed} falhas.`
      });
      
      onComplete(mockData);
    };
    
    mockProcessFile();
  }, [file, onComplete, toast]);
  
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
          <div className="space-y-8">
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
            
            {/* Processing stats (only show when complete) */}
            {progress === 100 && (
              <div className="bg-muted/50 p-4 rounded-md">
                <h3 className="font-medium mb-2">Resumo do processamento</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total processado:</p>
                    <p className="font-medium">{250} leads</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dados corrigidos:</p>
                    <p className="font-medium">{45} leads</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dados enriquecidos:</p>
                    <p className="font-medium">{187} leads</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Falhas:</p>
                    <p className="font-medium">{8} leads</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button disabled={processing} onClick={() => onComplete({
          total: 250,
          corrected: 45,
          enriched: 187,
          failed: 8,
          leads: []
        })}>
          {processing ? "Processando..." : "Pular etapa"}
        </Button>
      </div>
    </div>
  );
};

export default CleanseStep;
