import { GoogleGenAI } from '@google/genai'

export function getGeminiModel(apiKey: string) {
  const ai = new GoogleGenAI({ apiKey })
  return ai
}

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
      maxOutputTokens: 4096,
    },
  })
  return response.text ?? ''
}
