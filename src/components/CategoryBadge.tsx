import { CATEGORIES } from '@/data/categories'
import type { CategoryKey } from '@/data/types'
import { cn } from '@/lib/utils'

interface CategoryBadgeProps {
  cat: CategoryKey
  className?: string
}

export function CategoryBadge({ cat, className }: CategoryBadgeProps) {
  const config = CATEGORIES[cat]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.color,
        className,
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dot)} />
      {config.label}
    </span>
  )
}
