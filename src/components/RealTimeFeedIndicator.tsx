import React from 'react';
import { Activity, RefreshCw, Clock, CheckCircle2, Wifi, ShieldAlert, Target, PlayCircle, StopCircle, Lock } from 'lucide-react';
import { TranslationDictionary } from '../utils/translations';

interface RealTimeFeedIndicatorProps {
  lastUpdated: string;
  isUpdating: boolean;
  refreshInterval: number;
  onRefreshIntervalChange: (interval: number) => void;
  onManualRefresh: () => void;
  nextUpdateSeconds: number;
  t: TranslationDictionary;
  marketSessionStatus: 'OPEN' | 'CLOSED';
  onToggleMarketSession: () => void;
  onOpenAudit: () => void;
}

export const RealTimeFeedIndicator: React.FC<RealTimeFeedIndicatorProps> = ({
  lastUpdated,
  isUpdating,
  refreshInterval,
  onRefreshIntervalChange,
  onManualRefresh,
  nextUpdateSeconds,
  t,
  marketSessionStatus,
  onToggleMarketSession,
  onOpenAudit
}) => {
  const isOpen = marketSessionStatus === 'OPEN';

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800/90 rounded-2xl p-3 sm:px-4 text-xs shadow-lg backdrop-blur-md">
        {/* Left: Market Session Status & Live Sync Indicator */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Market Status Toggle Button */}
          <button
            onClick={onToggleMarketSession}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold font-mono transition-all cursor-pointer border shadow-sm ${
              isOpen
                ? 'bg-emerald-950/80 border-emerald-600/70 text-emerald-300 hover:bg-emerald-900/80'
                : 'bg-rose-950/80 border-rose-600/70 text-rose-300 hover:bg-rose-900/80'
            }`}
            title="Click to toggle Market Open vs Market Closed for post-session target audit"
          >
            {isOpen ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>🟢 NSE / BSE: OPEN</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                <span>🔴 MARKET CLOSED (Post-Session Audit)</span>
              </>
            )}
          </button>

          {/* Trading Session Date Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-[11px] font-mono font-bold">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>08-10-2026 (Live)</span>
          </div>

          {/* Sync indicator */}
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Wifi className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">{t.liveFeedActive}</span>
            <span className="text-[11px] text-slate-400 font-mono">
              ({lastUpdated || 'Syncing...'})
            </span>
          </div>

          {/* Target Locked Badge */}
          <div className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded-lg bg-indigo-950/70 border border-indigo-800/60 text-indigo-300 text-[11px] font-mono">
            <Lock className="w-3 h-3 text-cyan-400" />
            <span>Predicted Targets Locked</span>
          </div>
        </div>

        {/* Right: Controls & Post-Close Trigger */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Post-Market Audit Quick Button */}
          <button
            onClick={onOpenAudit}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-950/60 hover:bg-purple-900/60 border border-purple-700/60 text-purple-200 text-xs font-bold transition-all cursor-pointer"
            title="Compare predicted target vs actual closing prices"
          >
            <Target className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.postCloseAudit}</span>
          </button>

          {/* Countdown timer */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>{t.nextTick}: <strong className="text-cyan-300">{nextUpdateSeconds}s</strong></span>
          </div>

          {/* Polling Interval Select */}
          <div className="flex items-center gap-1 text-[11px]">
            <select
              value={refreshInterval}
              onChange={(e) => onRefreshIntervalChange(Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[11px] rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value={10}>10s</option>
              <option value={30}>30s</option>
              <option value={60}>60s</option>
            </select>
          </div>

          {/* Manual Refresh Now Button */}
          <button
            onClick={onManualRefresh}
            disabled={isUpdating}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all border border-slate-700 text-xs font-semibold disabled:opacity-50 cursor-pointer shadow-xs"
            title="Force refresh live quotes"
          >
            <RefreshCw className={`w-3 h-3 text-cyan-400 ${isUpdating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{t.refreshNow}</span>
          </button>
        </div>
      </div>

      {/* Reassurance Banner regarding Predicted Targets */}
      <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl px-3.5 py-1.5 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            {t.targetsLockedNotice} (e.g. TCS Target ₹2,095, Reliance Target ₹1,228 & HDFC Bank Target ₹714 stay locked while live market streams every minute).
          </span>
        </div>
        <button
          onClick={onToggleMarketSession}
          className="text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer shrink-0 ml-2"
        >
          {isOpen ? 'Simulate Market Close ➔' : 'Re-open Market ➔'}
        </button>
      </div>
    </div>
  );
};
