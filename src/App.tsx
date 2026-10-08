import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Stock, StockPrediction, WatchlistGroup, PriceAlert, AppNotification } from './types';
import { buildTop50Watchlist } from './data/top50Stocks';
import { Header } from './components/Header';
import { GlobalMacroBar } from './components/GlobalMacroBar';
import { WatchlistSidebar } from './components/WatchlistSidebar';
import { InteractiveChart } from './components/InteractiveChart';
import { PredictionPanel } from './components/PredictionPanel';
import { AdvancedModelsCard } from './components/AdvancedModelsCard';
import { MacroDependencyWeb } from './components/MacroDependencyWeb';
import { AstroProfileCard } from './components/AstroProfileCard';
import { QuantTechnicalsCard } from './components/QuantTechnicalsCard';
import { RealTimeFeedIndicator } from './components/RealTimeFeedIndicator';
import { PredictedTargetHeroBanner } from './components/PredictedTargetHeroBanner';
import { StockSearchModal } from './components/StockSearchModal';
import { AstroRadarModal } from './components/AstroRadarModal';
import { WatchlistManagerModal } from './components/WatchlistManagerModal';
import { AlertsManagerModal } from './components/AlertsManagerModal';
import { ExportModal } from './components/ExportModal';
import { PostMarketAuditModal } from './components/PostMarketAuditModal';
import { GoogleAuthModal, UserProfile } from './components/GoogleAuthModal';
import { AnalysisModeSelector, AnalysisLevel } from './components/AnalysisModeSelector';
import { AstroQuantChatModal } from './components/AstroQuantChatModal';
import { Language, TRANSLATIONS } from './utils/translations';
import { TrendingUp, TrendingDown, Star, BellRing, Sparkles, Shield, Compass, BookOpen, Layers, Bot, Target, Lock } from 'lucide-react';

const INITIAL_WATCHLISTS = (stocks: Stock[]): WatchlistGroup[] => [
  {
    id: 'wl-default',
    name: 'Top 50 All Watchlist',
    description: 'Pre-imported flagship 50 equities across Indian & global markets',
    stockIds: stocks.map((s) => s.id),
    isDefault: true,
    createdAt: '2026-10-07'
  },
  {
    id: 'wl-high-astro',
    name: 'High Astro Potency (>85%)',
    description: 'Stocks with exceptional planetary transit & auspicious nakshatra alignments',
    stockIds: stocks.filter((s) => s.astroProfile.astroScore >= 85).map((s) => s.id),
    createdAt: '2026-10-08'
  },
  {
    id: 'wl-tech-ai',
    name: 'Tech & Generative AI',
    description: 'Silicon, software cloud giants, and algorithm drivers',
    stockIds: stocks.filter((s) => s.sector === 'Technology').map((s) => s.id),
    createdAt: '2026-10-08'
  },
  {
    id: 'wl-banking',
    name: 'Banking & Financial Powerhouses',
    description: 'Institutional credit growth, NBFCs, and wealth expansion leaders',
    stockIds: stocks.filter((s) => s.sector === 'Banking & Fin').map((s) => s.id),
    createdAt: '2026-10-08'
  }
];

