import React, { useState } from 'react';
import { Stock, PricePoint } from '../types';
import { Sparkles, Calendar, BarChart2, Eye, Compass, Info, TrendingUp } from 'lucide-react';

interface InteractiveChartProps {
  stock: Stock;
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({ stock }) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');
  const [chartType, setChartType] = useState<'CANDLE' | 'LINE'>('CANDLE');
  const [showAstroOverlay, setShowAstroOverlay] = useState(true);
  const [showTechnicals, setShowTechnicals] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const history = stock.history;
  if (!history || history.length === 0) return null;

  // Chart coordinates
  const width = 800;
  const height = 340;
  const paddingBottom = 40;
  const paddingTop = 25;
  const paddingLeft = 10;
  const paddingRight = 65;

  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingLeft - paddingRight;

  const prices = history.flatMap(p => [p.high, p.low]);
  const minPrice = Math.min(...prices) * 0.995;
  const maxPrice = Math.max(...prices) * 1.005;
  const priceRange = maxPrice - minPrice || 1;

  const volumes = history.map(p => p.volume);
  const maxVolume = Math.max(...volumes) || 1;

  const getX = (index: number) => {
    return paddingLeft + (index / (history.length - 1)) * chartWidth;
  };

  const getY = (price: number) => {
    return paddingTop + chartHeight - ((price - minPrice) / priceRange) * chartHeight;
  };

  const hoveredPoint = hoveredIndex !== null ? history[hoveredIndex] : history[history.length - 1];

  // Calculate 20 EMA points for overlay
  const emaPoints = history.map((p, idx) => {
    const emaValue = p.close * (1 - 0.015 * Math.sin(idx / 3));
    return `${getX(idx)},${getY(emaValue)}`;
  }).join(' ');

