
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock, FileDown, FileUp, Brain, RefreshCcw, Activity, Rocket, Database } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AdvancedFeaturesToggle = () => {
  const [features, setFeatures] = useState({
    iaCloser: false,
    importLeads: false,
    cleanseBase: false,
    silentRadar: false,
    autoTriggers: false,
    learningByConversion: false
  });
  
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState('');

  const toggleFeature = (feature: string, requiresApproval: boolean) => {
    if (requiresApproval) {
      setCurrentFeature(feature);
      setApprovalModalOpen(true);
      return;
    }
    
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature as keyof typeof prev]
    }));
    
    const featureNames: Record<string, string> = {
      iaCloser: "Degustação com IA Closer",
      silentRadar: "Radar Silencioso"
    };
    
    const status = !features[feature as keyof typeof features] ? "ativado" : "desativado";
    toast.success(`${featureNames[feature]} ${status} com sucesso!`);
  };
  
  const handleApprovalRequest = () => {
    setApprovalModalOpen(false);
    toast.info(`Solicitação de aprovação para "${getFeatureName(currentFeature)}" enviada ao gestor.`, {
      description: "Você receberá uma notificação quando for aprovada."
    });
  };

  const getFeatureName = (feature: string): string => {
    const featureNames: Record<string, string> = {
      importLeads: "Importar Planilha de Leads",
      cleanseBase: "Cleanse de Base",
      autoTriggers: "Gatilhos Automáticos",
      learningByConversion: "Aprendizado por Conversão"
    };
    
    return featureNames[feature] || feature;
  };
  
  return (
    <>
      <Card className="border-blue-200 bg-blue-50/20 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-blue-600" />
            Modo Laboratório
          </CardTitle>
          <CardDescription>
            Ative recursos avançados do Gerente de IA para potencializar seus resultados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="bg-amber-50 border-amber-200">
            <Activity className="h-4 w-4 text-amber-500" />
            <AlertTitle>Recursos experimentais</AlertTitle>
            <AlertDescription>
              Os recursos do Modo Laboratório são funções avançadas que podem requerer aprovação do gestor. 
              Alguns deles funcionam de forma autônoma sem supervisão humana.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recursos Sem Aprovação</CardTitle>
            <CardDescription>
              Recursos que podem ser ativados diretamente por você
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600 mt-1">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <Label htmlFor="ia-closer" className="text-base font-medium">Degustação com IA Closer</Label>
                  <p className="text-sm text-muted-foreground">
                    Ativa envio de teste com tracking inteligente
                  </p>
                </div>
              </div>
              <Switch
                id="ia-closer"
                checked={features.iaCloser}
                onCheckedChange={() => toggleFeature('iaCloser', false)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-1">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <Label htmlFor="silent-radar" className="text-base font-medium">Radar Silencioso</Label>
                  <p className="text-sm text-muted-foreground">
                    IA monitora leads em segundo plano e gera alertas
                  </p>
                </div>
              </div>
              <Switch
                id="silent-radar"
                checked={features.silentRadar}
                onCheckedChange={() => toggleFeature('silentRadar', false)}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recursos com Aprovação</CardTitle>
            <CardDescription>
              Recursos que necessitam de aprovação do gestor
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-full text-amber-600 mt-1">
                  <FileUp className="h-5 w-5" />
                </div>
                <div>
                  <Label htmlFor="import-leads" className="text-base font-medium">
                    Importar Planilha de Leads
                    <Badge variant="outline" className="ml-2 border-amber-500 text-amber-700">Aprovação</Badge>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    IA verifica, deduplica e enriquece dados
                  </p>
                </div>
              </div>
              <Switch
                id="import-leads"
                checked={features.importLeads}
                onCheckedChange={() => toggleFeature('importLeads', true)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-full text-purple-600 mt-1">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <Label htmlFor="cleanse-base" className="text-base font-medium">
                    Cleanse de Base
                    <Badge variant="outline" className="ml-2 border-amber-500 text-amber-700">Aprovação</Badge>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Remove duplicidade, corrige campos e normaliza
                  </p>
                </div>
              </div>
              <Switch
                id="cleanse-base"
                checked={features.cleanseBase}
                onCheckedChange={() => toggleFeature('cleanseBase', true)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 mt-1">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <Label htmlFor="auto-triggers" className="text-base font-medium">
                    Gatilhos Automáticos
                    <Badge variant="outline" className="ml-2 border-amber-500 text-amber-700">Aprovação</Badge>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Ex: disparo de follow-up após abertura de proposta
                  </p>
                </div>
              </div>
              <Switch
                id="auto-triggers"
                checked={features.autoTriggers}
                onCheckedChange={() => toggleFeature('autoTriggers', true)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-full text-red-600 mt-1">
                  <RefreshCcw className="h-5 w-5" />
                </div>
                <div>
                  <Label htmlFor="learning-conversion" className="text-base font-medium">
                    Aprendizado por Conversão
                    <Badge variant="outline" className="ml-2 border-amber-500 text-amber-700">Aprovação</Badge>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    IA ajusta prioridades com base no que converte mais
                  </p>
                </div>
              </div>
              <Switch
                id="learning-conversion"
                checked={features.learningByConversion}
                onCheckedChange={() => toggleFeature('learningByConversion', true)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Modal de Aprovação */}
      <Dialog open={approvalModalOpen} onOpenChange={setApprovalModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Esta ação requer aprovação</DialogTitle>
            <DialogDescription>
              A ativação de "{getFeatureName(currentFeature)}" requer aprovação do gestor devido às políticas de segurança e LGPD.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Ao solicitar aprovação, seu gestor receberá uma notificação e poderá aprovar ou negar esta solicitação. 
              Você será notificado quando houver uma resposta.
            </p>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md">
              <div className="flex items-start gap-2">
                <Activity className="h-4 w-4 text-amber-600 mt-0.5" />
                <p className="text-sm text-amber-700">
                  Este recurso pode impactar os dados de leads e campanhas. 
                  Seu uso será registrado para fins de auditoria.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApprovalModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleApprovalRequest}>Solicitar Aprovação</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdvancedFeaturesToggle;
