export interface IngredientsSlice {
  selectedIngredients: string[]
  addIngredient: (name: string) => void
  removeIngredient: (name: string) => void
  clearIngredients: () => void
}

export const createIngredientsSlice = (set: (fn: (s: IngredientsSlice) => Partial<IngredientsSlice>) => void): IngredientsSlice => ({
  selectedIngredients: [],
  addIngredient: (name) =>
    set((s) => ({
      selectedIngredients: s.selectedIngredients.includes(name)
        ? s.selectedIngredients
        : [...s.selectedIngredients, name],
    })),
  removeIngredient: (name) =>
    set((s) => ({
      selectedIngredients: s.selectedIngredients.filter((i) => i !== name),
    })),
  clearIngredients: () => set(() => ({ selectedIngredients: [] })),
})
