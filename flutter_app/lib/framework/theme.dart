import 'package:flutter/material.dart';

/// AstroQuant Cosmic Theme System
/// Designed for high-frequency algorithmic finance combined with Vedic astrology
class AstroQuantTheme {
  // Cosmic Palette Colors
  static const Color scaffoldBg = Color(0xFF020617); // Slate 950
  static const Color surfaceBg = Color(0xFF0B0F19);  // Slate 900
  static const Color cardBg = Color(0xFF0F172A);     // Slate 900/800
  static const Color borderSubtle = Color(0xFF1E293B); // Slate 800
  static const Color borderHighlight = Color(0xFF334155); // Slate 700

  // Brand Accents
  static const Color cyanAccent = Color(0xFF06B6D4);   // Cyan 500
  static const Color cyanGlow = Color(0xFF22D3EE);     // Cyan 400
  static const Color indigoAccent = Color(0xFF6366F1); // Indigo 500
  static const Color amberAccent = Color(0xFFF59E0B);  // Amber 500
  static const Color emeraldBullish = Color(0xFF10B981); // Emerald 500
  static const Color roseBearish = Color(0xFFF43F5E);   // Rose 500
  static const Color purpleAstro = Color(0xFFA855F7);   // Purple 500

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: scaffoldBg,
      primaryColor: cyanAccent,
      colorScheme: const ColorScheme.dark(
        primary: cyanAccent,
        secondary: indigoAccent,
        tertiary: amberAccent,
        surface: surfaceBg,
        error: roseBearish,
      ),
      cardTheme: CardTheme(
        color: cardBg,
        elevation: 0,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: borderSubtle, width: 1),
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: scaffoldBg,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          color: Colors.white,
          fontSize: 18,
          fontWeight: FontWeight.w800,
          letterSpacing: -0.5,
        ),
        iconTheme: IconThemeData(color: Colors.white70),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: scaffoldBg,
        surfaceTintColor: Colors.transparent,
        indicatorColor: cyanAccent.withOpacity(0.18),
        iconTheme: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) {
            return const IconThemeData(color: cyanGlow, size: 22);
          }
          return const IconThemeData(color: Colors.white60, size: 20);
        }),
        labelTextStyle: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) {
            return const TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w700,
              color: cyanGlow,
            );
          }
          return const TextStyle(
            fontSize: 10,
            fontWeight: FontWeight.w500,
            color: Colors.white60,
          );
        }),
      ),
      navigationRailTheme: NavigationRailThemeData(
        backgroundColor: surfaceBg,
        indicatorColor: cyanAccent.withOpacity(0.2),
        selectedIconTheme: const IconThemeData(color: cyanGlow),
        unselectedIconTheme: const IconThemeData(color: Colors.white60),
        selectedLabelTextStyle: const TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w700,
          color: cyanGlow,
        ),
        unselectedLabelTextStyle: const TextStyle(
          fontSize: 11,
          color: Colors.white60,
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: surfaceBg,
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: borderSubtle),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: borderSubtle),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: cyanAccent, width: 1.5),
        ),
        hintStyle: const TextStyle(color: Colors.white38, fontSize: 13),
      ),
      dividerTheme: const DividerThemeData(
        color: borderSubtle,
        thickness: 1,
        space: 1,
      ),
      textTheme: const TextTheme(
        headlineMedium: TextStyle(
          color: Colors.white,
          fontSize: 24,
          fontWeight: FontWeight.w900,
          letterSpacing: -0.5,
        ),
        titleLarge: TextStyle(
          color: Colors.white,
          fontSize: 18,
          fontWeight: FontWeight.w800,
        ),
        titleMedium: TextStyle(
          color: Colors.white,
          fontSize: 15,
          fontWeight: FontWeight.w700,
        ),
        bodyLarge: TextStyle(
          color: Colors.white,
          fontSize: 14,
        ),
        bodyMedium: TextStyle(
          color: Colors.white70,
          fontSize: 12,
        ),
        bodySmall: TextStyle(
          color: Colors.white54,
          fontSize: 11,
        ),
      ),
    );
  }
}
