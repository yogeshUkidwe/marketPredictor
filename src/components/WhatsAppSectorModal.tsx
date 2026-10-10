import React, { useState } from 'react';
import { X, Send, Copy, Check, Share2, PhoneCall, Sparkles } from 'lucide-react';
import { Stock } from '../types';

interface WhatsAppSectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  stocks: Stock[];
  isLightMode?: boolean;
}

export function generateAllSectorsWhatsAppMessage(stocks: Stock[]): string {
  // Benchmark Indices
  const nifty = '25,124.60 (+0.57%) 🟢';
  const sensex = '81,938.45 (+0.53%) 🟢';
  const bankNifty = '52,380.10 (+0.56%) 🟢';

  // Group stocks by sector
  const sectorMap: Record<string, Stock[]> = {};
  stocks.forEach((s) => {
    if (!sectorMap[s.sector]) sectorMap[s.sector] = [];
    sectorMap[s.sector].push(s);
  });

  const sectorEmoji: Record<string, string> = {
    Technology: '💻',
    'Banking & Fin': '🏦',
    'Energy & Oil': '⚡',
    Automobile: '🚗',
    'Pharma & Health': '💊',
    'Metals & Mining': '🏗️',
    Infrastructure: '🏗️',
    'FMCG & Consumer': '🛒',
    Telecom: '📡',
    'Aerospace & Defense': '🛡️'
  };

  const sectorLines: string[] = [];
  Object.keys(sectorMap).forEach((sec) => {
    const list = sectorMap[sec];
    const top2 = list.slice(0, 2).map((stk) => {
      const up = stk.changePercent >= 0 ? '+' : '';
      return `${stk.symbol} (₹${stk.price.toFixed(1)}, ${up}${stk.changePercent.toFixed(1)}%)`;
    }).join(', ');
    const emoji = sectorEmoji[sec] || '📈';
    const topStock = list[0];
    const signal = topStock?.technicals?.signal || topStock?.prediction?.overallBias || 'ACCUMULATE';
    sectorLines.push(`• ${emoji} *${sec}:* ${top2} — *Signal: ${signal}*`);
  });

  // Top gainer stock
  const topGainer = [...stocks].sort((a, b) => b.changePercent - a.changePercent)[0] || stocks[0];
  const targetVal = topGainer?.predictedAmount || topGainer?.prediction?.target1W || topGainer?.prediction?.target1D || topGainer?.price * 1.05;
  const stopLossVal = topGainer?.prediction?.stopLoss || topGainer?.price * 0.95;
  const convictionSignal = topGainer?.technicals?.signal || topGainer?.prediction?.overallBias || 'STRONG BUY';

  return `🌟 *ASTROQUANT INDIA 🇮🇳 | ALL SECTORS LIVE REPORT*
📅 *Date:* 08-10-2026 | *Market Session:* Live NSE / BSE
━━━━━━━━━━━━━━━━━━━━━
📊 *BENCHMARK INDICES:*
• *NIFTY 50:* ${nifty}
• *SENSEX:* ${sensex}
• *BANK NIFTY:* ${bankNifty}

🏢 *ALL SECTORS INTELLIGENCE & SIGNALS:*
${sectorLines.join('\n')}

🔥 *TOP ASTRO-QUANT CONVICTION PICK:*
• *Stock:* ${topGainer?.symbol || 'TATAMOTORS'} (${topGainer?.name || 'Tata Motors'})
• *Price:* ₹${topGainer?.price.toFixed(1) || '980.5'} | *Target:* ₹${targetVal.toFixed(1)}
• *Stop Loss:* ₹${stopLossVal.toFixed(1)} | *Signal:* ${convictionSignal}
• *Planetary Alignment:* Auspicious Jupiter 5th House Trine with Mars Bullish Surge

━━━━━━━━━━━━━━━━━━━━━
👤 *Prepared By:* Yogesh Ukidwe
📞 *Contact Number:* 8097000212
💬 *Direct WhatsApp:* https://wa.me/918097000212
🌐 *Platform:* AstroQuant India Real-Time Analytics`;
}

export const WhatsAppSectorModal: React.FC<WhatsAppSectorModalProps> = ({
  isOpen,
  onClose,
  stocks,
  isLightMode = false
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const message = generateAllSectorsWhatsAppMessage(stocks);
  // Universal WhatsApp share URL (allows sending to any contact, group, or broadcast list)
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

  const handleSendToAnyone = () => {
    // Default: Opens WhatsApp with message only, so user selects ANY contact or group
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSendToYogesh = () => {
    // Direct message to Yogesh Ukidwe
    window.open(`https://wa.me/918097000212?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AstroQuant India - All Sectors Report',
          text: message
        });
      } catch (err) {}
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className={`w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border-2 transition-all ${
          isLightMode ? 'bg-white border-emerald-300 text-slate-900' : 'bg-slate-900 border-emerald-500/70 text-white'
        }`}
      >
        {/* Modal Header with Authentic WhatsApp Green Accent */}
        <div className="bg-gradient-to-r from-emerald-600 via-[#25D366] to-teal-600 p-4 sm:p-5 flex items-center justify-between text-white shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white p-2 flex items-center justify-center shadow-md">
              <svg className="w-full h-full text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-1.5">
                <span>WhatsApp All Sectors Report</span>
                <span className="text-xs bg-emerald-950/60 text-emerald-200 px-2 py-0.5 rounded-full font-mono">
                  Live
                </span>
              </h2>
              <p className="text-xs text-emerald-100 font-medium">
                Real-time sector intelligence ready to send to any contact or group
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-100 hover:text-white hover:bg-emerald-700/60 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contact Info Banner */}
        <div
          className={`px-4 sm:px-5 py-2.5 border-b flex flex-wrap items-center justify-between gap-2 text-xs font-bold ${
            isLightMode ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <span>Default: <strong className="font-black text-emerald-600 dark:text-emerald-400">Opens WhatsApp to send to anyone</strong></span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="text-slate-400 font-normal">Analyst: Yogesh Ukidwe</span>
            <span className="font-black text-emerald-500">8097000212</span>
          </div>
        </div>

        {/* WhatsApp Message Preview Area */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 font-mono text-xs sm:text-[13px] leading-relaxed">
          <div
            className={`p-4 rounded-2xl border whitespace-pre-wrap select-text shadow-inner ${
              isLightMode
                ? 'bg-emerald-50/40 border-emerald-200 text-slate-800'
                : 'bg-slate-950/90 border-slate-800 text-emerald-100'
            }`}
          >
            {message}
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div
          className={`p-3.5 sm:p-4 border-t flex flex-col gap-2.5 ${
            isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
          }`}
        >
          {/* Primary Action: Default send to anyone */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <button
              onClick={handleSendToAnyone}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black bg-[#25D366] hover:bg-emerald-400 active:scale-98 text-slate-950 transition-all cursor-pointer shadow-lg shadow-emerald-900/40"
            >
              <Send className="w-4 h-4 text-slate-950 fill-current" />
              <span>Open in WhatsApp (Send to Anyone / Any Chat)</span>
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/50 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  copied
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : isLightMode
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handleNativeShare}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isLightMode
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            <button
              onClick={handleSendToYogesh}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10 transition-colors cursor-pointer border border-emerald-500/40"
              title="Send directly to Yogesh Ukidwe on 8097000212"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
              <span>Direct to Yogesh (8097000212)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
