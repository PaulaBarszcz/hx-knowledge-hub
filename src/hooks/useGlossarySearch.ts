import { useMemo } from 'react'
import type { GlossaryEntry } from '@/data/types'

function fuzzyMatch(text: string, query: string): boolean {
  const t = text.toLowerCase()
  const q = query.toLowerCase().trim()
  if (!q) return true
  return q.split(/\s+/).every(word => t.includes(word))
}

export function useGlossarySearch(
  glossary: GlossaryEntry[],
  query: string,
  activeCats: Set<string>,
) {
  return useMemo(() => {
    return glossary.filter(item => {
      const matchesSearch = fuzzyMatch(`${item.term} ${item.def}`, query)
      const matchesCat = activeCats.size === 0 || activeCats.has(item.cat)
      return matchesSearch && matchesCat
    })
  }, [glossary, query, activeCats])
}
