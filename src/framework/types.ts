import { ReactNode } from 'react';

export type DeviceMode = 'auto' | 'app' | 'tab' | 'web';
export type EffectiveDeviceMode = 'app' | 'tab' | 'web';

export type FlutterNavDestination = 'terminal' | 'watchlist' | 'predictions' | 'astromacro' | 'expert' | 'flutter_code';

export interface ResponsiveContextValue {
  /** User-selected device mode ('auto' | 'app' | 'tab' | 'web') */
  deviceMode: DeviceMode;
  /** Actual layout mode applied ('app' = mobile phone, 'tab' = tablet/iPad, 'web' = desktop browser) */
  effectiveMode: EffectiveDeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  /** True if currently in mobile app mode (< 600px or forced) */
  isMobile: boolean;
  /** True if currently in tablet mode (600px - 1024px or forced) */
  isTablet: boolean;
  /** True if currently in desktop web mode (>= 1024px or forced) */
  isDesktop: boolean;
  /** Active mobile bottom tab / navigation rail destination */
  activeTab: FlutterNavDestination;
  setActiveTab: (tab: FlutterNavDestination) => void;
  /** Whether the navigation drawer/sidebar is expanded */
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
}

export interface FlutterDestinationItem {
  id: FlutterNavDestination;
  label: string;
  iconName: 'terminal' | 'watchlist' | 'predictions' | 'astromacro' | 'expert' | 'code';
  badge?: string | number;
}
