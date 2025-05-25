
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp, Target, Clock, Zap } from "lucide-react";

interface SimulationParams {
  revenueGoal: number;
  averageTicket: number;
  conversionRate: number;
  cycleTime: number;
  campaignType: string;
  automationLevel: number;
}

interface SimulationResults {
  closingsNeeded: number;
  proposalsNeeded: number;
  meetingsNeeded: number;
  leadsNeeded: number;
  effortReduction: number;
}

const ScenarioSimulatorModal = () => {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState<SimulationParams>({
    revenueGoal: 1000000,
    averageTicket: 10000,
    conversionRate: 4.8,
    cycleTime: 21,
    campaignType: "misto",
    automationLevel: 50
  });

  const [results, setResults] = useState<SimulationResults | null>(null);

  const calculateScenario = () => {
    const closingsNeeded = Math.ceil(params.revenueGoal / params.averageTicket);
    const proposalsNeeded = Math.ceil(closingsNeeded / 0.4); // 40% conversion from proposal to close
    const meetingsNeeded = Math.ceil(proposalsNeeded / 0.6); // 60% conversion from meeting to proposal
    const leadsNeeded = Math.ceil(meetingsNeeded / (params.conversionRate / 100));
    
    // Calculate effort reduction based on automation level
    const baseEffortReduction = (params.automationLevel / 100) * 30; // Max 30% reduction
    const effortReduction = Math.round(baseEffortReduction);

    setResults({
      closingsNeeded,
      proposalsNeeded,
      meetingsNeeded,
      leadsNeeded,
      effortReduction
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleParamChange = (key: keyof SimulationParams, value: number | string) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Calculator className="h-4 w-4 mr-2" />
          Simular Meu Cenário
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Simule seu plano ideal
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Insira seus próprios números e veja quantas propostas, reuniões e leads você realmente precisa para alcançar sua meta.
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Parâmetros Personalizáveis</h3>
            
            <div className="space-y-2">
              <Label htmlFor="revenueGoal">🎯 Meta de faturamento</Label>
              <Input
                id="revenueGoal"
                type="number"
                value={params.revenueGoal}
                onChange={(e) => handleParamChange('revenueGoal', Number(e.target.value))}
                placeholder="1000000"
              />
              <p className="text-xs text-muted-foreground">Meta total que você quer alcançar</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="averageTicket">💸 Ticket médio</Label>
              <Input
                id="averageTicket"
                type="number"
                value={params.averageTicket}
                onChange={(e) => handleParamChange('averageTicket', Number(e.target.value))}
                placeholder="10000"
              />
              <p className="text-xs text-muted-foreground">Valor médio das vendas realizadas</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="conversionRate">🔁 Taxa de conversão (%)</Label>
              <Input
                id="conversionRate"
                type="number"
                step="0.1"
                value={params.conversionRate}
                onChange={(e) => handleParamChange('conversionRate', Number(e.target.value))}
                placeholder="4.8"
              />
              <p className="text-xs text-muted-foreground">% de leads que viram clientes</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cycleTime">📆 Tempo médio de conversão (dias)</Label>
              <Input
                id="cycleTime"
                type="number"
                value={params.cycleTime}
                onChange={(e) => handleParamChange('cycleTime', Number(e.target.value))}
                placeholder="21"
              />
              <p className="text-xs text-muted-foreground">Tempo médio para um lead se converter em venda</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaignType">🧠 Tipo de campanha</Label>
              <Select value={params.campaignType} onValueChange={(value) => handleParamChange('campaignType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ia">IA Ativa</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="misto">IA + Manual</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Permitir simular cenários separados</p>
            </div>

            <div className="space-y-2">
              <Label>⚙️ Nível de automação: {params.automationLevel}%</Label>
              <Slider
                value={[params.automationLevel]}
                onValueChange={(value) => handleParamChange('automationLevel', value[0])}
                max={100}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Simula impacto de automação no processo</p>
            </div>

            <Button onClick={calculateScenario} className="w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              Gerar Cenário
            </Button>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Resultado Simulado</h3>
            
            {results ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Números necessários</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Fechamentos necessários:</span>
                      <span className="font-medium">{results.closingsNeeded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Propostas que precisam ser feitas:</span>
                      <span className="font-medium">{results.proposalsNeeded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Reuniões esperadas:</span>
                      <span className="font-medium">{results.meetingsNeeded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Leads ativos a manter:</span>
                      <span className="font-medium">{results.leadsNeeded}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Impacto da Automação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Economia de esforço:</span>
                      <span className="font-medium text-green-600">
                        -{results.effortReduction}% de prospecção
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Com {params.automationLevel}% de automação
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-blue-800">💡 Sugestão Inteligente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-blue-700">
                      {params.campaignType === 'ia' 
                        ? `Ative campanhas IA para ${params.automationLevel > 70 ? 'múltiplos segmentos' : 'segmentos prioritários'} para atingir essa meta em ${Math.ceil(params.cycleTime * 0.8)} dias.`
                        : params.campaignType === 'manual'
                        ? `Considere automatizar ${100 - params.automationLevel}% do processo para reduzir o esforço manual.`
                        : `Balanceie IA e ações manuais para otimizar conversão e reduzir tempo de ciclo.`
                      }
                    </p>
                  </CardContent>
                </Card>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-sm font-medium mb-2">📈 Resumo do Cenário</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Meta: {formatCurrency(params.revenueGoal)}</p>
                    <p>Ticket médio: {formatCurrency(params.averageTicket)}</p>
                    <p>Conversão: {params.conversionRate}%</p>
                    <p>Ciclo: {params.cycleTime} dias</p>
                    <p>Automação: {params.automationLevel}%</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Preencha os parâmetros e clique em "Gerar Cenário"</p>
                  <p className="text-sm">para ver os resultados da simulação</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScenarioSimulatorModal;
