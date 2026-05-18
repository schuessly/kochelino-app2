'use client'

interface IngredientChipProps {
  name: string
  onRemove: (name: string) => void
}

export function IngredientChip({ name, onRemove }: IngredientChipProps) {
  return (
    <li className="flex items-center gap-1 bg-[#D85A30] text-white text-sm font-semibold px-3 py-1.5 rounded-full">
      <span>{name}</span>
      <button
        onClick={() => onRemove(name)}
        className="ml-1 w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
        aria-label={`${name} entfernen`}
      >
        ×
      </button>
    </li>
  )
}
