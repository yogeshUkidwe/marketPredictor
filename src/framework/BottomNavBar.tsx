import React from 'react';
import {
  TrendingUp,
  ListOrdered,
  Target,
  Compass,
  Bot,
  Code2
} from 'lucide-react';
import { useResponsiveMode } from './ResponsiveProvider';
import { FlutterNavDestination } from './types';

interface BottomNavBarProps {
  onOpenChat?: () => void;
  onOpenFlutterCode?: () => void;
  watchlistCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  onOpenChat,
  onOpenFlutterCode,
  watchlistCount
}) => {
  const { activeTab, setActiveTab } = useResponsiveMode();

  const tabs: {
    id: FlutterNavDestination;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
    action?: () => void;
  }[] = [
    {
      id: 'terminal',
      label: 'Terminal',
      icon: TrendingUp
    },
    {
      id: 'watchlist',
      label: 'Watchlist',
      icon: ListOrdered,
      badge: watchlistCount
    },
    {
      id: 'predictions',
      label: 'Predictions',
      icon: Target
    },
    {
      id: 'astromacro',
      label: 'Astro-Macro',
      icon: Compass
    },
    {
      id: 'expert',
      label: 'AI Expert',
      icon: Bot,
      action: onOpenChat
    },
    {
      id: 'flutter_code',
      label: 'Flutter',
      icon: Code2,
      action: onOpenFlutterCode
    }
  ];

  return (
    <nav
      aria-label="Flutter NavigationBar"
      className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 px-2 py-1 shadow-2xl safe-area-bottom select-none"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.action) {
                  tab.action();
                } else {
                  setActiveTab(tab.id);
                }
              }}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all cursor-pointer min-w-[50px] min-h-[48px] relative ${
                isActive
                  ? 'text-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200 active:scale-95'
              }`}
            >
              <div className="relative">
                <div
                  className={`p-1 rounded-xl transition-all ${
                    isActive ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/40' : ''
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'scale-105 text-cyan-400' : ''
                    }`}
                  />
                </div>
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full bg-indigo-600 text-[9px] font-mono font-bold text-white leading-none">
                    {tab.badge}
                  </span>
                )}
                {tab.id === 'expert' && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse" />
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'text-cyan-300 font-semibold' : 'text-slate-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
