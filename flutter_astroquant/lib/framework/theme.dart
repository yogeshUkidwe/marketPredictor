import 'package:flutter/material.dart';

/// AstroQuant Cosmic Theme System
/// High-contrast accessible theme designed for all age criteria
class AstroQuantTheme {
  // Cosmic Palette Colors (High Contrast)
  static const Color scaffoldBg = Color(0xFF020617); // Slate 950
  static const Color surfaceBg = Color(0xFF0B0F19);  // Slate 900
  static const Color cardBg = Color(0xFF0F172A);     // Slate 900/800
  static const Color borderSubtle = Color(0xFF334155); // Slate 700 (High-contrast, clearly defined)
  static const Color borderHighlight = Color(0xFF64748B); // Slate 500

  // Brand Accents (Vibrant & WCAG AAA Compliant)
  static const Color cyanAccent = Color(0xFF06B6D4);   // Cyan 500
  static const Color cyanGlow = Color(0xFF38BDF8);     // Cyan 400
  static const Color indigoAccent = Color(0xFF818CF8); // Indigo 400
  static const Color amberAccent = Color(0xFFFBBF24);  // Amber 400
  static const Color emeraldBullish = Color(0xFF34D399); // Emerald 400
  static const Color roseBearish = Color(0xFFFB7185);   // Rose 400
  static const Color purpleAstro = Color(0xFFC084FC);   // Purple 400

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
          side: const BorderSide(color: borderSubtle, width: 1.5),
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
          fontWeight: FontWeight.w900,
          letterSpacing: -0.5,
        ),
        iconTheme: IconThemeData(color: Colors.white),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: scaffoldBg,
        surfaceTintColor: Colors.transparent,
        indicatorColor: cyanAccent.withOpacity(0.25),
        iconTheme: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) {
            return const IconThemeData(color: cyanGlow, size: 24);
          }
          return const IconThemeData(color: Colors.white70, size: 22);
        }),
        labelTextStyle: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) {
            return const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w800,
              color: cyanGlow,
            );
          }
          return const TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w600,
            color: Colors.white70,
          );
        }),
      ),
      navigationRailTheme: NavigationRailThemeData(
        backgroundColor: surfaceBg,
        indicatorColor: cyanAccent.withOpacity(0.25),
        selectedIconTheme: const IconThemeData(color: cyanGlow, size: 26),
        unselectedIconTheme: const IconThemeData(color: Colors.white70, size: 22),
        selectedLabelTextStyle: const TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w800,
          color: cyanGlow,
        ),
        unselectedLabelTextStyle: const TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: Colors.white70,
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: surfaceBg,
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: borderSubtle, width: 1.5),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: borderSubtle, width: 1.5),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: cyanAccent, width: 2),
        ),
        hintStyle: const TextStyle(color: Colors.white60, fontSize: 13),
      ),
      dividerTheme: const DividerThemeData(
        color: borderSubtle,
        thickness: 1.5,
        space: 1,
      ),
      textTheme: const TextTheme(
        headlineMedium: TextStyle(
          color: Colors.white,
          fontSize: 26,
          fontWeight: FontWeight.w900,
          letterSpacing: -0.5,
        ),
        titleLarge: TextStyle(
          color: Colors.white,
          fontSize: 20,
          fontWeight: FontWeight.w800,
        ),
        titleMedium: TextStyle(
          color: Colors.white,
          fontSize: 16,
          fontWeight: FontWeight.w700,
        ),
        bodyLarge: TextStyle(
          color: Colors.white,
          fontSize: 14,
          fontWeight: FontWeight.w500,
        ),
        bodyMedium: TextStyle(
          color: Color(0xFFF1F5F9), // Slate 100
          fontSize: 13,
          fontWeight: FontWeight.w500,
        ),
        bodySmall: TextStyle(
          color: Color(0xFFCBD5E1), // Slate 300
          fontSize: 12,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}
