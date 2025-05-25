import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import LeadImportStepper from "@/components/import/LeadImportStepper";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileType2, Timer, Sparkles, Shield, UserCheck, BadgeCheck, FileChartColumn, FileChartPie } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import StatsCard from "@/components/dashboard/StatsCard";

const LeadImport = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const [showCleanseResults, setShowCleanseResults] = useState(true);
  
  // Detect campaign type from URL params or state
  const campaignType = (location.state?.campaignType || 
                       new URLSearchParams(location.search).get('type') || 
                       'cnpj') as 'cnpj' | 'cpf';

  // Dados simulados para a demonstração dos outputs de limpeza
  const cleanseData = {
    corrected: 187,
    enriched: 143,
    removed: 25,
    total: 250,
    details: {
      cnpjCorrected: 23,
      emailsValidated: 187,
      phonesStandardized: 54,
      duplicatesRemoved: 25
    }
  };

  const segmentData = [
    { name: "Tecnologia", value: 78 },
    { name: "Saúde", value: 43 },
    { name: "Educação", value: 35 },
    { name: "Varejo", value: 27 },
    { name: "Finanças", value: 15 }
  ];

  const handleComplete = () => {
    navigate("/pipeline");
  };

  const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#10B981'];

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Download className="size-6 text-primary" />
            <h1 className="text-3xl font-bold">
              Importação Inteligente de {campaignType === 'cpf' ? 'Contatos PF' : 'Leads'}
            </h1>
          </div>
          <p className="text-muted-foreground mt-1">
            Importe, limpe e enriqueça sua base de {campaignType === 'cpf' ? 'contatos' : 'leads'} automaticamente
          </p>
        </div>

        {/* Help badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 flex items-center gap-3">
            <FileType2 className="size-5 text-blue-500" />
            <div className="text-sm">
              <p className="font-medium">Formatos aceitos</p>
              <p className="text-muted-foreground">.xlsx ou .csv até 10 MB</p>
            </div>
          </Card>
          
          <Card className="p-4 flex items-center gap-3">
            <Timer className="size-5 text-amber-500" />
            <div className="text-sm">
              <p className="font-medium">Processamento</p>
              <p className="text-muted-foreground">
                Menos de 3 minutos para 1000 {campaignType === 'cpf' ? 'contatos' : 'leads'}
              </p>
            </div>
          </Card>
          
          <Card className="p-4 flex items-center gap-3">
            <Shield className="size-5 text-green-500" />
            <div className="text-sm">
              <p className="font-medium">Proteção LGPD</p>
              <p className="text-muted-foreground">
                {campaignType === 'cpf' 
                  ? 'Declaração de consentimento obrigatória' 
                  : 'Conformidade com normas de proteção'
                }
              </p>
            </div>
          </Card>
        </div>

        {/* Main stepper card */}
        <Card className="p-6">
          <LeadImportStepper 
            currentStep={currentStep} 
            onStepChange={setCurrentStep}
            onComplete={handleComplete}
            campaignType={campaignType}
          />
        </Card>

        {/* Benefits section */}
        {currentStep === 1 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Sparkles className="size-4 text-amber-500" />
              <span>
                Benefícios da importação {campaignType === 'cpf' ? 'de contatos PF' : 'inteligente'}
              </span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaignType === 'cnpj' ? (
                <>
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h4 className="font-medium mb-1">Limpeza automatizada</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Remoção de duplicidades de CNPJ</li>
                      <li>• Correção de e-mails inválidos</li>
                      <li>• Padronização de telefones e contatos</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h4 className="font-medium mb-1">Enriquecimento com IA</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Preenchimento automático de dados faltantes</li>
                      <li>• Classificação por segmento e porte</li>
                      <li>• Detecção de potencial comercial</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h4 className="font-medium mb-1">🔐 Conformidade LGPD</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Declaração de consentimento obrigatória</li>
                      <li>• Respeito automático a opt-outs</li>
                      <li>• Logs de consentimento com timestamp</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h4 className="font-medium mb-1">📋 Validação de dados</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Verificação de formato de e-mails</li>
                      <li>• Padronização de telefones</li>
                      <li>• Remoção de contatos duplicados</li>
                    </ul>
                  </div>
                </>
              )}
              
              <div className="bg-muted/40 p-4 rounded-lg">
                <h4 className="font-medium mb-1">Auditoria e rastreabilidade</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Log completo de todas as importações</li>
                  <li>• Relatório detalhado de modificações</li>
                  <li>• Conformidade com LGPD</li>
                </ul>
              </div>
              
              <div className="bg-muted/40 p-4 rounded-lg">
                <h4 className="font-medium mb-1">Agilidade operacional</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Distribuição automática para SDRs</li>
                  <li>• Integração direta com o pipeline</li>
                  <li>• Exportação de relatórios completos</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Cleanse Outputs Section - Demonstration */}
        {currentStep === 1 && showCleanseResults && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <BadgeCheck className="size-5 text-green-500" />
                <span>Demonstração: Resultados da Última Importação</span>
              </h3>
              <span className="text-xs text-muted-foreground">Exemplo de visualização pós-processamento</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatsCard
                title="Leads Processados"
                value={cleanseData.total}
                icon={<FileChartColumn className="size-5" />}
              />
              <StatsCard
                title="Dados Corrigidos"
                value={cleanseData.corrected}
                icon={<BadgeCheck className="size-5" />}
                trend="up"
                trendValue="74,8% da base"
              />
              <StatsCard
                title="Dados Enriquecidos"
                value={cleanseData.enriched}
                icon={<Sparkles className="size-5" />}
                trend="up"
                trendValue="57,2% da base"
              />
              <StatsCard
                title="Duplicatas Removidas"
                value={cleanseData.removed}
                icon={<Shield className="size-5" />}
                trend="down"
                trendValue="10% da base"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-4">Detalhamento da Limpeza</h4>
                  <div className="h-64">
                    <ChartContainer
                      config={{
                        cnpj: { color: "#8B5CF6" },
                        emails: { color: "#D946EF" },
                        telefones: { color: "#F97316" },
                        duplicatas: { color: "#0EA5E9" }
                      }}
                    >
                      <BarChart
                        data={[
                          { name: "CNPJ Corrigidos", value: cleanseData.details.cnpjCorrected, key: "cnpj" },
                          { name: "E-mails Validados", value: cleanseData.details.emailsValidated, key: "emails" },
                          { name: "Telefones Padronizados", value: cleanseData.details.phonesStandardized, key: "telefones" },
                          { name: "Duplicatas Removidas", value: cleanseData.details.duplicatesRemoved, key: "duplicatas" }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                        <YAxis />
                        <ChartTooltip
                          content={<ChartTooltipContent labelClassName="font-medium" />}
                        />
                        <Bar dataKey="value">
                          {[
                            <Cell key="0" fill="#8B5CF6" />,
                            <Cell key="1" fill="#D946EF" />,
                            <Cell key="2" fill="#F97316" />,
                            <Cell key="3" fill="#0EA5E9" />
                          ]}
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-4">Distribuição por Segmento</h4>
                  <div className="h-64">
                    <ChartContainer
                      config={{
                        tech: { color: "#8B5CF6" },
                        health: { color: "#D946EF" },
                        education: { color: "#F97316" },
                        retail: { color: "#0EA5E9" },
                        finance: { color: "#10B981" }
                      }}
                    >
                      <PieChart>
                        <Pie
                          data={segmentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {segmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent labelKey="name" />} />
                      </PieChart>
                    </ChartContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {segmentData.map((segment, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <div className="flex justify-between w-full">
                          <span>{segment.name}</span>
                          <span className="font-medium">{segment.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default LeadImport;
