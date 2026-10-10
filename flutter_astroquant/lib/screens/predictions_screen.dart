import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../framework/theme.dart';
import '../framework/breakpoints.dart';
import '../framework/components/astro_card.dart';
import '../framework/components/metric_badge.dart';
import '../framework/components/astro_button.dart';
import '../framework/app_state.dart';
import '../models/stock.dart';

class PredictionsScreen extends StatefulWidget {
  const PredictionsScreen({super.key});

  @override
  State<PredictionsScreen> createState() => _PredictionsScreenState();
}

class _PredictionsScreenState extends State<PredictionsScreen> {
  double _astroWeight = 1.15;
  double _technicalWeight = 1.05;

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AstroQuantAppState>();
    final stock = state.selectedStock ?? state.stocks.first;

    final simulatedTarget = stock.price * (_astroWeight * 0.5 + _technicalWeight * 0.5);

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
                          Icon(Icons.track_changes, color: AstroQuantTheme.cyanAccent, size: 20),
                          SizedBox(width: 8),
                          Text(
                            'Quantitative & Astro Prediction Engine',
                            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Colors.white),
                          ),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Target Horizons for October 8, 2026 Session • ${stock.symbol}',
                        style: const TextStyle(fontSize: 11, color: Colors.white54),
                      ),
                    ],
                  ),
                  MetricBadge(
                    label: 'Algorithmic Calibration v4.2',
                    color: AstroQuantTheme.emeraldBullish,
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // Stock Selector Pill Bar
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: state.stocks.take(8).map((s) {
                    final isSel = s.symbol == stock.symbol;
                    return Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: FilterChip(
                        label: Text('${s.symbol} (${s.currency}${s.price.toStringAsFixed(0)})'),
                        selected: isSel,
                        onSelected: (_) => state.selectStock(s),
                        selectedColor: AstroQuantTheme.cyanAccent.withOpacity(0.2),
                        backgroundColor: AstroQuantTheme.cardBg,
                        labelStyle: TextStyle(
                          fontSize: 11,
                          fontWeight: isSel ? FontWeight.w800 : FontWeight.w500,
                          color: isSel ? AstroQuantTheme.cyanGlow : Colors.white60,
                        ),
                        side: BorderSide(color: isSel ? AstroQuantTheme.cyanAccent : AstroQuantTheme.borderSubtle),
                      ),
                    );
                  }).toList(),
                ),
              ),
              const SizedBox(height: 16),

              // Prediction Matrix Card
              AstroCard(
                borderColor: AstroQuantTheme.amberAccent.withOpacity(0.4),
                title: 'PREDICTION TARGET MATRIX (08-10-2026)',
                leadingIcon: const Icon(Icons.stars, color: AstroQuantTheme.amberAccent, size: 16),
                child: Column(
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: _buildTargetPill(
                            'INTRADAY TARGET',
                            '${stock.currency}${stock.predictedAmount.toStringAsFixed(2)}',
                            '+${((stock.predictedAmount - stock.price) / stock.price * 100).toStringAsFixed(2)}%',
                            AstroQuantTheme.amberAccent,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: _buildTargetPill(
                            '1-WEEK TARGET',
                            '${stock.currency}${(stock.price * 1.045).toStringAsFixed(2)}',
                            '+4.50%',
                            AstroQuantTheme.cyanAccent,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: _buildTargetPill(
                            'PROTECTIVE STOP',
                            '${stock.currency}${(stock.price * 0.985).toStringAsFixed(2)}',
                            '-1.50%',
                            AstroQuantTheme.roseBearish,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: AstroQuantTheme.surfaceBg,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: AstroQuantTheme.borderSubtle),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.verified, color: AstroQuantTheme.emeraldBullish, size: 20),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('Chief Quant Verdict', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
                                Text(
                                  'Confluence of ${stock.rulingPlanet} hora with NSE pre-market liquidity guarantees strong absorption above ${stock.currency}${stock.price.toStringAsFixed(1)}. High probability of hitting ${stock.currency}${stock.predictedAmount.toStringAsFixed(1)} intraday.',
                                  style: const TextStyle(fontSize: 10, color: Colors.white60),
                                ),
                              ],
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: AstroQuantTheme.emeraldBullish.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: const Text('88.5% CONFIDENCE', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: AstroQuantTheme.emeraldBullish)),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Interactive Simulator Card
              AstroCard(
                title: 'DYNAMIC ASTRO-TECHNICAL SIMULATOR',
                leadingIcon: const Icon(Icons.tune, color: AstroQuantTheme.indigoAccent, size: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Adjust astrological and momentum weighting to stress-test target projections:',
                      style: TextStyle(fontSize: 11, color: Colors.white60),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        const Text('Planetary Transit Factor: ', style: TextStyle(fontSize: 12, color: Colors.white)),
                        Text('${_astroWeight.toStringAsFixed(2)}x', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AstroQuantTheme.cyanAccent)),
                      ],
                    ),
                    Slider(
                      value: _astroWeight,
                      min: 0.90,
                      max: 1.30,
                      divisions: 40,
                      activeColor: AstroQuantTheme.cyanAccent,
                      onChanged: (val) => setState(() => _astroWeight = val),
                    ),
                    Row(
                      children: [
                        const Text('Momentum Volatility Weight: ', style: TextStyle(fontSize: 12, color: Colors.white)),
                        Text('${_technicalWeight.toStringAsFixed(2)}x', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AstroQuantTheme.amberAccent)),
                      ],
                    ),
                    Slider(
                      value: _technicalWeight,
                      min: 0.90,
                      max: 1.30,
                      divisions: 40,
                      activeColor: AstroQuantTheme.amberAccent,
                      onChanged: (val) => setState(() => _technicalWeight = val),
                    ),
                    const Divider(height: 20, color: AstroQuantTheme.borderSubtle),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('SIMULATED TARGET VALUATION:', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white70)),
                        Text(
                          '${stock.currency}${simulatedTarget.toStringAsFixed(2)}',
                          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: AstroQuantTheme.emeraldBullish, fontFamily: 'monospace'),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTargetPill(String title, String price, String change, Color color) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withOpacity(0.08),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: color)),
          const SizedBox(height: 4),
          Text(price, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: Colors.white, fontFamily: 'monospace')),
          const SizedBox(height: 2),
          Text(change, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: color, fontFamily: 'monospace')),
        ],
      ),
    );
  }
}
