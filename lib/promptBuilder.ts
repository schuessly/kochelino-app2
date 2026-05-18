import type { DietFilter } from '@/types/filters'

export interface GenerateRequest {
  ingredients: string[]
  portions: number
  dietFilters: DietFilter[]
}

export function buildRecipePrompt(req: GenerateRequest): string {
  const portionText = `${req.portions} ${req.portions === 1 ? 'Person' : 'Personen'}`
  const filterText = req.dietFilters.length > 0
    ? `Ernährungsweise: ${req.dietFilters.join(', ')}.`
    : ''

  return `Ich habe folgende Zutaten: ${req.ingredients.join(', ')}.
Koche für ${portionText}.
${filterText}

Erstelle 4 kreative, alltagstaugliche Rezepte auf Deutsch.
Antworte NUR mit einem JSON-Array ohne weiteren Text, im exakten Format:

[
  {
    "id": "slug-des-titels",
    "title": "Rezepttitel",
    "description": "2-3 appetitliche Sätze",
    "timeMinutes": 30,
    "difficulty": "Einfach",
    "servings": ${req.portions},
    "tags": ["Vegetarisch"],
    "ingredients": [
      { "name": "Zutat", "amount": 200, "unit": "g", "note": null }
    ],
    "steps": ["Schritt 1: ...", "Schritt 2: ..."],
    "nutrition": { "kcal": 450, "protein": 25, "carbs": 40, "fat": 18 },
    "proTipp": {
      "text": "So wird's noch besser: ...",
      "extraIngredients": [{ "name": "Zutat", "reason": "Warum sie das Gericht verbessert" }]
    }
  }
]

Wichtig:
- difficulty ist immer "Einfach", "Mittel" oder "Anspruchsvoll"
- unit ist immer einer von: g, kg, ml, l, Stück, EL, TL, Prise, Bund, Scheibe, Zehe, Dose
- proTipp.text beginnt immer mit "So wird's noch besser:"
- proTipp.extraIngredients darf leer sein ([]) wenn keine Verbesserung nötig ist
- Antworte NUR mit dem JSON-Array, kein weiterer Text`
}

export const SYSTEM_PROMPT = `Du bist Kochelino, ein freundlicher, warmherziger Kochassistent mit leicht italienischer Inspiration.
Du sprichst immer auf Deutsch, verwendest die Du-Form und schreibst kurze, einladende Sätze.
Antworte ausschließlich mit gültigem JSON ohne Markdown-Code-Blöcke.`
