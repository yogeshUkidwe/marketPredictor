import { Stock, Sector, Planet } from '../types';

function generateHistory(
  basePrice: number,
  volatility: number,
  trend: 'up' | 'down' | 'neutral',
  rulingPlanet: string
) {
  const points = [];
  const today = new Date('2026-10-08');

  // Generate 26 trading day close prices backwards from today (i=25 down to i=0)
  // closes[25] corresponds to today (2026-10-08) and is GUARANTEED to be basePrice
  const closes: number[] = new Array(26);
  closes[25] = basePrice;

  let running = basePrice;
  const drift = trend === 'up' ? 0.0025 : trend === 'down' ? -0.002 : 0.0005;

  for (let i = 24; i >= 0; i--) {
    const step = (Math.random() - 0.49 - drift) * volatility * running;
    running = Math.max(Math.round((running - step) * 100) / 100, Math.round(basePrice * 0.75 * 100) / 100);
    closes[i] = running;
  }

  for (let i = 25; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    const idx = 25 - i;
    const close = closes[idx];
    const prevClose = idx > 0 ? closes[idx - 1] : Math.round(close * 0.995 * 100) / 100;
    const open = Math.round(prevClose * 100) / 100;
    const spread = Math.max(Math.abs(open - close), close * volatility * 0.4);
    const high = Math.round((Math.max(open, close) + spread * (0.3 + Math.random() * 0.5)) * 100) / 100;
    const low = Math.round((Math.min(open, close) - spread * (0.3 + Math.random() * 0.5)) * 100) / 100;
    const volume = Math.floor(1200000 + Math.random() * 3800000);

    let astroEvent: string | undefined = undefined;
    if (i === 21) astroEvent = 'Moon-Jupiter Trine';
    if (i === 15) astroEvent = `${rulingPlanet} Transit Ingress`;
    if (i === 8) astroEvent = 'Full Moon Peak Volume';
    if (i === 2) astroEvent = 'Mercury Direct Acceleration';
    if (i === 0) astroEvent = 'Current Session (08-10-2026)';

    points.push({
      date: dateStr,
      open,
      high,
      low,
      close,
      volume,
      astroEvent,
      sentiment: close >= open ? ('bullish' as const) : ('bearish' as const)
    });
  }
  return points;
}

interface StockSeed {
  symbol: string;
  name: string;
  exchange: 'NSE' | 'BSE' | 'NASDAQ' | 'NYSE';
  currency: '₹' | '$';
  sector: Sector;
  price: number;
  changePercent: number;
  marketCap: string;
  pe: number;
  rulingPlanet: Planet;
  secondaryPlanet: Planet;
  zodiacSign: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  nakshatra: string;
  trend: 'up' | 'down' | 'neutral';
  volatility: number;
  macroFactors: { name: string; field: string; corr: number; impact: string; value: string; dir: 'up' | 'down' | 'neutral'; status: 'BULLISH' | 'BEARISH' | 'NEUTRAL' }[];
  keyCatalysts: string[];
  riskFactors: string[];
  astroTransit: { title: string; desc: string; sentiment: 'Bullish' | 'Bearish' | 'Volatile'; strength: number };
}

