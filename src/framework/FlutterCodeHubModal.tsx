import React, { useState, useEffect } from 'react';
import {
  Code2,
  Copy,
  Check,
  Download,
  Smartphone,
  Tablet,
  Monitor,
  FileCode,
  FolderGit2,
  Layers,
  Sparkles,
  ExternalLink,
  RefreshCw,
  Folder
} from 'lucide-react';
import { FrameworkModal } from './components/FrameworkModal';

interface FlutterCodeHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FlutterFileItem {
  id: string;
  name: string;
  path: string;
  category: string;
  content: string;
}

const FALLBACK_FILES: FlutterFileItem[] = [
  {
    id: 'pubspec',
    name: 'pubspec.yaml',
    path: 'pubspec.yaml',
    category: 'Config',
    content: `name: astroquant_flutter
description: "AstroQuant - Share Market & Astro Predictor for App, Web, and Tablet"
publish_to: "none"
version: 1.0.0+1

environment:
  sdk: ">=3.2.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.6
  provider: ^6.1.1
  http: ^1.2.0
  intl: ^0.19.0
  google_fonts: ^6.1.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true`
  },
  {
    id: 'main',
    name: 'main.dart',
    path: 'lib/main.dart',
    category: 'Entrypoint',
    content: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'framework/theme.dart';
import 'framework/responsive_layout.dart';
import 'framework/app_state.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    ChangeNotifierProvider(
      create: (_) => AstroQuantAppState()..initSession(),
      child: const AstroQuantFlutterApp(),
    ),
  );
}

class AstroQuantFlutterApp extends StatelessWidget {
  const AstroQuantFlutterApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AstroQuant Predictor',
      debugShowCheckedModeBanner: false,
      theme: AstroQuantTheme.darkTheme,
      home: const AdaptiveAppShell(),
    );
  }
}`
  }
];

export const FlutterCodeHubModal: React.FC<FlutterCodeHubModalProps> = ({
  isOpen,
  onClose
}) => {
  const [files, setFiles] = useState<FlutterFileItem[]>(FALLBACK_FILES);
  const [activeFileId, setActiveFileId] = useState<string>('pubspec');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    fetch('/api/flutter-files')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load files');
        return res.json();
      })
      .then((data) => {
        if (data.files && Array.isArray(data.files) && data.files.length > 0) {
          setFiles(data.files);
          // Set active file to responsive_layout or main if available
          const preferred = data.files.find((f: FlutterFileItem) => f.name === 'responsive_layout.dart') || data.files[0];
          setActiveFileId(preferred.id);
        }
      })
      .catch((err) => {
        console.warn('Using fallback flutter file cache:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isOpen]);

  if (!isOpen) return null;

  const currentFile = files.find((f) => f.id === activeFileId) || files[0] || FALLBACK_FILES[0];

  const categories = ['All', ...Array.from(new Set(files.map((f) => f.category)))];

  const filteredFiles = activeCategory === 'All'
    ? files
    : files.filter((f) => f.category === activeCategory);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAll = () => {
    const zipNote = `AstroQuant Flutter Project (Compatible across App, Tab, Web)\n` +
      `Built with Custom Flutter Framework & Reusable Components\n` +
      `Session: October 8, 2026\n\n` +
      files.map((f) => `// ===================== ${f.path} =====================\n${f.content}\n\n`).join('\n');
    const blob = new Blob([zipNote], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'astroquant_flutter_complete_project.dart';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <FrameworkModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-100">Flutter Framework & Complete Architecture</span>
        </div>
      }
      subtitle="Modular Flutter Framework & Production App compatible across App (Mobile), Tab (Tablet), and Web (Desktop)"
      maxWidth="3xl"
    >
      <div className="flex flex-col h-[75vh] bg-slate-950">
        {/* Device compatibility badges & Download */}
        <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-3 flex-wrap text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-slate-400 font-semibold">Adaptive Targets:</span>
            <span className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-cyan-950 border border-cyan-700/50 text-cyan-300">
              <Smartphone className="w-3 h-3" /> App (&lt; 640px)
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-indigo-950 border border-indigo-700/50 text-indigo-300">
              <Tablet className="w-3 h-3" /> Tab (640-1024px)
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-purple-950 border border-purple-700/50 text-purple-300">
              <Monitor className="w-3 h-3" /> Web (&ge; 1024px)
            </span>
            <span className="text-[11px] text-slate-500 font-mono">({files.length} Flutter Files)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Project Bundle</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-3 py-2 bg-slate-950 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* File Explorer & Code View */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* File Explorer (Left) */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/80 p-2 overflow-y-auto shrink-0 space-y-1">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 px-2 py-1 font-bold flex items-center justify-between">
              <span>Project Files</span>
              {isLoading && <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" />}
            </div>
            {filteredFiles.map((file) => (
              <button
                key={file.id}
                onClick={() => setActiveFileId(file.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs transition-all cursor-pointer font-mono ${
                  activeFileId === file.id
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                  <span className="truncate">{file.name}</span>
                </div>
                <span className="text-[9px] text-slate-500 font-sans shrink-0 ml-1">{file.category}</span>
              </button>
            ))}
          </div>

          {/* Code View (Right) */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
            <div className="px-4 py-2 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 truncate">
                <span className="font-mono text-xs text-slate-200 font-bold truncate">{currentFile.path}</span>
                <span className="text-[10px] px-2 py-0.2 rounded bg-indigo-950/80 border border-indigo-700/50 text-indigo-300">
                  {currentFile.category}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="flex-1 p-4 overflow-auto font-mono text-xs text-slate-300 leading-relaxed bg-slate-950/90 selection:bg-cyan-500/30 selection:text-cyan-200">
              <code>{currentFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </FrameworkModal>
  );
};
