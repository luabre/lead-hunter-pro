
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Brain, Save, ArrowLeft, Plus, X, Mail, MessageCircle, Phone, CheckSquare, Link, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CampaignTouch {
  id: string;
  order: number;
  type: "email" | "whatsapp" | "call" | "task" | "link" | "file";
  title: string;
  message: string;
  scheduling: "relative" | "fixed";
  relativeDays?: number;
  fixedDate?: string;
  timeWindow: { start: string; end: string };
  attachment?: string;
  link?: string;
}

interface IntelligentCampaignFlowProps {
  onCancel: () => void;
  onCreationComplete: (campaignName: string) => void;
}

const IntelligentCampaignFlow = ({ onCancel, onCreationComplete }: IntelligentCampaignFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const { toast } = useToast();
  
  const [campaignData, setCampaignData] = useState({
    name: "",
    description: "",
    segment: "",
    objective: "",
    preferredChannels: [] as string[],
    touches: [] as CampaignTouch[]
  });

  const [aiFormData, setAiFormData] = useState({
    objective: "",
    targetAudience: "",
    mainPain: "",
    solution: "",
    useWhatsApp: false,
    hasSupportMaterials: false,
    materialsDescription: ""
  });

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChannelToggle = (channel: string) => {
    const updatedChannels = campaignData.preferredChannels.includes(channel)
      ? campaignData.preferredChannels.filter(c => c !== channel)
      : [...campaignData.preferredChannels, channel];
    
    setCampaignData({ ...campaignData, preferredChannels: updatedChannels });
  };

  const generateWithAI = async () => {
    setIsAIGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedTouches: CampaignTouch[] = [
        {
          id: "1",
          order: 1,
          type: "email",
          title: "Email Inicial - Apresentação",
          message: `Olá {{nome}},\n\nSou da {{empresa_usuario}} e notei que a {{empresa}} tem se destacado no setor de {{segmento}}.\n\nTenho uma solução que pode ajudar com ${aiFormData.mainPain}. Podemos conversar?\n\nAtenciosamente,\n{{remetente}}`,
          scheduling: "relative",
          relativeDays: 0,
          timeWindow: { start: "09:00", end: "18:00" }
        },
        {
          id: "2",
          order: 2,
          type: "whatsapp",
          title: "WhatsApp Follow-up",
          message: `Oi {{nome}}! 👋\n\nTe enviei um email sobre como podemos ajudar a {{empresa}} com ${aiFormData.solution}.\n\nPosso mandar mais informações por aqui?`,
          scheduling: "relative",
          relativeDays: 2,
          timeWindow: { start: "09:00", end: "17:00" }
        },
        {
          id: "3",
          order: 3,
          type: "email",
          title: "Email com Material de Apoio",
          message: `Olá {{nome}},\n\nConforme prometido, segue material sobre como resolver ${aiFormData.mainPain}.\n\nEste case study mostra resultados reais de empresas similares à {{empresa}}.\n\nQue tal agendarmos 15 minutos para discutir?\n\nAtenciosamente,\n{{remetente}}`,
          scheduling: "relative",
          relativeDays: 4,
          timeWindow: { start: "09:00", end: "18:00" }
        },
        {
          id: "4",
          order: 4,
          type: "call",
          title: "Ligação de Follow-up",
          message: "Ligar para {{nome}} para discutir oportunidades de parceria e agendar demonstração.",
          scheduling: "relative",
          relativeDays: 6,
          timeWindow: { start: "10:00", end: "16:00" }
        },
        {
          id: "5",
          order: 5,
          type: "email",
          title: "Email de Encerramento",
          message: `Olá {{nome}},\n\nEsta é minha última tentativa de contato sobre como podemos ajudar a {{empresa}}.\n\nSe não for o momento ideal, sem problemas! Fico à disposição para quando precisar.\n\nSucesso!\n{{remetente}}`,
          scheduling: "relative",
          relativeDays: 8,
          timeWindow: { start: "09:00", end: "18:00" }
        }
      ];

      setCampaignData({
        ...campaignData,
        name: `Campanha ${aiFormData.objective} - ${aiFormData.targetAudience}`,
        description: `Campanha inteligente para ${aiFormData.objective.toLowerCase()} focada em ${aiFormData.targetAudience}`,
        touches: generatedTouches
      });

      setIsAIGenerating(false);
      toast({
        title: "Campanha gerada com IA!",
        description: "A IA criou uma sequência de 5 toques personalizados para seu objetivo.",
      });
      setCurrentStep(3);
    }, 3000);
  };

  const addNewTouch = () => {
    const newTouch: CampaignTouch = {
      id: Date.now().toString(),
      order: campaignData.touches.length + 1,
      type: "email",
      title: "",
      message: "",
      scheduling: "relative",
      relativeDays: campaignData.touches.length,
      timeWindow: { start: "09:00", end: "18:00" }
    };
    
    setCampaignData({
      ...campaignData,
      touches: [...campaignData.touches, newTouch]
    });
  };

  const removeTouch = (touchId: string) => {
    setCampaignData({
      ...campaignData,
      touches: campaignData.touches.filter(t => t.id !== touchId)
    });
  };

  const updateTouch = (touchId: string, updates: Partial<CampaignTouch>) => {
    setCampaignData({
      ...campaignData,
      touches: campaignData.touches.map(t => 
        t.id === touchId ? { ...t, ...updates } : t
      )
    });
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "email": return <Mail className="h-4 w-4" />;
      case "whatsapp": return <MessageCircle className="h-4 w-4" />;
      case "call": return <Phone className="h-4 w-4" />;
      case "task": return <CheckSquare className="h-4 w-4" />;
      case "link": return <Link className="h-4 w-4" />;
      case "file": return <Upload className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  const getChannelLabel = (type: string) => {
    switch (type) {
      case "email": return "E-mail";
      case "whatsapp": return "WhatsApp";
      case "call": return "Ligação";
      case "task": return "Tarefa";
      case "link": return "Link Externo";
      case "file": return "Arquivo";
      default: return "E-mail";
    }
  };

  const handleSubmit = () => {
    onCreationComplete(campaignData.name);
  };

  const renderBasicInfoStep = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="campaign-name">Nome da Campanha *</Label>
        <Input 
          id="campaign-name" 
          placeholder="Ex: Prospecção Tecnologia Q2" 
          value={campaignData.name}
          onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea 
          id="description" 
          placeholder="Descreva o objetivo desta campanha..."
          value={campaignData.description}
          onChange={(e) => setCampaignData({...campaignData, description: e.target.value})}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="segment">Segmento *</Label>
        <Select value={campaignData.segment} onValueChange={(value) => setCampaignData({...campaignData, segment: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o segmento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tecnologia">Tecnologia</SelectItem>
            <SelectItem value="saude">Saúde</SelectItem>
            <SelectItem value="financeiro">Financeiro</SelectItem>
            <SelectItem value="educacao">Educação</SelectItem>
            <SelectItem value="varejo">Varejo</SelectItem>
            <SelectItem value="industria">Indústria</SelectItem>
            <SelectItem value="servicos">Serviços</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="objective">Objetivo *</Label>
        <Select value={campaignData.objective} onValueChange={(value) => setCampaignData({...campaignData, objective: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o objetivo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="agendar-reuniao">Agendar Reunião</SelectItem>
            <SelectItem value="gerar-leads">Gerar Leads</SelectItem>
            <SelectItem value="nurture">Nutrição de Leads</SelectItem>
            <SelectItem value="reativacao">Reativação de Clientes</SelectItem>
            <SelectItem value="upsell">Upsell/Cross-sell</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Canais Preferenciais *</Label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "email", label: "E-mail", icon: <Mail className="h-4 w-4" /> },
            { id: "whatsapp", label: "WhatsApp", icon: <MessageCircle className="h-4 w-4" /> },
            { id: "phone", label: "Telefone", icon: <Phone className="h-4 w-4" /> },
            { id: "linkedin", label: "LinkedIn", icon: <Link className="h-4 w-4" /> }
          ].map((channel) => (
            <div key={channel.id} className="flex items-center space-x-2">
              <Checkbox 
                id={channel.id}
                checked={campaignData.preferredChannels.includes(channel.id)}
                onCheckedChange={() => handleChannelToggle(channel.id)}
              />
              <Label htmlFor={channel.id} className="flex items-center gap-2 cursor-pointer">
                {channel.icon}
                {channel.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => setCurrentStep(2)}>
            Criar com IA
          </Button>
          <Button onClick={() => setCurrentStep(3)}>
            Criar Manual
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAICreationStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Brain className="h-12 w-12 mx-auto text-primary mb-2" />
        <h3 className="text-xl font-semibold">Criar Campanha com IA</h3>
        <p className="text-muted-foreground">
          Responda algumas perguntas e a IA criará uma sequência personalizada de toques
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Qual é o objetivo principal desta campanha?</Label>
          <Textarea 
            placeholder="Ex: Agendar reuniões para demonstração do produto..."
            value={aiFormData.objective}
            onChange={(e) => setAiFormData({...aiFormData, objective: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Descreva seu público-alvo</Label>
          <Textarea 
            placeholder="Ex: CTOs e Diretores de TI de empresas de 50-500 funcionários..."
            value={aiFormData.targetAudience}
            onChange={(e) => setAiFormData({...aiFormData, targetAudience: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Qual a principal dor que você resolve?</Label>
          <Textarea 
            placeholder="Ex: Processos manuais que geram retrabalho e perda de produtividade..."
            value={aiFormData.mainPain}
            onChange={(e) => setAiFormData({...aiFormData, mainPain: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Qual solução você oferece?</Label>
          <Textarea 
            placeholder="Ex: Plataforma de automação que reduz 60% do tempo em processos..."
            value={aiFormData.solution}
            onChange={(e) => setAiFormData({...aiFormData, solution: e.target.value})}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="use-whatsapp"
            checked={aiFormData.useWhatsApp}
            onCheckedChange={(checked) => setAiFormData({...aiFormData, useWhatsApp: !!checked})}
          />
          <Label htmlFor="use-whatsapp">Incluir WhatsApp na sequência</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="has-materials"
            checked={aiFormData.hasSupportMaterials}
            onCheckedChange={(checked) => setAiFormData({...aiFormData, hasSupportMaterials: !!checked})}
          />
          <Label htmlFor="has-materials">Tenho materiais de apoio (PDFs, vídeos, links)</Label>
        </div>
        
        {aiFormData.hasSupportMaterials && (
          <div className="space-y-2">
            <Label>Descreva seus materiais de apoio</Label>
            <Textarea 
              placeholder="Ex: Case study em PDF, vídeo demo de 3 minutos, calculadora ROI..."
              value={aiFormData.materialsDescription}
              onChange={(e) => setAiFormData({...aiFormData, materialsDescription: e.target.value})}
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePreviousStep}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Button onClick={generateWithAI} disabled={isAIGenerating}>
          {isAIGenerating ? (
            <>
              <Brain className="h-4 w-4 mr-2 animate-spin" />
              Gerando com IA...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Gerar Sequência
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderTouchesStep = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Toques da Campanha</h3>
          <p className="text-muted-foreground">Configure até 5 toques para sua sequência</p>
        </div>
        <Button onClick={addNewTouch} disabled={campaignData.touches.length >= 5}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Toque
        </Button>
      </div>
      
      <div className="space-y-4">
        {campaignData.touches.map((touch, index) => (
          <Card key={touch.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Toque {touch.order}</Badge>
                  {getChannelIcon(touch.type)}
                  <span className="font-medium">{getChannelLabel(touch.type)}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeTouch(touch.id)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Canal</Label>
                  <Select 
                    value={touch.type} 
                    onValueChange={(value) => updateTouch(touch.id, { type: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">📧 E-mail automático</SelectItem>
                      <SelectItem value="whatsapp">📱 WhatsApp</SelectItem>
                      <SelectItem value="call">📞 Ligação (tarefa)</SelectItem>
                      <SelectItem value="task">✅ Tarefa personalizada</SelectItem>
                      <SelectItem value="link">🔗 Link externo</SelectItem>
                      <SelectItem value="file">📎 Upload de arquivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Título do Toque</Label>
                  <Input 
                    placeholder="Ex: Email inicial de apresentação"
                    value={touch.title}
                    onChange={(e) => updateTouch(touch.id, { title: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Mensagem</Label>
                <Textarea 
                  placeholder="Digite sua mensagem usando variáveis como {{nome}}, {{empresa}}, etc."
                  value={touch.message}
                  onChange={(e) => updateTouch(touch.id, { message: e.target.value })}
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Agendamento</Label>
                  <Select 
                    value={touch.scheduling} 
                    onValueChange={(value) => updateTouch(touch.id, { scheduling: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relative">🔘 Relativo (D+X)</SelectItem>
                      <SelectItem value="fixed">🔘 Data fixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {touch.scheduling === "relative" && (
                  <div className="space-y-2">
                    <Label>Dias após entrada</Label>
                    <Input 
                      type="number"
                      min="0"
                      max="30"
                      value={touch.relativeDays || 0}
                      onChange={(e) => updateTouch(touch.id, { relativeDays: parseInt(e.target.value) })}
                    />
                  </div>
                )}
                
                {touch.scheduling === "fixed" && (
                  <div className="space-y-2">
                    <Label>Data e hora</Label>
                    <Input 
                      type="datetime-local"
                      value={touch.fixedDate || ""}
                      onChange={(e) => updateTouch(touch.id, { fixedDate: e.target.value })}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label>Janela de envio</Label>
                  <div className="flex gap-1 items-center">
                    <Input 
                      type="time"
                      value={touch.timeWindow.start}
                      onChange={(e) => updateTouch(touch.id, { 
                        timeWindow: { ...touch.timeWindow, start: e.target.value }
                      })}
                    />
                    <span>até</span>
                    <Input 
                      type="time"
                      value={touch.timeWindow.end}
                      onChange={(e) => updateTouch(touch.id, { 
                        timeWindow: { ...touch.timeWindow, end: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePreviousStep}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Button onClick={() => setCurrentStep(4)}>
          Próximo
        </Button>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Revisão da Campanha</h3>
      
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div><strong>Nome:</strong> {campaignData.name}</div>
          <div><strong>Descrição:</strong> {campaignData.description}</div>
          <div><strong>Segmento:</strong> {campaignData.segment}</div>
          <div><strong>Objetivo:</strong> {campaignData.objective}</div>
          <div><strong>Canais:</strong> {campaignData.preferredChannels.join(", ")}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Sequência de Toques ({campaignData.touches.length}/5)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {campaignData.touches.map((touch) => (
              <div key={touch.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <Badge>{touch.order}</Badge>
                {getChannelIcon(touch.type)}
                <div className="flex-1">
                  <div className="font-medium">{touch.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {touch.scheduling === "relative" 
                      ? `D+${touch.relativeDays} (${touch.timeWindow.start}-${touch.timeWindow.end})`
                      : `${touch.fixedDate} (${touch.timeWindow.start}-${touch.timeWindow.end})`
                    }
                  </div>
                </div>
                <Badge variant="outline">{getChannelLabel(touch.type)}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePreviousStep}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Button onClick={handleSubmit}>
          <Save className="h-4 w-4 mr-2" />
          Criar Campanha
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onCancel} className="mr-4 p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Nova Campanha Inteligente</h1>
          <p className="text-muted-foreground">
            Crie uma sequência de até 5 toques personalizados com IA
          </p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="flex justify-between mb-2">
          {[
            { step: 1, label: "Básico" },
            { step: 2, label: "IA" },
            { step: 3, label: "Toques" },
            { step: 4, label: "Revisão" }
          ].map(({ step, label }) => (
            <div key={step} className="text-center z-10">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep >= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {step}
              </div>
              <div className="text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted">
          <div 
            className="h-full bg-primary transition-all" 
            style={{ width: `${(currentStep - 1) * 33.33}%` }}
          />
        </div>
      </div>
      
      {currentStep === 1 && renderBasicInfoStep()}
      {currentStep === 2 && renderAICreationStep()}
      {currentStep === 3 && renderTouchesStep()}
      {currentStep === 4 && renderReviewStep()}
    </div>
  );
};

export default IntelligentCampaignFlow;
