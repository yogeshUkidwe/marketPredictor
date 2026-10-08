import { Stock, PriceAlert, WatchlistGroup } from '../types';

export function exportWatchlistToCSV(stocks: Stock[], watchlistName: string = 'Watchlist'): void {
  const headers = [
    'Symbol',
    'Name',
    'Exchange',
    'Sector',
    'Price',
    'Currency',
    'Change',
    'ChangePercent',
    '24hHigh',
    '24hLow',
    'Volume',
    'MarketCap',
    'PE',
    'RulingPlanet',
    'ZodiacSign',
    'Nakshatra',
    'AstroScore',
    'TechnicalSignal',
    'OverallBias',
    'Target1D',
    'Target1W',
    'Target1M',
    'StopLoss',
    'ConfidenceScore'
  ];

  const rows = stocks.map((s) => [
    `"${s.symbol}"`,
    `"${s.name.replace(/"/g, '""')}"`,
    `"${s.exchange}"`,
    `"${s.sector}"`,
    s.price,
    `"${s.currency}"`,
    s.change,
    s.changePercent,
    s.high24h,
    s.low24h,
    `"${s.volume}"`,
    `"${s.marketCap}"`,
    s.pe,
    `"${s.astroProfile.rulingPlanet}"`,
    `"${s.astroProfile.zodiacSign}"`,
    `"${s.astroProfile.nakshatra}"`,
    s.astroProfile.astroScore,
    `"${s.technicals.signal}"`,
    `"${s.prediction.overallBias}"`,
    s.prediction.target1D,
    s.prediction.target1W,
    s.prediction.target1M,
    s.prediction.stopLoss,
    s.prediction.confidenceScore
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  downloadBlob(csvContent, `AstroQuant_${watchlistName.replace(/\s+/g, '_')}_${getDateStamp()}.csv`, 'text/csv;charset=utf-8;');
}

export function exportWatchlistToJSON(stocks: Stock[], watchlistName: string = 'Watchlist'): void {
  const data = {
    appName: 'AstroQuant',
    exportType: 'Watchlist',
    watchlistName,
    exportedAt: new Date().toISOString(),
    totalCount: stocks.length,
    stocks: stocks.map((s) => ({
      id: s.id,
      symbol: s.symbol,
      name: s.name,
      exchange: s.exchange,
      currency: s.currency,
      sector: s.sector,
      price: s.price,
      change: s.change,
      changePercent: s.changePercent,
      high24h: s.high24h,
      low24h: s.low24h,
      volume: s.volume,
      marketCap: s.marketCap,
      pe: s.pe,
      fundamentals: s.fundamentals,
      astroProfile: {
        rulingPlanet: s.astroProfile.rulingPlanet,
        zodiacSign: s.astroProfile.zodiacSign,
        nakshatra: s.astroProfile.nakshatra,
        astroScore: s.astroProfile.astroScore
      },
      technicals: {
        signal: s.technicals.signal,
        rsi: s.technicals.rsi,
        support1: s.technicals.support1,
        resistance1: s.technicals.resistance1
      },
      prediction: {
        overallBias: s.prediction.overallBias,
        confidenceScore: s.prediction.confidenceScore,
        target1D: s.prediction.target1D,
        target1W: s.prediction.target1W,
        target1M: s.prediction.target1M,
        stopLoss: s.prediction.stopLoss
      }
    }))
  };

  const jsonContent = JSON.stringify(data, null, 2);
  downloadBlob(jsonContent, `AstroQuant_${watchlistName.replace(/\s+/g, '_')}_${getDateStamp()}.json`, 'application/json');
}

export function exportAlertsToCSV(alerts: PriceAlert[]): void {
  const headers = [
    'ID',
    'Symbol',
    'Name',
    'AlertType',
    'TargetValue',
    'CurrentPriceAtCreation',
    'IsTriggered',
    'TriggeredAt',
    'IsActive',
    'CreatedAt',
    'Note'
  ];

  const rows = alerts.map((a) => [
    `"${a.id}"`,
    `"${a.symbol}"`,
    `"${a.name.replace(/"/g, '""')}"`,
    `"${a.type}"`,
    a.targetValue ?? '',
    a.currentPrice,
    a.isTriggered ? 'TRUE' : 'FALSE',
    `"${a.triggeredAt ?? ''}"`,
    a.isActive ? 'TRUE' : 'FALSE',
    `"${a.createdAt}"`,
    `"${(a.note ?? '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  downloadBlob(csvContent, `AstroQuant_Alerts_${getDateStamp()}.csv`, 'text/csv;charset=utf-8;');
}

export function exportAlertsToJSON(alerts: PriceAlert[]): void {
  const data = {
    appName: 'AstroQuant',
    exportType: 'ActiveAlerts',
    exportedAt: new Date().toISOString(),
    totalCount: alerts.length,
    alerts
  };

  const jsonContent = JSON.stringify(data, null, 2);
  downloadBlob(jsonContent, `AstroQuant_Alerts_${getDateStamp()}.json`, 'application/json');
}

function downloadBlob(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function getDateStamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}
