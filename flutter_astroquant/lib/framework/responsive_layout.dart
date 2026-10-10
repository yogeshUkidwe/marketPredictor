import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'theme.dart';
import 'breakpoints.dart';
import 'app_state.dart';
import '../screens/terminal_screen.dart';
import '../screens/watchlist_screen.dart';
import '../screens/predictions_screen.dart';
import '../screens/astro_macro_screen.dart';
import '../screens/ai_chat_screen.dart';

/// Adaptive Flutter App Shell compatible across:
/// 1. Mobile Phone (App): < 640px -> Scaffold + Bottom NavigationBar
/// 2. Tablet (Tab): 640px - 1024px -> Scaffold + NavigationRail + Split Workspace
/// 3. Desktop Web (Web): >= 1024px -> Panoramic Multi-Column Layout
class AdaptiveAppShell extends StatelessWidget {
  const AdaptiveAppShell({super.key});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AstroQuantAppState>();

    return LayoutBuilder(
      builder: (context, constraints) {
        // Allow forced device simulation from app state, or fallback to responsive detection
        DeviceType activeType;
        if (state.deviceMode == 'app') {
          activeType = DeviceType.app;
        } else if (state.deviceMode == 'tab') {
          activeType = DeviceType.tab;
        } else if (state.deviceMode == 'web') {
          activeType = DeviceType.web;
        } else {
          if (constraints.maxWidth < ScreenBreakpoints.mobileMax) {
            activeType = DeviceType.app;
          } else if (constraints.maxWidth < ScreenBreakpoints.tabletMax) {
            activeType = DeviceType.tab;
          } else {
            activeType = DeviceType.web;
          }
        }

        switch (activeType) {
          case DeviceType.app:
            return const _MobileAppScaffold();
          case DeviceType.tab:
            return const _TabletAppScaffold();
          case DeviceType.web:
            return const _DesktopWebAppScaffold();
        }
      },
    );
  }
}

/// 1. Mobile Phone App Scaffold
class _MobileAppScaffold extends StatelessWidget {
  const _MobileAppScaffold();

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AstroQuantAppState>();
    final screens = const [
      TerminalScreen(),
      WatchlistScreen(),
      PredictionsScreen(),
      AstroMacroScreen(),
      AiChatScreen(),
    ];

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            const Icon(Icons.blur_on, color: AstroQuantTheme.cyanGlow, size: 22),
            const SizedBox(width: 8),
            Text(
              'AstroQuant',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w900,
                    letterSpacing: -0.5,
                  ),
            ),
            const Spacer(),
            _buildDeviceSwitchButton(context, state),
            const SizedBox(width: 6),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
              decoration: BoxDecoration(
                color: AstroQuantTheme.cyanAccent.withOpacity(0.12),
                borderRadius: BorderRadius.circular(6),
                border: Border.all(color: AstroQuantTheme.cyanAccent.withOpacity(0.35)),
              ),
              child: const Text('08-10-2026', style: TextStyle(fontSize: 10, fontFamily: 'monospace', color: AstroQuantTheme.cyanGlow)),
            ),
          ],
        ),
      ),
      body: IndexedStack(
        index: state.currentIndex,
        children: screens,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: state.currentIndex,
        onDestinationSelected: state.setIndex,
        destinations: const [
          NavigationDestination(icon: Icon(Icons.show_chart), label: 'Terminal'),
          NavigationDestination(icon: Icon(Icons.format_list_bulleted), label: 'Watchlist'),
          NavigationDestination(icon: Icon(Icons.track_changes), label: 'Predict'),
          NavigationDestination(icon: Icon(Icons.explore), label: 'Astro'),
          NavigationDestination(icon: Icon(Icons.smart_toy_outlined), label: 'AI Expert'),
        ],
      ),
    );
  }
}

