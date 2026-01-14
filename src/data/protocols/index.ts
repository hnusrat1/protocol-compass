// Export all protocols from a single location

import { LUNG_SBRT_PROTOCOLS } from './lung-sbrt';
import { BRAIN_SRS_PROTOCOLS } from './brain-srs';
import { SPINE_SBRT_PROTOCOLS } from './spine-sbrt';
import { PROSTATE_SBRT_PROTOCOLS } from './prostate-sbrt';
import { LIVER_SBRT_PROTOCOLS } from './liver-sbrt';
import { Protocol, DiseaseCategory, CATEGORIES } from '../types';

// Combine all protocols
export const ALL_PROTOCOLS: Protocol[] = [
  ...LUNG_SBRT_PROTOCOLS,
  ...BRAIN_SRS_PROTOCOLS,
  ...SPINE_SBRT_PROTOCOLS,
  ...PROSTATE_SBRT_PROTOCOLS,
  ...LIVER_SBRT_PROTOCOLS,
];

// Get protocols by category
export function getProtocolsByCategory(category: DiseaseCategory): Protocol[] {
  return ALL_PROTOCOLS.filter(p => p.category === category);
}

// Get protocol by ID
export function getProtocolById(id: string): Protocol | undefined {
  return ALL_PROTOCOLS.find(p => p.id === id);
}

// Search protocols
export function searchProtocols(query: string): Protocol[] {
  const lowerQuery = query.toLowerCase();
  return ALL_PROTOCOLS.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.shortName.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    p.indication.toLowerCase().includes(lowerQuery)
  );
}

// Get categories with protocol counts
export function getCategoriesWithCounts() {
  return CATEGORIES.map(cat => ({
    ...cat,
    protocolCount: ALL_PROTOCOLS.filter(p => p.category === cat.id).length,
  }));
}

// Stats
export const PROTOCOL_STATS = {
  totalProtocols: ALL_PROTOCOLS.length,
  categories: CATEGORIES.length,
  techniques: [...new Set(ALL_PROTOCOLS.flatMap(p => p.techniques))].length,
};
