import React, { useState } from 'react';
import { Search, Target, Globe, Code2, Sun, Moon, MoreVertical, X, PhoneCall, Sparkles, User as UserIcon, Smartphone, Monitor, Download, ArrowUp, Check } from 'lucide-react';
import { NotificationCenter } from './NotificationCenter';
import { AppNotification } from '../types';
import { Language, TranslationDictionary } from '../utils/translations';
import { UserProfile, AppTheme } from './GoogleAuthModal';
import { DeviceModeSwitcher, useResponsiveMode } from '../framework';
import { AstroQuantResponsiveLogo } from './AstroQuantResponsiveLogo';

interface HeaderProps {
  onOpenRadar: () => void;
  onOpenSearch: () => void;
  onOpenAlerts: () => void;
  onOpenWatchlists?: () => void;
  onOpenExport?: () => void;
  onOpenPostMarketAudit: () => void;
  onOpenGoogleAuth: () => void;
  onOpenChat?: () => void;
  onOpenFlutterCode?: () => void;
  onOpenWhatsApp?: () => void;
  onOpenApkBuild?: () => void;
  user: UserProfile;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  watchlistCount: number;
  activeWatchlistName?: string;
  marketFilter?: 'ALL' | 'NSE' | 'GLOBAL';
  onFilterChange?: (f: 'ALL' | 'NSE' | 'GLOBAL') => void;
  notifications: AppNotification[];
  onMarkAllNotificationsRead: () => void;
  onClearNotifications: () => void;
  onSelectStockSymbol: (symbol: string) => void;
  t: TranslationDictionary;
  currentTheme: AppTheme;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenAlerts,
  onOpenPostMarketAudit,
  onOpenGoogleAuth,
  onOpenFlutterCode,
  onOpenWhatsApp,
  onOpenApkBuild,
  user,
  currentLanguage,
  onSelectLanguage,
  notifications,
  onMarkAllNotificationsRead,
  onClearNotifications,
  onSelectStockSymbol,
  t,
  currentTheme,
  onToggleTheme
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    deviceMode,
    effectiveMode,
    setDeviceMode,
    topBarScrollMode,
    toggleTopBarScrollMode
  } = useResponsiveMode();

  const isLightMode = currentTheme === 'daylight-light';
  const isAppMode = effectiveMode === 'app';

  // Toggle temporary web app mode
  const handleToggleWebAppMode = () => {
    if (deviceMode === 'web') {
      setDeviceMode('app');
    } else {
      setDeviceMode('web');
    }
    setIsMenuOpen(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`w-full backdrop-blur-md transition-colors duration-200 border-b-2 select-none ${
        isLightMode
          ? 'bg-white/95 border-slate-200 shadow-sm text-slate-900'
          : 'bg-slate-950/98 border-slate-800 shadow-md text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-5 py-2 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo (Always Uses Radiant Light Solar Logo) */}
        <div className="shrink-0 flex items-center gap-2">
          <div
            onClick={handleScrollToTop}
            className="cursor-pointer transition-transform active:scale-95"
            title="Click to scroll to top smoothly"
          >
            <div className="sm:hidden">
              <AstroQuantResponsiveLogo
                isLightMode={isLightMode}
                currentTheme={currentTheme}
                isCompact={true}
                onLogoClick={handleScrollToTop}
              />
            </div>
            <div className="hidden sm:block">
              <AstroQuantResponsiveLogo
                isLightMode={isLightMode}
                currentTheme={currentTheme}
                isCompact={false}
                onLogoClick={handleScrollToTop}
              />
            </div>
          </div>

          {/* Temporary Web App Quick Switcher for Mobile Devices */}
          {isAppMode && (
            <button
              onClick={handleToggleWebAppMode}
              className={`hidden xs:flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black border transition-all cursor-pointer ${
                deviceMode === 'web'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                  : isLightMode
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
              }`}
              title="Temporary Web App option - View desktop interface"
            >
              <Monitor className="w-3 h-3 text-cyan-400" />
              <span>{deviceMode === 'web' ? 'App View' : 'Web View'}</span>
            </button>
          )}
        </div>

        {/* Center: Search Bar (Desktop Web - Proportional and Clean) */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-sm mx-2">
          <button
            onClick={onOpenSearch}
            className={`w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl border-2 transition-all text-xs group shadow-inner cursor-pointer ${
              isLightMode
                ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-300 text-slate-700 hover:text-slate-950'
                : 'bg-slate-900 hover:bg-slate-850 border-slate-700/80 hover:border-cyan-500 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <Search
                className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 shrink-0 ${
                  isLightMode ? 'text-blue-600' : 'text-cyan-400'
                }`}
              />
              <span className="truncate font-semibold">{t.searchPlaceholder}</span>
            </div>
            <kbd
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold shrink-0 ml-1 border ${
                isLightMode
                  ? 'bg-white border-slate-300 text-slate-700'
                  : 'bg-slate-800 border-slate-600 text-cyan-300'
              }`}
            >
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right Actions Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* WhatsApp All Sectors Report Button (Direct fetch & sends to anyone by default) */}
          <button
            onClick={onOpenWhatsApp}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm border-2 bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 group active:scale-95"
            title="WhatsApp All Sectors Report (Default: Send to Anyone)"
            aria-label="WhatsApp sectors report"
          >
            <div className="w-4 h-4 rounded-full bg-[#25D366] flex items-center justify-center p-0.5 shadow-sm shrink-0">
              <svg className="w-full h-full text-white fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
              </svg>
            </div>
            <span className="hidden sm:inline font-black text-[#25D366]">WhatsApp Sectors</span>
            <span className="sm:hidden font-black text-[#25D366]">WhatsApp</span>
          </button>

          {/* Quick 1-Click Theme Toggle Button (Desktop & Tablet) */}
          <button
            onClick={onToggleTheme}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm border-2 ${
              isLightMode
                ? 'bg-amber-100/90 hover:bg-amber-200 text-amber-900 border-amber-300'
                : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-500/40'
            }`}
            title={isLightMode ? 'Switch to Cosmic Dark Mode' : 'Switch to Daylight Light Mode'}
            aria-label="Toggle dark/light theme"
          >
            {isLightMode ? (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden lg:inline font-black text-slate-800">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden lg:inline font-black text-amber-300">Light</span>
              </>
            )}
          </button>

          {/* Build APK Quick Button (Desktop Web) */}
          {onOpenApkBuild && (
            <button
              onClick={onOpenApkBuild}
              className={`hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm border ${
                isLightMode
                  ? 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200'
                  : 'bg-blue-950/40 hover:bg-blue-900/50 text-blue-200 border-blue-700/60'
              }`}
              title="Build & Download Android APK Installer"
            >
              <Smartphone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>APK</span>
            </button>
          )}

          {/* Development Toggle Switcher (Desktop Web) */}
          <div className="hidden lg:block">
            <DeviceModeSwitcher isLightMode={isLightMode} />
          </div>

          {/* Post-Market Audit (Desktop Web) */}
          <button
            onClick={onOpenPostMarketAudit}
            className={`hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm border ${
              isLightMode
                ? 'bg-purple-100 hover:bg-purple-200 text-purple-900 border-purple-300'
                : 'bg-purple-950/50 hover:bg-purple-900/60 text-purple-200 border-purple-700/70'
            }`}
            title="Post-Market Target Accuracy Audit"
          >
            <Target className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span>Target Audit</span>
          </button>

          {/* Language Selector Dropdown (Desktop Web) */}
          <div
            className={`hidden lg:flex items-center gap-1 border-2 rounded-xl px-2 py-1 text-xs transition-colors ${
              isLightMode
                ? 'bg-slate-100 border-slate-300 text-slate-800'
                : 'bg-slate-900 border-slate-700 text-white'
            }`}
          >
            <Globe className={`w-3.5 h-3.5 shrink-0 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`} />
            <select
              value={currentLanguage}
              onChange={(e) => onSelectLanguage(e.target.value as Language)}
              className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="en" className={isLightMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>EN</option>
              <option value="hi" className={isLightMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>HI</option>
              <option value="gu" className={isLightMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>GU</option>
              <option value="mr" className={isLightMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>MR</option>
              <option value="es" className={isLightMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>ES</option>
            </select>
          </div>

          {/* Google Sign In / Profile Button (Desktop Web) */}
          <button
            onClick={onOpenGoogleAuth}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md border-2 ${
              user.isSignedIn
                ? isLightMode
                  ? 'bg-white border-blue-500 text-blue-900 hover:bg-blue-50'
                  : 'bg-slate-900 border-indigo-500/80 text-white hover:bg-slate-850'
                : isLightMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 font-black'
                : 'bg-white hover:bg-slate-100 text-slate-950 border-white font-black'
            }`}
            title={user.isSignedIn ? `Signed in as ${user.name}` : 'Sign in with Google'}
          >
            {user.isSignedIn ? (
              <>
                <img
                  src={user.avatar}
                  alt="User"
                  className="w-4 h-4 rounded-full border border-indigo-400 object-cover"
                />
                <span className="max-w-[70px] truncate hidden md:inline">
                  {user.name.split(' ')[0]}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
              </>
            ) : (
              <>
                <UserIcon className="w-3.5 h-3.5" />
                <span>Login</span>
              </>
            )}
          </button>

          {/* Notification Center */}
          <NotificationCenter
            notifications={notifications}
            onMarkAllAsRead={onMarkAllNotificationsRead}
            onClearAll={onClearNotifications}
            onSelectStockSymbol={onSelectStockSymbol}
            onOpenAlertsModal={onOpenAlerts}
          />

          {/* THREE VERTICAL DOTS (...) KEBAB MENU BUTTON: For mobile app bar & rest of options */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={`p-2 rounded-xl transition-all cursor-pointer border-2 flex items-center justify-center ${
                isMenuOpen
                  ? isLightMode
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                    : 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                  : isLightMode
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
              }`}
              title="More Options (Overlapped menus)"
              aria-label="Three vertical menu options"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <MoreVertical className="w-4 h-4" />
              )}
            </button>

            {/* Comprehensive Dropdown Menu for Overlapped Options */}
            {isMenuOpen && (
              <div
                className={`absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl border-2 shadow-2xl z-50 p-2.5 space-y-1.5 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto ${
                  isLightMode
                    ? 'bg-white/98 border-slate-300 text-slate-900 shadow-slate-300/60'
                    : 'bg-slate-950/98 border-slate-700 text-white shadow-slate-950/90'
                }`}
              >
                <div className="px-3 py-1 border-b border-slate-700/40 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <span>App Bar Options</span>
                  <span className="font-mono">{effectiveMode.toUpperCase()} MODE</span>
                </div>

                {/* 1. Temporary Web App Option / Mode Switcher */}
                <button
                  onClick={handleToggleWebAppMode}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer border ${
                    deviceMode === 'web'
                      ? 'bg-blue-500/15 border-blue-500/50 text-blue-600 dark:text-cyan-400'
                      : isLightMode
                      ? 'hover:bg-slate-100 border-slate-200 text-slate-800'
                      : 'hover:bg-slate-900 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Monitor className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
                    <div className="text-left">
                      <div className="font-extrabold text-xs">Temporary Web App Option</div>
                      <div className="text-[10px] text-slate-400">
                        {deviceMode === 'web' ? 'Currently viewing Web mode • Tap to return to App' : 'Switch to Panoramic Web mode layout'}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                    deviceMode === 'web' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {deviceMode === 'web' ? 'Active' : 'Switch'}
                  </span>
                </button>

                {/* 2. Build APK File Option */}
                {onOpenApkBuild && (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenApkBuild();
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer border ${
                      isLightMode
                        ? 'bg-emerald-50/70 hover:bg-emerald-100/70 border-emerald-200 text-emerald-950'
                        : 'bg-emerald-950/30 hover:bg-emerald-950/50 border-emerald-800/60 text-emerald-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="w-4 h-4 text-emerald-500" />
                      <div className="text-left">
                        <div className="font-extrabold text-xs">Build & Download APK File</div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                          Android .apk installer & PWA WebAPK
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950">
                      APK v2.4
                    </span>
                  </button>
                )}

                {/* 3. WhatsApp Quick Fetch Report */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenWhatsApp?.();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 transition-colors cursor-pointer font-bold text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-[#25D366] flex items-center justify-center text-white shrink-0">
                      <PhoneCall className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <div className="font-extrabold text-xs">WhatsApp Sectors Report</div>
                      <div className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80">
                        Default: Send to anyone • Yogesh Ukidwe 8097000212
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-500/20">
                    Live
                  </span>
                </button>

                {/* 4. Top Bar Scroll Behavior Toggle (Fixes Top Bar Not Scrollable) */}
                <button
                  onClick={toggleTopBarScrollMode}
                  className={`w-full flex items-center justify-between p-2 rounded-xl transition-colors cursor-pointer text-xs font-semibold ${
                    isLightMode ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-slate-900 text-slate-200'
                  }`}
                  title="Toggle whether the top bar is pinned or scrolls away naturally with page content"
                >
                  <div className="flex items-center gap-2.5">
                    <ArrowUp className="w-4 h-4 text-amber-500" />
                    <div className="text-left">
                      <div className="font-bold text-xs">Top Bar Scroll Behavior</div>
                      <div className="text-[10px] text-slate-400">
                        {topBarScrollMode === 'sticky' ? 'Currently Pinned to Top' : 'Currently Scrolls with Page'}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                    topBarScrollMode === 'sticky' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'bg-slate-700 text-white'
                  }`}>
                    {topBarScrollMode === 'sticky' ? 'Pinned' : 'Scrolls'}
                  </span>
                </button>

                {/* 5. Theme Toggle inside Menu */}
                <button
                  onClick={() => {
                    onToggleTheme();
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl transition-colors cursor-pointer text-xs font-semibold ${
                    isLightMode ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-slate-900 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isLightMode ? <Moon className="w-4 h-4 text-indigo-500" /> : <Sun className="w-4 h-4 text-amber-400" />}
                    <span>{isLightMode ? 'Switch to Cosmic Dark Theme' : 'Switch to Daylight Light Theme'}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">1-Tap</span>
                </button>

                {/* 6. Search Stocks */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenSearch();
                  }}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition-colors cursor-pointer text-xs font-semibold ${
                    isLightMode ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-slate-900 text-slate-200'
                  }`}
                >
                  <Search className="w-4 h-4 text-blue-500" />
                  <span>Search Equities & Signals</span>
                </button>

                {/* 7. Post-Market Audit */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenPostMarketAudit();
                  }}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition-colors cursor-pointer text-xs font-semibold ${
                    isLightMode ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-slate-900 text-slate-200'
                  }`}
                >
                  <Target className="w-4 h-4 text-purple-500" />
                  <span>Target Verification Audit</span>
                </button>

                {/* 8. Language Selector */}
                <div className={`p-2 rounded-xl flex items-center justify-between text-xs font-semibold ${
                  isLightMode ? 'bg-slate-50' : 'bg-slate-900/60'
                }`}>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>Language / भाषा</span>
                  </div>
                  <select
                    value={currentLanguage}
                    onChange={(e) => onSelectLanguage(e.target.value as Language)}
                    className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer border rounded px-1.5 py-0.5"
                  >
                    <option value="en" className={isLightMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>English</option>
                    <option value="hi" className={isLightMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>हिन्दी</option>
                    <option value="gu" className={isLightMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>ગુજરાતી</option>
                    <option value="mr" className={isLightMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>मराठी</option>
                    <option value="es" className={isLightMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>Español</option>
                  </select>
                </div>

                {/* 9. Google Sign In & Profile */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenGoogleAuth();
                  }}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition-colors cursor-pointer text-xs font-semibold ${
                    isLightMode ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-slate-900 text-slate-200'
                  }`}
                >
                  <UserIcon className="w-4 h-4 text-indigo-500" />
                  <span>{user.isSignedIn ? `Profile: ${user.name}` : 'Sign in with Google'}</span>
                </button>

                {/* 10. Flutter Hub if available */}
                {onOpenFlutterCode && (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenFlutterCode();
                    }}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition-colors cursor-pointer text-xs font-semibold border-t border-slate-700/30 ${
                      isLightMode ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-slate-900 text-slate-200'
                    }`}
                  >
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <span>Flutter Architecture Hub</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
