
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Download, File, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface UploadStepProps {
  onComplete: (file: File) => void;
}

// Mock function to generate template file
const generateTemplateFile = () => {
  // In a real app, this would generate an actual Excel file
  console.log("Generating template file");
  
  // For demo purposes, create a blob that simulates an Excel file
  const headers = "Empresa (Razão Social),CNPJ,Nome do Contato Principal,Email 1,Email 2,Email 3,Telefone Principal,Cargo do Contato,Website,Segmento,Estado,Observações\n";
  const sampleData = "Empresa Exemplo LTDA,12345678000190,João Silva,joao@exemplo.com,,,11987654321,Diretor,www.exemplo.com.br,Tecnologia,SP,Cliente potencial\n";
  
  const content = headers + sampleData;
  const blob = new Blob([content], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  return blob;
};

const UploadStep = ({ onComplete }: UploadStepProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const downloadTemplate = () => {
    const blob = generateTemplateFile();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "modelo_importacao_leads.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Template baixado",
      description: "O arquivo modelo foi baixado com sucesso.",
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      validateAndSetFile(event.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check file type
    const validTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!validTypes.includes(file.type) && !["xlsx", "csv"].includes(fileExtension || "")) {
      toast({
        title: "Formato não suportado",
        description: "Por favor, selecione um arquivo .xlsx ou .csv",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O arquivo deve ter no máximo 10MB",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFile(file);
    toast({
      title: "Arquivo selecionado",
      description: `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
    });
  };

  const handleContinue = () => {
    if (selectedFile) {
      onComplete(selectedFile);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Upload da Base de Leads</h2>
        <p className="text-muted-foreground mt-1">
          Carregue sua base de leads em formato .xlsx ou .csv
        </p>
      </div>
      
      <Alert>
        <AlertTitle>Dicas para uma importação bem-sucedida</AlertTitle>
        <AlertDescription>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Use o formato do modelo para melhores resultados</li>
            <li>Verifique se os campos obrigatórios estão preenchidos</li>
            <li>O tamanho máximo do arquivo é 10MB</li>
            <li>Usamos IA para enriquecer dados ausentes ou incompletos</li>
          </ul>
        </AlertDescription>
      </Alert>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          isDragging ? "border-primary bg-muted" : "border-muted-foreground/20"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".xlsx,.csv"
          onChange={handleFileChange}
        />
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-muted p-4 rounded-full">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <div>
            <p className="text-lg font-medium">Clique ou arraste o arquivo</p>
            <p className="text-sm text-muted-foreground mt-1">
              Formatos suportados: .xlsx, .csv até 10MB
            </p>
          </div>
        </div>
      </div>
      
      {selectedFile && (
        <div className="flex items-center p-3 bg-muted rounded-md">
          <File className="h-5 w-5 text-muted-foreground mr-2" />
          <div className="flex-1 truncate">
            <p className="font-medium truncate">{selectedFile.name}</p>
            <p className="text-xs text-muted-foreground">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSelectedFile(null)}
          >
            Remover
          </Button>
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={downloadTemplate}>
          <Download className="h-4 w-4 mr-2" />
          Baixar modelo
        </Button>
        <Button 
          onClick={handleContinue} 
          disabled={!selectedFile}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default UploadStep;
