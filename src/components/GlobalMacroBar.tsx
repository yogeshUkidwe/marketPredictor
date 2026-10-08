import React from 'react';
import { TrendingUp, TrendingDown, Globe2, Sparkles } from 'lucide-react';
import { GLOBAL_MACRO_INDICATORS } from '../data/astroKnowledge';

export const GlobalMacroBar: React.FC = () => {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-2 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold shrink-0 pr-3 border-r border-slate-800">
          <Globe2 className="w-3.5 h-3.5 animate-pulse" />
          <span className="tracking-wider uppercase text-[11px]">Global Cues & Macro</span>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-0.5 px-2">
          {GLOBAL_MACRO_INDICATORS.map((item) => {
            const isPositive = item.change >= 0;
            return (
              <div
                key={item.symbol}
                className="flex items-center gap-2 whitespace-nowrap bg-slate-800/40 hover:bg-slate-800/80 transition-colors px-2.5 py-1 rounded-md border border-slate-800"
                title={`${item.name} • Astro: ${item.astroInfluence}`}
              >
                <span className="text-slate-400 font-medium">{item.symbol}</span>
                <span className="text-slate-200 font-mono font-semibold">
                  {item.category === 'Bond' ? `${item.value.toFixed(2)}%` : item.category === 'Commodity' && item.symbol.includes('BRENT') ? `$${item.value.toFixed(2)}` : item.category === 'Commodity' && item.symbol.includes('GOLD') ? `$${item.value.toFixed(1)}` : item.symbol === 'USDINR' ? `₹${item.value.toFixed(2)}` : item.value.toLocaleString()}
                </span>
                <span
                  className={`flex items-center font-mono text-[11px] font-bold ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                  )}
                  {isPositive ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-amber-300/90 bg-amber-950/30 border border-amber-800/40 px-2 py-0.5 rounded text-[11px] shrink-0 ml-3">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Moon in Sagittarius • Guru in Taurus</span>
        </div>
      </div>
    </div>
  );
};
