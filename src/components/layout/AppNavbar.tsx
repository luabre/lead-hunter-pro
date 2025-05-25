import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Users,
  Mail,
  BarChart,
  Search,
  Share2,
  Lightbulb,
  ListChecks,
  Settings,
  LogOut,
} from "lucide-react";

const AppNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          return;
        }

        const { data, error } = await (supabase as any)
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error("Error fetching user profile:", error);
          return;
        }

        setUserProfile(data);
      } catch (error: any) {
        console.error("Error in getUserProfile:", error);
      }
    };

    getUserProfile();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-border h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="mr-2">
                <LayoutDashboard className="h-5 w-5 mr-2" />
                Dashboard
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Painel de controle</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="mr-2">
                <FileText className="h-5 w-5 mr-2" />
                Pipeline
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Gerenciar oportunidades</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="mr-2">
                <Users className="h-5 w-5 mr-2" />
                Contatos
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Lista de contatos</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                <Mail className="h-5 w-5 mr-2" />
                Campanhas
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Gerenciar campanhas</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                <BarChart className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Performance</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuItem>
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="h-4 w-4 mr-2" />
              Meu Pipeline
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="h-4 w-4 mr-2" />
              Contatos
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="h-4 w-4 mr-2" />
              Campanhas
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default AppNavbar;
