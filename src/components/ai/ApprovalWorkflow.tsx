
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileDown, FileUp, Shield, Check, X, Eye, Megaphone, Database } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

// Mock data
const pendingApprovals = [
  {
    id: 1,
    user: "Ana Silva",
    email: "ana.silva@empresa.com",
    action: "Exportar base de leads",
    reason: "Relatório mensal para diretoria",
    requestDate: new Date(2025, 4, 1, 9, 15),
    risk: "medium"
  },
  {
    id: 2,
    user: "Ricardo Mendes",
    email: "ricardo.mendes@empresa.com",
    action: "Importar base externa",
    reason: "Novos leads da feira de negócios",
    requestDate: new Date(2025, 4, 1, 11, 30),
    risk: "high"
  },
  {
    id: 3,
    user: "Juliana Costa",
    email: "juliana.costa@empresa.com",
    action: "Ativar tracking de comportamento",
    reason: "Análise de jornada para otimização",
    requestDate: new Date(2025, 4, 1, 14, 45),
    risk: "medium"
  }
];

const approvalHistory = [
  {
    id: 101,
    user: "Carlos Santos",
    email: "carlos.santos@empresa.com",
    action: "Disparar campanha",
    requestDate: new Date(2025, 4, 1, 8, 20),
    responseDate: new Date(2025, 4, 1, 8, 45),
    approvedBy: "Maria Gerente",
    status: "approved"
  },
  {
    id: 102,
    user: "Pedro Lima",
    email: "pedro.lima@empresa.com",
    action: "Importar base externa",
    requestDate: new Date(2025, 3, 30, 16, 10),
    responseDate: new Date(2025, 3, 30, 17, 30),
    approvedBy: "Sistema automático",
    status: "rejected",
    reason: "Base contém dados sem consentimento LGPD"
  },
  {
    id: 103,
    user: "Fernanda Oliveira",
    email: "fernanda.oliveira@empresa.com",
    action: "Exportar base de leads",
    requestDate: new Date(2025, 3, 29, 14, 15),
    responseDate: new Date(2025, 3, 29, 15, 0),
    approvedBy: "João Diretor",
    status: "approved"
  },
  {
    id: 104,
    user: "Marcos Silva",
    email: "marcos.silva@empresa.com",
    action: "Ativar tracking de comportamento",
    requestDate: new Date(2025, 3, 28, 11, 40),
    responseDate: new Date(2025, 3, 28, 13, 20),
    approvedBy: "Sistema automático",
    status: "approved"
  },
  {
    id: 105,
    user: "Aline Souza",
    email: "aline.souza@empresa.com",
    action: "Disparar campanha",
    requestDate: new Date(2025, 3, 27, 9, 30),
    responseDate: new Date(2025, 3, 27, 10, 15),
    approvedBy: "Maria Gerente",
    status: "rejected",
    reason: "Volume excede limite mensal aprovado"
  }
];

