'use client'

import { useAppStore } from '@/stores/useAppStore'
import { RecipeCard } from '@/components/rezepte/RecipeCard'
import { IconHeart } from '@/components/icons'

export default function LieblingePage() {
  const favorites = useAppStore((s) => s.favorites)

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-[#EDF4EF] flex items-center justify-center">
          <IconHeart className="w-10 h-10 text-[#1C4A2E]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-black text-[#1A1A1A]">Noch keine Lieblinge</h1>
          <p className="text-[#6B7870] text-sm max-w-xs mx-auto">
            Öffne ein Rezept und tippe auf das Herz, um es hier zu speichern.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pt-1">
        <h1 className="text-xl font-black text-[#1A1A1A]">Lieblinge</h1>
        <span className="text-xs font-bold text-[#6B7870] bg-[#EDF4EF] px-2.5 py-1 rounded-full">
          {favorites.length}
        </span>
      </div>
      <div className="grid gap-4">
        {favorites.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}
