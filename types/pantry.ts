import type { Unit } from './recipe'

export type { Unit }

export type Category =
  | 'Gemüse'
  | 'Obst'
  | 'Fleisch & Fisch'
  | 'Milchprodukte'
  | 'Getreide & Beilagen'
  | 'Gewürze & Öle'
  | 'Tiefkühl'
  | 'Sonstiges'

export interface PantryItem {
  id: string
  name: string
  quantity: number
  unit: Unit
  category: Category
  lowThreshold?: number
  lastUpdated: number
}

export interface DeductionResult {
  updated: PantryItem[]
  usedUp: string[]
  lowStock: string[]
  notFound: string[]
}
