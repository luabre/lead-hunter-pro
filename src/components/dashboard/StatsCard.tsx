
import { cn } from '@/lib/utils';
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const StatsCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
  onClick,
  children,
}: StatsCardProps) => {
  return (
    <div 
      className={cn(
        "metric-card bg-background p-4 border rounded-lg", 
        onClick && "cursor-pointer hover:shadow-md transition-all", 
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "text-xs font-medium flex items-center",
                trend === 'up' && "text-leadhunter-green",
                trend === 'down' && "text-leadhunter-red",
                trend === 'neutral' && "text-muted-foreground"
              )}>
                {trend === 'up' && <ArrowUp className="h-3 w-3 mr-1" />}
                {trend === 'down' && <ArrowDown className="h-3 w-3 mr-1" />}
                {trendValue}
              </span>
            </div>
          )}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      {children}
    </div>
  );
};

const ArrowUp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="m5 12 7-7 7 7"/>
    <path d="M12 19V5"/>
  </svg>
);

const ArrowDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 5v14"/>
    <path d="m19 12-7 7-7-7"/>
  </svg>
);

export default StatsCard;
