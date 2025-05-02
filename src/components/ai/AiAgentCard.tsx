
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, Mail, Search } from "lucide-react";

interface AiAgentCardProps {
  type: "sdr" | "closer" | "search";
  onClick?: () => void;
}

const AiAgentCard = ({ type, onClick }: AiAgentCardProps) => {
  return (
    <Card className="bg-leadhunter-blue-dark text-white overflow-hidden">
      <CardHeader className="border-b border-white/20">
        <div className="flex items-center gap-3">
          {type === "sdr" ? (
            <MessageSquare className="h-7 w-7 text-leadhunter-teal" />
          ) : type === "closer" ? (
            <Mail className="h-7 w-7 text-leadhunter-teal" />
          ) : (
            <Search className="h-7 w-7 text-leadhunter-teal" />
          )}
          <div>
            <CardTitle className="text-lg text-white">
              {type === "sdr" ? "IA SDR" : type === "closer" ? "IA Closer" : "Busca com IA"}
            </CardTitle>
            <CardDescription className="text-gray-100">
              {type === "sdr"
                ? "Prospecção e Qualificação Humanizada"
                : type === "closer"
                ? "Fechamento Inteligente e Personalizado"
                : "Encontre empresas do mercado com IA"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-sm mb-4 text-white">
          {type === "sdr" && (
            <>
              <p className="mb-2">
                A IA SDR automatiza a primeira abordagem, com sequências de
                mensagens personalizadas adaptadas ao perfil do lead.
              </p>
              <p>
                Ela qualifica os leads, avalia interesse e facilita o trabalho do time
                humano.
              </p>
            </>
          )}

          {type === "closer" && (
            <>
              <p className="mb-2">
                A IA Closer analisa os leads já qualificados para entregar abordagens
                de fechamento precisas e eficazes.
              </p>
              <p>
                Envia propostas personalizadas e acompanha sinais de prontidão para
                fechamento.
              </p>
            </>
          )}

          {type === "search" && (
            <>
              <p className="mb-2">
                Nossa IA extrai empresas do mercado com apenas o segmento que você informar.
              </p>
              <p>
                Descubra novos leads potenciais com dados completos e enriquecidos automaticamente.
              </p>
            </>
          )}
        </div>

        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full border-white text-white hover:bg-white/20 font-medium"
            onClick={onClick}
          >
            {type === "sdr" 
              ? "Iniciar Prospecção" 
              : type === "closer" 
              ? "Gerar Proposta" 
              : "Descobrir Empresas"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiAgentCard;
