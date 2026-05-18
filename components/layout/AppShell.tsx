'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useAppStore } from '@/stores/useAppStore'
import { Toaster } from '@/components/ui/sonner'

const TopBar = dynamic(() => import('./TopBar').then((m) => ({ default: m.TopBar })), { ssr: false })
const BottomNav = dynamic(() => import('./BottomNav').then((m) => ({ default: m.BottomNav })), { ssr: false })

export function AppShell({ children }: { children: React.ReactNode }) {
  const isGrosserModus = useAppStore((s) => s.isGrosserModus)

  useEffect(() => {
    useAppStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('groesser', isGrosserModus)
  }, [isGrosserModus])

  return (
    <>
      <TopBar />
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 pb-24 pt-4">
        {children}
      </main>
      <BottomNav />
      <Toaster position="bottom-center" richColors />
    </>
  )
}
