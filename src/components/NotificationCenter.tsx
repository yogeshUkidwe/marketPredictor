import React, { useState, useRef, useEffect } from 'react';
import { AppNotification } from '../types';
import { Bell, BellRing, Check, Trash2, ExternalLink, Sparkles } from 'lucide-react';

interface NotificationCenterProps {
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onSelectStockSymbol?: (symbol: string) => void;
  onOpenAlertsModal: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAllAsRead,
  onClearAll,
  onSelectStockSymbol,
  onOpenAlertsModal
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
        title="View Notifications & Triggered Alerts"
      >
        {unreadCount > 0 ? (
          <BellRing className="w-4 h-4 text-amber-400 animate-pulse" />
        ) : (
          <Bell className="w-4 h-4 text-slate-400" />
        )}

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold font-mono text-white flex items-center justify-center ring-2 ring-slate-950 animate-bounce">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[460px] animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-slate-100">
                Triggered Alerts & Market Signals
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                {notifications.length}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Mark read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-slate-500 hover:text-rose-400"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-1">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs space-y-2">
                <Bell className="w-6 h-6 mx-auto text-slate-600" />
                <p>No notifications yet.</p>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAlertsModal();
                  }}
                  className="text-xs text-indigo-400 hover:underline font-semibold"
                >
                  Set your first price alert →
                </button>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    if (n.symbol && onSelectStockSymbol) {
                      onSelectStockSymbol(n.symbol);
                      setIsOpen(false);
                    }
                  }}
                  className={`p-3 transition-colors cursor-pointer rounded-lg hover:bg-slate-800/50 space-y-1 ${
                    !n.read ? 'bg-indigo-950/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-slate-200">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{n.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0">
                      {n.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {n.message}
                  </p>

                  {n.symbol && (
                    <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-semibold pt-0.5">
                      <span>View {n.symbol} terminal</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 bg-slate-950/80 border-t border-slate-800 text-center">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenAlertsModal();
              }}
              className="text-xs text-slate-300 hover:text-indigo-400 font-semibold"
            >
              Configure Custom Alerts Manager →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
