import React from 'react';
import {
  TrendingUp,
  ListOrdered,
  Target,
  Compass,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useResponsiveMode } from './ResponsiveProvider';
import { FlutterNavDestination } from './types';

interface NavigationRailProps {
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

export const NavigationRail: React.FC<NavigationRailProps> = ({
  onOpenProfile,
  watchlistCount,
  user,
  isLightMode = false
}) => {
  const { activeTab, setActiveTab, drawerOpen, toggleDrawer } = useResponsiveMode();

  const destinations: {
    id: FlutterNavDestination;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
    action?: () => void;
    isProfile?: boolean;
  }[] = [
    { id: 'markets', label: 'Markets App', icon: TrendingUp },
    { id: 'watchlist', label: 'Watchlist', icon: ListOrdered, badge: watchlistCount },
    { id: 'predictions', label: 'Predictions', icon: Target },
    { id: 'astromacro', label: 'Astro-Macro', icon: Compass },
    { id: 'profile', label: 'Profile', icon: User, action: onOpenProfile, isProfile: true }
  ];

  return (
    <aside
      aria-label="Application Navigation Rail"
      className={`border-r flex flex-col items-center py-4 px-2 transition-all duration-200 shrink-0 ${
        drawerOpen ? 'w-44' : 'w-16'
      } ${
        isLightMode
          ? 'border-slate-300 bg-white/95 text-slate-800'
          : 'border-slate-800 bg-slate-950/90 text-slate-200'
      }`}
    >
      <div className="flex-1 space-y-2 w-full flex flex-col items-center">
        {destinations.map((dest) => {
          const Icon = dest.icon;
          const isActive =
            activeTab === dest.id || (dest.id === 'markets' && activeTab === 'terminal');

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
                  ? isLightMode
                    ? 'bg-blue-100 text-blue-700 font-bold border border-blue-300 shadow-sm'
                    : 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                  : isLightMode
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <div className="relative shrink-0">
                {dest.isProfile && user?.isSignedIn ? (
                  <img
                    src={user.avatar}
                    alt="User"
                    className={`w-5 h-5 rounded-full object-cover border ${
                      isLightMode ? 'border-blue-500' : 'border-cyan-400'
                    }`}
                  />
                ) : (
                  <Icon
                    className={`w-5 h-5 ${
                      isActive
                        ? isLightMode
                          ? 'text-blue-600'
                          : 'text-cyan-400'
                        : ''
                    }`}
                  />
                )}
                {dest.badge !== undefined && (
                  <span
                    className={`absolute -top-1 -right-2 px-1 py-0.2 rounded-full text-[8px] font-mono font-bold leading-none ${
                      isLightMode ? 'bg-blue-600 text-white' : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {dest.badge}
                  </span>
                )}
                {dest.isProfile && user?.isSignedIn && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
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
        className={`p-1.5 rounded-lg transition-colors mt-auto cursor-pointer ${
          isLightMode
            ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
            : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'
        }`}
        title={drawerOpen ? 'Collapse rail' : 'Expand rail'}
      >
        {drawerOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </aside>
  );
};
