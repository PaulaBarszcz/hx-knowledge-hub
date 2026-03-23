import { useState, useCallback } from 'react'
import {
  Brain,
  ChevronRight,
  Check,
  X,
  Copy,
  Printer,
  RotateCcw,
  Target,
  BookOpen,
} from 'lucide-react'
import { GLOSSARY, QUIZ_POOL } from '@/data/glossary'
import type { GlossaryEntry, QuizAnswer } from '@/data/types'
import { shuffleArray } from '@/lib/shuffle'
import { buildResultsText, copyToClipboard, openPrintWindow } from '@/lib/exportResults'
import { cn } from '@/lib/utils'

type Phase = 'setup' | 'playing' | 'results'
type CopyStatus = 'idle' | 'copied' | 'failed'

type QuizEntry = GlossaryEntry & { quiz: NonNullable<GlossaryEntry['quiz']> }

export function QuizView() {
  const [phase, setPhase] = useState<Phase>('setup')
  const [questions, setQuestions] = useState<QuizEntry[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')

  const startQuiz = useCallback((n: number) => {
    const pool = shuffleArray(QUIZ_POOL).slice(0, Math.min(n, QUIZ_POOL.length))
    setQuestions(pool)
    setCurrent(0)
    setAnswers([])
    setSelected(null)
    setRevealed(false)
    setCopyStatus('idle')
    setPhase('playing')
  }, [])

  const handleSelect = useCallback(
    (idx: number) => {
      if (revealed) return
      setSelected(idx)
      setRevealed(true)
      const q = questions[current]!
      setAnswers(prev => [
        ...prev,
        {
          term: q.term,
          question: q.quiz.q,
          picked: idx,
          correct: q.quiz.ans,
          isCorrect: idx === q.quiz.ans,
        },
      ])
    },
    [revealed, questions, current],
  )

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      setPhase('results')
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setRevealed(false)
    }
  }, [current, questions.length])

  const score = answers.filter(a => a.isCorrect).length
  const wrong = answers.filter(a => !a.isCorrect)

  const handleCopy = useCallback(async () => {
    const text = buildResultsText(score, answers, wrong)
    const ok = await copyToClipboard(text)
    setCopyStatus(ok ? 'copied' : 'failed')
    setTimeout(() => setCopyStatus('idle'), 2000)
  }, [score, answers, wrong])

  const handlePrint = useCallback(() => {
    openPrintWindow(score, answers, wrong, GLOSSARY)
  }, [score, answers, wrong])

  // ── Setup phase ──
  if (phase === 'setup') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-8">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 flex items-center justify-center mx-auto">
            <Brain size={28} className="text-teal-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">
            Test your knowledge
          </h2>
          <p className="text-sm text-slate-500 max-w-md">
            Multiple-choice questions about hx, insurance industry, and pricing
            concepts.
            <br />
            {QUIZ_POOL.length} questions available.
          </p>
        </div>
        <div className="flex gap-3">
          {[10, 20, 30].map(n => (
            <button
              key={n}
              onClick={() => startQuiz(n)}
              disabled={n > QUIZ_POOL.length}
              className={cn(
                'px-6 py-3 rounded-xl font-medium text-sm transition-all',
                n > QUIZ_POOL.length
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md active:scale-[0.98]',
              )}
            >
              {n} questions
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ── Playing phase ──
  if (phase === 'playing') {
    const q = questions[current]!
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Progress */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            Question {current + 1} of {questions.length}
          </span>
          <span>{answers.filter(a => a.isCorrect).length} correct so far</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-500 rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
          <div className="flex items-start gap-3">
            <Target size={18} className="text-teal-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-slate-900 leading-snug">
                {q.quiz.q}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Related term: {q.term}
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {q.quiz.opts.map((opt, i) => {
              let style =
                'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
              if (revealed) {
                if (i === q.quiz.ans)
                  style =
                    'border-emerald-300 bg-emerald-50 ring-1 ring-emerald-200'
                else if (i === selected && selected !== q.quiz.ans)
                  style = 'border-red-300 bg-red-50 ring-1 ring-red-200'
                else style = 'border-slate-100 bg-slate-50/50 opacity-50'
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={revealed}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center gap-3',
                    style,
                    !revealed && 'cursor-pointer',
                  )}
                >
                  <span
                    className={cn(
                      'w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium shrink-0',
                      revealed && i === q.quiz.ans
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : revealed && i === selected
                          ? 'bg-red-500 border-red-500 text-white'
                          : 'border-slate-300 text-slate-400',
                    )}
                  >
                    {revealed && i === q.quiz.ans ? (
                      <Check size={14} />
                    ) : revealed && i === selected ? (
                      <X size={14} />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </span>
                  <span className="text-slate-700">{opt}</span>
                </button>
              )
            })}
          </div>

          {revealed && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 shadow-sm transition-all active:scale-[0.98]"
              >
                {current + 1 >= questions.length
                  ? 'See results'
                  : 'Next question'}
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── Results phase ──
  const pct = answers.length > 0 ? Math.round((score / answers.length) * 100) : 0

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Score card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm space-y-4">
        <div className="text-4xl">{pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚'}</div>
        <div>
          <p className="text-3xl font-bold text-slate-900">
            {score}/{answers.length}
          </p>
          <p className="text-sm text-slate-500 mt-1">{pct}% correct</p>
        </div>
        <div className="w-full max-w-xs mx-auto h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              pct >= 80
                ? 'bg-emerald-500'
                : pct >= 50
                  ? 'bg-amber-500'
                  : 'bg-red-500',
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-sm text-slate-500">
          {pct >= 80
            ? 'Excellent! You really know hx and insurance.'
            : pct >= 50
              ? 'Good effort! Review the terms below to improve.'
              : 'Keep studying — check the glossary tab for the terms you missed.'}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={handleCopy}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all',
            copyStatus === 'copied'
              ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
              : copyStatus === 'failed'
                ? 'border-red-300 bg-red-50 text-red-700'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
          )}
        >
          {copyStatus === 'copied' ? (
            <>
              <Check size={15} /> Copied!
            </>
          ) : copyStatus === 'failed' ? (
            <>
              <X size={15} /> Failed — try selecting text
            </>
          ) : (
            <>
              <Copy size={15} /> Copy results
            </>
          )}
        </button>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50 transition-all"
        >
          <Printer size={15} /> Print / PDF
        </button>
        <button
          onClick={() => setPhase('setup')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 shadow-sm transition-all"
        >
          <RotateCcw size={15} /> New quiz
        </button>
      </div>

      {/* All answers */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-slate-700">All answers</h3>
        {answers.map((a, i) => (
          <div
            key={i}
            className={cn(
              'flex items-start gap-3 px-4 py-3 rounded-xl border text-sm',
              a.isCorrect
                ? 'border-emerald-100 bg-emerald-50/50'
                : 'border-red-100 bg-red-50/50',
            )}
          >
            <span className="mt-0.5">
              {a.isCorrect ? (
                <Check size={16} className="text-emerald-500" />
              ) : (
                <X size={16} className="text-red-500" />
              )}
            </span>
            <div>
              <p className="text-slate-700">{a.question}</p>
              {!a.isCorrect && (
                <p className="text-xs text-slate-500 mt-1">
                  Correct answer:{' '}
                  {questions.find(q => q.term === a.term)?.quiz.opts[a.correct]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Terms to review */}
      {wrong.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3">
          <h3 className="text-sm font-medium text-amber-800 flex items-center gap-2">
            <BookOpen size={16} /> Terms to review ({wrong.length})
          </h3>
          <div className="space-y-2">
            {wrong.map((w, i) => {
              const full = GLOSSARY.find(g => g.term === w.term)
              return (
                <div
                  key={i}
                  className="bg-white/80 rounded-xl px-4 py-3 border border-amber-100"
                >
                  <p className="font-medium text-sm text-slate-900">{w.term}</p>
                  <p className="text-xs text-slate-600 mt-1">{full?.def}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
