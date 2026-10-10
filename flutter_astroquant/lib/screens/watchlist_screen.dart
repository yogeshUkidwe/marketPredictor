import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../framework/theme.dart';
import '../framework/breakpoints.dart';
import '../framework/components/astro_card.dart';
import '../framework/components/metric_badge.dart';
import '../framework/components/astro_button.dart';
import '../framework/app_state.dart';
import '../models/stock.dart';

class WatchlistScreen extends StatefulWidget {
  const WatchlistScreen({super.key});

  @override
  State<WatchlistScreen> createState() => _WatchlistScreenState();
}

class _WatchlistScreenState extends State<WatchlistScreen> {
  final TextEditingController _searchController = TextEditingController();
  Stock? _searchedStock;
  bool _isSearching = false;

  void _handleSearch(AstroQuantAppState state) async {
    final query = _searchController.text.trim();
    if (query.isEmpty) return;

    setState(() => _isSearching = true);
    final result = await state.searchStock(query);
    setState(() {
      _searchedStock = result;
      _isSearching = false;
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AstroQuantAppState>();
    final activeStocks = state.currentWatchlistStocks;
    final allCategories = state.watchlists.keys.toList();

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Watchlist Header & Mode
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: const [
                          Icon(Icons.star, color: AstroQuantTheme.amberAccent, size: 20),
                          SizedBox(width: 8),
                          Text(
                            'Algorithmic Watchlists',
                            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Colors.white),
                          ),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Session: 08-10-2026 • ${activeStocks.length} tracked assets',
                        style: const TextStyle(fontSize: 11, color: Colors.white54),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: AstroQuantTheme.cyanAccent.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: AstroQuantTheme.cyanAccent.withOpacity(0.3)),
                    ),
                    child: Text(
                      state.activeWatchlistCategory,
                      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AstroQuantTheme.cyanGlow),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 14),

