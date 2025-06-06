
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  text: string;
  to?: string;
  badgeText?: string;
}

export const SidebarItem = ({ icon: Icon, text, to, badgeText }: SidebarItemProps) => {
  const content = (
    <>
      <Icon className="w-5 h-5 shrink-0 text-white" />
      <span className="ml-3 text-white">{text}</span>
      {badgeText && (
        <Badge 
          className="ml-auto bg-primary hover:bg-primary/80 text-[10px] px-1.5 py-0.5" 
          variant="default"
        >
          {badgeText}
        </Badge>
      )}
    </>
  );

  const className = "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white w-full";
  
  if (!to) {
    return (
      <button className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link 
      to={to} 
      className={cn(
        className,
        "text-white hover:text-white"
      )}
    >
      {content}
    </Link>
  );
};
