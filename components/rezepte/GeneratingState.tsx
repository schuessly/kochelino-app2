import { IconChefHat } from '@/components/icons'

export function GeneratingState() {
  return (
    <div className="space-y-4" aria-live="polite" aria-label="Rezepte werden generiert">
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#EDF4EF] dark:bg-[#1A2E20] flex items-center justify-center animate-pulse">
          <IconChefHat className="w-8 h-8 text-[#1C4A2E] dark:text-[#5DB879]" />
        </div>
        <p className="font-black text-[#1A1A1A] dark:text-[#F0EDE6] text-lg">Kochelino kocht für dich …</p>
        <p className="text-[#6B7870] dark:text-[#7FA88A] text-sm mt-1">Gleich sind deine Rezepte fertig!</p>
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white dark:bg-[#142219] rounded-2xl overflow-hidden border border-[#DDE8DC] dark:border-[#1E3328] animate-pulse">
          <div className="h-24 bg-gradient-to-br from-[#DDE8DC] dark:from-[#1E3328] to-[#E8EDE9] dark:to-[#1A2E20]" />
          <div className="px-4 py-3">
            <div className="h-4 bg-[#E8EDE9] dark:bg-[#1E3328] rounded w-3/4 mb-3" />
            <div className="h-3 bg-[#E8EDE9] dark:bg-[#1E3328] rounded w-full mb-2" />
            <div className="h-3 bg-[#E8EDE9] dark:bg-[#1E3328] rounded w-5/6 mb-3" />
            <div className="flex gap-2">
              <div className="h-5 bg-[#E8EDE9] dark:bg-[#1E3328] rounded-full w-16" />
              <div className="h-5 bg-[#E8EDE9] dark:bg-[#1E3328] rounded-full w-20" />
            </div>
          </div>
          <div className="h-4" />
        </div>
      ))}
    </div>
  )
}
