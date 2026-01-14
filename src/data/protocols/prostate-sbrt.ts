import { Protocol, calculateBED } from '../types';

export const PROSTATE_SBRT_PROTOCOLS: Protocol[] = [
  {
    id: 'pace-b',
    name: 'PACE-B Trial - 36.25 Gy/5 fx',
    shortName: 'PACE-B',
    source: 'ASTRO',
    category: 'prostate',
    subcategory: 'Definitive',
    icon: '🎯',

    prescriptions: [
      {
        dose: 36.25,
        fractions: 5,
        dosePerFraction: 7.25,
        description: 'PACE-B protocol dose',
        isPreferred: true,
        BED10: calculateBED(36.25, 5, 10),
      },
    ],

    keyConstraints: [
      { organ: 'Rectum', constraint: 'V36 < 1cc, V29 < 20%', priority: 'critical' },
      { organ: 'Bladder', constraint: 'V37 < 5cc, V18 < 50%', priority: 'major' },
      { organ: 'Urethra', constraint: 'Dmax < 42 Gy', priority: 'critical' },
      { organ: 'Penile Bulb', constraint: 'Dmax < 29.5 Gy', priority: 'minor' },
      { organ: 'Femoral Heads', constraint: 'V14.5 < 5%', priority: 'minor' },
    ],

    techniques: ['SBRT', 'VMAT', 'CyberKnife'],

    indication: 'Localized prostate cancer, low to intermediate risk, definitive ultra-hypofractionated SBRT',

    eligibility: [
      'Low-risk: T1-T2a, Gleason ≤6, PSA <10',
      'Intermediate-risk: T2b-c, Gleason 7, or PSA 10-20',
      'No nodal or metastatic disease',
      'Prostate volume <100cc preferred',
      'IPSS ≤15',
      'No prior pelvic RT',
    ],

    staging: 'cT1-T2c N0 M0',

    targetVolumes: [
      { name: 'CTV', definition: 'Prostate ± proximal seminal vesicles (intermediate risk)' },
      { name: 'PTV', definition: 'CTV + 5mm (3mm posteriorly)' },
    ],

    margins: [
      { from: 'CTV', to: 'PTV', margin: '5mm (3mm posterior)', notes: 'Reduced posterior for rectal sparing' },
    ],

    allConstraints: [
      { organ: 'Rectum', metric: 'V36', constraint: '<1cc', endpoint: 'Proctitis', source: 'PACE protocol' },
      { organ: 'Rectum', metric: 'V29', constraint: '<20%', endpoint: 'Proctitis' },
      { organ: 'Rectum', metric: 'V18', constraint: '<50%', endpoint: 'Proctitis' },
      { organ: 'Bladder', metric: 'V37', constraint: '<5cc', endpoint: 'Cystitis' },
      { organ: 'Bladder', metric: 'V18', constraint: '<50%', endpoint: 'Cystitis' },
      { organ: 'Urethra', metric: 'Dmax', constraint: '<42 Gy (115%)', endpoint: 'Stricture' },
      { organ: 'Penile Bulb', metric: 'Dmax', constraint: '<29.5 Gy', endpoint: 'Erectile dysfunction' },
      { organ: 'Penile Bulb', metric: 'Mean', constraint: '<20 Gy', endpoint: 'Erectile dysfunction' },
      { organ: 'Femoral Heads', metric: 'V14.5', constraint: '<5%', endpoint: 'Necrosis' },
      { organ: 'Small Bowel', metric: 'V18', constraint: '<5cc', endpoint: 'Obstruction' },
    ],

    motionManagement: 'Daily fiducial-based or Calypso tracking. SpaceOAR hydrogel recommended.',
    imageGuidance: 'Daily CBCT or kV with fiducials. Intrafraction monitoring recommended.',
    treatmentDelivery: 'Every other day preferred. Complete within 14 days.',

    publications: [
      {
        title: 'Intensity-modulated fractionated radiotherapy versus stereotactic body radiotherapy for prostate cancer (PACE-B): acute toxicity findings',
        authors: 'Brand DH et al.',
        journal: 'Lancet Oncol',
        year: 2019,
        pmid: '31540791',
        doi: '10.1016/S1470-2045(19)30569-8',
      },
      {
        title: 'Intensity-modulated radiotherapy versus stereotactic body radiotherapy for prostate cancer (PACE-B): 2-year toxicity results',
        authors: 'Tree AC et al.',
        journal: 'Lancet Oncol',
        year: 2022,
        pmid: '36113498',
        doi: '10.1016/S1470-2045(22)00517-4',
      },
    ],

    yearPublished: 2019,
    lastUpdated: '2025-01',
    tags: ['SBRT', 'Prostate', '5 fraction', 'Definitive', 'Low-risk', 'Intermediate-risk', 'PACE'],
  },

  {
    id: 'hypo-rt-pc',
    name: 'HYPO-RT-PC Trial - 42.7 Gy/7 fx',
    shortName: 'HYPO-RT-PC',
    source: 'ESTRO',
    category: 'prostate',
    subcategory: 'Definitive',
    icon: '🎯',

    prescriptions: [
      {
        dose: 42.7,
        fractions: 7,
        dosePerFraction: 6.1,
        description: 'HYPO-RT-PC ultra-hypofractionation',
        isPreferred: true,
        BED10: calculateBED(42.7, 7, 10),
      },
    ],

    keyConstraints: [
      { organ: 'Rectum', constraint: 'V38 < 5%, V30 < 30%', priority: 'critical' },
      { organ: 'Bladder', constraint: 'V38 < 10%, V32 < 25%', priority: 'major' },
      { organ: 'Femoral Heads', constraint: 'V25 < 5%', priority: 'minor' },
    ],

    techniques: ['SBRT', 'VMAT'],

    indication: 'Intermediate-risk prostate cancer, 7-fraction ultra-hypofractionation',

    eligibility: [
      'Intermediate-risk prostate cancer',
      'T1b-T3a N0 M0',
      'PSA <20 ng/mL',
      'No prior RT to pelvis',
      'IPSS score <20',
    ],

    staging: 'T1b-T3a N0 M0',

    targetVolumes: [
      { name: 'CTV', definition: 'Prostate ± base of seminal vesicles' },
      { name: 'PTV', definition: 'CTV + 7mm (4mm posteriorly)' },
    ],

    margins: [
      { from: 'CTV', to: 'PTV', margin: '7mm (4mm posterior)', notes: 'Swedish trial margins' },
    ],

    allConstraints: [
      { organ: 'Rectum', metric: 'V38', constraint: '<5%', endpoint: 'Proctitis', source: 'HYPO-RT-PC' },
      { organ: 'Rectum', metric: 'V30', constraint: '<30%', endpoint: 'Proctitis' },
      { organ: 'Rectum', metric: 'Dmax', constraint: '<44 Gy (103%)', endpoint: 'Proctitis' },
      { organ: 'Bladder', metric: 'V38', constraint: '<10%', endpoint: 'Cystitis' },
      { organ: 'Bladder', metric: 'V32', constraint: '<25%', endpoint: 'Cystitis' },
      { organ: 'Femoral Heads', metric: 'V25', constraint: '<5%', endpoint: 'Necrosis' },
    ],

    motionManagement: 'Fiducial markers. Image guidance each fraction.',
    imageGuidance: 'Daily imaging with fiducial matching',
    treatmentDelivery: 'Every other day, 2.5 weeks total',

    publications: [
      {
        title: 'Ultra-hypofractionated versus conventionally fractionated radiotherapy for prostate cancer (HYPO-RT-PC)',
        authors: 'Widmark A et al.',
        journal: 'Lancet',
        year: 2019,
        pmid: '31227373',
        doi: '10.1016/S0140-6736(19)31131-6',
      },
    ],

    yearPublished: 2019,
    lastUpdated: '2025-01',
    tags: ['SBRT', 'Prostate', '7 fraction', 'Definitive', 'Intermediate-risk', 'Swedish'],
  },

  {
    id: 'prostate-5fx-40',
    name: 'Prostate SBRT - 40 Gy/5 fx',
    shortName: '40 Gy/5fx',
    source: 'Institutional',
    category: 'prostate',
    subcategory: 'Definitive',
    icon: '🎯',

    prescriptions: [
      {
        dose: 40,
        fractions: 5,
        dosePerFraction: 8,
        description: 'Higher dose 5-fraction',
        isPreferred: true,
        BED10: calculateBED(40, 5, 10),
      },
      {
        dose: 35,
        fractions: 5,
        dosePerFraction: 7,
        description: 'Standard 5-fraction',
        isPreferred: false,
        BED10: calculateBED(35, 5, 10),
      },
    ],

    keyConstraints: [
      { organ: 'Rectum', constraint: 'V40 < 1cc, V32 < 10%', priority: 'critical' },
      { organ: 'Bladder', constraint: 'V40 < 5cc, V20 < 50%', priority: 'major' },
      { organ: 'Urethra', constraint: 'Dmax ≤42 Gy', priority: 'critical' },
    ],

    techniques: ['SBRT', 'VMAT', 'CyberKnife'],

    indication: 'Localized prostate cancer, 5-fraction definitive SBRT (institutional protocols)',

    eligibility: [
      'Low to favorable intermediate risk',
      'Prostate volume <80-100cc',
      'Good urinary function (IPSS <15)',
      'No prior pelvic RT',
    ],

    staging: 'T1c-T2c N0 M0',

    targetVolumes: [
      { name: 'CTV', definition: 'Prostate ± proximal SV for intermediate risk' },
      { name: 'PTV', definition: 'CTV + 3-5mm', margin: '3mm posterior, 5mm elsewhere' },
    ],

    margins: [
      { from: 'CTV', to: 'PTV', margin: '3-5mm', notes: 'Depends on motion management' },
    ],

    allConstraints: [
      { organ: 'Rectum', metric: 'V40', constraint: '<1cc', endpoint: 'Proctitis' },
      { organ: 'Rectum', metric: 'V32', constraint: '<10%', endpoint: 'Proctitis' },
      { organ: 'Rectum', metric: 'V24', constraint: '<30%', endpoint: 'Proctitis' },
      { organ: 'Bladder', metric: 'V40', constraint: '<5cc', endpoint: 'Cystitis' },
      { organ: 'Bladder', metric: 'V20', constraint: '<50%', endpoint: 'Cystitis' },
      { organ: 'Urethra', metric: 'Dmax', constraint: '≤42 Gy (105%)', endpoint: 'Stricture' },
      { organ: 'Penile Bulb', metric: 'Mean', constraint: '<20 Gy', endpoint: 'ED' },
      { organ: 'Femoral Heads', metric: 'V20', constraint: '<5%', endpoint: 'Necrosis' },
    ],

    motionManagement: 'Fiducials + SpaceOAR highly recommended. Intrafraction tracking preferred.',
    imageGuidance: 'Daily CBCT with fiducial matching',
    treatmentDelivery: 'Every other day over 10-14 days',

    publications: [
      {
        title: 'Stereotactic body radiotherapy for low-risk prostate cancer: five-year outcomes',
        authors: 'Katz A et al.',
        journal: 'Radiat Oncol',
        year: 2013,
        pmid: '23452509',
        doi: '10.1186/1748-717X-8-43',
      },
      {
        title: 'Stereotactic body radiotherapy for localized prostate cancer: pooled analysis from a multi-institutional consortium',
        authors: 'King CR et al.',
        journal: 'Radiother Oncol',
        year: 2013,
        pmid: '24060175',
        doi: '10.1016/j.radonc.2013.08.030',
      },
    ],

    yearPublished: 2010,
    lastUpdated: '2025-01',
    tags: ['SBRT', 'Prostate', '5 fraction', 'Definitive', '40 Gy', 'CyberKnife'],
  },

  {
    id: 'prostate-boost',
    name: 'Prostate SBRT Boost - 19-21 Gy/2 fx',
    shortName: 'SBRT Boost',
    source: 'Consensus',
    category: 'prostate',
    subcategory: 'Boost',
    icon: '🎯',

    prescriptions: [
      {
        dose: 21,
        fractions: 2,
        dosePerFraction: 10.5,
        description: 'HDR-equivalent boost',
        isPreferred: true,
        BED10: calculateBED(21, 2, 10),
      },
      {
        dose: 19,
        fractions: 2,
        dosePerFraction: 9.5,
        description: 'Conservative boost',
        isPreferred: false,
        BED10: calculateBED(19, 2, 10),
      },
    ],

    keyConstraints: [
      { organ: 'Rectum', constraint: 'V18 < 1cc', priority: 'critical' },
      { organ: 'Bladder', constraint: 'V19 < 5cc', priority: 'major' },
      { organ: 'Urethra', constraint: 'Dmax ≤22 Gy', priority: 'critical' },
    ],

    techniques: ['SBRT', 'CyberKnife', 'VMAT'],

    indication: 'Prostate SBRT boost after EBRT (similar to HDR brachytherapy boost)',

    eligibility: [
      'High-risk or unfavorable intermediate-risk prostate cancer',
      'After pelvic EBRT (45-50 Gy)',
      'No prior brachytherapy',
      'Good urinary function',
    ],

    staging: 'T2b-T3b N0 M0 or high-risk features',

    targetVolumes: [
      { name: 'CTV', definition: 'Prostate only (no SV for boost)' },
      { name: 'PTV', definition: 'CTV + 3-5mm (2mm posterior)' },
    ],

    margins: [
      { from: 'CTV', to: 'PTV', margin: '3-5mm (2mm posterior)', notes: 'Tight posterior margin essential' },
    ],

    allConstraints: [
      { organ: 'Rectum', metric: 'V18', constraint: '<1cc', endpoint: 'Proctitis' },
      { organ: 'Rectum', metric: 'V12', constraint: '<10cc', endpoint: 'Proctitis' },
      { organ: 'Bladder', metric: 'V19', constraint: '<5cc', endpoint: 'Cystitis' },
      { organ: 'Bladder', metric: 'V15', constraint: '<15cc', endpoint: 'Cystitis' },
      { organ: 'Urethra', metric: 'Dmax', constraint: '≤22 Gy (105%)', endpoint: 'Stricture' },
      { organ: 'Penile Bulb', metric: 'Dmax', constraint: '<15 Gy', endpoint: 'ED' },
    ],

    motionManagement: 'Fiducials mandatory. SpaceOAR strongly recommended.',
    imageGuidance: 'Daily CBCT + intrafraction tracking',
    treatmentDelivery: '2 fractions, ≥48 hours apart, after EBRT completion',

    publications: [
      {
        title: 'Stereotactic body radiation therapy boost for high-risk prostate cancer',
        authors: 'Katz A et al.',
        journal: 'Front Oncol',
        year: 2014,
        pmid: '25426457',
        doi: '10.3389/fonc.2014.00314',
      },
      {
        title: 'SBRT boost vs HDR brachytherapy boost in prostate cancer',
        authors: 'Fuller DB et al.',
        journal: 'Radiother Oncol',
        year: 2019,
        pmid: '30655043',
        doi: '10.1016/j.radonc.2019.01.009',
      },
    ],

    yearPublished: 2014,
    lastUpdated: '2025-01',
    tags: ['SBRT', 'Prostate', 'Boost', '2 fraction', 'High-risk', 'HDR-equivalent'],
  },
];
