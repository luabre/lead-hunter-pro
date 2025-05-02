
import { Lead } from "@/hooks/useLeads";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SdrPipelineStatsProps {
  leads: Lead[];
  loading: boolean;
}

const SdrPipelineStats = ({ leads, loading }: SdrPipelineStatsProps) => {
  if (loading) {
    return (
      <div className="text-center p-4">
        <p className="text-muted-foreground">Carregando estatísticas...</p>
      </div>
    );
  }

  // Calcular estatísticas
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const contactedLeads = leads.filter(l => l.status === 'contacted').length;
  const qualifiedLeads = leads.filter(l => l.status === 'qualifying').length;
  const meetingsLeads = leads.filter(l => l.status === 'meeting').length;
  const negotiationLeads = leads.filter(l => l.status === 'negotiation').length;
  const wonLeads = leads.filter(l => l.status === 'won').length;
  const lostLeads = leads.filter(l => l.status === 'lost').length;
  
  // Calcular taxas
  const responseRate = totalLeads ? Math.round((contactedLeads / totalLeads) * 100) : 0;
  const qualificationRate = contactedLeads ? Math.round((qualifiedLeads / contactedLeads) * 100) : 0;
  const meetingRate = qualifiedLeads ? Math.round((meetingsLeads / qualifiedLeads) * 100) : 0;
  const conversionRate = meetingsLeads ? Math.round((wonLeads / meetingsLeads) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total de Leads</div>
          <div className="text-2xl font-bold mt-1">{totalLeads}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Leads Quentes</div>
          <div className="text-2xl font-bold mt-1">
            {leads.filter(l => l.opportunity === 'hot').length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Reuniões Agendadas</div>
          <div className="text-2xl font-bold mt-1">{meetingsLeads}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Leads Ganhos</div>
          <div className="text-2xl font-bold mt-1 text-green-600">{wonLeads}</div>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Funil de Conversão</h2>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center text-sm">
            <span>Taxa de Resposta</span>
            <span className="font-medium">{responseRate}%</span>
          </div>
          <Progress value={responseRate} className="h-2" />
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center text-sm">
            <span>Taxa de Qualificação</span>
            <span className="font-medium">{qualificationRate}%</span>
          </div>
          <Progress value={qualificationRate} className="h-2" />
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center text-sm">
            <span>Taxa de Agendamento</span>
            <span className="font-medium">{meetingRate}%</span>
          </div>
          <Progress value={meetingRate} className="h-2" />
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center text-sm">
            <span>Taxa de Conversão</span>
            <span className="font-medium">{conversionRate}%</span>
          </div>
          <Progress value={conversionRate} className="h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Distribuição por Etapa</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-2 text-sm">
              <span className="text-muted-foreground">Novo</span>
              <span className="font-medium">{newLeads}</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-muted-foreground">Contato Enviado</span>
              <span className="font-medium">{contactedLeads}</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-muted-foreground">Em Qualificação</span>
              <span className="font-medium">{qualifiedLeads}</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-muted-foreground">Reunião Agendada</span>
              <span className="font-medium">{meetingsLeads}</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-muted-foreground">Negociação</span>
              <span className="font-medium">{negotiationLeads}</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-muted-foreground">Ganhou</span>
              <span className="font-medium text-green-600">{wonLeads}</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-muted-foreground">Perdeu</span>
              <span className="font-medium text-red-600">{lostLeads}</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 md:col-span-2">
          <h3 className="text-sm font-medium mb-2">Insights IA</h3>
          <div className="space-y-4">
            {leads.length > 0 ? (
              <>
                <div className="border-l-2 border-leadhunter-teal pl-3">
                  <p className="text-sm">
                    <span className="font-medium">Recomendação:</span> Priorize os {leads.filter(l => l.opportunity === 'hot').length} leads quentes para maior taxa de conversão.
                  </p>
                </div>
                <div className="border-l-2 border-leadhunter-teal pl-3">
                  <p className="text-sm">
                    <span className="font-medium">Insight:</span> {qualifiedLeads} leads estão qualificados e prontos para agendamento.
                  </p>
                </div>
                <div className="border-l-2 border-leadhunter-teal pl-3">
                  <p className="text-sm">
                    <span className="font-medium">Alerta:</span> {negotiationLeads} leads em negociação precisam de follow-up.
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Ainda não há leads suficientes para gerar insights.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SdrPipelineStats;
