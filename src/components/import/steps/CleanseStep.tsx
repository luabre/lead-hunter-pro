
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Loader } from "lucide-react";

interface CleanseStepProps {
  file: File;
  onComplete: (data: any) => void;
}

const CleanseStep = ({ file, onComplete }: CleanseStepProps) => {
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    processed: 0,
    corrected: 0,
    enriched: 0,
    failed: 0
  });

  // Simulate the AI cleansing process
  useEffect(() => {
    const simulateProcessing = async () => {
      // Initialize
      setProgress(5);
      setCurrentTask("Analisando arquivo...");
      await sleep(1000);
      
      // Extract data
      setProgress(15);
      setCurrentTask("Extraindo dados...");
      await sleep(1500);
      
      // Set total count
      const totalRecords = Math.floor(Math.random() * 100) + 50;
      setStats(prev => ({ ...prev, total: totalRecords }));
      
      // Validate data
      setProgress(30);
      setCurrentTask("Validando dados...");
      await sleep(1000);
      
      // CNPJ validation
      setProgress(45);
      setCurrentTask("Verificando CNPJs...");
      await sleep(1500);
      
      // Clean and enrich
      setProgress(60);
      setCurrentTask("Limpando e enriquecendo dados...");
      
      // Process each record
      const batchSize = Math.floor(totalRecords / 10);
      for (let i = 0; i < 10; i++) {
        await sleep(600);
        
        const processed = Math.min((i + 1) * batchSize, totalRecords);
        const corrected = Math.floor(processed * 0.3);
        const enriched = Math.floor(processed * 0.4);
        const failed = Math.floor(processed * 0.05);
        
        setStats({
          total: totalRecords,
          processed,
          corrected,
          enriched,
          failed
        });
        
        setProgress(60 + Math.floor((i + 1) * 3));
      }
      
      // Finalizing
      setProgress(95);
      setCurrentTask("Finalizando processamento...");
      await sleep(1000);
      
      // Complete
      setProgress(100);
      setCurrentTask("Processamento concluído!");
      
      // Generate mock processed data
      const mockProcessedData = {
        fileName: file.name,
        fileSize: file.size,
        processedAt: new Date().toISOString(),
        stats: {
          total: totalRecords,
          valid: totalRecords - failed,
          corrected,
          enriched,
          failed
        },
        leads: generateMockLeads(totalRecords, corrected, enriched, failed)
      };
      
      await sleep(1000);
      onComplete(mockProcessedData);
    };
    
    simulateProcessing();
  }, [file, onComplete]);

  // Helper functions
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  const generateMockLeads = (total: number, corrected: number, enriched: number, failed: number) => {
    const leads = [];
    const segments = ["Tecnologia", "Saúde", "Varejo", "Serviços", "Educação", "Finanças", "Indústria"];
    const states = ["SP", "RJ", "MG", "PR", "SC", "RS", "BA", "PE", "CE"];
    
    for (let i = 0; i < total; i++) {
      const isFailed = i < failed;
      const isCorrected = !isFailed && i < (failed + corrected);
      const isEnriched = !isFailed && !isCorrected && i < (failed + corrected + enriched);
      
      leads.push({
        id: `lead-${i + 1}`,
        companyName: `Empresa ${i + 1} LTDA`,
        cnpj: isCorrected ? "CNPJ Corrigido" : `${Math.floor(Math.random() * 90000000) + 10000000}0001${Math.floor(Math.random() * 90) + 10}`,
        contactName: `Contato ${i + 1}`,
        email: isCorrected ? `corrigido${i + 1}@empresa.com` : `contato${i + 1}@empresa.com`,
        phone: `(${Math.floor(Math.random() * 90) + 10}) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
        position: isEnriched ? "Cargo Enriquecido" : ["CEO", "Diretor", "Gerente", "Coordenador", "Analista"][Math.floor(Math.random() * 5)],
        website: isEnriched ? "Site Enriquecido" : `www.empresa${i + 1}.com.br`,
        segment: segments[Math.floor(Math.random() * segments.length)],
        state: states[Math.floor(Math.random() * states.length)],
        status: isFailed ? "Falhou" : isCorrected ? "Corrigido" : isEnriched ? "Enriquecido" : "OK"
      });
    }
    
    return leads;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Limpeza e Enriquecimento</h2>
        <p className="text-muted-foreground mt-1">
          Nossa IA está processando sua base de leads
        </p>
      </div>
      
      <div className="p-6 border rounded-lg bg-muted/30">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              <span>{currentTask}</span>
            </div>
            <span className="font-mono">{progress}%</span>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-background p-3 rounded border text-center">
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="text-xl font-bold">{stats.total}</div>
            </div>
            <div className="bg-background p-3 rounded border text-center">
              <div className="text-sm text-muted-foreground">Processados</div>
              <div className="text-xl font-bold">{stats.processed}</div>
            </div>
            <div className="bg-background p-3 rounded border text-center">
              <div className="text-sm text-muted-foreground">Corrigidos</div>
              <div className="text-xl font-bold text-amber-500">{stats.corrected}</div>
            </div>
            <div className="bg-background p-3 rounded border text-center">
              <div className="text-sm text-muted-foreground">Enriquecidos</div>
              <div className="text-xl font-bold text-blue-500">{stats.enriched}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-5">
          <h3 className="text-sm font-medium mb-3">O que estamos fazendo:</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <div className="bg-blue-100 text-blue-700 rounded-full p-1 mr-2 mt-0.5">✓</div>
              <div>
                <span className="font-medium">Validando CNPJs</span>
                <p className="text-muted-foreground text-xs">Verificando a existência e formatação</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 text-blue-700 rounded-full p-1 mr-2 mt-0.5">✓</div>
              <div>
                <span className="font-medium">Verificando e-mails</span>
                <p className="text-muted-foreground text-xs">Validando formato e existência de domínio</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-amber-100 text-amber-700 rounded-full p-1 mr-2 mt-0.5">⋯</div>
              <div>
                <span className="font-medium">Enriquecendo dados</span>
                <p className="text-muted-foreground text-xs">Adicionando informações via IA</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-gray-100 text-gray-700 rounded-full p-1 mr-2 mt-0.5">○</div>
              <div>
                <span className="font-medium">Classificando leads</span>
                <p className="text-muted-foreground text-xs">Atribuindo pontuação inicial com base no fit</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CleanseStep;
