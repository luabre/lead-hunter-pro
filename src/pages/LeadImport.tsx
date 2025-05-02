
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import LeadImportStepper from "@/components/import/LeadImportStepper";
import { Card } from "@/components/ui/card";
import { Download, FileType2, Timer, Sparkles, Shield, UserCheck } from "lucide-react";

const LeadImport = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate("/pipeline");
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Download className="size-6 text-primary" />
            <h1 className="text-3xl font-bold">Importação Inteligente de Leads</h1>
          </div>
          <p className="text-muted-foreground mt-1">
            Importe, limpe e enriqueça sua base de leads automaticamente
          </p>
        </div>

        {/* Help badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 flex items-center gap-3">
            <FileType2 className="size-5 text-blue-500" />
            <div className="text-sm">
              <p className="font-medium">Formatos aceitos</p>
              <p className="text-muted-foreground">.xlsx ou .csv até 10 MB</p>
            </div>
          </Card>
          
          <Card className="p-4 flex items-center gap-3">
            <Timer className="size-5 text-amber-500" />
            <div className="text-sm">
              <p className="font-medium">Processamento</p>
              <p className="text-muted-foreground">Menos de 3 minutos para 1000 leads</p>
            </div>
          </Card>
          
          <Card className="p-4 flex items-center gap-3">
            <Shield className="size-5 text-green-500" />
            <div className="text-sm">
              <p className="font-medium">Proteção LGPD</p>
              <p className="text-muted-foreground">Conformidade com normas de proteção</p>
            </div>
          </Card>
        </div>

        {/* Main stepper card */}
        <Card className="p-6">
          <LeadImportStepper 
            currentStep={currentStep} 
            onStepChange={setCurrentStep}
            onComplete={handleComplete}
          />
        </Card>

        {/* Benefits section */}
        {currentStep === 1 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Sparkles className="size-4 text-amber-500" />
              <span>Benefícios da importação inteligente</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/40 p-4 rounded-lg">
                <h4 className="font-medium mb-1">Limpeza automatizada</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Remoção de duplicidades de CNPJ</li>
                  <li>• Correção de e-mails inválidos</li>
                  <li>• Padronização de telefones e contatos</li>
                </ul>
              </div>
              
              <div className="bg-muted/40 p-4 rounded-lg">
                <h4 className="font-medium mb-1">Enriquecimento com IA</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Preenchimento automático de dados faltantes</li>
                  <li>• Classificação por segmento e porte</li>
                  <li>• Detecção de potencial comercial</li>
                </ul>
              </div>
              
              <div className="bg-muted/40 p-4 rounded-lg">
                <h4 className="font-medium mb-1">Auditoria e rastreabilidade</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Log completo de todas as importações</li>
                  <li>• Relatório detalhado de modificações</li>
                  <li>• Conformidade com LGPD</li>
                </ul>
              </div>
              
              <div className="bg-muted/40 p-4 rounded-lg">
                <h4 className="font-medium mb-1">Agilidade operacional</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Distribuição automática para SDRs</li>
                  <li>• Integração direta com o pipeline</li>
                  <li>• Exportação de relatórios completos</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default LeadImport;
