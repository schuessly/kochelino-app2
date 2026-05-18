'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/stores/useAppStore'
import { IngredientInput } from '@/components/ingredients/IngredientInput'
import { PortionSlider } from '@/components/filters/PortionSlider'
import { DietFilterBar } from '@/components/filters/DietFilterBar'
import { toast } from 'sonner'
import { IconChefHat, IconUsers, IconHeart } from '@/components/icons'

const STEPS = [
  {
    title: 'Was hast du?',
    subtitle: 'Gib ein, was in deinem Kühlschrank und Vorratsschrank ist.',
    Icon: IconChefHat,
  },
  {
    title: 'Für wen kochst du?',
    subtitle: 'Wie viele hungrige Menschen warten auf dich?',
    Icon: IconUsers,
  },
  {
    title: 'Was magst du?',
    subtitle: 'Wähle deine Ernährungswünsche — alles optional.',
    Icon: IconHeart,
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  const selectedIngredients = useAppStore((s) => s.selectedIngredients)
  const portions = useAppStore((s) => s.portions)
  const dietFilters = useAppStore((s) => s.dietFilters)
  const geminiApiKey = useAppStore((s) => s.geminiApiKey)
  const setRecipes = useAppStore((s) => s.setRecipes)
  const setError = useAppStore((s) => s.setError)

  const canProceed = step !== 0 || selectedIngredients.length >= 1
  const CurrentIcon = STEPS[step].Icon

  async function handleFinish() {
    setIsGenerating(true)
    try {
      const res = await fetch('/api/rezepte', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-gemini-key': geminiApiKey },
        body: JSON.stringify({ ingredients: selectedIngredients, portions, dietFilters }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Fehler')
      setRecipes(data.recipes)
      router.push('/rezepte')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unbekannter Fehler'
      toast.error(msg)
      setError(msg)
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Progress */}
      <div className="flex gap-1.5 items-center">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < step ? 'bg-[#1C4A2E]' : i === step ? 'bg-[#F2A20C]' : 'bg-[#DDE8DC]'
            }`}
          />
        ))}
      </div>

      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#EDF4EF] flex items-center justify-center">
          <CurrentIcon className="w-7 h-7 text-[#1C4A2E]" />
        </div>
        <div>
          <p className="text-xs font-black text-[#6B7870] uppercase tracking-widest mb-1">
            Schritt {step + 1} von {STEPS.length}
          </p>
          <h1 className="text-2xl font-black text-[#1A1A1A] leading-tight">{STEPS[step].title}</h1>
          <p className="text-[#6B7870] text-sm mt-1">{STEPS[step].subtitle}</p>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#DDE8DC]">
        {step === 0 && <IngredientInput />}
        {step === 1 && (
          <div className="space-y-2">
            <p className="text-sm font-black text-[#1A1A1A] mb-4">Anzahl Personen</p>
            <PortionSlider />
          </div>
        )}
        {step === 2 && <DietFilterBar />}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex-1 min-touch py-3 rounded-xl border-2 border-[#DDE8DC] text-[#1A1A1A] font-bold text-base hover:bg-[#EDF4EF] transition-colors"
          >
            Zurück
          </button>
        )}
        {step < 2 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed}
            className="flex-1 min-touch py-3 rounded-xl bg-[#1C4A2E] text-white font-black text-base disabled:opacity-40 hover:bg-[#2D6A4F] transition-colors"
          >
            Weiter
          </button>
        ) : (
          <button
            onClick={handleFinish}
            disabled={isGenerating || selectedIngredients.length === 0}
            className="flex-1 min-touch py-3 rounded-xl bg-[#1C4A2E] text-white font-black text-base disabled:opacity-40 hover:bg-[#2D6A4F] transition-colors"
          >
            {isGenerating ? 'Wird gekocht …' : 'Rezepte generieren'}
          </button>
        )}
      </div>

      {step === 0 && selectedIngredients.length === 0 && (
        <p className="text-center text-xs text-[#6B7870]">
          Gib mindestens eine Zutat ein, um fortzufahren.
        </p>
      )}
    </div>
  )
}
