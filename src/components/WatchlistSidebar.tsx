import React, { useState, useMemo } from 'react';
import { Stock, Sector, WatchlistGroup } from '../types';
import { Search, Sparkles, TrendingUp, TrendingDown, Star, Settings2, Target, CheckCircle2, AlertTriangle } from 'lucide-react';
import { TranslationDictionary } from '../utils/translations';

interface WatchlistSidebarProps {
  stocks: Stock[];
  selectedStock: Stock;
  onSelectStock: (stock: Stock) => void;
  marketFilter: 'ALL' | 'NSE' | 'GLOBAL';
  watchlists?: WatchlistGroup[];
  activeWatchlistId?: string;
  onSelectWatchlist?: (id: string) => void;
  onOpenWatchlistManager?: () => void;
  onOpenSearch?: () => void;
  t: TranslationDictionary;
  marketSessionStatus: 'OPEN' | 'CLOSED';
  isLightMode?: boolean;
}

const SECTOR_TAGS: (Sector | 'ALL')[] = [
  'ALL',
  'Technology',
  'Banking & Fin',
  'Energy & Oil',
  'Automobile',
  'Metals & Mining',
  'Pharma & Health',
  'FMCG & Consumer',
  'Infrastructure',
  'Telecom',
  'Aerospace & Defense'
];