/// 2. Tablet / iPad Scaffold
class _TabletAppScaffold extends StatelessWidget {
  const _TabletAppScaffold();

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AstroQuantAppState>();
    final screens = const [
      TerminalScreen(),
      WatchlistScreen(),
      PredictionsScreen(),
      AstroMacroScreen(),
      AiChatScreen(),
    ];

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            const Icon(Icons.tablet_mac, color: AstroQuantTheme.indigoAccent, size: 20),
            const SizedBox(width: 8),
            const Text('AstroQuant Tablet Workspace', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
            const Spacer(),
            _buildDeviceSwitchButton(context, state),
            const SizedBox(width: 10),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: AstroQuantTheme.cyanAccent.withOpacity(0.12),
                borderRadius: BorderRadius.circular(6),
                border: Border.all(color: AstroQuantTheme.cyanAccent.withOpacity(0.3)),
              ),
              child: const Text('Session: October 8, 2026', style: TextStyle(fontSize: 11, fontFamily: 'monospace', color: AstroQuantTheme.cyanGlow)),
            ),
          ],
        ),
      ),
      body: Row(
        children: [
          NavigationRail(
            selectedIndex: state.currentIndex,
            onDestinationSelected: state.setIndex,
            labelType: NavigationRailLabelType.all,
            leading: const Padding(
              padding: EdgeInsets.symmetric(vertical: 12),
              child: Icon(Icons.blur_on, color: AstroQuantTheme.cyanGlow, size: 28),
            ),
            destinations: const [
              NavigationRailDestination(icon: Icon(Icons.show_chart), label: Text('Terminal')),
              NavigationRailDestination(icon: Icon(Icons.format_list_bulleted), label: Text('Watchlist')),
              NavigationRailDestination(icon: Icon(Icons.track_changes), label: Text('Predict')),
              NavigationRailDestination(icon: Icon(Icons.explore), label: Text('Astro')),
              NavigationRailDestination(icon: Icon(Icons.smart_toy_outlined), label: Text('AI Expert')),
            ],
          ),
          const VerticalDivider(width: 1, thickness: 1),
          Expanded(
            child: IndexedStack(
              index: state.currentIndex,
              children: screens,
            ),
          ),
        ],
      ),
    );
  }
}

/// 3. Desktop Web Scaffold
class _DesktopWebAppScaffold extends StatelessWidget {
  const _DesktopWebAppScaffold();

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AstroQuantAppState>();
    final screens = const [
      TerminalScreen(),
      WatchlistScreen(),
      PredictionsScreen(),
      AstroMacroScreen(),
      AiChatScreen(),
    ];

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            const Icon(Icons.blur_on, color: AstroQuantTheme.cyanGlow, size: 24),
            const SizedBox(width: 8),
            const Text('AstroQuant Web Terminal (October 8, 2026 Live Session)'),
            const Spacer(),
            _buildDeviceSwitchButton(context, state),
            const SizedBox(width: 12),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: AstroQuantTheme.emeraldBullish.withOpacity(0.12),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: AstroQuantTheme.emeraldBullish.withOpacity(0.4)),
              ),
              child: Row(
                children: const [
                  Icon(Icons.fiber_manual_record, size: 10, color: AstroQuantTheme.emeraldBullish),
                  SizedBox(width: 4),
                  Text('NSE LIVE 08-10-2026', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AstroQuantTheme.emeraldBullish)),
                ],
              ),
            ),
          ],
        ),
      ),
      body: Row(
        children: [
          NavigationRail(
            selectedIndex: state.currentIndex,
            onDestinationSelected: state.setIndex,
            labelType: NavigationRailLabelType.all,
            leading: const Padding(
              padding: EdgeInsets.symmetric(vertical: 16),
              child: Icon(Icons.public, color: AstroQuantTheme.cyanGlow, size: 28),
            ),
            destinations: const [
              NavigationRailDestination(icon: Icon(Icons.show_chart), label: Text('Terminal')),
              NavigationRailDestination(icon: Icon(Icons.format_list_bulleted), label: Text('Watchlist')),
              NavigationRailDestination(icon: Icon(Icons.track_changes), label: Text('Predict')),
              NavigationRailDestination(icon: Icon(Icons.explore), label: Text('Astro')),
              NavigationRailDestination(icon: Icon(Icons.smart_toy_outlined), label: Text('AI Expert')),
            ],
          ),
          const VerticalDivider(width: 1, thickness: 1),
          Expanded(
            child: IndexedStack(
              index: state.currentIndex,
              children: screens,
            ),
          ),
        ],
      ),
    );
  }
}

Widget _buildDeviceSwitchButton(BuildContext context, AstroQuantAppState state) {
  return PopupMenuButton<String>(
    initialValue: state.deviceMode,
    tooltip: 'Switch Device View Mode (App, Web, Tab)',
    icon: Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: AstroQuantTheme.indigoAccent.withOpacity(0.15),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AstroQuantTheme.indigoAccent.withOpacity(0.4)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            state.deviceMode == 'app'
                ? Icons.smartphone
                : state.deviceMode == 'tab'
                    ? Icons.tablet_mac
                    : state.deviceMode == 'web'
                        ? Icons.laptop
                        : Icons.devices,
            size: 14,
            color: AstroQuantTheme.cyanGlow,
          ),
          const SizedBox(width: 4),
          Text(
            state.deviceMode.toUpperCase(),
            style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AstroQuantTheme.cyanGlow),
          ),
        ],
      ),
    ),
    onSelected: (mode) => state.setDeviceMode(mode),
    itemBuilder: (context) => [
      const PopupMenuItem(value: 'auto', child: Text('Auto Responsive')),
      const PopupMenuItem(value: 'app', child: Text('App (Mobile < 640px)')),
      const PopupMenuItem(value: 'tab', child: Text('Tab (Tablet 640px - 1024px)')),
      const PopupMenuItem(value: 'web', child: Text('Web (Desktop >= 1024px)')),
    ],
  );
}
