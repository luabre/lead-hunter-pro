
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface MarketChartProps {
  title: string;
  description?: string;
  data: Array<{ name: string; value: number }>;
  color?: string;
}

const MarketChart = ({ title, description, data, color = "#1E88E5" }: MarketChartProps) => {
  // Calculate total for percentage calculation
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Add percentage to data - ensure it's always a string value
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1)
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataWithPercentage}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value: number, name: string, props: any) => {
                  // Safely access the payload properties with null checks
                  if (name === 'value' && props?.payload) {
                    return [
                      `${props.payload.value || 0} empresas (${props.payload.percentage || '0.0'}%)`, 
                      'Quantidade'
                    ];
                  }
                  return [value, name];
                }}
                labelFormatter={(name) => `Região: ${name}`}
              />
              <Bar 
                dataKey="value" 
                fill={color} 
                radius={[4, 4, 0, 0]}
                label={{ 
                  position: 'top', 
                  content: (props: any) => {
                    const { x, y, width, value, payload } = props;
                    // Add null check for payload before accessing percentage
                    if (!payload) return null;
                    
                    return (
                      <text 
                        x={x + width / 2} 
                        y={y - 10} 
                        fill="#666" 
                        textAnchor="middle" 
                        fontSize={12}
                      >
                        {`${payload.percentage || '0.0'}%`}
                      </text>
                    );
                  }
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketChart;