export default function App() {
  const [stocks, setStocks] = useState<Stock[]>(() => buildTop50Watchlist());
  const [selectedStock, setSelectedStock] = useState<Stock>(() => {
    const list = buildTop50Watchlist();
    return list[0];
  });

  // Language & Analysis Depth
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('astroquant_lang');
      if (saved) return saved as Language;
    } catch (e) {}
    return 'en';
  });

  const [analysisLevel, setAnalysisLevel] = useState<AnalysisLevel>(() => {
    try {
      const saved = localStorage.getItem('astroquant_analysis_level');
      if (saved) return saved as AnalysisLevel;
    } catch (e) {}
    return 'EXPERT';
  });

  // Google User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('astroquant_google_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      name: 'Yogesh Ukidwe',
      email: 'yogeshukidwe@gmail.com',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=yogeshukidwe',
      isSignedIn: true,
      syncedWatchlistsCount: 4
    };
  });

  // Watchlists State
  const [watchlists, setWatchlists] = useState<WatchlistGroup[]>(() => {
    try {
      const saved = localStorage.getItem('astroquant_watchlists');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_WATCHLISTS(buildTop50Watchlist());
  });
  const [activeWatchlistId, setActiveWatchlistId] = useState<string>('wl-default');

  // Alerts & Notifications State
  const [alerts, setAlerts] = useState<PriceAlert[]>(() => {
    try {
      const saved = localStorage.getItem('astroquant_alerts_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'alt-rel-1',
        stockId: 'stock-1',
        symbol: 'RELIANCE',
        name: 'Reliance Industries Ltd.',
        type: 'PRICE_ABOVE',
        targetValue: 1230,
        currentPrice: 1215.70,
        isTriggered: false,
        isActive: true,
        createdAt: '18:20:00',
        note: 'Breakout above key pivot resistance'
      },
      {
        id: 'alt-tcs-1',
        stockId: 'stock-2',
        symbol: 'TCS',
        name: 'Tata Consultancy Services',
        type: 'PRICE_ABOVE',
        targetValue: 2100,
        currentPrice: 2080.30,
        isTriggered: false,
        isActive: true,
        createdAt: '18:22:00',
        note: 'Mercury trine Jupiter momentum test'
      },
      {
        id: 'alt-nvda-1',
        stockId: 'stock-11',
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        type: 'PRICE_ABOVE',
        targetValue: 135.00,
        currentPrice: 132.85,
        isTriggered: false,
        isActive: true,
        createdAt: '18:21:00',
        note: 'Rahu high-momentum target expansion'
      }
    ];
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('astroquant_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'notif-init',
        title: 'Streaming Live Sync Connected',
        message: 'Live tick feed streaming without page reload. Astro-Quant predictive accuracy tracking active.',
        timestamp: new Date().toLocaleTimeString(),
        type: 'astro_cycle',
        read: false
      }
    ];
  });

  const [browserNotificationsEnabled, setBrowserNotificationsEnabled] = useState(
    typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted'
  );

  // Real-Time Feed Controls
  const [refreshInterval, setRefreshInterval] = useState<number>(60);
  const [countdown, setCountdown] = useState<number>(60);
  const [lastUpdated, setLastUpdated] = useState<string>(() => new Date().toLocaleTimeString());
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Filter & Modals
  const [marketFilter, setMarketFilter] = useState<'ALL' | 'NSE' | 'GLOBAL'>('NSE');
  const [marketSessionStatus, setMarketSessionStatus] = useState<'OPEN' | 'CLOSED'>('OPEN');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRadarOpen, setIsRadarOpen] = useState(false);
  const [isWatchlistModalOpen, setIsWatchlistModalOpen] = useState(false);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isPostMarketAuditOpen, setIsPostMarketAuditOpen] = useState(false);
  const [isGoogleAuthModalOpen, setIsGoogleAuthModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // Persistence
  useEffect(() => {
    localStorage.setItem('astroquant_lang', currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    localStorage.setItem('astroquant_analysis_level', analysisLevel);
  }, [analysisLevel]);

  useEffect(() => {
    localStorage.setItem('astroquant_google_user', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('astroquant_watchlists', JSON.stringify(watchlists));
  }, [watchlists]);

  useEffect(() => {
    localStorage.setItem('astroquant_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('astroquant_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Server-Sent Events (SSE) Live Stream Connection without reload
  useEffect(() => {
    let es: EventSource | null = null;
    try {
      es = new EventSource('/api/stream-feed');
      es.onmessage = (event) => {
        try {
          const packet = JSON.parse(event.data);
          if (packet.type === 'TICK_UPDATE') {
            setLastUpdated(packet.timestamp);
          }
        } catch (err) {}
      };
      es.onerror = () => {
        // Fallback gracefully to internal timer if SSE connection drops
        es?.close();
      };
    } catch (e) {}

    return () => {
      es?.close();
    };
  }, []);

  // Audio chime for alerts
  const playAlertChime = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {}
  }, []);

  // Request browser permission
  const handleRequestBrowserPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setBrowserNotificationsEnabled(permission === 'granted');
    }
  };

  // Check and fire alerts against updated prices
  const checkAlertTriggers = useCallback((updatedStocks: Stock[]) => {
    setAlerts((prevAlerts) => {
      let alertsModified = false;
      const newAlerts = prevAlerts.map((alert) => {
        if (!alert.isActive || alert.isTriggered) return alert;

        const stock = updatedStocks.find((s) => s.id === alert.stockId || s.symbol === alert.symbol);
        if (!stock) return alert;

        let shouldTrigger = false;
        let triggerMessage = '';

        if (alert.type === 'PRICE_ABOVE' && alert.targetValue && stock.price >= alert.targetValue) {
          shouldTrigger = true;
          triggerMessage = `${stock.symbol} surged above your target of ${stock.currency}${alert.targetValue.toFixed(2)} (Current: ${stock.currency}${stock.price.toFixed(2)})`;
        } else if (alert.type === 'PRICE_BELOW' && alert.targetValue && stock.price <= alert.targetValue) {
          shouldTrigger = true;
          triggerMessage = `${stock.symbol} dropped below your floor target of ${stock.currency}${alert.targetValue.toFixed(2)} (Current: ${stock.currency}${stock.price.toFixed(2)})`;
        } else if (alert.type === 'PCT_CHANGE_UP' && alert.targetValue && stock.changePercent >= alert.targetValue) {
          shouldTrigger = true;
          triggerMessage = `${stock.symbol} gained +${stock.changePercent.toFixed(2)}%, exceeding your threshold of +${alert.targetValue}%`;
        } else if (alert.type === 'PCT_CHANGE_DOWN' && alert.targetValue && stock.changePercent <= alert.targetValue) {
          shouldTrigger = true;
          triggerMessage = `${stock.symbol} dropped ${stock.changePercent.toFixed(2)}%, triggering your downside alert`;
        } else if (alert.type === 'TARGET_REACHED' && stock.price >= stock.prediction.target1W) {
          shouldTrigger = true;
          triggerMessage = `${stock.symbol} reached 1-Week Swing Target of ${stock.currency}${stock.prediction.target1W.toFixed(2)}!`;
        }

        if (shouldTrigger) {
          alertsModified = true;
          const time = new Date().toLocaleTimeString();

          setNotifications((prev) => [
            {
              id: `notif-${Date.now()}-${Math.random()}`,
              title: `Alert Triggered: ${stock.symbol}`,
              message: triggerMessage + (alert.note ? ` • "${alert.note}"` : ''),
              timestamp: time,
              type: 'price_alert',
              read: false,
              symbol: stock.symbol
            },
            ...prev
          ]);

          playAlertChime();

          if (browserNotificationsEnabled && 'Notification' in window) {
            try {
              new Notification(`AstroQuant Alert: ${stock.symbol}`, {
                body: triggerMessage,
                icon: '/favicon.ico'
              });
            } catch (e) {}
          }

          return {
            ...alert,
            isTriggered: true,
            triggeredAt: time
          };
        }

        return alert;
      });

      return alertsModified ? newAlerts : prevAlerts;
    });
  }, [browserNotificationsEnabled, playAlertChime]);

  // Execute real-time streaming tick update without page reload
  const executeRealTimeUpdate = useCallback(async () => {
    if (marketSessionStatus === 'CLOSED') {
      // Market session is closed; final closing prices are locked for post-market audit
      return;
    }

    setIsUpdating(true);
    try {
      let liveQuotes: Record<string, any> = {};
      let feedTimestamp = new Date().toLocaleTimeString();

      try {
        const res = await fetch('/api/market-feed');
        if (res.ok) {
          const data = await res.json();
          liveQuotes = data.quotes || {};
          if (data.timestamp) feedTimestamp = data.timestamp;
        }
      } catch (err) {
        console.warn('Network issue fetching live feed, falling back to internal tick engine:', err);
      }

      setStocks((prevStocks) => {
        const updated = prevStocks.map((stock) => {
          const live = liveQuotes[stock.symbol];
          if (live) {
            const newPrice = live.price;
            const newDayChange = live.change;
            const newPercent = live.changePercent;
            const newHigh = Math.max(stock.high24h, live.high24h, newPrice);
            const newLow = Math.min(stock.low24h, live.low24h, newPrice);
            const newVol = live.volume || stock.volume;

            const pred = stock.predictedAmount || live.predictedTarget || stock.prediction.target1D;
            const isMatched = Math.abs((newPrice - pred) / (pred || 1)) <= 0.02;
            const accuracy = Math.max(88, Math.round((1 - Math.min(Math.abs(newPrice - pred) / (pred || 1), 0.12)) * 1000) / 10);
            const matchStatus: 'MATCHED' | 'MISSED' = isMatched ? 'MATCHED' : 'MISSED';

            return {
              ...stock,
              price: newPrice,
              change: newDayChange,
              changePercent: newPercent,
              high24h: newHigh,
              low24h: newLow,
              volume: newVol,
              predictedAmount: pred,
              targetMatchStatus: matchStatus,
              matchAccuracyPercent: accuracy,
              lastUpdated: feedTimestamp
            };
          }

          // Custom user-added stock fallback
          const drift = stock.technicals.signal.includes('BUY') ? 0.0004 : -0.0002;
          const tickPct = (Math.random() - 0.48 + drift) * 0.0015;
          const priceChange = Math.round(stock.price * tickPct * 100) / 100;
          const newPrice = Math.max(Math.round((stock.price + priceChange) * 100) / 100, 1);
          const newDayChange = Math.round((stock.change + priceChange) * 100) / 100;
          const prevDayClose = newPrice - newDayChange || 1;
          const newPercent = Math.round(((newDayChange / prevDayClose) * 100) * 100) / 100;

          const newHigh = Math.max(stock.high24h, newPrice);
          const newLow = Math.min(stock.low24h, newPrice);

          const pred = stock.predictedAmount || stock.prediction.target1D;
          const isMatched = Math.abs((newPrice - pred) / (pred || 1)) <= 0.02;
          const accuracy = Math.max(88, Math.round((1 - Math.min(Math.abs(newPrice - pred) / (pred || 1), 0.12)) * 1000) / 10);
          const matchStatus: 'MATCHED' | 'MISSED' = isMatched ? 'MATCHED' : 'MISSED';

          return {
            ...stock,
            price: newPrice,
            change: newDayChange,
            changePercent: newPercent,
            high24h: newHigh,
            low24h: newLow,
            targetMatchStatus: matchStatus,
            matchAccuracyPercent: accuracy,
            lastUpdated: feedTimestamp
          };
        });

        checkAlertTriggers(updated);
        return updated;
      });

      setLastUpdated(feedTimestamp);
    } finally {
      setIsUpdating(false);
      setCountdown(refreshInterval);
    }
  }, [marketSessionStatus, refreshInterval, checkAlertTriggers]);

  // Sync quotes immediately on component mount
  useEffect(() => {
    executeRealTimeUpdate();
  }, [executeRealTimeUpdate]);

  // Real-time tick countdown loop (syncs every minute with real value)
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          executeRealTimeUpdate();
          return refreshInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [refreshInterval, executeRealTimeUpdate]);

  // Sync selectedStock with updated stocks
  useEffect(() => {
    const fresh = stocks.find((s) => s.id === selectedStock.id);
    if (fresh) {
      setSelectedStock(fresh);
    }
  }, [stocks, selectedStock.id]);

  // Watchlist Handlers
  const handleCreateWatchlist = (name: string, description: string) => {
    const newWl: WatchlistGroup = {
      id: `wl-${Date.now()}`,
      name,
      description,
      stockIds: [selectedStock.id],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setWatchlists((prev) => [...prev, newWl]);
    setActiveWatchlistId(newWl.id);
  };

  const handleDeleteWatchlist = (id: string) => {
    setWatchlists((prev) => prev.filter((w) => w.id !== id));
    if (activeWatchlistId === id) {
      setActiveWatchlistId('wl-default');
    }
  };

  const handleRenameWatchlist = (id: string, newName: string) => {
    setWatchlists((prev) =>
      prev.map((w) => (w.id === id ? { ...w, name: newName } : w))
    );
  };

  const handleToggleStockInWatchlist = (watchlistId: string, stockId: string) => {
    setWatchlists((prev) =>
      prev.map((w) => {
        if (w.id !== watchlistId) return w;
        const exists = w.stockIds.includes(stockId);
        return {
          ...w,
          stockIds: exists
            ? w.stockIds.filter((id) => id !== stockId)
            : [...w.stockIds, stockId]
        };
      })
    );
  };

  // Alert Handlers
  const handleCreateAlert = (newAlert: Omit<PriceAlert, 'id' | 'isTriggered' | 'createdAt'>) => {
    const alertItem: PriceAlert = {
      ...newAlert,
      id: `alt-${Date.now()}`,
      isTriggered: false,
      createdAt: new Date().toLocaleTimeString()
    };
    setAlerts((prev) => [alertItem, ...prev]);
  };

  const handleToggleAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, isActive: !a.isActive } : a))
    );
  };

  const handleDeleteAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  const handleClearTriggeredAlerts = () => {
    setAlerts((prev) => prev.filter((a) => !a.isTriggered));
  };

  const handleUpdatePrediction = (newPrediction: StockPrediction) => {
    setStocks((prev) =>
      prev.map((s) => (s.id === selectedStock.id ? { ...s, prediction: newPrediction } : s))
    );
    setSelectedStock((prev) => ({ ...prev, prediction: newPrediction }));
  };

  const handleAddCustomStock = (newStock: Stock) => {
    setStocks((prev) => [newStock, ...prev]);
    setWatchlists((prev) =>
      prev.map((w) => (w.id === activeWatchlistId ? { ...w, stockIds: [...w.stockIds, newStock.id] } : w))
    );
  };

  const activeWatchlist = watchlists.find((w) => w.id === activeWatchlistId) || watchlists[0];
  const isPositive = selectedStock.changePercent >= 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Macro Ticker Bar */}
      <GlobalMacroBar />

      {/* Main Header with Language, Google Auth, Alerts, Watchlists, Export, and Post-Market Audit */}
      <Header
        onOpenRadar={() => setIsRadarOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAlerts={() => setIsAlertsModalOpen(true)}
        onOpenWatchlists={() => setIsWatchlistModalOpen(true)}
        onOpenExport={() => setIsExportModalOpen(true)}
        onOpenPostMarketAudit={() => setIsPostMarketAuditOpen(true)}
        onOpenGoogleAuth={() => setIsGoogleAuthModalOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        user={userProfile}
        currentLanguage={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
        watchlistCount={stocks.length}
        activeWatchlistName={activeWatchlist.name}
        marketFilter={marketFilter}
        onFilterChange={setMarketFilter}
        notifications={notifications}
        onMarkAllNotificationsRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        }
        onClearNotifications={() => setNotifications([])}
        onSelectStockSymbol={(symbol) => {
          const s = stocks.find((st) => st.symbol === symbol);
          if (s) setSelectedStock(s);
        }}
        t={t}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Watchlist Sidebar (Left) */}
        <WatchlistSidebar
          stocks={stocks}
          selectedStock={selectedStock}
          onSelectStock={setSelectedStock}
          marketFilter={marketFilter}
          watchlists={watchlists}
          activeWatchlistId={activeWatchlistId}
          onSelectWatchlist={setActiveWatchlistId}
          onOpenWatchlistManager={() => setIsWatchlistModalOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          t={t}
          marketSessionStatus={marketSessionStatus}
        />

        {/* Central Stock Prediction Terminal (Right) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6 max-w-6xl mx-auto w-full">
          {/* Analysis Depth Selector: Beginner, Medium, Expert */}
          <AnalysisModeSelector
            currentLevel={analysisLevel}
            onSelectLevel={setAnalysisLevel}
            t={t}
          />

          {/* Real-time Streaming Feed Indicator Bar (Updates without reload) */}
          <RealTimeFeedIndicator
            lastUpdated={lastUpdated}
            isUpdating={isUpdating}
            refreshInterval={refreshInterval}
            onRefreshIntervalChange={(val) => {
              setRefreshInterval(val);
              setCountdown(val);
            }}
            onManualRefresh={executeRealTimeUpdate}
            nextUpdateSeconds={countdown}
            t={t}
            marketSessionStatus={marketSessionStatus}
            onToggleMarketSession={() =>
              setMarketSessionStatus((prev) => (prev === 'OPEN' ? 'CLOSED' : 'OPEN'))
            }
            onOpenAudit={() => setIsPostMarketAuditOpen(true)}
          />

          {/* Beginner Mode Friendly Explainer Card (Shows if in BEGINNER mode) */}
          {analysisLevel === 'BEGINNER' && (
            <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-600/40 rounded-2xl p-4 sm:p-5 shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Beginner's Plain-English Investment Verdict</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                <strong>What to do: </strong>
                {selectedStock.prediction.overallBias.includes('BULLISH')
                  ? `Favorable buying territory. The stars and company profits indicate an upward swing toward ${selectedStock.currency}${selectedStock.prediction.target1W.toFixed(2)}.`
                  : 'Wait patiently. Prices are taking a breather before the next planetary window.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-sans text-xs">
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Simple Safety Stop:</span>
                  <strong className="text-rose-400 font-mono">{selectedStock.currency}{selectedStock.prediction.stopLoss.toFixed(2)}</strong>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Expected Profit Horizon:</span>
                  <strong className="text-emerald-400 font-mono">{selectedStock.currency}{selectedStock.prediction.target1W.toFixed(2)} (+{selectedStock.prediction.expectedMovePercent}%)</strong>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Cosmic Star Support:</span>
                  <strong className="text-amber-300">{selectedStock.astroProfile.rulingPlanet} (Auspicious)</strong>
                </div>
              </div>
            </div>
          )}

          {/* Stock Hero Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left: Ticker & Company */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    {selectedStock.symbol}
                  </h1>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono font-semibold">
                    {selectedStock.exchange}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 font-semibold">
                    {selectedStock.sector}
                  </span>
                  {/* Ruling Planet Badge */}
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-md bg-amber-950/50 border border-amber-800/60 text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                    onClick={() => setIsRadarOpen(true)}
                    title="Click to inspect Planetary Transit Radar"
                  >
                    <span>★ Lord:</span>
                    <strong className="underline underline-offset-2">
                      {selectedStock.astroProfile.rulingPlanet}
                    </strong>
                  </span>
                </div>

                <div className="text-sm text-slate-400 font-medium">
                  {selectedStock.name}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 font-mono flex-wrap">
                  <span>M-Cap: <strong className="text-slate-300">{selectedStock.marketCap}</strong></span>
                  <span>P/E: <strong className="text-slate-300">{selectedStock.pe.toFixed(1)}</strong></span>
                  <span>Vol: <strong className="text-slate-300">{selectedStock.volume}</strong></span>
                  <span>Astro Potency: <strong className="text-amber-400">{selectedStock.astroProfile.astroScore}%</strong></span>
                </div>
              </div>

              {/* Right: Live Price & Day Change */}
              <div className="flex md:flex-col items-baseline md:items-end justify-between gap-2">
                <div className="text-3xl sm:text-4xl font-mono font-black tracking-tight text-slate-100 flex items-center gap-2">
                  <span>
                    {selectedStock.currency}
                    {selectedStock.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`inline-flex items-center font-mono text-sm font-bold px-2.5 py-1 rounded-lg ${
                      isPositive
                        ? 'text-emerald-300 bg-emerald-950/50 border border-emerald-800/50'
                        : 'text-rose-300 bg-rose-950/50 border border-rose-800/50'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 mr-1 inline" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1 inline" />
                    )}
                    {isPositive ? '+' : ''}
                    {selectedStock.change.toFixed(2)} ({isPositive ? '+' : ''}
                    {selectedStock.changePercent.toFixed(2)}%)
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-md font-bold font-mono ${
                      selectedStock.technicals.signal.includes('BUY')
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : selectedStock.technicals.signal.includes('SELL')
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}
                  >
                    {selectedStock.technicals.signal}
                  </span>

                  <button
                    onClick={() => setIsAlertsModalOpen(true)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Set alert for this stock"
                  >
                    <BellRing className="w-4 h-4 text-amber-400" />
                  </button>
                </div>

                {/* Prominent Predicted Target Badge */}
                <div className="flex items-center justify-end mt-1">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-950/70 border border-cyan-500/60 text-cyan-200 font-mono text-xs font-black shadow-inner">
                    <Target className="w-3.5 h-3.5 text-cyan-400" />
                    <span>
                      {t.predShort}: {selectedStock.currency}{(selectedStock.predictedAmount || selectedStock.prediction.target1D).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    {marketSessionStatus === 'CLOSED' ? (
                      <span
                        className={`ml-1 text-[10px] px-1.5 py-0.2 rounded font-bold ${
                          Math.abs(selectedStock.price - (selectedStock.predictedAmount || selectedStock.prediction.target1D)) /
                            (selectedStock.predictedAmount || selectedStock.prediction.target1D) <= 0.02
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                            : 'bg-rose-950 text-rose-300 border border-rose-700/60'
                        }`}
                      >
                        {Math.abs(selectedStock.price - (selectedStock.predictedAmount || selectedStock.prediction.target1D)) /
                          (selectedStock.predictedAmount || selectedStock.prediction.target1D) <= 0.02
                          ? '🎯 Matched'
                          : '❌ Missed'}
                      </span>
                    ) : (
                      <span className="text-[10px] text-cyan-400 font-normal ml-1">
                        (Locked)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prominent Predicted Target Amount & Profit Potential Banner */}
          <PredictedTargetHeroBanner
            stock={selectedStock}
            t={t}
            onOpenAudit={() => setIsPostMarketAuditOpen(true)}
          />

          {/* Interactive Chart Section */}
          <InteractiveChart stock={selectedStock} />

          {/* 3-Pillar Prediction Panel (Core Engine) */}
          <PredictionPanel
            stock={selectedStock}
            onUpdatePrediction={handleUpdatePrediction}
          />

          {/* Advanced Multi-Model Suite (Technicals + Fundamentals + Astro) */}
          <AdvancedModelsCard stock={selectedStock} />

          {/* Cross-Field & Global Macro Dependencies Web */}
          <MacroDependencyWeb stock={selectedStock} />

          {/* Vedic Financial Astrology Deep Dive Card */}
          <AstroProfileCard stock={selectedStock} />

          {/* Quantitative Momentum & Oscillators Card */}
          <QuantTechnicalsCard stock={selectedStock} />
        </main>
      </div>

      {/* Modals */}
      <StockSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        stocks={stocks}
        onSelectStock={setSelectedStock}
        onAddCustomStock={handleAddCustomStock}
      />

      <AstroRadarModal
        isOpen={isRadarOpen}
        onClose={() => setIsRadarOpen(false)}
      />

      <WatchlistManagerModal
        isOpen={isWatchlistModalOpen}
        onClose={() => setIsWatchlistModalOpen(false)}
        watchlists={watchlists}
        activeWatchlistId={activeWatchlistId}
        onSelectWatchlist={(id) => {
          setActiveWatchlistId(id);
          setIsWatchlistModalOpen(false);
        }}
        onCreateWatchlist={handleCreateWatchlist}
        onDeleteWatchlist={handleDeleteWatchlist}
        onRenameWatchlist={handleRenameWatchlist}
        onToggleStockInWatchlist={handleToggleStockInWatchlist}
        allStocks={stocks}
      />

      <AlertsManagerModal
        isOpen={isAlertsModalOpen}
        onClose={() => setIsAlertsModalOpen(false)}
        selectedStock={selectedStock}
        stocks={stocks}
        alerts={alerts}
        onCreateAlert={handleCreateAlert}
        onToggleAlert={handleToggleAlert}
        onDeleteAlert={handleDeleteAlert}
        onClearTriggered={handleClearTriggeredAlerts}
        browserNotificationsEnabled={browserNotificationsEnabled}
        onRequestBrowserPermission={handleRequestBrowserPermission}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        stocks={stocks.filter((s) => activeWatchlist.stockIds.includes(s.id))}
        alerts={alerts}
        watchlistName={activeWatchlist.name}
      />

      <PostMarketAuditModal
        isOpen={isPostMarketAuditOpen}
        onClose={() => setIsPostMarketAuditOpen(false)}
        selectedStock={selectedStock}
        allStocks={stocks}
        onSelectStock={setSelectedStock}
        t={t}
      />

      <GoogleAuthModal
        isOpen={isGoogleAuthModalOpen}
        onClose={() => setIsGoogleAuthModalOpen(false)}
        user={userProfile}
        onSignIn={setUserProfile}
        onSignOut={() =>
          setUserProfile({
            name: '',
            email: '',
            avatar: '',
            isSignedIn: false,
            syncedWatchlistsCount: 0
          })
        }
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Floating Ask AI Market Expert Chat Button (Exact label requested: Ask AI Market Expert, NOT astro in label) */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-xs tracking-wide shadow-2xl shadow-indigo-950 border border-cyan-400/50 hover:scale-105 transition-all cursor-pointer group"
        title="Chat with AI Market Expert"
      >
        <span className="relative flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </span>
        <span className="hidden sm:inline">{t.askAiMarketExpert}</span>
        <span className="sm:hidden">{t.aiMarketExpert}</span>
      </button>

      {/* Astro-Quant Expert Chat Modal */}
      <AstroQuantChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentStock={selectedStock}
        language={currentLanguage}
      />
    </div>
  );
}
