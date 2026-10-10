import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../framework/theme.dart';
import '../framework/breakpoints.dart';
import '../framework/components/astro_card.dart';
import '../framework/components/metric_badge.dart';
import '../framework/components/astro_button.dart';
import '../framework/components/sparkline_chart.dart';
import '../framework/components/planetary_radar_badge.dart';
import '../framework/app_state.dart';
import '../models/stock.dart';

class TerminalScreen extends StatelessWidget {
  const TerminalScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AstroQuantAppState>();
    final stock = state.selectedStock ?? (state.stocks.isNotEmpty ? state.stocks.first : null);

    if (stock == null) {
      return const Center(child: CircularProgressIndicator());
    }

    return ResponsiveBuilder(
      app: (context, _) => _buildAppView(context, state, stock),
      tab: (context, _) => _buildTabView(context, state, stock),
      web: (context, _) => _buildWebView(context, state, stock),
    );
  }

  // App / Mobile Layout (< 640px)
  Widget _buildAppView(BuildContext context, AstroQuantAppState state, Stock stock) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _buildHeroCard(context, state, stock),
          const SizedBox(height: 12),
          _buildChartCard(stock),
          const SizedBox(height: 12),
          _buildAstroQuantMatrix(stock),
          const SizedBox(height: 12),
          _buildOrderBookTape(stock),
        ],
      ),
    );
  }

  // Tablet Layout (640px - 1024px)
  Widget _buildTabView(BuildContext context, AstroQuantAppState state, Stock stock) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          _buildHeroCard(context, state, stock),
          const SizedBox(height: 16),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                flex: 6,
                child: Column(
                  children: [
                    _buildChartCard(stock),
                    const SizedBox(height: 16),
                    _buildOrderBookTape(stock),
                  ],
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                flex: 4,
                child: _buildAstroQuantMatrix(stock),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // Web / Desktop Layout (>= 1024px)
  Widget _buildWebView(BuildContext context, AstroQuantAppState state, Stock stock) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          _buildHeroCard(context, state, stock),
          const SizedBox(height: 20),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                flex: 7,
                child: Column(
                  children: [
                    _buildChartCard(stock),
                    const SizedBox(height: 20),
                    Row(
                      children: [
                        Expanded(child: _buildOrderBookTape(stock)),
                        const SizedBox(width: 16),
                        Expanded(child: _buildKeyMetricsCard(stock)),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 20),
              Expanded(
                flex: 5,
                child: _buildAstroQuantMatrix(stock),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildHeroCard(BuildContext context, AstroQuantAppState state, Stock stock) {
    final isInWatchlist = state.isInWatchlist(stock.symbol);

    return AstroCard(
      borderColor: AstroQuantTheme.cyanAccent.withOpacity(0.4),
      backgroundColor: const Color(0xFF070D1D),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: AstroQuantTheme.cyanAccent.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AstroQuantTheme.cyanAccent.withOpacity(0.4)),
                ),
                child: const Icon(Icons.show_chart, color: AstroQuantTheme.cyanGlow, size: 24),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          stock.symbol,
                          style: const TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.w900,
                            letterSpacing: -0.5,
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: AstroQuantTheme.borderSubtle,
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            stock.exchange,
                            style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white70),
                          ),
                        ),
                        const SizedBox(width: 6),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: AstroQuantTheme.indigoAccent.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(4),
                            border: Border.all(color: AstroQuantTheme.indigoAccent.withOpacity(0.5)),
                          ),
                          child: Text(
                            stock.sector,
                            style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AstroQuantTheme.indigoAccent),
                          ),
                        ),
                      ],
                    ),
                    Text(
                      stock.name,
                      style: const TextStyle(fontSize: 12, color: Colors.white60),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
              AstroButton(
                onPressed: () => state.toggleWatchlist(stock.symbol),
                isOutlined: !isInWatchlist,
                icon: isInWatchlist ? Icons.star : Icons.star_border,
                label: isInWatchlist ? 'Watchlist' : '+ Watchlist',
                color: isInWatchlist ? AstroQuantTheme.amberAccent : AstroQuantTheme.cyanAccent,
              ),
            ],
          ),
          const SizedBox(height: 16),
          const Divider(height: 1, color: AstroQuantTheme.borderSubtle),
          const SizedBox(height: 14),
          Wrap(
            spacing: 16,
            runSpacing: 12,
            crossAxisAlignment: WrapCrossAlignment.center,
            alignment: WrapAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('CURRENT LIVE PRICE', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Colors.white54, letterSpacing: 0.5)),
                  const SizedBox(height: 2),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.baseline,
                    textBaseline: TextBaseline.alphabetic,
                    children: [
                      Text(
                        '${stock.currency}${stock.price.toStringAsFixed(2)}',
                        style: const TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.w900,
                          color: Colors.white,
                          fontFamily: 'monospace',
                        ),
                      ),
                      const SizedBox(width: 8),
                      TrendBadge(change: stock.change, changePercent: stock.changePercent),
                    ],
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      AstroQuantTheme.amberAccent.withOpacity(0.15),
                      AstroQuantTheme.indigoAccent.withOpacity(0.12),
                    ],
                  ),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AstroQuantTheme.amberAccent.withOpacity(0.4)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: const [
                        Icon(Icons.lock_clock, size: 12, color: AstroQuantTheme.amberAccent),
                        SizedBox(width: 4),
                        Text('08-10-2026 PREDICTED TARGET', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: AstroQuantTheme.amberAccent)),
                      ],
                    ),
                    const SizedBox(height: 2),
                    Text(
                      '${stock.currency}${stock.predictedAmount.toStringAsFixed(2)}',
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w900,
                        color: AstroQuantTheme.amberAccent,
                        fontFamily: 'monospace',
                      ),
                    ),
                  ],
                ),
              ),
              PlanetaryRadarBadge(
                planet: stock.rulingPlanet,
                nakshatra: stock.nakshatra,
                astroZScore: stock.astroZScore,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildChartCard(Stock stock) {
    return AstroCard(
      title: 'INTRADAY LIVE VOLATILITY & PREDICTED TARGET BAND',
      leadingIcon: const Icon(Icons.timeline, color: AstroQuantTheme.cyanAccent, size: 16),
      trailingAction: Row(
        mainAxisSize: MainAxisSize.min,
        children: const [
          MetricBadge(label: '1m Ticks', color: AstroQuantTheme.cyanAccent),
          SizedBox(width: 6),
          MetricBadge(label: 'Target Line --', color: AstroQuantTheme.amberAccent),
        ],
      ),
      child: Column(
        children: [
          SparklineChart(
            points: stock.sparklineHistory.isNotEmpty ? stock.sparklineHistory : [stock.price * 0.99, stock.price],
            targetPrice: stock.predictedAmount,
            height: 140,
          ),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('24h Low: ${stock.currency}${stock.low24h.toStringAsFixed(2)}', style: const TextStyle(fontSize: 10, color: Colors.white54, fontFamily: 'monospace')),
              Text('24h High: ${stock.currency}${stock.high24h.toStringAsFixed(2)}', style: const TextStyle(fontSize: 10, color: Colors.white54, fontFamily: 'monospace')),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildAstroQuantMatrix(Stock stock) {
    return AstroCard(
      title: 'VEDIC ASTROLOGY & QUANTITATIVE CONFLUENCE',
      leadingIcon: const Icon(Icons.blur_on, color: AstroQuantTheme.purpleAstro, size: 16),
      child: Column(
        children: [
          _buildMatrixRow('Ruling Planet', stock.rulingPlanet, AstroQuantTheme.amberAccent),
          _buildMatrixRow('Lunar Nakshatra', stock.nakshatra, Colors.white70),
          _buildMatrixRow('Astro-Z Composite Score', '+${stock.astroZScore.toStringAsFixed(2)} (High Alpha)', AstroQuantTheme.emeraldBullish),
          _buildMatrixRow('RSI (14 Momentum)', '64.2 (Bullish Expansion)', AstroQuantTheme.cyanAccent),
          _buildMatrixRow('Supertrend (10, 3)', 'GREEN (Stop @ ${stock.currency}${(stock.price * 0.985).toStringAsFixed(1)})', AstroQuantTheme.emeraldBullish),
          _buildMatrixRow('Planetary Hora Window', 'Mercury Hora Active (9:15 AM - 10:15 AM)', AstroQuantTheme.amberAccent),
          _buildMatrixRow('Algorithmic Target Confidence', '88.4% Probability', AstroQuantTheme.cyanGlow),
        ],
      ),
    );
  }

  Widget _buildMatrixRow(String label, String value, Color valColor) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 11, color: Colors.white60)),
          Text(value, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: valColor)),
        ],
      ),
    );
  }

  Widget _buildOrderBookTape(Stock stock) {
    return AstroCard(
      title: 'LIVE INSTITUTIONAL ORDER DEPTH (NSE LEVEL 2)',
      leadingIcon: const Icon(Icons.density_medium, color: AstroQuantTheme.cyanAccent, size: 16),
      child: Column(
        children: [
          Row(
            children: const [
              Expanded(child: Text('BID VOL', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AstroQuantTheme.emeraldBullish))),
              Expanded(child: Text('BID PRICE', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AstroQuantTheme.emeraldBullish))),
              Expanded(child: Text('ASK PRICE', textAlign: TextAlign.right, style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AstroQuantTheme.roseBearish))),
              Expanded(child: Text('ASK VOL', textAlign: TextAlign.right, style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AstroQuantTheme.roseBearish))),
            ],
          ),
          const SizedBox(height: 6),
          _buildDepthRow((stock.price - 0.50), '4,200', (stock.price + 0.10), '2,150'),
          _buildDepthRow((stock.price - 1.20), '12,850', (stock.price + 0.80), '5,400'),
          _buildDepthRow((stock.price - 2.00), '28,100', (stock.price + 1.50), '9,800'),
        ],
      ),
    );
  }

  Widget _buildDepthRow(double bidP, String bidV, double askP, String askV) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 3),
      child: Row(
        children: [
          Expanded(child: Text(bidV, style: const TextStyle(fontSize: 10, color: Colors.white70, fontFamily: 'monospace'))),
          Expanded(child: Text(bidP.toStringAsFixed(2), style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: AstroQuantTheme.emeraldBullish, fontFamily: 'monospace'))),
          Expanded(child: Text(askP.toStringAsFixed(2), textAlign: TextAlign.right, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: AstroQuantTheme.roseBearish, fontFamily: 'monospace'))),
          Expanded(child: Text(askV, textAlign: TextAlign.right, style: const TextStyle(fontSize: 10, color: Colors.white70, fontFamily: 'monospace'))),
        ],
      ),
    );
  }

  Widget _buildKeyMetricsCard(Stock stock) {
    return AstroCard(
      title: 'FUNDAMENTAL & SECTOR MULTIPLES',
      leadingIcon: const Icon(Icons.pie_chart_outline, color: AstroQuantTheme.indigoAccent, size: 16),
      child: Column(
        children: [
          _buildMatrixRow('Market Capitalization', stock.marketCap, Colors.white),
          _buildMatrixRow('Trailing P/E Ratio', stock.pe.toStringAsFixed(1), Colors.white),
          _buildMatrixRow('Average Daily Volume', stock.volume, Colors.white),
          _buildMatrixRow('Beta (Volatility)', '1.08', Colors.white),
        ],
      ),
    );
  }
}