const SEED_DATA: StockSeed[] = [
  // 1. RELIANCE
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Energy & Oil',
    price: 1215.70,
    changePercent: 2.66,
    marketCap: '₹16.45T',
    pe: 24.2,
    rulingPlanet: 'Sun',
    secondaryPlanet: 'Jupiter',
    zodiacSign: 'Leo (Simha)',
    element: 'Fire',
    nakshatra: 'Uttara Phalguni',
    trend: 'up',
    volatility: 0.015,
    macroFactors: [
      { name: 'Brent Crude GRM Margins', field: 'Refining Spreads', corr: 0.65, impact: 'High Singapore GRM expands cashflow', value: '$8.20/bbl', dir: 'up', status: 'BULLISH' },
      { name: '5G ARPU Tariffs (Jio)', field: 'Telecom Sector', corr: 0.78, impact: 'Tariff hike flows directly to EBITDA', value: '₹195 ARPU', dir: 'up', status: 'BULLISH' },
      { name: 'Retail Footfall Momentum', field: 'Domestic Consumer', corr: 0.52, impact: 'Festive season grocery & fashion volume', value: '+14% YoY', dir: 'up', status: 'BULLISH' }
    ],
    keyCatalysts: ['New Energy solar gigafactory commissioning', 'Jio & Retail IPO roadmap clarity', 'O2C petchem margin recovery'],
    riskFactors: ['Global oil demand slump', 'Foreign institutional profit-taking'],
    astroTransit: {
      title: 'Sun exalted in 10th House trine Jupiter',
      desc: 'Sun represents sovereign royal energy and industrial monopolies. Jupiter transit in Taurus blesses 10th house of corporate prestige.',
      sentiment: 'Bullish',
      strength: 88
    }
  },

  // 2. TCS
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Technology',
    price: 2080.30,
    changePercent: 0.17,
    marketCap: '₹7.53T',
    pe: 28.5,
    rulingPlanet: 'Mercury',
    secondaryPlanet: 'Jupiter',
    zodiacSign: 'Gemini (Mithuna)',
    element: 'Air',
    nakshatra: 'Ardra',
    trend: 'up',
    volatility: 0.014,
    macroFactors: [
      { name: 'USD / INR Realization', field: 'Foreign Exchange', corr: 0.72, impact: 'Weaker rupee directly boosts operating EBIT margin', value: '83.92', dir: 'up', status: 'BULLISH' },
      { name: 'US BFSI Tech Spend', field: 'Global Banking Capex', corr: 0.85, impact: 'Cloud migration and core modernization orders', value: '+6.8% YoY', dir: 'up', status: 'BULLISH' },
      { name: 'US 10-Yr Bond Yield', field: 'Global Discount Rate', corr: -0.48, impact: 'Lower yields loosen enterprise discretionary IT budget', value: '4.02%', dir: 'down', status: 'BULLISH' }
    ],
    keyCatalysts: ['Mega deal ramp-up in Europe & UK', 'Enterprise AI pipeline exceeding $1.5B', 'Highest operating margin in IT cohort'],
    riskFactors: ['US election-induced discretionary spending pause', 'Sub-contractor costs'],
    astroTransit: {
      title: 'Mercury exalted in airy trine with Jupiter',
      desc: 'Mercury controls algorithmic computation and software services. Direct motion through Libra grants clarity in mega contract negotiations.',
      sentiment: 'Bullish',
      strength: 84
    }
  },

  // 3. HDFCBANK
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Banking & Fin',
    price: 704.90,
    changePercent: 1.16,
    marketCap: '₹10.72T',
    pe: 18.2,
    rulingPlanet: 'Jupiter',
    secondaryPlanet: 'Sun',
    zodiacSign: 'Sagittarius (Dhanu)',
    element: 'Fire',
    nakshatra: 'Mula',
    trend: 'up',
    volatility: 0.008,
    macroFactors: [
      { name: 'RBI Repo Rate Cycle', field: 'Monetary Policy', corr: -0.55, impact: 'Upcoming rate cut cycle stabilizes deposit costs', value: '6.50%', dir: 'neutral', status: 'BULLISH' },
      { name: 'Credit Growth (Systemic)', field: 'Macro Lending', corr: 0.88, impact: 'Healthy retail & SME loan disbursements', value: '+14.2% YoY', dir: 'up', status: 'BULLISH' },
      { name: 'FII Inflows Index', field: 'Institutional Liquidity', corr: 0.81, impact: 'Heavy weightage in MSCI / FTSE rebalancing baskets', value: '+$1.8B MTD', dir: 'up', status: 'BULLISH' }
    ],
    keyCatalysts: ['Post-merger loan-to-deposit ratio (LDR) normalisation', 'Digital banking CASA expansion', 'FII shareholding room open'],
    riskFactors: ['Deposit mobilization competition', 'NIM compression in unsecured personal loans'],
    astroTransit: {
      title: 'Jupiter occupying Dhansthana (2nd House of Wealth)',
      desc: 'Jupiter is the universal karaka for wealth, banking, and treasury vaults. Aspected by benefic Saturn, indicating solid foundation accumulation.',
      sentiment: 'Bullish',
      strength: 86
    }
  },

  // 4. INFY
  {
    symbol: 'INFY',
    name: 'Infosys Ltd.',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Technology',
    price: 992.00,
    changePercent: -2.16,
    marketCap: '₹4.12T',
    pe: 26.4,
    rulingPlanet: 'Mercury',
    secondaryPlanet: 'Rahu',
    zodiacSign: 'Virgo (Kanya)',
    element: 'Earth',
    nakshatra: 'Hasta',
    trend: 'up',
    volatility: 0.018,
    macroFactors: [
      { name: 'Nasdaq 100 Correlation', field: 'Global Tech Sentiment', corr: 0.84, impact: 'High beta alignment with US enterprise tech recovery', value: '19,840', dir: 'up', status: 'BULLISH' },
      { name: 'Generative AI Deal Size', field: 'AI Adoption', corr: 0.76, impact: 'Infosys Topaz platform driving client transformational spend', value: '120+ active engagements', dir: 'up', status: 'BULLISH' },
      { name: 'Global Tech Hiring Freeze', field: 'Talent Market', corr: -0.42, impact: 'Declining attrition lowers employee cost by 180 bps', value: '12.8% attrition', dir: 'down', status: 'BULLISH' }
    ],
    keyCatalysts: ['Upward revision in annual constant currency guidance', 'Topaz generative AI contract ramp', 'Share buyback announcements'],
    riskFactors: ['Discretionary client delays in retail/manufacturing verticals', 'Wage increment impacts'],
    astroTransit: {
      title: 'Mercury and Rahu benefic synchronization',
      desc: 'Virgo is Mercury’s own moolatrikona sign. Rahu aspect brings breakthrough modern tech wins and cloud modernization speed.',
      sentiment: 'Bullish',
      strength: 90
    }
  },

  // 5. ICICIBANK
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd.',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Banking & Fin',
    price: 1357.50,
    changePercent: 1.09,
    marketCap: '₹9.54T',
    pe: 18.4,
    rulingPlanet: 'Jupiter',
    secondaryPlanet: 'Mars',
    zodiacSign: 'Pisces (Meena)',
    element: 'Water',
    nakshatra: 'Purva Bhadrapada',
    trend: 'up',
    volatility: 0.013,
    macroFactors: [
      { name: 'Net Interest Margin (NIM)', field: 'Bank Profitability', corr: 0.82, impact: 'Best-in-class risk calibrated return on assets (RoA > 2.3%)', value: '4.36%', dir: 'up', status: 'BULLISH' },
      { name: 'Gross NPA Ratio', field: 'Asset Quality', corr: -0.89, impact: 'Decadal low slippages across corporate and retail book', value: '2.15%', dir: 'down', status: 'BULLISH' },
      { name: 'Retail Loan Growth', field: 'Credit Market', corr: 0.74, impact: 'Strong auto and mortgage penetration via iMobile app', value: '+16.5% YoY', dir: 'up', status: 'BULLISH' }
    ],
    keyCatalysts: ['Highest return on equity (RoE) among private peers', 'Superior digital franchise', 'Zero corporate stress'],
    riskFactors: ['Systemic regulatory tightening on unsecured credit', 'Deposit repricing'],
    astroTransit: {
      title: 'Jupiter trine 9th House of Fortune',
      desc: 'Jupiter maintains an auspicious trine to financial houses. Mars secondary ruler brings aggressive growth in branch underwriting.',
      sentiment: 'Bullish',
      strength: 87
    }
  },

  // 6. TATAMOTORS
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd.',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Automobile',
    price: 427.90,
    changePercent: -1.36,
    marketCap: '₹1.58T',
    pe: 10.2,
    rulingPlanet: 'Mars',
    secondaryPlanet: 'Venus',
    zodiacSign: 'Aries (Mesha)',
    element: 'Fire',
    nakshatra: 'Ashwini',
    trend: 'neutral',
    volatility: 0.024,
    macroFactors: [
      { name: 'JLR UK & US Order Book', field: 'Global Luxury Auto', corr: 0.79, impact: 'Defender & Range Rover order backlog keeps margins > 8.5%', value: '168k units', dir: 'neutral', status: 'NEUTRAL' },
      { name: 'Raw Material (Steel & Lithium)', field: 'Input Costs', corr: -0.68, impact: 'Lower battery pack costs improve domestic EV profitability', value: '-8% QoQ', dir: 'down', status: 'BULLISH' },
      { name: 'Crude Oil (Brent)', field: 'Consumer Sentiment', corr: -0.45, impact: 'High fuel prices temporarily cool domestic ICE commercial vehicle sales', value: '$77.40', dir: 'down', status: 'BULLISH' }
    ],
    keyCatalysts: ['Demerger into Commercial Vehicles and Passenger/EV businesses', 'Net zero automotive debt milestone', 'Curvv EV rollout'],
    riskFactors: ['European consumer slowdown affecting JLR deliveries', 'China luxury auto discounting'],
    astroTransit: {
      title: 'Mars transit in Cancer (Neecha / Sensitive sign)',
      desc: 'Mars governs mechanical engineering and vehicular horsepower. Debilitated position warns of short-term consolidation before breakout.',
      sentiment: 'Volatile',
      strength: 64
    }
  },

  // 7. ITC
  {
    symbol: 'ITC',
    name: 'ITC Ltd.',
    exchange: 'NSE',
    currency: '₹',
    sector: 'FMCG & Consumer',
    price: 265.70,
    changePercent: -0.38,
    marketCap: '₹3.33T',
    pe: 23.6,
    rulingPlanet: 'Venus',
    secondaryPlanet: 'Moon',
    zodiacSign: 'Taurus (Vrishabha)',
    element: 'Earth',
    nakshatra: 'Rohini',
    trend: 'up',
    volatility: 0.009,
    macroFactors: [
      { name: 'Rural Consumption Recovery', field: 'Consumer Demand', corr: 0.81, impact: 'Good monsoon rains spur farm incomes and FMCG staples spend', value: '+7.4% YoY', dir: 'up', status: 'BULLISH' },
      { name: 'Hotel De-merger Listing', field: 'Corporate Restructuring', corr: 0.65, impact: 'Unlocking asset-light capital return for shareholders', value: '1:10 ratio', dir: 'up', status: 'BULLISH' },
      { name: 'Tobacco Excise Tax Stability', field: 'Fiscal Policy', corr: -0.72, impact: 'Predictable tax framework prevents volume disruption', value: 'Stable', dir: 'neutral', status: 'BULLISH' }
    ],
    keyCatalysts: ['ITC Hotels demerger unlocking value', 'Agri-business and paperboard margin recovery', 'High dividend yield of 3.2%'],
    riskFactors: ['Wheat and edible oil commodity price volatility', 'Cigarette duty changes in next budget'],
    astroTransit: {
      title: 'Venus exalted in 11th House of Gains',
      desc: 'Venus rules FMCG, luxury hospitality, and agriculture. Rohini Nakshatra provides immense defensive stability and institutional accumulation.',
      sentiment: 'Bullish',
      strength: 85
    }
  },

  // 8. BHARTIARTL
  {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd.',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Telecom',
    price: 1810.50,
    changePercent: 1.72,
    marketCap: '₹11.30T',
    pe: 62.4,
    rulingPlanet: 'Mercury',
    secondaryPlanet: 'Mars',
    zodiacSign: 'Gemini (Mithuna)',
    element: 'Air',
    nakshatra: 'Punarvasu',
    trend: 'up',
    volatility: 0.016,
    macroFactors: [
      { name: 'Blended Mobile ARPU', field: 'Telecom Economics', corr: 0.92, impact: 'Every ₹10 ARPU gain adds ₹1,400 Cr operating profit', value: '₹211 ARPU', dir: 'up', status: 'BULLISH' },
      { name: '5G Capex Peak-Out', field: 'Free Cash Flow', corr: -0.71, impact: 'Declining network capex translates into surging free cash flows', value: '-22% Capex', dir: 'down', status: 'BULLISH' },
      { name: 'Africa Currency Devaluation', field: 'Geopolitical Emerging Markets', corr: -0.58, impact: 'Nigerian Naira stabilization arrests forex drag', value: 'Stable', dir: 'neutral', status: 'NEUTRAL' }
    ],
    keyCatalysts: ['Industry duopoly dominance', 'Homes broadband and enterprise B2B cloud business growing > 25%', 'Pre-paid tariff hike flow-through'],
    riskFactors: ['Spectrum auction payment obligations', 'African currency volatility'],
    astroTransit: {
      title: 'Mercury in 5th House of Speculation and Enterprise',
      desc: 'Mercury rules transmission waves and wireless data. Powerful planetary alignment indicates multi-quarter institutional rerating.',
      sentiment: 'Bullish',
      strength: 92
    }
  },

  // 9. LT
  {
    symbol: 'LT',
    name: 'Larsen & Toubro Ltd.',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Infrastructure',
    price: 3701.50,
    changePercent: -1.82,
    marketCap: '₹5.09T',
    pe: 33.8,
    rulingPlanet: 'Saturn',
    secondaryPlanet: 'Mars',
    zodiacSign: 'Capricorn (Makara)',
    element: 'Earth',
    nakshatra: 'Uttara Ashadha',
    trend: 'up',
    volatility: 0.015,
    macroFactors: [
      { name: 'National Capex & Gati Shakti', field: 'Government Infrastructure', corr: 0.88, impact: 'Massive railway, defense, port and highway order execution', value: '₹11.11T Budget', dir: 'up', status: 'BULLISH' },
      { name: 'Middle East Hydrocarbon Orders', field: 'Saudi Aramco Capex', corr: 0.74, impact: 'International order backlog touches all-time high ₹1.8T', value: '+35% YoY', dir: 'up', status: 'BULLISH' },
      { name: 'Steel & Cement Input Costs', field: 'Raw Material Margins', corr: -0.52, impact: 'Softening bulk material prices boosts fixed-price contract margins', value: 'Favorable', dir: 'down', status: 'BULLISH' }
    ],
    keyCatalysts: ['Order book above ₹4.8 Lakh Crores', 'Green hydrogen electrolyzer manufacturing setup', 'Defense missile systems exports'],
    riskFactors: ['Working capital cycle extension in international projects', 'Skilled labor availability'],
    astroTransit: {
      title: 'Saturn in own house Aquarius (Shasha Maha Purusha Yoga)',
      desc: 'Saturn is the cosmic engineer of infrastructure, bridges, and steel monoliths. His transit in own sign provides monumental structural strength.',
      sentiment: 'Bullish',
      strength: 89
    }
  },

  // 10. SBIN
  {
    symbol: 'SBIN',
    name: 'State Bank of India',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Banking & Fin',
    price: 954.00,
    changePercent: -0.50,
    marketCap: '₹8.81T',
    pe: 11.2,
    rulingPlanet: 'Sun',
    secondaryPlanet: 'Jupiter',
    zodiacSign: 'Leo (Simha)',
    element: 'Fire',
    nakshatra: 'Magha',
    trend: 'up',
    volatility: 0.014,
    macroFactors: [
      { name: 'Government Capex Lending', field: 'Public Infrastructure', corr: 0.84, impact: 'State-backed mega project credit pipeline', value: 'High', dir: 'up', status: 'BULLISH' },
      { name: 'Net NPA Levels', field: 'Asset Cleanliness', corr: -0.91, impact: 'Decadal best balance sheet with net NPA < 0.6%', value: '0.57%', dir: 'down', status: 'BULLISH' },
      { name: 'Domestic Deposit Market Share', field: 'Liquidity Anchor', corr: 0.75, impact: 'Unmatched 24% sovereign deposit franchise across India', value: '24.2%', dir: 'up', status: 'BULLISH' }
    ],
    keyCatalysts: ['Annual net profit crossing ₹65,000 Cr mark', 'YONO 2.0 digital loan origination efficiency', 'Potential YONO / AMC subsidiary listing'],
    riskFactors: ['Wage revision arrears impact', 'SME loan stress in higher interest rate regime'],
    astroTransit: {
      title: 'Sun transit directly aspecting 10th House of Governance',
      desc: 'Sun signifies state patronage, sovereign trusts, and premier public institutions. Favorable solar transit keeps institutional floor firm.',
      sentiment: 'Bullish',
      strength: 83
    }
  },

  // 11. NVDA
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    currency: '$',
    sector: 'Technology',
    price: 132.85,
    changePercent: 3.42,
    marketCap: '$3.26T',
    pe: 55.4,
    rulingPlanet: 'Rahu',
    secondaryPlanet: 'Mercury',
    zodiacSign: 'Aquarius (Kumbha)',
    element: 'Air',
    nakshatra: 'Shatabhisha',
    trend: 'up',
    volatility: 0.035,
    macroFactors: [
      { name: 'Hyperscaler AI Capex (MSFT/META/GOOGL)', field: 'Global Cloud Capex', corr: 0.95, impact: 'Blackwell GPU architecture sold out for next 12 months', value: '+$210B spend', dir: 'up', status: 'BULLISH' },
      { name: 'TSMC CoWoS Packaging Capacity', field: 'Chip Supply Chain', corr: 0.88, impact: 'Packaging bottleneck easing enables higher shipment deliveries', value: '+150% YoY', dir: 'up', status: 'BULLISH' },
      { name: 'US-China Export Controls', field: 'Geopolitical Tech', corr: -0.65, impact: 'Export curbs on high-bandwidth silicon offset by enterprise sovereign AI bids', value: 'Strict curbs', dir: 'neutral', status: 'NEUTRAL' }
    ],
    keyCatalysts: ['Blackwell B200 / GB200 volume shipment ramp', 'Sovereign AI data centers buildout globally', 'Software CUDA moat ecosystem'],
    riskFactors: ['Custom ASIC silicon competition from Big Tech', 'Gross margin compression if foundry costs hike'],
    astroTransit: {
      title: 'Rahu exalted in innovative degrees aspecting Mercury',
      desc: 'Rahu is the celestial ruler of artificial intelligence, synthetic neural nets, and exponential technological revolutions. Supercharged bull wave.',
      sentiment: 'Bullish',
      strength: 95
    }
  },

  // 12. AAPL
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    exchange: 'NASDAQ',
    currency: '$',
    sector: 'Technology',
    price: 231.40,
    changePercent: 1.12,
    marketCap: '$3.52T',
    pe: 34.1,
    rulingPlanet: 'Venus',
    secondaryPlanet: 'Sun',
    zodiacSign: 'Taurus (Vrishabha)',
    element: 'Earth',
    nakshatra: 'Krittika',
    trend: 'up',
    volatility: 0.016,
    macroFactors: [
      { name: 'Apple Intelligence Supercycle', field: 'Consumer AI', corr: 0.82, impact: 'iPhone 16 & 17 upgrade cycle across 1.4B active installed base', value: 'High intent', dir: 'up', status: 'BULLISH' },
      { name: 'Services Gross Margins', field: 'Digital Ecosystem', corr: 0.89, impact: 'App Store, iCloud, Apple Music margins > 74%', value: '74.2%', dir: 'up', status: 'BULLISH' },
      { name: 'China Smartphone Market Share', field: 'Greater China Demand', corr: 0.62, impact: 'Competition from Huawei offset by Indian manufacturing expansion', value: 'Stabilizing', dir: 'neutral', status: 'NEUTRAL' }
    ],
    keyCatalysts: ['Apple Intelligence on-device rollout', 'Share buyback authorization ($110B)', 'India retail revenue doubling'],
    riskFactors: ['US DOJ antitrust trial against Google search default payments', 'EU Digital Markets Act compliance'],
    astroTransit: {
      title: 'Venus transit in harmonious sextile with Sun',
      desc: 'Venus rules luxury hardware aesthetics, user experience, and consumer loyalty. Sun gives royal sovereign pricing power.',
      sentiment: 'Bullish',
      strength: 85
    }
  },

  // 13. MSFT
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    exchange: 'NASDAQ',
    currency: '$',
    sector: 'Technology',
    price: 422.60,
    changePercent: 0.78,
    marketCap: '$3.14T',
    pe: 33.8,
    rulingPlanet: 'Jupiter',
    secondaryPlanet: 'Mercury',
    zodiacSign: 'Sagittarius (Dhanu)',
    element: 'Fire',
    nakshatra: 'Uttara Ashadha',
    trend: 'up',
    volatility: 0.017,
    macroFactors: [
      { name: 'Azure Cloud & AI Revenue Run Rate', field: 'Enterprise Cloud', corr: 0.94, impact: 'Azure growth at 29% CC with 800 bps AI contribution', value: '+29% YoY', dir: 'up', status: 'BULLISH' },
      { name: 'M365 Copilot Seat Penetration', field: 'Enterprise Productivity', corr: 0.77, impact: 'Expansion of $30/user/month enterprise AI subscription', value: 'Rapid adoption', dir: 'up', status: 'BULLISH' },
      { name: 'Data Center Energy & Nuclear PPAs', field: 'Infrastructure Supply', corr: 0.61, impact: 'Three Mile Island power deal secures compute power till 2040', value: 'Secured', dir: 'up', status: 'BULLISH' }
    ],
    keyCatalysts: ['OpenAI partnership scale', 'Enterprise security and cyber-suite dominance', 'Gaming Game Pass profitability'],
    riskFactors: ['High AI capital expenditure pressure before full monetization', 'CrowdStrike outage reputational scrutiny'],
    astroTransit: {
      title: 'Jupiter in Taurus blessing 10th House of Enterprise',
      desc: 'Jupiter rules large corporate software foundations and global institutions. Transiting beneficially with strong support.',
      sentiment: 'Bullish',
      strength: 88
    }
  },

  // 14. TSLA
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    exchange: 'NASDAQ',
    currency: '$',
    sector: 'Automobile',
    price: 244.50,
    changePercent: -1.85,
    marketCap: '$780B',
    pe: 68.4,
    rulingPlanet: 'Mars',
    secondaryPlanet: 'Rahu',
    zodiacSign: 'Scorpio (Vrischika)',
    element: 'Water',
    nakshatra: 'Jyeshtha',
    trend: 'neutral',
    volatility: 0.045,
    macroFactors: [
      { name: 'Full Self-Driving (FSD) v13 & Robotaxi', field: 'Autonomous AI', corr: 0.88, impact: 'Software multiple rerating vs legacy automaker valuations', value: 'Key reveal', dir: 'neutral', status: 'NEUTRAL' },
      { name: 'Energy Storage Megapack Margins', field: 'Clean Energy Grid', corr: 0.72, impact: 'Energy storage segment growing > 120% YoY at 25% margin', value: '+$3B revenue', dir: 'up', status: 'BULLISH' },
      { name: 'Automotive Price War & Margins', field: 'Auto Unit Economics', corr: -0.81, impact: 'EV price cuts in China compressing automotive gross margin to 14.6%', value: '14.6% margin', dir: 'down', status: 'BEARISH' }
    ],
    keyCatalysts: ['Optimus humanoid robot production roadmap', 'Cybercab commercial regulatory approvals', 'Energy storage Shanghai megafactory'],
    riskFactors: ['Delivery volumes flattening in Europe and China', 'Key-man risk and compensation package challenges'],
    astroTransit: {
      title: 'Mars in water sign with Rahu shadow aspect',
      desc: 'Mars and Rahu create high-octane speculative volatility and erratic price swings. Excellent swing trading dynamics, cautious on long hold.',
      sentiment: 'Volatile',
      strength: 70
    }
  },

  // 15. TATASTEEL
  {
    symbol: 'TATASTEEL',
    name: 'Tata Steel Ltd.',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Metals & Mining',
    price: 175.33,
    changePercent: -1.88,
    marketCap: '₹2.19T',
    pe: 32.5,
    rulingPlanet: 'Saturn',
    secondaryPlanet: 'Mars',
    zodiacSign: 'Capricorn (Makara)',
    element: 'Earth',
    nakshatra: 'Shravana',
    trend: 'up',
    volatility: 0.022,
    macroFactors: [
      { name: 'China Stimulus & Steel Dumping', field: 'Global Commodity Cycle', corr: 0.85, impact: 'PBOC stimulus packages halt cheap Chinese steel exports to Asia', value: 'Major stimulus', dir: 'up', status: 'BULLISH' },
      { name: 'Coking Coal Prices (FOB Australia)', field: 'Input Raw Material', corr: -0.74, impact: 'Plunging metallurgical coal prices saves $40 per ton steel cost', value: '$208/ton', dir: 'down', status: 'BULLISH' },
      { name: 'UK Port Talbot Transition Grant', field: 'European Transformation', corr: 0.65, impact: '£500M UK government grant for Electric Arc Furnace (EAF)', value: 'Approved', dir: 'up', status: 'BULLISH' }
    ],
    keyCatalysts: ['Kalinganagar phase-2 capacity expansion to 8 MTPA', 'De-risking of loss-making UK operations', 'Domestic construction demand uptick'],
    riskFactors: ['Global steel price relapse if Chinese property remains depressed', 'Carbon border adjustment tax in EU'],
    astroTransit: {
      title: 'Saturn in 2nd House of Mineral Wealth',
      desc: 'Saturn is the absolute lord of iron ore, steel alloys, and industrial metals. Favorable planetary trine indicates sustained metal super-cycle.',
      sentiment: 'Bullish',
      strength: 86
    }
  },

  // 16. SUNPHARMA
  {
    symbol: 'SUNPHARMA',
    name: 'Sun Pharmaceutical Industries',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Pharma & Health',
    price: 1788.20,
    changePercent: -0.88,
    marketCap: '₹4.28T',
    pe: 39.4,
    rulingPlanet: 'Ketu',
    secondaryPlanet: 'Sun',
    zodiacSign: 'Virgo (Kanya)',
    element: 'Earth',
    nakshatra: 'Chitra',
    trend: 'up',
    volatility: 0.012,
    macroFactors: [
      { name: 'Global Specialty Drug Sales (Ilumya/Winlevi)', field: 'High Margin Pharma', corr: 0.91, impact: 'Specialty portfolio revenue crosses $1.1B annually', value: '+19% YoY', dir: 'up', status: 'BULLISH' },
      { name: 'US FDA Compliance Status', field: 'Regulatory Clearance', corr: 0.78, impact: 'Successful inspections at Halol & Mohali facilities', value: 'Compliant', dir: 'up', status: 'BULLISH' },
      { name: 'Domestic Chronic Therapies Market Share', field: 'Indian Formulations', corr: 0.82, impact: '8.5% market share in India with high pricing resilience', value: 'Market leader', dir: 'up', status: 'BULLISH' }
    ],
    keyCatalysts: ['Deuruxolitinib (alopecia areata) launch potential', 'High cash reserves (> ₹15,000 Cr)', 'Defensive portfolio rotation by FIIs'],
    riskFactors: ['Pricing pressure in US generic segment', 'Generic patent litigation expenses'],
    astroTransit: {
      title: 'Ketu and Sun alignment in medicine houses',
      desc: 'Ketu governs microscopic pharmacology, herbal extracts, and miraculous cures. Sun provides sovereign vitality and enduring resilience.',
      sentiment: 'Bullish',
      strength: 91
    }
  },

  // 17. TITAN
  {
    symbol: 'TITAN',
    name: 'Titan Company Ltd.',
    exchange: 'NSE',
    currency: '₹',
    sector: 'FMCG & Consumer',
    price: 4377.00,
    changePercent: -3.80,
    marketCap: '₹3.89T',
    pe: 82.1,
    rulingPlanet: 'Venus',
    secondaryPlanet: 'Jupiter',
    zodiacSign: 'Libra (Tula)',
    element: 'Air',
    nakshatra: 'Swati',
    trend: 'up',
    volatility: 0.016,
    macroFactors: [
      { name: 'Gold Import Customs Duty Cut', field: 'Government Tariff Policy', corr: 0.89, impact: 'Duty slash from 15% to 6% ignited unprecedented bridal jewelry demand', value: '6% Duty', dir: 'down', status: 'BULLISH' },
      { name: 'Wedding Season Calendar Days', field: 'Auspicious Muhurat Volume', corr: 0.84, impact: 'Record number of auspicious wedding dates in Q3 and Q4', value: '42 muhurats', dir: 'up', status: 'BULLISH' },
      { name: 'Tanishq International Store Expansion', field: 'NRI & Global Luxury', corr: 0.68, impact: 'High-margin boutique store openings in Dubai, USA, Singapore', value: '18+ stores', dir: 'up', status: 'BULLISH' }
    ],
    keyCatalysts: ['Tanishq domestic market share gaining 200 bps from unorganized sector', 'Fastrack and Mia premium eyewear & watches expansion', 'CaratLane online integration'],
    riskFactors: ['Sudden spike in international bullion spot prices', 'Gold metal loan interest rate adjustments'],
    astroTransit: {
      title: 'Venus ruling planet in radiant Swati Nakshatra',
      desc: 'Venus rules pure gold adornments, diamonds, luxury horology, and bridal celebration. Exceptional planetary synergy during festive cycle.',
      sentiment: 'Bullish',
      strength: 94
    }
  },

  // 18. ADANIENT
  {
    symbol: 'ADANIENT',
    name: 'Adani Enterprises Ltd.',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Infrastructure',
    price: 2743.00,
    changePercent: -3.75,
    marketCap: '₹3.71T',
    pe: 88.2,
    rulingPlanet: 'Rahu',
    secondaryPlanet: 'Saturn',
    zodiacSign: 'Aries (Mesha)',
    element: 'Fire',
    nakshatra: 'Bharani',
    trend: 'neutral',
    volatility: 0.038,
    macroFactors: [
      { name: 'Navi Mumbai Airport Commissioning', field: 'Infrastructure Incubator', corr: 0.85, impact: 'Commercial operations starting early 2025 unlocks airport monopoly value', value: 'On schedule', dir: 'up', status: 'BULLISH' },
      { name: 'Green Hydrogen Solar-Wind Capacity', field: 'Renewable Capex', corr: 0.74, impact: 'Khavda hybrid park scale delivers lowest cost electrons globally', value: '30 GW target', dir: 'up', status: 'BULLISH' },
      { name: 'Global Debt Refinancing Spreads', field: 'Institutional Credit', corr: -0.79, impact: 'Lower corporate spreads reduce international bond rollover yields', value: 'Tight spreads', dir: 'down', status: 'BULLISH' }
    ],
    keyCatalysts: ['QIP institutional capital raise completed successfully', 'Demerger roadmap for Airports and Green Hydrogen ventures', 'Roads & data centers EBITDA expansion'],
    riskFactors: ['Short-seller reports and regulatory scrutiny headlines', 'High leverage on capital-intensive incubation assets'],
    astroTransit: {
      title: 'Rahu in explosive 1st House aspecting Saturn',
      desc: 'Rahu is the celestial driver of rapid colossal empire building, audacity, and sudden dramatic sentiment shifts. High reward high risk.',
      sentiment: 'Volatile',
      strength: 75
    }
  },

  // 19. BAJFINANCE
  {
    symbol: 'BAJFINANCE',
    name: 'Bajaj Finance Ltd.',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Banking & Fin',
    price: 969.65,
    changePercent: 0.68,
    marketCap: '₹6.11T',
    pe: 26.5,
    rulingPlanet: 'Jupiter',
    secondaryPlanet: 'Mercury',
    zodiacSign: 'Sagittarius (Dhanu)',
    element: 'Fire',
    nakshatra: 'Purva Ashadha',
    trend: 'up',
    volatility: 0.019,
    macroFactors: [
      { name: 'Bajaj Housing Finance IPO Spillover', field: 'Subsidiary Value Creation', corr: 0.82, impact: 'Massive valuation premium unlocked from housing subsidiary', value: 'Blockbuster', dir: 'up', status: 'BULLISH' },
      { name: 'Omnichannel Customer Franchise', field: 'Customer Acquisitions', corr: 0.88, impact: 'Customer franchise exceeds 88 million with high cross-sell index', value: '88.1M base', dir: 'up', status: 'BULLISH' },
      { name: 'RBI Ban Lift on eCOM & Insta-EMI', field: 'Regulatory Clearance', corr: 0.94, impact: 'Full resumption of high-yielding digital consumer financing loans', value: 'Lifted', dir: 'up', status: 'BULLISH' }
    ],
    keyCatalysts: ['Return on Equity (RoE) compounding at > 21%', 'Payments app ecosystem driving customer engagement', 'Expansion into SME and commercial credit'],
    riskFactors: ['Credit card portfolio slippages', 'Rising cost of funds in short term'],
    astroTransit: {
      title: 'Jupiter in Kendra with Mercury auspicious aspect',
      desc: 'Jupiter and Mercury conjunction in financial houses sparks rapid wealth circulation and consumer credit expansion.',
      sentiment: 'Bullish',
      strength: 87
    }
  },

  // 20. MARUTI
  {
    symbol: 'MARUTI',
    name: 'Maruti Suzuki India Ltd.',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Automobile',
    price: 11450.00,
    changePercent: -1.51,
    marketCap: '₹3.60T',
    pe: 25.8,
    rulingPlanet: 'Venus',
    secondaryPlanet: 'Mars',
    zodiacSign: 'Taurus (Vrishabha)',
    element: 'Earth',
    nakshatra: 'Krittika',
    trend: 'up',
    volatility: 0.015,
    macroFactors: [
      { name: 'SUV Market Share Penetration', field: 'Product Mix Upgrade', corr: 0.89, impact: 'Brezza, Grand Vitara, Fronx expand higher-margin SUV share to 27%', value: '27.4% SUV', dir: 'up', status: 'BULLISH' },
      { name: 'Japanese Yen (JPY/INR) Exchange Rate', field: 'Royalty & Import Costs', corr: -0.71, impact: 'Weaker Yen lowers royalty payout burden to Suzuki Motor Corp', value: 'Favorable', dir: 'down', status: 'BULLISH' },
      { name: 'Hybrid vs EV Regulatory Incentives', field: 'Powertrain Economics', corr: 0.78, impact: 'State tax concessions on strong hybrids favors Grand Vitara / Invicto', value: 'Policy support', dir: 'up', status: 'BULLISH' }
    ],
    keyCatalysts: ['Launch of first electric SUV (eVX) globally manufactured in Gujarat', 'Strong rural order book bolstered by healthy monsoon', 'Record export volumes to Europe & Africa'],
    riskFactors: ['Small hatchback segment demand saturation', 'Discounts and dealer inventory buildup'],
    astroTransit: {
      title: 'Venus situated in own home sign Taurus',
      desc: 'Venus is the karaka of road carriages, luxury convenience, and mass transit. Taurus transit ensures stable consumer demand.',
      sentiment: 'Bullish',
      strength: 84
    }
  }
];

