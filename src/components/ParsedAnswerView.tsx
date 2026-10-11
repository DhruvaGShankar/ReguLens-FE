import React from 'react';
import { parseRawAnswer, formatCitationTokens } from '../utils/answerParser';

interface ParsedAnswerViewProps {
  rawAnswer: string;
  onCitationClick?: (citationNum: number) => void;
}

export const ParsedAnswerView: React.FC<ParsedAnswerViewProps> = ({
  rawAnswer,
  onCitationClick,
}) => {
  const parsed = parseRawAnswer(rawAnswer);

  const renderTextWithCitations = (text: string) => {
    const tokens = formatCitationTokens(text);
    return tokens.map((token, idx) => {
      if (token.type === 'citation' && token.num) {
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onCitationClick?.(token.num!)}
            title={`Jump to Supporting Evidence Source [${token.num}]`}
            className="inline-flex items-center px-1.5 py-0.5 mx-1 rounded bg-[#0F254A]/10 text-[#0F254A] hover:bg-[#0F254A] hover:text-white font-bold text-[11px] font-mono border border-[#0F254A]/20 transition-all cursor-pointer select-none align-baseline"
          >
            [{token.num}]
          </button>
        );
      }
      return <span key={idx}>{token.content}</span>;
    });
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* 1. Executive Synthesis & Answer Block */}
      {parsed.summaryText && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F254A] uppercase tracking-wider">
            <svg className="w-4 h-4 text-[#0F254A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Executive Statutory Synthesis</span>
          </div>
          <div className="text-slate-900 text-sm leading-relaxed font-normal bg-slate-50/60 p-4 rounded-md border border-slate-200/80 border-l-4 border-l-[#0F254A]">
            {renderTextWithCitations(parsed.summaryText)}
          </div>
        </div>
      )}

      {/* 2. Key Statutory Evidence Clauses */}
      {parsed.evidenceItems && parsed.evidenceItems.length > 0 && (
        <div className="space-y-3 pt-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <svg className="w-4 h-4 text-[#0F254A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Key Regulatory Provisions &amp; Findings ({parsed.evidenceItems.length})</span>
          </div>

          <div className="space-y-2.5">
            {parsed.evidenceItems.map((point, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white rounded-md border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors flex items-start gap-3 text-xs leading-relaxed text-slate-800"
              >
                <div className="shrink-0 w-5 h-5 rounded bg-slate-100 text-[#0F254A] font-mono font-bold text-[11px] flex items-center justify-center border border-slate-200 mt-0.5">
                  {idx + 1}
                </div>
                <div className="flex-1 font-medium text-slate-900 leading-relaxed">
                  {renderTextWithCitations(point)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Parsed Reference Links (if evidence_chunks is empty or as extra fallback) */}
      {parsed.sources && parsed.sources.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Cited Statutory Publications
          </div>
          <div className="space-y-2">
            {parsed.sources.map((src) => (
              <div
                key={src.number}
                className="p-3 bg-slate-50 rounded border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-2 max-w-[80%]">
                  <span className="px-1.5 py-0.5 rounded bg-[#0F254A] text-white font-mono font-bold text-[10px]">
                    [{src.number}]
                  </span>
                  <span className="font-semibold text-slate-800 truncate">
                    {src.title}
                  </span>
                </div>
                {src.url && (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#0F254A] font-semibold hover:underline"
                  >
                    <span>View Gazette Portal ↗</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
