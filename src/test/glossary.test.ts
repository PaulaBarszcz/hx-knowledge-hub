import { describe, it, expect } from 'vitest'
import { GLOSSARY, QUIZ_POOL } from '@/data/glossary'
import { CATEGORIES } from '@/data/categories'
import type { CategoryKey } from '@/data/types'

describe('Glossary data integrity', () => {
  it('has at least 80 terms', () => {
    expect(GLOSSARY.length).toBeGreaterThanOrEqual(80)
  })

  it('has unique IDs', () => {
    const ids = GLOSSARY.map(g => g.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has unique terms', () => {
    const terms = GLOSSARY.map(g => g.term)
    expect(new Set(terms).size).toBe(terms.length)
  })

  it('every entry has a valid category', () => {
    const validCats = Object.keys(CATEGORIES)
    GLOSSARY.forEach(entry => {
      expect(validCats).toContain(entry.cat)
    })
  })

  it('every entry has a non-empty term and definition', () => {
    GLOSSARY.forEach(entry => {
      expect(entry.term.trim().length).toBeGreaterThan(0)
      expect(entry.def.trim().length).toBeGreaterThan(0)
    })
  })

  it('covers all categories', () => {
    const usedCats = new Set(GLOSSARY.map(g => g.cat))
    Object.keys(CATEGORIES).forEach(cat => {
      expect(usedCats.has(cat as CategoryKey)).toBe(true)
    })
  })
})

describe('Quiz pool', () => {
  it('has at least 30 questions', () => {
    expect(QUIZ_POOL.length).toBeGreaterThanOrEqual(30)
  })

  it('every quiz has exactly 4 options', () => {
    QUIZ_POOL.forEach(entry => {
      expect(entry.quiz.opts).toHaveLength(4)
    })
  })

  it('every quiz answer index is valid (0-3)', () => {
    QUIZ_POOL.forEach(entry => {
      expect(entry.quiz.ans).toBeGreaterThanOrEqual(0)
      expect(entry.quiz.ans).toBeLessThanOrEqual(3)
    })
  })

  it('every quiz has a non-empty question', () => {
    QUIZ_POOL.forEach(entry => {
      expect(entry.quiz.q.trim().length).toBeGreaterThan(0)
    })
  })

  it('quiz options are all non-empty strings', () => {
    QUIZ_POOL.forEach(entry => {
      entry.quiz.opts.forEach(opt => {
        expect(typeof opt).toBe('string')
        expect(opt.trim().length).toBeGreaterThan(0)
      })
    })
  })
})
