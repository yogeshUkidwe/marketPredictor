import React, { ReactNode } from 'react';

interface FrameworkStatBadgeProps {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export const FrameworkStatBadge: React.FC<FrameworkStatBadgeProps> = ({
  label,
  value,
  hint,
  trend,
  className = ''
}) => {
  const trendColor =
    trend === 'up'
      ? 'text-emerald-400'
      : trend === 'down'
      ? 'text-rose-400'
      : 'text-slate-300';

  return (
    <div className={`space-y-0.5 ${className}`}>
      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
        {label}
      </span>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className={`font-mono font-bold text-sm sm:text-base ${trendColor}`}>
          {value}
        </span>
        {hint && (
          <span className="text-[11px] font-mono text-slate-400">
            {hint}
          </span>
        )}
      </div>
    </div>
  );
};
