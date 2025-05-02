
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Filter, MessageSquare, Bell, Calendar, ThumbsUp, ExternalLink } from 'lucide-react';
import SocialActivity from '@/components/social/SocialActivity';
import SocialInteractionGuide from '@/components/social/SocialInteractionGuide';
import { useToast } from '@/hooks/use-toast';

// Mock data for active social leads
const mockSocialLeads = [
  {
    id: '1',
    name: 'João Silva',
    title: 'Diretor de Tecnologia',
    company: 'TechSol',
    lastActivity: '2h atrás',
    activityType: 'post',
    engagementScore: 84,
    alert: 'Publicou hoje',
    postCount: 3,
    connectionType: 'connected'
  },
  {
    id: '2',
    name: 'Maria Souza',
    title: 'CEO',
    company: 'LogEx',
    lastActivity: '1d atrás',
    activityType: 'article',
    engagementScore: 72,
    alert: 'Interagiu com concorrente',
    postCount: 1,
    connectionType: 'pending'
  },
  {
    id: '3',
    name: 'Pedro Santos',
    title: 'Diretor Comercial',
    company: 'SaudeBem',
    lastActivity: '3h atrás',
    activityType: 'share',
    engagementScore: 65,
    alert: 'Promovido ontem',
    postCount: 2,
    connectionType: 'not-connected'
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    title: 'Diretora de Operações',
    company: 'UrbanCon',
    lastActivity: '5h atrás',
    activityType: 'post',
    engagementScore: 68,
    alert: 'Comentou em sua indústria',
    postCount: 4,
    connectionType: 'connected'
  },
  {
    id: '5',
    name: 'Carlos Pereira',
    title: 'Diretor Financeiro',
    company: 'NaturFood',
    lastActivity: '1d atrás',
    activityType: 'comment',
    engagementScore: 90,
    alert: 'Alto engajamento recente',
    postCount: 2,
    connectionType: 'connected'
  }
];

// Mock social posts for a contact
const mockSocialPosts = [
  {
    id: '1',
    title: 'Transformação Digital no Setor de Saúde',
    date: '28/04/2023',
    type: 'article' as const,
    engagement: 85,
    url: '#'
  },
  {
    id: '2',
    title: 'Implementações de IA que realmente funcionam',
    date: '22/04/2023',
    type: 'post' as const,
    engagement: 62,
    url: '#'
  },
  {
    id: '3',
    title: 'Evento de Tecnologia em São Paulo',
    date: '15/04/2023',
    type: 'share' as const,
    engagement: 47,
    url: '#'
  }
];

// Mock interaction steps
const mockInteractionSteps = [
  {
    id: '1',
    title: 'Curtir publicação recente',
    description: 'Artigo sobre transformação digital no setor de saúde',
    type: 'like' as const,
    completed: true,
    url: '#'
  },
  {
    id: '2',
    title: 'Comentar com insight relevante',
    description: 'Mencionar como a IA tem apoiado processos de transformação semelhantes',
    type: 'comment' as const,
    completed: false,
    url: '#'
  },
  {
    id: '3',
    title: 'Enviar conexão personalizada',
    description: 'Referência à publicação e interesse mútuo no tema de inovação',
    type: 'connect' as const,
    completed: false
  },
  {
    id: '4',
    title: 'Enviar primeira mensagem de valor',
    description: 'Compartilhar um caso de sucesso relevante para o setor do decisor',
    type: 'message' as const,
    completed: false
  }
];

