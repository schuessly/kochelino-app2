'use client'

import { useState } from 'react'
import { useAppStore } from '@/stores/useAppStore'
import { CATEGORY_ICONS, INGREDIENTS_DB } from '@/lib/ingredientsDb'
import type { Category } from '@/types/pantry'
import type { Unit } from '@/types/recipe'
import { toast } from 'sonner'
import { IconPlus, IconMinus, IconTrash, IconWarning, IconCheck, IconPantry } from '@/components/icons'

const UNITS: Unit[] = ['g', 'kg', 'ml', 'l', 'Stück', 'EL', 'TL', 'Prise', 'Bund', 'Scheibe', 'Zehe', 'Dose']

const ALL_CATEGORIES: Category[] = [
  'Gemüse', 'Obst', 'Fleisch & Fisch', 'Milchprodukte',
  'Getreide & Beilagen', 'Gewürze & Öle', 'Tiefkühl', 'Sonstiges',
]

export default function VorratPage() {
  const vorratItems = useAppStore((s) => s.vorratItems)
  const addVorratItem = useAppStore((s) => s.addVorratItem)
  const updateVorratItem = useAppStore((s) => s.updateVorratItem)
  const removeVorratItem = useAppStore((s) => s.removeVorratItem)
  const getLowStockItems = useAppStore((s) => s.getLowStockItems)

  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [newQty, setNewQty] = useState('')
  const [newUnit, setNewUnit] = useState<Unit>('Stück')
  const [newCategory, setNewCategory] = useState<Category>('Sonstiges')
  const [newThreshold, setNewThreshold] = useState('')
  const [nameQuery, setNameQuery] = useState('')

  const lowStock = getLowStockItems()

  const grouped = ALL_CATEGORIES.reduce<Record<Category, typeof vorratItems>>((acc, cat) => {
    acc[cat] = vorratItems.filter((i) => i.category === cat)
    return acc
  }, {} as Record<Category, typeof vorratItems>)

  function nameSuggestions() {
    if (!nameQuery || nameQuery.length < 1) return []
    return INGREDIENTS_DB.filter((i) => i.name.toLowerCase().includes(nameQuery.toLowerCase())).slice(0, 5)
  }

  function selectName(name: string) {
    setNewName(name)
    setNameQuery(name)
    const entry = INGREDIENTS_DB.find((i) => i.name === name)
    if (entry) {
      setNewCategory(entry.category)
      setNewUnit(entry.defaultUnit)
    }
  }

  function handleAdd() {
    if (!newName.trim() || !newQty) return
    addVorratItem({
      name: newName.trim(),
      quantity: Number(newQty),
      unit: newUnit,
      category: newCategory,
      lowThreshold: newThreshold ? Number(newThreshold) : undefined,
    })
    toast.success(`${newName} hinzugefügt.`)
    setNewName('')
    setNameQuery('')
    setNewQty('')
    setNewUnit('Stück')
    setNewCategory('Sonstiges')
    setNewThreshold('')
    setShowAdd(false)
  }

  return (
    <div className="space-y-4 pb-6">
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-black text-[#1A1A1A] dark:text-[#F0EDE6]">Mein Vorrat</h1>
        </div>
        <span className="text-xs font-bold text-[#6B7870] dark:text-[#7FA88A] bg-[#EDF4EF] dark:bg-[#1A2E20] px-2.5 py-1 rounded-full">
          {vorratItems.length} Artikel
        </span>
      </div>

      {lowStock.length > 0 && (
        <div
          role="alert"
          className="bg-[#FEF9EC] dark:bg-[#2A1F00]/40 border border-[#F2A20C]/40 rounded-xl p-3.5 flex items-start gap-3"
        >
          <IconWarning className="w-4.5 h-4.5 text-[#B07D0A] dark:text-[#F2A20C] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-[#B07D0A] dark:text-[#F2A20C] text-sm">Wird bald leer:</p>
            <p className="text-sm text-[#6B7870] dark:text-[#7FA88A]">{lowStock.map((i) => i.name).join(', ')}</p>
          </div>
        </div>
      )}

      {vorratItems.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#EDF4EF] dark:bg-[#1A2E20] flex items-center justify-center">
            <IconPantry className="w-10 h-10 text-[#1C4A2E] dark:text-[#5DB879]" />
          </div>
          <div className="space-y-2">
            <p className="font-black text-[#1A1A1A] dark:text-[#F0EDE6]">Dein Vorrat ist leer</p>
            <p className="text-[#6B7870] dark:text-[#7FA88A] text-sm max-w-xs mx-auto">
              Füge deine Vorräte hinzu, dann passt Kochelino die Rezepte an.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {ALL_CATEGORIES.filter((cat) => grouped[cat].length > 0).map((cat) => (
            <section key={cat}>
              <h2 className="text-[10px] font-black text-[#6B7870] dark:text-[#7FA88A] flex items-center gap-1.5 mb-2.5 uppercase tracking-widest">
                <span className="text-base">{CATEGORY_ICONS[cat]}</span> {cat}
              </h2>
              <ul className="space-y-2">
                {grouped[cat].map((item) => {
                  const isLow = item.lowThreshold !== undefined && item.quantity <= item.lowThreshold
                  const isOut = item.quantity === 0
                  return (
                    <li
                      key={item.id}
                      className="flex items-center gap-3 bg-white dark:bg-[#142219] rounded-xl px-4 py-3 border border-[#DDE8DC] dark:border-[#1E3328] shadow-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#1A1A1A] dark:text-[#F0EDE6] text-sm truncate">{item.name}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateVorratItem(item.id, { quantity: Math.max(0, item.quantity - 1) })}
                          className="w-8 h-8 rounded-lg bg-[#EDF4EF] dark:bg-[#1A2E20] text-[#1C4A2E] dark:text-[#5DB879] flex items-center justify-center hover:bg-[#DDE8DC] dark:hover:bg-[#1E3328] transition-colors"
                          aria-label={`Menge von ${item.name} verringern`}
                        >
                          <IconMinus className="w-3.5 h-3.5" />
                        </button>
                        <span
                          className={`text-sm font-black min-w-[3.5rem] text-center tabular-nums
                            ${isOut ? 'text-red-600' : isLow ? 'text-[#B07D0A]' : 'text-[#1C4A2E]'}`}
                          aria-label={`Menge: ${item.quantity} ${item.unit}`}
                        >
                          {item.quantity} {item.unit}
                        </span>
                        <button
                          onClick={() => updateVorratItem(item.id, { quantity: item.quantity + 1 })}
                          className="w-8 h-8 rounded-lg bg-[#1C4A2E] text-white flex items-center justify-center hover:bg-[#2D6A4F] transition-colors"
                          aria-label={`Menge von ${item.name} erhöhen`}
                        >
                          <IconPlus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            removeVorratItem(item.id)
                            toast.info(`${item.name} entfernt.`)
                          }}
                          className="w-8 h-8 rounded-lg text-[#6B7870] hover:text-red-500 flex items-center justify-center transition-colors"
                          aria-label={`${item.name} aus Vorrat entfernen`}
                        >
                          <IconTrash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      )}

      {/* Add Form */}
      {showAdd && (
        <div className="bg-white dark:bg-[#142219] rounded-2xl p-5 border border-[#DDE8DC] dark:border-[#1E3328] shadow-lg space-y-3">
          <h3 className="font-black text-[#1A1A1A] dark:text-[#F0EDE6]">Artikel hinzufügen</h3>

          <div className="relative">
            <input
              type="text"
              value={nameQuery}
              onChange={(e) => { setNameQuery(e.target.value); setNewName(e.target.value) }}
              placeholder="Name (z.B. Tomaten)"
              className="w-full min-h-[48px] px-4 py-2 rounded-xl border-2 border-[#DDE8DC] dark:border-[#1E3328] focus:border-[#1C4A2E] dark:focus:border-[#5DB879] focus:outline-none text-sm bg-[#F8F7F2] dark:bg-[#1A2E20] dark:text-[#F0EDE6] transition-colors"
              aria-label="Artikelname"
            />
            {nameSuggestions().length > 0 && (
              <ul className="absolute z-10 top-full left-0 right-0 bg-white dark:bg-[#142219] border border-[#DDE8DC] dark:border-[#1E3328] rounded-xl mt-1 shadow-xl overflow-hidden">
                {nameSuggestions().map((s) => (
                  <li
                    key={s.name}
                    onClick={() => selectName(s.name)}
                    className="px-4 py-2.5 cursor-pointer hover:bg-[#EDF4EF] dark:hover:bg-[#1A2E20] text-sm font-semibold dark:text-[#F0EDE6] flex items-center gap-2 transition-colors"
                  >
                    <span>{s.icon}</span> {s.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              value={newQty}
              onChange={(e) => setNewQty(e.target.value)}
              placeholder="Menge"
              min={0}
              className="flex-1 min-h-[48px] px-4 py-2 rounded-xl border-2 border-[#DDE8DC] focus:border-[#1C4A2E] focus:outline-none text-sm bg-[#F8F7F2] transition-colors"
              aria-label="Menge"
            />
            <select
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value as Unit)}
              className="min-h-[48px] px-3 py-2 rounded-xl border-2 border-[#DDE8DC] dark:border-[#1E3328] focus:border-[#1C4A2E] dark:focus:border-[#5DB879] focus:outline-none text-sm bg-white dark:bg-[#1A2E20] dark:text-[#F0EDE6] transition-colors"
              aria-label="Einheit"
            >
              {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as Category)}
            className="w-full min-h-[48px] px-4 py-2 rounded-xl border-2 border-[#DDE8DC] dark:border-[#1E3328] focus:border-[#1C4A2E] dark:focus:border-[#5DB879] focus:outline-none text-sm bg-white dark:bg-[#1A2E20] dark:text-[#F0EDE6] transition-colors"
            aria-label="Kategorie"
          >
            {ALL_CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_ICONS[c]} {c}</option>)}
          </select>

          <input
            type="number"
            value={newThreshold}
            onChange={(e) => setNewThreshold(e.target.value)}
            placeholder="Warnschwelle (optional, z.B. 2)"
            min={0}
            className="w-full min-h-[48px] px-4 py-2 rounded-xl border-2 border-[#DDE8DC] focus:border-[#1C4A2E] focus:outline-none text-sm bg-[#F8F7F2] transition-colors"
            aria-label="Warnschwelle"
          />

          <div className="flex gap-2">
            <button
              onClick={() => setShowAdd(false)}
              className="flex-1 min-touch py-2.5 rounded-xl border-2 border-[#DDE8DC] dark:border-[#1E3328] text-[#1A1A1A] dark:text-[#F0EDE6] font-bold text-sm hover:bg-[#EDF4EF] dark:hover:bg-[#1A2E20] transition-colors"
            >
              Abbrechen
            </button>
            <button
              onClick={handleAdd}
              disabled={!newName.trim() || !newQty}
              className="flex-1 min-touch py-2.5 rounded-xl bg-[#1C4A2E] text-white font-black text-sm disabled:opacity-40 hover:bg-[#2D6A4F] transition-colors flex items-center justify-center gap-2"
            >
              <IconCheck className="w-4 h-4" /> Hinzufügen
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      {!showAdd && (
        <button
          onClick={() => setShowAdd(true)}
          className="fixed bottom-20 right-4 w-14 h-14 rounded-2xl bg-[#1C4A2E] text-white shadow-xl hover:bg-[#2D6A4F] transition-all hover:scale-105 flex items-center justify-center no-print"
          aria-label="Neuen Artikel zum Vorrat hinzufügen"
        >
          <IconPlus className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}
