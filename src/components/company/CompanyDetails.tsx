import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Building2, CircleUser, FileSearch, Globe, MapPin, MessageSquare, TrendingUp, Users, FileText, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";

interface CompanyDetailsProps {
  company: {
    id: string;
    name: string;
    fantasyName: string;
    cnpj: string;
    city: string;
    state: string;
    segment: string;
    employees: string;
    website?: string;
    description?: string;
    yearFounded?: string;
    address?: string;
    revenue?: string;
    digitalMaturity?: number;
    opportunity?: 'hot' | 'warm' | 'cold';
    aiDetected?: boolean;
    companyType?: string;
    porterAnalysis?: {
      competition: number;
      clientPower: number;
      substitutes: number;
      newEntrants: number;
      supplierPower: number;
    };
    creator?: {
      email: string;
      name: string;
      origin: string;
      createdAt: string;
    };
    socialActive?: boolean; // New property for social activity
  };
  onClose?: () => void;
}

const CompanyDetails = ({ company, onClose }: CompanyDetailsProps) => {
  // Format date for display
  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "Data desconhecida";
    try {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    } catch (e) {
      return "Data desconhecida";
    }
  };

  // Format origin label
  const getOriginLabel = (origin?: string) => {
    if (!origin) return "Origem desconhecida";
    switch (origin) {
      case "manual": return "Entrada Manual";
      case "radar": return "Radar IA";
      default: return origin;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-2xl">{company.fantasyName}</CardTitle>
            <CardDescription className="mt-1">{company.name}</CardDescription>
          </div>
          <div className="flex gap-2 flex-wrap items-start">
            {company.socialActive && (
              <Badge className="bg-green-600 text-white hover:bg-green-700">
                🟢 Social Ativo
              </Badge>
            )}
            {company.opportunity && (
              <Badge 
                variant="outline"
                className={
                  company.opportunity === 'hot'
                    ? 'opportunity-hot'
                    : company.opportunity === 'warm'
                    ? 'opportunity-warm'
                    : 'opportunity-cold'
                }
              >
                Oportunidade {company.opportunity === 'hot' ? 'Quente' : company.opportunity === 'warm' ? 'Morna' : 'Fria'}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {company.address || `${company.city}, ${company.state}`}
          </div>
          {company.website && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Globe className="h-4 w-4 mr-1" />
              <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {company.website}
              </a>
            </div>
          )}
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            {company.employees} funcionários
          </div>
        </div>
        
        {/* Creator information */}
        {company.creator && (
          <div className="flex flex-col gap-1 mt-3 bg-muted/30 p-3 rounded-md">
            <div className="text-sm font-medium">
              📌 Origem do Lead: {getOriginLabel(company.creator.origin)}
            </div>
            <div className="text-sm text-muted-foreground flex items-center">
              <CircleUser className="h-4 w-4 mr-1" />
              Inserido por: {company.creator.name} ({company.creator.email})
            </div>
            <div className="text-sm text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Data: {formatDateTime(company.creator.createdAt)}
            </div>
          </div>
        )}
      </CardHeader>
      
      <Tabs defaultValue="overview">
        <TabsList className="mx-6 mt-2">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analysis">Análise Estratégica</TabsTrigger>
          <TabsTrigger value="decision-maker">Decisor</TabsTrigger>
          {company.socialActive && (
            <TabsTrigger value="social">Social Selling</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="overview" className="p-0">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">CNPJ</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-lg font-semibold">{company.cnpj}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Segmento</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-lg font-semibold">{company.segment}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {company.yearFounded ? "Fundada em" : "Tempo de Mercado"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-lg font-semibold">{company.yearFounded || "5-10 anos"}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-sm font-medium text-muted-foreground">Tipo de Empresa</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-lg font-semibold">{company.companyType || "LTDA"}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Descrição</h3>
              <p className="text-muted-foreground">
                {company.description || 
                  `${company.fantasyName} é uma empresa do setor de ${company.segment.toLowerCase()} 
                  localizada em ${company.city}, ${company.state}. A empresa possui aproximadamente 
                  ${company.employees} funcionários e atua no mercado há alguns anos, desenvolvendo 
                  soluções para seus clientes com excelência.`
                }
              </p>
            </div>
            
            {company.digitalMaturity !== undefined && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Maturidade Digital</h3>
                <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                  <div 
                    className="bg-leadhunter-teal h-2.5 rounded-full" 
                    style={{ width: `${company.digitalMaturity}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Iniciante</span>
                  <span>Intermediário</span>
                  <span>Avançado</span>
                </div>
              </div>
            )}
          </CardContent>
        </TabsContent>
        
        <TabsContent value="analysis" className="p-0">
          <CardContent className="p-6 space-y-6">
            {company.porterAnalysis && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Análise de 5 Forças de Porter</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <PorterForceCard 
                    title="Concorrência" 
                    value={company.porterAnalysis.competition}
                  />
                  <PorterForceCard 
                    title="Poder dos Clientes" 
                    value={company.porterAnalysis.clientPower}
                  />
                  <PorterForceCard 
                    title="Substitutos" 
                    value={company.porterAnalysis.substitutes}
                  />
                  <PorterForceCard 
                    title="Novos Entrantes" 
                    value={company.porterAnalysis.newEntrants}
                  />
                  <PorterForceCard 
                    title="Poder dos Fornecedores" 
                    value={company.porterAnalysis.supplierPower}
                  />
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Análise de Fit Comercial</h3>
              <div className="bg-leadhunter-blue-dark text-white p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-leadhunter-teal mt-0.5" />
                  <div>
                    <h4 className="font-medium">
                      {company.opportunity === 'hot' 
                        ? 'Esse lead é Quente. Por quê?' 
                        : company.opportunity === 'warm'
                        ? 'Esse lead é Morna. Por quê?'
                        : 'Esse lead é Frio. Por quê?'
                      }
                    </h4>
                    
                    {company.opportunity === 'hot' && (
                      <ul className="mt-2 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-leadhunter-teal"></div>
                          Crescimento recente detectado
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-leadhunter-teal"></div>
                          Forte presença digital com alta maturidade
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-leadhunter-teal"></div>
                          Demanda clara por soluções como a sua
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-leadhunter-teal"></div>
                          Alta compatibilidade com sua proposta de valor
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-leadhunter-teal"></div>
                          Decisor com perfil inovador e aberto a novidades
                        </li>
                      </ul>
                    )}
                    
                    {company.opportunity === 'warm' && (
                      <ul className="mt-2 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-leadhunter-gold"></div>
                          Potencial de crescimento identificado
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-leadhunter-gold"></div>
                          Presença digital moderada
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-leadhunter-gold"></div>
                          Potencial interesse em soluções como a sua
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-leadhunter-gold"></div>
                          Compatibilidade média com sua proposta
                        </li>
                      </ul>
                    )}
                    
                    {company.opportunity === 'cold' && (
                      <ul className="mt-2 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                          Sem sinais claros de crescimento
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                          Presença digital limitada
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                          Pouca evidência de necessidade de seus serviços
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                          Baixa compatibilidade com sua proposta atual
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="decision-maker" className="p-0">
          <CardContent className="p-6">
            <div className="flex gap-6 items-center mb-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                  <CircleUser className="h-12 w-12 text-muted-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">João Silva</h3>
                <p className="text-muted-foreground">Diretor de Tecnologia</p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <Badge variant="secondary">joao.silva@company.com</Badge>
                  <Badge variant="secondary">(11) 99999-8888</Badge>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">Estilo de Comunicação</h4>
                <Card>
                  <CardHeader className="pb-2">
                    <Badge>Direto e objetivo</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Prefere comunicações diretas e focadas em resultados. 
                      Evite rodeios e foque em números e dados concretos.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3">Presença Digital</h4>
                <div className="space-y-3">
                  <div className="flex gap-2 items-center">
                    <Badge variant="outline">LinkedIn</Badge>
                    <span className="text-sm text-muted-foreground">
                      Postagem frequente, média de 45 interações
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Badge variant="outline">Mídia/Google</Badge>
                    <span className="text-sm text-muted-foreground">
                      Participou de 2 eventos do setor nos últimos 6 meses
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3">Abertura Comercial</h4>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Score de Abertura Comercial</div>
                      <div className="flex items-center">
                        <span className="text-xl font-bold">84</span>
                        <span className="text-sm text-muted-foreground ml-1">/100</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground flex-1">
                      Alta chance de resposta se abordado com foco em inovação e resultados.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </TabsContent>
        
        {company.socialActive && (
          <TabsContent value="social" className="p-0">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Atividade Social do Decisor</h3>
                    <p className="text-sm text-muted-foreground">
                      João Silva está socialmente ativo no LinkedIn
                    </p>
                  </div>
                  <Link to="/social-selling">
                    <Button>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Ativar Social Selling
                    </Button>
                  </Link>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Última atividade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-b pb-3">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-sm">Transformação Digital no Setor de Saúde</h4>
                          <Badge variant="outline" className="text-xs">Artigo</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Publicado em 28/04/2023
                        </div>
                        <div className="text-sm mt-2">
                          <Badge className="bg-green-600 text-xs text-white">🟢 Oportunidade de engajamento</Badge>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <p className="text-sm font-medium flex items-center gap-1 text-blue-800">
                          <span className="text-xl">🧠</span> Sugestão da IA:
                        </p>
                        <p className="text-sm text-blue-700 mt-1">
                          "Este conteúdo tem alta relevância para seu produto. Comece curtindo e adicione um comentário sobre como sua solução pode apoiar a transformação digital no setor."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-center">
                  <Link to="/social-selling">
                    <Button variant="outline">
                      Ver estratégia completa de Social Selling
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </TabsContent>
        )}
      </Tabs>
      
      <CardFooter className="border-t p-6 flex justify-between gap-4">
        <Button variant="outline" onClick={onClose}>
          Voltar
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileSearch className="h-4 w-4 mr-2" />
            Ver Documentos
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            Ativar IA SDR
          </Button>
          {company.socialActive && (
            <Link to="/social-selling">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <MessageSquare className="h-4 w-4 mr-2" />
                Social Selling
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

interface PorterForceCardProps {
  title: string;
  value: number;
}

const PorterForceCard = ({ title, value }: PorterForceCardProps) => {
  const getIntensityText = (val: number) => {
    if (val >= 8) return "Alta";
    if (val >= 5) return "Média";
    return "Baixa";
  };

  const getIntensityColor = (val: number) => {
    if (val >= 8) return "bg-leadhunter-red text-white";
    if (val >= 5) return "bg-leadhunter-gold text-white";
    return "bg-leadhunter-teal text-white";
  };

  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-end justify-between">
          <div className="text-3xl font-bold">{value}/10</div>
          <Badge className={getIntensityColor(value)}>
            {getIntensityText(value)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyDetails;
