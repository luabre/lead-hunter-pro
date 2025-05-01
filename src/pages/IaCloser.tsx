
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, FileText, Calendar, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const leadOptions = [
  { value: "1", label: "TechSol - João Silva" },
  { value: "2", label: "LogEx - Maria Souza" },
  { value: "3", label: "NaturFood - Carlos Pereira" },
];

const IaCloser = () => {
  const [selectedLead, setSelectedLead] = useState<string>("1");
  const [generatingProposal, setGeneratingProposal] = useState(false);
  const [proposalGenerated, setProposalGenerated] = useState(false);
  const [selectedTab, setSelectedTab] = useState("proposal");
  
  const handleGenerateProposal = () => {
    setGeneratingProposal(true);
    
    // Simulação do tempo de geração da proposta
    setTimeout(() => {
      setGeneratingProposal(false);
      setProposalGenerated(true);
      toast({
        title: "Proposta gerada com sucesso",
        description: "A IA Closer analisou o perfil do lead e criou uma proposta personalizada.",
      });
    }, 2000);
  };
  
  const handleSendProposal = () => {
    toast({
      title: "Proposta enviada com sucesso",
      description: "A IA Closer enviará a proposta e notificará sobre aberturas e interações.",
    });
  };
  
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">IA Closer</h1>
          <p className="text-muted-foreground">
            Fechamento inteligente e personalizado
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Assistente de Fechamento</CardTitle>
              <CardDescription>
                Gerar propostas personalizadas e estratégias de fechamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="lead-select">Selecionar Lead Qualificado</Label>
                  <Select 
                    value={selectedLead} 
                    onValueChange={setSelectedLead}
                  >
                    <SelectTrigger id="lead-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {leadOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedLead && (
                  <div className="border rounded-md">
                    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                      <TabsList className="w-full">
                        <TabsTrigger value="proposal" className="flex-1">Proposta</TabsTrigger>
                        <TabsTrigger value="meeting" className="flex-1">Reunião</TabsTrigger>
                        <TabsTrigger value="followup" className="flex-1">Follow-up</TabsTrigger>
                      </TabsList>
                      <TabsContent value="proposal" className="p-4">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">Proposta Comercial</h3>
                            <Badge className="bg-leadhunter-teal">Lead Quente</Badge>
                          </div>
                          
                          {proposalGenerated ? (
                            <div className="space-y-6">
                              <div className="space-y-2">
                                <Label htmlFor="proposal-title">Título da Proposta</Label>
                                <Input 
                                  id="proposal-title" 
                                  value="Proposta de Serviços de Otimização para TechSol"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="proposal-intro">Introdução</Label>
                                <Textarea 
                                  id="proposal-intro"
                                  value="Prezado João Silva,

É com grande satisfação que apresentamos nossa proposta para atender às necessidades da TechSol, conforme discutido em nossas conversas anteriores. 

Com base na análise detalhada dos desafios apresentados por sua empresa, desenvolvemos uma solução customizada que visa otimizar processos e impulsionar o crescimento do seu negócio."
                                  className="min-h-[100px]"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="proposal-solution">Solução Proposta</Label>
                                <Textarea 
                                  id="proposal-solution"
                                  value="Nossa solução para a TechSol inclui:

1. Implementação de sistema de automação de processos administrativos
2. Integração com os sistemas já existentes
3. Dashboard personalizado com métricas de desempenho
4. Treinamento da equipe interna
5. Suporte técnico contínuo 24/7

Todos estes elementos foram pensados especificamente para atender às necessidades de crescimento acelerado que a TechSol vem experimentando."
                                  className="min-h-[150px]"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="proposal-investment">Investimento</Label>
                                <Textarea 
                                  id="proposal-investment"
                                  value="Plano Empresarial Premium:
- R$ 4.997,00 /mês
- Contrato inicial de 12 meses
- Implementação: R$ 8.000,00 (pagamento único)
- Desconto de 10% para pagamento anual à vista"
                                  className="min-h-[100px]"
                                />
                              </div>
                              
                              <div className="space-y-4">
                                <h4 className="font-medium">Materiais de Apoio</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="include-case" checked={true} />
                                    <label
                                      htmlFor="include-case"
                                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      Incluir estudo de caso do setor
                                    </label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="include-roi" checked={true} />
                                    <label
                                      htmlFor="include-roi"
                                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      Calculadora de ROI personalizada
                                    </label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="include-video" />
                                    <label
                                      htmlFor="include-video"
                                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      Vídeo demonstrativo
                                    </label>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex justify-end gap-4 pt-4">
                                <Button variant="outline">Editar Proposta</Button>
                                <Button onClick={handleSendProposal}>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Enviar Proposta
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-6">
                              <p className="text-muted-foreground">
                                Use a IA para gerar uma proposta personalizada com base no histórico de conversas
                                e perfil do lead.
                              </p>
                              
                              <div className="space-y-2">
                                <Label>Informações Adicionais (opcional)</Label>
                                <Textarea
                                  placeholder="Adicione qualquer informação específica para personalizar a proposta..."
                                  className="min-h-[100px]"
                                />
                              </div>
                              
                              <Button 
                                className="w-full" 
                                onClick={handleGenerateProposal}
                                disabled={generatingProposal}
                              >
                                {generatingProposal ? "Gerando Proposta..." : "Gerar Proposta com IA"}
                              </Button>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="meeting" className="p-4">
                        <div className="space-y-6">
                          <h3 className="text-xl font-semibold">Agendar Reunião de Fechamento</h3>
                          
                          <p className="text-muted-foreground">
                            A IA pode agendar automaticamente uma reunião de fechamento com base na 
                            disponibilidade do cliente e da sua equipe.
                          </p>
                          
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="meeting-title">Título da Reunião</Label>
                              <Input 
                                id="meeting-title" 
                                placeholder="Ex: Apresentação Final - TechSol"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="meeting-agenda">Agenda da Reunião</Label>
                              <Textarea 
                                id="meeting-agenda"
                                placeholder="Descreva os pontos principais a serem abordados na reunião..."
                                className="min-h-[100px]"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="meeting-date">Data Sugerida</Label>
                                <Input 
                                  id="meeting-date" 
                                  type="date"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="meeting-time">Horário</Label>
                                <Input 
                                  id="meeting-time" 
                                  type="time"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button>
                              <Calendar className="h-4 w-4 mr-2" />
                              Agendar Reunião
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="followup" className="p-4">
                        <div className="space-y-6">
                          <h3 className="text-xl font-semibold">Follow-up de Fechamento</h3>
                          
                          <p className="text-muted-foreground">
                            Configure mensagens de follow-up automáticas para acompanhar propostas enviadas
                            e aumentar as chances de fechamento.
                          </p>
                          
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Sequência de Follow-up</Label>
                              <Card>
                                <CardContent className="p-4">
                                  <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                      <div className="min-w-[60px] text-center">
                                        <Badge>Dia 1</Badge>
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-sm font-medium">Email de Confirmação</p>
                                        <p className="text-xs text-muted-foreground">
                                          Confirma o recebimento da proposta e se coloca à disposição
                                        </p>
                                      </div>
                                      <div>
                                        <Badge variant="outline">
                                          <Check className="h-3 w-3 mr-1" />
                                          Ativo
                                        </Badge>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                      <div className="min-w-[60px] text-center">
                                        <Badge>Dia 3</Badge>
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-sm font-medium">Verificação de Interesse</p>
                                        <p className="text-xs text-muted-foreground">
                                          Pergunta se há dúvidas ou interesse na proposta
                                        </p>
                                      </div>
                                      <div>
                                        <Badge variant="outline">
                                          <Check className="h-3 w-3 mr-1" />
                                          Ativo
                                        </Badge>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                      <div className="min-w-[60px] text-center">
                                        <Badge>Dia 7</Badge>
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-sm font-medium">Incentivo de Urgência</p>
                                        <p className="text-xs text-muted-foreground">
                                          Menciona benefícios de decisão rápida ou ofertas por tempo limitado
                                        </p>
                                      </div>
                                      <div>
                                        <Badge variant="outline">
                                          <Check className="h-3 w-3 mr-1" />
                                          Ativo
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                            
                            <div className="flex justify-end gap-4">
                              <Button variant="outline">
                                Personalizar Sequência
                              </Button>
                              <Button>
                                Ativar Follow-ups
                              </Button>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="bg-leadhunter-blue-dark text-white mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="h-7 w-7 text-leadhunter-teal" />
                <div>
                  <CardTitle className="text-lg">IA Closer</CardTitle>
                  <CardDescription className="text-gray-300">
                    Fechamento inteligente e personalizado
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm mb-6">
                <p>
                  A IA Closer analisa leads qualificados para fechamento eficaz utilizando:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li>Histórico completo da conversa</li>
                  <li>Propostas personalizadas</li>
                  <li>Argumentos de fechamento adaptados</li>
                  <li>Sinais de prontidão para compra</li>
                </ul>
              </div>
              
              <div className="bg-leadhunter-blue-dark/50 p-3 rounded-lg border border-white/10">
                <p className="text-sm font-medium mb-2">Análise do Lead</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Abertura para proposta</span>
                    <span className="text-leadhunter-teal font-medium">84%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div className="bg-leadhunter-teal h-1.5 rounded-full" style={{ width: "84%" }}></div>
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-gray-300">
                  <p>
                    João Silva abriu o último email 3 vezes nas últimas 24 horas. 
                    Demonstra alto interesse e urgência.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Histórico do Lead</CardTitle>
              <CardDescription>
                TechSol - João Silva
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 divide-y">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-medium">Email Inicial Enviado</h4>
                    <span className="text-xs text-muted-foreground">10/04/2025</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Email de apresentação enviado pela IA SDR.
                  </p>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-medium">Resposta do Lead</h4>
                    <span className="text-xs text-muted-foreground">12/04/2025</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    "Interessante proposta. Poderia detalhar mais sobre como funciona na prática?"
                  </p>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-medium">Qualificação BANT</h4>
                    <Badge variant="outline" className="text-leadhunter-teal">Qualificado</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1 mt-2">
                    <p>• Budget: Disponível para investimento</p>
                    <p>• Authority: Decisor principal</p>
                    <p>• Need: Confirmada necessidade</p>
                    <p>• Timeline: Implementação em 30 dias</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="ghost" className="w-full text-xs">
                Ver histórico completo
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default IaCloser;
