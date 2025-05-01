
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CompanyHeatMapProps {
  title: string;
  description?: string;
  states: Array<{
    uf: string;
    name: string;
    count: number;
  }>;
  maxCount: number;
}

const CompanyHeatMap = ({ title, description, states, maxCount }: CompanyHeatMapProps) => {
  // Calculate total for percentage calculation
  const totalCount = states.reduce((sum, state) => sum + state.count, 0);
  
  const getHeatIntensity = (count: number) => {
    const percentage = (count / maxCount) * 100;
    if (percentage > 75) return "bg-opacity-90";
    if (percentage > 50) return "bg-opacity-70";
    if (percentage > 25) return "bg-opacity-50";
    if (percentage > 10) return "bg-opacity-30";
    return "bg-opacity-10";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="heat-map p-4 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {states.map((state) => {
              // Calculate percentage for this state
              const statePercentage = ((state.count / totalCount) * 100).toFixed(1);
              
              return (
                <div 
                  key={state.uf}
                  className={`rounded-lg p-3 flex flex-col justify-between bg-leadhunter-blue ${getHeatIntensity(state.count)}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xl font-semibold text-white">{state.uf}</span>
                    <Badge variant="outline" className="bg-white text-leadhunter-blue-dark">
                      {state.count} ({statePercentage}%)
                    </Badge>
                  </div>
                  <div className="text-xs text-white mt-2">
                    {state.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyHeatMap;
