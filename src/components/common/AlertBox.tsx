
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Pin, Megaphone, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertType = 'alert' | 'tip' | 'update';
type IconType = 'bell' | 'pin' | 'megaphone';
type AlertVariant = 'default' | 'warning' | 'destructive' | 'success';

interface Alert {
  icon: IconType;
  text: string;
  type: AlertType;
  action?: () => void;
}

interface AlertBoxProps {
  title: string;
  alerts?: Alert[];
  className?: string;
  description?: string;
  variant?: AlertVariant;
}

export const AlertBox = ({ title, alerts = [], description, variant = 'default', className }: AlertBoxProps) => {
  const getIcon = (type: IconType) => {
    switch (type) {
      case 'bell':
        return <Bell className="h-4 w-4" />;
      case 'pin':
        return <Pin className="h-4 w-4" />;
      case 'megaphone':
        return <Megaphone className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getAlertStyle = (type: AlertType) => {
    switch (type) {
      case 'alert':
        return 'bg-red-50 border-red-100 text-red-600';
      case 'tip':
        return 'bg-amber-50 border-amber-100 text-amber-600';
      case 'update':
        return 'bg-blue-50 border-blue-100 text-blue-600';
      default:
        return 'bg-gray-50 border-gray-100 text-gray-600';
    }
  };

  const getVariantStyle = (variant: AlertVariant) => {
    switch (variant) {
      case 'warning':
        return 'bg-amber-50 border-amber-100';
      case 'destructive':
        return 'bg-red-50 border-red-100';
      case 'success':
        return 'bg-green-50 border-green-100';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {description && (
          <div className={cn(
            "border rounded-md p-3 text-sm",
            getVariantStyle(variant)
          )}>
            {description}
          </div>
        )}
        
        {alerts.map((alert, index) => (
          <div 
            key={index}
            className={cn(
              "border rounded-md p-3 flex items-start gap-3 text-sm",
              getAlertStyle(alert.type),
              alert.action ? "cursor-pointer hover:opacity-90" : ""
            )}
            onClick={alert.action}
          >
            <div className={cn("mt-0.5", alert.type === 'alert' ? 'text-red-500' : alert.type === 'tip' ? 'text-amber-500' : 'text-blue-500')}>
              {getIcon(alert.icon)}
            </div>
            <div className="flex-1">{alert.text}</div>
            {alert.action && <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 self-center" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
