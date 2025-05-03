
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress"; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "recharts";
import { 
  AlertCircle, 
  AlertTriangle, 
  ArrowDown, 
  ArrowRight, 
  ArrowUp, 
  Check, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Lightbulb, 
  Rocket, 
  Target, 
  TrendingDown, 
  TrendingUp, 
  XCircle 
} from "lucide-react";
import { useEffect, useState } from "react";

const PerformanceAIDashboard = () => {
  const [currentGoalProgress, setCurrentGoalProgress] = useState(65);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Helper function to determine goal status color
  const getGoalStatusColor = (progress: number) => {
    if (progress >= 80) return "text-green-500";
    if (progress >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  // Helper function to determine status icon
  const getStatusIcon = (progress: number) => {
    if (progress >= 80) return <CheckCircle2 className="h-6 w-6 text-green-500" />;
    if (progress >= 50) return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
    return <AlertCircle className="h-6 w-6 text-red-500" />;
  };

  // Sample data for the action plan
  const actionPlan = [
    { 
      id: 1, 
      title: "Mover 12 leads para etapa de Proposta", 
      progress: 75, 
      status: "in-progress" 
    },
    { 
      id: 2, 
      title: "Ativar campanha para leads do segmento Enterprise", 
      progress: 100, 
      status: "completed" 
    },
    { 
      id: 3, 
      title: "Agendar 8 novas reuniões", 
      progress: 25, 
      status: "delayed" 
    },
  ];

  // Sample data for the simulator section
  const simulationParams = {
    targetRevenue: "R$1.000.000",
    avgTicket: "R$10.000",
    conversionRates: {
      meetingToProposal: "60%",
      proposalToClose: "40%",
      leadToClose: "10%"
    },
    avgConversionTime: "21 dias"
  };

  // Sample projections
  const projections = {
    closures: 100,
    proposals: 250,
    meetings: 416,
    leadsNeeded: 1000
  };

  // Sample what-if scenarios
  const scenarios = [
    {
      name: "Aumentar ticket médio em 20%",
      impact: "+15% na meta",
      recommendation: "Alta prioridade"
    },
    {
      name: "Ativar IA Closer para aumentar conversão",
      impact: "+8% na meta",
      recommendation: "Média prioridade"
    },
    {
      name: "Campanha para leads inativos",
      impact: "+5% na meta",
      recommendation: "Baixa prioridade"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Goal Status Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Status da Meta</CardTitle>
            <Badge variant={currentGoalProgress >= 80 ? "default" : currentGoalProgress >= 50 ? "secondary" : "destructive"}>
              {currentGoalProgress >= 80 ? "No caminho certo" : currentGoalProgress >= 50 ? "Atenção" : "Meta comprometida"}
            </Badge>
          </div>
          <CardDescription>
            Meta mensal de R$40.000 - Faltam 15 dias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            {getStatusIcon(currentGoalProgress)}
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Progresso</span>
                <span className={`text-sm font-medium ${getGoalStatusColor(currentGoalProgress)}`}>
                  {currentGoalProgress}%
                </span>
              </div>
              <Progress 
                value={currentGoalProgress} 
                className={`h-2 ${
                  currentGoalProgress >= 80 
                    ? "bg-muted text-green-500" 
                    : currentGoalProgress >= 50 
                    ? "bg-muted text-yellow-500" 
                    : "bg-muted text-red-500"
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Realizado</div>
              <div className="text-2xl font-bold">R$26.000</div>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Meta</div>
              <div className="text-2xl font-bold">R$40.000</div>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Projeção</div>
              <div className="text-2xl font-bold text-yellow-500">R$36.400</div>
            </div>
          </div>

          <Alert className="mt-6 border-yellow-500/50 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <AlertTitle className="text-yellow-500">Atenção</AlertTitle>
            <AlertDescription className="text-sm">
              Com o ritmo atual, você alcançará 91% da meta. Recomendamos seguir o plano de ação da IA para atingir 100%.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      
      {/* Action Plan Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Plano de Ação Inteligente</CardTitle>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Exportar Plano
            </Button>
          </div>
          <CardDescription>
            Ações recomendadas pela IA para atingir sua meta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {actionPlan.map(action => (
            <div key={action.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  {action.status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  ) : action.status === "delayed" ? (
                    <Clock className="h-5 w-5 text-red-500 mr-2" />
                  ) : (
                    <Target className="h-5 w-5 text-blue-500 mr-2" />
                  )}
                  <span className="font-medium">{action.title}</span>
                </div>
                <Badge variant={
                  action.status === "completed" ? "outline" : 
                  action.status === "delayed" ? "destructive" : "secondary"
                }>
                  {action.status === "completed" ? "Concluído" : 
                   action.status === "delayed" ? "Atrasado" : "Em andamento"}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Progress 
                    value={action.progress} 
                    className="h-2"
                  />
                </div>
                <span className="text-sm font-medium">{action.progress}%</span>
              </div>
              
              {action.status !== "completed" && (
                <div className="flex justify-end mt-3">
                  <Button variant="outline" size="sm" className="h-8">
                    {action.status === "delayed" ? "Reprogramar" : "Executar agora"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
          
          <Button className="w-full mt-2">
            <Lightbulb className="h-4 w-4 mr-2" />
            Gerar novas recomendações
          </Button>
        </CardContent>
      </Card>

      {/* Simulation Card */}
      <Tabs defaultValue="projection" className="w-full">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Simulador Estratégico</CardTitle>
              <TabsList>
                <TabsTrigger value="projection">Projeção</TabsTrigger>
                <TabsTrigger value="what-if">What-If</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>
              Análise de cenários para atingimento da meta
            </CardDescription>
          </CardHeader>
          
          <TabsContent value="projection" className="mt-0">
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3">Parâmetros atuais</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Meta de faturamento:</span>
                      <span className="font-medium">{simulationParams.targetRevenue}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ticket médio:</span>
                      <span className="font-medium">{simulationParams.avgTicket}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Reunião → Proposta:</span>
                      <span className="font-medium">{simulationParams.conversionRates.meetingToProposal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Proposta → Fechamento:</span>
                      <span className="font-medium">{simulationParams.conversionRates.proposalToClose}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Lead → Fechamento:</span>
                      <span className="font-medium">{simulationParams.conversionRates.leadToClose}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tempo médio de conversão:</span>
                      <span className="font-medium">{simulationParams.avgConversionTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3">Projeção para 90 dias</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/20 rounded-full p-2">
                        <Check className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Fechamentos necessários</div>
                        <div className="font-bold">{projections.closures}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-500/20 rounded-full p-2">
                        <FileText className="h-4 w-4 text-indigo-500" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Propostas a enviar</div>
                        <div className="font-bold">{projections.proposals}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500/20 rounded-full p-2">
                        <Calendar className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Reuniões a agendar</div>
                        <div className="font-bold">{projections.meetings}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-500/20 rounded-full p-2">
                        <Users className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Leads necessários</div>
                        <div className="font-bold">{projections.leadsNeeded}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Alert className="bg-blue-500/10 border-blue-500/50">
                <Lightbulb className="h-4 w-4 text-blue-500" />
                <AlertTitle className="text-blue-500">Insight da IA</AlertTitle>
                <AlertDescription className="text-sm">
                  Com sua taxa de conversão atual, você precisará de um pipeline 10x maior que sua meta. 
                  Recomendamos focar em melhorar a conversão de proposta → fechamento para reduzir o 
                  volume de leads necessários.
                </AlertDescription>
              </Alert>
            </CardContent>
          </TabsContent>

          <TabsContent value="what-if" className="mt-0">
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Cenários alternativos</h3>
                
                {scenarios.map((scenario, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="font-medium">{scenario.name}</div>
                      <Badge 
                        variant={
                          scenario.recommendation === "Alta prioridade" ? "default" :
                          scenario.recommendation === "Média prioridade" ? "secondary" : "outline"
                        }
                      >
                        {scenario.recommendation}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-500 font-medium">{scenario.impact}</span>
                    </div>
                    
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      Simular este cenário
                    </Button>
                  </div>
                ))}
                
                <Button variant="secondary" className="w-full">
                  <Rocket className="h-4 w-4 mr-2" />
                  Criar cenário personalizado
                </Button>
              </div>
            </CardContent>
          </TabsContent>
          
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full">
              Exportar simulação como relatório
            </Button>
          </CardFooter>
        </Card>
      </Tabs>

      {/* Monthly Learning Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Ciclo Mensal de Aprendizado</CardTitle>
          <CardDescription>
            Retrospectiva e recomendações para o próximo ciclo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="flex items-center text-sm font-medium mb-3">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
              O que funcionou bem
            </h3>
            <ul className="text-sm space-y-2">
              <li className="flex gap-2">
                <span className="text-green-500">•</span>
                <span>Aumento de 12% na taxa de conversão de reuniões para propostas</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">•</span>
                <span>Campanhas para segmento Enterprise tiveram ROI 3x maior</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">•</span>
                <span>Follow-ups automáticos reduziram tempo de ciclo em 15%</span>
              </li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="flex items-center text-sm font-medium mb-3">
              <XCircle className="h-4 w-4 text-red-500 mr-2" />
              O que bloqueou o atingimento
            </h3>
            <ul className="text-sm space-y-2">
              <li className="flex gap-2">
                <span className="text-red-500">•</span>
                <span>Queda de 8% na taxa de retorno de cold emails</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500">•</span>
                <span>20% de no-shows em reuniões agendadas</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500">•</span>
                <span>Atraso médio de 7 dias para envio de propostas</span>
              </li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="flex items-center text-sm font-medium mb-3">
              <ArrowRight className="h-4 w-4 text-blue-500 mr-2" />
              Recomendações para o próximo ciclo
            </h3>
            <ul className="text-sm space-y-2">
              <li className="flex gap-2">
                <span className="text-blue-500">1.</span>
                <span>Implementar confirmação automatizada de reuniões</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500">2.</span>
                <span>Revisar scripts de email com IA Writer</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500">3.</span>
                <span>Definir SLA de 48h para envio de propostas</span>
              </li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="flex items-center text-sm font-medium mb-3">
              <Target className="h-4 w-4 text-indigo-500 mr-2" />
              Sugestão de meta para o próximo mês
            </h3>
            <div className="flex items-center gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Meta atual</div>
                <div className="font-medium">R$40.000</div>
              </div>
              
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              
              <div>
                <div className="text-sm text-muted-foreground">Meta sugerida</div>
                <div className="font-medium">R$44.000</div>
              </div>
              
              <Badge className="ml-auto" variant="outline">
                <ArrowUp className="h-3 w-3 mr-1" />
                +10%
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Baseado em tendência de crescimento e melhorias de processo
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full gap-3">
            <Button variant="outline" className="flex-1">
              Ajustar recomendações
            </Button>
            <Button className="flex-1">
              Aplicar para próximo ciclo
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PerformanceAIDashboard;