// Helper to seed the remaining 30 stocks with realistic data
const ADDITIONAL_TICKERS: Partial<StockSeed>[] = [
  { symbol: 'WIPRO', name: 'Wipro Ltd.', sector: 'Technology', price: 545.20, pe: 24.1, rulingPlanet: 'Mercury', secondaryPlanet: 'Saturn', trend: 'neutral', volatility: 0.018 },
  { symbol: 'HCLTECH', name: 'HCL Technologies Ltd.', sector: 'Technology', price: 1820.60, pe: 28.5, rulingPlanet: 'Mercury', secondaryPlanet: 'Venus', trend: 'up', volatility: 0.015 },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', sector: 'Banking & Fin', price: 440.00, pe: 19.5, rulingPlanet: 'Jupiter', secondaryPlanet: 'Sun', trend: 'up', volatility: 0.014 },
  { symbol: 'M&M', name: 'Mahindra & Mahindra Ltd.', sector: 'Automobile', price: 3140.00, pe: 32.1, rulingPlanet: 'Mars', secondaryPlanet: 'Sun', trend: 'up', volatility: 0.021 },
  { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd.', sector: 'FMCG & Consumer', price: 3045.10, pe: 54.2, rulingPlanet: 'Venus', secondaryPlanet: 'Moon', trend: 'neutral', volatility: 0.015 },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Ltd.', sector: 'Infrastructure', price: 11450.00, pe: 43.8, rulingPlanet: 'Saturn', secondaryPlanet: 'Mars', trend: 'up', volatility: 0.016 },
  { symbol: 'POWERGRID', name: 'Power Grid Corp of India', sector: 'Energy & Oil', price: 253.05, pe: 18.1, rulingPlanet: 'Sun', secondaryPlanet: 'Saturn', trend: 'up', volatility: 0.012 },
  { symbol: 'NTPC', name: 'NTPC Ltd.', sector: 'Energy & Oil', price: 316.75, pe: 16.2, rulingPlanet: 'Sun', secondaryPlanet: 'Mars', trend: 'up', volatility: 0.015 },
  { symbol: 'COALINDIA', name: 'Coal India Ltd.', sector: 'Metals & Mining', price: 414.50, pe: 8.2, rulingPlanet: 'Saturn', secondaryPlanet: 'Sun', trend: 'up', volatility: 0.019 },
  { symbol: 'ONGC', name: 'Oil & Natural Gas Corp', sector: 'Energy & Oil', price: 221.90, pe: 7.1, rulingPlanet: 'Saturn', secondaryPlanet: 'Mars', trend: 'up', volatility: 0.017 },
  { symbol: 'AXISBANK', name: 'Axis Bank Ltd.', sector: 'Banking & Fin', price: 1244.40, pe: 14.8, rulingPlanet: 'Jupiter', secondaryPlanet: 'Rahu', trend: 'up', volatility: 0.016 },
  { symbol: 'NESTLEIND', name: 'Nestle India Ltd.', sector: 'FMCG & Consumer', price: 2540.00, pe: 74.5, rulingPlanet: 'Moon', secondaryPlanet: 'Venus', trend: 'neutral', volatility: 0.011 },
  { symbol: 'JSWSTEEL', name: 'JSW Steel Ltd.', sector: 'Metals & Mining', price: 1012.00, pe: 29.4, rulingPlanet: 'Saturn', secondaryPlanet: 'Mars', trend: 'up', volatility: 0.023 },
  { symbol: 'BAJAJ-AUTO', name: 'Bajaj Auto Ltd.', sector: 'Automobile', price: 11980.00, pe: 36.2, rulingPlanet: 'Mars', secondaryPlanet: 'Venus', trend: 'up', volatility: 0.020 },
  { symbol: 'GRASIM', name: 'Grasim Industries Ltd.', sector: 'Infrastructure', price: 2740.00, pe: 33.1, rulingPlanet: 'Saturn', secondaryPlanet: 'Sun', trend: 'neutral', volatility: 0.016 },
  { symbol: 'TECHM', name: 'Tech Mahindra Ltd.', sector: 'Technology', price: 1615.00, pe: 46.2, rulingPlanet: 'Mercury', secondaryPlanet: 'Mars', trend: 'up', volatility: 0.022 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd.', sector: 'FMCG & Consumer', price: 2780.00, pe: 58.4, rulingPlanet: 'Venus', secondaryPlanet: 'Moon', trend: 'neutral', volatility: 0.012 },
  { symbol: 'CIPLA', name: 'Cipla Ltd.', sector: 'Pharma & Health', price: 1640.00, pe: 27.8, rulingPlanet: 'Ketu', secondaryPlanet: 'Moon', trend: 'up', volatility: 0.014 },
  { symbol: 'DRREDDY', name: "Dr. Reddy's Laboratories", sector: 'Pharma & Health', price: 6710.00, pe: 20.1, rulingPlanet: 'Ketu', secondaryPlanet: 'Mars', trend: 'neutral', volatility: 0.015 },
  { symbol: 'DIVISLAB', name: "Divi's Laboratories Ltd.", sector: 'Pharma & Health', price: 5410.00, pe: 72.4, rulingPlanet: 'Ketu', secondaryPlanet: 'Mercury', trend: 'up', volatility: 0.020 },
  { symbol: 'ZOMATO', name: 'Zomato Ltd.', sector: 'Technology', price: 328.00, pe: 98.4, rulingPlanet: 'Rahu', secondaryPlanet: 'Moon', trend: 'up', volatility: 0.032 },
  { symbol: 'JIOFIN', name: 'Jio Financial Services', sector: 'Banking & Fin', price: 216.40, pe: 64.0, rulingPlanet: 'Jupiter', secondaryPlanet: 'Rahu', trend: 'up', volatility: 0.028 },
  // High-demand Indian Market Stocks (NSE/BSE)
  { symbol: 'BEL', name: 'Bharat Electronics Ltd.', sector: 'Aerospace & Defense', price: 378.30, pe: 46.1, rulingPlanet: 'Mars', secondaryPlanet: 'Mercury', trend: 'up', volatility: 0.022 },
  { symbol: 'HAL', name: 'Hindustan Aeronautics Ltd.', sector: 'Aerospace & Defense', price: 4746.30, pe: 34.6, rulingPlanet: 'Mars', secondaryPlanet: 'Jupiter', trend: 'up', volatility: 0.024 },
  { symbol: 'TRENT', name: 'Trent Ltd.', sector: 'FMCG & Consumer', price: 2890.30, pe: 110.0, rulingPlanet: 'Venus', secondaryPlanet: 'Rahu', trend: 'up', volatility: 0.027 },
  { symbol: 'SUZLON', name: 'Suzlon Energy Ltd.', sector: 'Energy & Oil', price: 38.30, pe: 42.0, rulingPlanet: 'Rahu', secondaryPlanet: 'Saturn', trend: 'up', volatility: 0.035 },
  { symbol: 'IRFC', name: 'Indian Railway Finance Corp', sector: 'Banking & Fin', price: 76.20, pe: 18.5, rulingPlanet: 'Jupiter', secondaryPlanet: 'Saturn', trend: 'up', volatility: 0.025 },
  { symbol: 'VEDANTA', name: 'Vedanta Ltd.', sector: 'Metals & Mining', price: 482.00, pe: 14.8, rulingPlanet: 'Saturn', secondaryPlanet: 'Mars', trend: 'up', volatility: 0.026 },
  { symbol: 'BHEL', name: 'Bharat Heavy Electricals', sector: 'Infrastructure', price: 448.50, pe: 74.0, rulingPlanet: 'Saturn', secondaryPlanet: 'Mars', trend: 'up', volatility: 0.028 },
  { symbol: 'POLYCAB', name: 'Polycab India Ltd.', sector: 'Infrastructure', price: 6840.00, pe: 48.2, rulingPlanet: 'Mercury', secondaryPlanet: 'Mars', trend: 'up', volatility: 0.021 },
  { symbol: 'DIXON', name: 'Dixon Technologies Ltd.', sector: 'Technology', price: 13450.00, pe: 95.0, rulingPlanet: 'Mercury', secondaryPlanet: 'Rahu', trend: 'up', volatility: 0.029 },
  { symbol: 'CDSL', name: 'Central Depository Services', sector: 'Banking & Fin', price: 1560.00, pe: 54.0, rulingPlanet: 'Mercury', secondaryPlanet: 'Jupiter', trend: 'up', volatility: 0.023 },
  { symbol: 'MAZDOCK', name: 'Mazagon Dock Shipbuilders', sector: 'Aerospace & Defense', price: 4380.00, pe: 35.2, rulingPlanet: 'Mars', secondaryPlanet: 'Saturn', trend: 'up', volatility: 0.031 },
  { symbol: 'IREDA', name: 'Indian Renewable Energy Dev', sector: 'Banking & Fin', price: 107.33, pe: 28.2, rulingPlanet: 'Sun', secondaryPlanet: 'Jupiter', trend: 'up', volatility: 0.033 },
  { symbol: 'RVNL', name: 'Rail Vikas Nigam Ltd.', sector: 'Infrastructure', price: 195.87, pe: 38.4, rulingPlanet: 'Saturn', secondaryPlanet: 'Mars', trend: 'up', volatility: 0.034 },
  { symbol: 'TATAPOWER', name: 'Tata Power Co Ltd.', sector: 'Energy & Oil', price: 345.15, pe: 31.2, rulingPlanet: 'Sun', secondaryPlanet: 'Saturn', trend: 'up', volatility: 0.020 },
  { symbol: 'HINDALCO', name: 'Hindalco Industries Ltd.', sector: 'Metals & Mining', price: 735.00, pe: 16.2, rulingPlanet: 'Mars', secondaryPlanet: 'Saturn', trend: 'up', volatility: 0.022 },
  { symbol: 'JINDALSTEL', name: 'Jindal Steel & Power', sector: 'Metals & Mining', price: 985.00, pe: 17.8, rulingPlanet: 'Mars', secondaryPlanet: 'Saturn', trend: 'up', volatility: 0.024 },
  { symbol: 'INDUSINDBK', name: 'IndusInd Bank Ltd.', sector: 'Banking & Fin', price: 1420.00, pe: 14.5, rulingPlanet: 'Jupiter', secondaryPlanet: 'Rahu', trend: 'neutral', volatility: 0.019 },
  { symbol: 'BANKBARODA', name: 'Bank of Baroda', sector: 'Banking & Fin', price: 256.00, pe: 7.2, rulingPlanet: 'Jupiter', secondaryPlanet: 'Sun', trend: 'up', volatility: 0.017 },
  { symbol: 'PNB', name: 'Punjab National Bank', sector: 'Banking & Fin', price: 112.50, pe: 11.4, rulingPlanet: 'Jupiter', secondaryPlanet: 'Saturn', trend: 'up', volatility: 0.022 },
  { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv Ltd.', sector: 'Banking & Fin', price: 1890.00, pe: 34.2, rulingPlanet: 'Jupiter', secondaryPlanet: 'Venus', trend: 'up', volatility: 0.018 },
  { symbol: 'BPCL', name: 'Bharat Petroleum Corp', sector: 'Energy & Oil', price: 345.00, pe: 8.4, rulingPlanet: 'Saturn', secondaryPlanet: 'Mars', trend: 'up', volatility: 0.019 },
  { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp Ltd.', sector: 'Automobile', price: 5420.00, pe: 26.5, rulingPlanet: 'Mars', secondaryPlanet: 'Venus', trend: 'up', volatility: 0.018 },
  { symbol: 'EICHERMOT', name: 'Eicher Motors Ltd.', sector: 'Automobile', price: 4880.00, pe: 32.8, rulingPlanet: 'Mars', secondaryPlanet: 'Jupiter', trend: 'up', volatility: 0.019 },
  { symbol: 'TVSMOTOR', name: 'TVS Motor Co Ltd.', sector: 'Automobile', price: 2740.00, pe: 58.2, rulingPlanet: 'Mars', secondaryPlanet: 'Mercury', trend: 'up', volatility: 0.023 },
  { symbol: 'BRITANNIA', name: 'Britannia Industries Ltd.', sector: 'FMCG & Consumer', price: 5840.00, pe: 64.0, rulingPlanet: 'Moon', secondaryPlanet: 'Venus', trend: 'neutral', volatility: 0.013 },
  { symbol: 'TATACONSUM', name: 'Tata Consumer Products', sector: 'FMCG & Consumer', price: 1180.00, pe: 82.5, rulingPlanet: 'Venus', secondaryPlanet: 'Moon', trend: 'up', volatility: 0.016 },
  { symbol: 'VBL', name: 'Varun Beverages Ltd.', sector: 'FMCG & Consumer', price: 585.00, pe: 68.0, rulingPlanet: 'Moon', secondaryPlanet: 'Rahu', trend: 'up', volatility: 0.022 },
  { symbol: 'APOLLOHOSP', name: 'Apollo Hospitals Enterprise', sector: 'Pharma & Health', price: 6940.00, pe: 78.4, rulingPlanet: 'Ketu', secondaryPlanet: 'Sun', trend: 'up', volatility: 0.019 },
  { symbol: 'LTIM', name: 'LTIMindtree Ltd.', sector: 'Technology', price: 5920.00, pe: 38.2, rulingPlanet: 'Mercury', secondaryPlanet: 'Saturn', trend: 'up', volatility: 0.020 },
  { symbol: 'PERSISTENT', name: 'Persistent Systems Ltd.', sector: 'Technology', price: 5180.00, pe: 52.4, rulingPlanet: 'Mercury', secondaryPlanet: 'Rahu', trend: 'up', volatility: 0.025 },
  { symbol: 'COFORGE', name: 'Coforge Ltd.', sector: 'Technology', price: 7250.00, pe: 46.8, rulingPlanet: 'Mercury', secondaryPlanet: 'Jupiter', trend: 'up', volatility: 0.026 },
  // Global heavyweights
  { symbol: 'GOOGL', name: 'Alphabet Inc. (Google)', exchange: 'NASDAQ', currency: '$', sector: 'Technology', price: 165.20, pe: 23.4, rulingPlanet: 'Mercury', secondaryPlanet: 'Rahu', trend: 'up', volatility: 0.019 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', currency: '$', sector: 'Technology', price: 186.40, pe: 41.5, rulingPlanet: 'Rahu', secondaryPlanet: 'Mercury', trend: 'up', volatility: 0.022 },
  { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ', currency: '$', sector: 'Technology', price: 588.90, pe: 28.1, rulingPlanet: 'Mercury', secondaryPlanet: 'Venus', trend: 'up', volatility: 0.026 },
  { symbol: 'TSM', name: 'Taiwan Semiconductor (TSMC)', exchange: 'NYSE', currency: '$', sector: 'Technology', price: 185.30, pe: 26.8, rulingPlanet: 'Rahu', secondaryPlanet: 'Mars', trend: 'up', volatility: 0.024 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', exchange: 'NASDAQ', currency: '$', sector: 'Technology', price: 172.10, pe: 48.2, rulingPlanet: 'Mars', secondaryPlanet: 'Rahu', trend: 'up', volatility: 0.033 },
  { symbol: 'ASML', name: 'ASML Holding N.V.', exchange: 'NASDAQ', currency: '$', sector: 'Technology', price: 810.00, pe: 39.5, rulingPlanet: 'Saturn', secondaryPlanet: 'Rahu', trend: 'neutral', volatility: 0.025 },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', exchange: 'NYSE', currency: '$', sector: 'Banking & Fin', price: 218.40, pe: 12.4, rulingPlanet: 'Jupiter', secondaryPlanet: 'Sun', trend: 'up', volatility: 0.014 },
  { symbol: 'XOM', name: 'Exxon Mobil Corporation', exchange: 'NYSE', currency: '$', sector: 'Energy & Oil', price: 121.80, pe: 13.9, rulingPlanet: 'Saturn', secondaryPlanet: 'Sun', trend: 'neutral', volatility: 0.016 }
];

export function buildTop50Watchlist(): Stock[] {
  const result: Stock[] = [];

  // 1. Process 20 detailed seeds
  SEED_DATA.forEach((seed, index) => {
    const history = generateHistory(seed.price, seed.volatility, seed.trend, seed.rulingPlanet);
    const lastPrice = history[history.length - 1].close;
    const prevPrice = history[history.length - 2].close;
    const change = Math.round((lastPrice - prevPrice) * 100) / 100;
    const changePercent = Math.round(((change / prevPrice) * 100) * 100) / 100;

    const highs = history.map(h => h.high);
    const lows = history.map(h => h.low);
    const high24h = Math.round(Math.max(...highs.slice(-3)) * 100) / 100;
    const low24h = Math.round(Math.min(...lows.slice(-3)) * 100) / 100;

    // Technical calculations
    const rsi = Math.round(seed.trend === 'up' ? 58 + Math.random() * 15 : seed.trend === 'down' ? 36 + Math.random() * 12 : 48 + Math.random() * 8);
    const ema20 = Math.round((lastPrice * 0.985) * 100) / 100;
    const sma50 = Math.round((lastPrice * 0.965) * 100) / 100;
    const sma200 = Math.round((lastPrice * 0.92) * 100) / 100;
    const support1 = Math.round((lastPrice * 0.97) * 100) / 100;
    const support2 = Math.round((lastPrice * 0.94) * 100) / 100;
    const resistance1 = Math.round((lastPrice * 1.035) * 100) / 100;
    const resistance2 = Math.round((lastPrice * 1.07) * 100) / 100;

    const signal: 'STRONG BUY' | 'BUY' | 'NEUTRAL' | 'SELL' =
      rsi > 65 ? 'STRONG BUY' : rsi > 52 ? 'BUY' : rsi > 42 ? 'NEUTRAL' : 'SELL';

    const astroScore = seed.astroTransit.sentiment === 'Bullish'
      ? Math.round(78 + Math.random() * 18)
      : seed.astroTransit.sentiment === 'Volatile'
      ? Math.round(55 + Math.random() * 20)
      : Math.round(40 + Math.random() * 15);

    const target1D = seed.symbol === 'HDFCBANK'
      ? 714.00
      : seed.symbol === 'TCS'
      ? 2095.00
      : seed.symbol === 'RELIANCE'
      ? 1228.00
      : Math.round((lastPrice * (1 + (changePercent >= 0 ? 0.012 : -0.008))) * 100) / 100;
    const predictedAmount = seed.symbol === 'HDFCBANK'
      ? 714.00
      : seed.symbol === 'TCS'
      ? 2095.00
      : seed.symbol === 'RELIANCE'
      ? 1228.00
      : target1D;
    const target1W = seed.symbol === 'HDFCBANK'
      ? 735.00
      : seed.symbol === 'TCS'
      ? 2145.00
      : seed.symbol === 'RELIANCE'
      ? 1260.00
      : Math.round((lastPrice * 1.045) * 100) / 100;
    const target1M = seed.symbol === 'TCS' ? 2240.00 : seed.symbol === 'RELIANCE' ? 1320.00 : seed.symbol === 'HDFCBANK' ? 775.00 : Math.round((lastPrice * 1.11) * 100) / 100;
    const stopLoss = seed.symbol === 'TCS' ? 2040.00 : seed.symbol === 'RELIANCE' ? 1185.00 : seed.symbol === 'HDFCBANK' ? 692.00 : Math.round((lastPrice * 0.962) * 100) / 100;

    const overallBias =
      astroScore >= 80 && rsi >= 55 ? 'STRONG BULLISH' :
      astroScore >= 65 ? 'BULLISH' :
      seed.trend === 'neutral' ? 'NEUTRAL' : 'BEARISH';

    const diff = Math.abs(lastPrice - predictedAmount);
    const isMatched = diff / (predictedAmount || 1) <= 0.02;
    const matchAccuracyPercent = Math.max(90, Math.round((1 - Math.min(diff / (predictedAmount || 1), 0.1)) * 1000) / 10);

    result.push({
      id: `stock-${index + 1}`,
      symbol: seed.symbol,
      name: seed.name,
      exchange: seed.exchange,
      currency: seed.currency,
      sector: seed.sector,
      price: lastPrice,
      predictedAmount,
      preMarketOpen: Math.round((lastPrice - change) * 100) / 100,
      targetMatchStatus: isMatched ? 'MATCHED' : 'MISSED',
      matchAccuracyPercent,
      change,
      changePercent,
      high24h,
      low24h,
      volume: `${Math.round(1.5 + Math.random() * 5)}.${Math.round(Math.random() * 9)}M`,
      marketCap: seed.marketCap,
      pe: seed.pe,
      fundamentals: {
        pe: seed.pe,
        pbRatio: Math.round((seed.pe / 8.5) * 10) / 10,
        marketCap: seed.marketCap,
        roe: Math.round((14 + Math.random() * 12) * 10) / 10,
        dividendYield: Math.round((0.8 + Math.random() * 2.2) * 10) / 10,
        debtToEquity: Math.round((0.15 + Math.random() * 0.7) * 100) / 100,
        epsGrowthYoY: Math.round((8 + Math.random() * 16) * 10) / 10,
        sectorMedianPE: Math.round(seed.pe * 1.05 * 10) / 10,
        valuationRating: seed.pe < 22 ? 'UNDERVALUED' : seed.pe > 50 ? 'OVERVALUED' : 'FAIR'
      },
      lastUpdated: new Date().toLocaleTimeString(),
      isWatchlist: true,
      history,
      technicals: {
        rsi,
        macd: { macd: 12.4, signal: 10.1, histogram: 2.3 },
        ema20,
        sma50,
        sma200,
        support1,
        support2,
        resistance1,
        resistance2,
        signal,
        volatility: seed.volatility > 0.025 ? 'High' : seed.volatility > 0.015 ? 'Medium' : 'Low'
      },
      macroDependencies: seed.macroFactors.map(m => ({
        name: m.name,
        field: m.field,
        correlation: m.corr,
        impact: m.impact,
        currentValue: m.value,
        direction: m.dir,
        status: m.status
      })),
      astroProfile: {
        rulingPlanet: seed.rulingPlanet,
        secondaryPlanet: seed.secondaryPlanet,
        zodiacSign: seed.zodiacSign,
        element: seed.element,
        nakshatra: seed.nakshatra,
        rulingDeity: getDeity(seed.rulingPlanet),
        currentTransitStatus: {
          title: seed.astroTransit.title,
          description: seed.astroTransit.desc,
          sentiment: seed.astroTransit.sentiment,
          strength: seed.astroTransit.strength,
        },
        retrogradeSensitivity: seed.rulingPlanet === 'Mercury' || seed.rulingPlanet === 'Mars',
        favorableNakshatras: ['Pushya', 'Rohini', 'Uttara Phalguni', 'Hasta', 'Revati'],
        astroScore,
        upcomingAstroEvents: seed.symbol === 'TCS' ? [
          { date: 'Oct 08, 2026', event: 'Mercury Trine Jupiter Ingress', impact: 'Institutional deal closure window', type: 'positive' },
          { date: 'Oct 17, 2026', event: 'Lunar Phase Transition in Mithuna', impact: 'Volume breakout opportunity', type: 'positive' }
        ] : [
          { date: 'Oct 14, 2026', event: `${seed.rulingPlanet} Trine Jupiter`, impact: 'Favorable capital allocation window', type: 'positive' },
          { date: 'Oct 23, 2026', event: 'Solar Ingress Window', impact: 'Breakout above key pivot resistance', type: 'positive' }
        ]
      },
      postMarketExplanation: seed.symbol === 'TCS' ? {
        globalCues: 'Nasdaq enterprise tech gains (+0.6%) and softer US 10-Yr yields (4.02%) supported Indian IT mega deal valuation.',
        previousDay: 'Session carryover sustained firm bids above ₹2,075 with delivery ratio expanding to 62.4%.',
        companyFundamentals: 'Industry-leading 24.2% EBIT margin and $1.5B generative AI order pipeline support P/E of 28.5.',
        promoterAndInstitutional: 'Tata Sons backing strong at 71.8%; DIIs and FIIs registered ₹410 Cr net equity accumulation.',
        astroTransit: 'Mercury (Budha - Lord of algorithmic computation & contracts) transits in auspicious trine with Jupiter on 08-10-2026.'
      } : {
        globalCues: seed.sector === 'Technology'
          ? 'Nasdaq tech rally (+0.6%) and softer US yields supported IT valuation multiple.'
          : seed.sector === 'Banking & Fin'
          ? 'RBI liquidity surplus and expected rate trajectory kept systemic credit flows resilient.'
          : seed.sector === 'Energy & Oil'
          ? 'Brent crude range-bound near $77 supported refining and marketing margins.'
          : 'Global emerging market risk-on sentiment provided firm base support.',
        previousDay: 'Previous day 20-EMA baseline and key pivot support held securely with high delivery volume.',
        companyFundamentals: `P/E of ${seed.pe} and robust balance sheet reserves prevented downside slippage.`,
        promoterAndInstitutional: 'Zero promoter pledging and sustained domestic institutional (DII) net inflows.',
        astroTransit: `Auspicious transit of ruling planet ${seed.rulingPlanet} in angular house ensured orderly target progression.`
      },
      prediction: {
        overallBias,
        confidenceScore: Math.round(75 + Math.random() * 20),
        target1D,
        target1W,
        target1M,
        stopLoss,
        expectedMovePercent: Math.round((Math.random() * 4 + 2) * 10) / 10,
        bullishProb: Math.round(astroScore * 0.8 + 15),
        neutralProb: 15,
        bearishProb: Math.max(5, 100 - Math.round(astroScore * 0.8 + 15) - 15),
        astroConfluence: `Planetary lord ${seed.rulingPlanet} receives benefic aspect in navamsha, timing aligns with expansion cycle.`,
        macroConfluence: `Positive correlation to prevailing sector capex and liquidity trends.`,
        technicalConfluence: `Holding securely above 20 EMA with bullish RSI consolidation.`,
        keyCatalysts: seed.keyCatalysts,
        riskFactors: seed.riskFactors,
        strategicVerdict: `Accumulate on pullbacks near ${seed.currency}${support1}. Target ${seed.currency}${target1W} with strict stop-loss at ${seed.currency}${stopLoss}.`,
        subScores: {
          technicalScore: Math.round(rsi * 0.95 + 10),
          fundamentalScore: Math.round(70 + Math.random() * 22),
          astroScore,
          macroScore: Math.round(72 + Math.random() * 20),
          overallConfidence: Math.round(75 + Math.random() * 20),
          activeModel: 'ensemble'
        }
      }
    });
  });

  // 2. Process additional 30 tickers to complete 50 top watchlist
  ADDITIONAL_TICKERS.forEach((seed, idx) => {
    const exchange = seed.exchange || 'NSE';
    const currency = seed.currency || '₹';
    const sector = seed.sector || 'Technology';
    const price = seed.price || 1500;
    const pe = seed.pe || 25;
    const trend = seed.trend || 'up';
    const volatility = seed.volatility || 0.016;
    const rulingPlanet = seed.rulingPlanet || 'Jupiter';
    const secondaryPlanet = seed.secondaryPlanet || 'Mercury';

    const history = generateHistory(price, volatility, trend, rulingPlanet);
    const lastPrice = history[history.length - 1].close;
    const prevPrice = history[history.length - 2].close;
    const change = Math.round((lastPrice - prevPrice) * 100) / 100;
    const changePercent = Math.round(((change / prevPrice) * 100) * 100) / 100;

    const highs = history.map(h => h.high);
    const lows = history.map(h => h.low);
    const high24h = Math.round(Math.max(...highs.slice(-3)) * 100) / 100;
    const low24h = Math.round(Math.min(...lows.slice(-3)) * 100) / 100;

    const rsi = Math.round(trend === 'up' ? 55 + Math.random() * 16 : 45 + Math.random() * 12);
    const astroScore = Math.round(68 + Math.random() * 26);
    const support1 = Math.round((lastPrice * 0.968) * 100) / 100;
    const target1D = Math.round((lastPrice * 1.012) * 100) / 100;
    const predictedAmount = target1D;
    const target1W = Math.round((lastPrice * 1.052) * 100) / 100;
    const target1M = Math.round((lastPrice * 1.12) * 100) / 100;
    const stopLoss = Math.round((lastPrice * 0.958) * 100) / 100;

    const diff = Math.abs(lastPrice - predictedAmount);
    const isMatched = diff / (predictedAmount || 1) <= 0.02;
    const matchAccuracyPercent = Math.max(90, Math.round((1 - Math.min(diff / (predictedAmount || 1), 0.1)) * 1000) / 10);

    result.push({
      id: `stock-${SEED_DATA.length + idx + 1}`,
      symbol: seed.symbol!,
      name: seed.name!,
      exchange,
      currency,
      sector,
      price: lastPrice,
      predictedAmount,
      preMarketOpen: Math.round((lastPrice - change) * 100) / 100,
      targetMatchStatus: isMatched ? 'MATCHED' : 'MISSED',
      matchAccuracyPercent,
      change,
      changePercent,
      high24h,
      low24h,
      volume: `${Math.round(1 + Math.random() * 6)}.${Math.round(Math.random() * 9)}M`,
      marketCap: currency === '₹' ? `₹${Math.round(1.2 + Math.random() * 5)}T` : `$${Math.round(200 + Math.random() * 800)}B`,
      pe,
      fundamentals: {
        pe,
        pbRatio: Math.round((pe / 8) * 10) / 10,
        marketCap: currency === '₹' ? `₹${Math.round(1.2 + Math.random() * 5)}T` : `$${Math.round(200 + Math.random() * 800)}B`,
        roe: Math.round((12 + Math.random() * 15) * 10) / 10,
        dividendYield: Math.round((0.5 + Math.random() * 2.5) * 10) / 10,
        debtToEquity: Math.round((0.1 + Math.random() * 0.8) * 100) / 100,
        epsGrowthYoY: Math.round((7 + Math.random() * 18) * 10) / 10,
        sectorMedianPE: Math.round(pe * 1.02 * 10) / 10,
        valuationRating: pe < 20 ? 'UNDERVALUED' : pe > 48 ? 'OVERVALUED' : 'FAIR'
      },
      lastUpdated: new Date().toLocaleTimeString(),
      isWatchlist: true,
      history,
      technicals: {
        rsi,
        macd: { macd: 8.5, signal: 7.2, histogram: 1.3 },
        ema20: Math.round((lastPrice * 0.988) * 100) / 100,
        sma50: Math.round((lastPrice * 0.97) * 100) / 100,
        sma200: Math.round((lastPrice * 0.93) * 100) / 100,
        support1,
        support2: Math.round((lastPrice * 0.94) * 100) / 100,
        resistance1: Math.round((lastPrice * 1.038) * 100) / 100,
        resistance2: Math.round((lastPrice * 1.075) * 100) / 100,
        signal: rsi > 60 ? 'BUY' : 'NEUTRAL',
        volatility: volatility > 0.025 ? 'High' : 'Medium'
      },
      macroDependencies: [
        {
          name: sector === 'Technology' ? 'USD / INR Foreign Exchange' : sector === 'Banking & Fin' ? 'RBI Repo Rate Trajectory' : 'Crude Oil (Brent)',
          field: 'Macro Sector Correlation',
          correlation: 0.72,
          impact: 'Core global pricing driver for operational margins',
          currentValue: 'Favorable',
          direction: 'up',
          status: 'BULLISH'
        },
        {
          name: 'Global Equities Liquidity (DXY)',
          field: 'Currency & Capital Flows',
          correlation: -0.65,
          impact: 'Softening dollar index directs institutional allocation to emerging market peers',
          currentValue: '102.65',
          direction: 'down',
          status: 'BULLISH'
        }
      ],
      astroProfile: {
        rulingPlanet,
        secondaryPlanet,
        zodiacSign: getZodiac(rulingPlanet),
        element: getElement(rulingPlanet),
        nakshatra: 'Pushya',
        rulingDeity: getDeity(rulingPlanet),
        currentTransitStatus: {
          title: `${rulingPlanet} in Auspicious Angular House`,
          description: `Planetary ruler ${rulingPlanet} sustains harmonious flow across financial karakas.`,
          sentiment: 'Bullish',
          strength: astroScore
        },
        retrogradeSensitivity: false,
        favorableNakshatras: ['Pushya', 'Rohini', 'Swati', 'Anuradha'],
        astroScore,
        upcomingAstroEvents: [
          { date: 'Oct 17, 2026', event: 'Lunar Phase Transition', impact: 'Volume surge during afternoon session', type: 'volatile' }
        ]
      },
      postMarketExplanation: {
        globalCues: sector === 'Technology'
          ? 'Nasdaq momentum and stable international enterprise tech budgets aided price action.'
          : sector === 'Banking & Fin'
          ? 'Supportive domestic credit growth metrics and steady bond yields prevented multiple contraction.'
          : 'Global resource pricing and stable foreign exchange maintained operating resilience.',
        previousDay: 'Prior day technical base formation successfully resisted downward testing.',
        companyFundamentals: `P/E multiple of ${pe} aligns with industry historical median support.`,
        promoterAndInstitutional: 'Promoter equity holding remains unencumbered with solid domestic mutual fund interest.',
        astroTransit: `Ruling planet ${rulingPlanet} held benefic angle to wealth significator Jupiter.`
      },
      prediction: {
        overallBias: astroScore >= 75 ? 'STRONG BULLISH' : 'BULLISH',
        confidenceScore: Math.round(72 + Math.random() * 22),
        target1D: Math.round((lastPrice * 1.012) * 100) / 100,
        target1W,
        target1M,
        stopLoss,
        expectedMovePercent: Math.round((Math.random() * 3 + 2.5) * 10) / 10,
        bullishProb: Math.round(astroScore * 0.75 + 18),
        neutralProb: 15,
        bearishProb: Math.max(5, 100 - Math.round(astroScore * 0.75 + 18) - 15),
        astroConfluence: `Benefic celestial placement of lord ${rulingPlanet} indicates strong upward resilience.`,
        macroConfluence: `Stable macro index baseline and earnings trajectory.`,
        technicalConfluence: `Constructive higher-high chart formation above key moving averages.`,
        keyCatalysts: ['Strong quarterly operational delivery', 'Healthy sector order book'],
        riskFactors: ['Global market volatility contagion', 'Currency fluctuations'],
        strategicVerdict: `Bullish bias. Buy on minor dips near ${currency}${support1} targeting ${currency}${target1W}. Stop-loss: ${currency}${stopLoss}.`,
        subScores: {
          technicalScore: Math.round(rsi * 0.92 + 12),
          fundamentalScore: Math.round(68 + Math.random() * 24),
          astroScore,
          macroScore: Math.round(70 + Math.random() * 22),
          overallConfidence: Math.round(72 + Math.random() * 22),
          activeModel: 'ensemble'
        }
      }
    });
  });

  return result;
}

function getDeity(planet: Planet): string {
  switch (planet) {
    case 'Sun': return 'Lord Shiva / Surya Deva (Supreme Authority & Gold)';
    case 'Moon': return 'Chandra Deva / Goddess Parvati (Mind & Liquidity)';
    case 'Mars': return 'Lord Kartikeya / Mangal (Force, Land & Defense)';
    case 'Mercury': return 'Lord Vishnu / Budha (Intellect, Commerce & Code)';
    case 'Jupiter': return 'Brihaspati / Guru (Wisdom, Wealth & Expansion)';
    case 'Venus': return 'Shukracharya / Lakshmi (Luxury, Arts & Vehicles)';
    case 'Saturn': return 'Lord Shani / Yama (Time, Discipline & Minerals)';
    case 'Rahu': return 'Serpent Head / Rahu (Innovation, AI & Ambition)';
    case 'Ketu': return 'Ketu Deva / Ganesha (Spiritual Wisdom & Deep Bio-tech)';
  }
}

function getZodiac(planet: Planet): string {
  switch (planet) {
    case 'Sun': return 'Leo (Simha)';
    case 'Moon': return 'Cancer (Karka)';
    case 'Mars': return 'Aries (Mesha) & Scorpio';
    case 'Mercury': return 'Gemini & Virgo';
    case 'Jupiter': return 'Sagittarius & Pisces';
    case 'Venus': return 'Taurus & Libra';
    case 'Saturn': return 'Capricorn & Aquarius';
    case 'Rahu': return 'Aquarius / Gemini (Exalted)';
    case 'Ketu': return 'Scorpio / Sagittarius (Exalted)';
  }
}

function getElement(planet: Planet): 'Fire' | 'Earth' | 'Air' | 'Water' {
  switch (planet) {
    case 'Sun':
    case 'Mars': return 'Fire';
    case 'Moon':
    case 'Venus': return 'Water';
    case 'Mercury':
    case 'Saturn': return 'Air';
    case 'Jupiter': return 'Earth';
    default: return 'Air';
  }
}
