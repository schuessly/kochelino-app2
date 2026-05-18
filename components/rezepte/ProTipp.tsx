import type { ProTipp as ProTippType } from '@/types/recipe'
import { IconSparkle, IconCartPlus } from '@/components/icons'

interface ProTippProps {
  proTipp: ProTippType
}

export function ProTipp({ proTipp }: ProTippProps) {
  if (!proTipp.text) return null

  return (
    <section
      role="complementary"
      aria-label="Pro-Tipp vom Koch"
      className="mt-6 rounded-2xl overflow-hidden border border-[#F2A20C]/30"
    >
      <div className="bg-gradient-to-br from-[#FEF9EC] to-[#FEF3D0] dark:from-[#2A1F00]/50 dark:to-[#1F1600]/50 px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-[#F2A20C] flex items-center justify-center flex-shrink-0">
            <IconSparkle className="w-3.5 h-3.5 text-white" />
          </div>
          <p className="font-black text-[#B07D0A] dark:text-[#F2A20C] text-sm uppercase tracking-widest">Pro-Tipp</p>
        </div>
        <p className="text-[#1A1A1A] dark:text-[#F0EDE6] text-sm leading-relaxed font-medium">{proTipp.text}</p>
        {proTipp.extraIngredients && proTipp.extraIngredients.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {proTipp.extraIngredients.map((extra) => (
              <div
                key={extra.name}
                className="flex items-center gap-2 bg-white dark:bg-[#1A2E20] border border-[#F2A20C]/40 rounded-full px-3 py-1.5 shadow-sm"
                title={extra.reason}
              >
                <IconCartPlus className="w-3 h-3 text-[#B07D0A] dark:text-[#F2A20C]" />
                <span className="text-xs font-bold text-[#1A1A1A] dark:text-[#F0EDE6]">{extra.name}</span>
                <span className="text-xs text-[#6B7870] dark:text-[#7FA88A]">einkaufen</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
