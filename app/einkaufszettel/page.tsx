'use client'

import { useAppStore } from '@/stores/useAppStore'
import { IconShoppingBag, IconCheck, IconTrash, IconPrint } from '@/components/icons'

export default function EinkaufszettelPage() {
  const shoppingItems = useAppStore((s) => s.shoppingItems)
  const toggleShoppingItem = useAppStore((s) => s.toggleShoppingItem)
  const removeShoppingItem = useAppStore((s) => s.removeShoppingItem)
  const clearCheckedItems = useAppStore((s) => s.clearCheckedItems)
  const clearShoppingList = useAppStore((s) => s.clearShoppingList)

  const unchecked = shoppingItems.filter((i) => !i.checked)
  const checked = shoppingItems.filter((i) => i.checked)

  if (shoppingItems.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-[#EDF4EF] flex items-center justify-center">
          <IconShoppingBag className="w-10 h-10 text-[#1C4A2E]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-black text-[#1A1A1A]">Einkaufszettel ist leer</h1>
          <p className="text-[#6B7870] text-sm max-w-xs mx-auto">
            Öffne ein Rezept und füge fehlende Zutaten hinzu.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5 pb-4">
      <div className="flex items-center justify-between pt-1">
        <h1 className="text-xl font-black text-[#1A1A1A]">Einkaufszettel</h1>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 text-sm font-bold text-[#1C4A2E] hover:text-[#2D6A4F] transition-colors print-show"
          aria-label="Einkaufszettel drucken"
        >
          <IconPrint className="w-4 h-4" />
          Drucken
        </button>
      </div>

      {unchecked.length > 0 && (
        <section>
          <p className="text-[10px] font-black text-[#6B7870] uppercase tracking-widest mb-3">
            Noch zu kaufen · {unchecked.length}
          </p>
          <ul className="space-y-2">
            {unchecked.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-[#DDE8DC] shadow-sm"
              >
                <button
                  onClick={() => toggleShoppingItem(item.name)}
                  className="w-6 h-6 flex-shrink-0 rounded-full border-2 border-[#1C4A2E] hover:bg-[#EDF4EF] transition-colors"
                  aria-label={`${item.name} als gekauft markieren`}
                />
                <span className="flex-1 font-semibold text-[#1A1A1A] text-sm">{item.name}</span>
                <span className="text-sm text-[#6B7870] font-medium">{item.amount} {item.unit}</span>
                <button
                  onClick={() => removeShoppingItem(item.name)}
                  className="text-[#6B7870] hover:text-red-500 transition-colors p-1"
                  aria-label={`${item.name} entfernen`}
                >
                  <IconTrash className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {checked.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-black text-[#6B7870] uppercase tracking-widest">
              Gekauft · {checked.length}
            </p>
            <button
              onClick={clearCheckedItems}
              className="text-xs text-[#1C4A2E] font-bold hover:underline"
            >
              Alle löschen
            </button>
          </div>
          <ul className="space-y-2">
            {checked.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-3 bg-[#EDF4EF] rounded-xl px-4 py-3 opacity-60"
              >
                <button
                  onClick={() => toggleShoppingItem(item.name)}
                  className="w-6 h-6 flex-shrink-0 rounded-full bg-[#1C4A2E] flex items-center justify-center"
                  aria-label={`${item.name} als nicht gekauft markieren`}
                >
                  <IconCheck className="w-3 h-3 text-white" />
                </button>
                <span className="flex-1 font-semibold text-[#6B7870] text-sm line-through">{item.name}</span>
                <span className="text-sm text-[#6B7870]">{item.amount} {item.unit}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <button
        onClick={clearShoppingList}
        className="w-full min-touch py-3 rounded-xl border-2 border-[#DDE8DC] text-[#6B7870] font-bold hover:bg-[#EDF4EF] transition-colors text-sm"
      >
        Zettel leeren
      </button>
    </div>
  )
}
