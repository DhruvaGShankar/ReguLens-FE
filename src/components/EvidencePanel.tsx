import React, { useState, useEffect } from 'react';
import { EvidenceChunk } from '../types/api';

interface EvidencePanelProps {
  chunks: EvidenceChunk[];
  highlightedIndex?: number | null;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({ chunks, highlightedIndex }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);

  useEffect(() => {
    if (highlightedIndex !== undefined && highlightedIndex !== null) {
      setIsExpanded(true);
      setActiveHighlight(highlightedIndex);
      const timer = setTimeout(() => setActiveHighlight(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [highlightedIndex]);

  if (!chunks || chunks.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 border border-slate-200 rounded-md bg-white overflow-hidden shadow-xs">
      {/* Accordion Header Bar */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/90 border-b border-slate-200 flex items-center justify-between transition-colors text-left cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded bg-[#0F254A]/10 text-[#0F254A] flex items-center justify-center font-semibold text-xs">
            {chunks.length}
          </span>
          <div>
            <span className="font-bold text-xs text-slate-800 uppercase tracking-wider block">
              Official Sources &amp; Supporting Evidence
            </span>
            <span className="text-[11px] text-slate-500 block">
              Indexed SEBI Gazette Circulars Cross-Referenced by RAG Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#0F254A] font-semibold">
          <span>{isExpanded ? 'Collapse Sources' : `Expand (${chunks.length} Sources)`}</span>
          <svg
            className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="p-4 space-y-4 divide-y divide-slate-100">
          {chunks.map((chunk, index) => {
            const citationNum = index + 1;
            const isHighlighted = activeHighlight === citationNum;

            // Compute score label & display
            const scoreVal = chunk.rerank_score ?? chunk.score;
            const scoreDisplay = chunk.rerank_score
              ? `Rerank Score: ${chunk.rerank_score.toFixed(3)}`
              : chunk.score
              ? `Relevance Score: ${(chunk.score * (chunk.score <= 1 ? 100 : 1)).toFixed(1)}%`
              : null;

            return (
              <div
                key={chunk.chunk_id || index}
                id={`source-${citationNum}`}
                className={`transition-all duration-500 rounded-md p-3.5 ${
                  index > 0 ? 'pt-4' : ''
                } ${
                  isHighlighted
                    ? 'bg-amber-50/90 border-2 border-amber-400 ring-4 ring-amber-100'
                    : 'bg-white hover:bg-slate-50/50'
                }`}
              >
                {/* Chunk Meta Badge Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#0F254A] text-white shadow-2xs">
                      Source [{citationNum}]
                    </span>
                    {chunk.circular_number && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                        {chunk.circular_number}
                      </span>
                    )}
                    {chunk.circular_type && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-50 text-indigo-900 border border-indigo-100 uppercase tracking-wider text-[10px]">
                        {chunk.circular_type}
                      </span>
                    )}
                  </div>

                  {scoreDisplay && (
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{scoreDisplay}</span>
                    </div>
                  )}
                </div>

                {/* Title & Section */}
                {chunk.subject && (
                  <h4 className="text-sm font-semibold text-slate-900 mb-1 leading-snug">
                    {chunk.subject}
                  </h4>
                )}

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mb-2 font-medium">
                  {chunk.section && (
                    <span className="flex items-center gap-1">
                      <span className="text-slate-400">Section:</span>
                      <span className="text-slate-900 font-semibold">{chunk.section}</span>
                    </span>
                  )}
                  {chunk.issue_date && (
                    <span className="flex items-center gap-1">
                      <span className="text-slate-400">Issued:</span> {chunk.issue_date}
                    </span>
                  )}
                  {chunk.issuing_department && (
                    <span className="flex items-center gap-1">
                      <span className="text-slate-400">Dept:</span> {chunk.issuing_department}
                    </span>
                  )}
                  {chunk.validity_status && (
                    <span className="flex items-center gap-1">
                      <span className="text-slate-400">Status:</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                        {chunk.validity_status}
                      </span>
                    </span>
                  )}
                </div>

                {/* Context Header Badge */}
                {chunk.context_header && (
                  <div className="text-[11px] font-mono text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded mb-2 border border-slate-200 truncate">
                    {chunk.context_header}
                  </div>
                )}

                {/* Verbatim Passage Box */}
                <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap font-normal">
                  <span className="font-semibold text-[#0F254A] text-[11px] uppercase tracking-wider block mb-1">
                    Verbatim Excerpt:
                  </span>
                  {chunk.text || chunk.body_text}
                </div>

                {/* Official Source URL Link */}
                {chunk.source_url && (
                  <div className="mt-2.5 flex justify-end">
                    <a
                      href={chunk.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#0F254A] hover:text-blue-900 font-semibold underline underline-offset-2 transition-colors"
                    >
                      <span>View Official SEBI Document (Portal ↗)</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
