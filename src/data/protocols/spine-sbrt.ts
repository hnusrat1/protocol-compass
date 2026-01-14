import { Protocol, calculateBED } from '../types';

export const SPINE_SBRT_PROTOCOLS: Protocol[] = [
  {
    id: 'rtog-0631',
    name: 'Spine Metastases SBRT - Single Fraction',
    shortName: 'RTOG 0631',
    source: 'RTOG',
    category: 'spine',
    subcategory: 'Single Fraction',
    icon: '🦴',

    prescriptions: [
      {
        dose: 16,
        fractions: 1,
        dosePerFraction: 16,
        description: 'Standard single fraction',
        isPreferred: true,
        BED10: calculateBED(16, 1, 10),
      },
      {
        dose: 18,
        fractions: 1,
        dosePerFraction: 18,
        description: 'Escalated dose',
        isPreferred: false,
        BED10: calculateBED(18, 1, 10),
      },
    ],

    keyConstraints: [
      { organ: 'Spinal Cord', constraint: 'Dmax < 14 Gy (10 Gy to cord)', priority: 'critical' },
      { organ: 'Cauda Equina', constraint: 'Dmax < 16 Gy', priority: 'critical' },
      { organ: 'Esophagus', constraint: 'Dmax < 14.5 Gy', priority: 'major' },
      { organ: 'Skin', constraint: 'Dmax < 22 Gy', priority: 'minor' },
    ],

    techniques: ['SBRT', 'VMAT', 'CyberKnife'],

    indication: 'Spine metastases causing pain, single fraction treatment for pain palliation and local control',

    eligibility: [
      'Histologically confirmed malignancy with spine metastases',
      '1-3 contiguous vertebral levels',
      'KPS ≥40',
      'No cord compression requiring urgent surgery',
      'Tumor ≤3cm from spinal cord',
      'Life expectancy ≥3 months',
    ],

    staging: 'Metastatic spine disease',

    targetVolumes: [
      { name: 'GTV', definition: 'Gross tumor in vertebral body on MRI T1+Gd or CT' },
      { name: 'CTV', definition: 'GTV + entire involved vertebral body', margin: 'Include pedicles if involved' },
      { name: 'PTV', definition: 'CTV + 2-3mm', margin: '2mm for IGRT systems, 3mm otherwise' },
    ],

    margins: [
      { from: 'GTV', to: 'CTV', margin: 'Entire vertebral body', notes: 'Anatomic expansion to include bony anatomy' },
      { from: 'CTV', to: 'PTV', margin: '2-3mm', notes: 'Based on IGRT capability' },
    ],

    allConstraints: [
      { organ: 'Spinal Cord', metric: 'Dmax', constraint: '<14 Gy', endpoint: 'Myelopathy', source: 'RTOG 0631' },
      { organ: 'Spinal Cord', metric: 'D0.35cc', constraint: '<10 Gy', endpoint: 'Myelopathy' },
      { organ: 'Cauda Equina', metric: 'Dmax', constraint: '<16 Gy', endpoint: 'Nerve damage' },
      { organ: 'Cauda Equina', metric: 'D5cc', constraint: '<14 Gy', endpoint: 'Nerve damage' },
      { organ: 'Esophagus', metric: 'Dmax', constraint: '<14.5 Gy', endpoint: 'Stricture' },
      { organ: 'Esophagus', metric: 'D5cc', constraint: '<11.9 Gy', endpoint: 'Stricture' },
      { organ: 'Heart', metric: 'Dmax', constraint: '<22 Gy', endpoint: 'Pericarditis' },
      { organ: 'Great Vessels', metric: 'Dmax', constraint: '<37 Gy', endpoint: 'Rupture' },
      { organ: 'Trachea', metric: 'Dmax', constraint: '<14.5 Gy', endpoint: 'Stenosis' },
      { organ: 'Brachial Plexus', metric: 'Dmax', constraint: '<17.5 Gy', endpoint: 'Plexopathy' },
      { organ: 'Skin', metric: 'Dmax', constraint: '<22 Gy', endpoint: 'Ulceration' },
      { organ: 'Kidney', metric: 'V8.5', constraint: '<200cc (single)', endpoint: 'Renal dysfunction' },
    ],

    motionManagement: 'Spine board immobilization. Respiratory motion typically minimal for thoracic/lumbar.',
    imageGuidance: 'Daily CBCT mandatory. Match to bony anatomy. MRI fusion for cord delineation.',
    treatmentDelivery: 'Single fraction. VMAT or intensity-modulated delivery. 6-10 MV photons.',

    publications: [
      {
        title: 'RTOG 0631 Phase 2/3 Study of Image-Guided Radiosurgery for Localized Spine Metastasis',
        authors: 'Ryu S et al.',
        journal: 'J Clin Oncol',
        year: 2014,
        pmid: '24890347',
        doi: '10.1200/JCO.2013.54.0594',
      },
      {
        title: 'Stereotactic Radiosurgery vs Conventional Radiotherapy for Localized Vertebral Metastases: Phase 3 Results of NRG Oncology/RTOG 0631',
        authors: 'Ryu S et al.',
        journal: 'JAMA Oncol',
        year: 2023,
        pmid: '37079324',
        doi: '10.1001/jamaoncol.2023.0356',
      },
    ],

    yearPublished: 2006,
    lastUpdated: '2025-01',
    tags: ['SBRT', 'Spine', 'Single fraction', 'Metastases', 'Pain', 'RTOG'],
  },

  {
    id: 'spine-3fx',
    name: 'Spine SBRT - 24-27 Gy/3 fx',
    shortName: 'Spine 3fx',
    source: 'Consensus',
    category: 'spine',
    subcategory: 'Hypofractionated',
    icon: '🦴',

    prescriptions: [
      {
        dose: 27,
        fractions: 3,
        dosePerFraction: 9,
        description: 'Standard 3-fraction (MD Anderson)',
        isPreferred: true,
        BED10: calculateBED(27, 3, 10),
      },
      {
        dose: 24,
        fractions: 3,
        dosePerFraction: 8,
        description: 'ISRS consensus lower dose',
        isPreferred: false,
        BED10: calculateBED(24, 3, 10),
      },
    ],

    keyConstraints: [
      { organ: 'Spinal Cord', constraint: 'Dmax < 21.9 Gy (D0.35cc < 18 Gy)', priority: 'critical' },
      { organ: 'Cauda Equina', constraint: 'Dmax < 25.6 Gy', priority: 'critical' },
      { organ: 'Esophagus', constraint: 'Dmax < 25.2 Gy', priority: 'major' },
      { organ: 'Sacral Plexus', constraint: 'Dmax < 25.6 Gy', priority: 'major' },
    ],

    techniques: ['SBRT', 'VMAT', 'CyberKnife'],

    indication: 'Spine metastases, 3-fraction hypofractionated SBRT for local control and pain relief',

    eligibility: [
      'Spine metastases from solid tumor',
      '1-3 contiguous vertebral levels',
      'No high-grade epidural compression (Bilsky grade 2-3)',
      'KPS ≥50',
      'Life expectancy ≥3 months',
    ],

    staging: 'Metastatic disease',

    targetVolumes: [
      { name: 'GTV', definition: 'Gross tumor on MRI (T1+Gd, T2, STIR)' },
      { name: 'CTV', definition: 'GTV + involved vertebral segment', margin: 'Include entire vertebral body or involved portion' },
      { name: 'PTV', definition: 'CTV + 2mm' },
    ],

    margins: [
      { from: 'GTV', to: 'CTV', margin: 'Vertebral body anatomy', notes: 'Per ISRS consensus guidelines' },
      { from: 'CTV', to: 'PTV', margin: '2mm', notes: 'IGRT with daily imaging' },
    ],

    allConstraints: [
      { organ: 'Spinal Cord', metric: 'Dmax', constraint: '<21.9 Gy', endpoint: 'Myelopathy', source: 'TG-101' },
      { organ: 'Spinal Cord', metric: 'D0.35cc', constraint: '<18 Gy', endpoint: 'Myelopathy' },
      { organ: 'Spinal Cord', metric: 'D1.2cc', constraint: '<12.3 Gy', endpoint: 'Myelopathy' },
      { organ: 'Cauda Equina', metric: 'Dmax', constraint: '<25.6 Gy', endpoint: 'Neuropathy' },
      { organ: 'Cauda Equina', metric: 'D5cc', constraint: '<24 Gy', endpoint: 'Neuropathy' },
      { organ: 'Sacral Plexus', metric: 'Dmax', constraint: '<25.6 Gy', endpoint: 'Plexopathy' },
      { organ: 'Esophagus', metric: 'Dmax', constraint: '<25.2 Gy', endpoint: 'Stricture/fistula' },
      { organ: 'Esophagus', metric: 'D5cc', constraint: '<17.7 Gy', endpoint: 'Stricture' },
      { organ: 'Stomach', metric: 'Dmax', constraint: '<22.2 Gy', endpoint: 'Ulceration' },
      { organ: 'Small Bowel', metric: 'Dmax', constraint: '<25.2 Gy', endpoint: 'Perforation' },
      { organ: 'Kidney', metric: 'D200cc', constraint: '<16 Gy', endpoint: 'Renal failure' },
    ],

    motionManagement: 'Rigid immobilization. Consider breath-hold for thoracic lesions near diaphragm.',
    imageGuidance: 'Daily CBCT with 6DOF couch correction. MRI-CT fusion for planning.',
    treatmentDelivery: 'VMAT preferred. Treat every other day or 3 consecutive days.',

    publications: [
      {
        title: 'Stereotactic body radiation therapy for spinal metastases: systematic review',
        authors: 'Guckenberger M et al.',
        journal: 'J Neurosurg Spine',
        year: 2014,
        pmid: '25319530',
        doi: '10.3171/2013.12.SPINE13586',
      },
      {
        title: 'International Spine Radiosurgery Consortium consensus guidelines for target volume definition',
        authors: 'Cox BW et al.',
        journal: 'Int J Radiat Oncol Biol Phys',
        year: 2012,
        pmid: '22608954',
        doi: '10.1016/j.ijrobp.2012.03.009',
      },
    ],

    yearPublished: 2012,
    lastUpdated: '2025-01',
    tags: ['SBRT', 'Spine', '3 fraction', 'Metastases', 'ISRS'],
  },

  {
    id: 'spine-5fx',
    name: 'Spine SBRT - 30 Gy/5 fx',
    shortName: 'Spine 5fx',
    source: 'Institutional',
    category: 'spine',
    subcategory: 'Hypofractionated',
    icon: '🦴',

    prescriptions: [
      {
        dose: 30,
        fractions: 5,
        dosePerFraction: 6,
        description: 'Standard 5-fraction spine SBRT',
        isPreferred: true,
        BED10: calculateBED(30, 5, 10),
      },
      {
        dose: 35,
        fractions: 5,
        dosePerFraction: 7,
        description: 'Escalated 5-fraction',
        isPreferred: false,
        BED10: calculateBED(35, 5, 10),
      },
    ],

    keyConstraints: [
      { organ: 'Spinal Cord', constraint: 'Dmax < 30 Gy (D0.35cc < 25 Gy)', priority: 'critical' },
      { organ: 'Cauda Equina', constraint: 'Dmax < 32 Gy', priority: 'critical' },
      { organ: 'Esophagus', constraint: 'Dmax < 30 Gy', priority: 'major' },
    ],

    techniques: ['SBRT', 'VMAT'],

    indication: 'Spine metastases, 5-fraction SBRT for larger tumors or when closer to cord',

    eligibility: [
      'Spine metastases',
      'Larger tumor volumes',
      'Epidural disease close to cord',
      'Post-operative spine SBRT',
      'Re-irradiation cases',
    ],

    staging: 'Metastatic disease',

    targetVolumes: [
      { name: 'GTV', definition: 'Gross tumor on MRI' },
      { name: 'CTV', definition: 'GTV + involved vertebral segment' },
      { name: 'PTV', definition: 'CTV + 2mm' },
    ],

    margins: [
      { from: 'GTV', to: 'CTV', margin: 'Anatomic expansion' },
      { from: 'CTV', to: 'PTV', margin: '2mm' },
    ],

    allConstraints: [
      { organ: 'Spinal Cord', metric: 'Dmax', constraint: '<30 Gy', endpoint: 'Myelopathy', source: 'TG-101' },
      { organ: 'Spinal Cord', metric: 'D0.35cc', constraint: '<25.3 Gy', endpoint: 'Myelopathy' },
      { organ: 'Spinal Cord', metric: 'D1.2cc', constraint: '<14.5 Gy', endpoint: 'Myelopathy' },
      { organ: 'Cauda Equina', metric: 'Dmax', constraint: '<32 Gy', endpoint: 'Neuropathy' },
      { organ: 'Esophagus', metric: 'Dmax', constraint: '<30 Gy', endpoint: 'Stricture' },
      { organ: 'Esophagus', metric: 'D5cc', constraint: '<19.5 Gy', endpoint: 'Stricture' },
      { organ: 'Stomach', metric: 'Dmax', constraint: '<32 Gy', endpoint: 'Ulceration' },
      { organ: 'Kidney', metric: 'D200cc', constraint: '<17.5 Gy', endpoint: 'Renal failure' },
    ],

    motionManagement: 'Rigid immobilization',
    imageGuidance: 'Daily CBCT',
    treatmentDelivery: 'Daily or every other day for 5 fractions',

    publications: [
      {
        title: 'Probabilities of radiation myelopathy specific to stereotactic body radiation therapy to guide safe practice',
        authors: 'Sahgal A et al.',
        journal: 'Int J Radiat Oncol Biol Phys',
        year: 2013,
        pmid: '22713832',
        doi: '10.1016/j.ijrobp.2012.05.007',
      },
    ],

    yearPublished: 2013,
    lastUpdated: '2025-01',
    tags: ['SBRT', 'Spine', '5 fraction', 'Metastases', 'Large tumors', 'Post-op'],
  },

  {
    id: 'spine-reirrad',
    name: 'Spine Re-irradiation SBRT',
    shortName: 'Spine Re-RT',
    source: 'Consensus',
    category: 'spine',
    subcategory: 'Re-irradiation',
    icon: '🦴',

    prescriptions: [
      {
        dose: 24,
        fractions: 2,
        dosePerFraction: 12,
        description: '2-fraction re-irradiation',
        isPreferred: false,
        BED10: calculateBED(24, 2, 10),
      },
      {
        dose: 20,
        fractions: 5,
        dosePerFraction: 4,
        description: 'Conservative 5-fraction',
        isPreferred: true,
        BED10: calculateBED(20, 5, 10),
      },
      {
        dose: 25,
        fractions: 5,
        dosePerFraction: 5,
        description: 'Moderate 5-fraction re-RT',
        isPreferred: false,
        BED10: calculateBED(25, 5, 10),
      },
    ],

    keyConstraints: [
      { organ: 'Spinal Cord', constraint: 'Cumulative Dmax depends on interval and prior dose', priority: 'critical' },
      { organ: 'Spinal Cord', constraint: '5fx: Dmax < 22 Gy (if prior 40 Gy, >6mo)', priority: 'critical' },
      { organ: 'Cauda Equina', constraint: 'Similar sparing to cord', priority: 'critical' },
    ],

    techniques: ['SBRT', 'VMAT'],

    indication: 'Previously irradiated spine with recurrent or progressive disease',

    eligibility: [
      'Prior conventional RT or SBRT to spine',
      'Minimum 6 months since prior RT (ideally >12 months)',
      'Local recurrence or progression',
      'No myelopathy from prior treatment',
      'KPS ≥50',
    ],

    staging: 'Recurrent metastatic disease',

    targetVolumes: [
      { name: 'GTV', definition: 'Recurrent/progressive tumor on MRI' },
      { name: 'CTV', definition: 'GTV with minimal margin to spare cord' },
      { name: 'PTV', definition: 'CTV + 1-2mm' },
    ],

    margins: [
      { from: 'GTV', to: 'CTV', margin: 'Minimal', notes: 'Prioritize cord sparing' },
      { from: 'CTV', to: 'PTV', margin: '1-2mm', notes: 'Tight margin for re-RT' },
    ],

    allConstraints: [
      { organ: 'Spinal Cord', metric: 'Cumulative BED', constraint: 'Calculate based on prior dose', endpoint: 'Myelopathy', source: 'Sahgal guidance' },
      { organ: 'Spinal Cord', metric: 'Dmax (5fx re-RT)', constraint: '<20-25 Gy', endpoint: 'Myelopathy', source: 'Depends on prior dose' },
      { organ: 'Spinal Cord', metric: 'D0.35cc (5fx)', constraint: '<15-18 Gy', endpoint: 'Myelopathy' },
    ],

    motionManagement: 'Rigid immobilization essential',
    imageGuidance: 'Daily CBCT mandatory. 6DOF couch highly recommended.',
    treatmentDelivery: 'VMAT with steep dose gradients. Consider every-other-day treatment.',

    publications: [
      {
        title: 'Reirradiation human spinal cord tolerance for stereotactic body radiotherapy',
        authors: 'Sahgal A et al.',
        journal: 'Int J Radiat Oncol Biol Phys',
        year: 2012,
        pmid: '20951503',
        doi: '10.1016/j.ijrobp.2010.08.021',
      },
      {
        title: 'Spinal cord tolerance for stereotactic body radiotherapy',
        authors: 'Sahgal A et al.',
        journal: 'Int J Radiat Oncol Biol Phys',
        year: 2010,
        pmid: '19765914',
        doi: '10.1016/j.ijrobp.2009.05.023',
      },
    ],

    yearPublished: 2012,
    lastUpdated: '2025-01',
    tags: ['SBRT', 'Spine', 'Re-irradiation', 'Salvage', 'Recurrence'],
  },
];
