import type { Recipe } from '@/types/recipe'

export interface FavoritesSlice {
  favorites: Recipe[]
  addFavorite: (r: Recipe) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

export const createFavoritesSlice = (set: (fn: (s: FavoritesSlice) => Partial<FavoritesSlice>) => void, get: () => FavoritesSlice): FavoritesSlice => ({
  favorites: [],
  addFavorite: (r) =>
    set((s) => ({
      favorites: s.favorites.some((f) => f.id === r.id) ? s.favorites : [r, ...s.favorites],
    })),
  removeFavorite: (id) =>
    set((s) => ({ favorites: s.favorites.filter((f) => f.id !== id) })),
  isFavorite: (id) => get().favorites.some((f) => f.id === id),
})
