
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Meeting {
  id: string;
  title: string;
  companyName: string;
  contactName: string;
  date: string;
  time: string;
  type: "discovery" | "proposal" | "negotiation" | "closing";
  notes?: string;
}

// Mock data for meetings
const mockMeetings: Meeting[] = [
  {
    id: "1",
    title: "Apresentação Inicial",
    companyName: "TechSol",
    contactName: "João Silva",
    date: "2025-05-10",
    time: "14:30",
    type: "discovery",
    notes: "Entender necessidades atuais de gestão de leads"
  },
  {
    id: "2",
    title: "Apresentação de Proposta",
    companyName: "LogEx",
    contactName: "Maria Souza",
    date: "2025-05-12",
    time: "10:00",
    type: "proposal",
    notes: "Abordar desafios específicos de conversão"
  },
  {
    id: "3",
    title: "Negociação Final",
    companyName: "NaturFood",
    contactName: "Carlos Pereira",
    date: "2025-05-15",
    time: "16:00",
    type: "closing"
  }
];

const Meetings = () => {
  const [isAddMeetingDialogOpen, setIsAddMeetingDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Filter meetings for selected date
  const meetingsForSelectedDate = selectedDate 
    ? mockMeetings.filter(meeting => meeting.date === selectedDate.toISOString().split('T')[0])
    : [];

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Reuniões Agendadas</h1>
          <p className="text-muted-foreground">
            Gerencie suas reuniões com leads qualificados
          </p>
        </div>
        <Button onClick={() => setIsAddMeetingDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Reunião
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
            <CardDescription>Selecione uma data para ver as reuniões</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedDate ? (
                `Reuniões para ${selectedDate.toLocaleDateString('pt-BR')}`
              ) : (
                "Reuniões"
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {meetingsForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {meetingsForSelectedDate.map((meeting) => (
                  <Card key={meeting.id} className="hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">{meeting.title}</CardTitle>
                        <div className="text-sm font-medium text-muted-foreground">
                          {meeting.time}
                        </div>
                      </div>
                      <CardDescription>
                        {meeting.companyName} - {meeting.contactName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {new Date(meeting.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <div>
                          <Button size="sm" variant="outline">
                            Ver detalhes
                          </Button>
                        </div>
                      </div>
                      {meeting.notes && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {meeting.notes}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center p-4">
                <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">
                  {selectedDate 
                    ? "Nenhuma reunião agendada para esta data" 
                    : "Selecione uma data para ver as reuniões agendadas"}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsAddMeetingDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agendar nova reunião
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Meeting Dialog */}
      <Dialog open={isAddMeetingDialogOpen} onOpenChange={setIsAddMeetingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agendar Nova Reunião</DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo para agendar uma nova reunião.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" placeholder="Título da reunião" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Select defaultValue="techsol">
                <SelectTrigger id="company">
                  <SelectValue placeholder="Selecione uma empresa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="techsol">TechSol</SelectItem>
                  <SelectItem value="logex">LogEx</SelectItem>
                  <SelectItem value="naturfood">NaturFood</SelectItem>
                  <SelectItem value="urbancon">UrbanCon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>
                <Input id="time" type="time" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Reunião</Label>
              <Select defaultValue="discovery">
                <SelectTrigger id="type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discovery">Descoberta</SelectItem>
                  <SelectItem value="proposal">Apresentação de Proposta</SelectItem>
                  <SelectItem value="negotiation">Negociação</SelectItem>
                  <SelectItem value="closing">Fechamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Input id="notes" placeholder="Adicione observações sobre esta reunião" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsAddMeetingDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => setIsAddMeetingDialogOpen(false)}>Agendar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Meetings;
