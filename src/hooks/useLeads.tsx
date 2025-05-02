
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Tipos de lead baseados no modelo do banco de dados
export type LeadStatus = 'new' | 'contacted' | 'qualifying' | 'meeting' | 'negotiation' | 'won' | 'lost';
export type OpportunityLevel = 'hot' | 'warm' | 'cold';

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  lastAction?: string;
  lastActionDate?: string;
  status: LeadStatus;
  opportunity?: OpportunityLevel;
  aiRecommendation?: string;
  campaign?: string;
  notes?: string;
  assignedTo?: string;
}

interface UseLeadsOptions {
  onlyAssignedToMe?: boolean;
  status?: LeadStatus;
}

export const useLeads = (options: UseLeadsOptions = {}) => {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchLeads = async () => {
    try {
      setLoading(true);
      
      // Obter o usuário atual
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user;
      
      if (!currentUser && options.onlyAssignedToMe) {
        setError("Você precisa estar logado para ver seus leads");
        setLeads([]);
        return;
      }

      // Construir a consulta
      let query = supabase
        .from('leads')
        .select(`
          id,
          status,
          opportunity,
          last_action,
          last_action_date,
          ai_recommendation,
          campaign,
          notes,
          assigned_to,
          contact_name,
          companies (
            id,
            fantasy_name,
            name
          )
        `);

      // Filtrar por leads atribuídos ao usuário atual
      if (options.onlyAssignedToMe && currentUser) {
        query = query.eq('assigned_to', currentUser.id);
      }

      // Filtrar por status
      if (options.status) {
        query = query.eq('status', options.status);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Mapear os dados para o formato esperado pelo componente
      const formattedLeads = data.map(item => ({
        id: item.id,
        companyName: item.companies?.fantasy_name || item.companies?.name || "Empresa sem nome",
        contactName: item.contact_name || "Contato não especificado",
        lastAction: item.last_action,
        lastActionDate: item.last_action_date 
          ? new Date(item.last_action_date).toLocaleDateString('pt-BR', {
              day: '2-digit', 
              month: '2-digit', 
              hour: '2-digit', 
              minute: '2-digit'
            }) 
          : undefined,
        status: item.status as LeadStatus,
        opportunity: item.opportunity as OpportunityLevel,
        aiRecommendation: item.ai_recommendation,
        campaign: item.campaign,
        notes: item.notes,
        assignedTo: item.assigned_to
      }));

      setLeads(formattedLeads);
    } catch (error: any) {
      console.error("Erro ao buscar leads:", error);
      setError(error.message);
      toast({
        title: "Erro ao carregar leads",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Atualizar o status de um lead
  const updateLeadStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId);

      if (error) throw error;

      // Atualizar os leads na UI sem precisar fazer nova requisição
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      );

      // Registrar a atividade
      await logLeadActivity(leadId, 'status_change', `Status alterado para ${newStatus}`);

      toast({
        title: "Lead atualizado",
        description: `O status do lead foi alterado para ${newStatus}`,
      });

      return true;
    } catch (error: any) {
      console.error("Erro ao atualizar lead:", error);
      toast({
        title: "Erro ao atualizar lead",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  // Registrar atividade de um lead
  const logLeadActivity = async (leadId: string, actionType: string, description: string, metadata?: any) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user;

      const { error } = await supabase
        .from('lead_activities')
        .insert({
          lead_id: leadId,
          user_id: currentUser?.id,
          action_type: actionType,
          description: description,
          metadata: metadata || {},
          performed_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error: any) {
      console.error("Erro ao registrar atividade:", error);
    }
  };

  useEffect(() => {
    fetchLeads();

    // Configurar um listener para atualizações em tempo real
    const channel = supabase
      .channel('public:leads')
      .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'leads' 
          }, 
          () => {
            fetchLeads();
          }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [options.onlyAssignedToMe, options.status]);

  return {
    leads,
    loading,
    error,
    fetchLeads,
    updateLeadStatus,
    logLeadActivity
  };
};
