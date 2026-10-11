import { RegulatoryResponse, CitationSource } from '../types/regulatory';

export const defaultAIFResponse: RegulatoryResponse = {
  id: 'aif-governance-001',
  userQuery: 'What are the governance and valuation requirements applicable to Category II Alternative Investment Funds (AIFs) under SEBI Master Circulars?',
  timestamp: '10:42 AM · 12 Sep 2024',
  title: 'SEBI (Alternative Investment Funds) Regulations, 2012 & Master Circular Framework',
  applicableRegime: 'Applicable Regime: Category II AIF Governance, Independent Valuation, and Unit Dematerialisation.',
  confidenceScore: 'High',
  confidenceNote: 'RAG Confidence: High (Cross-encoder reranked)',
  summaryParagraph:
    'Under the consolidated regulatory regime prescribed by the Securities and Exchange Board of India (SEBI), Category II Alternative Investment Funds (AIFs) are subject to stringent fiduciary governance requirements, mandatory arm’s-length valuation controls, and strict compliance reporting. The overarching framework is codified pursuant to the SEBI Master Circular for Alternative Investment Funds [1] read alongside subsequent amendments to Regulation 20 of the Principal AIF Regulations [2].',
  sections: [
    {
      title: '1. Governance & Investment Committee Accountability',
      citationRefNumber: 1,
      content:
        'The Manager of a Category II AIF is contractually and statutorily liable for all investments and operational decisions. Where an Investment Committee is constituted by the Manager to approve investment choices, the members of such committee are held to equal fiduciary accountability as the Manager under Regulation 20(6). Investment Committee charters cannot disclaim statutory compliance responsibilities mandated under SEBI gazette provisions.',
    },
    {
      title: '2. Valuation of Investment Portfolio & Independent Valuer Mandate',
      citationRefNumber: 2,
      content:
        'The valuation of investments held by Category II AIFs must be conducted at minimum intervals of six months by an authorized independent valuer. The Manager and trustee board are required to ensure compliance with either the International Private Equity and Venture Capital Valuation (IPEV) Guidelines or standards framed by the mandated Industry Association.',
    },
    {
      title: '3. Dematerialisation of Units & Compliance Reporting',
      citationRefNumber: 3,
      content:
        'Category II AIF schemes with a corpus exceeding the statutory threshold must facilitate issuance of units exclusively in dematerialised format via depositories (NSDL/CDSL). Furthermore, quarterly audit returns reflecting compliance with valuation methodologies must be filed with SEBI via the centralized intermediary portal.',
    },
  ],
  verbatimClause: {
    clauseTitle: 'Verbatim Statutory Clause · SEBI Master Circular § 9.1.2',
    excerpt:
      '“Every Category II AIF shall ensure that portfolio investments are valued by an independent valuer who is registered with the Insolvency and Bankruptcy Board of India (IBBI) and has demonstrable track records in valuation of private debt and unlisted securities, adhering strictly to IPEV principles.”',
  },
  citations: [
    {
      id: 'src-1',
      citationNumber: 1,
      type: 'SEBI Master Circular',
      date: 'July 31, 2023',
      title: 'Master Circular for Alternative Investment Funds (AIFs)',
      circularRef: 'SEBI/HO/AFD/PoD/P/CIR/2023/130',
      department: 'Alternative Investment Fund and Foreign Portfolio Investors Department (AFD)',
      verbatimPassage:
        '“Clause 9.1: Valuation of Investments — The Manager and the independent valuer shall ensure that the valuation of assets is carried out strictly in accordance with the International Private Equity and Venture Capital Valuation (IPEV) Guidelines or standards prescribed by the Association of Alternative Investment Funds...”',
      pdfUrl: 'https://www.sebi.gov.in/legal/master-circulars/jul-2023/master-circular-for-alternative-investment-funds-aifs-_74780.html',
    },
    {
      id: 'src-2',
      citationNumber: 2,
      type: 'SEBI Gazette Notification',
      date: 'June 15, 2023',
      title: 'Securities and Exchange Board of India (Alternative Investment Funds) (Second Amendment) Regulations, 2023',
      circularRef: 'SEBI/LAD-NRO/GN/2023/132',
      department: 'Legal Affairs Department (LAD)',
      verbatimPassage:
        '“Regulation 20(6): The Investment Committee members shall be equally bound by the obligations specified for the Manager under these regulations and shall ensure compliance with statutory governance directives...”',
      pdfUrl: 'https://www.sebi.gov.in/legal/regulations/jun-2023/sebi-alternative-investment-funds-second-amendment-regulations-2023_72658.html',
    },
    {
      id: 'src-3',
      citationNumber: 3,
      type: 'Operational Circular',
      date: 'March 20, 2024',
      title: 'Guidelines on Dematerialisation of Units and Timeline Extensions for AIFs',
      circularRef: 'SEBI/HO/AFD-1/PoD/CIR/P/2024/17',
      department: 'Alternative Investment Fund and Foreign Portfolio Investors Department (AFD)',
      verbatimPassage:
        'Mandates all existing schemes of Category II AIFs with capital commitments above INR 500 Crore to onboard depository links for mandatory credit of units.',
      pdfUrl: 'https://www.sebi.gov.in/legal/circulars/mar-2024/guidelines-on-dematerialisation-of-units-for-aifs_82312.html',
    },
  ],
};