const ApprovalWorkflow = () => {
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [bulkAction, setBulkAction] = useState("");
  
  const handleApprove = (item: any) => {
    setSelectedItem(item);
    setApprovalModalOpen(true);
  };
  
  const handleViewHistory = (item: any) => {
    setSelectedItem(item);
    setHistoryModalOpen(true);
  };
  
  const confirmApproval = (approved: boolean) => {
    setApprovalModalOpen(false);
    
    if (approved) {
      toast.success(`Solicitação de ${selectedItem.action} aprovada para ${selectedItem.user}`, {
        description: `Notificação enviada para ${selectedItem.email}`
      });
    } else {
      toast.info(`Solicitação de ${selectedItem.action} rejeitada para ${selectedItem.user}`, {
        description: `Notificação enviada para ${selectedItem.email}`
      });
    }
  };
  
  const toggleSelection = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };
  
  const executeBulkAction = () => {
    if (!bulkAction || selected.length === 0) return;
    
    if (bulkAction === "approve") {
      toast.success(`${selected.length} solicitações aprovadas em lote`, {
        description: "Notificações enviadas aos usuários"
      });
    } else if (bulkAction === "reject") {
      toast.info(`${selected.length} solicitações rejeitadas em lote`, {
        description: "Notificações enviadas aos usuários"
      });
    }
    
    setSelected([]);
    setBulkAction("");
  };
  
  const getBadgeForRisk = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge className="bg-green-500">Baixo</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Médio</Badge>;
      case "high":
        return <Badge className="bg-red-500">Alto</Badge>;
      default:
        return <Badge>Indefinido</Badge>;
    }
  };
  
  const getBadgeForStatus = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Aprovado</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejeitado</Badge>;
      default:
        return <Badge className="bg-gray-500">Pendente</Badge>;
    }
  };
  
  const getIconForAction = (action: string) => {
    if (action.includes("Exportar")) return <FileDown className="h-4 w-4" />;
    if (action.includes("Importar")) return <FileUp className="h-4 w-4" />;
    if (action.includes("Disparar")) return <Megaphone className="h-4 w-4" />;
    if (action.includes("tracking")) return <Database className="h-4 w-4" />;
    return <Shield className="h-4 w-4" />;
  };
  
  return (
    <>
      <Card className="border-blue-200 bg-blue-50/20 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Workflows de Aprovação
          </CardTitle>
          <CardDescription>
            Gerencie solicitações para ações que exigem aprovação (LGPD e Compliance)
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pendentes
            <Badge className="ml-2 absolute -right-3 -top-2 bg-red-500">{pendingApprovals.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="rules">Regras</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <CardTitle>Solicitações Pendentes</CardTitle>
                {selected.length > 0 && (
                  <div className="flex items-center gap-2">
                    <select 
                      className="p-2 rounded-md border border-input bg-background"
                      value={bulkAction}
                      onChange={(e) => setBulkAction(e.target.value)}
                    >
                      <option value="">Ação em lote...</option>
                      <option value="approve">Aprovar Selecionados</option>
                      <option value="reject">Rejeitar Selecionados</option>
                    </select>
                    <Button onClick={executeBulkAction} disabled={!bulkAction}>
                      Executar
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30px]">
                        <Checkbox 
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelected(pendingApprovals.map(item => item.id));
                            } else {
                              setSelected([]);
                            }
                          }}
                          checked={selected.length === pendingApprovals.length && pendingApprovals.length > 0}
                        />
                      </TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Ação Solicitada</TableHead>
                      <TableHead className="hidden md:table-cell">Motivo</TableHead>
                      <TableHead className="hidden md:table-cell">Data</TableHead>
                      <TableHead>Risco</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApprovals.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selected.includes(item.id)} 
                            onCheckedChange={() => toggleSelection(item.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.user}</div>
                            <div className="text-sm text-muted-foreground">{item.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <div className="bg-muted rounded-full p-1.5">
                            {getIconForAction(item.action)}
                          </div>
                          {item.action}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{item.reason}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {format(item.requestDate, "dd/MM/yyyy HH:mm")}
                        </TableCell>
                        <TableCell>{getBadgeForRisk(item.risk)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleApprove(item)}
                              className="h-8 w-8 p-0"
                            >
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleApprove(item)}
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {pendingApprovals.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <p className="text-muted-foreground">Não há solicitações pendentes</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Histórico de Aprovações</CardTitle>
                <Button variant="outline">
                  <FileDown className="h-4 w-4 mr-2" />
                  Exportar Histórico
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Ação Solicitada</TableHead>
                      <TableHead className="hidden md:table-cell">Solicitada em</TableHead>
                      <TableHead className="hidden md:table-cell">Respondida em</TableHead>
                      <TableHead>Aprovado por</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Detalhes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvalHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.user}</div>
                            <div className="text-sm text-muted-foreground">{item.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <div className="bg-muted rounded-full p-1.5">
                            {getIconForAction(item.action)}
                          </div>
                          {item.action}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {format(item.requestDate, "dd/MM/yyyy HH:mm")}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {format(item.responseDate, "dd/MM/yyyy HH:mm")}
                        </TableCell>
                        <TableCell>{item.approvedBy}</TableCell>
                        <TableCell>{getBadgeForStatus(item.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewHistory(item)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Regras de Aprovação</CardTitle>
              <CardDescription>
                Configure as regras de aprovação para diferentes níveis de risco
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="bg-blue-50 border-blue-200">
                <Shield className="h-4 w-4 text-blue-600" />
                <AlertTitle>Regras Inteligentes de Aprovação</AlertTitle>
                <AlertDescription>
                  O Gerente de IA aplica regras inteligentes para determinar o nível de aprovação necessário 
                  para cada solicitação, baseando-se no tipo de dado, volume e contexto.
                </AlertDescription>
              </Alert>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nível de Risco</TableHead>
                      <TableHead>Exemplo</TableHead>
                      <TableHead>Aprovação por</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Badge className="bg-green-500">Baixo</Badge>
                      </TableCell>
                      <TableCell>Importar 10 leads</TableCell>
                      <TableCell>Automática</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Badge className="bg-amber-500">Médio</Badge>
                      </TableCell>
                      <TableCell>Exportar base com e-mails</TableCell>
                      <TableCell>Gestor</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Badge className="bg-red-500">Alto</Badge>
                      </TableCell>
                      <TableCell>Disparar campanha</TableCell>
                      <TableCell>Admin Master / Jurídico</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Ações que exigem aprovação:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 border rounded-lg flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-700">
                      <FileDown className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Exportar base de leads</h4>
                      <p className="text-sm text-muted-foreground">Dados sensíveis, exige rastreabilidade</p>
                    </div>
                  </div>
                  
                  <div className="bg-card p-4 border rounded-lg flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-full text-purple-700">
                      <Megaphone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Disparar campanhas</h4>
                      <p className="text-sm text-muted-foreground">Requer alinhamento estratégico e controle de volume</p>
                    </div>
                  </div>
                  
                  <div className="bg-card p-4 border rounded-lg flex items-start gap-3">
                    <div className="bg-amber-100 p-2 rounded-full text-amber-700">
                      <FileUp className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Importar base externa</h4>
                      <p className="text-sm text-muted-foreground">Pode conter dados não consentidos</p>
                    </div>
                  </div>
                  
                  <div className="bg-card p-4 border rounded-lg flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-700">
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Ativar tracking de comportamento</h4>
                      <p className="text-sm text-muted-foreground">Envolve privacidade e exige compliance</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Modal de Aprovação/Rejeição */}
      <Dialog open={approvalModalOpen} onOpenChange={setApprovalModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aprovar Solicitação</DialogTitle>
            <DialogDescription>
              Revise os detalhes da solicitação antes de tomar uma decisão
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="py-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Solicitante</p>
                  <p>{selectedItem.user}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ação</p>
                  <p>{selectedItem.action}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Motivo</p>
                  <p>{selectedItem.reason}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data da Solicitação</p>
                  <p>{format(selectedItem.requestDate, "dd/MM/yyyy HH:mm")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nível de Risco</p>
                  <div className="mt-1">{getBadgeForRisk(selectedItem.risk)}</div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => confirmApproval(false)}>
              <X className="h-4 w-4 mr-2 text-red-600" />
              Rejeitar
            </Button>
            <Button onClick={() => confirmApproval(true)}>
              <Check className="h-4 w-4 mr-2" />
              Aprovar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modal de Detalhes do Histórico */}
      <Dialog open={historyModalOpen} onOpenChange={setHistoryModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da Solicitação</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="py-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Solicitante</p>
                  <p>{selectedItem.user}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ação</p>
                  <p>{selectedItem.action}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <div className="mt-1">{getBadgeForStatus(selectedItem.status)}</div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data da Solicitação</p>
                  <p>{format(selectedItem.requestDate, "dd/MM/yyyy HH:mm")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data da Resposta</p>
                  <p>{format(selectedItem.responseDate, "dd/MM/yyyy HH:mm")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Aprovado por</p>
                  <p>{selectedItem.approvedBy}</p>
                </div>
                {selectedItem.reason && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Motivo da Rejeição</p>
                    <p>{selectedItem.reason}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setHistoryModalOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApprovalWorkflow;
