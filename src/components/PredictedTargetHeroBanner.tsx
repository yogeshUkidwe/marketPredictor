import React, { useState } from 'react';
import { Stock } from '../types';
import { Target, TrendingUp, ShieldAlert, Sparkles, ArrowRight, Zap, Clock, CheckCircle2 } from 'lucide-react';
import { TranslationDictionary } from '../utils/translations';

interface PredictedTargetHeroBannerProps {
  stock: Stock;
  t: TranslationDictionary;
  onOpenAudit: () => void;
}

export const PredictedTargetHeroBanner: React.FC<PredictedTargetHeroBannerProps> = ({
  stock,
  t,
  onOpenAudit
}) => {
  const [targetHorizon, setTargetHorizon] = useState<'1D' | '1W' | '1M'>('1W');

  const currentPrice = stock.price;
  const targetPrice =
    targetHorizon === '1D'
      ? stock.prediction.target1D
      : targetHorizon === '1W'
      ? stock.prediction.target1W
      : stock.prediction.target1M;

  const profitAmount = Math.round((targetPrice - currentPrice) * 100) / 100;
  const profitPct = Math.round(((profitAmount / currentPrice) * 100) * 100) / 100;
  const stopLoss = stock.prediction.stopLoss;
  const riskAmount = Math.round((currentPrice - stopLoss) * 100) / 100;
  const riskPct = Math.round(((riskAmount / currentPrice) * 100) * 100) / 100;
  const rrRatio = (profitAmount / (riskAmount || 1)).toFixed(1);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border-2 border-indigo-500/40 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
      {/* Background glow orb */}
      <div className="absolute top-0 right-1/4 -mt-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Top Header: Horizon selector & Confidence */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-800/40">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <Target className="w-5 h-5 text-amber-400" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-100">
                  {t.predictedTarget} ({stock.symbol})
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-300 font-bold">
                  ★ Astro-Quant Live
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 font-bold">
                  08-10-2026
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Institutional price target calculated using Gann planetary cycles & technical momentum
              </p>
            </div>
          </div>

          {/* Timeframe pill selector */}
          <div className="flex items-center bg-slate-950 border border-indigo-900/60 rounded-xl p-1 text-xs font-semibold">
            <button
              onClick={() => setTargetHorizon('1D')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                targetHorizon === '1D'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1-Day
            </button>
            <button
              onClick={() => setTargetHorizon('1W')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                targetHorizon === '1W'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1-Week (Swing)
            </button>
            <button
              onClick={() => setTargetHorizon('1M')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                targetHorizon === '1M'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1-Month
            </button>
          </div>
        </div>

        {/* Central Prominent Price Flow: Current Price ➔ PREDICTED TARGET */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Current Price */}
          <div className="md:col-span-4 bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">
              {t.currentPrice}
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-slate-200 mt-1">
              {stock.currency}{currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              Live NSE/BSE Market Price
            </div>
          </div>

          {/* Arrow & Move Indicator */}
          <div className="md:col-span-1 hidden md:flex items-center justify-center text-cyan-400">
            <ArrowRight className="w-8 h-8 stroke-[2.5]" />
          </div>

          {/* PREDICTED TARGET AMOUNT (Huge & Eye-Catching) */}
          <div className="md:col-span-7 bg-gradient-to-r from-emerald-950/40 to-indigo-950/60 border-2 border-emerald-500/60 rounded-xl p-4 sm:p-5 relative shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                  {targetHorizon === '1D' ? t.intradayTarget : targetHorizon === '1W' ? t.swingTarget : t.oneMonthTarget}
                </span>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-mono font-black text-emerald-300 tracking-tight mt-0.5 drop-shadow-[0_2px_12px_rgba(16,185,129,0.35)]">
                  {stock.currency}{targetPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              {/* Profit Potential Badge */}
              <div className="text-right shrink-0 bg-emerald-950/80 border border-emerald-600/60 px-3.5 py-2 rounded-xl">
                <div className="text-[10px] uppercase font-bold text-emerald-400">
                  {t.expectedProfit}
                </div>
                <div className="text-lg sm:text-xl font-mono font-black text-emerald-300">
                  {profitAmount >= 0 ? '+' : ''}{stock.currency}{profitAmount.toFixed(2)} ({profitPct >= 0 ? '+' : ''}{profitPct}%)
                </div>
              </div>
            </div>

            {/* Sub-Metrics Footer in Target Card */}
            <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-emerald-800/40 text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">{t.stopLoss}</span>
                <span className="text-rose-400 font-bold">{stock.currency}{stopLoss.toFixed(2)} (-{riskPct}%)</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">{t.riskReward}</span>
                <span className="text-cyan-300 font-bold">1 : {rrRatio}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">{t.modelConfidence}</span>
                <span className="text-amber-300 font-bold">{stock.prediction.confidenceScore}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar: Post-Market Match Check + Quick Rationale */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Astro Timing Confluence:</strong> Planetary ruler <strong className="text-amber-300">{stock.astroProfile.rulingPlanet}</strong> in {stock.astroProfile.zodiacSign} supports upward impulse.
            </span>
          </div>

          <button
            onClick={onOpenAudit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-900/60 hover:bg-indigo-800/80 border border-indigo-700/60 text-indigo-200 text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.postMarketAudit}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
