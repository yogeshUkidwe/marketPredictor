import React from 'react';
import {
  TrendingUp,
  ListOrdered,
  Target,
  Compass,
  User
} from 'lucide-react';
import { useResponsiveMode } from './ResponsiveProvider';
import { FlutterNavDestination } from './types';

interface BottomNavBarProps {
  onOpenProfile?: () => void;
  watchlistCount?: number;
  user?: {
    name: string;
    email: string;
    avatar: string;
    isSignedIn: boolean;
  };
  isLightMode?: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  onOpenProfile,
  watchlistCount,
  user,
  isLightMode = false
}) => {
  const { activeTab, setActiveTab } = useResponsiveMode();

  const tabs: {
    id: FlutterNavDestination;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
    action?: () => void;
    isProfile?: boolean;
  }[] = [
    {
      id: 'markets',
      label: 'Markets App',
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
      id: 'profile',
      label: 'Profile',
      icon: User,
      action: onOpenProfile,
      isProfile: true
    }
  ];

  return (
    <nav
      aria-label="Application Navigation"
      className={`fixed bottom-0 inset-x-0 z-40 backdrop-blur-xl border-t px-3 py-1.5 shadow-2xl safe-area-bottom select-none transition-colors duration-200 ${
        isLightMode
          ? 'bg-white/95 border-slate-300 shadow-slate-300/40 text-slate-800'
          : 'bg-slate-950/95 border-slate-800/90 shadow-slate-950/80 text-slate-200'
      }`}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            activeTab === tab.id || (tab.id === 'markets' && activeTab === 'terminal');

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
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer min-w-[56px] min-h-[50px] relative ${
                isActive
                  ? isLightMode
                    ? 'text-blue-600 font-black'
                    : 'text-cyan-400 font-bold'
                  : isLightMode
                  ? 'text-slate-600 hover:text-slate-900 active:scale-95'
                  : 'text-slate-400 hover:text-slate-200 active:scale-95'
              }`}
            >
              <div className="relative">
                <div
                  className={`p-1 rounded-xl transition-all ${
                    isActive
                      ? isLightMode
                        ? 'bg-blue-100 text-blue-700 ring-1 ring-blue-300'
                        : 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/40'
                      : ''
                  }`}
                >
                  {tab.isProfile && user?.isSignedIn ? (
                    <img
                      src={user.avatar}
                      alt="User"
                      className={`w-5 h-5 rounded-full object-cover border ${
                        isLightMode ? 'border-blue-500' : 'border-cyan-400'
                      }`}
                    />
                  ) : (
                    <Icon
                      className={`w-5 h-5 transition-transform ${
                        isActive
                          ? isLightMode
                            ? 'scale-105 text-blue-600'
                            : 'scale-105 text-cyan-400'
                          : ''
                      }`}
                    />
                  )}
                </div>

                {tab.badge !== undefined && (
                  <span
                    className={`absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold leading-none ${
                      isLightMode ? 'bg-blue-600 text-white' : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}

                {tab.isProfile && user?.isSignedIn && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <span
                className={`text-[11px] mt-0.5 tracking-tight ${
                  isActive
                    ? isLightMode
                      ? 'text-blue-700 font-black'
                      : 'text-cyan-300 font-bold'
                    : isLightMode
                    ? 'text-slate-600 font-semibold'
                    : 'text-slate-400 font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
