class Stock {
  final String symbol;
  final String name;
  final String exchange;
  final String currency;
  final String sector;
  final double price;
  final double change;
  final double changePercent;
  final double high24h;
  final double low24h;
  final String volume;
  final String marketCap;
  final double pe;
  final double predictedAmount;
  final String rulingPlanet;
  final double astroZScore;
  final String nakshatra;
  final List<double> sparklineHistory;

  const Stock({
    required this.symbol,
    required this.name,
    required this.exchange,
    required this.currency,
    required this.sector,
    required this.price,
    required this.change,
    required this.changePercent,
    required this.high24h,
    required this.low24h,
    required this.volume,
    required this.marketCap,
    required this.pe,
    required this.predictedAmount,
    required this.rulingPlanet,
    this.astroZScore = 1.84,
    this.nakshatra = 'Uttara Phalguni',
    this.sparklineHistory = const [],
  });

  Stock copyWith({
    String? symbol,
    String? name,
    String? exchange,
    String? currency,
    String? sector,
    double? price,
    double? change,
    double? changePercent,
    double? high24h,
    double? low24h,
    String? volume,
    String? marketCap,
    double? pe,
    double? predictedAmount,
    String? rulingPlanet,
    double? astroZScore,
    String? nakshatra,
    List<double>? sparklineHistory,
  }) {
    return Stock(
      symbol: symbol ?? this.symbol,
      name: name ?? this.name,
      exchange: exchange ?? this.exchange,
      currency: currency ?? this.currency,
      sector: sector ?? this.sector,
      price: price ?? this.price,
      change: change ?? this.change,
      changePercent: changePercent ?? this.changePercent,
      high24h: high24h ?? this.high24h,
      low24h: low24h ?? this.low24h,
      volume: volume ?? this.volume,
      marketCap: marketCap ?? this.marketCap,
      pe: pe ?? this.pe,
      predictedAmount: predictedAmount ?? this.predictedAmount,
      rulingPlanet: rulingPlanet ?? this.rulingPlanet,
      astroZScore: astroZScore ?? this.astroZScore,
      nakshatra: nakshatra ?? this.nakshatra,
      sparklineHistory: sparklineHistory ?? this.sparklineHistory,
    );
  }

  factory Stock.fromJson(Map<String, dynamic> json) {
    List<double> history = [];
    if (json['sparklineHistory'] != null && json['sparklineHistory'] is List) {
      history = (json['sparklineHistory'] as List)
          .map((e) => (e as num).toDouble())
          .toList();
    }

    return Stock(
      symbol: json['symbol']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      exchange: json['exchange']?.toString() ?? 'NSE',
      currency: json['currency']?.toString() ?? '₹',
      sector: json['sector']?.toString() ?? 'Equities',
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      change: (json['change'] as num?)?.toDouble() ?? 0.0,
      changePercent: (json['changePercent'] as num?)?.toDouble() ?? 0.0,
      high24h: (json['high24h'] as num?)?.toDouble() ?? 0.0,
      low24h: (json['low24h'] as num?)?.toDouble() ?? 0.0,
      volume: json['volume']?.toString() ?? '1.2M',
      marketCap: json['marketCap']?.toString() ?? '₹500B',
      pe: (json['pe'] as num?)?.toDouble() ?? 22.0,
      predictedAmount: (json['predictedAmount'] as num?)?.toDouble() ??
          ((json['price'] as num?)?.toDouble() ?? 0.0) * 1.015,
      rulingPlanet: json['rulingPlanet']?.toString() ?? 'Mercury',
      astroZScore: (json['astroZScore'] as num?)?.toDouble() ?? 1.84,
      nakshatra: json['nakshatra']?.toString() ?? 'Hasta',
      sparklineHistory: history,
    );
  }

  Map<String, dynamic> toJson() => {
    'symbol': symbol,
    'name': name,
    'exchange': exchange,
    'currency': currency,
    'sector': sector,
    'price': price,
    'change': change,
    'changePercent': changePercent,
    'high24h': high24h,
    'low24h': low24h,
    'volume': volume,
    'marketCap': marketCap,
    'pe': pe,
    'predictedAmount': predictedAmount,
    'rulingPlanet': rulingPlanet,
    'astroZScore': astroZScore,
    'nakshatra': nakshatra,
    'sparklineHistory': sparklineHistory,
  };
}
