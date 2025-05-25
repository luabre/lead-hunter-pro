
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Users, Zap } from "lucide-react";

interface PipelineFiltersProps {
  selectedUser: string;
  selectedCampaignType: string;
  onUserChange: (value: string) => void;
  onCampaignTypeChange: (value: string) => void;
  users: Array<{ id: string; name: string }>;
}

const PipelineFilters = ({
  selectedUser,
  selectedCampaignType,
  onUserChange,
  onCampaignTypeChange,
  users
}: PipelineFiltersProps) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-muted-foreground" />
        <Select value={selectedUser} onValueChange={onUserChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por colaborador" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os colaboradores</SelectItem>
            <SelectItem value="meus">Somente meus leads</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-muted-foreground" />
        <Select value={selectedCampaignType} onValueChange={onCampaignTypeChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Tipo de campanha" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os tipos</SelectItem>
            <SelectItem value="ia">IA Ativa</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        Mais filtros
      </Button>
    </div>
  );
};

export default PipelineFilters;
