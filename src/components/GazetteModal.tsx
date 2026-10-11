import React, { useState } from 'react';
import { gazetteArchiveItems, GazetteItem } from '../data/regulatoryCorpus';

interface GazetteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQueryCircular: (circularTitle: string) => void;
}

export const GazetteModal: React.FC<GazetteModalProps> = ({
  isOpen,
  onClose,
  onQueryCircular,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredItems = gazetteArchiveItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCopyRef = (item: GazetteItem) => {
    navigator.clipboard.writeText(`${item.title} (${item.reference})`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#131b2e]/40 backdrop-blur-xs">
      <div 
        className="bg-white border border-[#cbd5e1] rounded-[6px] shadow-lg max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8f9fa]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#00236f] text-[22px]">history_edu</span>
            <div>
              <h2 className="font-serif-legal text-[17px] font-semibold text-[#131b2e]">
                SEBI Gazette &amp; Master Circular Archives
              </h2>
              <p className="text-[11px] text-[#64748b]">
                Verified statutory corpus indexed in ReguLens RAG vector store
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#64748b] hover:text-[#131b2e] p-1 rounded-[4px] hover:bg-[#e2e8f0] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="p-4 border-b border-[#e2e8f0] bg-white space-y-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#94a3b8] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search circular title, reference number, or issuing department..."
              className="w-full pl-9 pr-4 py-2 border border-[#cbd5e1] rounded-[4px] text-[13px] text-[#131b2e] placeholder:text-[#94a3b8] focus:border-[#00236f] outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-[12px]">
            <span className="text-[#64748b] text-[11px] mr-1 font-semibold uppercase">Type:</span>
            {['All', 'Master Circular', 'Regulations', 'Operational'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-[3px] text-[11px] font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#00236f] text-white'
                    : 'bg-[#f1f5f9] text-[#444651] hover:bg-[#e2e8f0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Circulars List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-[#64748b] text-[13px]">
              No circulars found matching "{searchTerm}"
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="border border-[#cbd5e1] hover:border-[#94a3b8] rounded-[4px] p-3.5 bg-white transition-all space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded-[3px] bg-[#eaedff] text-[#00236f] text-[10px] font-semibold border border-[#cbd5e1]/70">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono text-[#0051d5] font-semibold">
                      {item.reference}
                    </span>
                  </div>
                  <time className="text-[11px] font-mono text-[#64748b]">{item.date}</time>
                </div>

                <h3 className="font-serif-legal text-[14px] font-semibold text-[#131b2e] leading-snug">
                  {item.title}
                </h3>

                <p className="text-[12px] text-[#444651] leading-relaxed">
                  {item.summary}
                </p>

                <div className="pt-2 border-t border-[#f1f5f9] flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-[#64748b]">
                    Dept: <span className="font-semibold text-[#131b2e]">{item.department}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyRef(item)}
                      className="px-2 py-1 text-[11px] rounded-[3px] bg-[#f8f9fa] hover:bg-[#f1f5f9] border border-[#cbd5e1] text-[#131b2e] font-medium transition-colors cursor-pointer"
                    >
                      {copiedId === item.id ? 'Copied!' : 'Copy Reference'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onQueryCircular(`What obligations are specified in ${item.title} (${item.reference})?`);
                      }}
                      className="px-2.5 py-1 text-[11px] rounded-[3px] bg-[#00236f] hover:bg-[#142a4f] text-white font-semibold transition-colors cursor-pointer"
                    >
                      Research in ReguLens →
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-[#e2e8f0] bg-[#f8f9fa] flex items-center justify-between text-[11px] text-[#64748b]">
          <span>Source: Securities and Exchange Board of India (sebi.gov.in)</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-[4px] bg-white border border-[#cbd5e1] text-[#131b2e] font-medium hover:bg-[#f1f5f9] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
