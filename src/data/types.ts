// Protocol Compass - Type Definitions

export type DiseaseCategory =
  | 'lung'
  | 'brain'
  | 'spine'
  | 'prostate'
  | 'liver'
  | 'pancreas'
  | 'kidney'
  | 'oligomet';

export type ProtocolSource =
  | 'RTOG'
  | 'NRG'
  | 'ASTRO'
  | 'ESTRO'
  | 'UK_SABR'
  | 'ISRS'
  | 'Institutional'
  | 'Consensus';

export type TechniqueType =
  | 'SBRT'
  | 'SRS'
  | 'SRT'
  | 'VMAT'
  | 'IMRT'
  | 'CyberKnife'
  | 'GammaKnife'
  | '3DCRT';

export interface Prescription {
  dose: number;           // Total dose in Gy
  fractions: number;      // Number of fractions
  dosePerFraction: number; // Gy per fraction
  description?: string;   // e.g., "Risk-adapted", "Standard"
  isPreferred?: boolean;  // Highlight as preferred option
  BED10?: number;         // Biologically Effective Dose (α/β=10)
}

export interface KeyConstraint {
  organ: string;
  constraint: string;     // e.g., "V30 < 30cc" or "Max < 18 Gy"
  priority: 'critical' | 'major' | 'minor';
}

export interface TargetVolume {
  name: string;           // GTV, CTV, PTV, etc.
  definition: string;     // How it's defined
  margin?: string;        // Margin from previous volume
}

export interface MarginDefinition {
  from: string;           // e.g., "GTV"
  to: string;             // e.g., "PTV"
  margin: string;         // e.g., "5mm axial, 10mm SI"
  notes?: string;
}

export interface Publication {
  title: string;
  authors: string;        // First author et al.
  journal: string;
  year: number;
  pmid?: string;
  doi?: string;
}

export interface DetailedConstraint {
  organ: string;
  metric: string;         // Dmax, V20, Mean, etc.
  constraint: string;     // The actual limit
  endpoint?: string;      // What toxicity it prevents
  source?: string;        // Where this constraint comes from
}

export interface Protocol {
  id: string;
  name: string;
  shortName: string;      // e.g., "RTOG 0236"
  source: ProtocolSource;
  category: DiseaseCategory;
  subcategory: string;    // e.g., "Peripheral", "Central"
  icon: string;           // Emoji for display

  // Quick view data
  prescriptions: Prescription[];
  keyConstraints: KeyConstraint[];
  techniques: TechniqueType[];

  // Comprehensive view data
  indication: string;
  eligibility: string[];
  staging?: string;
  targetVolumes: TargetVolume[];
  margins: MarginDefinition[];
  allConstraints: DetailedConstraint[];
  motionManagement?: string;
  imageGuidance?: string;
  treatmentDelivery?: string;
  concurrentTherapy?: string;

  // References
  publications: Publication[];
  protocolPdf?: string;

  // Metadata
  yearPublished: number;
  lastUpdated: string;
  tags: string[];
}

// Category metadata for display
export interface CategoryInfo {
  id: DiseaseCategory;
  name: string;
  icon: string;
  description: string;
  protocolCount?: number;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'lung', name: 'Lung SBRT', icon: '🫁', description: 'Peripheral & central lung tumors' },
  { id: 'brain', name: 'Brain SRS/SRT', icon: '🧠', description: 'Metastases & primary tumors' },
  { id: 'spine', name: 'Spine SBRT', icon: '🦴', description: 'Vertebral body metastases' },
  { id: 'prostate', name: 'Prostate SBRT', icon: '🎯', description: 'Ultra-hypofractionated prostate' },
  { id: 'liver', name: 'Liver SBRT', icon: '🫀', description: 'HCC & liver metastases' },
  { id: 'pancreas', name: 'Pancreas SBRT', icon: '💛', description: 'LAPC & borderline resectable' },
  { id: 'kidney', name: 'Kidney SBRT', icon: '🫘', description: 'RCC & adrenal metastases' },
  { id: 'oligomet', name: 'Oligometastatic', icon: '🔬', description: 'Limited metastatic disease' },
];

// Helper function to calculate BED
export function calculateBED(dose: number, fractions: number, alphaBeta: number = 10): number {
  const dosePerFraction = dose / fractions;
  return dose * (1 + dosePerFraction / alphaBeta);
}

// Helper to build Dose Oracle URL
export function buildDoseOracleUrl(
  siteId: string,
  dose: number,
  fractions: number
): string {
  const params = new URLSearchParams({
    site: siteId,
    dose: dose.toString(),
    fractions: fractions.toString(),
    from: 'protocol-compass'
  });
  return `https://hnusrat1.github.io/dose-oracle?${params.toString()}`;
}
