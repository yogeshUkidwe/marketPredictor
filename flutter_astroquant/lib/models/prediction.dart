class PredictionModel {
  final String symbol;
  final double currentPrice;
  final double preMarketTarget;
  final double oneWeekTarget;
  final double stopLoss;
  final double confidencePercent;
  final double planetaryMultiplier;
  final String astroVerdict;
  final String primaryAspect;
  final List<String> keyCatalysts;

  const PredictionModel({
    required this.symbol,
    required this.currentPrice,
    required this.preMarketTarget,
    required this.oneWeekTarget,
    required this.stopLoss,
    required this.confidencePercent,
    required this.planetaryMultiplier,
    required this.astroVerdict,
    required this.primaryAspect,
    required this.keyCatalysts,
  });

  factory PredictionModel.forStock(double price, String symbol, String rulingPlanet) {
    final target = price * 1.018;
    final oneWeek = price * 1.045;
    final sl = price * 0.985;

    return PredictionModel(
      symbol: symbol,
      currentPrice: price,
      preMarketTarget: target,
      oneWeekTarget: oneWeek,
      stopLoss: sl,
      confidencePercent: 88.5,
      planetaryMultiplier: 1.14,
      astroVerdict: 'STRONG ACCUMULATION - $rulingPlanet EXALTED',
      primaryAspect: 'Trine aspect between Jupiter in Gemini and natal Ascendant',
      keyCatalysts: [
        'Vedic Hora of $rulingPlanet aligns with NSE Opening Window',
        'Lunar Nakshatra transition into Hasta (Mercury domicile)',
        'Technical Bollinger Upper Band expansion confirms breakout'
      ],
    );
  }
}