export const sampleLODRResponse: RegulatoryResponse = {
  id: 'lodr-materiality-002',
  userQuery: 'What does a specific SEBI circular prescribe regarding LODR disclosure timelines and materiality under Regulation 30?',
  timestamp: '02:15 PM · 12 Sep 2024',
  title: 'SEBI (LODR) Regulations, 2015: Regulation 30 & Master Circular Disclosure Directives',
  applicableRegime: 'Applicable Regime: Listed Entity Continuing Disclosures, Quantitative Materiality, and Event-Driven Filings.',
  confidenceScore: 'High',
  confidenceNote: 'RAG Confidence: High (Cross-encoder reranked)',
  summaryParagraph:
    'Under Regulation 30 read with SEBI Circular SEBI/HO/CFD/CFD-PoD-1/P/CIR/2023/123 [1], listed entities are subject to codified, non-negotiable timelines for disclosure of material events to stock exchanges. The framework departs from subjective management discretion by establishing definitive quantitative materiality thresholds [2] and accelerated transmission windows for board meeting outcomes [3].',
  sections: [
    {
      title: '1. Accelerated Disclosure Timelines for Material Events',
      citationRefNumber: 1,
      content:
        'Disclosures emanating from board meetings must be communicated to recognized stock exchanges within 30 minutes of the meeting closure. Events originating internally within the listed entity must be disclosed within 12 hours. Events originating from external sources or third parties must be disclosed within 24 hours of knowledge.',
    },
    {
      title: '2. Codified Quantitative Materiality Thresholds',
      citationRefNumber: 2,
      content:
        'An omission or event is deemed statutorily material if its value or expected impact exceeds: (a) 2% of turnover as per the last audited consolidated financial statements, (b) 2% of net worth as per the last audited consolidated financial statements, or (c) 5% of the average absolute value of profit or loss after tax over the preceding three audited financial years.',
    },
    {
      title: '3. Mandatory Rumour Verification Mandate',
      citationRefNumber: 3,
      content:
        'The top 100 listed entities (subsequently extending to top 250) are under statutory mandate to confirm, deny, or clarify market rumours reported in mainstream media within 24 hours of publication where material price movement is observed.',
    },
  ],
  verbatimClause: {
    clauseTitle: 'Verbatim Statutory Clause · Regulation 30(6) Second Proviso',
    excerpt:
      '“The listed entity shall disclose to the stock exchange(s) all events or information which are material in terms of the provisions of this regulation as soon as reasonably possible and in any case not later than thirty minutes from the closure of the meeting of the board of directors in which the decision pertained.”',
  },
  citations: [
    {
      id: 'src-lodr-1',
      citationNumber: 1,
      type: 'SEBI Master Circular',
      date: 'July 13, 2023',
      title: 'Disclosure of Material Events / Information by Listed Entities under Regulations 30 and 30A of SEBI (LODR) Regulations, 2015',
      circularRef: 'SEBI/HO/CFD/CFD-PoD-1/P/CIR/2023/123',
      department: 'Corporation Finance Department (CFD)',
      verbatimPassage:
        '“Clause 2.1: Timelines for disclosure of events specified in Part A of Schedule III — (i) 30 minutes from closure of the board meeting; (ii) 12 hours from the occurrence if originating within the entity; (iii) 24 hours if originating externally...”',
      pdfUrl: 'https://www.sebi.gov.in/legal/circulars/jul-2023/disclosure-of-material-events-under-reg-30_73922.html',
    },
    {
      id: 'src-lodr-2',
      citationNumber: 2,
      type: 'SEBI Gazette Notification',
      date: 'June 14, 2023',
      title: 'Securities and Exchange Board of India (Listing Obligations and Disclosure Requirements) (Second Amendment) Regulations, 2023',
      circularRef: 'SEBI/LAD-NRO/GN/2023/131',
      department: 'Legal Affairs Department (LAD)',
      verbatimPassage:
        '“Amendment to Regulation 30(4)(i): Sub-clause (c) inserted codifying quantitative test of 2% turnover, 2% net worth, or 5% three-year average PAT.”',
      pdfUrl: 'https://www.sebi.gov.in/legal/regulations/jun-2023/sebi-lodr-second-amendment-regulations-2023_72655.html',
    },
    {
      id: 'src-lodr-3',
      citationNumber: 3,
      type: 'Operational Circular',
      date: 'May 21, 2024',
      title: 'Industry Standards on Verification of Market Rumours under Regulation 30(11)',
      circularRef: 'SEBI/HO/CFD/CFD-PoD-2/P/CIR/2024/51',
      department: 'Corporation Finance Department (CFD)',
      verbatimPassage:
        '“Entities are mandated to establish an internal surveillance matrix to assess mainstream media reports affecting scrip volume and price variation.”',
      pdfUrl: 'https://www.sebi.gov.in/legal/circulars/may-2024/industry-standards-rumour-verification_83510.html',
    },
  ],
};

