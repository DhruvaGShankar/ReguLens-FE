import React from 'react';

interface RefusalStateProps {
  onRephrase: (query: string) => void;
}

export const RefusalState: React.FC<RefusalStateProps> = ({ onRephrase }) => {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 space-y-6">
      {/* Echoed Sensitive Query */}
      <div className="flex justify-end">
        <div className="max-w-[92%] sm:max-w-[85%] bg-white border border-[#cbd5e1] rounded-[6px] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-4 mb-2 pb-1.5 border-b border-[#e2e8f0]">
            <span className="text-[11px] font-semibold text-[#444651] flex items-center gap-1 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px] text-[#00236f]">person</span>
              Counsel Inquiry
            </span>
            <time className="text-[11px] font-mono text-[#64748b]">11:15 AM · 12 Sep 2024</time>
          </div>
          <p className="text-[14px] text-[#131b2e] font-medium leading-relaxed">
            Can you provide the personal home address of the SEBI Adjudicating Officer in Order No. 44?
          </p>
        </div>
      </div>

      {/* Dignified Institutional Refusal Memo */}
      <article className="bg-white border border-[#cbd5e1] rounded-[6px] p-5 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 text-[#00236f] text-[12px] font-semibold pb-3 border-b border-[#e2e8f0]">
          <span className="material-symbols-outlined text-[#00236f] text-[20px]">shield</span>
          Notice of Statutory Limitation &amp; Scope Restriction
        </div>

        <div className="mt-4 space-y-4">
          <h2 className="font-serif-legal text-[19px] sm:text-[20px] font-semibold text-[#131b2e]">
            Restricted Non-Public Query: Compliance Scope Exceeded
          </h2>

          <div className="p-4 bg-[#f8f9fa] border-l-4 border-[#64748b] rounded-r-[4px] text-[14px] text-[#131b2e] leading-relaxed">
            <strong>Notice of Statutory Limitation:</strong> ReguLens can only interpret published SEBI Acts, Gazette Notifications, and Master Circulars. Non-public personal data, confidential adjudicatory files, and speculative legal outcomes are strictly excluded from the statutory corpus.
          </div>

          <p className="text-[13px] text-[#444651] leading-relaxed">
            In accordance with SEBI data confidentiality guidelines and statutory repository policies, internal personnel contact logs, personal identifier markers, and non-notified procedural notes are neither parsed nor indexed.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                onRephrase(
                  'What are the official legal findings and penalty provisions in SEBI Adjudication Order No. 44?'
                )
              }
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[4px] bg-[#f8f9fa] hover:bg-[#f1f5f9] border border-[#cbd5e1] text-[#00236f] text-[12px] font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              Rephrase using public regulatory citations
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};
