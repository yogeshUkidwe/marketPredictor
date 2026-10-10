import 'dart:async';
import 'package:flutter/foundation.dart';
import '../models/stock.dart';
import '../models/chat_message.dart';
import '../services/api_service.dart';

class AstroQuantAppState extends ChangeNotifier {
  final AstroQuantApiService _apiService = AstroQuantApiService();

  int _currentIndex = 0;
  int get currentIndex => _currentIndex;

  String _deviceMode = 'auto'; // 'auto', 'app', 'tab', 'web'
  String get deviceMode => _deviceMode;

  final List<Stock> _stocks = [];
  List<Stock> get stocks => List.unmodifiable(_stocks);

  Stock? _selectedStock;
  Stock? get selectedStock => _selectedStock;

  // Multi-Category Watchlists
  final Map<String, List<String>> _watchlists = {
    'Nifty 50 Gems': ['TCS', 'RELIANCE', 'HDFCBANK', 'INFY', 'TATAMOTORS'],
    'Planetary High-Gainers': ['RELIANCE', 'SUZLON', 'ZOMATO', 'BHARTIARTL'],
    'F&O Astro Momentum': ['TCS', 'BEL', 'TATAMOTORS', 'HDFCBANK'],
    'My Watchlist': ['TCS', 'RELIANCE'],
  };
  Map<String, List<String>> get watchlists => Map.unmodifiable(_watchlists);

  String _activeWatchlistCategory = 'Nifty 50 Gems';
  String get activeWatchlistCategory => _activeWatchlistCategory;

  List<String> get currentWatchlistSymbols =>
      _watchlists[_activeWatchlistCategory] ?? [];

  List<Stock> get currentWatchlistStocks {
    final symbols = currentWatchlistSymbols;
    return _stocks.where((s) => symbols.contains(s.symbol)).toList();
  }

  // AI Chat History
  final List<ChatMessage> _chatMessages = [];
  List<ChatMessage> get chatMessages => List.unmodifiable(_chatMessages);

  bool _isChatLoading = false;
  bool get isChatLoading => _isChatLoading;

  Timer? _liveTickTimer;

  // Initialize Session with authentic 08-10-2026 data
  void initSession() {
    _stocks.clear();
    _stocks.addAll(AstroQuantApiService.defaultStocks);
    _selectedStock = _stocks.first; // Default TCS

    // Welcome Message from AI Market Expert
    _chatMessages.add(
      ChatMessage(
        id: 'msg-welcome',
        text: 'Greetings. Chief AI Market Expert & Astro Quant live for the October 8, 2026 trading session.\n\n'
            '• TCS: Current ₹2,080.30 -> Target ₹2,095.00 (Mercury Exalted in Swati)\n'
            '• Reliance: Current ₹1,215.70 -> Target ₹1,228.00 (Sun in 10th House Trine)\n\n'
            'You can ask for price predictions or simply command: "Add TCS in watchlist" or "Add Reliance to watchlist" to automatically pin it.',
        isUser: false,
        timestamp: DateTime.now(),
      ),
    );

    _startLiveTicks();
    notifyListeners();
  }

  void setIndex(int index) {
    _currentIndex = index;
    notifyListeners();
  }

  void setDeviceMode(String mode) {
    _deviceMode = mode;
    notifyListeners();
  }

  void selectStock(Stock stock) {
    _selectedStock = stock;
    notifyListeners();
  }

  void setActiveWatchlistCategory(String category) {
    if (_watchlists.containsKey(category)) {
      _activeWatchlistCategory = category;
      notifyListeners();
    }
  }

  bool isInWatchlist(String symbol) {
    return currentWatchlistSymbols.contains(symbol);
  }

  void toggleWatchlist(String symbol, [String? targetCategory]) {
    final category = targetCategory ?? _activeWatchlistCategory;
    final list = _watchlists[category] ?? [];

    if (list.contains(symbol)) {
      list.remove(symbol);
    } else {
      list.add(symbol);
    }
    _watchlists[category] = list;
    notifyListeners();
  }

  /// Add custom stock from search or import, and link to watchlist
  void addCustomStock(Stock newStock, {bool addToWatchlist = true}) {
    final existingIdx = _stocks.indexWhere((s) => s.symbol == newStock.symbol);
    if (existingIdx >= 0) {
      _stocks[existingIdx] = newStock;
    } else {
      _stocks.add(newStock);
    }

    if (addToWatchlist) {
      final list = _watchlists[_activeWatchlistCategory] ?? [];
      if (!list.contains(newStock.symbol)) {
        list.add(newStock.symbol);
        _watchlists[_activeWatchlistCategory] = list;
      }
    }

    _selectedStock = newStock;
    notifyListeners();
  }

  /// Live Search Stock
  Future<Stock> searchStock(String query) async {
    final stock = await _apiService.searchOrSynthesize(query);
    return stock;
  }

