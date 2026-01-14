import { Protocol, calculateBED } from '../types';

export const LUNG_SBRT_PROTOCOLS: Protocol[] = [
  {
    id: 'rtog-0236',
    name: 'Peripheral Lung SBRT - 54 Gy/3 fx',
    shortName: 'RTOG 0236',
    source: 'RTOG',
    category: 'lung',
    subcategory: 'Peripheral',
    icon: '🫁',

    prescriptions: [
      {
        dose: 54,
        fractions: 3,
        dosePerFraction: 18,
        description: 'Standard 3-fraction regimen',
        isPreferred: true,
        BED10: calculateBED(54, 3, 10), // 151.2 Gy
      },
    ],

    keyConstraints: [
      { organ: 'Spinal Cord', constraint: 'Max < 18 Gy (6 Gy/fx)', priority: 'critical' },
      { organ: 'Esophagus', constraint: 'Max < 27 Gy (9 Gy/fx)', priority: 'critical' },
      { organ: 'Brachial Plexus', constraint: 'Max < 24 Gy (8 Gy/fx)', priority: 'critical' },
      { organ: 'Heart', constraint: 'Max < 30 Gy (10 Gy/fx)', priority: 'major' },
      { organ: 'Trachea/Bronchus', constraint: 'Max < 30 Gy (10 Gy/fx)', priority: 'major' },
    ],

    techniques: ['SBRT', 'VMAT', 'CyberKnife'],

    indication: 'Medically inoperable Stage I/II NSCLC, peripheral location (>2cm from proximal bronchial tree)',

    eligibility: [
      'Histologically confirmed NSCLC',
      'T1-T2 N0 M0 (≤5cm)',
      'Medically inoperable or patient refuses surgery',
      'Tumor located >2cm from proximal bronchial tree',
      'No prior thoracic radiation',
      'KPS ≥70 or Zubrod 0-2',
    ],

    staging: 'AJCC 6th edition Stage I-II',

    targetVolumes: [
      { name: 'GTV', definition: 'Gross tumor visible on CT (lung window)' },
      { name: 'ITV', definition: 'Union of GTV on all phases of 4DCT or slow CT', margin: 'Encompasses respiratory motion' },
      { name: 'PTV', definition: 'ITV + setup margin', margin: '5mm uniform' },
    ],

    margins: [
      { from: 'GTV', to: 'ITV', margin: 'Motion envelope from 4DCT', notes: 'Account for respiratory motion' },
      { from: 'ITV', to: 'PTV', margin: '5mm uniform', notes: 'Setup uncertainty' },
    ],

    allConstraints: [
      { organ: 'Spinal Cord', metric: 'Dmax', constraint: '<18 Gy (6 Gy/fx)', endpoint: 'Myelopathy' },
      { organ: 'Esophagus', metric: 'Dmax', constraint: '<27 Gy (9 Gy/fx)', endpoint: 'Stenosis/fistula' },
      { organ: 'Brachial Plexus', metric: 'Dmax', constraint: '<24 Gy (8 Gy/fx)', endpoint: 'Plexopathy' },
      { organ: 'Heart/Pericardium', metric: 'Dmax', constraint: '<30 Gy (10 Gy/fx)', endpoint: 'Pericarditis' },
      { organ: 'Great Vessels', metric: 'Dmax', constraint: '<39 Gy (13 Gy/fx)', endpoint: 'Aneurysm' },
      { organ: 'Trachea', metric: 'Dmax', constraint: '<30 Gy (10 Gy/fx)', endpoint: 'Stenosis' },
      { organ: 'Main Bronchus', metric: 'Dmax', constraint: '<30 Gy (10 Gy/fx)', endpoint: 'Stenosis' },
      { organ: 'Ribs', metric: 'Dmax', constraint: '<36.9 Gy', endpoint: 'Fracture' },
      { organ: 'Skin', metric: 'Dmax', constraint: '<24 Gy (8 Gy/fx)', endpoint: 'Ulceration' },
      { organ: 'Lung-GTV', metric: 'V20', constraint: '<10%', endpoint: 'Pneumonitis', source: 'Protocol guidance' },
    ],

    motionManagement: '4DCT required. ITV approach or gating/tracking acceptable.',
    imageGuidance: 'Daily CBCT or orthogonal kV imaging. Align to ITV or GTV with gating.',
    treatmentDelivery: 'Non-coplanar beams recommended. Minimum 7-9 beams or 2+ arcs.',

    publications: [
      {
        title: 'Stereotactic body radiation therapy for inoperable early stage lung cancer',
        authors: 'Timmerman R et al.',
        journal: 'JAMA',
        year: 2010,
        pmid: '20233825',
        doi: '10.1001/jama.2010.261',
      },
      {
        title: 'RTOG 0236 Long-term outcomes',
        authors: 'Timmerman RD et al.',
        journal: 'J Clin Oncol',
        year: 2014,
        pmid: '29852036',
        doi: '10.1200/JCO.2013.51.1384',
      },
    ],

    protocolPdf: 'https://www.rtog.org/ClinicalTrials/ProtocolTable/StudyDetails.aspx?study=0236',

    yearPublished: 2004,
    lastUpdated: '2025-01',
    tags: ['SBRT', 'Lung', 'Peripheral', 'NSCLC', 'Stage I', '3 fraction'],
  },

  {
    id: 'rtog-0813',
    name: 'Central Lung SBRT - Risk-Adapted',
    shortName: 'RTOG 0813',
    source: 'RTOG',
    category: 'lung',
    subcategory: 'Central',
    icon: '🫁',

    prescriptions: [
      {
        dose: 50,
        fractions: 5,
        dosePerFraction: 10,
        description: 'Starting dose (Arm 1)',
        isPreferred: false,
        BED10: calculateBED(50, 5, 10),
      },
      {
        dose: 60,
        fractions: 5,
        dosePerFraction: 12,
        description: 'Escalated dose (highest tested)',
        isPreferred: true,
        BED10: calculateBED(60, 5, 10), // 132 Gy
      },
    ],

    keyConstraints: [
      { organ: 'Spinal Cord', constraint: 'Max < 30 Gy (6 Gy/fx)', priority: 'critical' },
      { organ: 'Esophagus', constraint: 'Max < 35 Gy (7 Gy/fx)', priority: 'critical' },
      { organ: 'Brachial Plexus', constraint: 'Max < 32 Gy (6.4 Gy/fx)', priority: 'critical' },
      { organ: 'Proximal Bronchial Tree', constraint: 'Max < 38 Gy', priority: 'critical' },
      { organ: 'Heart', constraint: 'Max < 38 Gy', priority: 'major' },
    ],

    techniques: ['SBRT', 'VMAT'],

    indication: 'Central lung tumors (within 2cm of proximal bronchial tree) - medically inoperable Stage I-II NSCLC',

    eligibility: [
      'Histologically confirmed NSCLC',
      'T1-T2 N0 M0 (≤5cm)',
      'Central location: tumor within 2cm of proximal bronchial tree',
      'Medically inoperable',
      'No prior thoracic RT',
      'KPS ≥70',
    ],

    staging: 'AJCC 7th edition Stage I-II',

    targetVolumes: [
      { name: 'GTV', definition: 'Gross tumor on CT' },
      { name: 'ITV', definition: 'Union of GTV positions on 4DCT' },
      { name: 'PTV', definition: 'ITV + 5mm' },
    ],

    margins: [
      { from: 'GTV', to: 'ITV', margin: 'Motion envelope', notes: '4DCT required' },
      { from: 'ITV', to: 'PTV', margin: '5mm uniform' },
    ],

    allConstraints: [
      { organ: 'Spinal Cord', metric: 'Dmax', constraint: '<30 Gy', endpoint: 'Myelopathy' },
      { organ: 'Esophagus', metric: 'Dmax', constraint: '<35 Gy', endpoint: 'Stenosis/fistula' },
      { organ: 'Brachial Plexus', metric: 'Dmax', constraint: '<32 Gy', endpoint: 'Plexopathy' },
      { organ: 'Heart', metric: 'Dmax', constraint: '<38 Gy', endpoint: 'Pericarditis' },
      { organ: 'Great Vessels', metric: 'Dmax', constraint: '<47 Gy', endpoint: 'Aneurysm' },
      { organ: 'Proximal Bronchial Tree', metric: 'Dmax', constraint: '<38 Gy', endpoint: 'Stenosis' },
      { organ: 'Trachea', metric: 'Dmax', constraint: '<38 Gy', endpoint: 'Stenosis' },
      { organ: 'Lung-GTV', metric: 'V20', constraint: '<10%', endpoint: 'Pneumonitis' },
    ],

    motionManagement: '4DCT mandatory for ITV generation',
    imageGuidance: 'Daily CBCT',
    treatmentDelivery: 'VMAT or static IMRT acceptable. Treated on consecutive or every other day.',

    publications: [
      {
        title: 'Safety and efficacy of stereotactic body radiotherapy for centrally located early stage NSCLC: Results of RTOG 0813',
        authors: 'Bezjak A et al.',
        journal: 'J Clin Oncol',
        year: 2019,
        pmid: '30943123',
        doi: '10.1200/JCO.18.00622',
      },
    ],

    yearPublished: 2009,
    lastUpdated: '2025-01',
    tags: ['SBRT', 'Lung', 'Central', 'NSCLC', 'Stage I', '5 fraction'],
  },

  {
    id: 'rtog-0915',
    name: 'Peripheral Lung SBRT - 34 Gy/1 fx vs 48 Gy/4 fx',
    shortName: 'RTOG 0915',
    source: 'RTOG',
    category: 'lung',
    subcategory: 'Peripheral',
    icon: '🫁',

    prescriptions: [
      {
        dose: 34,
        fractions: 1,
        dosePerFraction: 34,
        description: 'Single fraction (Arm 1)',
        isPreferred: false,
        BED10: calculateBED(34, 1, 10), // 149.6 Gy
      },
      {
        dose: 48,
        fractions: 4,
        dosePerFraction: 12,
        description: '4-fraction regimen (Arm 2)',
        isPreferred: true,
        BED10: calculateBED(48, 4, 10), // 105.6 Gy
      },
    ],

    keyConstraints: [
      { organ: 'Spinal Cord', constraint: '1fx: <14 Gy / 4fx: <25.6 Gy', priority: 'critical' },
      { organ: 'Chest Wall', constraint: '1fx: V30 <30cc / 4fx: V40 <50cc', priority: 'major' },
      { organ: 'Esophagus', constraint: '1fx: Max <15.4 Gy / 4fx: <30 Gy', priority: 'critical' },
      { organ: 'Heart', constraint: '1fx: Max <22 Gy / 4fx: <34 Gy', priority: 'major' },
      { organ: 'Ribs', constraint: '1fx: Max <40 Gy / 4fx: <43 Gy', priority: 'minor' },
    ],

    techniques: ['SBRT', 'VMAT', 'CyberKnife'],

    indication: 'Peripheral Stage I NSCLC - comparing single fraction vs 4 fractions',

    eligibility: [
      'Histologically confirmed NSCLC',
      'T1-T2a N0 M0 (≤4cm)',
      'Peripheral location (>2cm from mediastinum)',
      'Medically inoperable',
      'KPS ≥60',
    ],

    staging: 'AJCC 7th edition T1-T2a N0 M0',

    targetVolumes: [
      { name: 'GTV', definition: 'Gross tumor on CT' },
      { name: 'ITV', definition: 'Motion-encompassing volume from 4DCT' },
      { name: 'PTV', definition: 'ITV + 3-5mm' },
    ],

    margins: [
      { from: 'GTV', to: 'ITV', margin: 'Motion envelope' },
      { from: 'ITV', to: 'PTV', margin: '3-5mm', notes: 'Based on institutional setup accuracy' },
    ],

    allConstraints: [
      { organ: 'Spinal Cord', metric: 'Dmax', constraint: '1fx: <14 Gy / 4fx: <25.6 Gy', endpoint: 'Myelopathy' },
      { organ: 'Chest Wall', metric: 'V30 (1fx) / V40 (4fx)', constraint: '1fx: <30cc / 4fx: <50cc', endpoint: 'Rib fracture/pain' },
      { organ: 'Esophagus', metric: 'Dmax', constraint: '1fx: <15.4 Gy / 4fx: <30 Gy', endpoint: 'Stenosis' },
      { organ: 'Heart', metric: 'Dmax', constraint: '1fx: <22 Gy / 4fx: <34 Gy', endpoint: 'Pericarditis' },
      { organ: 'Great Vessels', metric: 'Dmax', constraint: '1fx: <37 Gy / 4fx: <49 Gy', endpoint: 'Injury' },
      { organ: 'Bronchial Tree', metric: 'Dmax', constraint: '1fx: <20.2 Gy / 4fx: <34.8 Gy', endpoint: 'Stenosis' },
      { organ: 'Skin', metric: 'Dmax', constraint: '1fx: <26 Gy / 4fx: <36 Gy', endpoint: 'Ulceration' },
    ],

    motionManagement: '4DCT required',
    imageGuidance: 'Daily image guidance required. Single fraction requires additional verification.',
    treatmentDelivery: 'Single fraction typically delivered with longer setup/verification time',

    publications: [
      {
        title: 'Comparing outcomes of stereotactic body radiotherapy delivered in 1 versus 4 fractions',
        authors: 'Videtic GMM et al.',
        journal: 'Int J Radiat Oncol Biol Phys',
        year: 2016,
        pmid: '26530743',
        doi: '10.1016/j.ijrobp.2015.08.032',
      },
    ],

    yearPublished: 2010,
    lastUpdated: '2025-01',
    tags: ['SBRT', 'Lung', 'Peripheral', 'NSCLC', 'Single fraction', '4 fraction'],
  },
];
