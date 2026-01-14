import { Protocol, calculateBED } from '../types';

export const BRAIN_SRS_PROTOCOLS: Protocol[] = [
  {
    id: 'brain-mets-1fx',
    name: 'Brain Metastases SRS - Single Fraction',
    shortName: 'SRS 1fx',
    source: 'Consensus',
    category: 'brain',
    subcategory: 'Metastases',
    icon: '🧠',

    prescriptions: [
      {
        dose: 24,
        fractions: 1,
        dosePerFraction: 24,
        description: 'Lesions ≤2cm',
        isPreferred: true,
        BED10: calculateBED(24, 1, 10),
      },
      {
        dose: 18,
        fractions: 1,
        dosePerFraction: 18,
        description: 'Lesions 2.1-3cm',
        isPreferred: false,
        BED10: calculateBED(18, 1, 10),
      },
      {
        dose: 15,
        fractions: 1,
        dosePerFraction: 15,
        description: 'Lesions 3.1-4cm',
        isPreferred: false,
        BED10: calculateBED(15, 1, 10),
      },
    ],

    keyConstraints: [
      { organ: 'Brainstem', constraint: 'Max < 15 Gy', priority: 'critical' },
      { organ: 'Optic Chiasm', constraint: 'Max < 8-10 Gy', priority: 'critical' },
      { organ: 'Optic Nerves', constraint: 'Max < 8-10 Gy', priority: 'critical' },
      { organ: 'Cochlea', constraint: 'Max < 9 Gy', priority: 'major' },
      { organ: 'Brain-GTV', constraint: 'V12 < 5-10cc', priority: 'major' },
    ],

    techniques: ['SRS', 'GammaKnife', 'CyberKnife', 'VMAT'],

    indication: '1-4 brain metastases, single fraction radiosurgery',

    eligibility: [
      'Histologically confirmed primary malignancy',
      '1-4 brain metastases',
      'Maximum diameter ≤4cm (preferably ≤3cm)',
      'KPS ≥70',
      'Controlled systemic disease preferred',
    ],

    staging: 'N/A - Metastatic disease',

    targetVolumes: [
      { name: 'GTV', definition: 'Contrast-enhancing tumor on T1+Gd MRI' },
      { name: 'PTV', definition: 'GTV + 0-2mm', margin: '0mm for frame-based, 1-2mm for frameless' },
    ],

    margins: [
      { from: 'GTV', to: 'PTV', margin: '0-2mm', notes: 'Frame-based: 0mm; Frameless: 1-2mm' },
    ],

    allConstraints: [
      { organ: 'Brainstem', metric: 'Dmax', constraint: '<15 Gy (surface), <10 Gy (center)', endpoint: 'Necrosis' },
      { organ: 'Optic Chiasm', metric: 'Dmax', constraint: '<8 Gy', endpoint: 'Optic neuropathy' },
      { organ: 'Optic Nerves', metric: 'Dmax', constraint: '<8 Gy', endpoint: 'Optic neuropathy' },
      { organ: 'Cochlea', metric: 'Dmax', constraint: '<9 Gy', endpoint: 'Hearing loss' },
      { organ: 'Brain-GTV', metric: 'V12', constraint: '<5-10cc', endpoint: 'Radionecrosis', source: 'QUANTEC' },
      { organ: 'Brain-GTV', metric: 'V10', constraint: '<10.5cc', endpoint: 'Radionecrosis' },
      { organ: 'Lens', metric: 'Dmax', constraint: '<1.5 Gy', endpoint: 'Cataract' },
    ],

    imageGuidance: 'MRI-based planning required. Same-day or recent MRI fusion. Stereotactic localization.',
    treatmentDelivery: 'Frame-based or frameless immobilization. Single-isocenter or multi-isocenter techniques.',

    publications: [
      {
        title: 'ASTRO guideline on radiosurgery for brain metastases',
        authors: 'Tsao MN et al.',
        journal: 'Pract Radiat Oncol',
        year: 2012,
        pmid: '22898678',
        doi: '10.1016/j.prro.2012.07.006',
      },
      {
        title: 'Single-dose radiosurgical treatment of brain metastases: dose-volume analysis',
        authors: 'Shaw E et al.',
        journal: 'Int J Radiat Oncol Biol Phys',
        year: 2000,
        pmid: '10924966',
        doi: '10.1016/S0360-3016(00)00515-4',
      },
    ],

    yearPublished: 2012,
    lastUpdated: '2025-01',
    tags: ['SRS', 'Brain', 'Metastases', 'Single fraction', 'RTOG 9005'],
  },

  {
    id: 'brain-mets-3fx',
    name: 'Brain Metastases SRT - 3 Fractions',
    shortName: 'SRT 3fx',
    source: 'Consensus',
    category: 'brain',
    subcategory: 'Metastases',
    icon: '🧠',

    prescriptions: [
      {
        dose: 27,
        fractions: 3,
        dosePerFraction: 9,
        description: 'Standard 3-fraction SRT',
        isPreferred: true,
        BED10: calculateBED(27, 3, 10),
      },
      {
        dose: 24,
        fractions: 3,
        dosePerFraction: 8,
        description: 'Reduced dose (near eloquent areas)',
        isPreferred: false,
        BED10: calculateBED(24, 3, 10),
      },
    ],

    keyConstraints: [
      { organ: 'Brainstem', constraint: 'Max < 23 Gy', priority: 'critical' },
      { organ: 'Optic Chiasm', constraint: 'Max < 17-19 Gy', priority: 'critical' },
      { organ: 'Optic Nerves', constraint: 'Max < 17-19 Gy', priority: 'critical' },
      { organ: 'Cochlea', constraint: 'Mean < 20 Gy', priority: 'major' },
      { organ: 'Brain-GTV', constraint: 'V23 < 7cc', priority: 'major' },
    ],

    techniques: ['SRT', 'VMAT', 'CyberKnife'],

    indication: 'Brain metastases >2-3cm, lesions near critical structures, or post-operative cavity',

    eligibility: [
      'Brain metastases',
      'Larger lesions (>2-3cm) or near eloquent structures',
      'Post-operative resection cavity',
      'KPS ≥60',
    ],

    staging: 'N/A - Metastatic disease',

    targetVolumes: [
      { name: 'GTV', definition: 'Enhancing tumor or post-op cavity on MRI' },
      { name: 'CTV', definition: 'GTV (no expansion for intact) or GTV + 2mm (post-op cavity)' },
      { name: 'PTV', definition: 'CTV + 1-2mm' },
    ],

    margins: [
      { from: 'GTV', to: 'CTV', margin: '0-2mm', notes: 'Intact: 0mm; Post-op: 1-2mm' },
      { from: 'CTV', to: 'PTV', margin: '1-2mm', notes: 'Setup uncertainty' },
    ],

    allConstraints: [
      { organ: 'Brainstem', metric: 'Dmax', constraint: '<23 Gy', endpoint: 'Necrosis' },
      { organ: 'Optic Apparatus', metric: 'Dmax', constraint: '<17.4 Gy', endpoint: 'Optic neuropathy' },
      { organ: 'Cochlea', metric: 'Mean', constraint: '<20 Gy', endpoint: 'Hearing loss' },
      { organ: 'Brain-GTV', metric: 'V23', constraint: '<7cc', endpoint: 'Radionecrosis' },
      { organ: 'Brain-GTV', metric: 'V18', constraint: '<30cc', endpoint: 'Radionecrosis' },
    ],

    imageGuidance: 'MRI planning. Daily CBCT or ExacTrac.',
    treatmentDelivery: 'Frameless mask. Treat on consecutive days or every other day.',

    publications: [
      {
        title: 'Hypofractionated stereotactic radiotherapy for brain metastases',
        authors: 'Minniti G et al.',
        journal: 'Int J Radiat Oncol Biol Phys',
        year: 2014,
        pmid: '24768200',
        doi: '10.1016/j.ijrobp.2014.04.003',
      },
    ],

    yearPublished: 2014,
    lastUpdated: '2025-01',
    tags: ['SRT', 'Brain', 'Metastases', '3 fraction', 'Large lesions', 'Post-op'],
  },

  {
    id: 'brain-mets-5fx',
    name: 'Brain Metastases SRT - 5 Fractions',
    shortName: 'SRT 5fx',
    source: 'Consensus',
    category: 'brain',
    subcategory: 'Metastases',
    icon: '🧠',

    prescriptions: [
      {
        dose: 30,
        fractions: 5,
        dosePerFraction: 6,
        description: 'Standard 5-fraction SRT',
        isPreferred: true,
        BED10: calculateBED(30, 5, 10),
      },
      {
        dose: 25,
        fractions: 5,
        dosePerFraction: 5,
        description: 'Reduced dose (near brainstem/optics)',
        isPreferred: false,
        BED10: calculateBED(25, 5, 10),
      },
    ],

    keyConstraints: [
      { organ: 'Brainstem', constraint: 'Max < 31 Gy', priority: 'critical' },
      { organ: 'Optic Chiasm', constraint: 'Max < 25 Gy', priority: 'critical' },
      { organ: 'Optic Nerves', constraint: 'Max < 25 Gy', priority: 'critical' },
      { organ: 'Cochlea', constraint: 'Mean < 25 Gy', priority: 'major' },
    ],

    techniques: ['SRT', 'VMAT'],

    indication: 'Large brain metastases (>3cm), lesions abutting critical structures, post-op cavities',

    eligibility: [
      'Brain metastases',
      'Large lesions (>3cm)',
      'Lesions abutting brainstem or optic apparatus',
      'Post-operative cavity',
    ],

    staging: 'N/A',

    targetVolumes: [
      { name: 'GTV', definition: 'Enhancing tumor or cavity on MRI' },
      { name: 'CTV', definition: 'GTV + 0-2mm' },
      { name: 'PTV', definition: 'CTV + 2mm' },
    ],

    margins: [
      { from: 'GTV', to: 'PTV', margin: '2mm', notes: 'Frameless setup' },
    ],

    allConstraints: [
      { organ: 'Brainstem', metric: 'Dmax', constraint: '<31 Gy', endpoint: 'Necrosis' },
      { organ: 'Brainstem', metric: 'D0.5cc', constraint: '<28 Gy', endpoint: 'Necrosis' },
      { organ: 'Optic Chiasm', metric: 'Dmax', constraint: '<25 Gy', endpoint: 'Optic neuropathy' },
      { organ: 'Optic Nerves', metric: 'Dmax', constraint: '<25 Gy', endpoint: 'Optic neuropathy' },
      { organ: 'Cochlea', metric: 'Mean', constraint: '<25 Gy', endpoint: 'Hearing loss' },
      { organ: 'Brain-GTV', metric: 'V28', constraint: 'Minimize', endpoint: 'Radionecrosis' },
    ],

    imageGuidance: 'MRI-based planning. Daily image guidance.',
    treatmentDelivery: 'Frameless immobilization. Treat daily or every other day.',

    publications: [
      {
        title: 'Five-fraction stereotactic radiotherapy for brain metastases',
        authors: 'Minniti G et al.',
        journal: 'Radiother Oncol',
        year: 2016,
        pmid: '27267049',
        doi: '10.1016/j.radonc.2016.06.001',
      },
    ],

    yearPublished: 2016,
    lastUpdated: '2025-01',
    tags: ['SRT', 'Brain', 'Metastases', '5 fraction', 'Large lesions'],
  },

  {
    id: 'postop-srs',
    name: 'Post-Operative Cavity SRS',
    shortName: 'Post-op SRS',
    source: 'Consensus',
    category: 'brain',
    subcategory: 'Post-operative',
    icon: '🧠',

    prescriptions: [
      {
        dose: 18,
        fractions: 1,
        dosePerFraction: 18,
        description: 'Cavity ≤2.5cm',
        isPreferred: true,
        BED10: calculateBED(18, 1, 10),
      },
      {
        dose: 15,
        fractions: 1,
        dosePerFraction: 15,
        description: 'Cavity 2.5-3.5cm',
        isPreferred: false,
        BED10: calculateBED(15, 1, 10),
      },
      {
        dose: 27,
        fractions: 3,
        dosePerFraction: 9,
        description: 'Larger cavities (SRT)',
        isPreferred: false,
        BED10: calculateBED(27, 3, 10),
      },
    ],

    keyConstraints: [
      { organ: 'Brainstem', constraint: '1fx: <15 Gy / 3fx: <23 Gy', priority: 'critical' },
      { organ: 'Optic Chiasm', constraint: '1fx: <8 Gy / 3fx: <17 Gy', priority: 'critical' },
      { organ: 'Brain-GTV', constraint: 'V12 < 10cc (1fx)', priority: 'major' },
    ],

    techniques: ['SRS', 'SRT', 'VMAT', 'GammaKnife'],

    indication: 'Post-operative resection cavity for brain metastases (instead of WBRT)',

    eligibility: [
      'Complete or near-complete resection of brain metastasis',
      'Single metastasis or limited (1-3) additional lesions',
      'KPS ≥70',
      'No leptomeningeal disease',
    ],

    staging: 'N/A',

    targetVolumes: [
      { name: 'Cavity', definition: 'Surgical cavity on post-op MRI' },
      { name: 'GTV', definition: 'Cavity + any residual enhancement' },
      { name: 'CTV', definition: 'GTV + 1-2mm to cover dural surface' },
      { name: 'PTV', definition: 'CTV + 1-2mm' },
    ],

    margins: [
      { from: 'GTV', to: 'CTV', margin: '1-2mm', notes: 'Expand along dural surface of contact' },
      { from: 'CTV', to: 'PTV', margin: '1-2mm', notes: 'Setup uncertainty' },
    ],

    allConstraints: [
      { organ: 'Brainstem', metric: 'Dmax', constraint: '1fx: <15 Gy / 3fx: <23 Gy', endpoint: 'Necrosis' },
      { organ: 'Optic Apparatus', metric: 'Dmax', constraint: '1fx: <8 Gy / 3fx: <17 Gy', endpoint: 'Optic neuropathy' },
      { organ: 'Brain-GTV', metric: 'V12', constraint: '<10cc (1fx)', endpoint: 'Radionecrosis' },
      { organ: 'Brain-GTV', metric: 'V18', constraint: '<30cc (3fx)', endpoint: 'Radionecrosis' },
      { organ: 'Cochlea', metric: 'Mean', constraint: '1fx: <4 Gy / 3fx: <15 Gy', endpoint: 'Hearing loss' },
    ],

    imageGuidance: 'Post-op MRI within 24-72 hours preferred for cavity delineation.',
    treatmentDelivery: 'Typically treat 2-4 weeks post-surgery to allow healing.',

    publications: [
      {
        title: 'Postoperative stereotactic radiosurgery vs WBRT for resected brain metastases',
        authors: 'Mahajan A et al.',
        journal: 'Lancet Oncol',
        year: 2017,
        pmid: '29033172',
        doi: '10.1016/S1470-2045(17)30441-2',
      },
      {
        title: 'Alliance A071801: SRS vs observation after surgical resection',
        authors: 'Brown PD et al.',
        journal: 'J Clin Oncol',
        year: 2024,
        pmid: '38039474',
        doi: '10.1200/JCO.23.01072',
      },
    ],

    yearPublished: 2017,
    lastUpdated: '2025-01',
    tags: ['SRS', 'SRT', 'Brain', 'Post-operative', 'Cavity'],
  },
];
