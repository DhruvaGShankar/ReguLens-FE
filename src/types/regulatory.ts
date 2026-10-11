export interface CitationSource {
  id: string;
  citationNumber: number;
  type: 'SEBI Master Circular' | 'SEBI Gazette Notification' | 'Operational Circular' | 'Adjudication Order';
  date: string;
  title: string;
  circularRef: string;
  verbatimPassage: string;
  department?: string;
  pdfUrl?: string;
  linkUrl?: string;
}

export interface StatutorySection {
  title: string;
  citationRefNumber?: number;
  content: string;
}

export interface RegulatoryResponse {
  id: string;
  userQuery: string;
  timestamp: string;
  title: string;
  applicableRegime: string;
  confidenceScore: 'High' | 'Medium' | 'Low';
  confidenceNote: string;
  summaryParagraph: string;
  sections: StatutorySection[];
  verbatimClause?: {
    clauseTitle: string;
    excerpt: string;
  };
  citations: CitationSource[];
  isRefusal?: boolean;
  refusalReason?: string;
  suggestedRephrase?: string;
}

export type SimulatedState = 'active' | 'empty' | 'retrieval' | 'refusal' | 'ratelimit';
