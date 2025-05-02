
import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus, Bell } from "lucide-react";
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
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { AlertBox } from "@/components/common/AlertBox";
import { Badge } from "@/components/ui/badge";

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

const Meetings = () => {
  const [isAddMeetingDialogOpen, setIsAddMeetingDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [notifications, setNotifications] = useState<{ id: string; message: string; date: string }[]>([]);
  
  // Form state for adding a new meeting
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    companyName: "techsol",
    date: "",
    time: "",
    type: "discovery",
    notes: ""
  });
  
  // Load meetings from localStorage on initial render
  useEffect(() => {
    const storedMeetings = localStorage.getItem('meetings');
    if (storedMeetings) {
      setMeetings(JSON.parse(storedMeetings));
    }
  }, []);
  
  // Generate notifications based on upcoming meetings
  useEffect(() => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    // Filter meetings happening today or tomorrow
    const upcomingMeetings = meetings.filter(meeting => {
      const meetingDate = new Date(meeting.date);
      const diffTime = meetingDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 2; // Today or in the next 2 days
    });
    
    const newNotifications = upcomingMeetings.map(meeting => {
      const meetingDate = new Date(meeting.date);
      const diffTime = meetingDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let message = "";
      if (diffDays === 0) {
        message = `Reunião com ${meeting.companyName} hoje às ${meeting.time}`;
      } else if (diffDays === 1) {
        message = `Reunião com ${meeting.companyName} amanhã às ${meeting.time}`;
      } else {
        message = `Reunião com ${meeting.companyName} em 2 dias às ${meeting.time}`;
      }
      
      return {
        id: meeting.id,
        message,
        date: meeting.date
      };
    });
    
    setNotifications(newNotifications);
  }, [meetings]);
  
  // Filter meetings for selected date
  const meetingsForSelectedDate = selectedDate 
    ? meetings.filter(meeting => meeting.date === selectedDate.toISOString().split('T')[0])
    : [];

  // Function to determine which dates have meetings
  const getDatesWithMeetings = () => {
    const dates = meetings.map(meeting => meeting.date);
    return dates.filter((date, index) => dates.indexOf(date) === index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewMeeting({
      ...newMeeting,
      [e.target.id]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewMeeting({
      ...newMeeting,
      [name]: value
    });
  };

  const handleAddMeeting = () => {
    if (!newMeeting.title || !newMeeting.date || !newMeeting.time) {
      toast({
        title: "Informações incompletas",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Get company name based on selection
    const companyNames: Record<string, string> = {
      "techsol": "TechSol",
      "logex": "LogEx",
      "naturfood": "NaturFood",
      "urbancon": "UrbanCon"
    };

    // Get contact name based on company
    const contactNames: Record<string, string> = {
      "techsol": "João Silva",
      "logex": "Maria Souza",
      "naturfood": "Carlos Pereira",
      "urbancon": "Ana Oliveira"
    };

    const meeting: Meeting = {
      id: uuidv4(),
      title: newMeeting.title,
      companyName: companyNames[newMeeting.companyName],
      contactName: contactNames[newMeeting.companyName],
      date: newMeeting.date,
      time: newMeeting.time,
      type: newMeeting.type as "discovery" | "proposal" | "negotiation" | "closing",
      notes: newMeeting.notes
    };

    const updatedMeetings = [...meetings, meeting];
    setMeetings(updatedMeetings);
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
    
    setIsAddMeetingDialogOpen(false);
    toast({
      title: "Reunião agendada",
      description: `Reunião com ${meeting.companyName} agendada para ${new Date(meeting.date).toLocaleDateString('pt-BR')} às ${meeting.time}.`
    });

    // Reset form
    setNewMeeting({
      title: "",
      companyName: "techsol",
      date: "",
      time: "",
      type: "discovery",
      notes: ""
    });
  };

  // Function to get meeting type color
  const getMeetingTypeColor = (type: string) => {
    switch (type) {
      case "discovery": return "bg-blue-100 text-blue-800";
      case "proposal": return "bg-green-100 text-green-800";
      case "negotiation": return "bg-amber-100 text-amber-800";
      case "closing": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Function to translate meeting type
  const getMeetingTypeText = (type: string) => {
    switch (type) {
      case "discovery": return "Descoberta";
      case "proposal": return "Proposta";
      case "negotiation": return "Negociação";
      case "closing": return "Fechamento";
      default: return type;
    }
  };

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
        <div className="col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
              <CardDescription>Selecione uma data para ver as reuniões</CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border pointer-events-auto"
                modifiers={{
                  hasMeeting: getDatesWithMeetings().map(dateString => new Date(dateString)),
                }}
                modifiersStyles={{
                  hasMeeting: { 
                    backgroundColor: "rgba(0, 122, 255, 0.1)",
                    fontWeight: "bold",
                    borderRadius: "50%",
                    color: "var(--primary)",
                    position: "relative"
                  }
                }}
              />
              <div className="mt-3 text-sm text-muted-foreground">
                <div className="flex items-center mb-1">
                  <span className="w-3 h-3 rounded-full bg-primary/20 mr-2"></span>
                  <span>Dias com reuniões agendadas</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {notifications.length > 0 && (
            <AlertBox
              title="Notificações"
              alerts={notifications.map(notification => ({
                icon: "bell",
                text: notification.message,
                type: "alert",
                action: () => {
                  const date = new Date(notification.date);
                  setSelectedDate(date);
                }
              }))}
            />
          )}
        </div>

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
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {new Date(meeting.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <Badge variant="outline" className={`text-xs ${getMeetingTypeColor(meeting.type)}`}>
                            {getMeetingTypeText(meeting.type)}
                          </Badge>
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
                <CalendarIcon className="h-10 w-10 text-muted-foreground mb-2" />
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
              <Input 
                id="title" 
                placeholder="Título da reunião" 
                value={newMeeting.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Select 
                value={newMeeting.companyName}
                onValueChange={(value) => handleSelectChange("companyName", value)}
              >
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
                <Input 
                  id="date" 
                  type="date" 
                  value={newMeeting.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>
                <Input 
                  id="time" 
                  type="time" 
                  value={newMeeting.time}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Reunião</Label>
              <Select 
                value={newMeeting.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
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
              <Input 
                id="notes" 
                placeholder="Adicione observações sobre esta reunião"
                value={newMeeting.notes}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMeetingDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddMeeting}>Agendar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Meetings;
