import type { Recipe } from '@/types/recipe'

export interface RecipesSlice {
  recipes: Recipe[]
  isGenerating: boolean
  error: string | null
  setRecipes: (r: Recipe[]) => void
  setGenerating: (b: boolean) => void
  setError: (e: string | null) => void
  clearRecipes: () => void
}

export const createRecipesSlice = (set: (fn: (s: RecipesSlice) => Partial<RecipesSlice>) => void): RecipesSlice => ({
  recipes: [],
  isGenerating: false,
  error: null,
  setRecipes: (r) => set(() => ({ recipes: r, error: null })),
  setGenerating: (b) => set(() => ({ isGenerating: b })),
  setError: (e) => set(() => ({ error: e, isGenerating: false })),
  clearRecipes: () => set(() => ({ recipes: [], error: null })),
})
