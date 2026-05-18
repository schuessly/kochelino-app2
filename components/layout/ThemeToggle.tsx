'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { IconSun, IconMoon, IconMonitor } from '@/components/icons'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div className="w-10 h-10" />

  const cycle = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const Icon = theme === 'light' ? IconSun : theme === 'dark' ? IconMoon : IconMonitor
  const label = theme === 'light' ? 'Hell' : theme === 'dark' ? 'Dunkel' : 'System'

  return (
    <button
      onClick={cycle}
      className="min-touch flex items-center justify-center w-10 h-10 rounded-xl border border-[#DDE8DC] dark:border-[#1E3328] hover:bg-[#EDF4EF] dark:hover:bg-[#1A2E20] transition-colors"
      aria-label={`Darstellung: ${label}`}
      title={`Darstellung: ${label}`}
    >
      <Icon className="w-4.5 h-4.5 text-[#1C4A2E] dark:text-[#5DB879]" />
    </button>
  )
}
