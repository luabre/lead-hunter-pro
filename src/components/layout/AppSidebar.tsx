
import {
  Home,
  LayoutDashboard,
  Building2,
  Users,
  Calendar,
  LineChart,
  Search,
  Linkedin,
  TrendingUp,
  Upload,
  Rocket,
  MessageSquare,
  MessageCircle,
  Brain,
  BarChart2,
  PieChart // Using PieChart instead of PersonalPipeline
} from "lucide-react";
import { SidebarItem } from "@/components/layout/SidebarItem";
import { Logo } from "@/components/layout/Logo";

const AppSidebar = () => {
  return (
    <aside className="hidden md:block w-64 shrink-0 border-r">
      <div className="bg-secondary h-full fixed top-0 left-0 w-64 flex flex-col p-3">
        <Logo />
        <nav className="space-y-1">
          <SidebarItem icon={Home} text="Home" to="/" />
          <SidebarItem icon={LayoutDashboard} text="Dashboard" to="/dashboard" />
          <SidebarItem icon={Building2} text="Empresas" to="/companies" />
          <SidebarItem icon={Users} text="Contatos" to="/contacts" />
          <SidebarItem icon={Calendar} text="Reuniões" to="/meetings" />
          <SidebarItem icon={LineChart} text="Pipeline" to="/pipeline" />
          
          {/* Add the new Performance Dashboard item */}
          <SidebarItem icon={BarChart2} text="Performance IA" to="/performance" />
          
          <SidebarItem icon={PieChart} text="Meu Pipeline" to="/my-pipeline" />
          <SidebarItem icon={Search} text="Busca Inteligente" to="/smart-search" />
          <SidebarItem icon={Linkedin} text="Social Selling" to="/social-selling" />
          <SidebarItem icon={TrendingUp} text="Inteligência" to="/market-intel" />
          <SidebarItem icon={Upload} text="Importar Leads" to="/lead-import" />
          <SidebarItem icon={Rocket} text="Campanhas" to="/campaigns" />
          <SidebarItem icon={MessageSquare} text="IA SDR" badgeText="Novo" />
          <SidebarItem icon={MessageCircle} text="IA Closer" />
          <SidebarItem icon={Brain} text="IA Manager" badgeText="Novo" />
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
