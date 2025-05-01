
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MessageSquare, Filter, Plus, MoreHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock Data
const mockContacts = [
  {
    id: "1",
    name: "João Silva",
    title: "Diretor de Tecnologia",
    company: "TechSol",
    email: "joao.silva@techsol.com",
    phone: "(11) 99999-8888",
    location: "São Paulo, SP",
    openness: 84,
    style: "Direto e objetivo",
    status: "contacted",
    opportunity: "hot" as const,
  },
  {
    id: "2",
    name: "Maria Souza",
    title: "CEO",
    company: "LogEx",
    email: "maria.souza@logex.com",
    phone: "(21) 98888-7777",
    location: "Rio de Janeiro, RJ",
    openness: 72,
    style: "Informal e humano",
    status: "qualifying",
    opportunity: "warm" as const,
  },
  {
    id: "3",
    name: "Pedro Santos",
    title: "Diretor Comercial",
    company: "SaudeBem",
    email: "pedro.santos@saudebem.com",
    phone: "(31) 97777-6666",
    location: "Belo Horizonte, MG",
    openness: 45,
    style: "Formal e institucional",
    status: "new",
    opportunity: "cold" as const,
  },
  {
    id: "4",
    name: "Ana Oliveira",
    title: "Diretora de Operações",
    company: "UrbanCon",
    email: "ana.oliveira@urbancon.com",
    phone: "(41) 96666-5555",
    location: "Curitiba, PR",
    openness: 68,
    style: "Visionário/Tech",
    status: "meeting",
    opportunity: "warm" as const,
  },
  {
    id: "5",
    name: "Carlos Pereira",
    title: "Diretor Financeiro",
    company: "NaturFood",
    email: "carlos.pereira@naturfood.com",
    phone: "(51) 95555-4444",
    location: "Porto Alegre, RS",
    openness: 90,
    style: "Direto e objetivo",
    status: "negotiation",
    opportunity: "hot" as const,
  },
  {
    id: "6",
    name: "Fernanda Lima",
    title: "CMO",
    company: "DigShop",
    email: "fernanda.lima@digshop.com",
    phone: "(61) 94444-3333",
    location: "Brasília, DF",
    openness: 78,
    style: "Inspirador/Coach",
    status: "won",
    opportunity: "hot" as const,
  },
  {
    id: "7",
    name: "Ricardo Alves",
    title: "CTO",
    company: "FinCon",
    email: "ricardo.alves@fincon.com",
    phone: "(48) 93333-2222",
    location: "Florianópolis, SC",
    openness: 52,
    style: "Formal e institucional",
    status: "lost",
    opportunity: "cold" as const,
  },
  {
    id: "8",
    name: "Juliana Costa",
    title: "Diretora de RH",
    company: "EduOn",
    email: "juliana.costa@eduon.com",
    phone: "(71) 92222-1111",
    location: "Salvador, BA",
    openness: 65,
    style: "Informal e humano",
    status: "new",
    opportunity: "warm" as const,
  },
];

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedContact, setSelectedContact] = useState<typeof mockContacts[0] | null>(null);

  const filteredContacts = mockContacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      filterStatus === contact.status;

    return matchesSearch && matchesStatus;
  });

  const handleContactClick = (contact: typeof mockContacts[0]) => {
    setSelectedContact(contact);
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Decisores</h1>
          <p className="text-muted-foreground">
            Contatos e análise de perfil dos decisores
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Contato
          </Button>
        </div>
      </div>

      {/* Contact Detail View */}
      {selectedContact ? (
        <Card>
          <CardHeader className="border-b">
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-2xl">{selectedContact.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <span>{selectedContact.title}</span>
                  <span className="text-muted-foreground">|</span>
                  <span>{selectedContact.company}</span>
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => setSelectedContact(null)}>
                Voltar para Lista
              </Button>
            </div>
          </CardHeader>

          <Tabs defaultValue="profile">
            <TabsList className="mx-6 mt-2">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="communications">Comunicações</TabsTrigger>
              <TabsTrigger value="analytics">Análises</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Informações de Contato</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-muted-foreground">Email:</span>
                          <p>{selectedContact.email}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Telefone:</span>
                          <p>{selectedContact.phone}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Localização:</span>
                          <p>{selectedContact.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Status de Relacionamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Etapa:</span>
                          <Badge className="capitalize">
                            {selectedContact.status === "new" && "Novo"}
                            {selectedContact.status === "contacted" && "Contato Enviado"}
                            {selectedContact.status === "qualifying" && "Em Qualificação"}
                            {selectedContact.status === "meeting" && "Reunião Agendada"}
                            {selectedContact.status === "negotiation" && "Negociação"}
                            {selectedContact.status === "won" && "Ganho"}
                            {selectedContact.status === "lost" && "Perdido"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Oportunidade:</span>
                          <Badge
                            className={
                              selectedContact.opportunity === 'hot'
                                ? 'opportunity-hot'
                                : selectedContact.opportunity === 'warm'
                                ? 'opportunity-warm'
                                : 'opportunity-cold'
                            }
                          >
                            {selectedContact.opportunity === 'hot' ? 'Quente' : selectedContact.opportunity === 'warm' ? 'Morna' : 'Fria'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4 md:col-span-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Estilo de Comunicação</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <Badge>{selectedContact.style}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedContact.style === "Direto e objetivo" && 
                          "Prefere comunicações diretas e focadas em resultados. Evite rodeios e foque em números e dados concretos."}
                        {selectedContact.style === "Informal e humano" && 
                          "Valoriza relacionamentos e conversas informais. Use uma abordagem amigável e histórias pessoais para conectar."}
                        {selectedContact.style === "Formal e institucional" && 
                          "Prefere comunicações formais e bem estruturadas. Mantenha um tom profissional e técnico."}
                        {selectedContact.style === "Inspirador/Coach" && 
                          "Responde bem a mensagens motivacionais e focadas em crescimento. Use linguagem inspiradora."}
                        {selectedContact.style === "Visionário/Tech" && 
                          "Interessado em inovações e tendências. Foque em como seu produto representa o futuro da indústria."}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Abertura Comercial</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-2">
                        <span className="text-2xl font-bold">{selectedContact.openness}</span>
                        <span className="text-sm text-muted-foreground ml-1">/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5 mb-4">
                        <div 
                          className={`h-2.5 rounded-full ${
                            selectedContact.openness >= 70 
                              ? "bg-leadhunter-teal" 
                              : selectedContact.openness >= 50 
                              ? "bg-leadhunter-gold" 
                              : "bg-leadhunter-red"
                          }`}
                          style={{ width: `${selectedContact.openness}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedContact.openness >= 70 
                          ? `Alta chance de resposta se abordado com foco em ${selectedContact.style === "Visionário/Tech" ? "inovação" : selectedContact.style === "Direto e objetivo" ? "resultados" : "benefícios"}.` 
                          : selectedContact.openness >= 50 
                          ? "Chance média de resposta. Aborde com cuidado e personalize a mensagem." 
                          : "Baixa receptividade a abordagens comerciais. Considere uma estratégia de longo prazo."}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button className="mr-4">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ativar IA SDR
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="communications" className="p-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">
                    Nenhuma comunicação registrada com este contato ainda.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="p-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">
                    Análises e comportamento do contato serão exibidos aqui.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      ) : (
        <>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, empresa, cargo..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="new">Novo</SelectItem>
                <SelectItem value="contacted">Contato Enviado</SelectItem>
                <SelectItem value="qualifying">Em Qualificação</SelectItem>
                <SelectItem value="meeting">Reunião Agendada</SelectItem>
                <SelectItem value="negotiation">Negociação</SelectItem>
                <SelectItem value="won">Ganho</SelectItem>
                <SelectItem value="lost">Perdido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contacts Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Estilo</TableHead>
                    <TableHead>Abertura</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow 
                      key={contact.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleContactClick(contact)}
                    >
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.title}</TableCell>
                      <TableCell>{contact.company}</TableCell>
                      <TableCell>{contact.location}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{contact.style}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span 
                            className={`font-medium ${
                              contact.openness >= 70 
                                ? "text-leadhunter-teal" 
                                : contact.openness >= 50 
                                ? "text-leadhunter-gold" 
                                : "text-leadhunter-red"
                            }`}
                          >
                            {contact.openness}/100
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            contact.opportunity === 'hot'
                              ? 'opportunity-hot'
                              : contact.opportunity === 'warm'
                              ? 'opportunity-warm'
                              : 'opportunity-cold'
                          }
                        >
                          {contact.opportunity === 'hot' ? 'Quente' : contact.opportunity === 'warm' ? 'Morno' : 'Frio'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleContactClick(contact);
                            }}>
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              // Handle message action
                            }}>
                              Enviar Mensagem
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              // Handle activate AI action
                            }}>
                              Ativar IA SDR
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </AppLayout>
  );
};

export default Contacts;
