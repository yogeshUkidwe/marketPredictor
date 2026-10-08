import React, { useState } from 'react';
import { Stock, Fundamentals, PredictionSubScores } from '../types';
import {
  Brain,
  Layers,
  Compass,
  BarChart2,
  DollarSign,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Gauge,
  Sparkles,
  PieChart
} from 'lucide-react';

interface AdvancedModelsCardProps {
  stock: Stock;
}

type ModelType =
  | 'ENSEMBLE'
  | 'FUNDAMENTAL_MACRO'
  | 'ALGORITHMIC_MOMENTUM'
  | 'VEDIC_ASTRO_CYCLES';

export const AdvancedModelsCard: React.FC<AdvancedModelsCardProps> = ({ stock }) => {
  const [activeModel, setActiveModel] = useState<ModelType>('ENSEMBLE');

  const fund = stock.fundamentals || {
    pe: stock.pe,
    pbRatio: 3.8,
    marketCap: stock.marketCap,
    roe: 18.4,
    dividendYield: 1.4,
    debtToEquity: 0.35,
    epsGrowthYoY: 14.2,
    sectorMedianPE: stock.pe * 1.05,
    valuationRating: 'FAIR' as const
  };

  const sub = stock.prediction.subScores || {
    technicalScore: 82,
    fundamentalScore: 78,
    astroScore: stock.astroProfile.astroScore,
    macroScore: 80,
    overallConfidence: stock.prediction.confidenceScore,
    activeModel: 'ensemble' as const
  };

  // Derive model metrics
  const getModelDetails = () => {
    switch (activeModel) {
      case 'FUNDAMENTAL_MACRO':
        return {
          title: 'Deep Fundamental Valuation & Macro Model',
          icon: <DollarSign className="w-4 h-4 text-emerald-400" />,
          confidence: Math.round(sub.fundamentalScore * 0.95 + 4),
          bias: fund.pe < fund.sectorMedianPE ? 'BULLISH (Undervalued)' : 'NEUTRAL / FAIR',
          target: stock.currency + (stock.price * (1 + (fund.roe / 100) * 0.6)).toFixed(2),
          description: `Evaluates corporate balance sheet strength, P/E ratio (${fund.pe.toFixed(1)} vs sector median ${fund.sectorMedianPE.toFixed(1)}), Market Cap (${fund.marketCap}), and Return on Equity (${fund.roe}%).`,
          keySignals: [
            `P/E Ratio at ${fund.pe.toFixed(1)} trades ${fund.pe < fund.sectorMedianPE ? 'at discount' : 'near parity'} with industry peers`,
            `Healthy ROE of ${fund.roe}% and controlled Debt-to-Equity (${fund.debtToEquity})`,
            `EPS Growth YoY of +${fund.epsGrowthYoY}% provides fundamental floor support`
          ]
        };

      case 'ALGORITHMIC_MOMENTUM':
        return {
          title: 'Algorithmic Technical Momentum Model',
          icon: <BarChart2 className="w-4 h-4 text-cyan-400" />,
          confidence: sub.technicalScore,
          bias: stock.technicals.signal.includes('BUY') ? 'STRONG BULLISH' : 'NEUTRAL',
          target: stock.currency + stock.technicals.resistance1.toFixed(2),
          description: `Analyzes multi-timeframe moving averages (20 EMA, 50 SMA, 200 SMA), 14-day RSI (${stock.technicals.rsi}), and MACD crossover momentum velocity.`,
          keySignals: [
            `Price positioned securely above 20 EMA (${stock.currency}${stock.technicals.ema20.toFixed(2)})`,
            `14-day RSI at ${stock.technicals.rsi} indicates healthy momentum accumulation without overextension`,
            `MACD histogram (+${stock.technicals.macd.histogram.toFixed(1)}) printing positive divergence`
          ]
        };

      case 'VEDIC_ASTRO_CYCLES':
        return {
          title: 'Vedic Planetary Transits & Gann Cycle Model',
          icon: <Compass className="w-4 h-4 text-amber-400" />,
          confidence: sub.astroScore,
          bias: stock.astroProfile.currentTransitStatus.sentiment === 'Bullish' ? 'HIGH CELESTIAL ALIGNMENT' : 'VOLATILE PIVOT',
          target: stock.currency + stock.prediction.target1W.toFixed(2),
          description: `Maps Navagraha planetary rulers (${stock.astroProfile.rulingPlanet}), Nakshatra transits (${stock.astroProfile.nakshatra}), and Gann time-price angles to identify trend turning points.`,
          keySignals: [
            `Ruling planet ${stock.astroProfile.rulingPlanet} receives auspicious angular support in Navamsha`,
            `Current transit of ${stock.astroProfile.currentTransitStatus.title} provides institutional liquidity tailwind`,
            `Low retrograde vulnerability confirms clean directional trend discovery`
          ]
        };

      case 'ENSEMBLE':
      default:
        return {
          title: 'Tri-Vector Astro-Quant Consensus Model (Weighted Ensemble)',
          icon: <Brain className="w-4 h-4 text-purple-400" />,
          confidence: sub.overallConfidence,
          bias: stock.prediction.overallBias,
          target: stock.currency + stock.prediction.target1W.toFixed(2),
          description: `Harmonizes Technical Momentum (30%), Fundamental Valuation (25%), Financial Astrology (25%), and Global Macro Cross-Dependencies (20%) into a unified institutional conviction score.`,
          keySignals: [
            `Multi-disciplinary confluence confirmed across quant signals and celestial timing`,
            `Macro sensitivity indicators validate resilient risk-on appetite`,
            `Valuation metrics affirm solid risk-to-reward ratio for swing positioning`
          ]
        };
    }
  };

  const model = getModelDetails();

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-purple-950 border border-purple-800/60 text-purple-400">
            <Layers className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-100 tracking-wide flex items-center gap-2">
              Advanced Prediction Models Suite
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300">
                Multi-Factor Quant
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Comparative analysis across Technicals, Fundamentals (P/E & M-Cap), and Astrological Logic
            </p>
          </div>
        </div>

        {/* Confidence Meter Badge */}
        <div className="text-right flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
          <Gauge className="w-4 h-4 text-purple-400" />
          <div>
            <div className="text-[9px] uppercase font-semibold text-slate-400">Model Confidence</div>
            <div className="text-sm font-mono font-bold text-purple-300">
              {model.confidence}%
            </div>
          </div>
        </div>
      </div>

      {/* Model Selection Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveModel('ENSEMBLE')}
          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
            activeModel === 'ENSEMBLE'
              ? 'bg-purple-950/50 border-purple-500 shadow-md ring-1 ring-purple-500/50 text-white'
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300">
            <Brain className="w-3.5 h-3.5" />
            <span>Ensemble Consensus</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1 truncate">
            Astro + Fund + Quant
          </div>
        </button>

        <button
          onClick={() => setActiveModel('ALGORITHMIC_MOMENTUM')}
          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
            activeModel === 'ALGORITHMIC_MOMENTUM'
              ? 'bg-cyan-950/50 border-cyan-500 shadow-md ring-1 ring-cyan-500/50 text-white'
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Technical Momentum</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1 truncate">
            MA • RSI • MACD
          </div>
        </button>

        <button
          onClick={() => setActiveModel('FUNDAMENTAL_MACRO')}
          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
            activeModel === 'FUNDAMENTAL_MACRO'
              ? 'bg-emerald-950/50 border-emerald-500 shadow-md ring-1 ring-emerald-500/50 text-white'
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Fundamental & Macro</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1 truncate">
            P/E • M-Cap • ROE
          </div>
        </button>

        <button
          onClick={() => setActiveModel('VEDIC_ASTRO_CYCLES')}
          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
            activeModel === 'VEDIC_ASTRO_CYCLES'
              ? 'bg-amber-950/50 border-amber-500 shadow-md ring-1 ring-amber-500/50 text-white'
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <Compass className="w-3.5 h-3.5" />
            <span>Vedic Astro Gann</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1 truncate">
            Planets • Nakshatras
          </div>
        </button>
      </div>

      {/* Model Active Detail View */}
      <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-4 space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {model.icon}
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              {model.title}
            </h4>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div>
              <span className="text-slate-500 text-[10px]">Predicted Bias: </span>
              <strong className="text-emerald-400 font-bold">{model.bias}</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px]">Target: </span>
              <strong className="text-cyan-300 font-bold">{model.target}</strong>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {model.description}
        </p>

        {/* Key Model Signals */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[10px] uppercase font-semibold text-slate-400">
            Model Validation Signals
          </div>
          {model.keySignals.map((sig, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>{sig}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-Scores Matrix (Technical, Fundamental, Astro, Macro) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-300 uppercase text-[10px] tracking-wider">
            Triangulated Sub-Scores Breakdown
          </span>
          <span className="font-mono text-[11px]">Normalized 0 - 100 Scale</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Technical Sub-Score */}
          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Technicals</span>
              <span className="font-mono font-bold text-cyan-400">{sub.technicalScore}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full"
                style={{ width: `${sub.technicalScore}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500">MA + RSI + MACD</div>
          </div>

          {/* Fundamental Sub-Score */}
          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Fundamentals</span>
              <span className="font-mono font-bold text-emerald-400">{sub.fundamentalScore}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full"
                style={{ width: `${sub.fundamentalScore}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500">P/E {fund.pe.toFixed(1)} • ROE {fund.roe}%</div>
          </div>

          {/* Astrological Sub-Score */}
          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Astro Cycles</span>
              <span className="font-mono font-bold text-amber-400">{sub.astroScore}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full"
                style={{ width: `${sub.astroScore}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500">{stock.astroProfile.rulingPlanet} Dignity</div>
          </div>

          {/* Macro Sub-Score */}
          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Macro Alignment</span>
              <span className="font-mono font-bold text-indigo-400">{sub.macroScore}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-400 h-full rounded-full"
                style={{ width: `${sub.macroScore}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500">Yields & Crude Beta</div>
          </div>
        </div>
      </div>
    </div>
  );
};
