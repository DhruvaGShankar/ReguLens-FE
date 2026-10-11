import React from 'react';

interface EmptyStateProps {
  onSelectQuestion: (query: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectQuestion }) => {
  const sampleQuestions = [
    {
      title: 'Mutual Funds Borrowing Rules',
      query: 'What restrictions apply to borrowing by mutual funds?',
      category: 'SEBI Circular / IMD',
    },
    {
      title: 'LODR Reg 30 Disclosure Timelines',
      query: 'What are the disclosure timelines for material events under SEBI LODR Regulation 30?',
      category: 'LODR Regulations',
    },
    {
      title: 'Category II AIF Governance & Valuation',
      query: 'What valuation and governance requirements apply to Category II AIFs under Master Circulars?',
      category: 'AIF Master Circular',
    },
    {
      title: 'SCORES 2.0 Investor Grievance Redressal',
      query: 'What are the investor grievance escalation timelines under SCORES 2.0?',
      category: 'Grievance Redressal',
    },
  ];

  return (
    <div className="py-12 px-4 space-y-8 max-w-[720px] mx-auto text-center">
      {/* Brand Watermark / Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-[#0F254A]">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          SEBI RAG Intelligence Corpus
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          ReguLens Regulatory Research Desk
        </h2>
        <p className="text-sm text-slate-600 max-w-[560px] mx-auto leading-relaxed font-normal">
          Query statutory SEBI Acts, Master Circulars, Operational Directives, and Gazette Notifications with strict evidence grounding.
        </p>
      </div>

      {/* Minimal Suggested Questions Grid */}
      <div className="text-left space-y-3 pt-2">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
          Suggested Compliance Inquiries
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sampleQuestions.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectQuestion(item.query)}
              className="p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-md text-left transition-all duration-150 cursor-pointer shadow-xs group"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {item.category}
                </span>
                <svg className="w-4 h-4 text-slate-400 group-hover:text-[#0F254A] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-slate-800 group-hover:text-[#0F254A] transition-colors line-clamp-2 leading-snug">
                {item.query}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
