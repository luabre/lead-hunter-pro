
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
      <Icon className="w-5 h-5 shrink-0" />
      <span className="ml-3">{text}</span>
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

  const className = "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-black/10 hover:text-black w-full";
  
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
        "text-black hover:text-black"
      )}
    >
      {content}
    </Link>
  );
};
