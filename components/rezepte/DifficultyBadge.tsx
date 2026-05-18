import { IconStar } from '@/components/icons'

interface DifficultyBadgeProps {
  difficulty: 'Einfach' | 'Mittel' | 'Anspruchsvoll'
}

const CONFIG = {
  Einfach: { stars: 1, className: 'bg-[#EDF4EF] dark:bg-[#1A2E20] text-[#2D6A4F] dark:text-[#5DB879]' },
  Mittel: { stars: 2, className: 'bg-[#FEF9EC] dark:bg-[#2A1F00]/40 text-[#B07D0A] dark:text-[#F2A20C]' },
  Anspruchsvoll: { stars: 3, className: 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400' },
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const { stars, className } = CONFIG[difficulty]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${className}`}>
      {Array.from({ length: stars }).map((_, i) => (
        <IconStar key={i} className="w-2.5 h-2.5" filled />
      ))}
      {difficulty}
    </span>
  )
}
