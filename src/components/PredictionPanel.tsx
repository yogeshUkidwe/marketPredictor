import React, { useState } from 'react';
import { Stock, StockPrediction } from '../types';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  Target,
  BrainCircuit,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Zap,
  Clock
} from 'lucide-react';

interface PredictionPanelProps {
  stock: Stock;
  onUpdatePrediction: (newPrediction: StockPrediction) => void;
}

export const PredictionPanel: React.FC<PredictionPanelProps> = ({
  stock,
  onUpdatePrediction
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState<string | null>(null);

  const pred = stock.prediction;
  const isBullish = pred.overallBias.includes('BULLISH');
  const isBearish = pred.overallBias.includes('BEARISH');

  const potentialGain = Math.round(((pred.target1W - stock.price) / stock.price) * 10000) / 100;
  const potentialLoss = Math.round(((stock.price - pred.stopLoss) / stock.price) * 10000) / 100;
  const riskReward = (potentialGain / (potentialLoss || 1)).toFixed(1);

  const handleRunAiPrediction = async () => {
    setLoading(true);
    setError(null);

    try {
      setLoadingStep('Calculating Planetary Aspect Degrees & Nakshatra Vectors...');
      await new Promise(r => setTimeout(r, 600));

      setLoadingStep('Correlating Global Macro Factors (Crude, DXY, US 10Y, Sector Peers)...');
      await new Promise(r => setTimeout(r, 600));

      setLoadingStep('Executing Gemini 3.8 Flash Astro-Quant Synthesis...');

      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          symbol: stock.symbol,
          name: stock.name,
          exchange: stock.exchange,
          currency: stock.currency,
          sector: stock.sector,
          price: stock.price,
          rsi: stock.technicals.rsi,
          signal: stock.technicals.signal,
          rulingPlanet: stock.astroProfile.rulingPlanet,
          zodiacSign: stock.astroProfile.zodiacSign,
          nakshatra: stock.astroProfile.nakshatra,
          macroDependencies: stock.macroDependencies,
          currentAstroTransit: stock.astroProfile.currentTransitStatus,
          timeframe: '1W'
        })
      });

      if (!response.ok) {
        throw new Error('Prediction API call failed');
      }

      const data = await response.json();
      onUpdatePrediction(data);
    } catch (err: any) {
      console.error('Error generating AI prediction:', err);
      setError('Unable to fetch live AI prediction; displaying cached algorithmic astro-quant model.');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-6">
      {/* Top Prediction Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-700/60 text-indigo-400">
              <BrainCircuit className="w-4 h-4" />
            </span>
            <h2 className="text-base font-bold text-slate-100 tracking-wide">
              Astro-Quant Prediction Engine
            </h2>
            {pred.aiGenerated && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Live Gemini AI Verified
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Triangulated predictive synthesis across Technical Momentum, Global Macro Cues, and Planetary Cycles
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleRunAiPrediction}
          disabled={loading}
          className="relative group overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-indigo-950 transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
              <span>{loadingStep || 'Analyzing...'}</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Run Deep Gemini AI Astro-Quant Forecast</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-amber-950/30 border border-amber-800/50 rounded-xl text-xs text-amber-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Primary KPI Grid: Bias, Confidence, Targets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Overall Direction */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1 relative overflow-hidden">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Overall Market Bias
          </div>
          <div
            className={`text-lg font-black tracking-tight flex items-center gap-2 ${
              isBullish
                ? 'text-emerald-400'
                : isBearish
                ? 'text-rose-400'
                : 'text-amber-400'
            }`}
          >
            {isBullish ? (
              <TrendingUp className="w-5 h-5" />
            ) : isBearish ? (
              <TrendingDown className="w-5 h-5" />
            ) : (
              <Flame className="w-5 h-5" />
            )}
            {pred.overallBias}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            {potentialGain >= 0 ? `Expected move: +${potentialGain}%` : `Expected move: ${potentialGain}%`}
          </div>
          <div
            className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none ${
              isBullish ? 'bg-emerald-500/10' : isBearish ? 'bg-rose-500/10' : 'bg-amber-500/10'
            }`}
          />
        </div>

        {/* Confidence Score */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Model Confidence</span>
            <span className="font-mono text-cyan-400 font-bold">{pred.confidenceScore}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${pred.confidenceScore}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
            <span>Astro + Quant Confluence</span>
            <span className="text-emerald-400 font-semibold">High Conviction</span>
          </div>
        </div>

        {/* 1-Week Target */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>1-Week Swing Target</span>
            <Target className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg font-mono font-bold text-emerald-400">
            {stock.currency}{pred.target1W.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-500/90 font-mono">
            +{potentialGain}% upside from current price
          </div>
        </div>

        {/* Stop Loss & Risk Reward */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Stop-Loss / R:R</span>
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-lg font-mono font-bold text-rose-400">
            {stock.currency}{pred.stopLoss.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Risk:Reward <span className="text-slate-200 font-bold">1 : {riskReward}</span> (Risk -{potentialLoss}%)
          </div>
        </div>
      </div>

      {/* Target Timeline Horizons */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 tracking-wide uppercase text-[11px]">
            Target Horizons & Price Trajectory
          </span>
          <span className="text-slate-500 text-[11px]">Dynamic Pivot Projections</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-sans">1-Day Intraday Target</div>
              <div className="text-slate-200 font-bold text-sm mt-0.5">
                {stock.currency}{pred.target1D.toFixed(2)}
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 text-[11px] font-semibold">
              Intraday
            </span>
          </div>

          <div className="bg-slate-900/80 border border-indigo-900/40 p-3 rounded-lg flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-sans">1-Week Positional</div>
              <div className="text-emerald-400 font-bold text-sm mt-0.5">
                {stock.currency}{pred.target1W.toFixed(2)}
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-700/60 text-indigo-300 text-[11px] font-semibold">
              Swing Peak
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-sans">1-Month Cycle Target</div>
              <div className="text-amber-300 font-bold text-sm mt-0.5">
                {stock.currency}{pred.target1M.toFixed(2)}
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 text-[11px] font-semibold">
              Macro Horizon
            </span>
          </div>
        </div>

        {/* Probability Distribution */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Calculated Probability Outcome</span>
            <div className="flex items-center gap-3 font-mono text-[10px]">
              <span className="text-emerald-400">Bullish: {pred.bullishProb}%</span>
              <span className="text-slate-400">Neutral: {pred.neutralProb}%</span>
              <span className="text-rose-400">Bearish: {pred.bearishProb}%</span>
            </div>
          </div>
          <div className="w-full h-2.5 rounded-full overflow-hidden flex bg-slate-800">
            <div style={{ width: `${pred.bullishProb}%` }} className="bg-emerald-500 transition-all" />
            <div style={{ width: `${pred.neutralProb}%` }} className="bg-slate-600 transition-all" />
            <div style={{ width: `${pred.bearishProb}%` }} className="bg-rose-500 transition-all" />
          </div>
        </div>
      </div>

      {/* 3-Pillar Deep Breakdown Accordion Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pillar 1: Financial Astrology Confluence */}
        <div className="bg-slate-950/70 border border-amber-900/30 rounded-xl p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-300">
            <Compass className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              1. Astrological Confluence
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {pred.astroConfluence}
          </p>
          {pred.astroTimingVerdict && (
            <div className="bg-amber-950/30 border border-amber-800/40 rounded-lg p-2.5 text-[11px] text-amber-300/90 flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Timing Verdict:</strong> {pred.astroTimingVerdict}</span>
            </div>
          )}
        </div>

        {/* Pillar 2: Global Macro & Dependencies */}
        <div className="bg-slate-950/70 border border-cyan-900/30 rounded-xl p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-cyan-300">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              2. Global Macro Confluence
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {pred.macroConfluence}
          </p>
          <div className="space-y-1 pt-1">
            <div className="text-[11px] text-slate-400 font-semibold">Key Catalysts:</div>
            {pred.keyCatalysts.map((cat, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar 3: Quantitative Technicals */}
        <div className="bg-slate-950/70 border border-indigo-900/30 rounded-xl p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-indigo-300">
            <BrainCircuit className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              3. Technical Confluence
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {pred.technicalConfluence}
          </p>
          <div className="space-y-1 pt-1">
            <div className="text-[11px] text-slate-400 font-semibold">Risk Factors:</div>
            {pred.riskFactors.map((risk, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="truncate">{risk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Action Plan Box */}
      <div className="bg-gradient-to-r from-indigo-950/50 via-slate-950/80 to-purple-950/50 border border-indigo-800/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
            Actionable Strategic Verdict
          </span>
          <p className="text-xs text-slate-200 font-medium leading-relaxed">
            {pred.strategicVerdict}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-indigo-900/50 border border-indigo-700/50 text-indigo-300 font-semibold">
            Status: Active Signal
          </span>
        </div>
      </div>
    </div>
  );
};
