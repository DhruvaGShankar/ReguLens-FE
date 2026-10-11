import { ChatRequest, ChatResponse, ErrorResponse, HealthResponse } from '../types/api';

/**
 * Resolves the backend base URL from environment variables.
 * Defaults to http://localhost:8000 if not specified.
 */
function getApiBaseUrl(): string {
  const envUrl = import.meta.env?.VITE_API_BASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.replace(/\/+$/, '');
  }
  return 'http://localhost:8000';
}

/**
 * Checks backend health status (`GET /api/v1/health`)
 */
export async function checkApiHealth(): Promise<HealthResponse> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/v1/health`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Health check failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to connect to ReguLens backend'
    );
  }
}

/**
 * Submits a regulatory query to the backend (`POST /api/v1/chat`)
 */
export async function sendRegulatoryQuery(request: ChatRequest): Promise<ChatResponse> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/v1/chat`;

  const payload = {
    query: request.query,
    mode: request.mode || 'hybrid_reranked',
    top_k: request.top_k ?? 5,
    alpha: request.alpha ?? 0.5,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errorData: ErrorResponse;
      try {
        errorData = await response.json();
      } catch {
        // Fallback for non-JSON error responses (e.g. 502 Bad Gateway from Nginx/Cloudflare)
        errorData = {
          error: {
            code: getErrorCodeForStatus(response.status),
            message: `Server returned HTTP ${response.status}: ${response.statusText}`,
            timestamp: new Date().toISOString(),
          },
        };
      }
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    // If error is already structured ErrorResponse, rethrow it
    if (typeof error === 'object' && error !== null && 'error' in error) {
      throw error as ErrorResponse;
    }

    // Network / Connection Error
    throw {
      error: {
        code: 'NETWORK_ERROR',
        message:
          'Unable to connect to the ReguLens backend API. Please ensure the backend server is running on ' +
          baseUrl,
        timestamp: new Date().toISOString(),
      },
    } as ErrorResponse;
  }
}

function getErrorCodeForStatus(status: number): string {
  switch (status) {
    case 422:
      return 'VALIDATION_ERROR';
    case 429:
      return 'RATE_LIMIT_EXCEEDED';
    case 502:
      return 'BAD_GATEWAY';
    case 503:
      return 'SERVICE_UNAVAILABLE';
    case 504:
      return 'GATEWAY_TIMEOUT';
    default:
      return 'INTERNAL_SERVER_ERROR';
  }
}
