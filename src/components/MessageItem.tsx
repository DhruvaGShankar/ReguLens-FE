import React, { useState } from 'react';
import { ChatMessage } from '../types/api';
import { ParsedAnswerView } from './ParsedAnswerView';
import { EvidencePanel } from './EvidencePanel';
import { ErrorBanner } from './ErrorBanner';

interface MessageItemProps {
  message: ChatMessage;
  onRetry?: () => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, onRetry }) => {
  const [copyStatus, setCopyStatus] = useState<boolean>(false);
  const [highlightedSourceNum, setHighlightedSourceNum] = useState<number | null>(null);

  const handleCopy = () => {
    if (message.response?.answer) {
      // Clean raw text formatting when copying to clipboard
      const cleanAnswer = message.response.answer
        .replace(/^(ANSWER|EVIDENCE|SOURCES)\s*\n[-=]+/gim, '')
        .trim();

      navigator.clipboard.writeText(cleanAnswer).then(() => {
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000);
      });
    }
  };

  const handleCitationClick = (citationNum: number) => {
    setHighlightedSourceNum(citationNum);
    const targetEl = document.getElementById(`source-${citationNum}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Helper to format raw execution time & model names
  const formatExecutionTime = (ms?: number) => {
    if (!ms) return '';
    if (ms >= 1000) {
      return `${(ms / 1000).toFixed(1)}s`;
    }
    return `${ms.toFixed(0)}ms`;
  };

  const formatModelName = (model?: string) => {
    if (!model) return 'AI Model';
    if (model.includes('nemotron')) return 'Nemotron 30B Omni';
    if (model.includes('gemini')) return 'Gemini Pro';
    if (model.includes('gpt-4')) return 'GPT-4o';
    return model.split('/').pop() || model;
  };

  const formatModeName = (mode?: string) => {
    if (!mode) return 'RAG';
    switch (mode) {
      case 'hybrid_reranked':
        return 'Hybrid Reranked';
      case 'hybrid':
        return 'Hybrid (Dense+BM25)';
      case 'dense':
        return 'Dense FAISS Vector';
      case 'bm25':
        return 'BM25 Keyword';
      default:
        return mode;
    }
  };

  if (message.role === 'user') {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-[88%] bg-white border border-slate-300 rounded-md p-4 shadow-2xs">
          <div className="flex items-center justify-between gap-4 mb-1.5 pb-1 border-b border-slate-100 text-xs">
            <span className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#0F254A] text-white flex items-center justify-center font-serif text-[10px]">
                C
              </span>
              Counsel Inquiry
            </span>
            <time className="font-mono text-slate-400 text-[11px]">{message.timestamp}</time>
          </div>
          <p className="text-sm text-slate-900 font-medium leading-relaxed">{message.content}</p>
        </div>
      </div>
    );
  }

  // Assistant Message (Document-Style Legal Brief)
  return (
    <div className="mb-8">
      {/* Loading Skeleton */}
      {message.isLoading && (
        <div className="bg-white border border-slate-200 rounded-md p-6 shadow-2xs animate-pulse space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></div>
              <div className="h-4 bg-slate-200 rounded w-48"></div>
            </div>
            <div className="h-3 bg-slate-100 rounded w-24"></div>
          </div>
          <div className="space-y-2.5 pt-1">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-11/12"></div>
            <div className="h-4 bg-slate-100 rounded w-4/5"></div>
            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 font-mono">
            <svg className="w-4 h-4 animate-spin text-[#0F254A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Querying FAISS vector index &amp; running Cross-Encoder reranker...</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {message.error && <ErrorBanner error={message.error} onRetry={onRetry} />}

      {/* Actual Response Document */}
      {message.response && (
        <article className="bg-white border border-slate-300 rounded-md p-5 sm:p-7 shadow-xs space-y-5">
          {/* Metadata Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block shadow-2xs"></span>
              <span className="font-bold text-[#0F254A] uppercase tracking-wider text-[11px] font-mono">
                Statutory Legal Synthesis
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
              {message.response.metadata && (
                <>
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200 font-medium">
                    {formatModelName(message.response.metadata.model_used)}
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200 font-medium">
                    ⚡ {formatExecutionTime(message.response.metadata.execution_time_ms)}
                  </span>
                  <span className="bg-indigo-50 text-indigo-900 px-2.5 py-0.5 rounded border border-indigo-100 font-medium">
                    {formatModeName(message.response.retrieval_mode)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Refusal / Insufficient Evidence Banner */}
          {message.response.refused && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-950 text-xs leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-2 text-amber-950 text-sm">
                <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Statutory Scope Notice &amp; Insufficient Evidence
              </div>
              <p className="text-slate-800">
                The query asks about information outside the indexed SEBI regulatory corpus or insufficient matching evidence was retrieved.
              </p>
            </div>
          )}

          {/* Parsed Answer View (Formatted Executive Summary, Provisions, Citations) */}
          <ParsedAnswerView
            rawAnswer={message.response.answer}
            onCitationClick={handleCitationClick}
          />

          {/* Action Toolbar */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium transition-colors cursor-pointer shadow-2xs"
            >
              <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {copyStatus ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                )}
              </svg>
              <span>{copyStatus ? 'Copied to Clipboard' : 'Copy Statutory Memorandum'}</span>
            </button>

            <span className="text-[11px] text-slate-500 font-mono">
              Trace Request ID: {message.response.request_id}
            </span>
          </div>

          {/* Supporting Evidence Accordion */}
          <EvidencePanel
            chunks={message.response.evidence_chunks}
            highlightedIndex={highlightedSourceNum}
          />
        </article>
      )}
    </div>
  );
};
