import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DemoPriceBadge = ({ className = '', size = 'sm' }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 border border-amber-600/40 text-amber-500 font-mono tracking-tight uppercase select-none ${
        size === 'xs' ? 'text-[10px]' : size === 'sm' ? 'text-xs' : 'text-sm px-2.5 py-1'
      } ${className}`}
      title="Development Demo Price: Final store price subject to in-store verification before production purchase."
    >
      <AlertTriangle className={size === 'xs' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>Demo Price — Verify Before Launch</span>
    </div>
  );
};

export default DemoPriceBadge;
