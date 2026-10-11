/**
 * ReguLens API Contract Types
 * Derived directly from docs/api/openapi.yaml & API_CONTRACT.md
 */

export type RetrievalMode = 'hybrid_reranked' | 'hybrid' | 'dense' | 'bm25';

export interface ChatRequest {
  query: string;
  mode?: RetrievalMode;
  top_k?: number;
  alpha?: number;
}

export interface EvidenceChunk {
  chunk_id: string;
  document_id: string;
  circular_number: string | null;
  subject: string | null;
  issue_date: string | null;
  effective_date: string | null;
  issuing_department: string | null;
  circular_type: string | null;
  supersession_status: string | null;
  validity_status: string | null;
  source_url: string | null;
  section: string | null;
  context_header: string | null;
  text: string;
  body_text: string | null;
  word_count: number | null;
  score: number;
  retrieval_source: string | null;
  dense_score: number | null;
  bm25_score: number | null;
  hybrid_score: number | null;
  rerank_score: number | null;
}

export interface ResponseMetadata {
  retrieved_count: number;
  execution_time_ms: number;
  model_used: string;
}

export interface ChatResponse {
  request_id: string;
  query: string;
  answer: string;
  evidence_chunks: EvidenceChunk[];
  retrieval_mode: RetrievalMode;
  refused: boolean;
  metadata: ResponseMetadata;
}

export interface SystemStatus {
  faiss_index_loaded: boolean;
  faiss_vector_count: number;
  bm25_index_loaded: boolean;
  llm_provider: string;
  llm_model: string;
}

export interface HealthResponse {
  status: 'healthy' | 'degraded';
  version: string;
  timestamp: string;
  system_status: SystemStatus;
}

export interface ErrorDetail {
  code: string;
  message: string;
  details?: Array<{ field?: string; issue?: string; type?: string; [key: string]: unknown }> | null;
  timestamp: string;
}

export interface ErrorResponse {
  error: ErrorDetail;
}

/**
 * Frontend Chat Session State
 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  response?: ChatResponse;
  error?: ErrorDetail;
  isLoading?: boolean;
}
