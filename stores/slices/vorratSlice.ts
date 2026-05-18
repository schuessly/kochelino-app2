import type { PantryItem, DeductionResult } from '@/types/pantry'
import type { RecipeIngredient } from '@/types/recipe'
import { deductIngredients } from '@/lib/pantryDeduction'
import { v4 as uuidv4 } from 'uuid'

export interface VorratSlice {
  vorratItems: PantryItem[]
  addVorratItem: (item: Omit<PantryItem, 'id' | 'lastUpdated'>) => void
  updateVorratItem: (id: string, updates: Partial<Omit<PantryItem, 'id'>>) => void
  removeVorratItem: (id: string) => void
  deductRecipeIngredients: (ingredients: RecipeIngredient[]) => DeductionResult
  getLowStockItems: () => PantryItem[]
  restoreVorratItems: (items: PantryItem[]) => void
}

export const createVorratSlice = (
  set: (fn: (s: VorratSlice) => Partial<VorratSlice>) => void,
  get: () => VorratSlice
): VorratSlice => ({
  vorratItems: [],
  addVorratItem: (item) =>
    set(() => ({
      vorratItems: [...get().vorratItems, { ...item, id: uuidv4(), lastUpdated: Date.now() }],
    })),
  updateVorratItem: (id, updates) =>
    set((s) => ({
      vorratItems: s.vorratItems.map((i) =>
        i.id === id ? { ...i, ...updates, lastUpdated: Date.now() } : i
      ),
    })),
  removeVorratItem: (id) =>
    set((s) => ({ vorratItems: s.vorratItems.filter((i) => i.id !== id) })),
  deductRecipeIngredients: (ingredients) => {
    const result = deductIngredients(get().vorratItems, ingredients)
    set(() => ({ vorratItems: result.updated }))
    return result
  },
  getLowStockItems: () =>
    get().vorratItems.filter((i) => i.lowThreshold !== undefined && i.quantity <= i.lowThreshold),
  restoreVorratItems: (items) => set(() => ({ vorratItems: items })),
})
