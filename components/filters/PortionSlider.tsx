'use client'

import { useAppStore } from '@/stores/useAppStore'

const PERSON_EMOJIS = ['👤', '👥', '👨‍👩‍👦', '👨‍👩‍👧‍👦', '🧑‍🤝‍🧑', '👫', '👨‍👩‍👧‍👦', '🎉', '🎊', '🥳', '🎈', '🍾']

export function PortionSlider() {
  const portions = useAppStore((s) => s.portions)
  const setPortions = useAppStore((s) => s.setPortions)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-4xl">{PERSON_EMOJIS[Math.min(portions - 1, PERSON_EMOJIS.length - 1)]}</span>
        <span className="text-3xl font-extrabold text-[#1C4A2E] dark:text-[#5DB879]">{portions}</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setPortions(portions - 1)}
          disabled={portions <= 1}
          className="min-touch w-12 h-12 rounded-full bg-[#EDF4EF] dark:bg-[#1A2E20] text-2xl font-bold text-[#1C4A2E] dark:text-[#5DB879] disabled:opacity-40 flex items-center justify-center hover:bg-[#DDE8DC] dark:hover:bg-[#1E3328] transition-colors"
          aria-label="Weniger Personen"
        >
          −
        </button>
        <input
          type="range"
          min={1}
          max={12}
          value={portions}
          onChange={(e) => setPortions(Number(e.target.value))}
          className="flex-1 accent-[#1C4A2E] h-2 cursor-pointer"
          aria-label="Personenanzahl"
        />
        <button
          onClick={() => setPortions(portions + 1)}
          disabled={portions >= 12}
          className="min-touch w-12 h-12 rounded-full bg-[#1C4A2E] text-white text-2xl font-bold disabled:opacity-40 flex items-center justify-center hover:bg-[#2D6A4F] transition-colors"
          aria-label="Mehr Personen"
        >
          +
        </button>
      </div>
      <div className="flex justify-between text-xs text-[#6B7870] dark:text-[#7FA88A]">
        {[1, 2, 4, 6, 8, 12].map((n) => (
          <button
            key={n}
            onClick={() => setPortions(n)}
            className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${
              portions === n ? 'bg-[#1C4A2E] text-white dark:bg-[#2D6A4F]' : 'bg-[#EDF4EF] dark:bg-[#1A2E20] text-[#1C4A2E] dark:text-[#5DB879]'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}
