import React, { useState, useEffect } from 'react';
import { useResponsiveMode } from '../framework/ResponsiveProvider';
import { AppTheme } from './GoogleAuthModal';

interface AstroQuantResponsiveLogoProps {
  isLightMode: boolean;
  currentTheme?: AppTheme;
  isCompact?: boolean;
  onLogoClick?: () => void;
}

export const AstroQuantResponsiveLogo: React.FC<AstroQuantResponsiveLogoProps> = ({
  isLightMode,
  currentTheme = isLightMode ? 'daylight-light' : 'cosmic-dark',
  isCompact = false,
  onLogoClick
}) => {
  const { effectiveMode } = useResponsiveMode();
  const [justChanged, setJustChanged] = useState(false);

  // Trigger a brief glow animation when the theme changes
  useEffect(() => {
    setJustChanged(true);
    const timer = setTimeout(() => setJustChanged(false), 900);
    return () => clearTimeout(timer);
  }, [currentTheme]);

  const isAppMode = isCompact || effectiveMode === 'app';

  return (
    <div
      onClick={onLogoClick}
      className={`flex items-center gap-2 sm:gap-2.5 select-none group transition-transform duration-200 cursor-pointer ${
        justChanged ? 'scale-105' : 'hover:scale-[1.02]'
      }`}
      title="AstroQuant India (Click to open Profile & Themes)"
    >
      {/* Radiant Solar Light Logo (Replaces Dark Logo with Bright, Prestigious Solar Chakra) */}
      <div
        className={`relative flex items-center justify-center transition-all duration-300 p-0.5 shadow-lg ${
          isAppMode ? 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl' : 'w-10 h-10 sm:w-11 sm:h-11 rounded-2xl'
        } bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-300 ring-2 ring-amber-400/70 shadow-amber-500/30 ${
          justChanged ? 'ring-4 ring-amber-300 animate-pulse' : ''
        }`}
      >
        <div
          className={`w-full h-full rounded-[10px] sm:rounded-[14px] flex items-center justify-center transition-colors overflow-hidden ${
            isLightMode ? 'bg-amber-50' : 'bg-slate-900'
          }`}
        >
          {/* RADIANT LIGHT LOGO: Solar Surya Chakra Wheel with Momentum Rays */}
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500 transition-transform duration-700 group-hover:rotate-90"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Center Solar Core */}
            <circle cx="12" cy="12" r="4.3" fill="url(#solarGradBrand)" />
            {/* Inner Dharma / Momentum Orbit */}
            <circle
              cx="12"
              cy="12"
              r="7.5"
              stroke="#D97706"
              strokeWidth="1.3"
              strokeDasharray="2.5 1.5"
              className="animate-[spin_18s_linear_infinite]"
            />
            {/* 8 Radiant Light Rays */}
            <path
              d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"
              stroke="#F59E0B"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* 4 Extra Micro Nodes for Precision Quant Feel */}
            <circle cx="12" cy="4.5" r="0.8" fill="#FBBF24" />
            <circle cx="12" cy="19.5" r="0.8" fill="#FBBF24" />
            <circle cx="4.5" cy="12" r="0.8" fill="#FBBF24" />
            <circle cx="19.5" cy="12" r="0.8" fill="#FBBF24" />
            <defs>
              <linearGradient id="solarGradBrand" x1="8" y1="8" x2="16" y2="16" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FBBF24" />
                <stop offset="0.6" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#EA580C" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Live Pulsar Indicator */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-white bg-amber-500 animate-pulse" />
      </div>

      {/* Brand Name & Flag */}
      <div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <h1
            className={`font-black tracking-tight flex items-center gap-1 transition-all ${
              isAppMode ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
            } ${
              isLightMode
                ? 'bg-gradient-to-r from-blue-700 via-indigo-900 to-amber-700 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400 bg-clip-text text-transparent'
            }`}
          >
            <span>{isAppMode ? 'AstroQuant' : 'AstroQuant India'}</span>
            <span className="text-sm sm:text-base inline-block" role="img" aria-label="India Flag">
              🇮🇳
            </span>
          </h1>

          {/* Clean Live Status Tag */}
          <span
            className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-mono border ${
              isLightMode
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-amber-950/70 text-amber-300 border-amber-500/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>NSE Live</span>
          </span>
        </div>

        {/* Web Subtitle */}
        {!isAppMode && (
          <p
            className={`text-[10px] sm:text-[11px] hidden sm:block truncate max-w-xs font-semibold ${
              isLightMode ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            Solar Momentum & Quantitative Equities
          </p>
        )}
      </div>
    </div>
  );
};
