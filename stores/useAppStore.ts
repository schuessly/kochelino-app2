'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { createIngredientsSlice, type IngredientsSlice } from './slices/ingredientsSlice'
import { createFiltersSlice, type FiltersSlice } from './slices/filtersSlice'
import { createRecipesSlice, type RecipesSlice } from './slices/recipesSlice'
import { createFavoritesSlice, type FavoritesSlice } from './slices/favoritesSlice'
import { createVorratSlice, type VorratSlice } from './slices/vorratSlice'
import { createShoppingSlice, type ShoppingSlice } from './slices/shoppingSlice'

export type AppStore = IngredientsSlice & FiltersSlice & RecipesSlice & FavoritesSlice & VorratSlice & ShoppingSlice

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...createIngredientsSlice(set as Parameters<typeof createIngredientsSlice>[0]),
      ...createFiltersSlice(set as Parameters<typeof createFiltersSlice>[0]),
      ...createRecipesSlice(set as Parameters<typeof createRecipesSlice>[0]),
      ...createFavoritesSlice(
        set as Parameters<typeof createFavoritesSlice>[0],
        get as Parameters<typeof createFavoritesSlice>[1]
      ),
      ...createVorratSlice(
        set as Parameters<typeof createVorratSlice>[0],
        get as Parameters<typeof createVorratSlice>[1]
      ),
      ...createShoppingSlice(
        set as Parameters<typeof createShoppingSlice>[0],
        get as Parameters<typeof createShoppingSlice>[1]
      ),
    }),
    {
      name: 'kochelino-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favorites: state.favorites,
        vorratItems: state.vorratItems,
        shoppingItems: state.shoppingItems,
        isGrosserModus: state.isGrosserModus,
        geminiApiKey: state.geminiApiKey,
      }),
      skipHydration: true,
    }
  )
)
