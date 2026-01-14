import { Protocol, calculateBED } from '../types';

export const LIVER_SBRT_PROTOCOLS: Protocol[] = [
  {
    id: 'liver-mets-3fx',
    name: 'Liver Metastases SBRT - 54 Gy/3 fx',
    shortName: 'Liver Mets 3fx',
    source: 'Consensus',
    category: 'liver',
    subcategory: 'Metastases',
    icon: '🫀',

    prescriptions: [
      {
        dose: 54,
        fractions: 3,
        dosePerFraction: 18,
        description: 'Standard 3-fraction for small mets (<3cm)',
        isPreferred: true,
        BED10: calculateBED(54, 3, 10),
      },
      {
        dose: 45,
        fractions: 3,
        dosePerFraction: 15,
        description: 'Reduced dose for larger/central lesions',
        isPreferred: false,
        BED10: calculateBED(45, 3, 10),
      },
    ],

    keyConstraints: [
      { organ: 'Liver (normal)', constraint: '≥700cc receives <15 Gy', priority: 'critical' },
      { organ: 'Stomach', constraint: 'Dmax < 30 Gy', priority: 'critical' },
      { organ: 'Duodenum', constraint: 'Dmax < 30 Gy', priority: 'critical' },
      { organ: 'Bowel', constraint: 'Dmax < 30 Gy, V24 < 20cc', priority: 'critical' },
      { organ: 'Spinal Cord', constraint: 'Dmax < 18 Gy', priority: 'critical' },
    ],

    techniques: ['SBRT', 'VMAT', 'CyberKnife'],

    indication: 'Liver metastases from colorectal or other solid tumors, oligometastatic disease',

    eligibility: [
      'Liver metastases from solid tumor',
      '1-3 lesions preferred (up to 5)',
      'Individual lesion <6cm',
      'Adequate liver function (Child-Pugh A preferred)',
      'No cirrhosis or well-compensated cirrhosis',
      'Life expectancy ≥6 months',
    ],

    staging: 'Oligometastatic disease',

    targetVolumes: [
      { name: 'GTV', definition: 'Gross tumor on contrast CT/MRI (arterial + portal venous phase)' },
      { name: 'ITV', definition: 'GTV union on 4DCT or breath-hold imaging' },
      { name: 'PTV', definition: 'ITV + 5mm (3mm with tracking)' },
    ],

    margins: [
      { from: 'GTV', to: 'ITV', margin: 'Motion envelope', notes: '4DCT or breath-hold' },
      { from: 'ITV', to: 'PTV', margin: '5mm (3mm with tracking)', notes: 'Reduced with gating/tracking' },
    ],

    allConstraints: [
      { organ: 'Liver (normal)', metric: 'Critical Volume', constraint: '≥700cc <15 Gy', endpoint: 'RILD', source: 'AAPM TG-101' },
      { organ: 'Liver (normal)', metric: 'Mean', constraint: '<15 Gy', endpoint: 'RILD' },
      { organ: 'Stomach', metric: 'Dmax', constraint: '<30 Gy', endpoint: 'Ulceration/perforation' },
      { organ: 'Stomach', metric: 'V21', constraint: '<10cc', endpoint: 'Ulceration' },
      { organ: 'Duodenum', metric: 'Dmax', constraint: '<30 Gy', endpoint: 'Ulceration/perforation' },
      { organ: 'Duodenum', metric: 'V18', constraint: '<10cc', endpoint: 'Ulceration' },
      { organ: 'Small Bowel', metric: 'Dmax', constraint: '<30 Gy', endpoint: 'Perforation' },
      { organ: 'Small Bowel', metric: 'V24', constraint: '<20cc', endpoint: 'Obstruction' },
      { organ: 'Large Bowel', metric: 'Dmax', constraint: '<30 Gy', endpoint: 'Perforation' },
      { organ: 'Kidney (each)', metric: 'V15', constraint: '<35%', endpoint: 'Renal dysfunction' },
      { organ: 'Spinal Cord', metric: 'Dmax', constraint: '<18 Gy', endpoint: 'Myelopathy' },
      { organ: 'Heart', metric: 'Dmax', constraint: '<30 Gy', endpoint: 'Pericarditis' },
      { organ: 'Chest Wall', metric: 'V30', constraint: '<30cc', endpoint: 'Pain/fracture' },
    ],

    motionManagement: '4DCT required. Breath-hold, gating, or tracking strongly preferred.',
    imageGuidance: 'Daily CBCT. Match to liver vasculature or fiducials.',
    treatmentDelivery: 'Non-coplanar beams or VMAT. Treat every other day.',

    publications: [
      {
        title: 'Stereotactic body radiation therapy for colorectal liver metastases',
        authors: 'Rusthoven KE et al.',
        journal: 'Cancer',
        year: 2009,
        pmid: '19479440',
        doi: '10.1002/cncr.24379',
      },
      {
        title: 'Multi-institutional phase I/II trial of stereotactic body radiation therapy for liver metastases',
        authors: 'Lee MT et al.',
        journal: 'J Clin Oncol',
        year: 2009,
        pmid: '19380449',
        doi: '10.1200/JCO.2008.19.6329',
      },
    ],

    yearPublished: 2009,
    lastUpdated: '2025-01',
    tags: ['SBRT', 'Liver', 'Metastases', '3 fraction', 'Colorectal', 'Oligomet'],
  },

  {
    id: 'liver-mets-5fx',
    name: 'Liver Metastases SBRT - 50 Gy/5 fx',
    shortName: 'Liver Mets 5fx',
    source: 'Consensus',
    category: 'liver',
    subcategory: 'Metastases',
    icon: '🫀',

    prescriptions: [
      {
        dose: 50,
        fractions: 5,
        dosePerFraction: 10,
        description: 'Standard 5-fraction liver mets',
        isPreferred: true,
        BED10: calculateBED(50, 5, 10),
      },
      {
        dose: 60,
        fractions: 5,
        dosePerFraction: 12,
        description: 'Dose-escalated (peripheral lesions)',
        isPreferred: false,
        BED10: calculateBED(60, 5, 10),
      },
    ],

    keyConstraints: [
      { organ: 'Liver (normal)', constraint: '≥700cc receives <21 Gy', priority: 'critical' },
      { organ: 'Stomach', constraint: 'Dmax < 35 Gy', priority: 'critical' },
      { organ: 'Duodenum', constraint: 'Dmax < 35 Gy', priority: 'critical' },
      { organ: 'Spinal Cord', constraint: 'Dmax < 30 Gy', priority: 'critical' },
    ],

    techniques: ['SBRT', 'VMAT'],

    indication: 'Liver metastases, 5-fraction regimen for larger or centrally located lesions',

    eligibility: [
      'Liver metastases',
      'Larger lesions (3-6cm)',
      'Central location near critical structures',
      'Adequate liver function',
    ],

    staging: 'Oligometastatic disease',

    targetVolumes: [
      { name: 'GTV', definition: 'Tumor on contrast imaging' },
      { name: 'ITV', definition: 'Motion-encompassing volume' },
      { name: 'PTV', definition: 'ITV + 5mm' },
    ],

    margins: [
      { from: 'ITV', to: 'PTV', margin: '5mm', notes: 'Uniform expansion' },
    ],

    allConstraints: [
      { organ: 'Liver (normal)', metric: 'Critical Volume', constraint: '≥700cc <21 Gy', endpoint: 'RILD' },
      { organ: 'Liver (normal)', metric: 'Mean', constraint: '<18 Gy', endpoint: 'RILD' },
      { organ: 'Stomach', metric: 'Dmax', constraint: '<35 Gy', endpoint: 'Ulceration' },
      { organ: 'Stomach', metric: 'V32', constraint: '<5cc', endpoint: 'Ulceration' },
      { organ: 'Duodenum', metric: 'Dmax', constraint: '<35 Gy', endpoint: 'Ulceration' },
      { organ: 'Small Bowel', metric: 'Dmax', constraint: '<35 Gy', endpoint: 'Perforation' },
      { organ: 'Small Bowel', metric: 'V30', constraint: '<10cc', endpoint: 'Obstruction' },
      { organ: 'Large Bowel', metric: 'Dmax', constraint: '<35 Gy', endpoint: 'Perforation' },
      { organ: 'Kidney', metric: 'V17.5', constraint: '<35%', endpoint: 'Renal dysfunction' },
      { organ: 'Spinal Cord', metric: 'Dmax', constraint: '<30 Gy', endpoint: 'Myelopathy' },
    ],

    motionManagement: '4DCT, breath-hold, or abdominal compression',
    imageGuidance: 'Daily CBCT',
    treatmentDelivery: 'Daily or every other day',

    publications: [
      {
        title: 'Phase I study of stereotactic body radiotherapy for hepatocellular carcinoma and liver metastases',
        authors: 'Tse RV et al.',
        journal: 'Clin Cancer Res',
        year: 2008,
        pmid: '18483364',
        doi: '10.1158/1078-0432.CCR-07-1460',
      },
    ],

    yearPublished: 2008,
    lastUpdated: '2025-01',
    tags: ['SBRT', 'Liver', 'Metastases', '5 fraction', 'Central', 'Large tumors'],
  },

  {
    id: 'hcc-child-pugh-a',
    name: 'HCC SBRT - Child-Pugh A',
    shortName: 'HCC CP-A',
    source: 'Consensus',
    category: 'liver',
    subcategory: 'HCC',
    icon: '🫀',

    prescriptions: [
      {
        dose: 50,
        fractions: 5,
        dosePerFraction: 10,
        description: 'Standard HCC, CP-A',
        isPreferred: true,
        BED10: calculateBED(50, 5, 10),
      },
      {
        dose: 40,
        fractions: 5,
        dosePerFraction: 8,
        description: 'Reduced dose for larger/central HCC',
        isPreferred: false,
        BED10: calculateBED(40, 5, 10),
      },
    ],

    keyConstraints: [
      { organ: 'Liver (normal)', constraint: 'Mean <18 Gy, 800cc <15 Gy', priority: 'critical' },
      { organ: 'Stomach', constraint: 'Dmax < 35 Gy', priority: 'critical' },
      { organ: 'Bowel', constraint: 'Dmax < 35 Gy', priority: 'critical' },
    ],

    techniques: ['SBRT', 'VMAT'],

    indication: 'Hepatocellular carcinoma in Child-Pugh A cirrhosis, not surgical/ablation candidate',

    eligibility: [
      'Hepatocellular carcinoma (HCC)',
      'Child-Pugh A (score 5-6)',
      'Not candidate for resection, transplant, or ablation',
      'Tumor ≤10cm total (multiple lesions)',
      'No vascular invasion into main portal vein',
      'ECOG 0-2',
    ],

    staging: 'HCC BCLC Stage A-B',

    targetVolumes: [
      { name: 'GTV', definition: 'Arterial-enhancing tumor on multiphasic CT/MRI' },
      { name: 'ITV', definition: 'GTV + respiratory motion' },
      { name: 'PTV', definition: 'ITV + 5mm' },
    ],

    margins: [
      { from: 'GTV', to: 'ITV', margin: 'Motion envelope' },
      { from: 'ITV', to: 'PTV', margin: '5mm' },
    ],

    allConstraints: [
      { organ: 'Liver (normal)', metric: 'Mean', constraint: '<18 Gy', endpoint: 'RILD/CP decline', source: 'Consensus' },
      { organ: 'Liver (normal)', metric: 'V15 (liver-GTV)', constraint: '>800cc', endpoint: 'RILD' },
      { organ: 'Stomach', metric: 'Dmax', constraint: '<35 Gy', endpoint: 'Ulceration' },
      { organ: 'Duodenum', metric: 'Dmax', constraint: '<35 Gy', endpoint: 'Ulceration' },
      { organ: 'Small Bowel', metric: 'Dmax', constraint: '<35 Gy', endpoint: 'Perforation' },
      { organ: 'Esophagus', metric: 'Dmax', constraint: '<35 Gy', endpoint: 'Stricture' },
      { organ: 'Kidney', metric: 'Mean', constraint: '<10 Gy', endpoint: 'Renal failure' },
      { organ: 'Spinal Cord', metric: 'Dmax', constraint: '<30 Gy', endpoint: 'Myelopathy' },
    ],

    motionManagement: '4DCT mandatory. Breath-hold or gating preferred for tumors near diaphragm.',
    imageGuidance: 'Daily CBCT. Consider fiducials for smaller lesions.',
    treatmentDelivery: 'VMAT or multiple non-coplanar beams. Daily or every other day.',

    publications: [
      {
        title: 'Stereotactic body radiation therapy for hepatocellular carcinoma: NRG Oncology consensus guidelines',
        authors: 'Benson AB et al.',
        journal: 'Int J Radiat Oncol Biol Phys',
        year: 2020,
        pmid: '32580014',
        doi: '10.1016/j.ijrobp.2020.05.019',
      },
      {
        title: 'RTOG 1112: Sorafenib +/- SBRT for HCC',
        authors: 'Dawson LA et al.',
        journal: 'NRG Oncology',
        year: 2013,
        doi: '10.1016/j.radonc.2016.07.007',
      },
    ],

    yearPublished: 2016,
    lastUpdated: '2025-01',
    tags: ['SBRT', 'Liver', 'HCC', '5 fraction', 'Child-Pugh A', 'Cirrhosis'],
  },

  {
    id: 'hcc-child-pugh-b',
    name: 'HCC SBRT - Child-Pugh B',
    shortName: 'HCC CP-B',
    source: 'Consensus',
    category: 'liver',
    subcategory: 'HCC',
    icon: '🫀',

    prescriptions: [
      {
        dose: 40,
        fractions: 5,
        dosePerFraction: 8,
        description: 'Conservative dose for CP-B',
        isPreferred: true,
        BED10: calculateBED(40, 5, 10),
      },
      {
        dose: 30,
        fractions: 5,
        dosePerFraction: 6,
        description: 'Very conservative (CP-B7-8)',
        isPreferred: false,
        BED10: calculateBED(30, 5, 10),
      },
    ],

    keyConstraints: [
      { organ: 'Liver (normal)', constraint: 'Mean <13 Gy, 800cc <12 Gy', priority: 'critical' },
      { organ: 'Stomach', constraint: 'Dmax < 30 Gy', priority: 'critical' },
      { organ: 'Bowel', constraint: 'Dmax < 30 Gy', priority: 'critical' },
    ],

    techniques: ['SBRT', 'VMAT'],

    indication: 'HCC in Child-Pugh B cirrhosis - requires conservative liver constraints',

    eligibility: [
      'Hepatocellular carcinoma',
      'Child-Pugh B (score 7-9)',
      'Not candidate for other local therapies',
      'Single lesion preferred',
      'Lesion ≤5cm',
      'Adequate liver reserve (>1000cc functional liver)',
    ],

    staging: 'HCC BCLC B-C',

    targetVolumes: [
      { name: 'GTV', definition: 'Arterial-enhancing tumor' },
      { name: 'ITV', definition: 'GTV + motion' },
      { name: 'PTV', definition: 'ITV + 5mm' },
    ],

    margins: [
      { from: 'ITV', to: 'PTV', margin: '5mm' },
    ],

    allConstraints: [
      { organ: 'Liver (normal)', metric: 'Mean', constraint: '<13 Gy', endpoint: 'CP decline/RILD', source: 'Consensus - conservative' },
      { organ: 'Liver (normal)', metric: 'V12 (liver-GTV)', constraint: '>1000cc', endpoint: 'Hepatic failure' },
      { organ: 'Stomach', metric: 'Dmax', constraint: '<30 Gy', endpoint: 'Ulceration' },
      { organ: 'Duodenum', metric: 'Dmax', constraint: '<30 Gy', endpoint: 'Ulceration' },
      { organ: 'Small Bowel', metric: 'Dmax', constraint: '<30 Gy', endpoint: 'Perforation' },
      { organ: 'Kidney', metric: 'Mean', constraint: '<8 Gy', endpoint: 'Renal failure' },
      { organ: 'Spinal Cord', metric: 'Dmax', constraint: '<25 Gy', endpoint: 'Myelopathy' },
    ],

    motionManagement: '4DCT. Respiratory management essential.',
    imageGuidance: 'Daily CBCT',
    treatmentDelivery: 'VMAT. May require longer course (every other day) for liver recovery.',

    publications: [
      {
        title: 'Stereotactic body radiotherapy for hepatocellular carcinoma in Child-Pugh B patients',
        authors: 'Sapisochin G et al.',
        journal: 'J Hepatol',
        year: 2017,
        pmid: '28126465',
        doi: '10.1016/j.jhep.2017.01.008',
      },
      {
        title: 'NRG/RTOG HCC SBRT guidelines: Liver function-based approach',
        authors: 'Murray LJ et al.',
        journal: 'Radiother Oncol',
        year: 2020,
        pmid: '32540226',
        doi: '10.1016/j.radonc.2020.05.015',
      },
    ],

    yearPublished: 2017,
    lastUpdated: '2025-01',
    tags: ['SBRT', 'Liver', 'HCC', '5 fraction', 'Child-Pugh B', 'Conservative', 'Cirrhosis'],
  },
];
