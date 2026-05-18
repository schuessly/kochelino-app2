'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/stores/useAppStore'
import { DifficultyBadge } from '@/components/rezepte/DifficultyBadge'
import { ProTipp } from '@/components/rezepte/ProTipp'
import { FavoriteButton } from '@/components/shared/FavoriteButton'
import { CookedButton } from '@/components/shared/CookedButton'
import { IconArrowLeft, IconClock, IconUsers, IconCartPlus, IconCheck } from '@/components/icons'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function RecipeDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const recipes = useAppStore((s) => s.recipes)
  const favorites = useAppStore((s) => s.favorites)
  const vorratItems = useAppStore((s) => s.vorratItems)
  const addShoppingItem = useAppStore((s) => s.addShoppingItem)

  const recipe = recipes.find((r) => r.id === id) || favorites.find((r) => r.id === id)

  if (!recipe) {
    return (
      <div className="text-center py-16">
        <p className="font-black text-[#1A1A1A] text-lg mb-4">Rezept nicht gefunden</p>
        <button onClick={() => router.back()} className="text-[#1C4A2E] font-bold flex items-center gap-1.5 mx-auto">
          <IconArrowLeft className="w-4 h-4" /> Zurück
        </button>
      </div>
    )
  }

  function isInPantry(ingredientName: string): boolean {
    const norm = ingredientName.toLowerCase()
    return vorratItems.some((i) => i.name.toLowerCase().includes(norm) || norm.includes(i.name.toLowerCase()))
  }

  function addMissingToShopping() {
    const missing = recipe!.ingredients.filter((ing) => !isInPantry(ing.name))
    missing.forEach((ing) => addShoppingItem(ing.name, ing.amount, ing.unit))
    router.push('/einkaufszettel')
  }

  const missingCount = recipe.ingredients.filter((ing) => !isInPantry(ing.name)).length

  return (
    <article className="space-y-4 pb-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-[#1C4A2E] font-bold text-sm mt-1"
      >
        <IconArrowLeft className="w-4 h-4" /> Zurück
      </button>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#1C4A2E] to-[#2D6A4F] rounded-2xl px-5 pt-5 pb-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute right-4 bottom-2 w-20 h-20 rounded-full bg-white/5" />
        <div className="flex items-start justify-between gap-3 relative z-10">
          <h1 className="text-2xl font-black text-white leading-tight flex-1">{recipe.title}</h1>
          <FavoriteButton recipe={recipe} />
        </div>
        <p className="text-white/70 text-sm mt-2 mb-4 leading-relaxed relative z-10">{recipe.description}</p>
        <div className="flex flex-wrap gap-2 relative z-10">
          <span className="flex items-center gap-1.5 text-xs font-bold bg-white/15 text-white px-3 py-1.5 rounded-full">
            <IconClock className="w-3 h-3" /> {recipe.timeMinutes} Min.
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold bg-white/15 text-white px-3 py-1.5 rounded-full">
            <IconUsers className="w-3 h-3" /> {recipe.servings} Personen
          </span>
          <DifficultyBadge difficulty={recipe.difficulty} />
        </div>
        {recipe.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mt-3 relative z-10">
            {recipe.tags.map((tag) => (
              <span key={tag} className="text-[11px] font-bold bg-white/10 text-white/80 border border-white/20 px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Ingredients */}
      <section className="bg-white rounded-2xl p-5 border border-[#DDE8DC]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-[#1A1A1A]">Zutaten</h2>
          {missingCount > 0 && (
            <button
              onClick={addMissingToShopping}
              className="flex items-center gap-1.5 text-xs font-bold text-[#1C4A2E] bg-[#EDF4EF] px-3 py-1.5 rounded-full hover:bg-[#DDE8DC] transition-colors"
            >
              <IconCartPlus className="w-3.5 h-3.5" />
              {missingCount} einkaufen
            </button>
          )}
        </div>
        <ul className="space-y-0" aria-label="Zutatenliste">
          {recipe.ingredients.map((ing, i) => {
            const inPantry = isInPantry(ing.name)
            return (
              <li
                key={i}
                className="flex items-center justify-between py-2.5 border-b border-[#F0F4F0] last:border-0"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    inPantry ? 'bg-[#EDF4EF]' : 'bg-[#FEF9EC]'
                  }`}>
                    {inPantry
                      ? <IconCheck className="w-3 h-3 text-[#2D6A4F]" />
                      : <IconCartPlus className="w-3 h-3 text-[#B07D0A]" />
                    }
                  </div>
                  <span className={`font-semibold text-sm ${inPantry ? 'text-[#1A1A1A]' : 'text-[#6B7870]'}`}>
                    {ing.name}
                    {ing.note && <span className="font-normal text-xs ml-1 text-[#6B7870]">({ing.note})</span>}
                  </span>
                </div>
                <span className="text-sm font-bold text-[#1A1A1A]">
                  {ing.amount} {ing.unit}
                </span>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Steps */}
      <section className="bg-white rounded-2xl p-5 border border-[#DDE8DC]">
        <h2 className="font-black text-[#1A1A1A] mb-4">Zubereitung</h2>
        <ol className="space-y-4" aria-label="Zubereitungsschritte">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full bg-[#1C4A2E] text-white text-xs font-black">
                {i + 1}
              </span>
              <p className="text-sm text-[#1A1A1A] leading-relaxed pt-0.5">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Nutrition */}
      <section className="bg-white rounded-2xl p-5 border border-[#DDE8DC]">
        <h2 className="font-black text-[#1A1A1A] mb-4">Nährwerte (pro Portion)</h2>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: 'Kalorien', value: `${recipe.nutrition.kcal}`, unit: 'kcal' },
            { label: 'Eiweiß', value: `${recipe.nutrition.protein}`, unit: 'g' },
            { label: 'Kohlenhydrate', value: `${recipe.nutrition.carbs}`, unit: 'g' },
            { label: 'Fett', value: `${recipe.nutrition.fat}`, unit: 'g' },
          ].map(({ label, value, unit }) => (
            <div key={label} className="bg-[#EDF4EF] rounded-xl py-3">
              <div className="text-lg font-black text-[#1C4A2E]">{value}</div>
              <div className="text-xs text-[#6B7870]">{unit}</div>
              <div className="text-[10px] font-bold text-[#1A1A1A] mt-0.5 leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <CookedButton recipe={recipe} />
      <ProTipp proTipp={recipe.proTipp} />
    </article>
  )
}
