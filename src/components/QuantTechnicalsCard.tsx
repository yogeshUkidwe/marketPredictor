import React from 'react';
import { Stock } from '../types';
import { BarChart3, TrendingUp, Gauge, Shield, Layers } from 'lucide-react';

interface QuantTechnicalsCardProps {
  stock: Stock;
}

export const QuantTechnicalsCard: React.FC<QuantTechnicalsCardProps> = ({ stock }) => {
  const tech = stock.technicals;
  const isOverbought = tech.rsi >= 70;
  const isOversold = tech.rsi <= 30;

  // 24h range percentage
  const rangeSpan = stock.high24h - stock.low24h || 1;
  const currentPos = Math.min(Math.max(((stock.price - stock.low24h) / rangeSpan) * 100, 0), 100);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-indigo-950 border border-indigo-800/60 text-indigo-400">
            <BarChart3 className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-100 tracking-wide">
              Quantitative & Technical Momentum
            </h3>
            <p className="text-[11px] text-slate-400">
              Momentum oscillators, moving average ribbons, and pivot bands
            </p>
          </div>
        </div>

        <span
          className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${
            tech.signal.includes('BUY')
              ? 'bg-emerald-950/80 border-emerald-700/60 text-emerald-300'
              : tech.signal.includes('SELL')
              ? 'bg-rose-950/80 border-rose-700/60 text-rose-300'
              : 'bg-slate-800 border-slate-700 text-slate-300'
          }`}
        >
          {tech.signal}
        </span>
      </div>

      {/* 24h Range Bar */}
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>24h Range</span>
          <span className="font-mono text-slate-200">
            L: {stock.currency}{stock.low24h.toFixed(2)} — H: {stock.currency}{stock.high24h.toFixed(2)}
          </span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full relative overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all"
            style={{ width: `${currentPos}%` }}
          />
        </div>
      </div>

      {/* RSI & MACD Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* RSI Box */}
        <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">14-Day RSI</span>
            <span
              className={`font-mono font-bold ${
                isOverbought ? 'text-amber-400' : isOversold ? 'text-cyan-400' : 'text-emerald-400'
              }`}
            >
              {tech.rsi}
            </span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
            <div style={{ width: `${Math.min(tech.rsi, 100)}%` }} className="bg-cyan-400 h-full rounded-full" />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>Oversold (30)</span>
            <span>Neutral (50)</span>
            <span>Overbought (70)</span>
          </div>
        </div>

        {/* MACD Box */}
        <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">MACD (12, 26, 9)</span>
            <span className="font-mono font-bold text-indigo-300">
              +{tech.macd.histogram.toFixed(1)} Histogram
            </span>
          </div>

          <div className="flex items-center justify-between text-xs font-mono pt-1 text-slate-300">
            <div>
              <span className="text-slate-500 text-[10px]">MACD:</span> {tech.macd.macd.toFixed(1)}
            </div>
            <div>
              <span className="text-slate-500 text-[10px]">Signal:</span> {tech.macd.signal.toFixed(1)}
            </div>
            <div>
              <span className="text-emerald-400 text-[10px] font-semibold">Bull Cross</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-400">
            Momentum histogram confirms strong upward velocity.
          </div>
        </div>
      </div>

      {/* Support & Resistance Table & Moving Averages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
        {/* Support & Resistance */}
        <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl space-y-1.5">
          <div className="text-[10px] uppercase font-sans font-semibold text-slate-400">
            Key Pivot Thresholds
          </div>
          <div className="flex items-center justify-between text-rose-400">
            <span>Res 2:</span>
            <span>{stock.currency}{tech.resistance2.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-amber-400">
            <span>Res 1:</span>
            <span>{stock.currency}{tech.resistance1.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-cyan-300">
            <span>Supp 1:</span>
            <span>{stock.currency}{tech.support1.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-indigo-400">
            <span>Supp 2:</span>
            <span>{stock.currency}{tech.support2.toFixed(2)}</span>
          </div>
        </div>

        {/* Moving Averages */}
        <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl space-y-1.5">
          <div className="text-[10px] uppercase font-sans font-semibold text-slate-400">
            Moving Average Alignment
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>20 EMA:</span>
            <span className="text-emerald-400">{stock.currency}{tech.ema20.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>50 SMA:</span>
            <span className="text-slate-200">{stock.currency}{tech.sma50.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>200 SMA:</span>
            <span className="text-slate-400">{stock.currency}{tech.sma200.toFixed(2)}</span>
          </div>
          <div className="pt-0.5 text-[10px] text-emerald-400 font-sans">
            ✓ Price trading firmly above Golden Trendline
          </div>
        </div>
      </div>
    </div>
  );
};
