import React from 'react';
import { Stock, PriceAlert } from '../types';
import { exportWatchlistToCSV, exportWatchlistToJSON, exportAlertsToCSV, exportAlertsToJSON } from '../utils/exportUtils';
import { X, Download, FileSpreadsheet, FileJson, Shield, CheckCircle2 } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  stocks: Stock[];
  alerts: PriceAlert[];
  watchlistName: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  stocks,
  alerts,
  watchlistName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-cyan-950 border border-cyan-800/60 text-cyan-400">
              <Download className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Export & Local Backup
              </h2>
              <p className="text-xs text-slate-400">
                Download your current watchlist and custom alerts to CSV or JSON
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

        {/* Export Options Body */}
        <div className="p-5 space-y-4">
          {/* Watchlist Export Card */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-200">
                  Current Watchlist: {watchlistName}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {stocks.length} equities • Prices, Targets & Astro Profiles
                </div>
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-300">
                {stocks.length} Items
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => exportWatchlistToCSV(stocks, watchlistName)}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all hover:border-cyan-500 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={() => exportWatchlistToJSON(stocks, watchlistName)}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all hover:border-cyan-500 cursor-pointer"
              >
                <FileJson className="w-4 h-4 text-cyan-400" />
                <span>Export JSON</span>
              </button>
            </div>
          </div>

          {/* Alerts Export Card */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-200">
                  Active Price & Prediction Alerts
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {alerts.length} alerts configured • Triggers & Memos
                </div>
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-300">
                {alerts.length} Alerts
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => exportAlertsToCSV(alerts)}
                disabled={alerts.length === 0}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all hover:border-amber-500 disabled:opacity-40 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Alerts CSV</span>
              </button>

              <button
                onClick={() => exportAlertsToJSON(alerts)}
                disabled={alerts.length === 0}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all hover:border-amber-500 disabled:opacity-40 cursor-pointer"
              >
                <FileJson className="w-4 h-4 text-cyan-400" />
                <span>Alerts JSON</span>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Files download directly to your local device. No personal data leaves your browser.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
