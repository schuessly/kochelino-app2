'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('kochelino-v1')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.favorites?.length > 0 || data.vorratItems?.length > 0) {
          router.replace('/rezepte')
          return
        }
      } catch { /* ignore */ }
    }
    router.replace('/onboarding')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="text-5xl mb-4">🍝</div>
        <p className="text-[#5F5E5A]">Einen Moment …</p>
      </div>
    </div>
  )
}
