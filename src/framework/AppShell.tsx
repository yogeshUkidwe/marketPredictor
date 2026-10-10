import React, { ReactNode } from 'react';
import { useResponsiveMode } from './ResponsiveProvider';
import { Smartphone, Tablet } from 'lucide-react';
import { NavigationRail } from './NavigationRail';

export interface AppShellProps {
  macroBar: ReactNode;
  header: ReactNode;
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
  watchlistCount?: number;
}

export const AppShell: React.FC<AppShellProps> = ({
  macroBar,
  header,
  sidebar,
  terminalContent,
  watchlistContent,
  predictionContent,
  astroMacroContent,
  bottomNav,
  floatingBot,
  modals,
  onOpenChat,
  onOpenFlutterCode,
  watchlistCount
}) => {
  const { deviceMode, effectiveMode, activeTab } = useResponsiveMode();

  const isSimulatedDevice = deviceMode === 'app' || deviceMode === 'tab';

  const renderMobileContent = () => {
    switch (activeTab) {
      case 'watchlist':
        return <div className="p-3 sm:p-4 space-y-4">{watchlistContent || sidebar}</div>;
      case 'predictions':
        return <div className="p-3 sm:p-4 space-y-4">{predictionContent || terminalContent}</div>;
      case 'astromacro':
        return <div className="p-3 sm:p-4 space-y-4">{astroMacroContent || terminalContent}</div>;
      case 'terminal':
      default:
        return <div className="p-3 sm:p-4 space-y-4">{terminalContent}</div>;
    }
  };

  const shellBody = (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Global Macro Bar */}
      {macroBar}

      {/* 2. Responsive Header */}
      {header}

      {/* 3. Main Workspace based on Effective Mode */}
      {effectiveMode === 'app' ? (
        // Mobile App View: Tab-based routing with Bottom Navigation Bar
        <div className="flex-1 flex flex-col overflow-x-hidden pb-20">
          <main className="flex-1 overflow-y-auto max-w-lg mx-auto w-full overscroll-contain">
            {renderMobileContent()}
          </main>
          {bottomNav}
        </div>
      ) : effectiveMode === 'tab' ? (
        // Tablet (Tab) View: NavigationRail + 2-Column Split Workspace
        <div className="flex-1 flex overflow-hidden">
          <NavigationRail
            onOpenChat={onOpenChat}
            onOpenFlutterCode={onOpenFlutterCode}
            watchlistCount={watchlistCount}
          />
          <aside className="w-80 lg:w-88 border-r border-slate-800 bg-slate-950/70 shrink-0 overflow-y-auto hidden md:block">
            {sidebar}
          </aside>
          <main className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6 space-y-6 max-w-5xl mx-auto w-full">
            {terminalContent}
          </main>
          {floatingBot}
        </div>
      ) : (
        // Desktop Web View: Full Panoramic 3-Column Workspace
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <aside className="w-full lg:w-84 xl:w-96 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950/70 shrink-0 overflow-y-auto">
            {sidebar}
          </aside>
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6 max-w-6xl mx-auto w-full">
            {terminalContent}
          </main>
          {floatingBot}
        </div>
      )}

      {/* 4. Global Modals */}
      {modals}
    </div>
  );

  // If user forced device preview on a desktop monitor, wrap in an authentic device bezel
  if (isSimulatedDevice) {
    const isApp = deviceMode === 'app';
    return (
      <div className="min-h-screen bg-slate-950/95 flex flex-col items-center justify-start py-6 px-3">
        <div className="mb-3 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-[11px] text-slate-300 flex items-center gap-2 shadow-lg">
          {isApp ? <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> : <Tablet className="w-3.5 h-3.5 text-indigo-400" />}
          <span>
            Flutter <strong>{isApp ? 'Mobile App (390dp)' : 'Tablet / Tab (820dp)'}</strong> Layout
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">Toggle "Auto" in top bar to return to full window</span>
        </div>

        <div
          className={`w-full ${
            isApp ? 'max-w-[420px]' : 'max-w-[860px]'
          } bg-slate-950 border-2 border-slate-800/90 rounded-[2.5rem] shadow-2xl shadow-cyan-950/30 overflow-hidden ring-1 ring-slate-700/50 flex flex-col min-h-[780px] max-h-[92vh]`}
        >
          <div className="bg-slate-950 pt-2.5 pb-1 flex justify-center shrink-0 border-b border-slate-900">
            <div className="w-20 h-3.5 bg-slate-900 rounded-full flex items-center justify-end px-2">
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
