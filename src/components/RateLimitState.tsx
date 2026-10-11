import React, { useEffect, useState } from 'react';

interface RateLimitStateProps {
  onRetry: () => void;
}

export const RateLimitState: React.FC<RateLimitStateProps> = ({ onRetry }) => {
  const [countdown, setCountdown] = useState<number>(12);

  useEffect(() => {
    if (countdown <= 0) {
      onRetry();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, onRetry]);

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 space-y-6">
      <div className="bg-white border border-[#ba1a1a]/30 rounded-[6px] p-5 sm:p-6 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-[6px] bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">traffic</span>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-serif-legal text-[16px] font-semibold text-[#ba1a1a]">
                Notice: Regulatory RAG gateway rate limit reached (HTTP 429)
              </h2>
              <span className="text-[11px] font-mono bg-[#ffdad6] text-[#93000a] px-2 py-0.5 rounded-[3px] font-bold">
                429 TOO MANY REQUESTS
              </span>
            </div>

            <p className="text-[14px] text-[#131b2e] leading-relaxed">
              The statutory retrieval gateway is temporarily throttled to preserve statutory database integrity under heavy concurrent load. Statutory vector partitions remain safeguarded. Retrying automatically in{' '}
              <span className="font-semibold text-[#00236f]">{countdown}</span> seconds...
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] bg-[#00236f] text-white hover:bg-[#142a4f] text-[12px] font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                Retry Now
              </button>
              <span className="text-[11px] text-[#64748b]">
                System throttling resets automatically
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
