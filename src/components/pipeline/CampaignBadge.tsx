
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface CampaignBadgeProps {
  campaignType: "ai" | "manual";
  size?: "sm" | "md";
}

const CampaignBadge = ({ campaignType, size = "sm" }: CampaignBadgeProps) => {
  const isAI = campaignType === "ai";
  
  return (
    <Badge 
      variant="outline" 
      className={`
        ${size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"}
        ${isAI 
          ? "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100" 
          : "border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
        }
        font-medium transition-colors
      `}
    >
      {isAI ? (
        <>
          <Zap className="h-3 w-3 mr-1" />
          IA Ativa
        </>
      ) : (
        <>
          🛠️ Manual
        </>
      )}
    </Badge>
  );
};

export default CampaignBadge;
