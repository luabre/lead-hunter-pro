
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
import { CircleUser, FileSearch, Globe, MapPin, MessageSquare, TrendingUp, Users } from "lucide-react";

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
    porterAnalysis?: {
      competition: number;
      clientPower: number;
      substitutes: number;
      newEntrants: number;
      supplierPower: number;
    };
  };
  onClose?: () => void;
}

const CompanyDetails = ({ company, onClose }: CompanyDetailsProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-2xl">{company.fantasyName}</CardTitle>
            <CardDescription className="mt-1">{company.name}</CardDescription>
          </div>
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
      </CardHeader>
      
      <Tabs defaultValue="overview">
        <TabsList className="mx-6 mt-2">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analysis">Análise Estratégica</TabsTrigger>
          <TabsTrigger value="decision-maker">Decisor</TabsTrigger>
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
                        ? 'Esse lead é Morno. Por quê?'
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
