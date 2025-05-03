
import AppLayout from "@/components/layout/AppLayout";
import PerformanceAIDashboard from "@/components/performance/PerformanceAIDashboard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText } from "lucide-react";

const PerformanceDashboard = () => {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard de Performance</h1>
          <p className="text-muted-foreground">
            Análise inteligente e acompanhamento de metas
          </p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Período atual</SelectItem>
              <SelectItem value="last">Período anterior</SelectItem>
              <SelectItem value="q1">Q1 2025</SelectItem>
              <SelectItem value="q2">Q2 2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      <PerformanceAIDashboard />
    </AppLayout>
  );
};

export default PerformanceDashboard;
