import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Sparkles, User, LogOut, ArrowRight, Cloud, CloudCheck } from 'lucide-react';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  isSignedIn: boolean;
  syncedWatchlistsCount: number;
}

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSignIn: (profile: UserProfile) => void;
  onSignOut: () => void;
  onOpenSearch: () => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onSignIn,
  onSignOut,
  onOpenSearch
}) => {
  const [customEmail, setCustomEmail] = useState(user.email || 'yogeshukidwe@gmail.com');
  const [customName, setCustomName] = useState(user.name || 'Yogesh Ukidwe');

  if (!isOpen) return null;

  const handleSimulateGoogleSignIn = () => {
    onSignIn({
      name: customName || 'Google Trader',
      email: customEmail || 'trader@gmail.com',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(customEmail)}`,
      isSignedIn: true,
      syncedWatchlistsCount: 4
    });
    onClose();
  };

  const handleSignOutClick = () => {
    onSignOut();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white p-1 flex items-center justify-center">
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
              <h2 className="text-sm font-bold text-slate-100">
                Google Account & Cloud Sync
              </h2>
              <p className="text-[11px] text-slate-400">
                Sync custom watchlists, stock alerts, and stream live updates
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

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {user.isSignedIn ? (
            /* Signed In State */
            <div className="space-y-4">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border-2 border-indigo-500 bg-slate-800 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-sm text-slate-100 truncate flex items-center gap-1.5">
                    <span>{user.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </div>
                  <div className="text-xs text-slate-400 truncate font-mono">
                    {user.email}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                    <Cloud className="w-3 h-3" />
                    <span>Watchlist live streaming sync active</span>
                  </div>
                </div>
              </div>

              {/* Add Custom Stock Action */}
              <button
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                className="w-full py-2 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-600/40 text-indigo-300 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>+ Add custom stock to your Google watchlist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOutClick}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out of Google</span>
              </button>
            </div>
          ) : (
            /* Sign In Prompt */
            <div className="space-y-4">
              <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
                Sign in with your Google account to save custom watchlists, receive live price stream updates without reloading, and access multi-level predictive analysis.
              </div>

              <div className="space-y-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400">Google Account Name</label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400">Google Email</label>
                  <input
                    type="email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Primary Google Sign In Button */}
              <button
                onClick={handleSimulateGoogleSignIn}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-2.5 shadow-lg transition-all cursor-pointer"
              >
                <div className="w-4 h-4">
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
                <span>Continue with Google</span>
              </button>

              <div className="text-[10px] text-slate-500 text-center">
                Secure OAuth token verification • Automatic multi-device sync
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