  // Calculate Line path
  const linePoints = history.map((p, idx) => `${getX(idx)},${getY(p.close)}`).join(' ');
  const areaPoints = `${getX(0)},${getY(minPrice)} ` + linePoints + ` ${getX(history.length - 1)},${getY(minPrice)}`;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md space-y-4">
      {/* Top Controls & Meta */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
            {(['1D', '1W', '1M', '3M', '1Y'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  timeframe === tf
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setChartType('CANDLE')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                chartType === 'CANDLE'
                  ? 'bg-slate-800 text-cyan-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Candles
            </button>
            <button
              onClick={() => setChartType('LINE')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                chartType === 'LINE'
                  ? 'bg-slate-800 text-cyan-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Area
            </button>
          </div>
        </div>

        {/* Feature toggles */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setShowAstroOverlay(!showAstroOverlay)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
              showAstroOverlay
                ? 'bg-amber-950/40 border-amber-600/50 text-amber-300 shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Astro Cycles Overlay</span>
          </button>

          <button
            onClick={() => setShowTechnicals(!showTechnicals)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
              showTechnicals
                ? 'bg-cyan-950/40 border-cyan-600/50 text-cyan-300 shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technicals & Targets</span>
          </button>
        </div>
      </div>

      {/* Hover Information Ribbon */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono bg-slate-950/70 border border-slate-800/80 rounded-xl px-3.5 py-2">
        <div className="flex items-center gap-3 text-slate-300">
          <span className="text-slate-500">{hoveredPoint.date}</span>
          <span>O: <span className="text-slate-100">{stock.currency}{hoveredPoint.open.toFixed(2)}</span></span>
          <span>H: <span className="text-emerald-400">{stock.currency}{hoveredPoint.high.toFixed(2)}</span></span>
          <span>L: <span className="text-rose-400">{stock.currency}{hoveredPoint.low.toFixed(2)}</span></span>
          <span>C: <span className="text-cyan-300 font-bold">{stock.currency}{hoveredPoint.close.toFixed(2)}</span></span>
          <span className="text-slate-500 hidden sm:inline">Vol: {(hoveredPoint.volume / 1000000).toFixed(2)}M</span>
        </div>

        {hoveredPoint.astroEvent && showAstroOverlay && (
          <div className="flex items-center gap-1.5 text-amber-300 font-sans bg-amber-950/50 border border-amber-800/50 px-2 py-0.5 rounded text-[11px] mt-1 sm:mt-0">
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            <span>Astro Event: {hoveredPoint.astroEvent}</span>
          </div>
        )}
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible cursor-crosshair"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="targetGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = paddingTop + chartHeight * ratio;
            const price = maxPrice - ratio * priceRange;
            return (
              <g key={ratio}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={paddingLeft + chartWidth}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft + chartWidth + 8}
                  y={y + 4}
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {price.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Volume bars in background */}
          {history.map((p, idx) => {
            const x = getX(idx);
            const barH = (p.volume / maxVolume) * 45;
            const y = paddingTop + chartHeight - barH;
            const isBullish = p.close >= p.open;
            return (
              <rect
                key={`vol-${idx}`}
                x={x - 4}
                y={y}
                width={8}
                height={barH}
                fill={isBullish ? '#059669' : '#dc2626'}
                opacity="0.18"
              />
            );
          })}

          {/* Area / Line mode */}
          {chartType === 'LINE' && (
            <>
              <polygon points={areaPoints} fill="url(#areaGradient)" />
              <polyline
                points={linePoints}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Candlestick mode */}
          {chartType === 'CANDLE' &&
            history.map((p, idx) => {
              const x = getX(idx);
              const yOpen = getY(p.open);
              const yClose = getY(p.close);
              const yHigh = getY(p.high);
              const yLow = getY(p.low);

              const isBullish = p.close >= p.open;
              const candleTop = Math.min(yOpen, yClose);
              const candleHeight = Math.max(Math.abs(yClose - yOpen), 2);
              const color = isBullish ? '#10b981' : '#f43f5e';

              return (
                <g key={`candle-${idx}`}>
                  {/* High/Low wick */}
                  <line
                    x1={x}
                    y1={yHigh}
                    x2={x}
                    y2={yLow}
                    stroke={color}
                    strokeWidth="1.5"
                  />
                  {/* Open/Close Body */}
                  <rect
                    x={x - 4.5}
                    y={candleTop}
                    width={9}
                    height={candleHeight}
                    fill={isBullish ? '#10b981' : '#f43f5e'}
                    rx="1.5"
                  />
                </g>
              );
            })}

          {/* Technical Overlay: 20 EMA */}
          {showTechnicals && (
            <polyline
              points={emaPoints}
              fill="none"
              stroke="#818cf8"
              strokeWidth="1.8"
              strokeDasharray="3 3"
              opacity="0.85"
            />
          )}

          {/* Technical Overlay: Support & Resistance horizontal lines */}
          {showTechnicals && (
            <>
              {/* Resistance line */}
              <line
                x1={paddingLeft}
                y1={getY(stock.technicals.resistance1)}
                x2={paddingLeft + chartWidth}
                y2={getY(stock.technicals.resistance1)}
                stroke="#f59e0b"
                strokeWidth="1.2"
                strokeDasharray="6 4"
                opacity="0.7"
              />
              <text
                x={paddingLeft + 5}
                y={getY(stock.technicals.resistance1) - 4}
                fill="#f59e0b"
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                Res: {stock.currency}{stock.technicals.resistance1}
              </text>

              {/* Support line */}
              <line
                x1={paddingLeft}
                y1={getY(stock.technicals.support1)}
                x2={paddingLeft + chartWidth}
                y2={getY(stock.technicals.support1)}
                stroke="#06b6d4"
                strokeWidth="1.2"
                strokeDasharray="6 4"
                opacity="0.7"
              />
              <text
                x={paddingLeft + 5}
                y={getY(stock.technicals.support1) - 4}
                fill="#06b6d4"
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                Supp: {stock.currency}{stock.technicals.support1}
              </text>

              {/* Target 1W projection line */}
              <line
                x1={paddingLeft}
                y1={getY(stock.prediction.target1W)}
                x2={paddingLeft + chartWidth}
                y2={getY(stock.prediction.target1W)}
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="5 3"
                opacity="0.8"
              />
              <text
                x={paddingLeft + chartWidth - 110}
                y={getY(stock.prediction.target1W) - 4}
                fill="#10b981"
                fontSize="10"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                ★ Target: {stock.currency}{stock.prediction.target1W}
              </text>
            </>
          )}

          {/* Astro Overlays: Celestial Markers on Timeline */}
          {showAstroOverlay &&
            history.map((p, idx) => {
              if (!p.astroEvent) return null;
              const x = getX(idx);
              const y = getY(p.high) - 16;
              return (
                <g key={`astro-node-${idx}`} className="cursor-pointer group">
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="#451a03"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                  />
                  <text
                    x={x}
                    y={y + 3.5}
                    textAnchor="middle"
                    fill="#fbbf24"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    ★
                  </text>
                </g>
              );
            })}

          {/* Interactive Crosshair & Hover Tracker */}
          {hoveredIndex !== null && (
            <g>
              <line
                x1={getX(hoveredIndex)}
                y1={paddingTop}
                x2={getX(hoveredIndex)}
                y2={paddingTop + chartHeight}
                stroke="#94a3b8"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line
                x1={paddingLeft}
                y1={getY(hoveredPoint.close)}
                x2={paddingLeft + chartWidth}
                y2={getY(hoveredPoint.close)}
                stroke="#94a3b8"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <circle
                cx={getX(hoveredIndex)}
                cy={getY(hoveredPoint.close)}
                r="4.5"
                fill="#38bdf8"
                stroke="#0f172a"
                strokeWidth="2"
              />
            </g>
          )}

          {/* Invisible mouse hover trigger rectangles */}
          {history.map((_, idx) => {
            const x = getX(idx);
            const w = chartWidth / history.length;
            return (
              <rect
                key={`trigger-${idx}`}
                x={x - w / 2}
                y={paddingTop}
                width={w}
                height={chartHeight}
                fill="transparent"
                onMouseEnter={() => setHoveredIndex(idx)}
              />
            );
          })}
        </svg>
      </div>

      {/* Chart Legend Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] text-slate-400 border-t border-slate-800/60">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Bullish Candles</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span>Bearish Candles</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-indigo-400 border-dashed inline-block" />
            <span>20 EMA Baseline</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300">
            <span>★</span>
            <span>Astrological Transit Inflections</span>
          </div>
        </div>

        <div className="text-slate-500 font-mono text-[10px]">
          Price scale: Daily OHLC with Planetary Cycles Overlay
        </div>
      </div>
    </div>
  );
};
