import React from 'react';
import {
  TrendingUp,
  ListOrdered,
  Target,
  Compass,
  Bot,
  Code2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useResponsiveMode } from './ResponsiveProvider';
import { FlutterNavDestination } from './types';

interface NavigationRailProps {
  onOpenChat?: () => void;
  onOpenFlutterCode?: () => void;
  watchlistCount?: number;
}

export const NavigationRail: React.FC<NavigationRailProps> = ({
  onOpenChat,
  onOpenFlutterCode,
  watchlistCount
}) => {
  const { activeTab, setActiveTab, drawerOpen, toggleDrawer } = useResponsiveMode();

  const destinations: {
    id: FlutterNavDestination;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
    action?: () => void;
  }[] = [
    { id: 'terminal', label: 'Terminal', icon: TrendingUp },
    { id: 'watchlist', label: 'Watchlist', icon: ListOrdered, badge: watchlistCount },
    { id: 'predictions', label: 'Predictions', icon: Target },
    { id: 'astromacro', label: 'Astro-Macro', icon: Compass },
    { id: 'expert', label: 'AI Expert', icon: Bot, action: onOpenChat },
    { id: 'flutter_code', label: 'Flutter Code', icon: Code2, action: onOpenFlutterCode }
  ];

  return (
    <aside
      aria-label="Flutter NavigationRail"
      className={`border-r border-slate-800 bg-slate-950/90 flex flex-col items-center py-4 px-2 transition-all duration-200 shrink-0 ${
        drawerOpen ? 'w-44' : 'w-16'
      }`}
    >
      <div className="flex-1 space-y-2 w-full flex flex-col items-center">
        {destinations.map((dest) => {
          const Icon = dest.icon;
          const isActive = activeTab === dest.id;

          return (
            <button
              key={dest.id}
              onClick={() => {
                if (dest.action) {
                  dest.action();
                } else {
                  setActiveTab(dest.id);
                }
              }}
              title={dest.label}
              className={`flex items-center gap-2.5 p-2 rounded-xl transition-all cursor-pointer w-full relative ${
                drawerOpen ? 'justify-start px-3' : 'justify-center'
              } ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <div className="relative shrink-0">
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : ''}`} />
                {dest.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full bg-indigo-600 text-[8px] font-mono font-bold text-white leading-none">
                    {dest.badge}
                  </span>
                )}
                {dest.id === 'expert' && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse" />
                )}
              </div>

              {drawerOpen && (
                <span className="text-xs truncate tracking-tight">{dest.label}</span>
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={toggleDrawer}
        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors mt-auto cursor-pointer"
        title={drawerOpen ? 'Collapse rail' : 'Expand rail'}
      >
        {drawerOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </aside>
  );
};
