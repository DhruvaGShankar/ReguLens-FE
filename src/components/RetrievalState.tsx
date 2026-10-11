import React from 'react';

interface RetrievalStateProps {
  query?: string;
}

export const RetrievalState: React.FC<RetrievalStateProps> = ({
  query = 'What are the governance and valuation requirements applicable to Category II Alternative Investment Funds (AIFs) under SEBI Master Circulars?',
}) => {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 space-y-6">
      {/* Echoed User Query */}
      <div className="flex justify-end">
        <div className="max-w-[92%] sm:max-w-[85%] bg-white border border-[#cbd5e1] rounded-[6px] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-4 mb-2 pb-1.5 border-b border-[#e2e8f0]">
            <span className="text-[11px] font-semibold text-[#444651] flex items-center gap-1 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px] text-[#00236f]">person</span>
              Counsel Inquiry
            </span>
            <time className="text-[11px] font-mono text-[#64748b]">Executing Retrieval</time>
          </div>
          <p className="text-[14px] text-[#131b2e] font-medium leading-relaxed">
            {query}
          </p>
        </div>
      </div>

      {/* Processing Legal Stepper Card */}
      <div className="bg-white border border-[#cbd5e1] rounded-[6px] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
          <div className="flex items-center gap-2 text-[#00236f] text-[13px] font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-[#0051d5] animate-ping"></span>
            Executing Statutory Hybrid Retrieval
          </div>
          <span className="text-[11px] font-mono text-[#64748b]">Session ID: #SEBI-RAG-8419</span>
        </div>

        {/* Multi-step pipeline */}
        <div className="space-y-3 py-1 text-[13px]">
          <div className="flex items-center gap-2.5 text-[#131b2e]">
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
            <span>Searching SEBI vector store (FAISS + BM25 hybrid indexing)...</span>
            <span className="text-[11px] font-mono text-[#64748b] ml-auto">0.24s</span>
          </div>

          <div className="flex items-center gap-2.5 text-[#00236f] font-medium">
            <span className="material-symbols-outlined text-[#0051d5] animate-spin text-[18px]">sync</span>
            <span>Reranking 18 statutory provisions with cross-encoder model...</span>
            <span className="text-[11px] font-mono text-[#0051d5] ml-auto">In Progress</span>
          </div>

          <div className="flex items-center gap-2.5 text-[#94a3b8]">
            <span className="material-symbols-outlined text-[#cbd5e1] text-[18px]">radio_button_unchecked</span>
            <span>Synthesizing legal opinion and generating inline citations...</span>
            <span className="text-[11px] font-mono text-[#94a3b8] ml-auto">Pending</span>
          </div>
        </div>

        {/* Institutional Skeleton Pulse Lines */}
        <div className="pt-4 border-t border-[#e2e8f0] space-y-2.5 animate-pulse">
          <div className="h-4 bg-[#eaedff] rounded-[3px] w-3/4"></div>
          <div className="h-3 bg-[#f2f3ff] rounded-[3px] w-full"></div>
          <div className="h-3 bg-[#f2f3ff] rounded-[3px] w-5/6"></div>
          <div className="h-3 bg-[#f2f3ff] rounded-[3px] w-4/6"></div>
          <div className="h-16 bg-[#f8f9fa] rounded-[4px] w-full border border-[#e2e8f0] mt-3"></div>
        </div>
      </div>
    </div>
  );
};
