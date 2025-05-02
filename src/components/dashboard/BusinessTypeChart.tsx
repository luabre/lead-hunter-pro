
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface BusinessTypeChartProps {
  title: string;
  description?: string;
  data: Array<{ name: string; value: number }>;
}

const COLORS = ['#1E88E5', '#00BFA5', '#FFC107', '#FF5252', '#4CAF50', '#9C27B0'];

const BusinessTypeChart = ({ title, description, data }: BusinessTypeChartProps) => {
  // Calculate total for percentage calculation (with safety check)
  const total = data?.reduce((sum, item) => sum + (item?.value || 0), 0) || 0;
  
  // Add percentage to data with null checks
  const dataWithPercentage = data?.map(item => ({
    ...item,
    percentage: total > 0 ? ((item.value / total) * 100).toFixed(1) : '0.0'
  })) || [];

  // Format for tooltip display only
  const formatTooltipValue = (value: number) => {
    return `${value} empresas`;
  };

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
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={false} // Remove direct labels from pie segments
              >
                {dataWithPercentage.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right" 
                formatter={(value, entry) => {
                  // Use the data from dataWithPercentage instead of trying to access entry.payload
                  const item = dataWithPercentage.find(item => item.name === value);
                  if (!item) return value;
                  return `${value}: ${item.value} (${item.percentage}%)`;
                }}
              />
              <Tooltip 
                formatter={formatTooltipValue}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessTypeChart;
