import React from 'react';
import { ErrorDetail } from '../types/api';

interface ErrorBannerProps {
  error: ErrorDetail;
  onRetry?: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ error, onRetry }) => {
  const isValidation = error.code === 'VALIDATION_ERROR';
  const isRateLimit = error.code === 'RATE_LIMIT_EXCEEDED';
  const isNetwork = error.code === 'NETWORK_ERROR';

  return (
    <div className="my-4 p-4 rounded-md border border-red-200 bg-red-50 text-red-900 space-y-3 text-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h4 className="font-semibold text-red-950 text-sm flex items-center gap-2">
              <span>{error.message || 'An error occurred while processing your request.'}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-red-100 text-red-800 border border-red-200">
                {error.code}
              </span>
            </h4>
            
            {isNetwork && (
              <p className="mt-1 text-xs text-red-800 leading-relaxed">
                Ensure the FastAPI backend is running (`python -m uvicorn src.api.main:app --reload --port 8000`).
              </p>
            )}

            {isRateLimit && (
              <p className="mt-1 text-xs text-red-800 leading-relaxed">
                The daily rate limit for the upstream AI model has been reached. Please wait before retrying.
              </p>
            )}

            {isValidation && error.details && error.details.length > 0 && (
              <div className="mt-2 space-y-1 text-xs font-mono bg-red-100/60 p-2 rounded border border-red-200 text-red-900">
                {error.details.map((d, i) => (
                  <div key={i}>
                    <span className="font-bold">{d.field || 'field'}:</span> {d.issue || JSON.stringify(d)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="shrink-0 px-3 py-1.5 rounded text-xs font-medium bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer"
          >
            Retry Query
          </button>
        )}
      </div>

      <div className="text-[11px] font-mono text-red-600/80 text-right">
        Timestamp: {error.timestamp}
      </div>
    </div>
  );
};
