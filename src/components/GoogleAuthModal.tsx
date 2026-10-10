import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  User,
  LogOut,
  ArrowRight,
  Cloud,
  Sun,
  Moon,
  Palette,
  Eye,
  Volume2,
  VolumeX,
  Check,
  Zap,
  Sliders
} from 'lucide-react';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  isSignedIn: boolean;
  syncedWatchlistsCount: number;
}

export type AppTheme = 'cosmic-dark' | 'daylight-light' | 'vedic-gold' | 'amoled-black';
export type ReadabilityMode = 'standard' | 'senior-friendly';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSignIn: (profile: UserProfile) => void;
  onSignOut: () => void;
  onOpenSearch?: () => void;
  currentTheme?: AppTheme;
  onSelectTheme?: (theme: AppTheme) => void;
  readabilityMode?: ReadabilityMode;
  onSelectReadability?: (mode: ReadabilityMode) => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onSignIn,
  onSignOut,
  onOpenSearch,
  currentTheme = 'cosmic-dark',
  onSelectTheme,
  readabilityMode = 'standard',
  onSelectReadability
}) => {
  const [customEmail, setCustomEmail] = useState(user.email || 'yogeshukidwe@gmail.com');
  const [customName, setCustomName] = useState(user.name || 'Yogesh Ukidwe');
  const [activeTab, setActiveTab] = useState<'profile' | 'themes' | 'accessibility'>('profile');
  const [soundEnabled, setSoundEnabled] = useState(true);

  if (!isOpen) return null;

  const handleSimulateGoogleSignIn = () => {
    onSignIn({
      name: customName || 'Google Trader',
      email: customEmail || 'trader@gmail.com',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(customEmail || 'yogesh')}`,
      isSignedIn: true,
      syncedWatchlistsCount: 4
    });
  };

  const handleSignOutClick = () => {
    onSignOut();
  };

  const themes: {
    id: AppTheme;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    previewBg: string;
  }[] = [
    {
      id: 'cosmic-dark',
      name: 'Cosmic Dark (Default)',
      description: 'Balanced slate & cosmic cyan. Easy on the eyes for extended analysis.',
      icon: Moon,
      accentColor: 'text-cyan-400',
      previewBg: 'bg-slate-900 border-cyan-500/60'
    },
    {
      id: 'daylight-light',
      name: 'Daylight High Contrast (All Ages)',
      description: 'Maximum contrast, crisp black text and vivid tags. Ideal for daytime & senior investors.',
      icon: Sun,
      accentColor: 'text-amber-400',
      previewBg: 'bg-slate-100 text-slate-900 border-slate-400'
    },
    {
      id: 'vedic-gold',
      name: 'Vedic Royal Gold',
      description: 'Auspicious gold trim with cosmic planetary accents for auspicious wealth timings.',
      icon: Sparkles,
      accentColor: 'text-amber-300',
      previewBg: 'bg-amber-950/40 border-amber-500/70'
    },
    {
      id: 'amoled-black',
      name: 'AMOLED Obsidian Black',
      description: 'Deep pitch-black (#000) with glowing neon figures. Maximum battery savings.',
      icon: Zap,
      accentColor: 'text-emerald-400',
      previewBg: 'bg-black border-emerald-500/60'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-lg bg-slate-900 border-2 border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md shrink-0">
              <svg className="w-full h-full" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-black text-white">
                Google Profile & App Settings
              </h2>
              <p className="text-xs text-slate-300">
                Manage your account, customize themes, and adjust readability
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 pt-2 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Google Account</span>
          </button>
          <button
            onClick={() => setActiveTab('themes')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'themes'
                ? 'border-indigo-400 text-indigo-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Themes & Display</span>
          </button>
          <button
            onClick={() => setActiveTab('accessibility')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'accessibility'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>All-Age Readability</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {user.isSignedIn ? (
                /* Signed In */
                <div className="space-y-4">
                  <div className="bg-slate-950 border-2 border-indigo-500/60 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-14 h-14 rounded-full border-2 border-cyan-400 bg-slate-800 shrink-0 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-black text-base text-white truncate flex items-center gap-1.5">
                        <span>{user.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      </div>
                      <div className="text-xs text-slate-300 truncate font-mono mt-0.5">
                        {user.email}
                      </div>
                      <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 mt-1.5">
                        <Cloud className="w-3.5 h-3.5" />
                        <span>Connected • Real-time Cloud Sync Enabled</span>
                      </div>
                    </div>
                  </div>

                  {/* Sync Details */}
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                      <span className="text-slate-400 text-[11px] block">Synced Watchlists:</span>
                      <strong className="text-cyan-300 font-mono text-base">4 Flagship Lists</strong>
                    </div>
                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                      <span className="text-slate-400 text-[11px] block">Live Stream Status:</span>
                      <strong className="text-emerald-300 font-mono text-base">Active (Zero-Lag)</strong>
                    </div>
                  </div>

                  {/* Quick Add Custom Stock */}
                  {onOpenSearch && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenSearch();
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border-2 border-cyan-500/60 text-cyan-200 font-bold text-xs flex items-center justify-between transition-all cursor-pointer"
                    >
                      <span>+ Add new stock to Google Watchlist</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {/* Sign Out Button */}
                  <button
                    onClick={handleSignOutClick}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-400" />
                    <span>Sign Out of Google Account</span>
                  </button>
                </div>
              ) : (
                /* Not Signed In */
                <div className="space-y-4">
                  <div className="text-xs text-slate-200 leading-relaxed bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
                    Sign in with Google to sync your stocks across devices, receive live tick updates without page reloads, and save high-conviction predictions.
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        Google Account Name
                      </label>
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-slate-950 border-2 border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        Google Email Address
                      </label>
                      <input
                        type="email"
                        value={customEmail}
                        onChange={(e) => setCustomEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full bg-slate-950 border-2 border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Continue with Google Button */}
                  <button
                    onClick={handleSimulateGoogleSignIn}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm flex items-center justify-center gap-3 shadow-xl transition-all cursor-pointer"
                  >
                    <div className="w-5 h-5 shrink-0">
                      <svg className="w-full h-full" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    </div>
                    <span>Sign In With Google</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'themes' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-300 font-medium">
                Choose an attractive theme style tailored for your trading environment:
              </div>

              <div className="space-y-2.5">
                {themes.map((th) => {
                  const Icon = th.icon;
                  const isSelected = currentTheme === th.id;

                  return (
                    <button
                      key={th.id}
                      onClick={() => onSelectTheme?.(th.id)}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-slate-950 border-cyan-400 ring-2 ring-cyan-400/40 shadow-xl'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className={`p-2 rounded-xl bg-slate-900 border border-slate-700 ${th.accentColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-white">{th.name}</span>
                          {isSelected && (
                            <span className="px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-black uppercase">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                          {th.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'accessibility' && (
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  Readability & Contrast Settings (All Age Criteria)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Specially tuned font sizes, high-contrast labels, and non-confusing borders so senior investors and beginners can easily read targets, prices, and recommendations.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => onSelectReadability?.('senior-friendly')}
                    className={`p-3 rounded-xl border-2 transition-all cursor-pointer text-left ${
                      readabilityMode === 'senior-friendly'
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="block text-sm font-black">Senior Friendly (Large)</span>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Extra large numbers, prominent targets, plain-English terms.
                    </span>
                  </button>

                  <button
                    onClick={() => onSelectReadability?.('standard')}
                    className={`p-3 rounded-xl border-2 transition-all cursor-pointer text-left ${
                      readabilityMode === 'standard'
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="block text-sm font-black">Standard Layout</span>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Compact view with multi-horizon indicators.
                    </span>
                  </button>
                </div>
              </div>

              {/* Sound Alerts */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-slate-500" />
                  )}
                  <div>
                    <span className="text-xs font-bold text-white block">Auditory Price Alerts</span>
                    <span className="text-[11px] text-slate-400">Play chime when stock reaches target</span>
                  </div>
                </div>

                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    soundEnabled ? 'bg-cyan-500' : 'bg-slate-800'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      soundEnabled ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