export const sampleSCORESResponse: RegulatoryResponse = {
  id: 'scores-investor-003',
  userQuery: 'Which provisions address investor complaints and SCORES 2.0 escalation?',
  timestamp: '03:30 PM · 12 Sep 2024',
  title: 'SEBI Complaint Redress System (SCORES 2.0) Master Circular & Redressal Directives',
  applicableRegime: 'Applicable Regime: Investor Grievance Mechanism, Intermediary SLA, and Two-Tier Escalation Matrix.',
  confidenceScore: 'High',
  confidenceNote: 'RAG Confidence: High (Cross-encoder reranked)',
  summaryParagraph:
    'Pursuant to SEBI Master Circular SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2024/22 [1], the Securities and Exchange Board of India enacted the SCORES 2.0 institutional architecture. The revised regime establishes a unified 21-calendar-day resolution timeline [2], direct workflow integration with First-Stage Reviewers (Designated Bodies), and automated escalation to SEBI Enforcement [3].',
  sections: [
    {
      title: '1. Standard 21-Day Turnaround Mandate',
      citationRefNumber: 1,
      content:
        'All listed companies, registered intermediaries, and market infrastructure institutions must redress investor grievances forwarded via SCORES within 21 calendar days from the date of receipt, down from the earlier 30-day window.',
    },
    {
      title: '2. Two-Tier Review Matrix via Designated Bodies',
      citationRefNumber: 2,
      content:
        'SCORES 2.0 integrates automated routing: First review is performed directly by the relevant Designated Body (e.g. Stock Exchanges for listed entities, Depository for DPs, AMFI for Mutual Funds). If the complainant is unsatisfied, a second-tier review can be requested within 15 days.',
    },
    {
      title: '3. Non-Compliance Penalties & Auto-Routing',
      citationRefNumber: 3,
      content:
        'Failure to upload an Action Taken Report (ATR) within 21 days results in automatic compounding penalties of INR 1,000 per day per complaint against the defaulting entity, alongside potential freezing of promoter demat holdings pursuant to SEBI SOP directives.',
    },
  ],
  verbatimClause: {
    clauseTitle: 'Verbatim Statutory Clause · SCORES 2.0 Circular § 4.3',
    excerpt:
      '“The entity against whom a complaint is lodged shall submit the Action Taken Report (ATR) within twenty-one calendar days. Any failure to submit the ATR within the specified period shall invite automatic monetary penalties and referral to the Adjudicating Officer under Section 15C of the SEBI Act, 1992.”',
  },
  citations: [
    {
      id: 'src-scores-1',
      citationNumber: 1,
      type: 'SEBI Master Circular',
      date: 'April 01, 2024',
      title: 'Master Circular on Online Resolution of Disputes and SCORES 2.0 Implementation',
      circularRef: 'SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2024/22',
      department: 'Office of Investor Assistance and Education (OIAE)',
      verbatimPassage:
        '“Clause 4.1: Implementation of SCORES 2.0 with enhanced speed, automated routing to designated bodies, and a strict 21-day timeline for intermediary ATR filing.”',
      pdfUrl: 'https://www.sebi.gov.in/legal/master-circulars/apr-2024/master-circular-on-scores-2-0_82640.html',
    },
    {
      id: 'src-scores-2',
      citationNumber: 2,
      type: 'Operational Circular',
      date: 'September 20, 2023',
      title: 'Redressal of Investor Grievances through the SEBI Complaint Redress System (SCORES) Platform',
      circularRef: 'SEBI/HO/OIAE/IGRD/CIR/P/2023/156',
      department: 'Office of Investor Assistance and Education (OIAE)',
      verbatimPassage:
        '“Entities are mandated to configure automated API endpoints to pull grievance tickets and upload digitally authenticated Action Taken Reports.”',
      pdfUrl: 'https://www.sebi.gov.in/legal/circulars/sep-2023/redressal-of-investor-grievances_77123.html',
    },
    {
      id: 'src-scores-3',
      citationNumber: 3,
      type: 'SEBI Gazette Notification',
      date: 'August 17, 2023',
      title: 'Securities and Exchange Board of India (Investor Protection and Education Fund) (Amendment) Regulations, 2023',
      circularRef: 'SEBI/LAD-NRO/GN/2023/145',
      department: 'Legal Affairs Department (LAD)',
      verbatimPassage:
        '“Section 15C Enforcement Protocol: Failure to redress investor grievances post-show cause notice attracts statutory fines under Section 15C of SEBI Act 1992.”',
      pdfUrl: 'https://www.sebi.gov.in/legal/regulations/aug-2023/sebi-ipef-amendment-regulations-2023_75412.html',
    },
  ],
};

