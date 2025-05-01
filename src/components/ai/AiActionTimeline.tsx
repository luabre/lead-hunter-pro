
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Brain, ChartBar, MessageSquare, Database, Lightbulb, RefreshCcw, Activity, Mail, Calendar } from "lucide-react";

// Mock data
const timelineData = [
  {
    id: 1,
    time: new Date(2025, 4, 1, 9, 15),
    type: "alert",
    title: "Alerta de Performance",
    description: "Detectada baixa resposta nos leads de João Silva",
    action: "Ajuste automático de script e canal de comunicação",
    icon: "activity"
  },
  {
    id: 2,
    time: new Date(2025, 4, 1, 10, 23),
    type: "funnel",
    title: "Otimização do Funil",
    description: "22 leads encontrados parados há mais de 7 dias",
    action: "Reorganização por prioridade e disparos estratégicos",
    icon: "chartBar"
  },
  {
    id: 3,
    time: new Date(2025, 4, 1, 11, 40),
    type: "lead",
    title: "Lead Prioritário",
    description: "TechSol visitou a proposta 3x nas últimas 24h",
    action: "Envio automático de follow-up personalizado",
    icon: "mail"
  },
  {
    id: 4,
    time: new Date(2025, 4, 1, 13, 5),
    type: "insight",
    title: "Insight de Mercado",
    description: "Detectado aumento de 27% nas buscas por soluções de IA",
    action: "Sugestão de campanha focada em inteligência artificial",
    icon: "lightbulb"
  },
  {
    id: 5,
    time: new Date(2025, 4, 1, 14, 30),
    type: "meeting",
    title: "Reagendamento Inteligente",
    description: "Conflito detectado na agenda de Marcos para 15h",
    action: "Reagendamento automático com cliente para 16h30",
    icon: "calendar"
  },
  {
    id: 6,
    time: new Date(2025, 4, 1, 15, 45),
    type: "campaign",
    title: "Campanha Otimizada",
    description: "Baixa taxa de abertura (12%) na campanha 'Webinar Maio'",
    action: "Geração e teste A/B de 3 novos assuntos",
    icon: "messageSquare"
  },
  {
    id: 7,
    time: new Date(2025, 4, 1, 16, 20),
    type: "upgrade",
    title: "Oportunidade de Upgrade",
    description: "Cliente NaturFood utilizando 92% do plano atual",
    action: "Envio automático de proposta personalizada de upgrade",
    icon: "database"
  },
  {
    id: 8,
    time: new Date(2025, 4, 1, 17, 10),
    type: "ai",
    title: "Aprendizado do Sistema",
    description: "Atualização da base de conhecimento com novos padrões",
    action: "Refinamento dos algoritmos de detecção de oportunidades",
    icon: "brain"
  },
  {
    id: 9,
    time: new Date(2025, 4, 1, 18, 0),
    type: "report",
    title: "Relatório Diário",
    description: "Compilação automática de resultados e atividades",
    action: "Envio de relatório para gestores com insights estratégicos",
    icon: "refreshCcw"
  },
];

const getTypeColor = (type: string): string => {
  switch (type) {
    case "alert": return "bg-red-100 text-red-700 border-red-200";
    case "funnel": return "bg-amber-100 text-amber-700 border-amber-200";
    case "lead": return "bg-blue-100 text-blue-700 border-blue-200";
    case "insight": return "bg-purple-100 text-purple-700 border-purple-200";
    case "meeting": return "bg-indigo-100 text-indigo-700 border-indigo-200";
    case "campaign": return "bg-green-100 text-green-700 border-green-200";
    case "upgrade": return "bg-pink-100 text-pink-700 border-pink-200";
    case "ai": return "bg-cyan-100 text-cyan-700 border-cyan-200";
    case "report": return "bg-slate-100 text-slate-700 border-slate-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getTypeLabel = (type: string): string => {
  switch (type) {
    case "alert": return "Alerta";
    case "funnel": return "Funil";
    case "lead": return "Lead";
    case "insight": return "Insight";
    case "meeting": return "Agenda";
    case "campaign": return "Campanha";
    case "upgrade": return "Upgrade";
    case "ai": return "IA";
    case "report": return "Relatório";
    default: return type;
  }
};

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "activity": return <Activity className="h-5 w-5" />;
    case "chartBar": return <ChartBar className="h-5 w-5" />;
    case "messageSquare": return <MessageSquare className="h-5 w-5" />;
    case "database": return <Database className="h-5 w-5" />;
    case "lightbulb": return <Lightbulb className="h-5 w-5" />;
    case "refreshCcw": return <RefreshCcw className="h-5 w-5" />;
    case "brain": return <Brain className="h-5 w-5" />;
    case "mail": return <Mail className="h-5 w-5" />;
    case "calendar": return <Calendar className="h-5 w-5" />;
    default: return <Activity className="h-5 w-5" />;
  }
};

const AiActionTimeline = () => {
  return (
    <>
      <Card className="border-blue-200 bg-blue-50/20 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Linha do Tempo do Gerente de IA
          </CardTitle>
          <CardDescription>
            Todas as ações realizadas pelo Gerente de IA hoje
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <div key={item.id} className="relative">
                {/* Timeline connector line */}
                {index < timelineData.length - 1 && (
                  <div className="absolute top-10 bottom-0 left-5 w-0.5 bg-gray-100"></div>
                )}
                
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className={`rounded-full p-2.5 ${getTypeColor(item.type)} flex-shrink-0 z-10`}>
                    {getIcon(item.icon)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                      <div className="flex items-center gap-2 mb-1 md:mb-0">
                        <h3 className="font-medium text-lg">{item.title}</h3>
                        <Badge className={`${getTypeColor(item.type)} border`}>
                          {getTypeLabel(item.type)}
                        </Badge>
                      </div>
                      <time className="text-sm text-muted-foreground">
                        {format(item.time, "HH:mm")}
                      </time>
                    </div>
                    <p className="text-muted-foreground mb-2">{item.description}</p>
                    <div className="bg-muted/30 px-3 py-2 rounded-md">
                      <div className="flex items-start gap-2">
                        <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                        <p className="text-sm">
                          <span className="text-blue-600 font-medium">Ação:</span> {item.action}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AiActionTimeline;
