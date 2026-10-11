import React, { useState, useRef, useEffect } from 'react';

interface InputAreaProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isLoading && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isLoading]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (trimmed && !isLoading) {
      onSubmit(trimmed);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto grow height
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3 px-4">
      <div className="max-w-[800px] mx-auto space-y-2">
        {/* Input Box Frame */}
        <div className="bg-white border border-slate-300 rounded-md shadow-xs focus-within:border-[#0F254A] transition-colors p-2 flex flex-col justify-between min-h-[76px]">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            rows={2}
            placeholder="Ask a question about SEBI circulars, LODR timelines, AIF regulations, or investor disclosures..."
            className="w-full border-0 p-1 text-slate-900 text-sm placeholder:text-slate-400 focus:ring-0 resize-none outline-none leading-relaxed bg-transparent"
          />

          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 mt-1">
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
              Press <kbd className="px-1 py-0.5 bg-slate-100 rounded border border-slate-200 text-slate-600 font-semibold">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-slate-100 rounded border border-slate-200 text-slate-600 font-semibold">Shift + Enter</kbd> for newline
            </span>

            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-[#0F254A] hover:bg-[#1E3A8A] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs ml-auto"
            >
              <span>{isLoading ? 'Retrieving...' : 'Submit Inquiry'}</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <p className="text-center text-[11px] text-slate-500">
          ReguLens answers are grounded strictly in retrieved SEBI circulars. Always verify official notifications on www.sebi.gov.in.
        </p>
      </div>
    </footer>
  );
};
