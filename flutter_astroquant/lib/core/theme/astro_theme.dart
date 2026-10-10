import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AstroTheme {
  // Brand Palette
  static const Color slate950 = Color(0xFF020617);
  static const Color slate900 = Color(0xFF0F172A);
  static const Color slate800 = Color(0xFF1E293B);
  static const Color slate700 = Color(0xFF334155);
  static const Color slate400 = Color(0xFF94A3B8);
  static const Color slate200 = Color(0xFFE2E8F0);
  
  static const Color cyan500 = Color(0xFF06B6D4);
  static const Color cyan400 = Color(0xFF22D3EE);
  static const Color cyan950 = Color(0xFF083344);

  static const Color indigo600 = Color(0xFF4F46E5);
  static const Color indigo500 = Color(0xFF6366F1);
  static const Color indigo950 = Color(0xFF1E1B4B);

  static const Color emerald500 = Color(0xFF10B981);
  static const Color emerald400 = Color(0xFF34D399);
  static const Color emerald950 = Color(0xFF064E3B);

  static const Color rose500 = Color(0xFFF43F5E);
  static const Color rose400 = Color(0xFFFB7185);
  static const Color rose950 = Color(0xFF4C0519);

  static const Color amber500 = Color(0xFFF59E0B);
  static const Color amber400 = Color(0xFFFBBF24);

  static ThemeData get darkTheme {
    final baseText = GoogleFonts.interTextTheme(ThemeData.dark().textTheme);
    
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: slate950,
      primaryColor: cyan500,
      cardColor: slate900,
      colorScheme: const ColorScheme.dark(
        primary: cyan500,
        secondary: indigo500,
        surface: slate900,
        background: slate950,
        error: rose500,
      ),
      textTheme: baseText.copyWith(
        displayLarge: GoogleFonts.inter(fontSize: 32, fontWeight: FontWeight.bold, color: slate200),
        titleLarge: GoogleFonts.inter(fontSize: 20, fontWeight: FontWeight.bold, color: slate200),
        titleMedium: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w600, color: slate200),
        bodyLarge: GoogleFonts.inter(fontSize: 14, color: slate200),
        bodyMedium: GoogleFonts.inter(fontSize: 12, color: slate400),
        labelSmall: GoogleFonts.jetBrainsMono(fontSize: 11, fontWeight: FontWeight.bold),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: slate950,
        elevation: 0,
        centerTitle: false,
      ),
      cardTheme: CardTheme(
        color: slate900,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: slate800, width: 1),
        ),
      ),
    );
  }

  // Planetary Color Mapping
  static Color getPlanetColor(String planet) {
    switch (planet.toLowerCase()) {
      case 'sun':
        return const Color(0xFFF59E0B);
      case 'moon':
        return const Color(0xFFE2E8F0);
      case 'mars':
        return const Color(0xFFEF4444);
      case 'mercury':
        return const Color(0xFF10B981);
      case 'jupiter':
        return const Color(0xFFFBBF24);
      case 'venus':
        return const Color(0xFFEC4899);
      case 'saturn':
        return const Color(0xFF6366F1);
      case 'rahu':
        return const Color(0xFF8B5CF6);
      case 'ketu':
        return const Color(0xFF14B8A6);
      default:
        return cyan500;
    }
  }
}
