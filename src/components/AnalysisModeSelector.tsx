import React from 'react';
import { Layers } from 'lucide-react';
import { TranslationDictionary } from '../utils/translations';

export type AnalysisLevel = 'BEGINNER' | 'MEDIUM' | 'EXPERT';

interface AnalysisModeSelectorProps {
  currentLevel: AnalysisLevel;
  onSelectLevel: (level: AnalysisLevel) => void;
  t: TranslationDictionary;
}

export const AnalysisModeSelector: React.FC<AnalysisModeSelectorProps> = ({
  currentLevel,
  onSelectLevel,
  t
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="p-1.5 rounded-lg bg-indigo-950 border border-indigo-800/60 text-indigo-400">
          <Layers className="w-4 h-4" />
        </span>
        <div>
          <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
            Analysis Depth:
            <span
              className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-md font-bold ${
                currentLevel === 'BEGINNER'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                  : currentLevel === 'MEDIUM'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/50'
                  : 'bg-purple-950 text-purple-300 border border-purple-800/50'
              }`}
            >
              {currentLevel === 'BEGINNER' ? t.beginnerMode : currentLevel === 'MEDIUM' ? t.mediumMode : t.expertMode}
            </span>
          </span>
          <p className="text-[11px] text-slate-400">
            {currentLevel === 'BEGINNER'
              ? t.beginnerDesc
              : currentLevel === 'MEDIUM'
              ? t.mediumDesc
              : t.expertDesc}
          </p>
        </div>
      </div>

      {/* Switcher Buttons */}
      <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs font-semibold">
        <button
          onClick={() => onSelectLevel('BEGINNER')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
            currentLevel === 'BEGINNER'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.beginnerMode}
        </button>
        <button
          onClick={() => onSelectLevel('MEDIUM')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
            currentLevel === 'MEDIUM'
              ? 'bg-cyan-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.mediumMode}
        </button>
        <button
          onClick={() => onSelectLevel('EXPERT')}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
            currentLevel === 'EXPERT'
              ? 'bg-purple-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.expertMode}
        </button>
      </div>
    </div>
  );
};
