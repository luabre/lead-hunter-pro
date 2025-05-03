
import { useState, useEffect } from "react";
import { Campaign } from "@/types/campaign";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Mock data for demonstration
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Prospecção Tecnologia Q2",
    status: "active",
    objective: "Prospecção de empresas do setor de tecnologia",
    progress: 45,
    totalLeads: 120,
    leadSource: "smart-search",
    responses: 23,
    meetings: 5,
    conversionRate: 4.2,
    createdAt: "2025-04-15T10:30:00",
    remainingDays: 12
  },
  {
    id: "2",
    name: "Follow-up Clientes Financeiro",
    status: "active",
    objective: "Reativação de clientes do setor financeiro",
    progress: 72,
    totalLeads: 85,
    leadSource: "existing-base",
    responses: 42,
    meetings: 18,
    conversionRate: 21.2,
    createdAt: "2025-04-10T14:45:00",
    remainingDays: 5
  },
  {
    id: "3",
    name: "Nutrição Leads Saúde",
    status: "draft",
    objective: "Nutrição de leads do setor de saúde",
    progress: 0,
    totalLeads: 64,
    leadSource: "import",
    responses: 0,
    meetings: 0,
    conversionRate: 0,
    createdAt: "2025-04-25T09:15:00",
    remainingDays: 30
  },
  {
    id: "4",
    name: "Upsell Clientes Manufatura",
    status: "paused",
    objective: "Oferta de novos produtos para clientes existentes",
    progress: 28,
    totalLeads: 42,
    leadSource: "existing-base",
    responses: 8,
    meetings: 2,
    conversionRate: 4.8,
    createdAt: "2025-04-05T11:20:00",
    remainingDays: 14
  },
  {
    id: "5",
    name: "Prospecção Varejo Q1",
    status: "completed",
    objective: "Prospecção de empresas do setor de varejo",
    progress: 100,
    totalLeads: 95,
    leadSource: "smart-search",
    responses: 37,
    meetings: 15,
    conversionRate: 15.8,
    createdAt: "2025-03-01T08:00:00",
    remainingDays: 0
  }
];

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      
      // In a real application, this would be a call to Supabase
      // const { data: { session } } = await supabase.auth.getSession();
      // const userId = session?.user?.id;
      
      // const { data, error } = await supabase
      //   .from('campaigns')
      //   .select('*')
      //   .order('created_at', { ascending: false });
      
      // if (error) throw error;
      
      // For now, we'll use mock data
      setTimeout(() => {
        setCampaigns(mockCampaigns);
        setActiveCampaigns(mockCampaigns.filter(c => c.status === 'active'));
        setIsLoading(false);
      }, 1000);
      
    } catch (error: any) {
      console.error("Error fetching campaigns:", error);
      setError(error.message);
      toast({
        title: "Erro ao carregar campanhas",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Create a new campaign
  const createCampaign = async (campaignData: Partial<Campaign>) => {
    try {
      setIsLoading(true);
      
      // In a real application, this would be a call to Supabase
      // const { data: { session } } = await supabase.auth.getSession();
      // const userId = session?.user?.id;
      
      // const { data, error } = await supabase
      //   .from('campaigns')
      //   .insert({
      //     ...campaignData,
      //     created_by: userId,
      //   })
      //   .select();
      
      // if (error) throw error;
      
      // For now, we'll simulate creating a campaign
      const newCampaign: Campaign = {
        id: `${Date.now()}`,
        name: campaignData.name || "Nova Campanha",
        status: campaignData.status || "draft",
        objective: campaignData.objective || "",
        progress: 0,
        totalLeads: campaignData.totalLeads || 0,
        leadSource: campaignData.leadSource || "smart-search",
        responses: 0,
        meetings: 0,
        conversionRate: 0,
        createdAt: new Date().toISOString(),
        remainingDays: 30
      };
      
      setCampaigns([newCampaign, ...campaigns]);
      
      if (newCampaign.status === 'active') {
        setActiveCampaigns([newCampaign, ...activeCampaigns]);
      }
      
      toast({
        title: "Campanha criada",
        description: `A campanha ${newCampaign.name} foi criada com sucesso.`,
      });
      
      return newCampaign;
      
    } catch (error: any) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Erro ao criar campanha",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing campaign
  const updateCampaign = async (id: string, updates: Partial<Campaign>) => {
    try {
      // In a real application, this would be a call to Supabase
      // const { error } = await supabase
      //   .from('campaigns')
      //   .update(updates)
      //   .eq('id', id);
      
      // if (error) throw error;
      
      // For now, we'll simulate updating a campaign
      const updatedCampaigns = campaigns.map(campaign => 
        campaign.id === id ? { ...campaign, ...updates } : campaign
      );
      
      setCampaigns(updatedCampaigns);
      setActiveCampaigns(updatedCampaigns.filter(c => c.status === 'active'));
      
      toast({
        title: "Campanha atualizada",
        description: "As alterações foram salvas com sucesso.",
      });
      
    } catch (error: any) {
      console.error("Error updating campaign:", error);
      toast({
        title: "Erro ao atualizar campanha",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Delete a campaign
  const deleteCampaign = async (id: string) => {
    try {
      // In a real application, this would be a call to Supabase
      // const { error } = await supabase
      //   .from('campaigns')
      //   .delete()
      //   .eq('id', id);
      
      // if (error) throw error;
      
      // For now, we'll simulate deleting a campaign
      const updatedCampaigns = campaigns.filter(campaign => campaign.id !== id);
      
      setCampaigns(updatedCampaigns);
      setActiveCampaigns(updatedCampaigns.filter(c => c.status === 'active'));
      
      toast({
        title: "Campanha excluída",
        description: "A campanha foi excluída com sucesso.",
      });
      
    } catch (error: any) {
      console.error("Error deleting campaign:", error);
      toast({
        title: "Erro ao excluir campanha",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCampaigns();
    
    // In the future, we could subscribe to real-time updates here
    // const subscription = supabase
    //   .channel('public:campaigns')
    //   .on('postgres_changes', { event: '*', schema: 'public', table: 'campaigns' }, () => {
    //     fetchCampaigns();
    //   })
    //   .subscribe();
    
    // return () => {
    //   supabase.removeChannel(subscription);
    // };
  }, []);

  return {
    campaigns,
    activeCampaigns,
    isLoading,
    error,
    fetchCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign
  };
};
