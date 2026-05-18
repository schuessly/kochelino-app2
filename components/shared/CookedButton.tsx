'use client'

import { useAppStore } from '@/stores/useAppStore'
import type { Recipe } from '@/types/recipe'
import { toast } from 'sonner'
import { IconChefHat } from '@/components/icons'

interface CookedButtonProps {
  recipe: Recipe
}

export function CookedButton({ recipe }: CookedButtonProps) {
  const deductRecipeIngredients = useAppStore((s) => s.deductRecipeIngredients)
  const restoreVorratItems = useAppStore((s) => s.restoreVorratItems)
  const vorratItems = useAppStore((s) => s.vorratItems)

  function handleCooked() {
    const snapshot = [...vorratItems]
    const result = deductRecipeIngredients(recipe.ingredients)

    const lines: string[] = []
    if (result.usedUp.length > 0) lines.push(`Aufgebraucht: ${result.usedUp.join(', ')}`)
    if (result.lowStock.length > 0) lines.push(`Wird knapp: ${result.lowStock.join(', ')}`)

    toast.success('Guten Appetit! Vorrat wurde aktualisiert.', {
      description: lines.join(' · ') || undefined,
      duration: 6000,
      action: {
        label: 'Rückgängig',
        onClick: () => {
          restoreVorratItems(snapshot)
          toast.info('Vorrat wiederhergestellt.')
        },
      },
    })
  }

  return (
    <button
      onClick={handleCooked}
      className="w-full min-touch py-3.5 rounded-xl bg-[#1C4A2E] text-white font-black text-base hover:bg-[#2D6A4F] transition-colors flex items-center justify-center gap-2.5"
      aria-label="Ich habe dieses Rezept gekocht – Vorrat wird aktualisiert"
    >
      <IconChefHat className="w-5 h-5" />
      Habe ich gekocht!
    </button>
  )
}
