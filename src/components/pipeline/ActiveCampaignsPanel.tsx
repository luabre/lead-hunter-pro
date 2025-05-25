
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Play, Pause, Eye } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  type: "ai" | "manual";
  status: "active" | "paused";
  leadsCount: number;
}

interface ActiveCampaignsPanelProps {
  campaigns: Campaign[];
}

const ActiveCampaignsPanel = ({ campaigns }: ActiveCampaignsPanelProps) => {
  // Mock data para demonstração
  const mockCampaigns: Campaign[] = [
    {
      id: "1",
      name: "Prospecção IA - Tech Startups",
      type: "ai",
      status: "active",
      leadsCount: 45
    },
    {
      id: "2", 
      name: "Follow-up Manual - Enterprise",
      type: "manual",
      status: "active",
      leadsCount: 12
    },
    {
      id: "3",
      name: "Reativação IA - Leads Frios",
      type: "ai",
      status: "paused",
      leadsCount: 23
    }
  ];

  const activeCampaigns = mockCampaigns.filter(c => c.status === "active");

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Play className="h-5 w-5 text-green-500" />
          Minhas Campanhas Ativas
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activeCampaigns.length > 0 ? (
          <div className="space-y-3">
            {activeCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {campaign.type === "ai" ? (
                      <Badge variant="outline" className="border-blue-300 bg-blue-50 text-blue-700">
                        <Zap className="h-3 w-3 mr-1" />
                        IA
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-gray-300 bg-gray-50 text-gray-700">
                        🛠️ Manual
                      </Badge>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{campaign.name}</p>
                    <p className="text-xs text-muted-foreground">{campaign.leadsCount} leads ativos</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <Pause className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhuma campanha ativa no momento
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveCampaignsPanel;
