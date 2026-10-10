import 'package:flutter/material.dart';

/// Target Device Categories
enum DeviceType {
  app, // Mobile Phone (< 640px)
  tab, // Tablet / iPad (640px - 1024px)
  web, // Desktop / Web Browser (>= 1024px)
}

/// Breakpoint Constants & Utility Helpers
class ScreenBreakpoints {
  static const double mobileMax = 640.0;
  static const double tabletMax = 1024.0;

  static DeviceType getDeviceType(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    if (width < mobileMax) {
      return DeviceType.app;
    } else if (width < tabletMax) {
      return DeviceType.tab;
    } else {
      return DeviceType.web;
    }
  }

  static bool isApp(BuildContext context) => getDeviceType(context) == DeviceType.app;
  static bool isTab(BuildContext context) => getDeviceType(context) == DeviceType.tab;
  static bool isWeb(BuildContext context) => getDeviceType(context) == DeviceType.web;
}

/// Responsive Layout Builder Widget
/// Automatically renders the optimal widget tree based on current screen size
class ResponsiveBuilder extends StatelessWidget {
  final Widget Function(BuildContext context, BoxConstraints constraints) app;
  final Widget Function(BuildContext context, BoxConstraints constraints)? tab;
  final Widget Function(BuildContext context, BoxConstraints constraints)? web;

  const ResponsiveBuilder({
    super.key,
    required this.app,
    this.tab,
    this.web,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth >= ScreenBreakpoints.tabletMax && web != null) {
          return web!(context, constraints);
        } else if (constraints.maxWidth >= ScreenBreakpoints.mobileMax && tab != null) {
          return tab!(context, constraints);
        }
        return app(context, constraints);
      },
    );
  }
}

/// Responsive Grid / Multi-Column Container
class ResponsiveRowColumn extends StatelessWidget {
  final List<Widget> children;
  final double spacing;
  final CrossAxisAlignment crossAxisAlignment;

  const ResponsiveRowColumn({
    super.key,
    required this.children,
    this.spacing = 16.0,
    this.crossAxisAlignment = CrossAxisAlignment.start,
  });

  @override
  Widget build(BuildContext context) {
    final isApp = ScreenBreakpoints.isApp(context);

    if (isApp) {
      return Column(
        crossAxisAlignment: crossAxisAlignment,
        children: children
            .expand((widget) => [widget, SizedBox(height: spacing)])
            .toList()
          ..removeLast(),
      );
    }

    return Row(
      crossAxisAlignment: crossAxisAlignment,
      children: children
          .map((widget) => Expanded(child: widget))
          .expand((widget) => [widget, SizedBox(width: spacing)])
          .toList()
        ..removeLast(),
    );
  }
}
