'use client'

import Link from 'next/link'
import type { Recipe } from '@/types/recipe'
import { DifficultyBadge } from './DifficultyBadge'
import { FavoriteButton } from '@/components/shared/FavoriteButton'
import { IconClock, IconUsers } from '@/components/icons'

const CARD_GRADIENTS = [
  'from-[#1C4A2E] to-[#2D6A4F]',
  'from-[#1C3A1C] to-[#3A6A2D]',
  'from-[#1C3A4A] to-[#1C5A4A]',
  'from-[#3A2D1C] to-[#6A4A2D]',
]

function hashCode(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0
  return Math.abs(h)
}

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const gradient = CARD_GRADIENTS[hashCode(recipe.id) % CARD_GRADIENTS.length]

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#DDE8DC] group">
      <Link href={`/rezepte/${recipe.id}`} className="block">
        {/* Gradient header */}
        <div className={`bg-gradient-to-br ${gradient} px-5 pt-5 pb-12 relative overflow-hidden`}>
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5" />
          <div className="absolute right-6 bottom-2 w-16 h-16 rounded-full bg-white/5" />
          <div className="absolute left-0 bottom-0 w-24 h-10 bg-gradient-to-r from-white/5 to-transparent" />

          <div className="flex items-start justify-between gap-3 relative z-10">
            <h2 className="font-black text-white text-lg leading-snug flex-1 drop-shadow-sm">
              {recipe.title}
            </h2>
            <div className="flex-shrink-0" onClick={(e) => e.preventDefault()}>
              <FavoriteButton recipe={recipe} />
            </div>
          </div>

          {recipe.tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap mt-3 relative z-10">
              {recipe.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/15 text-white/90 border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Floating body card */}
        <div className="-mt-6 mx-4 bg-white rounded-xl shadow-md border border-[#DDE8DC] px-4 py-3 mb-4 relative z-10">
          <p className="text-[#6B7870] text-sm line-clamp-2 mb-3 leading-relaxed">{recipe.description}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7870]">
              <IconClock className="w-3.5 h-3.5 text-[#1C4A2E]" />
              {recipe.timeMinutes} Min.
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7870]">
              <IconUsers className="w-3.5 h-3.5 text-[#1C4A2E]" />
              {recipe.servings} Personen
            </span>
            <DifficultyBadge difficulty={recipe.difficulty} />
          </div>
        </div>
      </Link>
    </article>
  )
}
