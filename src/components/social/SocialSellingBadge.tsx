
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SocialSellingBadgeProps {
  isActive: boolean;
}

const SocialSellingBadge = ({ isActive }: SocialSellingBadgeProps) => {
  if (!isActive) return null;
  
  return (
    <Badge className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-1">
      <span className="h-2 w-2 rounded-full bg-white inline-block"></span>
      Socialmente ativo
    </Badge>
  );
};

export default SocialSellingBadge;
