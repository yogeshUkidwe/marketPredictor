import React, { useState } from 'react';
import { Stock, WatchlistGroup } from '../types';
import { X, Plus, Trash2, Edit2, Check, Star, FolderPlus, ListFilter, Search } from 'lucide-react';

interface WatchlistManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  watchlists: WatchlistGroup[];
  activeWatchlistId: string;
  onSelectWatchlist: (id: string) => void;
  onCreateWatchlist: (name: string, description: string) => void;
  onDeleteWatchlist: (id: string) => void;
  onRenameWatchlist: (id: string, newName: string) => void;
  onToggleStockInWatchlist: (watchlistId: string, stockId: string) => void;
  allStocks: Stock[];
}

export const WatchlistManagerModal: React.FC<WatchlistManagerModalProps> = ({
  isOpen,
  onClose,
  watchlists,
  activeWatchlistId,
  onSelectWatchlist,
  onCreateWatchlist,
  onDeleteWatchlist,
  onRenameWatchlist,
  onToggleStockInWatchlist,
  allStocks
}) => {
  const [newListName, setNewListName] = useState('');
  const [newListDesc, setNewListDesc] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [stockSearch, setStockSearch] = useState('');

  if (!isOpen) return null;

  const currentList = watchlists.find((w) => w.id === activeWatchlistId) || watchlists[0];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    onCreateWatchlist(newListName.trim(), newListDesc.trim());
    setNewListName('');
    setNewListDesc('');
    setIsCreating(false);
  };

  const handleSaveRename = (id: string) => {
    if (editName.trim()) {
      onRenameWatchlist(id, editName.trim());
    }
    setEditingId(null);
  };

  const filteredStocks = allStocks.filter(
    (s) =>
      s.symbol.toLowerCase().includes(stockSearch.toLowerCase()) ||
      s.name.toLowerCase().includes(stockSearch.toLowerCase()) ||
      s.sector.toLowerCase().includes(stockSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-950 border border-indigo-800/60 text-indigo-400">
              <Star className="w-5 h-5 fill-indigo-400/20" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Manage Stock Watchlists
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {watchlists.length} Watchlists
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Create custom stock portfolios, track specific sectors, and organize your market views
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

        {/* Body Layout: Left Watchlist Tabs, Right Stock Selection */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {/* Left: Watchlist List & Creation */}
          <div className="w-full md:w-72 bg-slate-950/40 p-4 space-y-4 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                My Watchlists
              </span>
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New</span>
              </button>
            </div>

            {/* Create Watchlist Form */}
            {isCreating && (
              <form onSubmit={handleCreate} className="bg-slate-900 border border-indigo-700/50 p-3 rounded-xl space-y-2">
                <input
                  type="text"
                  placeholder="Watchlist name (e.g. High Growth AI)"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  autoFocus
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={newListDesc}
                  onChange={(e) => setNewListDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-[11px] text-slate-300 placeholder:text-slate-600 focus:outline-none"
                />
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-2 py-1 text-xs text-slate-400 hover:text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-2.5 py-1 text-xs bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium"
                  >
                    Create
                  </button>
                </div>
              </form>
            )}

            {/* List of Watchlists */}
            <div className="space-y-1.5 flex-1 overflow-y-auto">
              {watchlists.map((wl) => {
                const isActive = wl.id === activeWatchlistId;
                const isEditing = editingId === wl.id;

                return (
                  <div
                    key={wl.id}
                    className={`group p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-indigo-950/40 border-indigo-600/60 shadow-sm'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    {isEditing ? (
                      <div className="flex items-center gap-1.5 w-full">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100 focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveRename(wl.id)}
                          className="p-1 text-emerald-400 hover:text-emerald-300"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onSelectWatchlist(wl.id)}
                        className="text-left flex-1 min-w-0 pr-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-200 truncate">
                            {wl.name}
                          </span>
                          {wl.isDefault && (
                            <span className="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {wl.stockIds.length} {wl.stockIds.length === 1 ? 'stock' : 'stocks'}
                        </div>
                      </button>
                    )}

                    {!isEditing && (
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!wl.isDefault && (
                          <>
                            <button
                              onClick={() => {
                                setEditingId(wl.id);
                                setEditName(wl.name);
                              }}
                              className="p-1 text-slate-400 hover:text-slate-200 rounded"
                              title="Rename"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => onDeleteWatchlist(wl.id)}
                              className="p-1 text-slate-400 hover:text-rose-400 rounded"
                              title="Delete Watchlist"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Stocks in Selected Watchlist */}
          <div className="flex-1 p-4 flex flex-col overflow-hidden space-y-3 bg-slate-900/60">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  {currentList.name}
                </h3>
                <p className="text-xs text-slate-400">
                  {currentList.description || 'Manage stocks included in this watchlist'}
                </p>
              </div>

              <div className="relative w-48 sm:w-60">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter stocks..."
                  value={stockSearch}
                  onChange={(e) => setStockSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Stock list with inclusion toggles */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 pr-1">
              {filteredStocks.map((stock) => {
                const isIncluded = currentList.stockIds.includes(stock.id);

                return (
                  <div
                    key={stock.id}
                    className="py-2.5 flex items-center justify-between hover:bg-slate-800/30 px-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-100">
                            {stock.symbol}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                            {stock.exchange}
                          </span>
                          <span className="text-[11px] text-amber-400 font-mono">
                            ★ {stock.astroProfile.rulingPlanet}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-xs">
                          {stock.name} • {stock.sector}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right font-mono text-xs">
                        <div className="font-bold text-slate-200">
                          {stock.currency}{stock.price.toFixed(2)}
                        </div>
                        <div className={stock.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </div>
                      </div>

                      {/* Toggle button */}
                      <button
                        onClick={() => onToggleStockInWatchlist(currentList.id, stock.id)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                          isIncluded
                            ? 'bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        }`}
                      >
                        {isIncluded ? 'Remove' : '+ Add'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
