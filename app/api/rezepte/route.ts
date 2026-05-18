import { NextRequest, NextResponse } from 'next/server'
import { getGeminiModel } from '@/lib/gemini'
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
    return NextResponse.json({ error: 'Kein Gemini API-Key konfiguriert. Bitte in den Einstellungen eintragen.' }, { status: 401 })
  }

  try {
    const model = getGeminiModel(apiKey)
    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: buildRecipePrompt(body) },
    ])
    const text = result.response.text()
    const recipes = parseRecipes(text)

    if (recipes.length === 0) {
      return NextResponse.json({ error: 'Keine Rezepte generiert. Bitte versuche es erneut.' }, { status: 503 })
    }

    return NextResponse.json({ recipes })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unbekannter Fehler'
    console.error('Gemini error:', message)
    if (message.includes('API_KEY') || message.includes('not set') || message.includes('API key')) {
      return NextResponse.json({ error: 'API-Key ungültig. Bitte prüfe deinen Gemini Key.' }, { status: 401 })
    }
    if (message.includes('quota') || message.includes('429')) {
      return NextResponse.json({ error: 'API-Limit erreicht. Bitte warte kurz und versuche es erneut.' }, { status: 429 })
    }
    return NextResponse.json({ error: `Fehler: ${message.slice(0, 120)}` }, { status: 503 })
  }
}
