import React from 'react';
import { Flame, Sparkles, Leaf, AlertCircle } from 'lucide-react';

interface SpicyBadgeProps {
  level: 0 | 1 | 2 | 3;
  className?: string;
}

export const SpicyBadge: React.FC<SpicyBadgeProps> = ({ level, className = '' }) => {
  if (level === 0) return null;

  return (
    <span 
      className={`inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-medium rounded-full bg-red-950/20 text-red-600 dark:bg-red-950/60 dark:text-red-300 border border-red-500/40 ${className}`}
      title={`Spiciness level ${level} of 3`}
    >
      {Array.from({ length: level }).map((_, i) => (
        <Flame key={i} className="w-3 h-3 text-red-500 dark:text-red-400 fill-current inline" />
      ))}
      <span className="ml-1 text-[10px] tracking-wide uppercase">
        {level === 1 ? 'Mild' : level === 2 ? 'Spicy' : 'Extra Hot'}
      </span>
    </span>
  );
};

export const ChefsPickBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase rounded-full bg-purple-600/15 text-purple-700 dark:text-qc-secondary border border-purple-600/40 ${className}`}>
      <Sparkles className="w-3 h-3 text-purple-500" />
      <span>Chef's Pick</span>
    </span>
  );
};

export const VegetarianBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full bg-emerald-950/20 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-500/40 ${className}`}>
      <Leaf className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
      <span>Vegetarian</span>
    </span>
  );
};

export const SoldOutBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase rounded-full bg-qc-surface text-red-600 dark:text-red-300 border border-red-500/60 shadow-sm ${className}`}>
      <AlertCircle className="w-3 h-3 text-red-500 dark:text-red-400" />
      <span>Sold Out Today</span>
    </span>
  );
};
