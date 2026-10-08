import React from 'react';
import { Compass, Orbit, Search, Star, BellRing, Download, Target, Globe, User, Bot } from 'lucide-react';
import { NotificationCenter } from './NotificationCenter';
import { AppNotification } from '../types';
import { Language, TranslationDictionary } from '../utils/translations';
import { UserProfile } from './GoogleAuthModal';

interface HeaderProps {
  onOpenRadar: () => void;
  onOpenSearch: () => void;
  onOpenAlerts: () => void;
  onOpenWatchlists: () => void;
  onOpenExport: () => void;
  onOpenPostMarketAudit: () => void;
  onOpenGoogleAuth: () => void;
  onOpenChat: () => void;
  user: UserProfile;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  watchlistCount: number;
  activeWatchlistName: string;
  marketFilter: 'ALL' | 'NSE' | 'GLOBAL';
  onFilterChange: (f: 'ALL' | 'NSE' | 'GLOBAL') => void;
  notifications: AppNotification[];
  onMarkAllNotificationsRead: () => void;
  onClearNotifications: () => void;
  onSelectStockSymbol: (symbol: string) => void;
  t: TranslationDictionary;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRadar,
  onOpenSearch,
  onOpenAlerts,
  onOpenWatchlists,
  onOpenExport,
  onOpenPostMarketAudit,
  onOpenGoogleAuth,
  onOpenChat,
  user,
  currentLanguage,
  onSelectLanguage,
  watchlistCount,
  activeWatchlistName,
  marketFilter,
  onFilterChange,
  notifications,
  onMarkAllNotificationsRead,
  onClearNotifications,
  onSelectStockSymbol,
  t
}) => {
  return (
    <header className="bg-slate-950/95 border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-amber-500 shadow-lg shadow-indigo-950/60 p-0.5">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Orbit className="w-5 h-5 text-cyan-400 animate-[spin_12s_linear_infinite]" />
            </div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-950 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-indigo-200 to-amber-300 bg-clip-text text-transparent">
                {t.appName}
              </h1>
              <span className="hidden sm:inline-block text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.2 rounded bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 font-mono">
                AI Market Engine
              </span>
              <span className="hidden md:inline-block text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 font-mono">
                08-10-2026
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block truncate max-w-sm">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Center search button */}
        <div className="hidden lg:flex items-center gap-2 flex-1 max-w-sm mx-2">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 text-slate-400 transition-all text-xs group shadow-inner cursor-pointer"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
              <span className="truncate">{t.searchPlaceholder}</span>
            </div>
            <kbd className="text-[9px] bg-slate-800 border border-slate-700 px-1 py-0.2 rounded text-slate-400 font-mono shrink-0 ml-1">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Ask AI Market Expert Button (Exact label requested: Ask AI Market Expert, NOT astro in label) */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600/30 via-indigo-600/30 to-purple-600/30 hover:from-cyan-600/40 hover:to-purple-600/40 border border-cyan-400/60 text-cyan-200 text-xs font-bold transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
            title="Ask AI Market Expert (Equities, Technicals, Fundamentals & Macro Cycles)"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-300" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline font-bold">{t.askAiMarketExpert}</span>
            <span className="sm:hidden font-bold">{t.aiMarketExpert}</span>
          </button>

          {/* Post-Market Close Audit Button */}
          <button
            onClick={onOpenPostMarketAudit}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/60 text-purple-300 text-xs font-semibold transition-all cursor-pointer shadow-sm"
            title="Post-Market Target Verification & Root Cause Analysis"
          >
            <Target className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="hidden md:inline">{t.postCloseAudit}</span>
          </button>

          {/* Export / Backup Button */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
            title="Export Watchlist & Alerts to CSV or JSON"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="hidden xl:inline">{t.export}</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs">
            <Globe className="w-3 h-3 text-cyan-400 shrink-0" />
            <select
              value={currentLanguage}
              onChange={(e) => onSelectLanguage(e.target.value as Language)}
              className="bg-transparent text-slate-300 text-[11px] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="en">EN (English)</option>
              <option value="hi">HI (हिंदी)</option>
              <option value="gu">GU (ગુજરાતી)</option>
              <option value="mr">MR (मराठी)</option>
              <option value="es">ES (Español)</option>
            </select>
          </div>

          {/* Google Sign In / Profile Button */}
          <button
            onClick={onOpenGoogleAuth}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
              user.isSignedIn
                ? 'bg-slate-900 border-indigo-700/60 text-indigo-300'
                : 'bg-white hover:bg-slate-100 text-slate-900 border-transparent shadow'
            }`}
            title={user.isSignedIn ? `Signed in as ${user.email}` : t.googleSignIn}
          >
            {user.isSignedIn ? (
              <>
                <img src={user.avatar} alt="User" className="w-4 h-4 rounded-full border border-indigo-400" />
                <span className="max-w-[70px] truncate hidden sm:inline">{user.name.split(' ')[0]}</span>
              </>
            ) : (
              <>
                <div className="w-3.5 h-3.5">
                  <svg className="w-full h-full" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>
                <span className="hidden sm:inline">Google Login</span>
              </>
            )}
          </button>

          {/* Notifications Bell */}
          <NotificationCenter
            notifications={notifications}
            onMarkAllAsRead={onMarkAllNotificationsRead}
            onClearAll={onClearNotifications}
            onSelectStockSymbol={onSelectStockSymbol}
            onOpenAlertsModal={onOpenAlerts}
          />

          {/* Astro Radar Wheel Trigger */}
          <button
            onClick={onOpenRadar}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 hover:from-amber-500/20 hover:to-indigo-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-sm transition-all cursor-pointer"
            title="View Celestial Wheel and Planetary Transit Matrix"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-[spin_20s_linear_infinite]" />
            <span className="hidden xl:inline">{t.radar}</span>
          </button>

          {/* Mobile search button */}
          <button
            onClick={onOpenSearch}
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