export const sampleRefusalResponse: RegulatoryResponse = {
  id: 'refusal-001',
  userQuery: 'Can you provide the personal home address of the SEBI Adjudicating Officer in Order No. 44?',
  timestamp: '11:15 AM · 12 Sep 2024',
  title: 'Notice of Statutory Limitation & Scope Restriction',
  applicableRegime: 'Compliance Scope: Restricted Non-Public Inquiry Excluded from Statutory Repository.',
  confidenceScore: 'Low',
  confidenceNote: 'RAG Limitation: Policy Refusal (Restricted Personal Data)',
  summaryParagraph:
    'Notice of Statutory Limitation: ReguLens can only interpret published SEBI Acts, Gazette Notifications, and Master Circulars. Non-public personal data, confidential adjudicatory files, and speculative legal outcomes are strictly excluded from the statutory corpus.',
  sections: [
    {
      title: 'Scope Restriction Statement',
      content:
        'In accordance with SEBI data confidentiality guidelines and statutory repository policies, internal personnel contact logs, personal identifier markers, and non-notified procedural notes are neither parsed nor indexed.',
    },
  ],
  isRefusal: true,
  refusalReason:
    'ReguLens can only interpret published SEBI Acts, Gazette Notifications, and Master Circulars. Non-public personal data, confidential adjudicatory files, and speculative legal outcomes are strictly excluded from the statutory corpus.',
  suggestedRephrase:
    'What are the official legal findings and penalty provisions in SEBI Adjudication Order No. 44?',
  citations: [],
};

export interface GazetteItem {
  id: string;
  reference: string;
  title: string;
  date: string;
  department: string;
  category: 'Master Circular' | 'Regulations' | 'Operational' | 'Adjudication';
  summary: string;
  link: string;
}

