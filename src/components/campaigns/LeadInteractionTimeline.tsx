
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  MessageCircle, 
  Eye, 
  MousePointer, 
  Phone,
  Calendar,
  UserX,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

interface Interaction {
  id: string;
  type: "email_sent" | "email_opened" | "link_clicked" | "whatsapp_sent" | "whatsapp_replied" | "call_completed" | "meeting_scheduled" | "opt_out";
  timestamp: string;
  description: string;
  status: "completed" | "pending" | "failed";
  touchNumber?: number;
}

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "ativo" | "pausado" | "removido" | "engajado" | "sem_engajamento" | "aguardando_reengajamento";
  interactions: Interaction[];
}

interface LeadInteractionTimelineProps {
  lead: Lead;
  onReengage: (leadId: string) => void;
  onPause: (leadId: string) => void;
  onRemove: (leadId: string) => void;
}

const LeadInteractionTimeline = ({ lead, onReengage, onPause, onRemove }: LeadInteractionTimelineProps) => {
  const getInteractionIcon = (type: string) => {
    switch (type) {
      case "email_sent": return <Mail className="h-4 w-4" />;
      case "email_opened": return <Eye className="h-4 w-4" />;
      case "link_clicked": return <MousePointer className="h-4 w-4" />;
      case "whatsapp_sent": return <MessageCircle className="h-4 w-4" />;
      case "whatsapp_replied": return <MessageCircle className="h-4 w-4 text-green-600" />;
      case "call_completed": return <Phone className="h-4 w-4" />;
      case "meeting_scheduled": return <Calendar className="h-4 w-4 text-green-600" />;
      case "opt_out": return <UserX className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getInteractionColor = (type: string) => {
    switch (type) {
      case "email_opened":
      case "link_clicked":
      case "whatsapp_replied":
      case "meeting_scheduled":
        return "text-green-600";
      case "opt_out":
        return "text-red-600";
      case "email_sent":
      case "whatsapp_sent":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge>Ativo</Badge>;
      case "pausado":
        return <Badge variant="secondary">Pausado</Badge>;
      case "removido":
        return <Badge variant="destructive">Removido</Badge>;
      case "engajado":
        return <Badge variant="default" className="bg-green-500">Engajado</Badge>;
      case "sem_engajamento":
        return <Badge variant="outline" className="text-red-600">Sem Engajamento</Badge>;
      case "aguardando_reengajamento":
        return <Badge variant="outline">Aguardando Reengajamento</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const ignoredCount = lead.interactions.filter(i => 
    i.type === "email_sent" && !lead.interactions.some(j => 
      j.type === "email_opened" && j.timestamp > i.timestamp
    )
  ).length;

  const showReengagementOption = lead.status === "sem_engajamento" || ignoredCount >= 2;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {lead.name} - {lead.company}
              {getStatusBadge(lead.status)}
            </CardTitle>
            <div className="text-sm text-muted-foreground mt-1">
              {lead.email} • {lead.phone}
            </div>
          </div>
          <div className="flex gap-2">
            {showReengagementOption && (
              <Button size="sm" variant="outline" onClick={() => onReengage(lead.id)}>
                Reengajar
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={() => onPause(lead.id)}>
              Pausar
            </Button>
            <Button size="sm" variant="outline" onClick={() => onRemove(lead.id)}>
              Remover
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Alerta de Reengajamento */}
        {showReengagementOption && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <div className="font-medium text-yellow-800">
                Lead ignorou {ignoredCount} toques consecutivos
              </div>
              <div className="text-yellow-700">
                Considere reengajar manualmente com uma abordagem diferente.
              </div>
            </div>
          </div>
        )}

        {/* Timeline de Interações */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Linha do Tempo de Interações</h4>
          <div className="space-y-2">
            {lead.interactions.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                Nenhuma interação registrada ainda
              </div>
            ) : (
              lead.interactions
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((interaction) => (
                  <div key={interaction.id} className="flex items-start gap-3 p-2 border rounded-lg">
                    <div className={`p-1 rounded-full ${getInteractionColor(interaction.type)}`}>
                      {getInteractionIcon(interaction.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{interaction.description}</span>
                        {interaction.touchNumber && (
                          <Badge variant="outline" className="text-xs">
                            Toque {interaction.touchNumber}
                          </Badge>
                        )}
                        {interaction.status === "completed" && (
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        )}
                        {interaction.status === "failed" && (
                          <AlertTriangle className="h-3 w-3 text-red-600" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatTimestamp(interaction.timestamp)}
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Estatísticas do Lead */}
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm font-medium">E-mails Enviados</div>
              <div className="text-lg font-bold">
                {lead.interactions.filter(i => i.type === "email_sent").length}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Aberturas</div>
              <div className="text-lg font-bold">
                {lead.interactions.filter(i => i.type === "email_opened").length}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Cliques</div>
              <div className="text-lg font-bold">
                {lead.interactions.filter(i => i.type === "link_clicked").length}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadInteractionTimeline;
