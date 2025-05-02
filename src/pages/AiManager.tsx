
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertBox } from "@/components/common/AlertBox";
import { 
  Brain, 
  ChartBar, 
  Clock, 
  FileDown, 
  FileUp, 
  Lightbulb, 
  Rocket, 
  BarChart, 
  Calendar, 
  RefreshCcw, 
  Megaphone, 
  Package, 
  Activity, 
  Shield, 
  Database
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import AdvancedFeaturesToggle from "@/components/ai/AdvancedFeaturesToggle";
import AiManagerProfile from "@/components/ai/AiManagerProfile";
import AiActionTimeline from "@/components/ai/AiActionTimeline";
import ApprovalWorkflow from "@/components/ai/ApprovalWorkflow";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AiManager = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [autonomyLevel, setAutonomyLevel] = useState("observer");

  const handleActivate = () => {
    toast.success("Gerente de IA ativado com sucesso!", {
      description: `Nível de autonomia: ${
        autonomyLevel === "observer" 
          ? "Observador" 
          : autonomyLevel === "assisted" 
            ? "Intervenção Assistida" 
            : "Autonomia Total"
      }`
    });
    setIsDialogOpen(false);
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">Gerente de IA</h1>
            <Badge className="bg-blue-600">Perfil Inteligente</Badge>
          </div>
          <p className="text-muted-foreground">
            Coordenador digital autônomo que orquestra e otimiza a plataforma
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsDialogOpen(true)}
              >
                <Brain className="h-5 w-5 mr-2" />
                Ativar Assistente
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Ligue o Gerente de IA para agir de forma autônoma: ele analisará, alertará e 
                recomendará ações em tempo real para melhorar sua operação de prospecção.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Ative o Assistente de IA – Escolha o Nível de Autonomia</DialogTitle>
            <DialogDescription>
              O Gerente de IA é um coordenador digital que otimiza sua operação de prospecção. 
              Você pode escolher até onde ele pode agir automaticamente.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-6">
            <RadioGroup value={autonomyLevel} onValueChange={setAutonomyLevel}>
              <div className="space-y-6">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="observer" id="observer" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="observer" className="text-base font-medium flex items-center gap-2">
                      1️⃣ Observador (Somente Relatórios)
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      O Gerente de IA coleta dados, emite alertas e envia sugestões — mas não executa nenhuma ação automaticamente.
                    </p>
                    <p className="text-xs text-blue-600">
                      📊 Recomendado para: empresas que preferem controle manual.
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="assisted" id="assisted" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="assisted" className="text-base font-medium flex items-center gap-2">
                      2️⃣ Intervenção Assistida
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      A IA pode sugerir ações e executar apenas tarefas de baixo risco (como mudar scripts, reordenar leads no funil, sugerir horário de reunião).
                    </p>
                    <p className="text-xs text-amber-600">
                      🛡️ Ações sensíveis requerem aprovação.
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="full" id="full" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="full" className="text-base font-medium flex items-center gap-2">
                      3️⃣ Autonomia Total
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      O Gerente de IA atua como um gerente de vendas sênior: executa ajustes, dispara nudges, reorganiza leads e otimiza scripts automaticamente.
                    </p>
                    <p className="text-xs text-green-600">
                      🔒 Tudo fica registrado e pode ser auditado no painel.
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleActivate}>
              Ativar com este nível
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="advanced">Modo Laboratório</TabsTrigger>
          <TabsTrigger value="approvals">Aprovações</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="overview" className="space-y-6">
          <AiManagerProfile />
          
          {/* Funções Práticas e Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" /> 
                    Funções Práticas
                  </CardTitle>
                  <CardDescription>
                    Como o Gerente de IA otimiza sua operação
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full text-blue-700">
                        <Brain className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Análise de performance da equipe</h3>
                        <p className="text-sm text-muted-foreground">
                          Detecta baixa resposta, sugere ajustes em script ou canal
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full text-amber-700">
                        <ChartBar className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Alertas comportamentais</h3>
                        <p className="text-sm text-muted-foreground">
                          Ex: "Lead visitou a proposta 3x, mas não respondeu. Hora do follow-up."
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full text-green-700">
                        <RefreshCcw className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Otimização do funil</h3>
                        <p className="text-sm text-muted-foreground">
                          Identifica gargalos e executa ações para destravar conversões
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 p-2 rounded-full text-purple-700">
                        <Lightbulb className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Insights de mercado</h3>
                        <p className="text-sm text-muted-foreground">
                          Detecta tendências por setor, região e concorrência, e sugere campanhas
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-indigo-100 p-2 rounded-full text-indigo-700">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Gestão de agenda</h3>
                        <p className="text-sm text-muted-foreground">
                          Reorganiza horários, envia briefings e evita sobreposições
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-100 p-2 rounded-full text-yellow-700">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Upsell & Cross-sell</h3>
                        <p className="text-sm text-muted-foreground">
                          Detecta baixa utilização do plano e propõe upgrades com inteligência
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-red-100 p-2 rounded-full text-red-700">
                        <Activity className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Prevenção de churn</h3>
                        <p className="text-sm text-muted-foreground">
                          Identifica inatividade e aciona reengajamento automaticamente
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <AlertBox 
                title="Mensagens do Gerente" 
                className="h-full"
                alerts={[
                  {
                    icon: "bell",
                    text: "João teve 0% de resposta nos últimos 25 leads",
                    type: "alert",
                    action: () => toast.info("Ajustando script e canal de comunicação")
                  },
                  {
                    icon: "megaphone",
                    text: "22 leads parados há 7 dias no pipeline",
                    type: "update",
                    action: () => toast.info("Movendo leads quentes para 'Atenção'")
                  },
                  {
                    icon: "pin",
                    text: "Lead Tech Solutions visitou proposta 3x",
                    type: "tip",
                    action: () => toast.info("Agendando follow-up estratégico")
                  },
                  {
                    icon: "pin",
                    text: "Cliente NaturFood atingiu 92% do plano",
                    type: "tip",
                    action: () => toast.info("Enviando proposta de upgrade")
                  }
                ]}
              />
            </div>
          </div>
          
          {/* Expert Virtual de Vendas */}
          <Card className="border-blue-200 bg-blue-50/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle>Expert Virtual de Vendas</CardTitle>
                  <Badge className="bg-blue-600">Nível 4 - Sem Regras</Badge>
                </div>
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  <Rocket className="h-4 w-4 mr-2" />
                  Ativar Modo Avançado
                </Button>
              </div>
              <CardDescription>
                Agente autônomo de alta performance, com liberdade para agir sem travas, aprovação ou atraso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Badge className="bg-red-500">1</Badge> Detecta e reage
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">João (SDR)</span> teve 0% de resposta nos últimos 25 leads
                    </p>
                    <div className="mt-2 flex items-start gap-2">
                      <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                      <p className="text-sm">
                        <span className="text-blue-600 font-medium">Gerente de IA:</span> Ajusta script, troca canal e dispara novo lote — sozinho.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Badge className="bg-amber-500">2</Badge> Reorganiza o funil
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      22 leads parados há 7 dias
                    </p>
                    <div className="mt-2 flex items-start gap-2">
                      <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                      <p className="text-sm">
                        <span className="text-blue-600 font-medium">Gerente de IA:</span> Move os quentes para "Atenção" e dispara follow-up estratégico.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Badge className="bg-green-500">3</Badge> Refaz campanhas
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Campanha teve CTR de apenas 3%
                    </p>
                    <div className="mt-2 flex items-start gap-2">
                      <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                      <p className="text-sm">
                        <span className="text-blue-600 font-medium">Gerente de IA:</span> Pausa, gera nova copy, testa com 10 leads e escala a versão vencedora.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Badge className="bg-blue-500">4</Badge> Prioriza o foco
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      09h: alerta para SDRs:
                    </p>
                    <div className="mt-2 flex items-start gap-2">
                      <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                      <p className="text-sm">
                        <span className="text-blue-600 font-medium">Gerente de IA:</span> "Hoje, concentre no Top 10 com probabilidade de fechamento acima de 80%."
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Badge className="bg-purple-500">5</Badge> Acelera upgrades
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Cliente atingiu 92% de uso do plano
                    </p>
                    <div className="mt-2 flex items-start gap-2">
                      <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                      <p className="text-sm">
                        <span className="text-blue-600 font-medium">Gerente de IA:</span> Envia proposta de upgrade automaticamente com bônus de ativação.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Badge className="bg-red-500">6</Badge> Evita perdas
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Lead visitou a proposta 4 vezes e sumiu
                    </p>
                    <div className="mt-2 flex items-start gap-2">
                      <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                      <p className="text-sm">
                        <span className="text-blue-600 font-medium">Gerente de IA:</span> Reengaja com urgência, muda canal e agenda nova tentativa com IA Closer.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          {/* Vantagens */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Clock className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-medium">Atua 24h/dia</h3>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Activity className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-medium">Decisões em tempo real</h3>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <RefreshCcw className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-medium">Corrige o que não funciona</h3>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Brain className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-medium">Aprende com o que converte</h3>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Shield className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-medium">Nada é esquecido</h3>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <BarChart className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-medium">Relatórios diários</h3>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Modo Laboratório */}
        <TabsContent value="advanced" className="space-y-6">
          <AdvancedFeaturesToggle />
        </TabsContent>

        {/* Aprovações */}
        <TabsContent value="approvals" className="space-y-6">
          <ApprovalWorkflow />
        </TabsContent>

        {/* Timeline */}
        <TabsContent value="timeline" className="space-y-6">
          <AiActionTimeline />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default AiManager;