const SocialSelling = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<typeof mockSocialLeads[0] | null>(null);
  const [steps, setSteps] = useState(mockInteractionSteps);

  const filteredLeads = mockSocialLeads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCompleteStep = (stepId: string) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
    toast({
      title: "Etapa concluída com sucesso!",
      description: "Sua interação foi registrada e a IA vai monitorar respostas.",
    });
  };

  const handleScheduleStep = (stepId: string) => {
    // In a real app, this would open a scheduling dialog
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, scheduled: new Date(Date.now() + 86400000) } : step
    ));
    toast({
      title: "Interação agendada",
      description: "Você receberá um lembrete na data programada.",
    });
  };

  const handleActivateSocialSelling = () => {
    toast({
      title: "Social Selling ativado!",
      description: "A IA vai monitorar e sugerir interações estratégicas com este contato.",
    });
  };

  const getAlertBadge = (alert: string) => {
    if (alert.includes("Publicou")) {
      return <Badge className="bg-green-600">Publicou hoje</Badge>;
    }
    if (alert.includes("Interagiu")) {
      return <Badge className="bg-amber-500">Interagiu com concorrente</Badge>;
    }
    if (alert.includes("Promovido")) {
      return <Badge className="bg-blue-600">Promovido recentemente</Badge>;
    }
    if (alert.includes("Comentou")) {
      return <Badge className="bg-purple-600">Ativo na sua indústria</Badge>;
    }
    if (alert.includes("Alto")) {
      return <Badge className="bg-leadhunter-teal">Alto engajamento</Badge>;
    }
    return <Badge>{alert}</Badge>;
  };

  const getConnectionBadge = (type: string) => {
    if (type === 'connected') {
      return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">Conectado</Badge>;
    }
    if (type === 'pending') {
      return <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">Pendente</Badge>;
    }
    return <Badge variant="outline">Não conectado</Badge>;
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Social Selling com IA</h1>
          <p className="text-muted-foreground">
            Engajamento estratégico e personalizado com decisores
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button>
            <Bell className="h-4 w-4 mr-2" />
            Alertas de Atividade
          </Button>
        </div>
      </div>

      {selectedLead ? (
        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedLead.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <span>{selectedLead.title}</span>
                    <span className="text-muted-foreground">|</span>
                    <span>{selectedLead.company}</span>
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => setSelectedLead(null)}>
                  Voltar para Lista
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-3">
                {getAlertBadge(selectedLead.alert)}
                {getConnectionBadge(selectedLead.connectionType)}
                <Badge variant="outline" className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" /> Engajamento: {selectedLead.engagementScore}/100
                </Badge>
              </div>
            </CardHeader>

            <Tabs defaultValue="activity">
              <TabsList className="mx-6 mt-2">
                <TabsTrigger value="activity">Atividade Social</TabsTrigger>
                <TabsTrigger value="interaction">Roteiro de Interação</TabsTrigger>
                <TabsTrigger value="scripts">Scripts Sugeridos</TabsTrigger>
                <TabsTrigger value="history">Histórico</TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="p-6">
                <SocialActivity
                  posts={mockSocialPosts}
                  engagementScore={selectedLead.engagementScore}
                  onActivateSocialSelling={handleActivateSocialSelling}
                />
              </TabsContent>

              <TabsContent value="interaction" className="p-6">
                <SocialInteractionGuide
                  contactName={selectedLead.name}
                  steps={steps}
                  onComplete={handleCompleteStep}
                  onSchedule={handleScheduleStep}
                />
              </TabsContent>

              <TabsContent value="scripts" className="p-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Scripts Personalizados</CardTitle>
                    <CardDescription>
                      Sugestões de comunicação adaptadas ao perfil {selectedLead.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Comentário para Publicação Recente</h4>
                        <p className="text-sm text-muted-foreground italic">
                          "Excelente artigo sobre transformação digital, {selectedLead.name}! 
                          Particularmente interessante sua perspectiva sobre integração de processos. 
                          Temos visto resultados semelhantes em nossos projetos recentes."
                        </p>
                        <div className="flex justify-end mt-2">
                          <Button variant="ghost" size="sm" className="text-xs">
                            Copiar
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Solicitação de Conexão</h4>
                        <p className="text-sm text-muted-foreground italic">
                          "Olá {selectedLead.name}, acompanho seu conteúdo sobre tecnologia no setor de saúde 
                          e realmente aprecio suas perspectivas. Trabalho com soluções semelhantes 
                          e adoraria conectar para trocarmos insights sobre o mercado."
                        </p>
                        <div className="flex justify-end mt-2">
                          <Button variant="ghost" size="sm" className="text-xs">
                            Copiar
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Primeira Mensagem Direta</h4>
                        <p className="text-sm text-muted-foreground italic">
                          "Obrigado por aceitar minha conexão, {selectedLead.name}! Pensei em compartilhar 
                          este estudo de caso sobre como ajudamos uma empresa de {selectedLead.company.split(' ')[0]} 
                          a aumentar a eficiência em 32% usando automação inteligente. 
                          Achei que poderia ser relevante para seus projetos atuais."
                        </p>
                        <div className="flex justify-end mt-2">
                          <Button variant="ghost" size="sm" className="text-xs">
                            Copiar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="p-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center text-muted-foreground">
                      <p>Não há interações registradas com este contato ainda.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      ) : (
        <>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar contatos socialmente ativos..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Active Social Leads Table */}
          <Card>
            <CardHeader>
              <CardTitle>Decisores Socialmente Ativos</CardTitle>
              <CardDescription>
                Contatos com atividade recente detectada em redes profissionais
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Última Atividade</TableHead>
                    <TableHead>Alertas</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Engajamento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow 
                      key={lead.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.title}</TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{lead.lastActivity}</span>
                          <Badge variant="outline">
                            {lead.activityType === 'post' ? 'Post' : 
                             lead.activityType === 'article' ? 'Artigo' : 
                             lead.activityType === 'comment' ? 'Comentário' : 'Compartilhamento'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getAlertBadge(lead.alert)}
                      </TableCell>
                      <TableCell>
                        {getConnectionBadge(lead.connectionType)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span 
                            className={`font-medium ${
                              lead.engagementScore >= 70 
                                ? "text-leadhunter-teal" 
                                : lead.engagementScore >= 50 
                                ? "text-leadhunter-gold" 
                                : "text-leadhunter-red"
                            }`}
                          >
                            {lead.engagementScore}/100
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Guide Card */}
          <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
            <CardContent className="p-6">
              <div className="flex gap-6 flex-col md:flex-row items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Social Selling com IA: Engajamento Estratégico
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    O diferencial do LeadHunter não é automatizar robôs, mas sim guiar interações genuínas 
                    com inteligência, timing e personalização para criar relacionamentos de valor.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white bg-opacity-60 p-3 rounded-lg">
                      <div className="font-medium mb-1">1. Detecte Oportunidades</div>
                      <p className="text-muted-foreground">
                        A IA monitora atividades e sinaliza momentos ideais para interação
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-60 p-3 rounded-lg">
                      <div className="font-medium mb-1">2. Siga o Roteiro</div>
                      <p className="text-muted-foreground">
                        Interação gradual e estratégica com scripts personalizados
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-60 p-3 rounded-lg">
                      <div className="font-medium mb-1">3. Aproveite Insights</div>
                      <p className="text-muted-foreground">
                        Aprenda com o que funciona e refine sua abordagem
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </AppLayout>
  );
};

export default SocialSelling;
