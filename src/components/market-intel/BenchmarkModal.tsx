
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface BenchmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const benchmarkData = [
  {
    segment: "Tecnologia",
    growth: "+12.4%",
    averageTicket: "R$ 85.200",
    conversionRate: "8.2%",
    isPositive: true
  },
  {
    segment: "Saúde",
    growth: "+8.1%",
    averageTicket: "R$ 92.800",
    conversionRate: "7.8%",
    isPositive: true
  },
  {
    segment: "Finanças",
    growth: "+6.3%",
    averageTicket: "R$ 124.500",
    conversionRate: "6.1%",
    isPositive: true
  },
  {
    segment: "Varejo",
    growth: "+2.8%",
    averageTicket: "R$ 34.600",
    conversionRate: "4.2%",
    isPositive: true
  },
  {
    segment: "Manufatura",
    growth: "+1.9%",
    averageTicket: "R$ 156.300",
    conversionRate: "3.8%",
    isPositive: true
  },
  {
    segment: "Educação",
    growth: "-0.5%",
    averageTicket: "R$ 28.900",
    conversionRate: "5.1%",
    isPositive: false
  }
];

const BenchmarkModal = ({ isOpen, onClose }: BenchmarkModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            📊 Benchmark por Segmento
          </DialogTitle>
          <DialogDescription>
            Compare o desempenho dos diferentes segmentos de mercado
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
          {benchmarkData.map((segment) => (
            <Card key={segment.segment} className="relative">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  {segment.segment}
                  <Badge variant={segment.isPositive ? "default" : "destructive"}>
                    {segment.isPositive ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {segment.growth}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Crescimento:</span>
                  <span className={`font-medium ${segment.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {segment.growth}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Ticket médio:</span>
                  <span className="font-medium">{segment.averageTicket}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Taxa de conversão:</span>
                  <span className="font-medium">{segment.conversionRate}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BenchmarkModal;
