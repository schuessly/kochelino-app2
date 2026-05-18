import { GoogleGenerativeAI } from '@google/generative-ai'

export function getGeminiModel(apiKey: string) {
  const client = new GoogleGenerativeAI(apiKey)
  return client.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.8,
      maxOutputTokens: 4096,
    },
  })
}
