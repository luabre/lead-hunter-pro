
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
} from "lucide-react";
import { Logo } from "./Logo";
import AppVersion from "./AppVersion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const location = useLocation();
  const isActivePath = (path: string) => location.pathname === path;

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
      subItems: [
        {
          text: "Busca Inteligente",
          path: "/smart-search",
          icon: Search,
        }
      ]
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
                  
                  {item.subItems && item.subItems.length > 0 && (
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.path}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActivePath(subItem.path)}
                          >
                            <Link to={subItem.path}>
                              <subItem.icon className="h-4 w-4 mr-2 -ml-1" />
                              <span>{subItem.text}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg" alt="User Avatar" />
              <AvatarFallback>LH</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                Usuário LeadHunter
              </p>
              <p className="text-xs text-muted-foreground">
                pessoa@leadhunter.com
              </p>
            </div>
          </div>
          <AppVersion />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
