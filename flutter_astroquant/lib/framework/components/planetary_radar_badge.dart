import 'package:flutter/material.dart';
import '../theme.dart';

/// Cosmic Planetary Ruler Badge with Astrological Glyph & Energy Level
class PlanetaryRadarBadge extends StatelessWidget {
  final String planet;
  final String? nakshatra;
  final double astroZScore;

  const PlanetaryRadarBadge({
    super.key,
    required this.planet,
    this.nakshatra,
    this.astroZScore = 1.84,
  });

  String _getPlanetGlyph(String name) {
    switch (name.toLowerCase()) {
      case 'sun':
      case 'surya':
        return '☉';
      case 'moon':
      case 'chandra':
        return '☽';
      case 'mars':
      case 'mangal':
        return '♂';
      case 'mercury':
      case 'budh':
        return '☿';
      case 'jupiter':
      case 'guru':
      case 'brihaspati':
        return '♃';
      case 'venus':
      case 'shukra':
        return '♀';
      case 'saturn':
      case 'shani':
        return '♄';
      case 'rahu':
        return '☊';
      case 'ketu':
        return '☋';
      default:
        return '✦';
    }
  }

  Color _getPlanetColor(String name) {
    switch (name.toLowerCase()) {
      case 'sun':
        return AstroQuantTheme.amberAccent;
      case 'moon':
        return const Color(0xFFE2E8F0);
      case 'mars':
        return AstroQuantTheme.roseBearish;
      case 'mercury':
        return AstroQuantTheme.emeraldBullish;
      case 'jupiter':
        return const Color(0xFFFBBF24);
      case 'venus':
        return const Color(0xFFEC4899);
      case 'saturn':
      case 'rahu':
      case 'ketu':
        return AstroQuantTheme.purpleAstro;
      default:
        return AstroQuantTheme.cyanAccent;
    }
  }

  @override
  Widget build(BuildContext context) {
    final glyph = _getPlanetGlyph(planet);
    final color = _getPlanetColor(planet);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: color.withOpacity(0.12),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: color.withOpacity(0.4), width: 1),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            padding: const EdgeInsets.all(3),
            decoration: BoxDecoration(
              color: color.withOpacity(0.2),
              shape: BoxShape.circle,
            ),
            child: Text(
              glyph,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w900,
                color: color,
              ),
            ),
          ),
          const SizedBox(width: 6),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                planet,
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w800,
                  color: color,
                ),
              ),
              if (nakshatra != null)
                Text(
                  nakshatra!,
                  style: const TextStyle(
                    fontSize: 9,
                    color: Colors.white60,
                  ),
                ),
            ],
          ),
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1.5),
            decoration: BoxDecoration(
              color: Colors.black38,
              borderRadius: BorderRadius.circular(4),
              border: Border.all(color: color.withOpacity(0.3)),
            ),
            child: Text(
              'Z: +${astroZScore.toStringAsFixed(2)}',
              style: TextStyle(
                fontSize: 9,
                fontWeight: FontWeight.w700,
                color: color,
                fontFamily: 'monospace',
              ),
            ),
          ),
        ],
      ),
    );
  }
}