              // Category Tabs (Horizontal Scroll)
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: allCategories.map((category) {
                    final isSelected = category == state.activeWatchlistCategory;
                    final count = state.watchlists[category]?.length ?? 0;

                    return Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: ChoiceChip(
                        label: Text('$category ($count)'),
                        selected: isSelected,
                        onSelected: (_) => state.setActiveWatchlistCategory(category),
                        selectedColor: AstroQuantTheme.cyanAccent.withOpacity(0.2),
                        backgroundColor: AstroQuantTheme.cardBg,
                        labelStyle: TextStyle(
                          fontSize: 11,
                          fontWeight: isSelected ? FontWeight.w800 : FontWeight.w500,
                          color: isSelected ? AstroQuantTheme.cyanGlow : Colors.white60,
                        ),
                        side: BorderSide(
                          color: isSelected ? AstroQuantTheme.cyanAccent : AstroQuantTheme.borderSubtle,
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ),
              const SizedBox(height: 16),

              // Search & Import Bar
              AstroCard(
                padding: const EdgeInsets.all(12),
                backgroundColor: const Color(0xFF090E1D),
                borderColor: AstroQuantTheme.indigoAccent.withOpacity(0.3),
                child: Column(
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: TextField(
                            controller: _searchController,
                            style: const TextStyle(fontSize: 13, color: Colors.white),
                            decoration: const InputDecoration(
                              hintText: 'Search stock symbol to import & add (e.g. TCS, RELIANCE, ZOMATO)...',
                              prefixIcon: Icon(Icons.search, size: 18, color: AstroQuantTheme.cyanAccent),
                              contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                            ),
                            onSubmitted: (_) => _handleSearch(state),
                          ),
                        ),
                        const SizedBox(width: 8),
                        AstroButton(
                          onPressed: () => _handleSearch(state),
                          icon: _isSearching ? Icons.hourglass_top : Icons.bolt,
                          label: _isSearching ? 'Fetching...' : 'Lookup',
                        ),
                      ],
                    ),
                    if (_searchedStock != null) ...[
                      const SizedBox(height: 12),
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: AstroQuantTheme.surfaceBg,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: AstroQuantTheme.cyanAccent.withOpacity(0.5)),
                        ),
                        child: Row(
                          children: [
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Text(
                                        _searchedStock!.symbol,
                                        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w900, color: Colors.white),
                                      ),
                                      const SizedBox(width: 6),
                                      Text(
                                        '(${_searchedStock!.name})',
                                        style: const TextStyle(fontSize: 11, color: Colors.white54),
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 4),
                                  Row(
                                    children: [
                                      Text(
                                        'Price: ${_searchedStock!.currency}${_searchedStock!.price.toStringAsFixed(2)}',
                                        style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white, fontFamily: 'monospace'),
                                      ),
                                      const SizedBox(width: 10),
                                      Text(
                                        '08-10-2026 Target: ${_searchedStock!.currency}${_searchedStock!.predictedAmount.toStringAsFixed(2)}',
                                        style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: AstroQuantTheme.amberAccent, fontFamily: 'monospace'),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                            AstroButton(
                              onPressed: () {
                                state.addCustomStock(_searchedStock!, addToWatchlist: true);
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text('Added ${_searchedStock!.symbol} to ${state.activeWatchlistCategory}'),
                                    backgroundColor: AstroQuantTheme.emeraldBullish,
                                    duration: const Duration(seconds: 2),
                                  ),
                                );
                                setState(() => _searchedStock = null);
                                _searchController.clear();
                              },
                              icon: Icons.add_circle,
                              label: '+ Add to Watchlist',
                              color: AstroQuantTheme.amberAccent,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Watchlist Stocks Grid / List
              if (activeStocks.isEmpty)
                AstroCard(
                  padding: const EdgeInsets.all(32),
                  child: Center(
                    child: Column(
                      children: [
                        const Icon(Icons.star_border, size: 40, color: Colors.white30),
                        const SizedBox(height: 8),
                        Text(
                          'No stocks pinned to "${state.activeWatchlistCategory}" yet.',
                          style: const TextStyle(color: Colors.white60, fontSize: 13),
                        ),
                        const SizedBox(height: 12),
                        AstroButton(
                          onPressed: () {
                            if (state.stocks.isNotEmpty) {
                              state.toggleWatchlist(state.stocks.first.symbol);
                            }
                          },
                          label: 'Add Default Stock',
                          isOutlined: true,
                        ),
                      ],
                    ),
                  ),
                )
              else
                ...activeStocks.map((stock) => _buildStockTile(context, state, stock)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStockTile(BuildContext context, AstroQuantAppState state, Stock stock) {
    final isIn = state.isInWatchlist(stock.symbol);

    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: AstroCard(
        padding: const EdgeInsets.all(12),
        onTap: () {
          state.selectStock(stock);
          state.setIndex(0); // Jump to Terminal
        },
        child: Row(
          children: [
            // Planet Icon / Initial
            Container(
              width: 38,
              height: 38,
              decoration: BoxDecoration(
                color: AstroQuantTheme.indigoAccent.withOpacity(0.18),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: AstroQuantTheme.indigoAccent.withOpacity(0.4)),
              ),
              child: Center(
                child: Text(
                  stock.symbol.substring(0, 1),
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: AstroQuantTheme.cyanGlow),
                ),
              ),
            ),
            const SizedBox(width: 12),

            // Stock Details
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        stock.symbol,
                        style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: Colors.white),
                      ),
                      const SizedBox(width: 6),
                      Text(
                        stock.exchange,
                        style: const TextStyle(fontSize: 10, color: Colors.white38),
                      ),
                      const SizedBox(width: 6),
                      MetricBadge(label: stock.rulingPlanet, color: AstroQuantTheme.amberAccent),
                    ],
                  ),
                  const SizedBox(height: 2),
                  Text(
                    stock.name,
                    style: const TextStyle(fontSize: 11, color: Colors.white54),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),

            // Price & Prediction Target
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  '${stock.currency}${stock.price.toStringAsFixed(2)}',
                  style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: Colors.white, fontFamily: 'monospace'),
                ),
                const SizedBox(height: 2),
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Text('Target: ', style: TextStyle(fontSize: 10, color: Colors.white38)),
                    Text(
                      '${stock.currency}${stock.predictedAmount.toStringAsFixed(2)}',
                      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: AstroQuantTheme.amberAccent, fontFamily: 'monospace'),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(width: 12),

            // Toggle Button
            IconButton(
              icon: Icon(
                isIn ? Icons.star : Icons.star_border,
                color: isIn ? AstroQuantTheme.amberAccent : Colors.white38,
                size: 22,
              ),
              onPressed: () => state.toggleWatchlist(stock.symbol),
            ),
          ],
        ),
      ),
    );
  }
}
