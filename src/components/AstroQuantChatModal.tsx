import React, { useState, useRef, useEffect } from 'react';
import { Stock } from '../types';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Compass,
  TrendingUp,
  HelpCircle,
  Minimize2,
  Maximize2,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';

interface ChatMessage {
  id: string;
  sender: 'user' | 'expert';
  text: string;
  timestamp: string;
}

interface AstroQuantChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStock: Stock;
  language: Language;
}

export const AstroQuantChatModal: React.FC<AstroQuantChatModalProps> = ({
  isOpen,
  onClose,
  currentStock,
  language
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'expert',
      text: `Namaste! I am your **AI Market Expert** for the **08-10-2026** trading session.\n\nCurrently analyzing **${currentStock.symbol} (${currentStock.name})** trading at **${currentStock.currency}${currentStock.price.toFixed(2)}** (Locked Target: **${currentStock.currency}${(currentStock.predictedAmount || currentStock.prediction.target1D).toFixed(2)}**).\n\nYou can ask about **ANY stock from the Indian market** (TCS, Reliance, HDFC Bank, Tata Motors, Suzlon, Zomato, BEL, etc.), price targets, promoter buying, technical breakouts, or planetary cycles!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Update context when current stock changes
  useEffect(() => {
    if (isOpen && currentStock) {
      setMessages((prev) => [
        ...prev,
        {
          id: `stock-switch-${Date.now()}`,
          sender: 'expert',
          text: `Switched focus to **${currentStock.symbol}** (${currentStock.currency}${currentStock.price.toFixed(2)} | Target: ${currentStock.currency}${(currentStock.predictedAmount || currentStock.prediction.target1D).toFixed(2)}).\n\nWhat would you like to analyze regarding this stock?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [currentStock.symbol]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          currentStock,
          language
        })
      });

      if (!res.ok) {
        throw new Error('Chat API returned an error');
      }

      const data = await res.json();
      const expertMsg: ChatMessage = {
        id: `expert-${Date.now()}`,
        sender: 'expert',
        text: data.reply || 'Market analysis completed with positive technical and cycle confluence.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, expertMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `expert-err-${Date.now()}`,
        sender: 'expert',
        text: `For **${currentStock.symbol}**, key support rests at **${currentStock.currency}${currentStock.prediction.stopLoss.toFixed(2)}** with a predicted target of **${currentStock.currency}${(currentStock.predictedAmount || currentStock.prediction.target1D).toFixed(2)}**. Favorable momentum supports accumulation on minor pullbacks.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    `Predict TCS for today 08-10-2026`,
    `What is the target & stop-loss for ${currentStock.symbol}?`,
    `Analyze HDFC Bank target ₹714 and technicals`,
    `Predict Tata Motors & Suzlon for today`,
    `Is promoter buying and institutional volume favorable for ${currentStock.symbol}?`,
    `How do crude oil and global markets impact ${currentStock.symbol}?`,
    `What is the fundamental valuation & P/E ratio rating?`
  ];

  return (
    <div
      className={`fixed z-50 transition-all duration-200 ${
        isExpanded
          ? 'inset-4 sm:inset-10'
          : 'bottom-4 right-4 sm:right-6 w-[94vw] sm:w-[440px] h-[580px]'
      }`}
    >
      <div className="w-full h-full bg-slate-900 border-2 border-indigo-500/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
        {/* Chat Header (Exact label requested: AI Market Expert) */}
        <div className="p-3.5 bg-gradient-to-r from-slate-950 via-indigo-950/80 to-slate-950 border-b border-indigo-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-slate-950 shadow-md">
              <Bot className="w-5 h-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-950 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-black text-slate-100 truncate">
                  {t.aiMarketExpert}
                </h3>
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-indigo-900/60 text-indigo-300 font-mono">
                  Online
                </span>
              </div>
              <p className="text-[10px] text-cyan-300/90 truncate font-mono">
                {currentStock.symbol} ({currentStock.currency}{currentStock.price.toFixed(2)}) • Pred: {currentStock.currency}${(currentStock.predictedAmount || currentStock.prediction.target1D).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
              title={isExpanded ? 'Restore' : 'Maximize'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-950/60">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Compass className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed space-y-1 shadow-md ${
                    isUser
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-br-none'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  <div
                    className={`text-[9px] font-mono text-right ${
                      isUser ? 'text-indigo-200' : 'text-slate-500'
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-cyan-300/90 bg-cyan-950/30 border border-cyan-900/40 rounded-xl px-3 py-2 w-fit">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>AI Market Expert analyzing order flow, fundamentals & planetary cycles...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-1.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500 text-[11px] text-slate-300 whitespace-nowrap transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.chatPlaceholder}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white transition-all disabled:opacity-40 cursor-pointer shadow"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
