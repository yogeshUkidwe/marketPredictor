import React, { useState } from 'react';
import { Stock } from '../types';
import {
  TrendingUp,
  TrendingDown,
  Star,
  Bot,
  Target,
  ShieldCheck,
  Sparkles,
  BellRing,
  Info,
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';
import { TranslationDictionary } from '../utils/translations';

interface SimpleStockViewProps {
  stock: Stock;
  allStocks: Stock[];
  onSelectStock: (stock: Stock) => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (stock: Stock) => void;
  onOpenChat: (customPrompt?: string) => void;
  onOpenAlerts: () => void;
  t: TranslationDictionary;
  marketSessionStatus: 'OPEN' | 'CLOSED';
  isLightMode?: boolean;
}

export const SimpleStockView: React.FC<SimpleStockViewProps> = ({
  stock,
  allStocks,
  onSelectStock,
  isInWatchlist,
  onToggleWatchlist,
  onOpenChat,
  onOpenAlerts,
  marketSessionStatus,
  isLightMode = false
}) => {
  const [selectedHorizon, setSelectedHorizon] = useState<'1D' | '1W' | '1M'>('1D');

  const isPositive = stock.changePercent >= 0;
  const currentPrice = stock.price;

  // Determine target based on selected horizon
  const targetPrice =
    selectedHorizon === '1D'
      ? stock.predictedAmount || stock.prediction.target1D
      : selectedHorizon === '1W'
      ? stock.prediction.target1W
      : stock.prediction.target1M;

  const targetDifference = Math.round((targetPrice - currentPrice) * 100) / 100;
  const targetPercent = Math.round(((targetDifference / currentPrice) * 100) * 100) / 100;
  const isTargetUpside = targetDifference >= 0;

  // Popular benchmark stocks for quick 1-click switching
  const quickSwitchSymbols = ['TCS', 'RELIANCE', 'HDFCBANK', 'INFY', 'TATAMOTORS', 'BHARTIARTL', 'SUZLON', 'ZOMATO', 'BEL'];
  const quickStocks = allStocks.filter((s) => quickSwitchSymbols.includes(s.symbol)).slice(0, 8);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Visual Accessibility Notice & Non-clickable Legend */}
      <div
        className={`border-2 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-lg transition-colors ${
          isLightMode
            ? 'bg-white border-slate-300 text-slate-800'
            : 'bg-slate-900/90 border-slate-700/80 text-white'
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`p-1.5 rounded-lg border ${
              isLightMode
                ? 'bg-blue-100 border-blue-400 text-blue-800'
                : 'bg-cyan-950 border-cyan-600/70 text-cyan-300'
            }`}
          >
            <Info className="w-4 h-4" />
          </span>
          <span className={`font-bold text-xs sm:text-sm ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>
            High-Contrast Simple View (Optimized for all age groups & clear readability)
          </span>
        </div>

        {/* Legend clearly explaining Clickable vs Non-Clickable */}
        <div className="flex items-center gap-3 text-[11px] font-medium flex-wrap">
          <span className={isLightMode ? 'text-slate-600 font-bold' : 'text-slate-300'}>Legend:</span>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-white font-bold shadow-sm ${
              isLightMode ? 'bg-blue-600' : 'bg-cyan-600'
            }`}
          >
            <span>Clickable Button</span>
          </span>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border font-mono select-text cursor-default ${
              isLightMode
                ? 'bg-slate-100 border-slate-300 text-slate-700'
                : 'bg-slate-950 border-slate-600 text-slate-300'
            }`}
          >
            <span>ℹ️ Informational Label (Non-Clickable)</span>
          </span>
        </div>
      </div>

      {/* 1-Click Quick Stock Switcher Pills (Clearly Clickable Buttons!) */}
      <div
        className={`border-2 rounded-2xl p-4 shadow-xl transition-colors ${
          isLightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700/80 text-white'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className={`text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-1.5 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            <span className={`w-2 h-2 rounded-full ${isLightMode ? 'bg-blue-600' : 'bg-cyan-400'}`} />
            Quick Switch Stock (Click any stock below):
          </span>
          <span className={`text-[11px] font-bold ${isLightMode ? 'text-blue-700' : 'text-cyan-300'}`}>
            {allStocks.length} Stocks Tracked
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {quickStocks.map((s) => {
            const isSelected = s.symbol === stock.symbol;
            const up = s.changePercent >= 0;

            return (
              <button
                key={s.id}
                onClick={() => onSelectStock(s)}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap border-2 font-bold text-xs sm:text-sm ${
                  isSelected
                    ? isLightMode
                      ? 'bg-blue-600 text-white border-blue-400 shadow-lg scale-105 ring-2 ring-blue-300'
                      : 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-lg scale-105 ring-2 ring-cyan-400/40'
                    : isLightMode
                    ? 'bg-slate-100 text-slate-900 hover:bg-slate-200 border-slate-300 hover:border-blue-500'
                    : 'bg-slate-950 text-white hover:bg-slate-800 border-slate-700 hover:border-cyan-400'
                }`}
                title={`Click to view ${s.name}`}
              >
                <span className="font-extrabold">{s.symbol}</span>
                <span className={`font-mono text-xs ${isSelected ? (isLightMode ? 'text-white' : 'text-slate-900') : isLightMode ? 'text-slate-600' : 'text-slate-200'}`}>
                  {s.currency}{s.price.toFixed(1)}
                </span>
                <span className={`text-[11px] font-mono ${isSelected ? (isLightMode ? 'text-white' : 'text-slate-950') : up ? (isLightMode ? 'text-emerald-700 font-bold' : 'text-emerald-400') : isLightMode ? 'text-rose-700 font-bold' : 'text-rose-400'}`}>
                  {up ? '▲' : '▼'}{Math.abs(s.changePercent).toFixed(1)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN HERO CARD: Large, High-Contrast Stock Overview */}
      <div
        className={`border-2 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden transition-colors ${
          isLightMode
            ? 'bg-white border-slate-300 text-slate-900'
            : 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-slate-600 text-white'
        }`}
      >
        {/* Subtle accent glow */}
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${isLightMode ? 'bg-amber-300/10' : 'bg-cyan-500/10'}`} />

        {/* Top Header: Identity & Informational Tags */}
        <div className={`flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b-2 ${isLightMode ? 'border-slate-200' : 'border-slate-700/80'}`}>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${isLightMode ? 'text-slate-950' : 'text-white'}`}>
                {stock.symbol}
              </h1>

              {/* Informational Read-Only Label: EXCHANGE */}
              <span
                className={`px-2.5 py-1 rounded-md border text-xs font-mono font-bold select-text cursor-default ${
                  isLightMode ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-slate-950 border-slate-600 text-slate-200'
                }`}
                title="Informational Label: Stock Exchange"
              >
                EXCHANGE: {stock.exchange}
              </span>

              {/* Informational Read-Only Label: SECTOR */}
              <span
                className={`px-2.5 py-1 rounded-md border text-xs font-bold select-text cursor-default ${
                  isLightMode ? 'bg-indigo-100 border-indigo-300 text-indigo-900' : 'bg-indigo-950/90 border-indigo-500/60 text-indigo-200'
                }`}
                title="Informational Label: Company Sector"
              >
                SECTOR: {stock.sector}
              </span>

              {/* Informational Read-Only Label: SESSION DATE */}
              <span
                className={`px-2.5 py-1 rounded-md border text-xs font-mono font-bold select-text cursor-default ${
                  isLightMode ? 'bg-blue-100 border-blue-300 text-blue-900' : 'bg-slate-950 border-cyan-600/70 text-cyan-300'
                }`}
                title="Informational Label: Live Session Date"
              >
                DATE: 08-10-2026
              </span>
            </div>

            <div className={`text-base sm:text-lg font-bold mt-1 ${isLightMode ? 'text-slate-700' : 'text-slate-200'}`}>
              {stock.name}
            </div>

            {/* Read-Only Fundamentals Bar */}
            <div className={`flex items-center gap-4 text-xs sm:text-sm mt-2 font-mono flex-wrap ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
              <span className={`px-2 py-0.5 rounded border ${isLightMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'}`}>
                P/E Ratio: <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>{stock.pe.toFixed(1)}</strong>
              </span>
              <span className={`px-2 py-0.5 rounded border ${isLightMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'}`}>
                Market Cap: <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>{stock.marketCap}</strong>
              </span>
              <span className={`px-2 py-0.5 rounded border ${isLightMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'}`}>
                Volume: <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>{stock.volume}</strong>
              </span>
            </div>
          </div>

          {/* Interactive Top Actions: Big Prominent Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Clickable Button: Watchlist Toggle */}
            <button
              onClick={() => onToggleWatchlist(stock)}
              className={`px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md border-2 ${
                isInWatchlist
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-400/30 font-black'
                  : isLightMode
                  ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-400 hover:border-amber-500'
                  : 'bg-slate-950 hover:bg-slate-800 text-amber-300 border-amber-500/80 hover:border-amber-400'
              }`}
            >
              <Star className={`w-4 h-4 ${isInWatchlist ? 'fill-slate-950' : 'fill-amber-500'}`} />
              <span>{isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}</span>
            </button>

            {/* Clickable Button: Set Alert */}
            <button
              onClick={onOpenAlerts}
              className={`px-3.5 py-2.5 rounded-xl border-2 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                isLightMode
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-700 hover:border-cyan-400'
              }`}
            >
              <BellRing className={`w-4 h-4 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`} />
              <span>Set Alert</span>
            </button>

            {/* Clickable Button: Ask AI Bot */}
            <button
              onClick={() => onOpenChat(`Tell me about ${stock.name} (${stock.symbol}) and its predicted target for today`)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-[1.02] border border-blue-400/40"
            >
              <Bot className="w-4 h-4 text-white" />
              <span>Ask AI Market Expert</span>
            </button>
          </div>
        </div>

        {/* Center: Live Price & Day Change */}
        <div className={`py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 ${isLightMode ? 'border-slate-200' : 'border-slate-700/80'}`}>
          <div>
            <span className={`text-xs uppercase font-bold tracking-wider block mb-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              CURRENT LIVE PRICE (AUTHENTIC 2026 QUOTE)
            </span>
            <div className="flex items-baseline gap-4 flex-wrap">
              <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${isLightMode ? 'text-slate-950' : 'text-white'}`}>
                {stock.currency}{currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>

              {/* Day Change Pill */}
              <div
                className={`inline-flex items-center font-mono text-sm sm:text-base font-extrabold px-3 py-1.5 rounded-xl border-2 ${
                  isPositive
                    ? isLightMode
                      ? 'text-emerald-900 bg-emerald-100 border-emerald-400'
                      : 'text-emerald-200 bg-emerald-950/90 border-emerald-500'
                    : isLightMode
                    ? 'text-rose-900 bg-rose-100 border-rose-400'
                    : 'text-rose-200 bg-rose-950/90 border-rose-500'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 mr-1 text-emerald-600 inline" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1 text-rose-600 inline" />
                )}
                <span>
                  {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%) Today
                </span>
              </div>
            </div>
          </div>

          {/* Ruling Star Indicator (Read-Only Informational Tag) */}
          <div
            className={`p-3.5 rounded-2xl border-2 max-w-sm ${
              isLightMode ? 'bg-amber-50/80 border-amber-400 text-amber-950' : 'bg-slate-950 border-amber-600/60 text-amber-200'
            }`}
          >
            <div className={`flex items-center gap-2 text-xs font-bold mb-1 ${isLightMode ? 'text-amber-900' : 'text-amber-300'}`}>
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Vedic Planetary Ruler: {stock.astroProfile.rulingPlanet}</span>
            </div>
            <p className={`text-xs leading-snug ${isLightMode ? 'text-slate-700' : 'text-slate-200'}`}>
              Today's planetary hora aligns with NSE trading hours, creating favorable liquidity absorption.
            </p>
          </div>
        </div>

        {/* HIGH-CONTRAST PREDICTED TARGET BANNER */}
        <div
          className={`mt-6 border-2 rounded-2xl p-5 sm:p-6 shadow-2xl transition-colors ${
            isLightMode
              ? 'bg-gradient-to-r from-amber-50 via-white to-blue-50 border-amber-400 text-slate-900'
              : 'bg-gradient-to-r from-amber-950/60 via-slate-950 to-indigo-950/60 border-amber-400/80 text-white'
          }`}
        >
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b ${isLightMode ? 'border-amber-200' : 'border-amber-600/40'}`}>
            <div className="flex items-center gap-2">
              <span className={`p-2 rounded-xl border ${isLightMode ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-amber-500/20 text-amber-300 border-amber-400'}`}>
                <Target className="w-5 h-5 text-amber-600" />
              </span>
              <div>
                <h3 className={`text-base sm:text-lg font-black flex items-center gap-2 ${isLightMode ? 'text-slate-950' : 'text-white'}`}>
                  <span>08-10-2026 PREDICTED PRICE TARGET</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-extrabold uppercase font-mono">
                    CALIBRATED
                  </span>
                </h3>
                <p className={`text-xs ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                  Target calculated through algorithmic Gann cycle & astronomical momentum
                </p>
              </div>
            </div>

            {/* Timeframe horizon toggle (Clearly Clickable Buttons!) */}
            <div className={`flex items-center border-2 rounded-xl p-1 text-xs font-bold ${isLightMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-700'}`}>
              <button
                onClick={() => setSelectedHorizon('1D')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                  selectedHorizon === '1D'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : isLightMode
                    ? 'text-slate-700 hover:text-slate-900'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Intraday (1-Day)
              </button>
              <button
                onClick={() => setSelectedHorizon('1W')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                  selectedHorizon === '1W'
                    ? isLightMode
                      ? 'bg-blue-600 text-white shadow-md font-black'
                      : 'bg-indigo-600 text-white shadow-md font-black'
                    : isLightMode
                    ? 'text-slate-700 hover:text-slate-900'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                1-Week Swing
              </button>
              <button
                onClick={() => setSelectedHorizon('1M')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                  selectedHorizon === '1M'
                    ? 'bg-purple-600 text-white shadow-md font-black'
                    : isLightMode
                    ? 'text-slate-700 hover:text-slate-900'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                1-Month
              </button>
            </div>
          </div>

          {/* Central Target Display & Plain English Verdict */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1: Target Price */}
            <div
              className={`p-4 rounded-xl border-2 ${
                isLightMode ? 'bg-amber-50/80 border-amber-400 text-amber-950' : 'bg-slate-950 border-amber-500/70 text-amber-300'
              }`}
            >
              <span className={`text-xs font-black uppercase tracking-wider block ${isLightMode ? 'text-amber-900' : 'text-amber-300'}`}>
                Target Objective ({selectedHorizon})
              </span>
              <div className={`text-3xl font-black font-mono mt-1 ${isLightMode ? 'text-amber-950' : 'text-amber-300'}`}>
                {stock.currency}{targetPrice.toFixed(2)}
              </div>
              <div className={`text-xs font-bold mt-1 flex items-center gap-1 font-mono ${isLightMode ? 'text-emerald-800' : 'text-emerald-300'}`}>
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>
                  Expected Move: {isTargetUpside ? '+' : ''}{stock.currency}{targetDifference.toFixed(2)} ({isTargetUpside ? '+' : ''}{targetPercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            {/* Box 2: Protective Stop Loss */}
            <div
              className={`p-4 rounded-xl border-2 ${
                isLightMode ? 'bg-rose-50/80 border-rose-400 text-rose-950' : 'bg-slate-950 border-rose-500/70 text-rose-300'
              }`}
            >
              <span className={`text-xs font-black uppercase tracking-wider block flex items-center gap-1 ${isLightMode ? 'text-rose-900' : 'text-rose-300'}`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                Capital Safety Floor (Stop Loss)
              </span>
              <div className={`text-3xl font-black font-mono mt-1 ${isLightMode ? 'text-rose-950' : 'text-rose-300'}`}>
                {stock.currency}{stock.prediction.stopLoss.toFixed(2)}
              </div>
              <div className={`text-xs font-semibold mt-1 ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                Protective safety stop to strictly protect your investment.
              </div>
            </div>

            {/* Box 3: Plain-English Recommendation for All Ages */}
            <div
              className={`p-4 rounded-xl border-2 ${
                isLightMode ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950' : 'bg-slate-950 border-emerald-500/70 text-emerald-300'
              }`}
            >
              <span className={`text-xs font-black uppercase tracking-wider block flex items-center gap-1 ${isLightMode ? 'text-emerald-900' : 'text-emerald-300'}`}>
                <CheckCircle className="w-3.5 h-3.5" />
                Simple Action Recommendation
              </span>
              <div className={`text-xl font-black mt-1 ${isLightMode ? 'text-slate-950' : 'text-white'}`}>
                {stock.prediction.overallBias.includes('BULLISH') ? 'ACCUMULATE / BUY ZONE' : 'HOLD & OBSERVE'}
              </div>
              <p className={`text-xs mt-1 leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-200'}`}>
                {stock.prediction.overallBias.includes('BULLISH')
                  ? `High probability of upward move toward ${stock.currency}${targetPrice.toFixed(2)}. Favorable risk-to-reward ratio.`
                  : 'Wait patiently for the next planetary consolidation before fresh entry.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
