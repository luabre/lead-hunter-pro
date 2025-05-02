
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UploadStep from "./steps/UploadStep";
import CleanseStep from "./steps/CleanseStep";
import PreviewStep from "./steps/PreviewStep";
import AssignmentStep from "./steps/AssignmentStep";
import CompletionStep from "./steps/CompletionStep";

interface LeadImportStepperProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
}

const steps = [
  { id: 1, name: "Upload" },
  { id: 2, name: "Limpeza e Enriquecimento" },
  { id: 3, name: "Pré-visualização" },
  { id: 4, name: "Atribuição" },
  { id: 5, name: "Conclusão" }
];

export interface ProcessedData {
  total: number;
  corrected: number;
  enriched: number;
  failed: number;
  leads: any[];
  stats?: {
    total: number;
    enriched: number;
    corrected: number;
    cleansingDetails?: {
      cnpjCorrected: number;
      emailsValidated: number;
      phonesStandardized: number;
      duplicatesRemoved: number;
    };
  };
}

const LeadImportStepper = ({ 
  currentStep, 
  onStepChange,
  onComplete 
}: LeadImportStepperProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null);
  const [assignmentType, setAssignmentType] = useState<string>("auto");

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      onStepChange(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
    }
  };

  const handleUploadComplete = (file: File) => {
    setUploadedFile(file);
    goToNextStep();
  };

  const handleCleanseComplete = (data: ProcessedData) => {
    // Ensure the data has the stats property for the completion step with cleansing details
    const enhancedData = {
      ...data,
      stats: {
        total: data.total,
        enriched: data.enriched,
        corrected: data.corrected,
        cleansingDetails: {
          cnpjCorrected: 23,
          emailsValidated: 187,
          phonesStandardized: 54,
          duplicatesRemoved: 25
        }
      }
    };
    setProcessedData(enhancedData);
    goToNextStep();
  };

  const handleAssignmentComplete = (assignmentType: string) => {
    setAssignmentType(assignmentType);
    goToNextStep();
  };

  const progress = Math.round(((currentStep - 1) / (steps.length - 1)) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Progress bar and steps */}
      <div className="space-y-2">
        <div className="flex justify-between mb-1">
          {steps.map((step) => (
            <div 
              key={step.id}
              className={`text-xs font-medium ${
                step.id === currentStep 
                  ? "text-primary" 
                  : step.id < currentStep 
                  ? "text-muted-foreground" 
                  : "text-muted"
              }`}
            >
              {step.name}
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step content */}
      <div className="mt-6">
        {currentStep === 1 && (
          <UploadStep onComplete={handleUploadComplete} />
        )}
        {currentStep === 2 && uploadedFile && (
          <CleanseStep file={uploadedFile} onComplete={handleCleanseComplete} />
        )}
        {currentStep === 3 && processedData && (
          <PreviewStep data={processedData} onApprove={goToNextStep} onBack={goToPreviousStep} />
        )}
        {currentStep === 4 && (
          <AssignmentStep onComplete={handleAssignmentComplete} onBack={goToPreviousStep} />
        )}
        {currentStep === 5 && processedData && uploadedFile && (
          <CompletionStep 
            file={uploadedFile}
            processedData={processedData}
            assignmentType={assignmentType}
            onFinish={onComplete}
          />
        )}
      </div>
    </div>
  );
};

export default LeadImportStepper;
