
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface BusinessTypeChartProps {
  title: string;
  description?: string;
  data: Array<{ name: string; value: number }>;
}

const COLORS = ['#1E88E5', '#00BFA5', '#FFC107', '#FF5252', '#4CAF50', '#9C27B0'];

const BusinessTypeChart = ({ title, description, data }: BusinessTypeChartProps) => {
  // Calculate total for percentage calculation
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Add percentage to data
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
            <PieChart>
              <Pie
                data={dataWithPercentage}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={100}
                dataKey="value"
                label={({name, value, percentage}) => `${name}: ${percentage}%`}
              >
                {dataWithPercentage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right" 
                formatter={(value, entry, index) => {
                  const item = dataWithPercentage[index];
                  return `${value}: ${item.value} (${item.percentage}%)`;
                }}
              />
              <Tooltip 
                formatter={(value: number, name: string, props: any) => {
                  return [`${value} empresas (${props.payload.percentage}%)`, 'Quantidade'];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessTypeChart;
