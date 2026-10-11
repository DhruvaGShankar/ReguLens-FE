import React from 'react';
import { RetrievalMode } from '../types/api';

interface HeaderProps {
  retrievalMode: RetrievalMode;
  onSelectMode: (mode: RetrievalMode) => void;
  onNewChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  retrievalMode,
  onSelectMode,
  onNewChat,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 py-3 px-4 sm:px-6 shadow-xs">
      <div className="max-w-[800px] mx-auto flex items-center justify-between gap-4">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#0F254A] flex items-center justify-center text-white font-serif font-bold text-base shadow-xs">
            R
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight leading-none">
              ReguLens
            </h1>
            <p className="text-[11px] font-medium text-slate-500 leading-none mt-0.5">
              SEBI Regulatory Research Assistant
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Retrieval Mode Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded text-xs">
            <span className="text-[11px] font-medium text-slate-500 hidden sm:inline">Mode:</span>
            <select
              value={retrievalMode}
              onChange={(e) => onSelectMode(e.target.value as RetrievalMode)}
              className="bg-transparent border-0 font-semibold text-slate-800 text-xs focus:ring-0 outline-none cursor-pointer"
              title="Select RAG Retrieval Pipeline Mode"
            >
              <option value="hybrid_reranked">Hybrid + Reranked (Default)</option>
              <option value="hybrid">Hybrid (Dense + BM25)</option>
              <option value="dense">Dense (FAISS Vector)</option>
              <option value="bm25">Lexical (BM25 Keyword)</option>
            </select>
          </div>

          {/* New Chat Button */}
          <button
            type="button"
            onClick={onNewChat}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            title="Start New Research Session"
          >
            <svg className="w-3.5 h-3.5 text-[#0F254A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Chat</span>
          </button>
        </div>
      </div>
    </header>
  );
};
