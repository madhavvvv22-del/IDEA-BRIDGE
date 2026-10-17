import { Venture } from '../types';

export interface InvestorFilterPreferences {
  industries: string[];
  stages: string[];
  minFunding: number;
  maxFunding: number;
}

export interface BalancedFeedResult {
  personalized: Venture[];
  underexposed: Venture[];
  wildcards: Venture[];
  allBalanced: Venture[];
  exposureStats: {
    totalStartups: number;
    underexposedCount: number;
    averageImpressions: number;
    exposureEquityScore: number; // 0 - 100%
  };
}

/**
 * Fair Investor Discovery Engine
 * Implements 70% Personalized, 20% Rotating Underexposed, 10% Exploration
 */
export function generateFairDiscoveryFeed(
  allVentures: Venture[],
  prefs: InvestorFilterPreferences
): BalancedFeedResult {
  // 1. Calculate average impressions to identify underexposed ventures
  const totalImpressions = allVentures.reduce(
    (acc, v) => acc + (v.exposureMetrics?.impressions || 0),
    0
  );
  const avgImpressions = Math.max(1, Math.round(totalImpressions / (allVentures.length || 1)));

  // Tag ventures that have fewer than 70% of average impressions as underexposed
  const enrichedVentures = allVentures.map((v) => {
    const impressions = v.exposureMetrics?.impressions || 0;
    const isUnderexposed = impressions < avgImpressions * 0.75 || v.exposureMetrics.saves < 3;
    
    // Calculate personalized match score
    let score = 50;
    if (prefs.industries.length === 0 || prefs.industries.includes(v.industry)) {
      score += 25;
    }
    if (prefs.stages.length === 0 || prefs.stages.includes(v.stage)) {
      score += 15;
    }
    if (v.fundingTarget >= prefs.minFunding && v.fundingTarget <= prefs.maxFunding) {
      score += 10;
    }

    return {
      ...v,
      matchScore: Math.min(99, score),
      isUnderexposed,
    };
  });

  // 2. Separate into candidate pools
  const sortedByMatch = [...enrichedVentures].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  const underexposedPool = enrichedVentures
    .filter((v) => v.isUnderexposed)
    .sort((a, b) => (a.exposureMetrics.impressions || 0) - (b.exposureMetrics.impressions || 0));
  
  // 3. Quota allocations: 70% Personalized, 20% Underexposed, 10% Exploration
  const totalSlots = Math.min(10, enrichedVentures.length);
  const personalizedCount = Math.max(1, Math.round(totalSlots * 0.7)); // ~7
  const underexposedCount = Math.max(1, Math.round(totalSlots * 0.2));  // ~2
  const wildcardCount = Math.max(1, totalSlots - personalizedCount - underexposedCount); // ~1

  const selectedPersonalized: Venture[] = [];
  const usedIds = new Set<string>();

  // Pick top personalized
  for (const v of sortedByMatch) {
    if (selectedPersonalized.length >= personalizedCount) break;
    selectedPersonalized.push({
      ...v,
      exposureCategory: 'personalized',
      matchReason: `High sector alignment (${v.industry}) and matching round stage (${v.stage})`,
    });
    usedIds.add(v.id);
  }

  // Pick rotating underexposed
  const selectedUnderexposed: Venture[] = [];
  for (const v of underexposedPool) {
    if (selectedUnderexposed.length >= underexposedCount) break;
    if (!usedIds.has(v.id)) {
      selectedUnderexposed.push({
        ...v,
        exposureCategory: 'underexposed_rotation',
        matchReason: `Fair Discovery Boost: High potential venture receiving rotation spotlight to level visibility!`,
      });
      usedIds.add(v.id);
    }
  }

  // Pick exploration / wildcard
  const selectedWildcards: Venture[] = [];
  const remaining = enrichedVentures.filter((v) => !usedIds.has(v.id));
  for (const v of remaining) {
    if (selectedWildcards.length >= wildcardCount) break;
    selectedWildcards.push({
      ...v,
      exposureCategory: 'exploration_wildcard',
      matchReason: `Serendipity Wildcard: Emerging frontier innovation in ${v.industry}`,
    });
    usedIds.add(v.id);
  }

  // Interleave the feed so rotation is naturally placed
  const allBalanced: Venture[] = [];
  const pList = [...selectedPersonalized];
  const uList = [...selectedUnderexposed];
  const wList = [...selectedWildcards];

  while (pList.length || uList.length || wList.length) {
    if (pList.length) allBalanced.push(pList.shift()!);
    if (pList.length) allBalanced.push(pList.shift()!);
    if (uList.length) allBalanced.push(uList.shift()!);
    if (pList.length) allBalanced.push(pList.shift()!);
    if (wList.length) allBalanced.push(wList.shift()!);
  }

  // Calculate Exposure Equity Score (Gini-inspired balance measure)
  const underexposedRatio = underexposedPool.length / (allVentures.length || 1);
  const exposureEquityScore = Math.min(100, Math.round((1 - underexposedRatio * 0.4) * 100));

  return {
    personalized: selectedPersonalized,
    underexposed: selectedUnderexposed,
    wildcards: selectedWildcards,
    allBalanced,
    exposureStats: {
      totalStartups: allVentures.length,
      underexposedCount: underexposedPool.length,
      averageImpressions: avgImpressions,
      exposureEquityScore,
    },
  };
}
