import type { DietFilter } from '@/types/filters'

export interface FiltersSlice {
  portions: number
  dietFilters: DietFilter[]
  isGrosserModus: boolean
  geminiApiKey: string
  setPortions: (n: number) => void
  toggleDietFilter: (f: DietFilter) => void
  toggleGrosserModus: () => void
  setGeminiApiKey: (key: string) => void
}

export const createFiltersSlice = (set: (fn: (s: FiltersSlice) => Partial<FiltersSlice>) => void): FiltersSlice => ({
  portions: 2,
  dietFilters: [],
  isGrosserModus: false,
  geminiApiKey: '',
  setPortions: (n) => set(() => ({ portions: Math.min(12, Math.max(1, n)) })),
  toggleDietFilter: (f) =>
    set((s) => ({
      dietFilters: s.dietFilters.includes(f)
        ? s.dietFilters.filter((x) => x !== f)
        : [...s.dietFilters, f],
    })),
  toggleGrosserModus: () => set((s) => ({ isGrosserModus: !s.isGrosserModus })),
  setGeminiApiKey: (key) => set(() => ({ geminiApiKey: key })),
})
