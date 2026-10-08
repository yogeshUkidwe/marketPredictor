import { PlanetaryPosition, GlobalIndex } from '../types';

export const CURRENT_PLANETARY_POSITIONS: PlanetaryPosition[] = [
  {
    planet: 'Jupiter',
    sign: 'Taurus',
    degree: '18°42\'',
    house: 2,
    isRetrograde: false,
    sectorsImpacted: ['Banking & Fin', 'FMCG & Consumer', 'Automobile'],
    marketBias: 'Bullish',
    energy: 'Expansion of liquidity, institutional inflows into large-cap financial institutions and durable consumer goods.'
  },
  {
    planet: 'Saturn',
    sign: 'Aquarius',
    degree: '24°15\'',
    house: 11,
    isRetrograde: false,
    sectorsImpacted: ['Infrastructure', 'Energy & Oil', 'Metals & Mining'],
    marketBias: 'Mixed',
    energy: 'Heavy capital expenditure, disciplined industrial output, strong support on deep value commodity cycles.'
  },
  {
    planet: 'Rahu',
    sign: 'Pisces',
    degree: '11°30\'',
    house: 12,
    isRetrograde: true,
    sectorsImpacted: ['Technology', 'Aerospace & Defense'],
    marketBias: 'Bullish',
    energy: 'Hyper-speculative momentum in Artificial Intelligence, quantum computing, cloud infrastructure and cybersecurity.'
  },
  {
    planet: 'Ketu',
    sign: 'Virgo',
    degree: '11°30\'',
    house: 6,
    isRetrograde: true,
    sectorsImpacted: ['Pharma & Health', 'Technology'],
    marketBias: 'Mixed',
    energy: 'Heightened scrutiny on clinical trials, algorithmic debugging, precision chemicals and biotechnology breakthroughs.'
  },
  {
    planet: 'Mars',
    sign: 'Cancer',
    degree: '08°22\'',
    house: 4,
    isRetrograde: false,
    sectorsImpacted: ['Aerospace & Defense', 'Metals & Mining', 'Automobile'],
    marketBias: 'Bullish',
    energy: 'Debilitated transit creates rapid intraday spikes, geopolitical defense order book expansion, volatile metal margins.'
  },
  {
    planet: 'Mercury',
    sign: 'Libra',
    degree: '21°05\'',
    house: 7,
    isRetrograde: false,
    sectorsImpacted: ['Technology', 'Telecom', 'Banking & Fin'],
    marketBias: 'Bullish',
    energy: 'Smooth liquidity circulation, robust tech earnings, high trading turnover across algorithmic retail and institutional desks.'
  },
  {
    planet: 'Sun',
    sign: 'Virgo',
    degree: '28°10\'',
    house: 6,
    isRetrograde: false,
    sectorsImpacted: ['Energy & Oil', 'Banking & Fin'],
    marketBias: 'Mixed',
    energy: 'Focus on sovereign budget execution, fiscal revenues, state-backed energy conglomerates and treasury yields.'
  },
  {
    planet: 'Venus',
    sign: 'Scorpio',
    degree: '14°48\'',
    house: 8,
    isRetrograde: false,
    sectorsImpacted: ['Automobile', 'FMCG & Consumer'],
    marketBias: 'Mixed',
    energy: 'Hidden value unlocking in luxury retail, merger & acquisitions, premium automobile order pipelines.'
  },
  {
    planet: 'Moon',
    sign: 'Sagittarius',
    degree: '06°14\'',
    house: 9,
    isRetrograde: false,
    sectorsImpacted: ['Banking & Fin', 'FMCG & Consumer'],
    marketBias: 'Bullish',
    energy: 'Optimistic market sentiment, high trading confidence, positive global retail participation.'
  }
];

export const GLOBAL_MACRO_INDICATORS: GlobalIndex[] = [
  {
    name: 'NIFTY 50',
    symbol: 'NIFTY',
    value: 25128.80,
    change: 142.50,
    changePercent: 0.57,
    category: 'Index',
    astroInfluence: 'Moon-Jupiter transit favors banking & large-cap industrial leadership.'
  },
  {
    name: 'BANK NIFTY',
    symbol: 'BANKNIFTY',
    value: 51840.20,
    change: 368.10,
    changePercent: 0.71,
    category: 'Index',
    astroInfluence: 'Jupiter in Taurus directly strengthens institutional private banking books.'
  },
  {
    name: 'BSE SENSEX',
    symbol: 'SENSEX',
    value: 82180.40,
    change: 485.60,
    changePercent: 0.59,
    category: 'Index',
    astroInfluence: 'Sun in auspicious trine provides sovereign liquidity anchor.'
  },
  {
    name: 'GIFT Nifty',
    symbol: 'GIFTNIFTY',
    value: 25195.00,
    change: 66.20,
    changePercent: 0.26,
    category: 'Index',
    astroInfluence: 'Early morning indicative open signaling firm buying on dips.'
  },
  {
    name: 'USD / INR',
    symbol: 'USDINR',
    value: 83.92,
    change: -0.06,
    changePercent: -0.07,
    category: 'Currency',
    astroInfluence: 'RBI intervention maintains stability near key support bands.'
  },
  {
    name: 'Brent Crude Oil',
    symbol: 'BRENT',
    value: 77.40,
    change: -0.85,
    changePercent: -1.09,
    category: 'Commodity',
    astroInfluence: 'Saturn aspect limits runaway crude; softening crude directly expands Indian margins.'
  },
  {
    name: 'Gold (MCX / Bullion)',
    symbol: 'GOLD_MCX',
    value: 76240.00,
    change: 340.00,
    changePercent: 0.45,
    category: 'Commodity',
    astroInfluence: 'Sun-Mars transit sustains festive bullion demand and jewelers buying.'
  },
  {
    name: 'Nasdaq 100',
    symbol: 'NDX',
    value: 19840.10,
    change: 165.40,
    changePercent: 0.84,
    category: 'Index',
    astroInfluence: 'Rahu alignment supporting Indian IT exporters and software multiple rerating.'
  }
];

export const ASTRO_TIMING_CYCLES = [
  {
    date: 'Oct 14, 2026',
    title: 'Mercury Enters Scorpio',
    impact: 'Increased volatility in high-beta tech stocks and intense derivatives expiry repositioning.',
    sector: 'Technology & Fin'
  },
  {
    date: 'Oct 17, 2026',
    title: 'Full Moon (Supermoon in Aries)',
    impact: 'Major turning point for commodities, defense equities, and sharp intraday profit-booking.',
    sector: 'Metals & Defense'
  },
  {
    date: 'Oct 23, 2026',
    title: 'Sun Ingress Scorpio (Vrischika Sankranti)',
    impact: 'Energy conglomerates and oil marketing firms enter high-momentum quarterly earnings run.',
    sector: 'Energy & Oil'
  },
  {
    date: 'Nov 01, 2026',
    title: 'New Moon (Amavasya in Libra)',
    impact: 'Consolidation phase ending with fresh institutional accumulation in banking leaders.',
    sector: 'Banking & Fin'
  }
];
