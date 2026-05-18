'use client'

import { useState, useRef, useEffect } from 'react'
import { useAppStore } from '@/stores/useAppStore'
import { toast } from 'sonner'
import { IconKey } from '@/components/icons'

export function ApiKeyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const geminiApiKey = useAppStore((s) => s.geminiApiKey)
  const setGeminiApiKey = useAppStore((s) => s.setGeminiApiKey)
  const [draft, setDraft] = useState(geminiApiKey)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setDraft(geminiApiKey)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open, geminiApiKey])

  if (!open) return null

  function handleSave() {
    const trimmed = draft.trim()
    if (!trimmed) {
      toast.error('Bitte einen API-Key eingeben.')
      return
    }
    setGeminiApiKey(trimmed)
    toast.success('API-Key gespeichert.')
    onClose()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Gemini API-Key eingeben"
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-md bg-white dark:bg-[#142219] rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EDF4EF] dark:bg-[#1A2E20] flex items-center justify-center">
            <IconKey className="w-5 h-5 text-[#1C4A2E]" />
          </div>
          <div>
            <h2 className="text-base font-black text-[#1A1A1A] dark:text-[#F0EDE6] leading-tight">Gemini API-Key</h2>
            <p className="text-xs text-[#6B7870] dark:text-[#7FA88A]">Einmal eingeben, dauerhaft gespeichert</p>
          </div>
        </div>

        <p className="text-sm text-[#6B7870] dark:text-[#7FA88A] leading-relaxed">
          Dein Key wird ausschließlich in diesem Browser gespeichert und niemals an Dritte weitergegeben.
          Kostenlos erhältlich unter{' '}
          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1C4A2E] dark:text-[#5DB879] font-bold underline underline-offset-2"
          >
            aistudio.google.com
          </a>
          .
        </p>

        <div className="space-y-2">
          <input
            ref={inputRef}
            type="password"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="AIza..."
            className="w-full min-h-[48px] px-4 py-3 rounded-xl border-2 border-[#DDE8DC] dark:border-[#1E3328] focus:border-[#1C4A2E] dark:focus:border-[#5DB879] focus:outline-none font-mono text-sm bg-[#F8F7F2] dark:bg-[#1A2E20] dark:text-[#F0EDE6] transition-colors"
            aria-label="Gemini API-Key"
            autoComplete="off"
            spellCheck={false}
          />
          {geminiApiKey && (
            <p className="text-xs text-[#2D6A4F] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] inline-block" />
              Key gespeichert ({geminiApiKey.slice(0, 8)}…)
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 min-h-[48px] rounded-xl border-2 border-[#DDE8DC] dark:border-[#1E3328] text-[#1A1A1A] dark:text-[#F0EDE6] font-bold hover:bg-[#EDF4EF] dark:hover:bg-[#1A2E20] transition-colors text-sm"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            className="flex-1 min-h-[48px] rounded-xl bg-[#1C4A2E] text-white font-black hover:bg-[#2D6A4F] transition-colors text-sm"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  )
}
