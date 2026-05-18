import type { Recipe } from '@/types/recipe'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

function stripMarkdown(text: string): string {
  return text
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim()
}

const VALID_UNITS = new Set(['g', 'kg', 'ml', 'l', 'Stück', 'EL', 'TL', 'Prise', 'Bund', 'Scheibe', 'Zehe', 'Dose'])
const VALID_DIFFICULTIES = new Set(['Einfach', 'Mittel', 'Anspruchsvoll'])

function validateRecipe(raw: unknown): Recipe | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>

  if (typeof r.title !== 'string' || !r.title) return null
  if (!Array.isArray(r.ingredients) || r.ingredients.length === 0) return null
  if (!Array.isArray(r.steps) || r.steps.length === 0) return null

  const difficulty = VALID_DIFFICULTIES.has(r.difficulty as string)
    ? (r.difficulty as Recipe['difficulty'])
    : 'Einfach'

  const ingredients = (r.ingredients as unknown[])
    .filter((i): i is Record<string, unknown> => !!i && typeof i === 'object')
    .map((i) => ({
      name: String(i.name ?? ''),
      amount: Number(i.amount ?? 0),
      unit: VALID_UNITS.has(i.unit as string) ? (i.unit as Recipe['ingredients'][0]['unit']) : 'Stück' as const,
      note: i.note ? String(i.note) : null,
    }))
    .filter((i) => i.name)

  const steps = (r.steps as unknown[]).map(String).filter(Boolean)

  const nutrition = r.nutrition && typeof r.nutrition === 'object'
    ? {
        kcal: Math.max(0, Number((r.nutrition as Record<string, unknown>).kcal ?? 0)),
        protein: Math.max(0, Number((r.nutrition as Record<string, unknown>).protein ?? 0)),
        carbs: Math.max(0, Number((r.nutrition as Record<string, unknown>).carbs ?? 0)),
        fat: Math.max(0, Number((r.nutrition as Record<string, unknown>).fat ?? 0)),
      }
    : { kcal: 0, protein: 0, carbs: 0, fat: 0 }

  const proTippRaw = r.proTipp && typeof r.proTipp === 'object' ? (r.proTipp as Record<string, unknown>) : {}
  const proTipp = {
    text: String(proTippRaw.text ?? 'Guten Appetit!'),
    extraIngredients: Array.isArray(proTippRaw.extraIngredients)
      ? (proTippRaw.extraIngredients as unknown[])
          .filter((e): e is Record<string, unknown> => !!e && typeof e === 'object')
          .map((e) => ({ name: String(e.name ?? ''), reason: String(e.reason ?? '') }))
          .filter((e) => e.name)
      : [],
  }

  const title = String(r.title)
  return {
    id: String(r.id ?? slugify(title)),
    title,
    description: String(r.description ?? ''),
    timeMinutes: Math.max(5, Math.min(300, Number(r.timeMinutes ?? 30))),
    difficulty,
    servings: Math.max(1, Math.min(12, Number(r.servings ?? 2))),
    tags: Array.isArray(r.tags) ? r.tags.map(String) : [],
    ingredients,
    steps,
    nutrition,
    proTipp,
    generatedAt: Date.now(),
  }
}

export function parseRecipes(raw: string): Recipe[] {
  const cleaned = stripMarkdown(raw)
  let parsed: unknown

  try {
    parsed = JSON.parse(cleaned)
  } catch {
    const arrayMatch = cleaned.match(/\[[\s\S]*\]/)
    if (!arrayMatch) return []
    try {
      parsed = JSON.parse(arrayMatch[0])
    } catch {
      return []
    }
  }

  if (!Array.isArray(parsed)) return []

  return parsed
    .map(validateRecipe)
    .filter((r): r is Recipe => r !== null)
    .slice(0, 6)
}
