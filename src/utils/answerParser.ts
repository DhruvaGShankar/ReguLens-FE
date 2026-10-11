export interface ParsedSourceItem {
  number: number;
  rawText: string;
  refNumber?: string;
  title?: string;
  date?: string;
  url?: string;
}

export interface ParsedAnswer {
  summaryText: string;
  evidenceItems: string[];
  sources: ParsedSourceItem[];
  hasStructuredSections: boolean;
}

/**
 * Parses raw LLM answer text into clean structured components.
 * Strips raw ASCII headers like 'ANSWER\n-------' and 'SOURCES\n-------'.
 */
export function parseRawAnswer(raw: string): ParsedAnswer {
  if (!raw || typeof raw !== 'string') {
    return { summaryText: '', evidenceItems: [], sources: [], hasStructuredSections: false };
  }

  // Check if raw answer contains explicit section headers (ANSWER, EVIDENCE, SOURCES)
  const hasAnswerHeader = /ANSWER\s*\n[-=]+/i.test(raw);
  const hasEvidenceHeader = /EVIDENCE\s*\n[-=]+/i.test(raw);
  const hasSourcesHeader = /SOURCES\s*\n[-=]+/i.test(raw);

  if (!hasAnswerHeader && !hasEvidenceHeader && !hasSourcesHeader) {
    return {
      summaryText: raw.trim(),
      evidenceItems: [],
      sources: [],
      hasStructuredSections: false,
    };
  }

  let summaryText = '';
  let evidenceItems: string[] = [];
  let sources: ParsedSourceItem[] = [];

  // Split sections using regex matching ANSWER, EVIDENCE, SOURCES headers
  const sections = raw.split(/(?:ANSWER|EVIDENCE|SOURCES)\s*\n[-=]+/i);

  // Match section titles in order
  const matches = Array.from(raw.matchAll(/(ANSWER|EVIDENCE|SOURCES)\s*\n[-=]+/gi));

  if (matches.length > 0) {
    // Content before first section (if any)
    const preamble = sections[0]?.trim();
    if (preamble && !summaryText) {
      summaryText = preamble;
    }

    matches.forEach((match, idx) => {
      const title = match[1].toUpperCase();
      const content = sections[idx + 1]?.trim() || '';

      if (title === 'ANSWER') {
        summaryText = content;
      } else if (title === 'EVIDENCE') {
        // Split bullet points (starting with '-' or '*')
        evidenceItems = content
          .split(/\n\s*[-*]\s+/)
          .map((item) => item.trim())
          .filter((item) => item.length > 0);

        // If no leading dash, split by newlines
        if (evidenceItems.length === 0 && content.length > 0) {
          evidenceItems = content
            .split('\n')
            .map((item) => item.trim().replace(/^[-*]\s*/, ''))
            .filter((item) => item.length > 0);
        }
      } else if (title === 'SOURCES') {
        // Parse source lines e.g. [1] SEBI/... – Title – Date – https://...
        const lines = content.split('\n').filter((l) => l.trim().length > 0);
        sources = lines.map((line, lineIdx) => {
          const numMatch = line.match(/^\[(\d+)\]\s*(.*)/);
          const num = numMatch ? parseInt(numMatch[1], 10) : lineIdx + 1;
          const textAfterNum = numMatch ? numMatch[2] : line;

          // Extract URL if present
          const urlMatch = textAfterNum.match(/(https?:\/\/[^\s]+)/);
          const url = urlMatch ? urlMatch[1] : undefined;
          const cleanText = textAfterNum.replace(/(https?:\/\/[^\s]+)/, '').trim();

          return {
            number: num,
            rawText: line,
            title: cleanText,
            url,
          };
        });
      }
    });
  } else {
    summaryText = raw.trim();
  }

  return {
    summaryText: summaryText || raw.trim(),
    evidenceItems,
    sources,
    hasStructuredSections: true,
  };
}

/**
 * Replaces Unicode/ASCII inline citations e.g. 【1】, 【2】 or [1], [2]
 * with structured tokens that can be rendered as interactive React buttons.
 */
export function formatCitationTokens(text: string): Array<{ type: 'text' | 'citation'; content: string; num?: number }> {
  if (!text) return [];

  // Match 【1】, 【 2 】, [1], [ 2 ]
  const regex = /(?:【\s*(\d+)\s*】|\[\s*(\d+)\s*\])/g;
  const parts: Array<{ type: 'text' | 'citation'; content: string; num?: number }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex, match.index),
      });
    }

    const citationNum = parseInt(match[1] || match[2], 10);
    parts.push({
      type: 'citation',
      content: `[${citationNum}]`,
      num: citationNum,
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.substring(lastIndex),
    });
  }

  return parts;
}
