
import React from 'react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-md flex items-center justify-center">
        <img 
          src="/lovable-uploads/f0e9edb7-59e3-486c-b794-16df510819f5.png" 
          alt="LeadHunter Pro Logo" 
          className="h-8 w-auto"
        />
      </div>
      <div className="font-semibold">
        LeadHunter Pro
      </div>
    </div>
  );
};
