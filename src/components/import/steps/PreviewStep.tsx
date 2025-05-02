
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Search, FileText, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { exportAsCSV } from "@/utils/exportUtils";
import { ProcessedData } from "../LeadImportStepper";
import { useToast } from "@/hooks/use-toast";

interface PreviewStepProps {
  data: ProcessedData;
  onApprove: () => void;
  onBack: () => void;
}

const PreviewStep = ({ data, onApprove, onBack }: PreviewStepProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("valid");
  const { toast } = useToast();
  
  // Process data for display
  const validLeads = data.leads.filter((lead: any) => 
    lead.status === "OK" || lead.status === "Corrigido" || lead.status === "Enriquecido"
  );
  
  const failedLeads = data.leads.filter((lead: any) => lead.status === "Falhou" || lead.status === "Rejeitado");
  
  // Stats for display
  const stats = {
    total: data.total,
    valid: data.total - data.failed,
    enriched: data.enriched,
    corrected: data.corrected,
    failed: data.failed
  };
  
  const displayLeads = selectedTab === "valid" ? validLeads : failedLeads;
  
  const filteredLeads = displayLeads.filter((lead: any) => 
    (lead.companyName && lead.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lead.contactName && lead.contactName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lead.cnpj && lead.cnpj.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleExport = () => {
    // Define headers for the CSV export
    const headers = {
      companyName: "Empresa",
      cnpj: "CNPJ",
      contactName: "Contato",
      email: "Email",
      phone: "Telefone",
      position: "Cargo",
      segment: "Segmento",
      state: "Estado",
      status: "Status"
    };
    
    exportAsCSV(data.leads, headers, "leads_processados");
    
    toast({
      title: "Dados exportados com sucesso",
      description: "O arquivo CSV foi baixado para o seu computador"
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OK":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">OK</Badge>;
      case "Corrigido":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Corrigido</Badge>;
      case "Enriquecido":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Enriquecido</Badge>;
      case "Falhou":
      case "Rejeitado":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Falhou</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Pré-visualização</h2>
        <p className="text-muted-foreground mt-1">
          Revise e aprove os dados processados
        </p>
      </div>
      
      <div className="bg-muted p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-background p-3 rounded border text-center">
            <div className="text-sm text-muted-foreground">Total de Leads</div>
            <div className="text-xl font-bold">{stats.total}</div>
          </div>
          <div className="bg-background p-3 rounded border text-center">
            <div className="text-sm text-muted-foreground">Válidos</div>
            <div className="text-xl font-bold text-green-500">{stats.valid}</div>
          </div>
          <div className="bg-background p-3 rounded border text-center">
            <div className="text-sm text-muted-foreground">Enriquecidos</div>
            <div className="text-xl font-bold text-blue-500">{stats.enriched}</div>
          </div>
          <div className="bg-background p-3 rounded border text-center">
            <div className="text-sm text-muted-foreground">Corrigidos</div>
            <div className="text-xl font-bold text-amber-500">{stats.corrected}</div>
          </div>
          <div className="bg-background p-3 rounded border text-center">
            <div className="text-sm text-muted-foreground">Falhas</div>
            <div className="text-xl font-bold text-red-500">{stats.failed}</div>
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted p-3 border-b flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center">
            <Button
              variant={selectedTab === "valid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTab("valid")}
              className="mr-2"
            >
              <Check className="h-4 w-4 mr-1" />
              Válidos ({validLeads.length})
            </Button>
            <Button
              variant={selectedTab === "failed" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTab("failed")}
            >
              <X className="h-4 w-4 mr-1" />
              Falhas ({failedLeads.length})
            </Button>
          </div>
          
          <div className="flex items-center">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
              <Input
                placeholder="Buscar leads..."
                className="pl-9 h-9 w-[200px] md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="ml-2" onClick={handleExport}>
              <Download className="h-4 w-4 mr-1" />
              Exportar
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length > 0 ? (
                filteredLeads.slice(0, 10).map((lead: any) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.companyName}</TableCell>
                    <TableCell>{lead.cnpj}</TableCell>
                    <TableCell>{lead.contactName}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell>{getStatusBadge(lead.status)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <FileText className="h-10 w-10 mb-2" />
                      <p>Nenhum registro encontrado</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={onApprove}>
          Aprovar e Continuar
        </Button>
      </div>
    </div>
  );
};

export default PreviewStep;
