
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { MessageSquare, Mail } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const IaSdr = () => {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("company");
  const companyName = searchParams.get("name");

  const [messageChannel, setMessageChannel] = useState("email");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>(undefined);
  
  // If we have a company, pre-fill some message context
  useEffect(() => {
    if (companyName) {
      setGeneratedMessage("");
    }
  }, [companyName]);

  const templates = [
    { id: "1", name: "Primeira Abordagem", content: "Olá {{nome}}, Notei que sua empresa {{empresa}} tem crescido no setor de {{setor}}. Gostaria de compartilhar como podemos ajudar a potencializar ainda mais esse crescimento com nossa solução." },
    { id: "2", name: "Follow-up", content: "Olá {{nome}}, Estou retornando o contato sobre como nossa solução pode ajudar {{empresa}} a superar os desafios do setor. Quando seria um bom momento para conversarmos?" },
    { id: "3", name: "Qualificação", content: "Olá {{nome}}, Agradeço o retorno. Para entendermos melhor como podemos ajudar, poderia me contar um pouco sobre os principais desafios que {{empresa}} enfrenta atualmente?" },
  ];

  const handleGenerateMessage = () => {
    setIsGenerating(true);
    
    // Simulando o processamento da IA
    setTimeout(() => {
      setIsGenerating(false);
      
      let message = "";
      const targetCompany = companyName || "TechSol";
      
      if (messageChannel === "email") {
        message = `Assunto: Oportunidade de otimização para ${targetCompany}

Olá João Silva,

Espero que esteja tudo bem com você. Meu nome é [Seu Nome] e acompanho o crescimento da ${targetCompany} no mercado.

Notei que vocês têm expandido a equipe recentemente e imaginei que podem estar buscando otimizar os processos internos nesse momento de crescimento.

Nossa plataforma tem ajudado empresas similares à ${targetCompany} a:

• Reduzir em 30% o tempo gasto em tarefas administrativas
• Aumentar a produtividade da equipe em até 25%
• Melhorar a comunicação entre departamentos

Gostaria de entender um pouco mais sobre os desafios atuais da ${targetCompany}. Teríamos cerca de 15 minutos para uma conversa inicial?

Seria útil saber:
1. Quais são seus principais desafios operacionais atualmente?
2. Já utilizam alguma solução para automatizar processos?

Aguardo seu retorno e fico à disposição.

Atenciosamente,
[Seu Nome]`;
      } else if (messageChannel === "whatsapp") {
        message = `Olá João, tudo bem? 👋

Acompanhando o crescimento da ${targetCompany} no mercado e gostaria de entender como vocês estão lidando com [desafio específico do setor].

Trabalhamos com empresas do seu segmento que conseguiram [benefício concreto]. Podemos conversar brevemente sobre como isso poderia funcionar para a ${targetCompany}?

Qual seria o melhor horário para uma conversa rápida esta semana?`;
      } else {
        message = `Olá João, notei que a ${targetCompany} tem se destacado no setor e imaginei que talvez estejam enfrentando desafios com [problema específico].

Nossa solução tem ajudado empresas como a sua a superarem esses obstáculos, resultando em [benefício concreto].

Seria interessante para você conhecer como isso funciona na prática? Podemos marcar uma conversa breve.`;
      }
      
      setGeneratedMessage(message);
      toast({
        title: "Mensagem gerada com sucesso",
        description: `Mensagem para abordagem via ${messageChannel === "email" ? "email" : messageChannel === "whatsapp" ? "WhatsApp" : "LinkedIn"} criada.`,
      });
    }, 1500);
  };
  
  const handleSendMessage = () => {
    toast({
      title: "Mensagem enviada com sucesso",
      description: "A IA SDR enviará sua mensagem e monitorará as respostas.",
    });
    setGeneratedMessage("");
  };
  
  const handleUseTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const targetCompany = companyName || "TechSol";
      setGeneratedMessage(template.content
        .replace("{{nome}}", "João Silva")
        .replace("{{empresa}}", targetCompany)
        .replace("{{setor}}", "tecnologia")
      );
      setSelectedTemplate(templateId);
    }
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">IA SDR</h1>
          <p className="text-muted-foreground">
            Prospecção e qualificação humanizada
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Gerador de Mensagens</CardTitle>
              <CardDescription>
                Crie mensagens personalizadas para seus leads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Canal de Comunicação</Label>
                  <Tabs 
                    value={messageChannel} 
                    onValueChange={setMessageChannel}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="email" className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </TabsTrigger>
                      <TabsTrigger value="whatsapp" className="flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" className="mr-2">
                          <path fill="currentColor" d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/>
                        </svg>
                        WhatsApp
                      </TabsTrigger>
                      <TabsTrigger value="linkedin" className="flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" className="mr-2">
                          <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Contato</Label>
                    <Badge>{companyName ? `${companyName}` : "João Silva - TechSol"}</Badge>
                  </div>
                  
                  {messageChannel === "email" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Assunto</Label>
                        <Input id="subject" placeholder={`Oportunidade para ${companyName || "sua empresa"}`} />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Digite sua mensagem ou use a IA para gerar automaticamente"
                      value={generatedMessage}
                      onChange={(e) => setGeneratedMessage(e.target.value)}
                      className="min-h-[200px]"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between gap-4">
                  <Button 
                    variant="outline" 
                    onClick={handleGenerateMessage} 
                    disabled={isGenerating}
                  >
                    {isGenerating ? "Gerando..." : "Gerar com IA"}
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!generatedMessage}
                  >
                    Enviar Mensagem
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="bg-leadhunter-blue-dark text-white mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageSquare className="h-7 w-7 text-leadhunter-teal" />
                <div>
                  <CardTitle className="text-lg">IA SDR</CardTitle>
                  <CardDescription className="text-gray-300">
                    Conversas e qualificação automáticas
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm mb-6">
                <p>
                  A IA SDR automatiza a primeira abordagem e qualifica leads usando:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li>Análise de comportamento</li>
                  <li>Personalização em tempo real</li>
                  <li>Perguntas de qualificação estratégicas</li>
                  <li>Follow-ups inteligentes</li>
                </ul>
              </div>
              
              <div className="bg-leadhunter-blue-dark/50 p-3 rounded-lg border border-white/10">
                <p className="text-sm font-medium mb-2">Dica de Abordagem</p>
                <p className="text-xs text-gray-300">
                  {companyName ? 
                    `A empresa ${companyName} mostra sinais de interesse em soluções de otimização. Aproveite este momento para uma abordagem focada em resultados práticos.` : 
                    "O decisor João Silva tem um perfil direto e objetivo. Foque em resultados concretos e evite rodeios na sua abordagem."}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Templates Salvos</CardTitle>
              <CardDescription>
                Use templates pré-definidos para agilizar
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {templates.map((template) => (
                  <div 
                    key={template.id} 
                    className={`p-4 cursor-pointer hover:bg-muted transition-colors ${selectedTemplate === template.id ? 'bg-muted' : ''}`}
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium">{template.name}</h4>
                      <Badge variant="outline">Email</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {template.content}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t">
              <Button variant="ghost" className="w-full" size="sm">
                Ver Todos Templates
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default IaSdr;
