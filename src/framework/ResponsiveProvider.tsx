import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { DeviceMode, EffectiveDeviceMode, FlutterNavDestination, ResponsiveContextValue } from './types';

const ResponsiveContext = createContext<ResponsiveContextValue | undefined>(undefined);

function detectEffectiveMode(mode: DeviceMode): EffectiveDeviceMode {
  if (mode !== 'auto') {
    return mode;
  }
  if (typeof window === 'undefined') return 'web';
  const width = window.innerWidth;
  if (width < 640) return 'app';
  if (width < 1024) return 'tab';
  return 'web';
}

interface ResponsiveProviderProps {
  children: ReactNode;
}

export const ResponsiveProvider: React.FC<ResponsiveProviderProps> = ({ children }) => {
  const [deviceMode, setDeviceModeState] = useState<DeviceMode>(() => {
    try {
      const saved = localStorage.getItem('astroquant_flutter_device_mode');
      if (saved === 'app' || saved === 'tab' || saved === 'web' || saved === 'auto') {
        return saved;
      }
    } catch (e) {}
    return 'auto';
  });

  const [effectiveMode, setEffectiveMode] = useState<EffectiveDeviceMode>(() =>
    detectEffectiveMode(deviceMode)
  );

  const [activeTab, setActiveTab] = useState<FlutterNavDestination>('terminal');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const updateEffectiveMode = useCallback(() => {
    setEffectiveMode(detectEffectiveMode(deviceMode));
  }, [deviceMode]);

  useEffect(() => {
    updateEffectiveMode();
    const handleResize = () => {
      updateEffectiveMode();
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [updateEffectiveMode]);

  const setDeviceMode = (mode: DeviceMode) => {
    setDeviceModeState(mode);
    try {
      localStorage.setItem('astroquant_flutter_device_mode', mode);
    } catch (e) {}
    setEffectiveMode(detectEffectiveMode(mode));
  };

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const isMobile = effectiveMode === 'app';
  const isTablet = effectiveMode === 'tab';
  const isDesktop = effectiveMode === 'web';

  const value: ResponsiveContextValue = {
    deviceMode,
    effectiveMode,
    setDeviceMode,
    isMobile,
    isTablet,
    isDesktop,
    activeTab,
    setActiveTab,
    drawerOpen,
    setDrawerOpen,
    toggleDrawer
  };

  return <ResponsiveContext.Provider value={value}>{children}</ResponsiveContext.Provider>;
};

export const useResponsiveMode = (): ResponsiveContextValue => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsiveMode must be used within a ResponsiveProvider');
  }
  return context;
};
