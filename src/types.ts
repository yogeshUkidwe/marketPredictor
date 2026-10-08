export type Exchange = 'NSE' | 'BSE' | 'NASDAQ' | 'NYSE';

export type Sector =
  | 'Technology'
  | 'Banking & Fin'
  | 'Energy & Oil'
  | 'Automobile'
  | 'Metals & Mining'
  | 'Pharma & Health'
  | 'FMCG & Consumer'
  | 'Infrastructure'
  | 'Telecom'
  | 'Aerospace & Defense';

export type Planet =
  | 'Sun'
  | 'Moon'
  | 'Mars'
  | 'Mercury'
  | 'Jupiter'
  | 'Venus'
  | 'Saturn'
  | 'Rahu'
  | 'Ketu';

export interface PricePoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  astroEvent?: string;
  sentiment?: 'bullish' | 'bearish' | 'neutral';
}

export interface MacroDependency {
  name: string;
  field: string;
  correlation: number; // -1 to +1
  impact: string;
  currentValue: string;
  direction: 'up' | 'down' | 'neutral';
  status: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
}

export interface TechnicalIndicators {
  rsi: number;
  macd: {
    macd: number;
    signal: number;
    histogram: number;
  };
  ema20: number;
  sma50: number;
  sma200: number;
  support1: number;
  support2: number;
  resistance1: number;
  resistance2: number;
  signal: 'STRONG BUY' | 'BUY' | 'NEUTRAL' | 'SELL' | 'STRONG SELL';
  volatility: 'Low' | 'Medium' | 'High';
}

export interface AstroProfile {
  rulingPlanet: Planet;
  secondaryPlanet: Planet;
  zodiacSign: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  nakshatra: string;
  rulingDeity: string;
  currentTransitStatus: {
    title: string;
    description: string;
    sentiment: 'Bullish' | 'Bearish' | 'Volatile';
    strength: number; // 0 to 100
  };
  retrogradeSensitivity: boolean; // true if heavily affected by Mercury/Mars/Venus retrograde
  favorableNakshatras: string[];
  astroScore: number; // 0 to 100
  upcomingAstroEvents: {
    date: string;
    event: string;
    impact: string;
    type: 'positive' | 'negative' | 'volatile';
  }[];
}

export interface Fundamentals {
  pe: number;
  pbRatio: number;
  marketCap: string;
  roe: number;
  dividendYield: number;
  debtToEquity: number;
  epsGrowthYoY: number;
  sectorMedianPE: number;
  valuationRating: 'UNDERVALUED' | 'FAIR' | 'OVERVALUED';
}

export interface PredictionSubScores {
  technicalScore: number; // 0-100
  fundamentalScore: number; // 0-100
  astroScore: number; // 0-100
  macroScore: number; // 0-100
  overallConfidence: number; // 0-100
  activeModel: 'ensemble' | 'astro_quant' | 'fundamental_macro' | 'algorithmic_momentum' | 'vedic_transits';
}

export interface StockPrediction {
  overallBias: 'STRONG BULLISH' | 'BULLISH' | 'NEUTRAL' | 'BEARISH' | 'STRONG BEARISH';
  confidenceScore: number; // 0-100%
  target1D: number;
  target1W: number;
  target1M: number;
  stopLoss: number;
  expectedMovePercent: number;
  bullishProb: number;
  neutralProb: number;
  bearishProb: number;
  astroConfluence: string;
  macroConfluence: string;
  technicalConfluence: string;
  keyCatalysts: string[];
  riskFactors: string[];
  strategicVerdict: string;
  astroTimingVerdict?: string;
  subScores?: PredictionSubScores;
  aiGenerated?: boolean;
}

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  exchange: Exchange;
  currency: '₹' | '$';
  sector: Sector;
  price: number;
  predictedAmount: number; // Locked pre-market predicted price target (does not change once market starts)
  preMarketOpen?: number;
  targetMatchStatus?: 'MATCHED' | 'MISSED' | 'PENDING';
  matchAccuracyPercent?: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume: string;
  marketCap: string;
  pe: number;
  fundamentals?: Fundamentals;
  isWatchlist: boolean;
  history: PricePoint[];
  technicals: TechnicalIndicators;
  macroDependencies: MacroDependency[];
  astroProfile: AstroProfile;
  prediction: StockPrediction;
  lastUpdated?: string;
  postMarketExplanation?: {
    globalCues: string;
    previousDay: string;
    companyFundamentals: string;
    promoterAndInstitutional: string;
    astroTransit: string;
  };
}

export interface GlobalIndex {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
  category: 'Index' | 'Commodity' | 'Currency' | 'Bond';
  astroInfluence: string;
}

export interface PlanetaryPosition {
  planet: Planet;
  sign: string;
  degree: string;
  house: number;
  isRetrograde: boolean;
  sectorsImpacted: Sector[];
  marketBias: 'Bullish' | 'Bearish' | 'Mixed';
  energy: string;
}

export interface WatchlistGroup {
  id: string;
  name: string;
  description?: string;
  stockIds: string[];
  isDefault?: boolean;
  createdAt: string;
}

export type AlertType =
  | 'PRICE_ABOVE'
  | 'PRICE_BELOW'
  | 'PCT_CHANGE_UP'
  | 'PCT_CHANGE_DOWN'
  | 'PREDICTION_BIAS_CHANGE'
  | 'TARGET_REACHED';

export interface PriceAlert {
  id: string;
  stockId: string;
  symbol: string;
  name: string;
  type: AlertType;
  targetValue?: number;
  targetBias?: string;
  currentPrice: number;
  isTriggered: boolean;
  triggeredAt?: string;
  isActive: boolean;
  createdAt: string;
  note?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'price_alert' | 'prediction_alert' | 'astro_cycle';
  read: boolean;
  symbol?: string;
}
