import React, { ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useResponsiveMode } from '../ResponsiveProvider';

interface FrameworkCardProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  kicker?: ReactNode;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  variant?: 'default' | 'cyan' | 'indigo' | 'emerald' | 'amber';
}

export const FrameworkCard: React.FC<FrameworkCardProps> = ({
  title,
  subtitle,
  kicker,
  headerAction,
  children,
  className = '',
  collapsible = false,
  defaultCollapsed = false,
  variant = 'default'
}) => {
  const { isMobile, isTablet } = useResponsiveMode();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const borderStyles = {
    default: 'border-slate-800 bg-slate-900/90',
    cyan: 'border-cyan-500/40 bg-slate-900/90 shadow-cyan-950/20',
    indigo: 'border-indigo-500/40 bg-slate-900/90 shadow-indigo-950/20',
    emerald: 'border-emerald-500/40 bg-slate-900/90 shadow-emerald-950/20',
    amber: 'border-amber-500/40 bg-slate-900/90 shadow-amber-950/20'
  }[variant];

  const paddingStyle = isMobile ? 'p-3.5 sm:p-4' : isTablet ? 'p-4 sm:p-5' : 'p-5 sm:p-6';

  return (
    <div
      className={`border rounded-2xl shadow-xl backdrop-blur-md transition-all duration-150 ${borderStyles} ${className}`}
    >
      {(title || subtitle || kicker || headerAction) && (
        <div
          className={`flex items-start justify-between gap-3 border-b border-slate-800/80 ${
            isMobile ? 'px-3.5 py-2.5 sm:px-4 sm:py-3' : 'px-5 py-3.5'
          } ${collapsible ? 'cursor-pointer select-none' : ''}`}
          onClick={collapsible ? () => setCollapsed(!collapsed) : undefined}
        >
          <div className="space-y-0.5 min-w-0">
            {kicker && (
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold">
                {kicker}
              </div>
            )}
            {title && (
              <h3 className="text-sm sm:text-base font-bold text-slate-100 truncate flex items-center gap-2">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-400 font-medium">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {headerAction && <div onClick={(e) => e.stopPropagation()}>{headerAction}</div>}
            {collapsible && (
              <button
                type="button"
                className="p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      )}

      {!collapsed && <div className={paddingStyle}>{children}</div>}
    </div>
  );
};
