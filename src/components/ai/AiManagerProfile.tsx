
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Brain, Activity, Database, RefreshCcw } from "lucide-react";

const AiManagerProfile = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-4 rounded-full">
              <Brain className="h-10 w-10" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>Gerente de IA</CardTitle>
                <Badge className="bg-green-500">Online</Badge>
              </div>
              <CardDescription>
                Coordenador digital autônomo
              </CardDescription>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline">Configurações</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Ver Relatório Completo
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-lg">
                <span className="font-semibold">Resumo do dia:</span> O gerente de IA identificou <span className="font-semibold text-blue-600">7 oportunidades quentes</span> nas últimas 24 horas. Ele reorganizou o pipeline para priorizar os leads com maior chance de conversão, ajustou scripts em 3 campanhas e enviou 42 mensagens personalizadas para reengajamento.
              </p>
            </div>
            
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card p-3 border rounded-md">
                <p className="text-sm text-muted-foreground">Leads Prioritários</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="bg-card p-3 border rounded-md">
                <p className="text-sm text-muted-foreground">Tarefas Pendentes</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="bg-card p-3 border rounded-md">
                <p className="text-sm text-muted-foreground">Taxa de Resposta</p>
                <p className="text-2xl font-bold">28%</p>
              </div>
              <div className="bg-card p-3 border rounded-md">
                <p className="text-sm text-muted-foreground">Oportunidades</p>
                <p className="text-2xl font-bold">32</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Performance do Sistema</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Processamento</span>
                  <span>84%</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base de Conhecimento</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Acurácia</span>
                  <span>97%</span>
                </div>
                <Progress value={97} className="h-2" />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Aprendizado</span>
                  <span>76%</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full text-blue-600">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Em monitoramento ativo</h3>
              <p className="text-sm text-muted-foreground">24h por dia, 7 dias por semana</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full text-green-600">
              <RefreshCcw className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Aprendizagem contínua</h3>
              <p className="text-sm text-muted-foreground">Se adapta aos padrões de sucesso</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full text-purple-600">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Insights em tempo real</h3>
              <p className="text-sm text-muted-foreground">Detecta oportunidades automaticamente</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiManagerProfile;
