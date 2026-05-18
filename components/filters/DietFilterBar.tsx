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
                ? 'bg-[#D85A30] text-white border-[#D85A30]'
                : 'bg-white text-[#4A1B0C] border-[#E8CEB0] hover:border-[#D85A30]'
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
