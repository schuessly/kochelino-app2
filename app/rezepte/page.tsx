'use client'

import { useRouter } from 'next/navigation'
import { useAppStore } from '@/stores/useAppStore'
import { RecipeCard } from '@/components/rezepte/RecipeCard'
import { GeneratingState } from '@/components/rezepte/GeneratingState'
import { useState } from 'react'
import { toast } from 'sonner'
import { IconRefresh, IconUtensils } from '@/components/icons'

export default function RezeptePage() {
  const router = useRouter()
  const recipes = useAppStore((s) => s.recipes)
  const isGenerating = useAppStore((s) => s.isGenerating)
  const error = useAppStore((s) => s.error)
  const selectedIngredients = useAppStore((s) => s.selectedIngredients)
  const portions = useAppStore((s) => s.portions)
  const dietFilters = useAppStore((s) => s.dietFilters)
  const geminiApiKey = useAppStore((s) => s.geminiApiKey)
  const setRecipes = useAppStore((s) => s.setRecipes)
  const setGenerating = useAppStore((s) => s.setGenerating)
  const setError = useAppStore((s) => s.setError)

  const [isReloading, setIsReloading] = useState(false)

  async function reloadRecipes() {
    if (selectedIngredients.length === 0) {
      router.push('/onboarding')
      return
    }
    setIsReloading(true)
    setGenerating(true)
    try {
      const res = await fetch('/api/rezepte', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-gemini-key': geminiApiKey },
        body: JSON.stringify({ ingredients: selectedIngredients, portions, dietFilters }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Fehler')
      setRecipes(data.recipes)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unbekannter Fehler'
      toast.error(msg)
      setError(msg)
    } finally {
      setGenerating(false)
      setIsReloading(false)
    }
  }

  if (isGenerating) return <GeneratingState />

  if (error) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center">
          <IconUtensils className="w-8 h-8 text-red-400" />
        </div>
        <p className="font-black text-[#1A1A1A] dark:text-[#F0EDE6] text-lg">Leider ist etwas schiefgelaufen.</p>
        <p className="text-[#6B7870] dark:text-[#7FA88A] text-sm max-w-xs mx-auto">{error}</p>
        <button
          onClick={() => router.push('/onboarding')}
          className="min-touch px-6 py-3 rounded-xl bg-[#1C4A2E] text-white font-bold"
        >
          Nochmal versuchen
        </button>
      </div>
    )
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16 space-y-5">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-[#EDF4EF] dark:bg-[#1A2E20] flex items-center justify-center">
          <IconUtensils className="w-10 h-10 text-[#1C4A2E] dark:text-[#5DB879]" />
        </div>
        <div className="space-y-2">
          <p className="font-black text-[#1A1A1A] dark:text-[#F0EDE6] text-xl">Noch keine Rezepte</p>
          <p className="text-[#6B7870] dark:text-[#7FA88A] text-sm">Gib ein, was du hast, und lass dich überraschen.</p>
        </div>
        <button
          onClick={() => router.push('/onboarding')}
          className="min-touch px-8 py-3.5 rounded-xl bg-[#1C4A2E] text-white font-black text-base hover:bg-[#2D6A4F] transition-colors"
        >
          Rezepte generieren
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-black text-[#1A1A1A] dark:text-[#F0EDE6]">{recipes.length} Rezepte</h1>
          {selectedIngredients.length > 0 && (
            <p className="text-xs text-[#6B7870] dark:text-[#7FA88A] mt-0.5">
              {selectedIngredients.join(', ')}
            </p>
          )}
        </div>
        <button
          onClick={reloadRecipes}
          disabled={isReloading}
          className="flex items-center gap-1.5 text-sm font-bold text-[#1C4A2E] dark:text-[#5DB879] hover:text-[#2D6A4F] disabled:opacity-40 transition-colors"
          aria-label="Neue Rezepte generieren"
        >
          <IconRefresh className={`w-4 h-4 ${isReloading ? 'animate-spin' : ''}`} />
          Neu laden
        </button>
      </div>

      <div className="grid gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <button
        onClick={() => router.push('/onboarding')}
        className="w-full min-touch py-3 rounded-xl border-2 border-[#DDE8DC] dark:border-[#1E3328] text-[#1A1A1A] dark:text-[#F0EDE6] font-bold hover:bg-[#EDF4EF] dark:hover:bg-[#1A2E20] transition-colors"
      >
        Zutaten ändern
      </button>
    </div>
  )
}
