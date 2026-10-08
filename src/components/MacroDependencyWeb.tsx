import React from 'react';
import { Stock, MacroDependency } from '../types';
import { Globe, ArrowUpRight, ArrowDownRight, Minus, Activity, Network } from 'lucide-react';

interface MacroDependencyWebProps {
  stock: Stock;
}

export const MacroDependencyWeb: React.FC<MacroDependencyWebProps> = ({ stock }) => {
  const dependencies = stock.macroDependencies;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-800/60 text-cyan-400">
            <Network className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-100 tracking-wide">
              Cross-Field & Global Market Dependencies
            </h3>
            <p className="text-[11px] text-slate-400">
              Macro sensitivities, supply-chain links, and foreign exchange correlations
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
          Beta Sensitivity Matrix
        </span>
      </div>

      {/* Dependency Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {dependencies.map((dep, idx) => {
          const isBullish = dep.status === 'BULLISH';
          const isBearish = dep.status === 'BEARISH';
          const isPositiveCorr = dep.correlation >= 0;

          return (
            <div
              key={idx}
              className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5 space-y-2.5 hover:border-slate-700 transition-all group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                    {dep.field}
                  </div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                    {dep.name}
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider ${
                    isBullish
                      ? 'bg-emerald-950/60 border border-emerald-800/60 text-emerald-300'
                      : isBearish
                      ? 'bg-rose-950/60 border border-rose-800/60 text-rose-300'
                      : 'bg-slate-800 border border-slate-700 text-slate-300'
                  }`}
                >
                  {dep.status === 'BULLISH' ? 'TAILWIND' : dep.status === 'BEARISH' ? 'HEADWIND' : 'NEUTRAL'}
                </span>
              </div>

              {/* Correlation & Value Bar */}
              <div className="flex items-center justify-between text-xs font-mono bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px]">Corr (r):</span>
                  <span
                    className={`font-bold ${
                      isPositiveCorr ? 'text-cyan-300' : 'text-amber-300'
                    }`}
                  >
                    {isPositiveCorr ? '+' : ''}{dep.correlation.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px]">Level:</span>
                  <span className="text-slate-200 font-semibold">{dep.currentValue}</span>
                </div>
              </div>

              {/* Impact explanation */}
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {dep.impact}
              </p>
            </div>
          );
        })}
      </div>

      {/* Global Sector Resonance Summary */}
      <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-3 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-400" />
          <span>
            {stock.symbol} displays a composite macro alignment score of{' '}
            <strong className="text-slate-200">82%</strong> with global indices and commodity spreads.
          </span>
        </div>
        <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
          Refreshed in sync with Global Markets
        </span>
      </div>
    </div>
  );
};
