
import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useLeads, Lead, LeadStatus } from "@/hooks/useLeads";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Plus, RefreshCcw } from "lucide-react";
import SdrPipelineBoard from "@/components/pipeline/SdrPipelineBoard";
import SdrPipelineStats from "@/components/pipeline/SdrPipelineStats";
import SdrPipelineActions from "@/components/pipeline/SdrPipelineActions";

const MyPipeline = () => {
  const { leads, loading, error, fetchLeads, updateLeadStatus } = useLeads({ onlyAssignedToMe: true });
  const [currentView, setCurrentView] = useState<"board" | "list">("board");
  const [userProfile, setUserProfile] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          toast({
            title: "Não autenticado",
            description: "Faça login para visualizar seu pipeline",
            variant: "destructive",
          });
          return;
        }

        const { data, error } = await (supabase as any)
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;
        setUserProfile(data);
      } catch (error: any) {
        console.error("Erro ao carregar perfil:", error);
      }
    };

    getUserProfile();
  }, []);

  const handleRefresh = () => {
    fetchLeads();
    toast({
      title: "Atualizando",
      description: "Buscando os dados mais recentes...",
    });
  };

  const handleStatusChange = async (lead: Lead, newStatus: LeadStatus) => {
    const success = await updateLeadStatus(lead.id, newStatus);
    return success;
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Meu Pipeline</h1>
          <p className="text-muted-foreground">
            Gerenciamento dos seus leads e oportunidades
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Lead
          </Button>
        </div>
      </div>

      {userProfile && (
        <div className="bg-muted rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">
                {userProfile.first_name} {userProfile.last_name}
              </h2>
              <p className="text-sm text-muted-foreground">{userProfile.role}</p>
            </div>
          </div>
        </div>
      )}

      <Tabs defaultValue="board" className="mb-6">
        <TabsList>
          <TabsTrigger 
            value="board" 
            onClick={() => setCurrentView("board")}
          >
            Pipeline Kanban
          </TabsTrigger>
          <TabsTrigger 
            value="stats" 
            onClick={() => setCurrentView("list")}
          >
            Estatísticas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="board" className="mt-6">
          <SdrPipelineBoard 
            leads={leads}
            loading={loading}
            onStatusChange={handleStatusChange}
          />
        </TabsContent>

        <TabsContent value="stats" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <SdrPipelineStats leads={leads} loading={loading} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mb-6">
        <CardContent className="p-6">
          <SdrPipelineActions />
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default MyPipeline;
