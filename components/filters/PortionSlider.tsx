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
        <span className="text-3xl font-extrabold text-[#D85A30]">{portions}</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setPortions(portions - 1)}
          disabled={portions <= 1}
          className="min-touch w-12 h-12 rounded-full bg-[#F0E0C8] text-2xl font-bold disabled:opacity-40 flex items-center justify-center hover:bg-[#E8CEB0] transition-colors"
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
          className="flex-1 accent-[#D85A30] h-2 cursor-pointer"
          aria-label="Personenanzahl"
        />
        <button
          onClick={() => setPortions(portions + 1)}
          disabled={portions >= 12}
          className="min-touch w-12 h-12 rounded-full bg-[#D85A30] text-white text-2xl font-bold disabled:opacity-40 flex items-center justify-center hover:bg-[#C04D26] transition-colors"
          aria-label="Mehr Personen"
        >
          +
        </button>
      </div>
      <div className="flex justify-between text-xs text-[#5F5E5A]">
        {[1, 2, 4, 6, 8, 12].map((n) => (
          <button
            key={n}
            onClick={() => setPortions(n)}
            className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${
              portions === n ? 'bg-[#D85A30] text-white' : 'bg-[#F0E0C8] text-[#4A1B0C]'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}
