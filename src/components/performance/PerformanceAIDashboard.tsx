
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  TrendingUp,
  Calendar,
  CheckSquare,
  Flag,
  BarChart2,
  RotateCcw,
  BarChart,
  ChevronRight,
  Rocket,
} from "lucide-react";

// Mock data for demonstration
const goalData = {
  targetAmount: 40000,
  currency: "R$",
  remainingDays: 15,
  goalProgress: 62,
  goalStatus: "warning", // "success", "warning", "danger"
  requiredLeadsToProposal: 12,
  suggestedCampaignSegment: "Tecnologia",
  requiredMeetings: 8,
  conversionRate: 25,
  riskFactors: ["Tempo médio de conversão aumentando", "Volume de leads insuficiente"],
  actionItems: [
    { id: 1, text: "Mover 12 leads para etapa de Proposta", completed: true },
    { id: 2, text: "Ativar campanha para leads do segmento Tecnologia", completed: false },
    { id: 3, text: "Agendar 8 novas reuniões", completed: false },
    { id: 4, text: "Follow-up em leads qualificados há mais de 7 dias", completed: true },
  ],
  monthlyLearning: {
    successes: [
      "Campanhas para o segmento Financeiro tiveram 30% mais conversão",
      "Follow-ups automáticos aumentaram taxa de resposta em 22%"
    ],
    blockers: [
      "Alto índice de no-show nas reuniões (26%)",
      "Tempo médio de decisão aumentou para 35 dias"
    ],
    adjustments: [
      "Implementar confirmação de reunião 2h antes",
      "Revisar proposta de valor para acelerar decisões"
    ],
    nextMonthSuggestion: "R$ 45.000 (aumento de 12,5% baseado no crescimento do funil)"
  },
  forecast: {
    ticketAverage: 10000,
    conversionRates: {
      meetingToProposal: 60,
      proposalToClosing: 40,
      leadToClosing: 10
    },
    avgConversionTime: 21,
    noShowRate: 15,
    requiredNumbers: {
      closings: 100,
      proposals: 250,
      meetings: 416,
      initialLeads: 1000
    },
    currentState: {
      closings: 2,
      proposals: 5,
      meetings: 10,
      initialLeads: 38
    },
    warnings: [
      "Meta atual exige 15 fechamentos/semana – você está em 9",
      "Conversão caiu abaixo de 7%. A IA recomenda rever segmentação da campanha ativa"
    ]
  }
};

const PerformanceAIDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("monitoring");
  const [simulatedTicketIncrease, setSimulatedTicketIncrease] = useState(false);
  const [simulatedConversionIncrease, setSimulatedConversionIncrease] = useState(false);
  const [simulatedCampaignActive, setSimulatedCampaignActive] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case "danger":
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "success":
        return "Você está no caminho certo";
      case "warning":
        return "Atenção: risco de não atingir a meta";
      case "danger":
        return "Meta comprometida: aja agora!";
      default:
        return "Você está no caminho certo";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "danger":
        return "bg-red-500";
      default:
        return "bg-green-500";
    }
  };

  const handleActivateCampaign = () => {
    // In a real app, this would trigger a campaign creation flow
    // For now, we'll just show a simulation
    setSimulatedCampaignActive(true);
  };

  // Calculate simulated projections based on what-if scenarios
  const calculateSimulatedProjection = () => {
    let projectedAmount = goalData.forecast.currentState.closings * goalData.forecast.ticketAverage;
    let projectedPercentage = (projectedAmount / goalData.targetAmount) * 100;
    
    // Apply simulation effects
    if (simulatedTicketIncrease) {
      projectedAmount *= 1.2; // 20% increase in ticket size
      projectedPercentage = (projectedAmount / goalData.targetAmount) * 100;
    }
    
    if (simulatedConversionIncrease) {
      projectedAmount *= 1.15; // 15% increase from better conversion
      projectedPercentage = (projectedAmount / goalData.targetAmount) * 100;
    }
    
    if (simulatedCampaignActive) {
      projectedAmount *= 1.3; // 30% increase from campaign
      projectedPercentage = (projectedAmount / goalData.targetAmount) * 100;
    }
    
    return {
      amount: Math.round(projectedAmount),
      percentage: Math.min(100, Math.round(projectedPercentage))
    };
  };

  const simulatedProjection = calculateSimulatedProjection();

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="w-full lg:w-2/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Radar de Metas e Performance com IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monitoring" onValueChange={setSelectedTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
                <TabsTrigger value="plan">Plano de Ação</TabsTrigger>
                <TabsTrigger value="execution">Execução</TabsTrigger>
                <TabsTrigger value="learning">Aprendizado</TabsTrigger>
                <TabsTrigger value="simulator">Simulador</TabsTrigger>
              </TabsList>
              
              {/* Monitoramento Tab */}
              <TabsContent value="monitoring" className="space-y-4">
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  {getStatusIcon(goalData.goalStatus)}
                  <div className="flex-1">
                    <h3 className="font-medium">{getStatusMessage(goalData.goalStatus)}</h3>
                    <p className="text-sm text-muted-foreground">
                      Meta: {goalData.currency}{goalData.targetAmount.toLocaleString()} • Restam {goalData.remainingDays} dias
                    </p>
                    <div className="mt-2">
                      <Progress value={goalData.goalProgress} className={`h-2 ${getStatusColor(goalData.goalStatus)}`} />
                      <p className="text-xs text-right mt-1">{goalData.goalProgress}% concluído</p>
                    </div>
                  </div>
                </div>
                
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Análise de Proximidade da Meta</AlertTitle>
                  <AlertDescription>
                    <p className="mt-2">
                      Para alcançar sua meta de {goalData.currency}{goalData.targetAmount.toLocaleString()} faltando {goalData.remainingDays} dias, você precisa:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Mover {goalData.requiredLeadsToProposal} leads para a etapa de Proposta</li>
                      <li>Ativar uma campanha para leads do segmento {goalData.suggestedCampaignSegment}</li>
                      <li>Agendar pelo menos {goalData.requiredMeetings} novas reuniões com taxa de conversão histórica de {goalData.conversionRate}%</li>
                    </ul>
                    <p className="mt-2 font-medium">Fatores de risco identificados pela IA:</p>
                    <ul className="list-disc list-inside mt-1">
                      {goalData.riskFactors.map((risk, index) => (
                        <li key={index} className="text-sm">{risk}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
                
                <div className="flex justify-end">
                  <Button>
                    Ver plano de ação completo
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              {/* Plano de Ação Tab */}
              <TabsContent value="plan" className="space-y-4">
                <Alert>
                  <Flag className="h-4 w-4" />
                  <AlertTitle>Plano de Ação Inteligente (Gerado pela IA)</AlertTitle>
                  <AlertDescription>
                    <p className="mt-2">
                      Para alcançar sua meta de {goalData.currency}{goalData.targetAmount.toLocaleString()} faltando {goalData.remainingDays} dias, a IA elaborou o seguinte plano:
                    </p>
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-3">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Ativar campanha para segmento {goalData.suggestedCampaignSegment}</h4>
                          <p className="text-sm text-muted-foreground">
                            Histórico: 26% de taxa de resposta e 10% de conversão para reunião
                          </p>
                        </div>
                        <Button onClick={handleActivateCampaign}>
                          <Rocket className="mr-2 h-4 w-4" />
                          Ativar Campanha
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Follow-up em leads qualificados</h4>
                          <p className="text-sm text-muted-foreground">
                            12 leads sem interações nos últimos 7 dias
                          </p>
                        </div>
                        <Button variant="outline">
                          <Calendar className="mr-2 h-4 w-4" />
                          Agendar Follow-up
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Intensificar agendamentos</h4>
                          <p className="text-sm text-muted-foreground">
                            Meta: {goalData.requiredMeetings} novas reuniões nesta semana
                          </p>
                        </div>
                        <Button variant="outline">
                          <Calendar className="mr-2 h-4 w-4" />
                          Ver Leads Prioritários
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Execução Tab */}
              <TabsContent value="execution" className="space-y-4">
                <Alert>
                  <BarChart className="h-4 w-4" />
                  <AlertTitle>Acompanhamento de Execução</AlertTitle>
                  <AlertDescription>
                    A IA está monitorando se o plano está sendo seguido conforme o cronograma.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-3">
                  {goalData.actionItems.map((action) => (
                    <Card key={action.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            {action.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            )}
                            <div>
                              <h4 className="font-medium">{action.text}</h4>
                              <p className="text-sm text-muted-foreground">
                                {action.completed ? (
                                  "Ação completada ✅"
                                ) : (
                                  "Ação pendente ⚠️"
                                )}
                              </p>
                            </div>
                          </div>
                          {!action.completed && (
                            <Button variant="outline" size="sm">
                              <CheckSquare className="mr-2 h-4 w-4" />
                              Marcar como concluída
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-4">
                  <Progress 
                    value={50} 
                    className="h-2 bg-gray-200" 
                    indicatorClassName="bg-blue-500" 
                  />
                  <p className="text-sm mt-1 text-center">Progresso geral do plano: 50%</p>
                </div>
              </TabsContent>
              
              {/* Aprendizado Tab */}
              <TabsContent value="learning" className="space-y-4">
                <Alert>
                  <RotateCcw className="h-4 w-4" />
                  <AlertTitle>Ciclo Mensal de Aprendizado</AlertTitle>
                  <AlertDescription>
                    Análise de resultados e recomendações para o próximo ciclo.
                  </AlertDescription>
                </Alert>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">O que funcionou</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {goalData.monthlyLearning.successes.map((item, index) => (
                        <li key={index} className="flex gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">O que bloqueou o atingimento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {goalData.monthlyLearning.blockers.map((item, index) => (
                        <li key={index} className="flex gap-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">O que precisa ser ajustado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {goalData.monthlyLearning.adjustments.map((item, index) => (
                        <li key={index} className="flex gap-2">
                          <Flag className="h-5 w-5 text-blue-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sugestão de nova meta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-lg font-medium">{goalData.monthlyLearning.nextMonthSuggestion}</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Simulador Tab */}
              <TabsContent value="simulator" className="space-y-4">
                <Alert>
                  <BarChart2 className="h-4 w-4" />
                  <AlertTitle>Simulador de Cenários e Meta Inteligente</AlertTitle>
                  <AlertDescription>
                    Experimente diferentes cenários para descobrir como alcançar sua meta.
                  </AlertDescription>
                </Alert>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Meta atual</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm text-muted-foreground">Valor da meta</h4>
                          <p className="text-2xl font-bold">{goalData.currency}{goalData.targetAmount.toLocaleString()}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm text-muted-foreground">Projeção atual</h4>
                          <div className="flex items-end gap-2">
                            <p className="text-2xl font-bold text-yellow-600">
                              {goalData.currency}{(goalData.forecast.currentState.closings * goalData.forecast.ticketAverage).toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ({Math.round((goalData.forecast.currentState.closings * goalData.forecast.ticketAverage / goalData.targetAmount) * 100)}% da meta)
                            </p>
                          </div>
                          <Progress 
                            value={Math.round((goalData.forecast.currentState.closings * goalData.forecast.ticketAverage / goalData.targetAmount) * 100)} 
                            className="h-2 mt-2 bg-gray-100" 
                          />
                        </div>
                        
                        <div className="pt-2">
                          <h4 className="text-sm text-muted-foreground">Para alcançar sua meta você precisa:</h4>
                          <ul className="mt-2 space-y-1">
                            <li className="flex justify-between">
                              <span>Fechamentos</span>
                              <span className="font-medium">{goalData.forecast.requiredNumbers.closings}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Propostas</span>
                              <span className="font-medium">{goalData.forecast.requiredNumbers.proposals}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Reuniões</span>
                              <span className="font-medium">{goalData.forecast.requiredNumbers.meetings}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Leads iniciais</span>
                              <span className="font-medium">{goalData.forecast.requiredNumbers.initialLeads}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Simulador (What-If)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-sm">
                              E se você aumentar o ticket médio em 20%?
                            </label>
                            <Button 
                              variant={simulatedTicketIncrease ? "default" : "outline"} 
                              size="sm"
                              onClick={() => setSimulatedTicketIncrease(!simulatedTicketIncrease)}
                            >
                              {simulatedTicketIncrease ? "Ativado" : "Simular"}
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <label className="text-sm">
                              E se subir a taxa de conversão com IA Closer?
                            </label>
                            <Button 
                              variant={simulatedConversionIncrease ? "default" : "outline"} 
                              size="sm"
                              onClick={() => setSimulatedConversionIncrease(!simulatedConversionIncrease)}
                            >
                              {simulatedConversionIncrease ? "Ativado" : "Simular"}
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <label className="text-sm">
                              E se ativar campanha para leads inativos?
                            </label>
                            <Button 
                              variant={simulatedCampaignActive ? "default" : "outline"} 
                              size="sm"
                              onClick={() => setSimulatedCampaignActive(!simulatedCampaignActive)}
                            >
                              {simulatedCampaignActive ? "Ativado" : "Simular"}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <h4 className="text-sm text-muted-foreground">Projeção simulada</h4>
                          <div className="flex items-end gap-2">
                            <p className="text-2xl font-bold text-green-600">
                              {goalData.currency}{simulatedProjection.amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ({simulatedProjection.percentage}% da meta)
                            </p>
                          </div>
                          <Progress 
                            value={simulatedProjection.percentage} 
                            className="h-2 mt-2 bg-gray-100" 
                          />
                        </div>
                        
                        <Alert className="mt-4 bg-blue-50">
                          <AlertCircle className="h-4 w-4 text-blue-600" />
                          <AlertTitle className="text-blue-700">Recomendação da IA</AlertTitle>
                          <AlertDescription className="text-blue-700">
                            A combinação de maior ticket médio e campanha focada tem o maior impacto. Priorize estas ações para maximizar resultados.
                          </AlertDescription>
                        </Alert>
                        
                        <Button className="w-full mt-2">
                          Implementar estas estratégias
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-4">
                  {goalData.forecast.warnings.map((warning, index) => (
                    <Alert key={index} variant="destructive" className="mb-2">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        {warning}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="w-full lg:w-1/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Diagnóstico IA e Ações</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="bg-yellow-50 border-yellow-200 mb-4">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertTitle className="text-yellow-700">Alerta de Performance</AlertTitle>
              <AlertDescription className="text-yellow-700">
                Pipeline abaixo do volume projetado. Para bater sua meta de {goalData.currency}300K este mês, você deveria ter 60 leads em negociação. Hoje, tem 38. Você está 36% abaixo do volume ideal.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Flag className="h-4 w-4 text-primary" />
                  Taxa de agendamento baixa
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Sua taxa está em 18%, abaixo da média saudável de 25%. Isso pode impactar os fechamentos em 15 dias.
                </p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  Reativar leads "quase ativos"
                </Button>
              </div>
              
              <div className="border rounded-lg p-3">
                <h3 className="font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  Conversão em queda
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  A conversão de proposta para fechamento caiu para 22%. O padrão anterior era 38%.
                </p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  Revisar copy dos gatilhos de proposta
                </Button>
              </div>
              
              <div className="border rounded-lg p-3 bg-green-50">
                <h3 className="font-medium flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Plano de ação calculado
                </h3>
                <p className="text-sm mt-1 text-green-700">
                  Para atingir {goalData.currency}100.000 em 18 dias, você precisa gerar +60 leads qualificados, com 15 propostas adicionais e 12 fechamentos.
                </p>
                <Button className="mt-2 w-full bg-green-600 hover:bg-green-700">
                  <Rocket className="mr-2 h-4 w-4" />
                  Ativar campanha expressa
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceAIDashboard;
