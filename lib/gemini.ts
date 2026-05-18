import { GoogleGenAI } from '@google/genai'

export async function generateContent(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey })
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      { role: 'user', parts: [{ text: systemPrompt + '\n\n' + userPrompt }] }
    ],
    config: {
      responseMimeType: 'application/json',
      temperature: 0.8,
      maxOutputTokens: 8192,
      thinkingConfig: { thinkingBudget: 0 },
    },
  })

  const text = response.text
  if (!text) throw new Error('Leere Antwort von Gemini.')
  return text
}