export const WatchlistSidebar: React.FC<WatchlistSidebarProps> = ({
  stocks,
  selectedStock,
  onSelectStock,
  marketFilter,
  watchlists = [],
  activeWatchlistId,
  onSelectWatchlist,
  onOpenWatchlistManager,
  onOpenSearch,
  t,
  marketSessionStatus,
  isLightMode = false
}) => {
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState<Sector | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'ASTRO' | 'GAINERS' | 'LOSERS' | 'PREDICTED' | 'NAME'>('ASTRO');

  const activeWatchlist = watchlists.find((w) => w.id === activeWatchlistId);

  const getSectorLabel = (sector: Sector | 'ALL') => {
    switch (sector) {
      case 'ALL': return t.allSectors;
      case 'Technology': return t.sectorTech;
      case 'Banking & Fin': return t.sectorBanking;
      case 'Energy & Oil': return t.sectorEnergy;
      case 'Automobile': return t.sectorAuto;
      case 'Metals & Mining': return t.sectorMetals;
      case 'Pharma & Health': return t.sectorPharma;
      case 'FMCG & Consumer': return t.sectorFmcg;
      case 'Infrastructure': return t.sectorInfra;
      case 'Telecom': return t.sectorTelecom;
      case 'Aerospace & Defense': return t.sectorDefense;
      default: return sector;
    }
  };

  const filteredStocks = useMemo(() => {
    return stocks
      .filter((s) => {
        // Active custom watchlist filter (if not default All)
        if (activeWatchlist && !activeWatchlist.isDefault) {
          if (!activeWatchlist.stockIds.includes(s.id)) return false;
        }

        // Market region filter
        if (marketFilter === 'NSE' && s.exchange !== 'NSE' && s.exchange !== 'BSE') return false;
        if (marketFilter === 'GLOBAL' && (s.exchange === 'NSE' || s.exchange === 'BSE')) return false;

        // Sector filter
        if (selectedSector !== 'ALL' && s.sector !== selectedSector) return false;

        // Search text
        if (search.trim()) {
          const q = search.toLowerCase();
          return (
            s.symbol.toLowerCase().includes(q) ||
            s.name.toLowerCase().includes(q) ||
            s.sector.toLowerCase().includes(q) ||
            s.astroProfile.rulingPlanet.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'ASTRO') {
          return b.astroProfile.astroScore - a.astroProfile.astroScore;
        }
        if (sortBy === 'GAINERS') {
          return b.changePercent - a.changePercent;
        }
        if (sortBy === 'LOSERS') {
          return a.changePercent - b.changePercent;
        }
        if (sortBy === 'PREDICTED') {
          const upsideA = ((a.predictedAmount || a.prediction.target1D) - a.price) / a.price;
          const upsideB = ((b.predictedAmount || b.prediction.target1D) - b.price) / b.price;
          return upsideB - upsideA;
        }
        return a.symbol.localeCompare(b.symbol);
      });
  }, [stocks, activeWatchlist, marketFilter, selectedSector, search, sortBy]);

  const getPlanetSymbol = (planet: string) => {
    switch (planet) {
      case 'Sun': return '☀️';
      case 'Moon': return '🌙';
      case 'Mars': return '♂';
      case 'Mercury': return '☿';
      case 'Jupiter': return '♃';
      case 'Venus': return '♀';
      case 'Saturn': return '♄';
      case 'Rahu': return '☊';
      case 'Ketu': return '☋';
      default: return '🪐';
    }
  };

  return (
    <div
      className={`flex flex-col h-full border-r w-full lg:w-84 xl:w-96 shrink-0 backdrop-blur-md transition-colors ${
        isLightMode
          ? 'bg-white/95 border-slate-300 text-slate-900 shadow-sm'
          : 'bg-slate-950/85 border-slate-800/80 text-white'
      }`}
    >
      {/* Header bar */}
      <div className={`p-3.5 border-b space-y-3 ${isLightMode ? 'border-slate-200' : 'border-slate-800/80'}`}>
        {/* Watchlist switcher dropdown & manage button */}
        <div className="flex items-center justify-between gap-2">
          {watchlists.length > 0 && onSelectWatchlist ? (
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
              <select
                value={activeWatchlistId}
                onChange={(e) => onSelectWatchlist(e.target.value)}
                className={`border rounded px-2 py-1 text-xs font-bold focus:outline-none cursor-pointer truncate flex-1 ${
                  isLightMode
                    ? 'bg-slate-100 border-slate-300 text-slate-900 focus:border-blue-500'
                    : 'bg-slate-900 border-slate-800 text-slate-100 focus:border-indigo-500'
                }`}
              >
                {watchlists.map((wl) => (
                  <option key={wl.id} value={wl.id}>
                    {wl.name} ({wl.stockIds.length})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h2 className={`text-sm font-bold tracking-wide ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>
                {t.watchlist}
              </h2>
            </div>
          )}

          <div className="flex items-center gap-1 shrink-0">
            {onOpenWatchlistManager && (
              <button
                onClick={onOpenWatchlistManager}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  isLightMode ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                }`}
                title="Manage Watchlists (Add/Remove)"
              >
                <Settings2 className="w-3.5 h-3.5" />
              </button>
            )}

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={`text-[11px] border rounded px-2 py-1 focus:outline-none cursor-pointer ${
                isLightMode
                  ? 'bg-slate-100 border-slate-300 text-slate-800 focus:border-blue-500'
                  : 'bg-slate-900 border-slate-800 text-slate-300 focus:border-indigo-500'
              }`}
            >
              <option value="ASTRO">★ {t.sortAstro}</option>
              <option value="PREDICTED">🎯 {t.sortPredicted}</option>
              <option value="GAINERS">▲ {t.sortGainers}</option>
              <option value="LOSERS">▼ {t.sortLosers}</option>
              <option value="NAME">A-Z</option>
            </select>
          </div>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.filterWatchlist}
            className={`w-full pl-8 pr-3 py-1.5 border rounded-lg text-xs focus:outline-none ${
              isLightMode
                ? 'bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-blue-500'
                : 'bg-slate-900/90 border-slate-800 text-slate-200 placeholder:text-slate-500 focus:border-indigo-500'
            }`}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs cursor-pointer"
            >
              ×
            </button>
          )}
        </div>

        {onOpenSearch && (
          <button
            onClick={onOpenSearch}
            className={`w-full py-1.5 px-3 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer border ${
              isLightMode
                ? 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-300'
                : 'bg-gradient-to-r from-cyan-600/20 via-indigo-600/20 to-purple-600/20 hover:from-cyan-600/30 hover:to-indigo-600/30 border-cyan-500/40 text-cyan-200'
            }`}
          >
            <Search className={`w-3.5 h-3.5 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`} />
            <span>+ Search / Add Any Indian Stock (NSE/BSE)</span>
          </button>
        )}

        {/* Sector Filter Chips with Predicted Upside Counts */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {SECTOR_TAGS.map((sector) => {
            const count = sector === 'ALL'
              ? stocks.length
              : stocks.filter((s) => s.sector === sector).length;
            return (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                  selectedSector === sector
                    ? isLightMode
                      ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                      : 'bg-indigo-600 text-white border-indigo-500 shadow-sm ring-1 ring-indigo-400'
                    : isLightMode
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border-slate-800/80'
                }`}
              >
                <span>{getSectorLabel(sector)}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${isLightMode ? 'bg-black/10 text-slate-900' : 'bg-black/30 text-slate-300'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stock list with Prominent Predicted Value for Every Stock */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50">
        {filteredStocks.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs space-y-2">
            <p>No stocks found matching "{search}".</p>
            {activeWatchlist && !activeWatchlist.isDefault && onOpenWatchlistManager && (
              <button
                onClick={onOpenWatchlistManager}
                className="text-xs text-indigo-400 hover:underline cursor-pointer"
              >
                + Add stocks to this watchlist
              </button>
            )}
          </div>
        ) : (
          filteredStocks.map((stock) => {
            const isSelected = selectedStock.id === stock.id;
            const isPositive = stock.changePercent >= 0;
            const predPrice = stock.predictedAmount || stock.prediction.target1D;
            const predDiff = predPrice - stock.price;
            const predDiffPct = Math.round(((predDiff / stock.price) * 100) * 10) / 10;
            const isMatched = Math.abs((stock.price - predPrice) / predPrice) <= 0.02;

            return (
              <button
                key={stock.id}
                onClick={() => onSelectStock(stock)}
                className={`w-full text-left p-3.5 transition-all flex items-center justify-between group cursor-pointer border-b ${
                  isLightMode
                    ? isSelected
                      ? 'bg-blue-50/90 border-l-4 border-l-blue-600 border-b-slate-200 ring-1 ring-blue-300 shadow-sm'
                      : 'hover:bg-slate-100/70 border-l-4 border-l-transparent border-b-slate-200'
                    : isSelected
                    ? 'bg-slate-900 border-l-4 border-l-cyan-400 border-b-slate-800/80 ring-1 ring-cyan-500/30 shadow-md'
                    : 'hover:bg-slate-900/90 border-l-4 border-l-transparent border-b-slate-800/80'
                }`}
              >
                {/* Left: Symbol, Company & Sector */}
                <div className="space-y-1.5 min-w-0 pr-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-black text-base transition-colors ${
                      isLightMode ? 'text-slate-950 group-hover:text-blue-600' : 'text-white group-hover:text-cyan-300'
                    }`}>
                      {stock.symbol}
                    </span>
                    {/* Non-Clickable Read-Only Informational Tag: EXCHANGE */}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono font-bold select-text cursor-default ${
                      isLightMode ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-slate-950 border-slate-700 text-slate-300'
                    }`}>
                      {stock.exchange}
                    </span>
                    {/* Non-Clickable Read-Only Informational Tag: PLANET */}
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded border font-bold select-text cursor-default ${
                        isLightMode ? 'bg-amber-100 border-amber-400 text-amber-900' : 'bg-amber-950/70 border-amber-600/70 text-amber-200'
                      }`}
                      title={`Astrological Ruling Planet: ${stock.astroProfile.rulingPlanet}`}
                    >
                      {getPlanetSymbol(stock.astroProfile.rulingPlanet)} {stock.astroProfile.rulingPlanet}
                    </span>
                  </div>

                  <div className={`text-xs font-medium truncate max-w-[200px] ${
                    isLightMode ? 'text-slate-700' : 'text-slate-200'
                  }`}>
                    {stock.name}
                  </div>

                  {/* Sector & Signal (High Contrast) */}
                  <div className="flex items-center gap-2 text-[11px] font-semibold">
                    <span className={isLightMode ? 'text-indigo-700 font-bold' : 'text-indigo-300'}>{stock.sector}</span>
                    <span className={isLightMode ? 'text-slate-400' : 'text-slate-600'}>•</span>
                    <span
                      className={`px-1.5 py-0.2 rounded font-mono ${
                        stock.technicals.signal.includes('BUY')
                          ? isLightMode
                            ? 'text-emerald-800 bg-emerald-100 border border-emerald-400 font-bold'
                            : 'text-emerald-300 bg-emerald-950/80 border border-emerald-600/60 font-bold'
                          : stock.technicals.signal.includes('SELL')
                          ? isLightMode
                            ? 'text-rose-800 bg-rose-100 border border-rose-400 font-bold'
                            : 'text-rose-300 bg-rose-950/80 border border-rose-600/60 font-bold'
                          : isLightMode
                          ? 'text-amber-800 bg-amber-100 border border-amber-400 font-bold'
                          : 'text-amber-300 bg-amber-950/80 border border-amber-600/60 font-bold'
                      }`}
                    >
                      {stock.technicals.signal}
                    </span>
                  </div>
                </div>

                {/* Right: Live Price, Daily Change, and High-Contrast Target */}
                <div className="text-right shrink-0 space-y-1.5">
                  {/* Current Live Price (Large High Contrast) */}
                  <div className={`font-mono font-black text-base ${isLightMode ? 'text-slate-950' : 'text-white'}`}>
                    {stock.currency}{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>

                  {/* Day Change */}
                  <div>
                    <span
                      className={`inline-flex items-center font-mono text-xs font-extrabold px-2 py-0.5 rounded border ${
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
                        <TrendingUp className={`w-3.5 h-3.5 mr-1 inline ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`} />
                      ) : (
                        <TrendingDown className={`w-3.5 h-3.5 mr-1 inline ${isLightMode ? 'text-rose-700' : 'text-rose-400'}`} />
                      )}
                      {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </span>
                  </div>

                  {/* High Contrast PREDICTED VALUE Badge */}
                  <div className="flex items-center justify-end">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border-2 font-mono text-xs font-black shadow-sm ${
                      isLightMode
                        ? 'bg-amber-100 border-amber-400 text-amber-950'
                        : 'bg-amber-950/90 border-2 border-amber-400 text-amber-200'
                    }`}>
                      <Target className={`w-3 h-3 shrink-0 ${isLightMode ? 'text-amber-700' : 'text-amber-400'}`} />
                      <span>Target: {stock.currency}{predPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
                    </span>
                  </div>

                  {/* Post-Market Match Result or Astro % */}
                  {marketSessionStatus === 'CLOSED' ? (
                    <div className="pt-0.5">
                      {isMatched ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-200 border border-emerald-500">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Matched</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-200 border border-rose-500">
                          <AlertTriangle className="w-3 h-3 text-rose-400" />
                          <span>Diff ({predDiffPct > 0 ? '+' : ''}{predDiffPct}%)</span>
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="text-[11px] text-amber-300 font-mono font-bold">
                      <span>★ Astro {stock.astroProfile.astroScore}%</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
