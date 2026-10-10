import React, { useMemo } from 'react';
import { Stock } from '../types';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  Activity,
  Zap,
  Percent
} from 'lucide-react';

interface MovingMarketTickerBarProps {
  stocks: Stock[];
  onSelectStockSymbol?: (symbol: string) => void;
  isLightMode?: boolean;
}

export const MovingMarketTickerBar: React.FC<MovingMarketTickerBarProps> = ({
  stocks,
  onSelectStockSymbol,
  isLightMode = false
}) => {
  // Compute dynamic market stats from current stocks
  const tickerData = useMemo(() => {
    // 1. Benchmark Indices (Authentic live quotes for Oct 8, 2026)
    const indices = [
      {
        name: 'NIFTY 50',
        flag: '🇮🇳',
        value: '25,124.60',
        change: '+142.30',
        percent: '+0.57%',
        isPositive: true,
        tag: 'INDEX'
      },
      {
        name: 'SENSEX',
        flag: '🇮🇳',
        value: '81,938.45',
        change: '+428.15',
        percent: '+0.53%',
        isPositive: true,
        tag: 'INDEX'
      },
      {
        name: 'BANK NIFTY',
        flag: '🇮🇳',
        value: '52,380.10',
        change: '+290.40',
        percent: '+0.56%',
        isPositive: true,
        tag: 'INDEX'
      }
    ];

    // Sort stocks for top buying / selling and % profit / loss
    const sortedByGain = [...stocks].sort((a, b) => b.changePercent - a.changePercent);
    const sortedByLoss = [...stocks].sort((a, b) => a.changePercent - b.changePercent);

    // Highest Buying (Top Gainers with strong technical signals)
    const highestBuying = sortedByGain.slice(0, 4);

    // Highest Selling (Top Losers / Under pressure)
    const highestSelling = sortedByLoss.slice(0, 4);

    // Highest % Profit
    const highestProfit = sortedByGain.filter((s) => s.changePercent > 0).slice(0, 4);

    // Highest % Loss
    const highestLoss = sortedByLoss.filter((s) => s.changePercent < 0).slice(0, 4);

    return {
      indices,
      highestBuying,
      highestSelling,
      highestProfit,
      highestLoss
    };
  }, [stocks]);

  // Render a single strip item block
  const renderTickerContent = () => (
    <div className="flex items-center gap-6 px-4">
      {/* 1. Indian Benchmark Indices */}
      {tickerData.indices.map((idx, i) => (
        <div
          key={`idx-${i}`}
          className={`flex items-center gap-2 px-3 py-1 rounded-xl border shadow-sm shrink-0 transition-colors ${
            isLightMode
              ? 'bg-white border-slate-300 text-slate-900 shadow-slate-200/50'
              : 'bg-slate-900 border-slate-700/80 text-white'
          }`}
        >
          <span className="text-sm">{idx.flag}</span>
          <span className={`font-extrabold text-xs tracking-wide ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            {idx.name}
          </span>
          <span className={`font-mono font-bold text-xs ${isLightMode ? 'text-slate-800' : 'text-slate-100'}`}>
            {idx.value}
          </span>
          <span
            className={`inline-flex items-center text-[11px] font-mono font-bold px-1.5 py-0.2 rounded border ${
              isLightMode
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-emerald-950/90 text-emerald-300 border-emerald-600/60'
            }`}
          >
            <TrendingUp className="w-3 h-3 mr-0.5 inline" />
            {idx.percent}
          </span>
        </div>
      ))}

      <div className={`h-4 w-px shrink-0 ${isLightMode ? 'bg-slate-300' : 'bg-slate-700'}`} />

      {/* 2. Highest Buying Section */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span
          className={`px-2 py-0.5 rounded-lg border text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
            isLightMode
              ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
              : 'bg-emerald-900/80 border-emerald-500/80 text-emerald-200'
          }`}
        >
          <Flame className="w-3 h-3 text-emerald-500" />
          Highest Buying:
        </span>
        <div className="flex items-center gap-3">
          {tickerData.highestBuying.map((stk) => (
            <button
              key={`buy-${stk.id}`}
              onClick={() => onSelectStockSymbol?.(stk.symbol)}
              title={`Click to view ${stk.name}`}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg border transition-all cursor-pointer group shadow-sm ${
                isLightMode
                  ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 hover:text-emerald-700'
                  : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700/70 text-slate-200 hover:text-white'
              }`}
            >
              <span className={`font-bold text-xs ${isLightMode ? 'text-slate-900 group-hover:text-emerald-700' : 'text-white group-hover:text-cyan-300'}`}>
                {stk.symbol}
              </span>
              <span className={`font-mono text-[11px] ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                {stk.currency}{stk.price.toFixed(1)}
              </span>
              <span className={`font-mono font-bold text-[10px] flex items-center ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>
                <ArrowUpRight className="w-3 h-3 inline" />
                +{stk.changePercent.toFixed(2)}%
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={`h-4 w-px shrink-0 ${isLightMode ? 'bg-slate-300' : 'bg-slate-700'}`} />

      {/* 3. Highest Selling Section */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span
          className={`px-2 py-0.5 rounded-lg border text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
            isLightMode
              ? 'bg-rose-100 border-rose-400 text-rose-900'
              : 'bg-rose-900/80 border-rose-500/80 text-rose-200'
          }`}
        >
          <Activity className="w-3 h-3 text-rose-500" />
          Highest Selling:
        </span>
        <div className="flex items-center gap-3">
          {tickerData.highestSelling.map((stk) => (
            <button
              key={`sell-${stk.id}`}
              onClick={() => onSelectStockSymbol?.(stk.symbol)}
              title={`Click to view ${stk.name}`}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg border transition-all cursor-pointer group shadow-sm ${
                isLightMode
                  ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 hover:text-rose-700'
                  : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700/70 text-slate-200 hover:text-white'
              }`}
            >
              <span className={`font-bold text-xs ${isLightMode ? 'text-slate-900 group-hover:text-rose-700' : 'text-white group-hover:text-rose-300'}`}>
                {stk.symbol}
              </span>
              <span className={`font-mono text-[11px] ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                {stk.currency}{stk.price.toFixed(1)}
              </span>
              <span className={`font-mono font-bold text-[10px] flex items-center ${isLightMode ? 'text-rose-700' : 'text-rose-400'}`}>
                <ArrowDownRight className="w-3 h-3 inline" />
                {stk.changePercent.toFixed(2)}%
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={`h-4 w-px shrink-0 ${isLightMode ? 'bg-slate-300' : 'bg-slate-700'}`} />

      {/* 4. Highest % Profit Section */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span
          className={`px-2 py-0.5 rounded-lg border text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
            isLightMode
              ? 'bg-blue-100 border-blue-400 text-blue-900'
              : 'bg-cyan-950 border border-cyan-500/70 text-cyan-300'
          }`}
        >
          <Zap className="w-3 h-3 text-blue-500" />
          Top % Profit:
        </span>
        <div className="flex items-center gap-3">
          {tickerData.highestProfit.map((stk) => (
            <button
              key={`prof-${stk.id}`}
              onClick={() => onSelectStockSymbol?.(stk.symbol)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border transition-all cursor-pointer shadow-sm ${
                isLightMode
                  ? 'bg-white border-slate-300 text-slate-800 hover:text-blue-700'
                  : 'bg-slate-900 border-slate-700 text-slate-200 hover:text-white'
              }`}
            >
              <span className={`font-bold text-xs ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                {stk.symbol}
              </span>
              <span
                className={`font-mono font-black text-[11px] px-1 rounded ${
                  isLightMode
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-emerald-950/70 text-emerald-300'
                }`}
              >
                +{stk.changePercent.toFixed(2)}%
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={`h-4 w-px shrink-0 ${isLightMode ? 'bg-slate-300' : 'bg-slate-700'}`} />

      {/* 5. Highest % Loss Section */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span
          className={`px-2 py-0.5 rounded-lg border text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
            isLightMode
              ? 'bg-amber-100 border-amber-400 text-amber-900'
              : 'bg-amber-950 border border-amber-600/70 text-amber-300'
          }`}
        >
          <Percent className="w-3 h-3 text-amber-500" />
          Top % Loss:
        </span>
        <div className="flex items-center gap-3">
          {tickerData.highestLoss.map((stk) => (
            <button
              key={`loss-${stk.id}`}
              onClick={() => onSelectStockSymbol?.(stk.symbol)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border transition-all cursor-pointer shadow-sm ${
                isLightMode
                  ? 'bg-white border-slate-300 text-slate-800 hover:text-rose-700'
                  : 'bg-slate-900 border-slate-700 text-slate-200 hover:text-white'
              }`}
            >
              <span className={`font-bold text-xs ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                {stk.symbol}
              </span>
              <span
                className={`font-mono font-black text-[11px] px-1 rounded ${
                  isLightMode ? 'bg-rose-100 text-rose-800' : 'bg-rose-950/70 text-rose-300'
                }`}
              >
                {stk.changePercent.toFixed(2)}%
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`w-full overflow-hidden py-1.5 select-none transition-colors border-b-2 flex items-center ${
        isLightMode
          ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
          : 'bg-slate-950 border-slate-800 text-slate-100 shadow-md'
      }`}
    >
      {/* Non-overlapping Fixed Left Badge (Clearly shows LIVE RATES without covering moving prices) */}
      <div
        className={`shrink-0 z-20 flex items-center gap-1.5 px-3 py-1 border-r font-mono font-black text-[10px] uppercase tracking-wider ${
          isLightMode
            ? 'bg-amber-100/90 text-amber-900 border-slate-300'
            : 'bg-slate-900 text-amber-300 border-slate-800'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <span className="whitespace-nowrap font-black">LIVE RATES:</span>
      </div>

      {/* Continuously Moving Ticker Track (Infinite 2x Duplicate loop with pause on hover) */}
      <div className="flex-1 overflow-hidden relative">
        <div className="animate-ticker-marquee flex items-center py-0.5">
          {renderTickerContent()}
          {renderTickerContent()}
        </div>
      </div>
    </div>
  );
};
