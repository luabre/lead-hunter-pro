
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Users, MapPin, TrendingUp } from "lucide-react";

interface PotentialScorecardProps {
  userSegment?: string;
}

const PotentialScorecard = ({ userSegment = "Educação" }: PotentialScorecardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-leadhunter-blue" />
            <CardTitle className="text-lg">Seu Potencial neste Cenário</CardTitle>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            IA Projetada
          </Badge>
        </div>
        <CardDescription>
          Estimativa baseada no seu segmento e dados históricos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-leadhunter-blue" />
                <span className="text-sm font-medium">Leads relevantes</span>
              </div>
              <span className="text-lg font-bold text-leadhunter-blue">847</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-leadhunter-green" />
                <span className="text-sm font-medium">Estados ativos</span>
              </div>
              <span className="text-lg font-bold text-leadhunter-green">8</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-leadhunter-teal" />
                <span className="text-sm font-medium">Crescimento est.</span>
              </div>
              <span className="text-lg font-bold text-leadhunter-teal">+42%</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Conversão proj.</span>
              </div>
              <span className="text-lg font-bold text-purple-600">7.2%</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <p className="text-xs text-gray-600">
            💡 <span className="font-medium">Projeção:</span> Com uma campanha ativa no seu segmento, 
            você pode alcançar até <span className="font-bold">61 reuniões qualificadas</span> nos próximos 90 dias.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PotentialScorecard;
