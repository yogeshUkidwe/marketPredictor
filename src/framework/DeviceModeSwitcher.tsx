import React from 'react';
import { Smartphone, Tablet, Monitor, Sparkles } from 'lucide-react';
import { useResponsiveMode } from './ResponsiveProvider';
import { DeviceMode } from './types';

export const DeviceModeSwitcher: React.FC = () => {
  const { deviceMode, effectiveMode, setDeviceMode } = useResponsiveMode();

  const options: { id: DeviceMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'auto', label: 'Auto', icon: Sparkles },
    { id: 'app', label: 'App', icon: Smartphone },
    { id: 'tab', label: 'Tab', icon: Tablet },
    { id: 'web', label: 'Web', icon: Monitor }
  ];

  return (
    <div className="flex items-center gap-0.5 p-0.5 bg-slate-900/90 border border-slate-800 rounded-xl shadow-inner text-xs">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = deviceMode === opt.id;

        return (
          <button
            key={opt.id}
            onClick={() => setDeviceMode(opt.id)}
            title={`Flutter Layout: ${opt.label} mode (${opt.id === 'auto' ? 'Auto adaptive' : opt.id === 'app' ? 'Flutter Mobile App' : opt.id === 'tab' ? 'Flutter Tablet / Tab' : 'Flutter Web'})`}
            className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer font-medium text-[11px] ${
              isActive
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">{opt.label}</span>
            {isActive && opt.id === 'auto' && (
              <span className="text-[9px] uppercase font-bold text-cyan-400 font-mono">
                ({effectiveMode.toUpperCase()})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
