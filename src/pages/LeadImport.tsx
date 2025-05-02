
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import LeadImportStepper from "@/components/import/LeadImportStepper";
import { Card } from "@/components/ui/card";

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
          <h1 className="text-3xl font-bold">Importação Inteligente de Leads</h1>
          <p className="text-muted-foreground mt-1">
            Importe, limpe e enriqueça sua base de leads automaticamente
          </p>
        </div>

        <Card className="p-6">
          <LeadImportStepper 
            currentStep={currentStep} 
            onStepChange={setCurrentStep}
            onComplete={handleComplete}
          />
        </Card>
      </div>
    </AppLayout>
  );
};

export default LeadImport;
