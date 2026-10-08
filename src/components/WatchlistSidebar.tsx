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
  marketSessionStatus
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
    <div className="flex flex-col h-full bg-slate-950/85 border-r border-slate-800/80 w-full lg:w-84 xl:w-96 shrink-0 backdrop-blur-md">
      {/* Header bar */}
      <div className="p-3.5 border-b border-slate-800/80 space-y-3">
        {/* Watchlist switcher dropdown & manage button */}
        <div className="flex items-center justify-between gap-2">
          {watchlists.length > 0 && onSelectWatchlist ? (
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <select
                value={activeWatchlistId}
                onChange={(e) => onSelectWatchlist(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-bold text-slate-100 focus:outline-none focus:border-indigo-500 cursor-pointer truncate flex-1"
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
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h2 className="text-sm font-bold text-slate-100 tracking-wide">
                {t.watchlist}
              </h2>
            </div>
          )}

          <div className="flex items-center gap-1 shrink-0">
            {onOpenWatchlistManager && (
              <button
                onClick={onOpenWatchlistManager}
                className="p-1 text-slate-400 hover:text-slate-100 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                title="Manage Watchlists (Add/Remove)"
              >
                <Settings2 className="w-3.5 h-3.5" />
              </button>
            )}

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-[11px] bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
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
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.filterWatchlist}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
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
            className="w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-cyan-600/20 via-indigo-600/20 to-purple-600/20 hover:from-cyan-600/30 hover:to-indigo-600/30 border border-cyan-500/40 text-cyan-200 text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
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
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedSector === sector
                    ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                <span>{getSectorLabel(sector)}</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-black/30 font-mono text-slate-300">
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
                className={`w-full text-left p-3 transition-all flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-950/45 border-l-4 border-cyan-400 shadow-inner'
                    : 'hover:bg-slate-900/70 border-l-4 border-transparent'
                }`}
              >
                {/* Left: Symbol, Company & Sector */}
                <div className="space-y-1 min-w-0 pr-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {stock.symbol}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                      {stock.exchange}
                    </span>
                    {/* Ruling Planet badge */}
                    <span
                      className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950/30 border border-amber-900/40 text-amber-300 font-mono"
                      title={`Ruling Planet: ${stock.astroProfile.rulingPlanet}`}
                    >
                      {getPlanetSymbol(stock.astroProfile.rulingPlanet)} {stock.astroProfile.rulingPlanet}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 truncate max-w-[170px]">
                    {stock.name}
                  </div>

                  {/* Sector & Signal */}
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-slate-400 font-medium">{stock.sector}</span>
                    <span className="text-slate-600">•</span>
                    <span
                      className={`font-semibold ${
                        stock.technicals.signal.includes('BUY')
                          ? 'text-emerald-400'
                          : stock.technicals.signal.includes('SELL')
                          ? 'text-rose-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {stock.technicals.signal}
                    </span>
                  </div>
                </div>

                {/* Right: Live Price, Daily Change, and PROMINENT PREDICTED VALUE */}
                <div className="text-right shrink-0 space-y-1">
                  {/* Current Live Price */}
                  <div className="font-mono font-black text-sm text-slate-100">
                    {stock.currency}{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>

                  {/* Day Change */}
                  <div
                    className={`inline-flex items-center font-mono text-[11px] font-bold px-1.5 py-0.2 rounded ${
                      isPositive
                        ? 'text-emerald-300 bg-emerald-950/40 border border-emerald-800/40'
                        : 'text-rose-300 bg-rose-950/40 border border-rose-800/40'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                    )}
                    {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </div>

                  {/* Prominent PREDICTED VALUE Badge (Locked Pre-market target) */}
                  <div className="flex items-center justify-end gap-1">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/50 text-cyan-200 font-mono text-[11px] font-black shadow-xs">
                      <Target className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                      <span>{t.predShort}: {stock.currency}{predPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
                    </span>
                  </div>

                  {/* Post-Market Match Result (Shows if market closed or in audit mode) */}
                  {marketSessionStatus === 'CLOSED' ? (
                    <div className="pt-0.5">
                      {isMatched ? (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold font-mono px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/60">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                          <span>Matched</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold font-mono px-1.5 py-0.2 rounded bg-rose-950/80 text-rose-300 border border-rose-700/60">
                          <AlertTriangle className="w-2.5 h-2.5 text-rose-400" />
                          <span>Missed ({predDiffPct > 0 ? '+' : ''}{predDiffPct}%)</span>
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="text-[10px] text-amber-400/90 font-mono">
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
