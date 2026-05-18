import type { PantryItem, DeductionResult } from '@/types/pantry'
import type { RecipeIngredient } from '@/types/recipe'

const CONVERSIONS: Record<string, Record<string, number>> = {
  g:  { kg: 0.001 },
  kg: { g: 1000 },
  ml: { l: 0.001 },
  l:  { ml: 1000 },
  EL: { TL: 3, ml: 15 },
  TL: { EL: 1 / 3, ml: 5 },
}

function convertToUnit(amount: number, fromUnit: string, toUnit: string): number | null {
  if (fromUnit === toUnit) return amount
  const factor = CONVERSIONS[fromUnit]?.[toUnit]
  if (factor !== undefined) return amount * factor
  return null
}

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/s$/, '')
    .trim()
}

function findPantryMatch(pantryItems: PantryItem[], ingredientName: string): PantryItem | undefined {
  const normalizedIngredient = normalizeName(ingredientName)
  return pantryItems.find((item) => {
    const normalizedItem = normalizeName(item.name)
    return (
      normalizedItem === normalizedIngredient ||
      normalizedItem.includes(normalizedIngredient) ||
      normalizedIngredient.includes(normalizedItem)
    )
  })
}

export function deductIngredients(
  pantryItems: PantryItem[],
  ingredients: RecipeIngredient[]
): DeductionResult {
  const updatedMap = new Map<string, PantryItem>(pantryItems.map((i) => [i.id, { ...i }]))
  const usedUp: string[] = []
  const lowStock: string[] = []
  const notFound: string[] = []

  for (const ingredient of ingredients) {
    const match = findPantryMatch(pantryItems, ingredient.name)
    if (!match) {
      notFound.push(ingredient.name)
      continue
    }

    let amountToDeduct = ingredient.amount
    const pantryItem = updatedMap.get(match.id)!

    if (ingredient.unit !== pantryItem.unit) {
      const converted = convertToUnit(ingredient.amount, ingredient.unit, pantryItem.unit)
      if (converted === null) {
        notFound.push(ingredient.name)
        continue
      }
      amountToDeduct = converted
    }

    const newQuantity = Math.max(0, pantryItem.quantity - amountToDeduct)
    updatedMap.set(match.id, { ...pantryItem, quantity: newQuantity, lastUpdated: Date.now() })

    if (newQuantity === 0) usedUp.push(match.name)
    else if (match.lowThreshold !== undefined && newQuantity <= match.lowThreshold) {
      lowStock.push(match.name)
    }
  }

  return {
    updated: Array.from(updatedMap.values()),
    usedUp,
    lowStock,
    notFound,
  }
}
