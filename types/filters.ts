export type DietFilter =
  | 'Low Carb'
  | 'Abnehmen'
  | 'Muskelaufbau'
  | 'Vegetarisch'
  | 'Vegan'
  | 'Glutenfrei'
  | 'Laktosefrei'
  | 'Keto'
  | 'Schnell & Einfach'
  | 'Familienfreundlich'

export const DIET_FILTER_LABELS: Record<DietFilter, string> = {
  'Low Carb': 'Low Carb',
  Abnehmen: 'Abnehmen',
  Muskelaufbau: 'Muskelaufbau',
  Vegetarisch: 'Vegetarisch',
  Vegan: 'Vegan',
  Glutenfrei: 'Glutenfrei',
  Laktosefrei: 'Laktosefrei',
  Keto: 'Keto',
  'Schnell & Einfach': 'Schnell & Einfach',
  Familienfreundlich: 'Familienfreundlich',
}

export const DIET_FILTER_ICONS: Record<DietFilter, string> = {
  'Low Carb': '🥗',
  Abnehmen: '⚖️',
  Muskelaufbau: '💪',
  Vegetarisch: '🌿',
  Vegan: '🌱',
  Glutenfrei: '🌾',
  Laktosefrei: '🥛',
  Keto: '🥑',
  'Schnell & Einfach': '⏱️',
  Familienfreundlich: '👨‍👩‍👧‍👦',
}
