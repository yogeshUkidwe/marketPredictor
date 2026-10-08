import React, { useState } from 'react';
import { X, Compass, Sparkles, Orbit, Calendar, ArrowRight, ShieldCheck, Flame, Zap } from 'lucide-react';
import { CURRENT_PLANETARY_POSITIONS, ASTRO_TIMING_CYCLES } from '../data/astroKnowledge';
import { PlanetaryPosition } from '../types';

interface AstroRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AstroRadarModal: React.FC<AstroRadarModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetaryPosition>(
    CURRENT_PLANETARY_POSITIONS[0]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-4xl bg-slate-900 border border-amber-900/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-950/80 border border-amber-800/60 text-amber-400">
              <Compass className="w-5 h-5 animate-[spin_30s_linear_infinite]" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Planetary Transit Radar & Celestial Wheel
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300">
                  Sarvatobhadra Chakra
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Real-time planetary coordinates, zodiac sign degrees, and market sector influences
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Active Celestial Status Summary */}
          <div className="bg-gradient-to-r from-amber-950/30 via-slate-950/60 to-purple-950/30 border border-amber-800/40 rounded-xl p-4 text-xs text-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Current Astro Cycle State
              </span>
              <span className="text-emerald-400 font-mono font-semibold">
                Market Pulse: Benefic Inflow Phase (+84%)
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Jupiter (Guru) transits Taurus (2nd house of the natural zodiac) providing foundational liquidity to Banking & Large Cap FMCG. Rahu in Pisces drives algorithmic velocity in AI & Cloud infrastructure. Mercury in direct motion facilitates high institutional trading turnover.
            </p>
          </div>

          {/* Planetary Matrix Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-200 uppercase text-[11px] tracking-wider">
                9 Celestial Planetary Rulers (Navagraha Coordinates)
              </span>
              <span>Click any planet for domain breakdown</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
              {CURRENT_PLANETARY_POSITIONS.map((p) => {
                const isSelected = selectedPlanet.planet === p.planet;
                return (
                  <button
                    key={p.planet}
                    onClick={() => setSelectedPlanet(p)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-950/40 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                        <span className="text-base">
                          {p.planet === 'Sun' ? '☀️' : p.planet === 'Moon' ? '🌙' : p.planet === 'Mars' ? '♂' : p.planet === 'Mercury' ? '☿' : p.planet === 'Jupiter' ? '♃' : p.planet === 'Venus' ? '♀' : p.planet === 'Saturn' ? '♄' : p.planet === 'Rahu' ? '☊' : '☋'}
                        </span>
                        {p.planet}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          p.marketBias === 'Bullish'
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {p.marketBias}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 mt-1 font-mono">
                      {p.sign} • {p.degree}
                    </div>

                    <div className="text-[11px] text-amber-300/80 truncate mt-1">
                      {p.sectorsImpacted.join(', ')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Planet Deep Dive */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {selectedPlanet.planet === 'Sun' ? '☀️' : selectedPlanet.planet === 'Moon' ? '🌙' : selectedPlanet.planet === 'Mars' ? '♂' : selectedPlanet.planet === 'Mercury' ? '☿' : selectedPlanet.planet === 'Jupiter' ? '♃' : selectedPlanet.planet === 'Venus' ? '♀' : selectedPlanet.planet === 'Saturn' ? '♄' : selectedPlanet.planet === 'Rahu' ? '☊' : '☋'}
                </span>
                <span className="font-bold text-sm text-slate-100">
                  {selectedPlanet.planet} in {selectedPlanet.sign} ({selectedPlanet.degree})
                </span>
                {selectedPlanet.isRetrograde && (
                  <span className="text-[10px] font-mono bg-rose-950 border border-rose-800 text-rose-300 px-1.5 py-0.5 rounded">
                    Retrograde (Rx)
                  </span>
                )}
              </div>

              <div className="text-xs font-mono text-slate-400">
                House Position: {selectedPlanet.house}th Bhava
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedPlanet.energy}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-slate-400 text-xs font-medium">Primarily Influenced Sectors:</span>
              {selectedPlanet.sectorsImpacted.map((sec) => (
                <span
                  key={sec}
                  className="px-2 py-0.5 rounded-md bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 text-xs font-medium"
                >
                  {sec}
                </span>
              ))}
            </div>
          </div>

          {/* Key Astrological Timing Dates */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-200 uppercase text-[11px] tracking-wider">
                Upcoming Celestial Market Turning Points
              </span>
              <span>Major Ingress & Lunar Dates</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ASTRO_TIMING_CYCLES.map((cycle, i) => (
                <div
                  key={i}
                  className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {cycle.title}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300">
                      {cycle.date}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400">
                    {cycle.impact}
                  </p>

                  <div className="text-[10px] text-cyan-400 font-mono pt-0.5">
                    Impacted: {cycle.sector}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
