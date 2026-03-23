import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useGlossarySearch } from '@/hooks/useGlossarySearch'
import type { GlossaryEntry } from '@/data/types'

const MOCK_DATA: GlossaryEntry[] = [
  { id: 1, term: 'hx Renew', def: 'The flagship SaaS pricing platform', cat: 'platform' },
  { id: 2, term: 'P&C Insurance', def: 'Property and Casualty insurance', cat: 'basics' },
  { id: 3, term: 'Underwriting', def: 'Evaluating, selecting, and pricing risks', cat: 'pricing' },
  { id: 4, term: 'Lloyd\'s of London', def: 'The specialist insurance marketplace', cat: 'roles' },
  { id: 5, term: 'Reinsurance', def: 'Insurance for insurance companies', cat: 'reinsurance' },
]

describe('useGlossarySearch', () => {
  it('returns all items when query is empty and no categories selected', () => {
    const { result } = renderHook(() =>
      useGlossarySearch(MOCK_DATA, '', new Set()),
    )
    expect(result.current).toHaveLength(5)
  })

  it('filters by search query in term', () => {
    const { result } = renderHook(() =>
      useGlossarySearch(MOCK_DATA, 'renew', new Set()),
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0]!.term).toBe('hx Renew')
  })

  it('filters by search query in definition', () => {
    const { result } = renderHook(() =>
      useGlossarySearch(MOCK_DATA, 'marketplace', new Set()),
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0]!.term).toBe('Lloyd\'s of London')
  })

  it('supports multi-word search (all words must match)', () => {
    const { result } = renderHook(() =>
      useGlossarySearch(MOCK_DATA, 'insurance property', new Set()),
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0]!.term).toBe('P&C Insurance')
  })

  it('filters by category', () => {
    const { result } = renderHook(() =>
      useGlossarySearch(MOCK_DATA, '', new Set(['pricing'])),
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0]!.cat).toBe('pricing')
  })

  it('filters by multiple categories', () => {
    const { result } = renderHook(() =>
      useGlossarySearch(MOCK_DATA, '', new Set(['pricing', 'basics'])),
    )
    expect(result.current).toHaveLength(2)
  })

  it('combines search query and category filter', () => {
    const { result } = renderHook(() =>
      useGlossarySearch(MOCK_DATA, 'insurance', new Set(['reinsurance'])),
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0]!.term).toBe('Reinsurance')
  })

  it('returns empty array when nothing matches', () => {
    const { result } = renderHook(() =>
      useGlossarySearch(MOCK_DATA, 'xyznonexistent', new Set()),
    )
    expect(result.current).toHaveLength(0)
  })

  it('is case-insensitive', () => {
    const { result } = renderHook(() =>
      useGlossarySearch(MOCK_DATA, 'HX RENEW', new Set()),
    )
    expect(result.current).toHaveLength(1)
  })
})
