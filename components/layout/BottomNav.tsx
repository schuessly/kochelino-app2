'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppStore } from '@/stores/useAppStore'
import { IconUtensils, IconPantry, IconHeart, IconShoppingBag } from '@/components/icons'

const NAV_ITEMS = [
  { href: '/rezepte', label: 'Rezepte', Icon: IconUtensils },
  { href: '/vorrat', label: 'Vorrat', Icon: IconPantry },
  { href: '/lieblinge', label: 'Lieblinge', Icon: IconHeart },
  { href: '/einkaufszettel', label: 'Einkaufen', Icon: IconShoppingBag },
]

export function BottomNav() {
  const pathname = usePathname()
  const vorratItems = useAppStore((s) => s.vorratItems)
  const favoriteCount = useAppStore((s) => s.favorites.length)
  const lowStockCount = vorratItems.filter(
    (i) => i.lowThreshold !== undefined && i.quantity <= i.lowThreshold
  ).length

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#142219] border-t border-[#DDE8DC] dark:border-[#1E3328] safe-area-pb"
      role="navigation"
      aria-label="Hauptnavigation"
    >
      <ul className="flex items-stretch max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const badge =
            item.href === '/vorrat' && lowStockCount > 0
              ? lowStockCount
              : item.href === '/lieblinge' && favoriteCount > 0
              ? favoriteCount
              : 0

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 min-h-[56px] w-full relative transition-colors ${
                  isActive ? 'text-[#1C4A2E] dark:text-[#5DB879]' : 'text-[#6B7870] dark:text-[#7FA88A]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="relative">
                  <item.Icon className="w-5 h-5" />
                  {badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#F2A20C] text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                      {badge}
                    </span>
                  )}
                </span>
                <span
                  className={`text-[10px] font-bold tracking-wide ${
                    isActive ? 'text-[#1C4A2E] dark:text-[#5DB879]' : 'text-[#6B7870] dark:text-[#7FA88A]'
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-[#1C4A2E] dark:bg-[#5DB879]" />
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
