import { ChevronRight } from 'lucide-react'
import type { GlossaryEntry } from '@/data/types'
import { CategoryBadge } from './CategoryBadge'
import { cn } from '@/lib/utils'

interface TermCardProps {
  item: GlossaryEntry
  isExpanded: boolean
  onToggle: () => void
}

export function TermCard({ item, isExpanded, onToggle }: TermCardProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'w-full text-left rounded-xl border transition-all duration-200 hover:shadow-md',
        isExpanded
          ? 'border-slate-300 bg-white shadow-md ring-1 ring-slate-200'
          : 'border-slate-200 bg-white hover:border-slate-300',
      )}
    >
      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-sm leading-tight">
              {item.term}
            </h3>
            {isExpanded && (
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                {item.def}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0 pt-0.5">
            <CategoryBadge cat={item.cat} />
            <ChevronRight
              size={16}
              className={cn(
                'text-slate-400 transition-transform duration-200',
                isExpanded && 'rotate-90',
              )}
            />
          </div>
        </div>
      </div>
    </button>
  )
}