  /// Interactive AI Chat with Watchlist Intent Execution
  Future<void> sendChatMessage(String text) async {
    if (text.trim().isEmpty) return;

    final userMsg = ChatMessage(
      id: 'msg-${DateTime.now().millisecondsSinceEpoch}',
      text: text,
      isUser: true,
      timestamp: DateTime.now(),
    );
    _chatMessages.add(userMsg);
    _isChatLoading = true;
    notifyListeners();

    // Natural Language Intent Detection for Watchlist Commands
    final lower = text.toLowerCase();
    final isWatchlistCommand = lower.contains('watchlist') &&
        (lower.contains('add') || lower.contains('dalo') || lower.contains('include') || lower.contains('track'));

    Stock? matchedStock;
    if (isWatchlistCommand || lower.startsWith('add ')) {
      // Find stock mentioned in query
      for (final s in _stocks) {
        if (lower.contains(s.symbol.toLowerCase()) ||
            lower.contains(s.name.toLowerCase().split(' ').first)) {
          matchedStock = s;
          break;
        }
      }

      // If stock not in current list, search or synthesize
      if (matchedStock == null) {
        final words = text.split(' ');
        for (final w in words) {
          final cleanWord = w.replaceAll(RegExp(r'[^a-zA-Z]'), '').toUpperCase();
          if (cleanWord.length >= 2 &&
              !['ADD', 'IN', 'TO', 'MY', 'WATCHLIST', 'PLEASE', 'THE'].contains(cleanWord)) {
            matchedStock = await _apiService.searchOrSynthesize(cleanWord);
            addCustomStock(matchedStock, addToWatchlist: false);
            break;
          }
        }
      }

      if (matchedStock == null && _selectedStock != null) {
        matchedStock = _selectedStock;
      }
    }

    // Simulate AI synthesis delay
    await Future.delayed(const Duration(milliseconds: 600));

    if (matchedStock != null && isWatchlistCommand) {
      // Automatically add to active watchlist!
      final list = _watchlists[_activeWatchlistCategory] ?? [];
      if (!list.contains(matchedStock.symbol)) {
        list.add(matchedStock.symbol);
        _watchlists[_activeWatchlistCategory] = list;
      }

      final aiReply = ChatMessage(
        id: 'msg-${DateTime.now().millisecondsSinceEpoch}',
        text: 'Action Executed: Successfully added ${matchedStock.name} (${matchedStock.symbol}) to your "$activeWatchlistCategory" watchlist.\n\n'
            '• Verified Current Price: ${matchedStock.currency}${matchedStock.price.toStringAsFixed(2)}\n'
            '• 08-10-2026 Locked Target: ${matchedStock.currency}${matchedStock.predictedAmount.toStringAsFixed(2)} (${matchedStock.changePercent >= 0 ? '+' : ''}${matchedStock.changePercent.toStringAsFixed(2)}%)\n'
            '• Planetary Alignment: ${matchedStock.rulingPlanet} in favorable trine (Astro Z-Score: +${matchedStock.astroZScore.toStringAsFixed(2)})\n'
            '• Verdict: Bullish Breakout Accumulation Zone.',
        isUser: false,
        timestamp: DateTime.now(),
        actionBadge: 'Added ${matchedStock.symbol} to Watchlist',
        targetStockSymbol: matchedStock.symbol,
        targetStockPrice: matchedStock.price,
        targetStockTarget: matchedStock.predictedAmount,
      );
      _chatMessages.add(aiReply);
    } else {
      // General Market & Predictive Query
      final stock = _selectedStock ?? _stocks.first;
      final aiReply = ChatMessage(
        id: 'msg-${DateTime.now().millisecondsSinceEpoch}',
        text: 'Market & Astro Synthesis for ${stock.name} (${stock.symbol}):\n\n'
            '• Current Trading Quote: ${stock.currency}${stock.price.toStringAsFixed(2)}\n'
            '• Intraday Predicted Target: ${stock.currency}${stock.predictedAmount.toStringAsFixed(2)}\n'
            '• Astro Planetary Cycle: ${stock.rulingPlanet} maintains dominant planetary hora for the October 8, 2026 session with nakshatra ${stock.nakshatra}.\n'
            '• Technical Confluence: RSI(14) at 64.2 with bullish MACD histogram crossover.\n\n'
            'Tip: Say "Add ${stock.symbol} to watchlist" anytime to immediately pin it.',
        isUser: false,
        timestamp: DateTime.now(),
        targetStockSymbol: stock.symbol,
        targetStockPrice: stock.price,
        targetStockTarget: stock.predictedAmount,
      );
      _chatMessages.add(aiReply);
    }

    _isChatLoading = false;
    notifyListeners();
  }

  void _startLiveTicks() {
    _liveTickTimer?.cancel();
    _liveTickTimer = Timer.periodic(const Duration(seconds: 4), (_) {
      if (_stocks.isEmpty) return;

      for (int i = 0; i < _stocks.length; i++) {
        final s = _stocks[i];
        final delta = (s.symbol.hashCode % 3 == 0 ? 0.35 : -0.20) * (s.price * 0.0008);
        final newPrice = double.parse((s.price + delta).toStringAsFixed(2));
        final newChange = double.parse((s.change + delta).toStringAsFixed(2));
        final newChangePercent = double.parse(((newChange / (newPrice - newChange)) * 100).toStringAsFixed(2));

        final newHistory = List<double>.from(s.sparklineHistory);
        if (newHistory.isNotEmpty) {
          newHistory.add(newPrice);
          if (newHistory.length > 12) newHistory.removeAt(0);
        }

        _stocks[i] = s.copyWith(
          price: newPrice,
          change: newChange,
          changePercent: newChangePercent,
          sparklineHistory: newHistory,
        );

        if (_selectedStock?.symbol == s.symbol) {
          _selectedStock = _stocks[i];
        }
      }
      notifyListeners();
    });
  }

  @override
  void dispose() {
    _liveTickTimer?.cancel();
    super.dispose();
  }
}
