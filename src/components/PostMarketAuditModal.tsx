import React, { useState } from 'react';
import { Stock } from '../types';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Globe2,
  History,
  TrendingUp,
  Building,
  Compass,
  RefreshCw,
  Target,
  Zap,
  Lock
} from 'lucide-react';
import { TranslationDictionary } from '../utils/translations';

interface PostMarketAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStock: Stock;
  allStocks: Stock[];
  onSelectStock: (stock: Stock) => void;
  t: TranslationDictionary;
}

interface AuditResult {
  isMatched: boolean;
  predictedTarget: number;
  actualClose: number;
  differencePercent: number;
  verdict: string;
  summary: string;
  rootCauses: {
    globalDependencies: string;
    previousDaySpillover: string;
    promoterAndInstitutional: string;
    companyFundamentals: string;
    astrologicalTimingDelay: string;
  };
}

export const PostMarketAuditModal: React.FC<PostMarketAuditModalProps> = ({
  isOpen,
  onClose,
  selectedStock,
  allStocks,
  onSelectStock,
  t
}) => {
  const [currentStockId, setCurrentStockId] = useState(selectedStock.id);
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [customAudit, setCustomAudit] = useState<AuditResult | null>(null);

  if (!isOpen) return null;

  const currentStock = allStocks.find((s) => s.id === currentStockId) || selectedStock;
  const predicted = currentStock.predictedAmount || currentStock.prediction.target1D;
  const actual = currentStock.price;
  const diff = actual - predicted;
  const diffPct = Math.round(((diff / (predicted || 1)) * 100) * 100) / 100;
  const isMatched = Math.abs(diffPct) <= 2.0;

  const defaultAudit: AuditResult = {
    isMatched,
    predictedTarget: predicted,
    actualClose: actual,
    differencePercent: diffPct,
    verdict: isMatched ? t.targetMatched : t.targetDeviation,
    summary: isMatched
      ? `Closing price of ${currentStock.currency}${actual.toFixed(2)} accurately achieved the pre-market predicted target of ${currentStock.currency}${predicted.toFixed(2)} (within ${Math.abs(diffPct)}% variance).`
      : `Closing price of ${currentStock.currency}${actual.toFixed(2)} diverged by ${diffPct > 0 ? '+' : ''}${diffPct}% from the locked pre-market target of ${currentStock.currency}${predicted.toFixed(2)}.`,
    rootCauses: {
      globalDependencies:
        currentStock.postMarketExplanation?.globalCues ||
        (currentStock.sector === 'Technology'
          ? 'Intraday fluctuation in Nasdaq-100 (+0.4%) and US 10-Yr Treasury Yield (4.02%) bounded multiple expansion.'
          : currentStock.sector === 'Banking & Fin'
          ? 'RBI liquidity surplus and expected repo rate easing stabilized systemic credit margins.'
          : 'Global dollar index (DXY 102.65) and Brent crude ($77.40) guided balanced international flows.'),
      previousDaySpillover:
        currentStock.postMarketExplanation?.previousDay ||
        'Previous session 20-EMA support held securely on the daily chart with solid delivery volume.',
      promoterAndInstitutional:
        currentStock.postMarketExplanation?.promoterAndInstitutional ||
        'Domestic Institutional Investors (DIIs) provided strong net cash accumulation with zero promoter pledge overhang.',
      companyFundamentals:
        currentStock.postMarketExplanation?.companyFundamentals ||
        `P/E ratio of ${currentStock.pe.toFixed(1)} and strong balance sheet health provided immediate value-buying support.`,
      astrologicalTimingDelay:
        currentStock.postMarketExplanation?.astroTransit ||
        `Ruling planet ${currentStock.astroProfile.rulingPlanet} in angular house provided structural downside resilience during market hours.`
    }
  };

  const activeAudit = customAudit || defaultAudit;

  const handleRunAiAudit = async () => {
    setIsRunningAudit(true);
    try {
      const res = await fetch('/api/post-market-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: currentStock.symbol,
          name: currentStock.name,
          predictedTarget: predicted,
          actualClose: actual,
          currency: currentStock.currency,
          sector: currentStock.sector,
          rulingPlanet: currentStock.astroProfile.rulingPlanet,
          pe: currentStock.pe
        })
      });

      if (res.ok) {
        const data = await res.json();
        setCustomAudit(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunningAudit(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-purple-950 border border-purple-800/60 text-purple-400">
              <Target className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Post-Market Close Prediction Accuracy Audit
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 font-bold">
                  Session: 08-10-2026
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  Target Verification
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Compare predicted values against actual close and analyze why targets matched or deviated
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

        {/* Stock Selector & Run AI Trigger */}
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Audited Stock:</span>
            <select
              value={currentStockId}
              onChange={(e) => {
                setCurrentStockId(e.target.value);
                setCustomAudit(null);
                const s = allStocks.find((st) => st.id === e.target.value);
                if (s) onSelectStock(s);
              }}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {allStocks.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.symbol} — {st.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleRunAiAudit}
            disabled={isRunningAudit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRunningAudit ? 'animate-spin' : ''}`} />
            <span>{isRunningAudit ? 'Auditing...' : 'Run Gemini AI Discrepancy Audit'}</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Top Comparison Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Predicted Target */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
              <div className="text-[10px] uppercase font-semibold text-slate-400">
                Predicted Target
              </div>
              <div className="text-xl font-mono font-bold text-cyan-400">
                {currentStock.currency}{activeAudit.predictedTarget.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500">
                Astro-Quant Model Horizon
              </div>
            </div>

            {/* Actual Closing Price */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
              <div className="text-[10px] uppercase font-semibold text-slate-400">
                Actual Closing Price
              </div>
              <div className="text-xl font-mono font-bold text-slate-100">
                {currentStock.currency}{activeAudit.actualClose.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500">
                Official Session Close
              </div>
            </div>

            {/* Matched / Variance Status */}
            <div
              className={`border rounded-xl p-3.5 space-y-1 ${
                activeAudit.isMatched
                  ? 'bg-emerald-950/30 border-emerald-600/50 text-emerald-300'
                  : 'bg-amber-950/30 border-amber-600/50 text-amber-300'
              }`}
            >
              <div className="text-[10px] uppercase font-semibold flex items-center justify-between">
                <span>Verification Verdict</span>
                {activeAudit.isMatched ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <div className="text-sm font-bold truncate">
                {activeAudit.verdict}
              </div>
              <div className="text-[10px] font-mono">
                Variance: {activeAudit.differencePercent > 0 ? '+' : ''}
                {activeAudit.differencePercent}%
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 leading-relaxed">
            <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block mb-1">
              Audit Executive Summary:
            </span>
            {activeAudit.summary}
          </div>

          {/* 5-Factor Root Cause Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-200 uppercase text-[11px] tracking-wider">
                {t.whyNotMatched}
              </span>
              <span>Root Cause Analysis</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* 1. Global Dependencies */}
              <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Globe2 className="w-4 h-4" />
                  <span>1. {t.globalCues}</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {activeAudit.rootCauses.globalDependencies}
                </p>
              </div>

              {/* 2. Previous Day Spillover */}
              <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-400 font-bold">
                  <History className="w-4 h-4" />
                  <span>2. {t.previousDay}</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {activeAudit.rootCauses.previousDaySpillover}
                </p>
              </div>

              {/* 3. Promoter Buying & Institutional Flows */}
              <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <TrendingUp className="w-4 h-4" />
                  <span>3. {t.promoterBuying}</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {activeAudit.rootCauses.promoterAndInstitutional}
                </p>
              </div>

              {/* 4. Company Fundamentals */}
              <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Building className="w-4 h-4" />
                  <span>4. {t.fundamentalsReason}</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {activeAudit.rootCauses.companyFundamentals}
                </p>
              </div>

              {/* 5. Astrological Timing & Planetary Delay */}
              <div className="bg-slate-950/70 border border-amber-900/40 p-3.5 rounded-xl space-y-1.5 md:col-span-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>5. {t.astroReason}</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {activeAudit.rootCauses.astrologicalTimingDelay}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
