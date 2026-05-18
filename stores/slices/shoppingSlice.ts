import type { Unit, RecipeIngredient } from '@/types/recipe'

export interface ShoppingItem {
  name: string
  amount: number
  unit: Unit
  checked: boolean
}

export interface ShoppingSlice {
  shoppingItems: ShoppingItem[]
  addShoppingItem: (name: string, amount: number, unit: Unit) => void
  toggleShoppingItem: (name: string) => void
  removeShoppingItem: (name: string) => void
  clearCheckedItems: () => void
  clearShoppingList: () => void
  addFromRecipe: (missingIngredients: RecipeIngredient[]) => void
}

export const createShoppingSlice = (
  set: (fn: (s: ShoppingSlice) => Partial<ShoppingSlice>) => void,
  get: () => ShoppingSlice
): ShoppingSlice => ({
  shoppingItems: [],
  addShoppingItem: (name, amount, unit) => {
    const existing = get().shoppingItems.find((i) => i.name.toLowerCase() === name.toLowerCase())
    if (existing) return
    set((s) => ({ shoppingItems: [...s.shoppingItems, { name, amount, unit, checked: false }] }))
  },
  toggleShoppingItem: (name) =>
    set((s) => ({
      shoppingItems: s.shoppingItems.map((i) =>
        i.name === name ? { ...i, checked: !i.checked } : i
      ),
    })),
  removeShoppingItem: (name) =>
    set((s) => ({ shoppingItems: s.shoppingItems.filter((i) => i.name !== name) })),
  clearCheckedItems: () =>
    set((s) => ({ shoppingItems: s.shoppingItems.filter((i) => !i.checked) })),
  clearShoppingList: () => set(() => ({ shoppingItems: [] })),
  addFromRecipe: (missing) => {
    missing.forEach((ing) => get().addShoppingItem(ing.name, ing.amount, ing.unit))
  },
})
