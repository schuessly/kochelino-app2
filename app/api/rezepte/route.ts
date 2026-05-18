import { NextRequest, NextResponse } from 'next/server'
import { generateContent } from '@/lib/gemini'
import { buildRecipePrompt, SYSTEM_PROMPT, type GenerateRequest } from '@/lib/promptBuilder'
import { parseRecipes } from '@/lib/recipeParser'

export async function POST(req: NextRequest) {
  let body: GenerateRequest
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
  }

  if (!body.ingredients || body.ingredients.length === 0) {
    return NextResponse.json({ error: 'Bitte mindestens eine Zutat angeben.' }, { status: 422 })
  }

  const apiKey = req.headers.get('x-gemini-key') || process.env.GEMINI_API_KEY || ''
  if (!apiKey) {
    return NextResponse.json({ error: 'Kein Gemini API-Key konfiguriert. Bitte oben rechts den Schlüssel eintragen.' }, { status: 401 })
  }

  try {
    const text = await generateContent(apiKey, SYSTEM_PROMPT, buildRecipePrompt(body))
    const recipes = parseRecipes(text)

    if (recipes.length === 0) {
      return NextResponse.json({ error: 'Keine Rezepte generiert. Bitte erneut versuchen.' }, { status: 503 })
    }

    return NextResponse.json({ recipes })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unbekannter Fehler'
    console.error('Gemini error:', message)
    if (message.toLowerCase().includes('api key') || message.toLowerCase().includes('api_key') || message.includes('401')) {
      return NextResponse.json({ error: 'API-Key ungültig. Bitte prüfe deinen Gemini Key.' }, { status: 401 })
    }
    return NextResponse.json({ error: `Fehler: ${message.slice(0, 200)}` }, { status: 503 })
  }
}
