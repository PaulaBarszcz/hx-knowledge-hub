export type CategoryKey =
  | 'company'
  | 'platform'
  | 'basics'
  | 'pricing'
  | 'reinsurance'
  | 'roles'
  | 'insurtech'

export interface QuizItem {
  q: string
  opts: [string, string, string, string]
  ans: 0 | 1 | 2 | 3
}

export interface GlossaryEntry {
  id: number
  term: string
  def: string
  cat: CategoryKey
  quiz?: QuizItem
}

export interface CategoryConfig {
  label: string
  color: string
  dot: string
}

export interface QuizAnswer {
  term: string
  question: string
  picked: number
  correct: number
  isCorrect: boolean
}
