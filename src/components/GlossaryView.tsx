import { useState, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { GLOSSARY } from '@/data/glossary'
import { CATEGORIES } from '@/data/categories'
import type { CategoryKey } from '@/data/types'
import { useGlossarySearch } from '@/hooks/useGlossarySearch'
import { TermCard } from './TermCard'
import { cn } from '@/lib/utils'

export function GlossaryView() {
  const [query, setQuery] = useState('')
  const [activeCats, setActiveCats] = useState<Set<string>>(new Set())
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filtered = useGlossarySearch(GLOSSARY, query, activeCats)

  const toggleCat = useCallback((cat: string) => {
    setActiveCats(prev => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }, [])

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search terms, definitions..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100"
          >
            <X size={14} className="text-slate-400" />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {(Object.entries(CATEGORIES) as [CategoryKey, (typeof CATEGORIES)[CategoryKey]][]).map(
          ([key, val]) => (
            <button
              key={key}
              onClick={() => toggleCat(key)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                activeCats.has(key)
                  ? `${val.color} ring-1 ring-offset-1`
                  : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100',
              )}
            >
              <span
                className={cn(
                  'w-1.5 h-1.5 rounded-full',
                  activeCats.has(key) ? val.dot : 'bg-slate-300',
                )}
              />
              {val.label}
            </button>
          ),
        )}
        {activeCats.size > 0 && (
          <button
            onClick={() => setActiveCats(new Set())}
            className="text-xs text-slate-400 hover:text-slate-600 px-2"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-400">
        {filtered.length} of {GLOSSARY.length} terms
        {query && <span> matching &ldquo;{query}&rdquo;</span>}
      </p>

      {/* Cards */}
      <div className="space-y-2">
        {filtered.map(item => (
          <TermCard
            key={item.id}
            item={item}
            isExpanded={expandedId === item.id}
            onToggle={() =>
              setExpandedId(expandedId === item.id ? null : item.id)
            }
          />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 text-sm">No terms match your search</p>
            <button
              onClick={() => {
                setQuery('')
                setActiveCats(new Set())
              }}
              className="mt-2 text-teal-600 text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
