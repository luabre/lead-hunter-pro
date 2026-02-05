
import React from 'react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <div className="h-10 w-10 rounded-md flex items-center justify-center">
        <img 
          src="/lovable-uploads/f0e9edb7-59e3-486c-b794-16df510819f5.png" 
          alt="Radar Hunter Pro Logo" 
          className="h-10 w-auto"
        />
      </div>
      <div className="font-semibold text-white">
        Radar Hunter Pro
      </div>
    </div>
  );
};
