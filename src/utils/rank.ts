export const TIER_NAMES = [
  'Unranked', 'Unranked', 'Unranked',
  'Iron 1', 'Iron 2', 'Iron 3',
  'Bronze 1', 'Bronze 2', 'Bronze 3',
  'Silver 1', 'Silver 2', 'Silver 3',
  'Gold 1', 'Gold 2', 'Gold 3',
  'Platinum 1', 'Platinum 2', 'Platinum 3',
  'Diamond 1', 'Diamond 2', 'Diamond 3',
  'Ascendant 1', 'Ascendant 2', 'Ascendant 3',
  'Immortal 1', 'Immortal 2', 'Immortal 3',
  'Radiant',
];

export const TIER_SHORTS = [
  'UnR', 'UnR', 'UnR',
  'Ir1', 'Ir2', 'Ir3',
  'B1', 'B2', 'B3',
  'S1', 'S2', 'S3',
  'G1', 'G2', 'G3',
  'P1', 'P2', 'P3',
  'D1', 'D2', 'D3',
  'A1', 'A2', 'A3',
  'Im1', 'Im2', 'Im3',
  'Rad',
];

// Tailwind color classes for each tier group
export const TIER_COLORS = [
  'text-slate-400', 'text-slate-400', 'text-slate-400', // Unranked
  'text-stone-400', 'text-stone-400', 'text-stone-400', // Iron
  'text-amber-700', 'text-amber-700', 'text-amber-700', // Bronze
  'text-slate-300', 'text-slate-300', 'text-slate-300', // Silver
  'text-yellow-400', 'text-yellow-400', 'text-yellow-400', // Gold
  'text-cyan-400', 'text-cyan-400', 'text-cyan-400',   // Platinum
  'text-purple-400', 'text-purple-400', 'text-purple-400', // Diamond
  'text-emerald-400', 'text-emerald-400', 'text-emerald-400', // Ascendant
  'text-red-400', 'text-red-400', 'text-red-400',       // Immortal
  'text-yellow-200',                                     // Radiant
];

export function getTierName(tier: number): string {
  return TIER_NAMES[tier] ?? 'Unranked';
}

export function getTierShort(tier: number): string {
  return TIER_SHORTS[tier] ?? 'UnR';
}

export function getTierColor(tier: number): string {
  return TIER_COLORS[tier] ?? 'text-slate-400';
}
