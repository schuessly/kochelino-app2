'use client'

import { useState, useRef, useEffect } from 'react'
import { useAppStore } from '@/stores/useAppStore'
import { searchIngredients, QUICK_INGREDIENTS, INGREDIENTS_DB } from '@/lib/ingredientsDb'
import { IngredientChip } from './IngredientChip'
import type { IngredientEntry } from '@/lib/ingredientsDb'

export function IngredientInput() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<IngredientEntry[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const selectedIngredients = useAppStore((s) => s.selectedIngredients)
  const addIngredient = useAppStore((s) => s.addIngredient)
  const removeIngredient = useAppStore((s) => s.removeIngredient)

  useEffect(() => {
    if (query.length >= 1) {
      setSuggestions(searchIngredients(query))
      setActiveIndex(-1)
    } else {
      setSuggestions([])
    }
  }, [query])

  function selectIngredient(name: string) {
    addIngredient(name)
    setQuery('')
    setSuggestions([])
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        selectIngredient(suggestions[activeIndex].name)
      } else if (query.trim()) {
        selectIngredient(query.trim())
      }
    } else if (e.key === 'Escape') {
      setSuggestions([])
      setActiveIndex(-1)
    }
  }

  const quickItems = QUICK_INGREDIENTS.filter((q) => !selectedIngredients.includes(q))

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="z.B. Tomaten, Nudeln, Käse …"
          className="w-full min-h-[52px] px-4 py-3 rounded-xl border-2 border-[#DDE8DC] dark:border-[#1E3328] bg-white dark:bg-[#1A2E20] text-[#1A1A1A] dark:text-[#F0EDE6] placeholder-[#6B7870] dark:placeholder-[#7FA88A] focus:outline-none focus:border-[#1C4A2E] dark:focus:border-[#5DB879] text-base"
          aria-label="Zutat eingeben"
          aria-autocomplete="list"
          aria-controls="ingredient-suggestions"
          aria-expanded={suggestions.length > 0}
          autoComplete="off"
        />
        {suggestions.length > 0 && (
          <ul
            id="ingredient-suggestions"
            ref={listRef}
            role="listbox"
            className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-[#142219] border border-[#DDE8DC] dark:border-[#1E3328] rounded-xl shadow-lg overflow-hidden"
          >
            {suggestions.map((s, i) => (
              <li
                key={s.name}
                role="option"
                aria-selected={i === activeIndex}
                onClick={() => selectIngredient(s.name)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors
                  ${i === activeIndex ? 'bg-[#EDF4EF] dark:bg-[#1A2E20]' : 'hover:bg-[#EDF4EF] dark:hover:bg-[#1A2E20]'}`}
              >
                <span className="text-xl">{s.icon}</span>
                <div>
                  <div className="font-semibold text-[#1A1A1A] dark:text-[#F0EDE6] text-sm">{s.name}</div>
                  <div className="text-xs text-[#6B7870] dark:text-[#7FA88A]">{s.category}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedIngredients.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Ausgewählte Zutaten">
          {selectedIngredients.map((name) => (
            <IngredientChip key={name} name={name} onRemove={removeIngredient} />
          ))}
        </ul>
      )}

      {quickItems.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-[#6B7870] dark:text-[#7FA88A] mb-2">Schnellauswahl:</p>
          <div className="flex flex-wrap gap-2">
            {quickItems.slice(0, 6).map((name) => {
              const entry = INGREDIENTS_DB.find((i) => i.name === name)
              return (
                <button
                  key={name}
                  onClick={() => selectIngredient(name)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#EDF4EF] dark:bg-[#1A2E20] text-[#1C4A2E] dark:text-[#5DB879] text-sm font-semibold rounded-full hover:bg-[#DDE8DC] dark:hover:bg-[#1E3328] transition-colors"
                >
                  {entry?.icon} {name}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
