class PlanetaryTransit {
  final String planet;
  final String sign;
  final String nakshatra;
  final String degree;
  final bool isRetrograde;
  final String energy; // Bullish, Bearish, Volatile
  final String favoredSector;
  final String description;

  const PlanetaryTransit({
    required this.planet,
    required this.sign,
    required this.nakshatra,
    required this.degree,
    required this.isRetrograde,
    required this.energy,
    required this.favoredSector,
    required this.description,
  });

  static List<PlanetaryTransit> getOctober8Transits() {
    return const [
      PlanetaryTransit(
        planet: 'Sun (Surya)',
        sign: 'Virgo (Kanya)',
        nakshatra: 'Chitra',
        degree: '21° 14\'',
        isRetrograde: false,
        energy: 'Bullish',
        favoredSector: 'Power, Energy & PSU',
        description: 'Sun in trine with Mars provides high institutional cash flow into Energy and Infrastructure.'
      ),
      PlanetaryTransit(
        planet: 'Mercury (Budh)',
        sign: 'Libra (Tula)',
        nakshatra: 'Swati',
        degree: '04° 48\'',
        isRetrograde: false,
        energy: 'Strong Bullish',
        favoredSector: 'Technology, AI & Media',
        description: 'Mercury ruling intellect and IT enters Rahu-ruled Swati nakshatra creating sharp technical breakouts in TCS and INFY.'
      ),
      PlanetaryTransit(
        planet: 'Jupiter (Brihaspati)',
        sign: 'Gemini (Mithuna)',
        nakshatra: 'Punarvasu',
        degree: '26° 02\'',
        isRetrograde: false,
        energy: 'Expansion',
        favoredSector: 'Banking & Financials',
        description: 'Jupiter aspecting 9th and 11th houses bolsters private banking liquidity, maintaining HDFC and ICICI strength.'
      ),
      PlanetaryTransit(
        planet: 'Mars (Mangal)',
        sign: 'Cancer (Karka)',
        nakshatra: 'Pushya',
        degree: '08° 30\'',
        isRetrograde: false,
        energy: 'High Volatility',
        favoredSector: 'Defense & Auto',
        description: 'Mars debilitation mitigated by lunar mutual aspect. Fast intra-day swings in Tata Motors & BEL.'
      ),
      PlanetaryTransit(
        planet: 'Venus (Shukra)',
        sign: 'Scorpio (Vrischika)',
        nakshatra: 'Anuradha',
        degree: '16° 55\'',
        isRetrograde: false,
        energy: 'Stable',
        favoredSector: 'Luxury & Consumption',
        description: 'Venus brings festive consumer demand to Titan, Trent, and Retail momentum.'
      ),
      PlanetaryTransit(
        planet: 'Saturn (Shani)',
        sign: 'Aquarius (Kumbha)',
        nakshatra: 'Purva Bhadrapada',
        degree: '19° 40\'',
        isRetrograde: true,
        energy: 'Structural Support',
        favoredSector: 'Metals & Mining',
        description: 'Saturn moolatrikona retrograde forms robust floor support under Tata Steel and Hindalco.'
      ),
    ];
  }
}
