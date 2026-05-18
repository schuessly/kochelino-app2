'use client'

import { useState } from 'react'
import { useAppStore } from '@/stores/useAppStore'
import { ApiKeyDialog } from './ApiKeyDialog'
import { IconKey, IconFont } from '@/components/icons'

function KochelinoLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="18" cy="18" r="18" fill="#1C4A2E" />
      {/* Chef hat brim */}
      <rect x="9" y="22" width="18" height="3.5" rx="1.2" fill="white" />
      {/* Gold stripe on brim */}
      <rect x="9" y="22" width="18" height="1.2" rx="0.6" fill="#F2A20C" />
      {/* Hat puffs */}
      <circle cx="13" cy="19" r="4.2" fill="white" />
      <circle cx="18" cy="17" r="4.8" fill="white" />
      <circle cx="23" cy="19" r="4.2" fill="white" />
      <rect x="10" y="19" width="16" height="4" fill="white" />
      {/* Spoon handle peeking out */}
      <line x1="25" y1="27" x2="28" y2="30" stroke="#F2A20C" strokeWidth="2.2" strokeLinecap="round" />
      <ellipse cx="24.2" cy="26.2" rx="2.1" ry="1.4" transform="rotate(-45 24.2 26.2)" fill="#F2A20C" />
    </svg>
  )
}

export function TopBar() {
  const isGrosserModus = useAppStore((s) => s.isGrosserModus)
  const toggleGrosserModus = useAppStore((s) => s.toggleGrosserModus)
  const geminiApiKey = useAppStore((s) => s.geminiApiKey)
  const [keyDialogOpen, setKeyDialogOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F8F7F2] border-b border-[#DDE8DC] no-print">
        <div className="flex items-center justify-between max-w-2xl mx-auto px-4 h-14">
          <div className="flex items-center gap-2.5">
            <KochelinoLogo />
            <span className="font-black text-[1.15rem] text-[#1C4A2E] tracking-tight leading-none">
              Kochelino
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setKeyDialogOpen(true)}
              className="min-touch flex items-center justify-center w-10 h-10 rounded-xl border border-[#DDE8DC] hover:bg-[#EDF4EF] transition-colors"
              aria-label="API-Key eingeben"
              title={geminiApiKey ? 'API-Key gespeichert' : 'API-Key fehlt'}
            >
              <IconKey
                className={`w-4.5 h-4.5 ${geminiApiKey ? 'text-[#1C4A2E]' : 'text-[#6B7870]'}`}
              />
            </button>
            <button
              onClick={toggleGrosserModus}
              className="min-touch flex items-center justify-center w-10 h-10 rounded-xl border border-[#DDE8DC] hover:bg-[#EDF4EF] transition-colors"
              aria-label={isGrosserModus ? 'Normaler Modus' : 'Großer Modus einschalten'}
              title={isGrosserModus ? 'Großer Modus: AN' : 'Großer Modus: AUS'}
            >
              <IconFont className={`w-4.5 h-4.5 ${isGrosserModus ? 'text-[#1C4A2E]' : 'text-[#6B7870]'}`} />
            </button>
          </div>
        </div>
      </header>
      <ApiKeyDialog open={keyDialogOpen} onClose={() => setKeyDialogOpen(false)} />
    </>
  )
}
