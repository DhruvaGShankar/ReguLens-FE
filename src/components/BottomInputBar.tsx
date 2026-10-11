import React, { useState } from 'react';

interface BottomInputBarProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export const BottomInputBar: React.FC<BottomInputBarProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query.trim());
      setQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#cbd5e1]/70 py-3 px-4">
      <div className="max-w-[800px] mx-auto space-y-2">
        {/* Primary Input Box Frame */}
        <div className="bg-white border border-[#cbd5e1] rounded-[6px] shadow-xs focus-within:border-[#00236f] transition-colors">
          <div className="p-2.5">
            <textarea
              id="main-prompt-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={2}
              className="w-full border-0 p-1 text-[#131b2e] text-[14px] placeholder:text-[#94a3b8] focus:ring-0 resize-none outline-none leading-relaxed"
              placeholder="Ask a question about SEBI regulations (e.g. LODR 30 timelines, PIT trading windows, AIF valuation)..."
            />
          </div>

          {/* Controls Inside Bar */}
          <div className="px-2.5 pb-2.5 flex items-center justify-between gap-2">
            {/* Scope Tag & Hint */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] bg-[#eaedff] text-[#00236f] text-[11px] font-medium border border-[#cbd5e1]/60">
                <span className="material-symbols-outlined text-[13px]">library_books</span>
                Corpus: Master Circulars &amp; Acts
              </span>
              <span className="hidden sm:inline text-[11px] font-mono text-[#94a3b8]">
                ⌘ + Enter to send
              </span>
            </div>

            {/* Deep Navy Submit Button */}
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={!query.trim() || isLoading}
              className="inline-flex items-center gap-1.5 bg-[#0F254A] hover:bg-[#1E3A8A] disabled:opacity-45 disabled:cursor-not-allowed text-white px-3.5 py-1.5 rounded-[4px] text-[12px] font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <span>{isLoading ? 'Retrieving...' : 'Submit Query'}</span>
              <span className="material-symbols-outlined text-[15px]">arrow_upward</span>
            </button>
          </div>
        </div>

        {/* Compliance Disclaimer Footnote */}
        <p className="text-center text-[11px] text-[#64748b]">
          Responses are AI-generated and should be verified against official regulatory documents. ReguLens SEBI Corpus updated September 2024.
        </p>
      </div>
    </footer>
  );
};
