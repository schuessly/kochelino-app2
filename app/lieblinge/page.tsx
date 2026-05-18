'use client'

import { useAppStore } from '@/stores/useAppStore'
import { RecipeCard } from '@/components/rezepte/RecipeCard'
import { IconHeart } from '@/components/icons'

export default function LieblingePage() {
  const favorites = useAppStore((s) => s.favorites)

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-[#EDF4EF] dark:bg-[#1A2E20] flex items-center justify-center">
          <IconHeart className="w-10 h-10 text-[#1C4A2E] dark:text-[#5DB879]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-black text-[#1A1A1A] dark:text-[#F0EDE6]">Noch keine Lieblinge</h1>
          <p className="text-[#6B7870] dark:text-[#7FA88A] text-sm max-w-xs mx-auto">
            Öffne ein Rezept und tippe auf das Herz, um es hier zu speichern.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pt-1">
        <h1 className="text-xl font-black text-[#1A1A1A] dark:text-[#F0EDE6]">Lieblinge</h1>
        <span className="text-xs font-bold text-[#6B7870] dark:text-[#7FA88A] bg-[#EDF4EF] dark:bg-[#1A2E20] px-2.5 py-1 rounded-full">
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
