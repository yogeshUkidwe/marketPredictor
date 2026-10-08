import React, { useState } from 'react';
import { Stock, PriceAlert, AlertType } from '../types';
import { Bell, BellRing, X, Plus, Trash2, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, Target } from 'lucide-react';

interface AlertsManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStock: Stock;
  stocks: Stock[];
  alerts: PriceAlert[];
  onCreateAlert: (newAlert: Omit<PriceAlert, 'id' | 'isTriggered' | 'createdAt'>) => void;
  onToggleAlert: (alertId: string) => void;
  onDeleteAlert: (alertId: string) => void;
  onClearTriggered: () => void;
  browserNotificationsEnabled: boolean;
  onRequestBrowserPermission: () => void;
}

export const AlertsManagerModal: React.FC<AlertsManagerModalProps> = ({
  isOpen,
  onClose,
  selectedStock,
  stocks,
  alerts,
  onCreateAlert,
  onToggleAlert,
  onDeleteAlert,
  onClearTriggered,
  browserNotificationsEnabled,
  onRequestBrowserPermission
}) => {
  const [targetStockId, setTargetStockId] = useState(selectedStock.id);
  const [alertType, setAlertType] = useState<AlertType>('PRICE_ABOVE');
  const [targetValue, setTargetValue] = useState<string>(
    (selectedStock.price * 1.05).toFixed(2)
  );
  const [note, setNote] = useState('');
  const [tab, setTab] = useState<'CREATE' | 'ACTIVE' | 'TRIGGERED'>('CREATE');

  if (!isOpen) return null;

  const currentTargetStock = stocks.find((s) => s.id === targetStockId) || selectedStock;

  const handleStockChange = (id: string) => {
    setTargetStockId(id);
    const s = stocks.find((st) => st.id === id);
    if (s) {
      if (alertType === 'PRICE_ABOVE') {
        setTargetValue((s.price * 1.05).toFixed(2));
      } else if (alertType === 'PRICE_BELOW') {
        setTargetValue((s.price * 0.95).toFixed(2));
      }
    }
  };

  const handleTypeChange = (type: AlertType) => {
    setAlertType(type);
    if (type === 'PRICE_ABOVE') {
      setTargetValue((currentTargetStock.price * 1.05).toFixed(2));
    } else if (type === 'PRICE_BELOW') {
      setTargetValue((currentTargetStock.price * 0.95).toFixed(2));
    } else if (type === 'PCT_CHANGE_UP') {
      setTargetValue('3.0');
    } else if (type === 'PCT_CHANGE_DOWN') {
      setTargetValue('-3.0');
    } else if (type === 'TARGET_REACHED') {
      setTargetValue(currentTargetStock.prediction.target1W.toFixed(2));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateAlert({
      stockId: currentTargetStock.id,
      symbol: currentTargetStock.symbol,
      name: currentTargetStock.name,
      type: alertType,
      targetValue: Number(targetValue) || undefined,
      currentPrice: currentTargetStock.price,
      isActive: true,
      note: note.trim() || undefined
    });
    setNote('');
    setTab('ACTIVE');
  };

  const activeAlerts = alerts.filter((a) => !a.isTriggered);
  const triggeredAlerts = alerts.filter((a) => a.isTriggered);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-950 border border-amber-800/60 text-amber-400">
              <BellRing className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Custom Alerts & Notification System
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {alerts.length} Total
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Set real-time triggers for price breakthroughs, % spikes, and AI prediction bias flips
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

        {/* Browser Notifications Request Banner */}
        {!browserNotificationsEnabled && (
          <div className="bg-indigo-950/40 border-b border-indigo-900/60 px-4 py-2.5 flex items-center justify-between text-xs text-indigo-200">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Enable desktop notifications to receive instant alert chimes when prices trigger</span>
            </div>
            <button
              onClick={onRequestBrowserPermission}
              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold shrink-0 cursor-pointer"
            >
              Enable Notifications
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/40 px-4 text-xs font-medium">
          <button
            onClick={() => setTab('CREATE')}
            className={`py-3 px-3 border-b-2 transition-all ${
              tab === 'CREATE'
                ? 'border-indigo-500 text-indigo-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            + New Alert
          </button>
          <button
            onClick={() => setTab('ACTIVE')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              tab === 'ACTIVE'
                ? 'border-indigo-500 text-indigo-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Active Alerts</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.2 rounded font-mono">
              {activeAlerts.length}
            </span>
          </button>
          <button
            onClick={() => setTab('TRIGGERED')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              tab === 'TRIGGERED'
                ? 'border-indigo-500 text-indigo-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Triggered Log</span>
            <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800/60 px-1.5 py-0.2 rounded font-mono">
              {triggeredAlerts.length}
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {tab === 'CREATE' && (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
              {/* Select Stock */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Select Stock from Watchlist
                </label>
                <select
                  value={targetStockId}
                  onChange={(e) => handleStockChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  {stocks.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.symbol} — {st.name} ({st.currency}{st.price.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Trigger Condition */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Alert Condition
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('PRICE_ABOVE')}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      alertType === 'PRICE_ABOVE'
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ▲ Price Rises Above
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('PRICE_BELOW')}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      alertType === 'PRICE_BELOW'
                        ? 'bg-rose-950/60 border-rose-500 text-rose-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ▼ Price Falls Below
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('PCT_CHANGE_UP')}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      alertType === 'PCT_CHANGE_UP'
                        ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    📈 Daily Gain &gt;= %
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('PREDICTION_BIAS_CHANGE')}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      alertType === 'PREDICTION_BIAS_CHANGE'
                        ? 'bg-amber-950/60 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ★ Prediction Bias Flips
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('TARGET_REACHED')}
                    className={`col-span-2 p-2 rounded-lg border text-left transition-all ${
                      alertType === 'TARGET_REACHED'
                        ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🎯 1-Week Target Reached ({currentTargetStock.currency}{currentTargetStock.prediction.target1W.toFixed(2)})
                  </button>
                </div>
              </div>

              {/* Target Value Input */}
              {alertType !== 'PREDICTION_BIAS_CHANGE' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-semibold text-slate-300">
                      {alertType.includes('PCT') ? 'Percentage Threshold (%)' : `Target Price (${currentTargetStock.currency})`}
                    </label>
                    <span className="text-slate-500 font-mono">
                      Current: {currentTargetStock.currency}{currentTargetStock.price.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    value={targetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              {/* Note / Memo */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Custom Alert Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Breakout above resistance, Jupiter transit peak"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-indigo-950 cursor-pointer"
              >
                Create Alert Trigger
              </button>
            </form>
          )}

          {tab === 'ACTIVE' && (
            <div className="space-y-3">
              {activeAlerts.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No active alerts. Use the "+ New Alert" tab to create your first price or prediction alert.
                </div>
              ) : (
                activeAlerts.map((alt) => (
                  <div
                    key={alt.id}
                    className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-100">
                          {alt.symbol}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40 font-semibold">
                          {alt.type.replace(/_/g, ' ')}
                        </span>
                        {alt.targetValue && (
                          <span className="text-xs font-mono font-bold text-emerald-400">
                            {alt.targetValue}
                          </span>
                        )}
                      </div>
                      {alt.note && (
                        <div className="text-[11px] text-slate-400">
                          {alt.note}
                        </div>
                      )}
                      <div className="text-[10px] text-slate-500 font-mono">
                        Created: {alt.createdAt}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleAlert(alt.id)}
                        className={`text-[10px] px-2.5 py-1 rounded font-semibold transition-all ${
                          alt.isActive
                            ? 'bg-emerald-950/60 border border-emerald-800/60 text-emerald-300'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {alt.isActive ? 'Active' : 'Paused'}
                      </button>

                      <button
                        onClick={() => onDeleteAlert(alt.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {tab === 'TRIGGERED' && (
            <div className="space-y-3">
              {triggeredAlerts.length > 0 && (
                <div className="flex justify-end pb-2">
                  <button
                    onClick={onClearTriggered}
                    className="text-xs text-slate-400 hover:text-rose-400"
                  >
                    Clear Triggered Log
                  </button>
                </div>
              )}

              {triggeredAlerts.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No alerts have been triggered yet. When a stock hits your alert price during the live market feed, it will record here and sound an alert!
                </div>
              ) : (
                triggeredAlerts.map((alt) => (
                  <div
                    key={alt.id}
                    className="bg-amber-950/20 border border-amber-900/50 rounded-xl p-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold text-xs text-slate-100">
                          {alt.symbol} Triggered!
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/50">
                          {alt.type.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 font-mono">
                        Target: {alt.targetValue} • Triggered at: {alt.triggeredAt}
                      </div>
                      {alt.note && (
                        <div className="text-[11px] text-slate-400 italic">
                          "{alt.note}"
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onDeleteAlert(alt.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
