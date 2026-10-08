import React from 'react';
import { Stock } from '../types';
import { Sparkles, Compass, Moon, Sun, Calendar, ShieldCheck, Flame, Zap } from 'lucide-react';

interface AstroProfileCardProps {
  stock: Stock;
}

export const AstroProfileCard: React.FC<AstroProfileCardProps> = ({ stock }) => {
  const astro = stock.astroProfile;

  const getPlanetEmoji = (planet: string) => {
    switch (planet) {
      case 'Sun': return '☀️';
      case 'Moon': return '🌙';
      case 'Mars': return '♂';
      case 'Mercury': return '☿';
      case 'Jupiter': return '♃';
      case 'Venus': return '♀';
      case 'Saturn': return '♄';
      case 'Rahu': return '☊';
      case 'Ketu': return '☋';
      default: return '🪐';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-950 border border-amber-800/60 text-amber-400">
            <Compass className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-100 tracking-wide flex items-center gap-2">
              Financial Astrology & Planetary Market Profile
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300">
                Vedic & Gann Cycle
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Planetary ruler domains, Sarvatobhadra chakra, and transit resonance
            </p>
          </div>
        </div>

        {/* Astro Score Gauge */}
        <div className="text-right">
          <div className="text-[10px] uppercase font-semibold text-slate-400">Astro Potency</div>
          <div className="text-lg font-mono font-bold text-amber-400 flex items-center justify-end gap-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            {astro.astroScore}%
          </div>
        </div>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Ruling Planet */}
        <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl space-y-1">
          <div className="text-[10px] uppercase font-semibold text-slate-500">Ruling Planet</div>
          <div className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
            <span className="text-base">{getPlanetEmoji(astro.rulingPlanet)}</span>
            <span>{astro.rulingPlanet}</span>
          </div>
          <div className="text-[10px] text-slate-400 truncate">
            Sec: {astro.secondaryPlanet}
          </div>
        </div>

        {/* Zodiac Affiliation */}
        <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl space-y-1">
          <div className="text-[10px] uppercase font-semibold text-slate-500">Zodiac Sign</div>
          <div className="text-sm font-bold text-slate-200 truncate">
            {astro.zodiacSign}
          </div>
          <div className="text-[10px] text-slate-400">
            Element: {astro.element}
          </div>
        </div>

        {/* Nakshatra Constellation */}
        <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl space-y-1">
          <div className="text-[10px] uppercase font-semibold text-slate-500">Birth Nakshatra</div>
          <div className="text-sm font-bold text-indigo-300 truncate">
            {astro.nakshatra}
          </div>
          <div className="text-[10px] text-slate-400 truncate">
            Favorable: {astro.favorableNakshatras[0]}
          </div>
        </div>

        {/* Retrograde Sensitivity */}
        <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl space-y-1">
          <div className="text-[10px] uppercase font-semibold text-slate-500">Retrograde Impact</div>
          <div className="text-sm font-bold text-slate-200">
            {astro.retrogradeSensitivity ? (
              <span className="text-amber-400">High Sensitivity</span>
            ) : (
              <span className="text-emerald-400">Stable Direct Flow</span>
            )}
          </div>
          <div className="text-[10px] text-slate-400 truncate">
            {astro.retrogradeSensitivity ? 'Whipsaws on Mercury Rx' : 'Immune to minor Rx'}
          </div>
        </div>
      </div>

      {/* Active Transit Breakdown */}
      <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Active Celestial Transit: {astro.currentTransitStatus.title}</span>
          </div>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-900/50 text-amber-300 font-bold">
            {astro.currentTransitStatus.sentiment} Alignment ({astro.currentTransitStatus.strength}%)
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {astro.currentTransitStatus.description}
        </p>
        <div className="text-[11px] text-slate-400 pt-1">
          <strong>Planetary Deity & Domain:</strong> {astro.rulingDeity}
        </div>
      </div>

      {/* Upcoming Astrological Turning Points Calendar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-300 uppercase text-[10px] tracking-wider">
            Upcoming Celestial Inflection Windows
          </span>
          <span className="text-[11px]">Sarvatobhadra Key Dates</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {astro.upcomingAstroEvents.map((evt, i) => (
            <div
              key={i}
              className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5 flex items-start justify-between gap-2 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  <span>{evt.event}</span>
                </div>
                <div className="text-[11px] text-slate-400">{evt.impact}</div>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 text-amber-300 shrink-0 font-semibold">
                {evt.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
