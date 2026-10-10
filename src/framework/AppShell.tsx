import React, { ReactNode } from 'react';
import { useResponsiveMode } from './ResponsiveProvider';
import { Smartphone, Tablet } from 'lucide-react';
import { NavigationRail } from './NavigationRail';
import { AppTheme } from '../components/GoogleAuthModal';

export interface AppShellProps {
  macroBar?: ReactNode;
  header: ReactNode;
  tickerBar?: ReactNode;
  sidebar: ReactNode;
  terminalContent: ReactNode;
  watchlistContent?: ReactNode;
  predictionContent?: ReactNode;
  astroMacroContent?: ReactNode;
  bottomNav?: ReactNode;
  floatingBot?: ReactNode;
  modals?: ReactNode;
  onOpenChat?: () => void;
  onOpenFlutterCode?: () => void;
  onOpenProfile?: () => void;
  watchlistCount?: number;
  user?: any;
  currentTheme?: AppTheme;
}

export const AppShell: React.FC<AppShellProps> = ({
  macroBar,
  header,
  tickerBar,
  sidebar,
  terminalContent,
  watchlistContent,
  predictionContent,
  astroMacroContent,
  bottomNav,
  floatingBot,
  modals,
  onOpenProfile,
  watchlistCount,
  user,
  currentTheme = 'cosmic-dark'
}) => {
  const { deviceMode, effectiveMode, activeTab, topBarScrollMode } = useResponsiveMode();
  const isLightMode = currentTheme === 'daylight-light';

  const isSimulatedDevice = deviceMode === 'app' || deviceMode === 'tab';

  const renderMobileContent = () => {
    switch (activeTab) {
      case 'watchlist':
        return <div className="p-3 sm:p-4 space-y-4">{watchlistContent || sidebar}</div>;
      case 'predictions':
        return <div className="p-3 sm:p-4 space-y-4">{predictionContent || terminalContent}</div>;
      case 'astromacro':
        return <div className="p-3 sm:p-4 space-y-4">{astroMacroContent || terminalContent}</div>;
      case 'markets':
      case 'terminal':
      default:
        return <div className="p-3 sm:p-4 space-y-4">{terminalContent}</div>;
    }
  };

  const shellBody = (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isLightMode
          ? 'bg-slate-50 text-slate-900 selection:bg-blue-500/20 selection:text-blue-900'
          : 'bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200'
      }`}
    >
      {/* 1. Optional Top Macro Bar */}
      {macroBar}

      {/* 2. Unified Top App Bar & Always-Visible Moving Rates Ticker */}
      {topBarScrollMode === 'sticky' ? (
        <div className="sticky top-0 z-40 w-full shrink-0 flex flex-col shadow-md">
          {header}
          {tickerBar}
        </div>
      ) : effectiveMode !== 'app' ? (
        <div className="w-full shrink-0 flex flex-col shadow-sm">
          {header}
          {tickerBar}
        </div>
      ) : null}

      {/* 4. Main Workspace based on Effective Mode */}
      {effectiveMode === 'app' ? (
        // Mobile App View: Tab-based routing with Bottom Navigation Bar
        <div className="flex-1 flex flex-col overflow-x-hidden pb-20">
          <main className="flex-1 overflow-y-auto max-w-lg mx-auto w-full overscroll-contain">
            {topBarScrollMode === 'scroll' && (
              <div className="w-full shrink-0 flex flex-col shadow-sm">
                {header}
                {tickerBar}
              </div>
            )}
            {renderMobileContent()}
          </main>
          {bottomNav}
        </div>
      ) : effectiveMode === 'tab' ? (
        // Tablet (Tab) View: NavigationRail + 2-Column Split Workspace
        <div className="flex-1 flex overflow-hidden">
          <NavigationRail
            onOpenProfile={onOpenProfile}
            watchlistCount={watchlistCount}
            user={user}
            isLightMode={isLightMode}
          />
          <aside
            className={`w-80 lg:w-88 border-r shrink-0 overflow-y-auto hidden md:block transition-colors ${
              isLightMode ? 'bg-white/90 border-slate-300' : 'bg-slate-950/70 border-slate-800'
            }`}
          >
            {sidebar}
          </aside>
          <main className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6 space-y-6 max-w-5xl mx-auto w-full">
            {terminalContent}
          </main>
        </div>
      ) : (
        // Desktop Web View: Full Panoramic Workspace
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <aside
            className={`w-full lg:w-84 xl:w-96 border-b lg:border-b-0 lg:border-r shrink-0 overflow-y-auto transition-colors ${
              isLightMode ? 'bg-white/90 border-slate-300' : 'bg-slate-950/70 border-slate-800'
            }`}
          >
            {sidebar}
          </aside>
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6 max-w-6xl mx-auto w-full">
            {terminalContent}
          </main>
        </div>
      )}

      {/* 5. Prominent Floating Bot for AI Market Expert (Always visible floating button) */}
      {floatingBot}

      {/* 6. Global Modals */}
      {modals}
    </div>
  );

  // If user forced device preview on a desktop monitor, wrap in an authentic device bezel
  if (isSimulatedDevice) {
    const isApp = deviceMode === 'app';
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-start py-6 px-3 transition-colors ${
          isLightMode ? 'bg-slate-200/90' : 'bg-slate-950/95'
        }`}
      >
        <div
          className={`mb-3 px-3 py-1 rounded-full border text-[11px] flex items-center gap-2 shadow-lg transition-colors ${
            isLightMode
              ? 'bg-white border-slate-300 text-slate-800'
              : 'bg-slate-900 border-slate-700/80 text-slate-300'
          }`}
        >
          {isApp ? (
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
          ) : (
            <Tablet className="w-3.5 h-3.5 text-indigo-400" />
          )}
          <span>
            Development Preview: <strong>{isApp ? 'Mobile App (390dp)' : 'Tablet / Tab (820dp)'}</strong> Layout
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">Click "Web" or "Auto" in top bar to return</span>
        </div>

        <div
          className={`w-full ${
            isApp ? 'max-w-[420px]' : 'max-w-[860px]'
          } border-2 rounded-[2.5rem] shadow-2xl overflow-hidden ring-1 flex flex-col min-h-[780px] max-h-[92vh] transition-colors ${
            isLightMode
              ? 'bg-white border-slate-400/80 shadow-slate-400/30 ring-slate-300'
              : 'bg-slate-950 border-slate-800/90 shadow-cyan-950/30 ring-slate-700/50'
          }`}
        >
          <div
            className={`pt-2.5 pb-1 flex justify-center shrink-0 border-b transition-colors ${
              isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-900'
            }`}
          >
            <div
              className={`w-20 h-3.5 rounded-full flex items-center justify-end px-2 ${
                isLightMode ? 'bg-slate-300' : 'bg-slate-900'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/80" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto relative flex flex-col">
            {shellBody}
          </div>
        </div>
      </div>
    );
  }

  return shellBody;
};
