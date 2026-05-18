'use client'

import { useAppStore } from '@/stores/useAppStore'
import type { Recipe } from '@/types/recipe'
import { IconHeart } from '@/components/icons'

interface FavoriteButtonProps {
  recipe: Recipe
}

export function FavoriteButton({ recipe }: FavoriteButtonProps) {
  const isFavorite = useAppStore((s) => s.isFavorite(recipe.id))
  const addFavorite = useAppStore((s) => s.addFavorite)
  const removeFavorite = useAppStore((s) => s.removeFavorite)

  function toggle(e: React.MouseEvent) {
    e.preventDefault()
    if (isFavorite) {
      removeFavorite(recipe.id)
    } else {
      addFavorite(recipe)
    }
  }

  return (
    <button
      onClick={toggle}
      className={`w-9 h-9 flex items-center justify-center rounded-full transition-all ${
        isFavorite
          ? 'bg-white/30 hover:bg-white/40'
          : 'bg-white/15 hover:bg-white/25'
      }`}
      aria-label={isFavorite ? 'Aus Lieblingen entfernen' : 'Zu Lieblingen hinzufügen'}
      aria-pressed={isFavorite}
    >
      <IconHeart
        className={`w-4.5 h-4.5 transition-colors ${isFavorite ? 'text-rose-400' : 'text-white/70'}`}
        filled={isFavorite}
      />
    </button>
  )
}
