'use client'

import { useAppStore } from '@/stores/useAppStore'
import { DIET_FILTER_LABELS, DIET_FILTER_ICONS, type DietFilter } from '@/types/filters'

const ALL_FILTERS = Object.keys(DIET_FILTER_LABELS) as DietFilter[]

export function DietFilterBar() {
  const dietFilters = useAppStore((s) => s.dietFilters)
  const toggleDietFilter = useAppStore((s) => s.toggleDietFilter)

  return (
    <div
      role="group"
      aria-label="Ernährungswünsche"
      className="grid grid-cols-2 gap-2"
    >
      {ALL_FILTERS.map((filter) => {
        const isActive = dietFilters.includes(filter)
        return (
          <button
            key={filter}
            onClick={() => toggleDietFilter(filter)}
            aria-pressed={isActive}
            className={`min-touch flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-semibold transition-all border-2
              ${isActive
                ? 'bg-[#1C4A2E] text-white border-[#1C4A2E] dark:bg-[#2D6A4F] dark:border-[#2D6A4F]'
                : 'bg-white dark:bg-[#142219] text-[#1A1A1A] dark:text-[#F0EDE6] border-[#DDE8DC] dark:border-[#1E3328] hover:border-[#1C4A2E] dark:hover:border-[#5DB879]'
              }`}
          >
            <span className="text-base">{DIET_FILTER_ICONS[filter]}</span>
            <span>{DIET_FILTER_LABELS[filter]}</span>
          </button>
        )
      })}
    </div>
  )
}
