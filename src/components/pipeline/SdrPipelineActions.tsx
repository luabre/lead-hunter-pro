import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Calendar, FileText, MessageSquare, Phone, Import } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const SdrPipelineActions = () => {
  const [aiAssistantActive, setAiAssistantActive] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleAiAssistant = () => {
    setAiAssistantActive(!aiAssistantActive);
    toast({
      title: aiAssistantActive ? "IA Desativada" : "IA Ativada",
      description: aiAssistantActive 
        ? "Seu assistente IA está agora desativado" 
        : "Seu assistente IA está agora ativo e irá ajudar com seus leads",
    });
  };

  const handleAction = (actionType: string) => {
    switch (actionType) {
      case "meeting":
        navigate("/meetings");
        break;
      case "report":
        navigate("/dashboard");
        break;
      case "message":
        navigate("/ia-sdr");
        break;
      case "call":
        navigate("/contacts");
        break;
      case "import":
        navigate("/lead-import");
        break;
      default:
        console.log("Action not implemented:", actionType);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Ações Rápidas</h3>
        <div className="flex gap-1 overflow-x-auto">
          <Button 
            variant="outline"
            size="sm"
            className="h-8 w-auto px-2 flex-shrink-0 whitespace-nowrap font-medium"
            onClick={() => handleAction("meeting")}
          >
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Agendar Reuniões</span>
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            className="h-8 w-auto px-2 flex-shrink-0 whitespace-nowrap"
            onClick={() => handleAction("report")}
          >
            <FileText className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Ver Relatórios</span>
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            className="h-8 w-auto px-2 flex-shrink-0 whitespace-nowrap"
            onClick={() => handleAction("message")}
          >
            <MessageSquare className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Mensagens</span>
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            className="h-8 w-auto px-2 flex-shrink-0 whitespace-nowrap"
            onClick={() => handleAction("call")}
          >
            <Phone className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Ligações</span>
          </Button>

          <Button 
            variant="outline"
            size="sm"
            className="h-8 w-auto px-2 flex-shrink-0 whitespace-nowrap"
            onClick={() => handleAction("import")}
          >
            <Import className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Importar Leads</span>
          </Button>
        </div>
      </div>
      
      <div className="bg-muted/50 p-4 rounded-lg border border-muted">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Brain className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium flex items-center gap-2">
                Assistente IA SDR
                <Badge 
                  variant={aiAssistantActive ? "default" : "outline"}
                  className={aiAssistantActive ? "bg-green-500 hover:bg-green-600 text-white font-medium" : ""}
                >
                  {aiAssistantActive ? "Ativo" : "Desativado"}
                </Badge>
              </h3>
              <p className="text-sm text-foreground">
                Seu assistente pessoal para automaizar abordagens e qualificação
              </p>
            </div>
          </div>
          
          <Button 
            onClick={toggleAiAssistant}
            variant={aiAssistantActive ? "destructive" : "default"}
            className="font-medium"
          >
            {aiAssistantActive ? "Desativar" : "Ativar"} Assistente
          </Button>
        </div>
        
        {aiAssistantActive && (
          <div className="mt-4 p-3 bg-background rounded-md border">
            <h4 className="text-sm font-medium mb-2">Tarefas automatizadas (últimas 24h)</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">09:45</Badge>
                <span className="text-foreground">Lead "Tech Solutions" - Enviado email de follow-up</span>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">11:20</Badge>
                <span className="text-foreground">Lead "ABC Corp" - Qualificado como oportunidade quente</span>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">14:30</Badge>
                <span className="text-foreground">Lead "XYZ Inc" - Agendado alerta para 2ª tentativa</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SdrPipelineActions;