export const gazetteArchiveItems: GazetteItem[] = [
  {
    id: 'gz-01',
    reference: 'SEBI/HO/AFD/PoD/P/CIR/2023/130',
    title: 'Master Circular for Alternative Investment Funds (AIFs)',
    date: '31 Jul 2023',
    department: 'AFD',
    category: 'Master Circular',
    summary: 'Consolidation of operational circulars concerning Category I, II, and III AIF governance, valuation norms, and dematerialisation mandate.',
    link: 'https://www.sebi.gov.in/legal/master-circulars/jul-2023/master-circular-for-alternative-investment-funds-aifs-_74780.html',
  },
  {
    id: 'gz-02',
    reference: 'SEBI/HO/CFD/CFD-PoD-1/P/CIR/2023/123',
    title: 'Disclosure of Material Events / Information under Regulation 30 & 30A LODR',
    date: '13 Jul 2023',
    department: 'CFD',
    category: 'Master Circular',
    summary: 'Detailed guidelines and quantitative criteria for determination of materiality for continuous disclosures by listed entities.',
    link: 'https://www.sebi.gov.in/legal/circulars/jul-2023/disclosure-of-material-events-under-reg-30_73922.html',
  },
  {
    id: 'gz-03',
    reference: 'SEBI/HO/ISD/ISD-PoD-2/P/CIR/2023/039',
    title: 'Master Circular for Prevention of Insider Trading (PIT)',
    date: '23 Mar 2023',
    department: 'ISD',
    category: 'Master Circular',
    summary: 'Comprehensive compilation on Structured Digital Database (SDD) logs, trading window closure protocol, and code of conduct.',
    link: 'https://www.sebi.gov.in/legal/master-circulars/mar-2023/master-circular-for-prevention-of-insider-trading_69321.html',
  },
  {
    id: 'gz-04',
    reference: 'SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2024/22',
    title: 'Master Circular on Online Resolution of Disputes & SCORES 2.0',
    date: '01 Apr 2024',
    department: 'OIAE',
    category: 'Master Circular',
    summary: 'Redressal of investor grievances via SCORES 2.0, two-tier review by designated bodies, and 21-day timeline enforcement.',
    link: 'https://www.sebi.gov.in/legal/master-circulars/apr-2024/master-circular-on-scores-2-0_82640.html',
  },
  {
    id: 'gz-05',
    reference: 'SEBI/LAD-NRO/GN/2023/132',
    title: 'SEBI (Alternative Investment Funds) (Second Amendment) Regulations, 2023',
    date: '15 Jun 2023',
    department: 'LAD',
    category: 'Regulations',
    summary: 'Statutory codification of Investment Committee liability under Regulation 20(6) and valuation mandates.',
    link: 'https://www.sebi.gov.in/legal/regulations/jun-2023/sebi-alternative-investment-funds-second-amendment-regulations-2023_72658.html',
  },
  {
    id: 'gz-06',
    reference: 'SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/37',
    title: 'Master Circular for Stock Brokers & Depository Participants',
    date: '22 May 2024',
    department: 'MIRSD',
    category: 'Master Circular',
    summary: 'Compilation of master directives regarding client collateral pledging, upstreaming of client funds, and risk management.',
    link: 'https://www.sebi.gov.in/legal/master-circulars/may-2024/master-circular-for-stock-brokers_83610.html',
  },
  {
    id: 'gz-07',
    reference: 'SEBI/HO/CFD/PoD-1/P/CIR/2024/49',
    title: 'Industry Standards on Verification of Market Rumours by Listed Entities',
    date: '21 May 2024',
    department: 'CFD',
    category: 'Operational',
    summary: 'Framework governing obligations of top 100 and top 250 listed entities to verify market rumours under LODR Reg 30(11).',
    link: 'https://www.sebi.gov.in/legal/circulars/may-2024/industry-standards-rumour-verification_83510.html',
  },
  {
    id: 'gz-08',
    reference: 'SEBI/HO/IMD/IMD-PoD-1/P/CIR/2023/74',
    title: 'Master Circular for Mutual Funds',
    date: '19 May 2023',
    department: 'IMD',
    category: 'Master Circular',
    summary: 'Consolidated guidelines covering Total Expense Ratio (TER), scheme categorisation, NAV computation, and valuation of debt papers.',
    link: 'https://www.sebi.gov.in/legal/master-circulars/may-2023/master-circular-for-mutual-funds_71290.html',
  },
];
