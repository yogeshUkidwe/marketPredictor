import React from 'react';
import { Smartphone, Tablet, Monitor, Sparkles, Wrench } from 'lucide-react';
import { useResponsiveMode } from './ResponsiveProvider';
import { DeviceMode } from './types';

interface DeviceModeSwitcherProps {
  isLightMode?: boolean;
}

export const DeviceModeSwitcher: React.FC<DeviceModeSwitcherProps> = ({ isLightMode = false }) => {
  const { deviceMode, effectiveMode, setDeviceMode } = useResponsiveMode();

  const options: { id: DeviceMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'web', label: 'Web', icon: Monitor },
    { id: 'app', label: 'App', icon: Smartphone },
    { id: 'tab', label: 'Tab', icon: Tablet },
    { id: 'auto', label: 'Auto', icon: Sparkles }
  ];

  return (
    <div
      className={`flex items-center gap-1.5 p-1 rounded-xl shadow-md text-xs transition-colors border-2 ${
        isLightMode
          ? 'bg-slate-100/90 border-slate-300 text-slate-800'
          : 'bg-slate-900/95 border-cyan-500/40 text-slate-200'
      }`}
      aria-label="Development Responsive Preview Switcher"
    >
      <div
        className={`flex items-center gap-1 pl-1 pr-1.5 border-r text-[10px] font-bold tracking-tight ${
          isLightMode ? 'border-slate-300 text-blue-700' : 'border-slate-700/80 text-cyan-300'
        }`}
      >
        <Wrench className={`w-3 h-3 shrink-0 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`} />
        <span className="hidden md:inline font-mono uppercase font-black">Dev Toggle:</span>
      </div>

      <div className="flex items-center gap-0.5">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = deviceMode === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => setDeviceMode(opt.id)}
              title={`Development Toggle for ${opt.label} Mode (Simulate layout)`}
              className={`px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer font-bold text-[11px] ${
                isActive
                  ? isLightMode
                    ? 'bg-blue-600 text-white font-black shadow-sm ring-1 ring-blue-400'
                    : 'bg-cyan-500 text-slate-950 font-black shadow-sm ring-1 ring-cyan-300'
                  : isLightMode
                  ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/80'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{opt.label}</span>
              {isActive && opt.id === 'auto' && (
                <span
                  className={`text-[9px] uppercase font-bold font-mono hidden sm:inline ${
                    isLightMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  ({effectiveMode})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
