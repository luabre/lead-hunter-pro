
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Building2,
  Users,
  LayoutList,
  User,
  BarChart3,
  Brain,
  MessageSquare,
  Calendar,
  BarChartHorizontal,
  Network,
  Search,
  Download,
  Camera,
  Pencil,
  UserPlus,
} from "lucide-react";
import { Logo } from "./Logo";
import AppVersion from "./AppVersion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const AppSidebar = () => {
  const location = useLocation();
  const isActivePath = (path: string) => location.pathname === path;
  const [userProfile, setUserProfile] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error: any) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  const handleUploadClick = () => {
    // Trigger hidden file input
    const fileInput = document.getElementById('avatar-upload');
    if (fileInput) fileInput.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setImageFile(file);
    
    // Upload immediately when file is selected
    await uploadAvatar(file);
  };

  const uploadAvatar = async (file: File) => {
    try {
      setUploading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error("Usuário não autenticado");
      }

      const userId = session.user.id;
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload image to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicURLData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update user profile with avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicURLData.publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      // Refresh user profile data
      await fetchUserProfile();
      
      toast({
        title: "Foto atualizada",
        description: "Sua foto de perfil foi alterada com sucesso!"
      });
    } catch (error: any) {
      console.error("Error uploading avatar:", error.message);
      toast({
        title: "Erro ao atualizar foto",
        description: error.message || "Ocorreu um erro ao atualizar sua foto de perfil",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      setImageFile(null);
    }
  };

  const getBadge = (path: string) => {
    if (path === "/my-pipeline") return { text: "Novo", variant: "green" as const };
    if (path === "/ia-closer") return { text: "Beta", variant: "purple" as const };
    if (path === "/lead-import") return { text: "Novo", variant: "green" as const };
    return null;
  };

  const menuItems = [
    {
      text: "Início",
      path: "/",
      icon: BarChart3,
    },
    {
      text: "Dashboard",
      path: "/dashboard",
      icon: BarChart3,
    },
    {
      text: "Empresas",
      path: "/companies",
      icon: Building2,
    },
    {
      text: "Busca Inteligente",
      path: "/smart-search",
      icon: Search,
    },
    {
      text: "Contatos",
      path: "/contacts",
      icon: Users,
    },
    {
      text: "Pipeline Geral",
      path: "/pipeline",
      icon: LayoutList,
    },
    {
      text: "Meu Pipeline",
      path: "/my-pipeline",
      icon: User,
      badge: getBadge("/my-pipeline"),
    },
    {
      text: "Importar Base de Leads",
      path: "/lead-import",
      icon: Download,
      badge: getBadge("/lead-import"),
    },
    {
      text: "IA SDR",
      path: "/ia-sdr",
      icon: MessageSquare,
    },
    {
      text: "IA Closer",
      path: "/ia-closer",
      icon: Brain,
      badge: getBadge("/ia-closer"),
    },
    {
      text: "Reuniões",
      path: "/meetings",
      icon: Calendar,
    },
    {
      text: "Inteligência",
      path: "/market-intel",
      icon: BarChartHorizontal,
    },
    {
      text: "Social Selling",
      path: "/social-selling",
      icon: Network,
    },
    {
      text: "Gerente IA",
      path: "/ai-manager",
      icon: Brain,
    },
  ];

  const getInitials = (profile: any) => {
    if (!profile) return "U";
    return `${profile.first_name?.charAt(0) || ""}${profile.last_name?.charAt(0) || ""}`;
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border py-4 px-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath(item.path)}
                    tooltip={item.text}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.text}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "ml-2 rounded px-1.5 py-0.5 text-xs font-medium",
                            item.badge.variant === "green"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          )}
                        >
                          {item.badge.text}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage 
                  src={userProfile?.avatar_url || "/placeholder.svg"} 
                  alt={userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : "User Avatar"} 
                />
                <AvatarFallback>{getInitials(userProfile)}</AvatarFallback>
              </Avatar>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="absolute inset-0 opacity-0 w-full h-full rounded-full hover:bg-black/20"
                    aria-label="Change avatar"
                  >
                    <span className="sr-only">Upload photo</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleUploadClick} disabled={uploading}>
                    <Camera className="mr-2 h-4 w-4" />
                    <span>{uploading ? "Enviando..." : "Atualizar foto"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <p className="text-sm font-medium leading-none">
                {userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : "Usuário LeadHunter"}
              </p>
              <p className="text-xs text-muted-foreground">
                {userProfile ? userProfile.email : "pessoa@leadhunter.com"}
              </p>
            </div>
          </div>
          <AppVersion />
          
          {/* Hidden file input */}
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
