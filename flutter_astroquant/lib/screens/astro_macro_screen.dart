import 'package:flutter/material.dart';
import '../framework/theme.dart';
import '../framework/components/astro_card.dart';
import '../framework/components/metric_badge.dart';
import '../models/planetary_transit.dart';

class AstroMacroScreen extends StatelessWidget {
  const AstroMacroScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final transits = PlanetaryTransit.getOctober8Transits();

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: const [
                          Icon(Icons.explore, color: AstroQuantTheme.purpleAstro, size: 20),
                          SizedBox(width: 8),
                          Text(
                            'Cosmic Macro & Planetary Ephemeris',
                            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Colors.white),
                          ),
                        ],
                      ),
                      const SizedBox(height: 2),
                      const Text(
                        'Vedic Transit Alignments for October 8, 2026 Trading Session',
                        style: TextStyle(fontSize: 11, color: Colors.white54),
                      ),
                    ],
                  ),
                  MetricBadge(
                    label: 'Vedic Kundli Live',
                    icon: Icons.auto_awesome,
                    color: AstroQuantTheme.amberAccent,
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // Planetary Ephemeris Cards
              AstroCard(
                title: 'OCTOBER 8, 2026 PLANETARY EPHEMERIS POSITIONS',
                leadingIcon: const Icon(Icons.wb_sunny_outlined, color: AstroQuantTheme.amberAccent, size: 16),
                child: Column(
                  children: transits.map((transit) {
                    final isBullish = transit.energy.toLowerCase().contains('bullish') ||
                        transit.energy.toLowerCase().contains('expansion');
                    final energyColor = isBullish ? AstroQuantTheme.emeraldBullish : AstroQuantTheme.cyanAccent;

                    return Container(
                      margin: const EdgeInsets.only(bottom: 12),
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: AstroQuantTheme.surfaceBg,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: AstroQuantTheme.borderSubtle),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                children: [
                                  Text(
                                    transit.planet,
                                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: Colors.white),
                                  ),
                                  const SizedBox(width: 8),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: AstroQuantTheme.purpleAstro.withOpacity(0.15),
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                    child: Text(
                                      '${transit.sign} (${transit.degree})',
                                      style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AstroQuantTheme.purpleAstro),
                                    ),
                                  ),
                                ],
                              ),
                              MetricBadge(label: transit.energy, color: energyColor),
                            ],
                          ),
                          const SizedBox(height: 6),
                          Row(
                            children: [
                              const Text('Nakshatra: ', style: TextStyle(fontSize: 10, color: Colors.white54)),
                              Text(transit.nakshatra, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white70)),
                              const SizedBox(width: 12),
                              const Text('Key Sector: ', style: TextStyle(fontSize: 10, color: Colors.white54)),
                              Text(transit.favoredSector, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AstroQuantTheme.cyanGlow)),
                            ],
                          ),
                          const SizedBox(height: 6),
                          Text(
                            transit.description,
                            style: const TextStyle(fontSize: 11, color: Colors.white60),
                          ),
                        ],
                      ),
                    );
                  }).toList(),
                ),
              ),
              const SizedBox(height: 16),

              // Planetary Sector Correlations
              AstroCard(
                title: 'SECTOR PLANETARY RULERSHIP MATRIX',
                leadingIcon: const Icon(Icons.account_tree_outlined, color: AstroQuantTheme.cyanAccent, size: 16),
                child: Column(
                  children: [
                    _buildSectorRow('Information Technology (IT)', 'Mercury (Budh)', 'TCS, Infosys, Wipro', 'Exalted in Swati - High Accumulation', AstroQuantTheme.emeraldBullish),
                    _buildSectorRow('Banking & Private Credit', 'Jupiter (Guru)', 'HDFC Bank, ICICI, SBI', 'Trine Aspect - Bullish Liquidity', AstroQuantTheme.emeraldBullish),
                    _buildSectorRow('Oil, Gas & Energy', 'Sun (Surya)', 'Reliance, ONGC, NTPC', 'Sun in 10th House - Institutional Flow', AstroQuantTheme.amberAccent),
                    _buildSectorRow('Auto & Aerospace', 'Mars (Mangal)', 'Tata Motors, BEL, HAL', 'Pushya Transit - High Volatility', AstroQuantTheme.cyanAccent),
                    _buildSectorRow('Consumer & Retail', 'Venus (Shukra)', 'Zomato, Trent, Titan', 'Festive Venus - Expansion', AstroQuantTheme.purpleAstro),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectorRow(String sector, String planet, String stocks, String status, Color statusColor) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
      decoration: BoxDecoration(
        color: AstroQuantTheme.surfaceBg,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AstroQuantTheme.borderSubtle),
      ),
      child: Row(
        children: [
          Expanded(
            flex: 4,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(sector, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
                Text(stocks, style: const TextStyle(fontSize: 9, color: Colors.white54)),
              ],
            ),
          ),
          Expanded(
            flex: 3,
            child: Text(planet, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AstroQuantTheme.cyanAccent)),
          ),
          Expanded(
            flex: 4,
            child: Text(status, style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: statusColor)),
          ),
        ],
      ),
    );
  }
}
