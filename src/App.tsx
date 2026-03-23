import { useState } from 'react'
import { BookOpen, Brain, Sparkles, ExternalLink } from 'lucide-react'
import { GLOSSARY } from '@/data/glossary'
import { GlossaryView } from '@/components/GlossaryView'
import { QuizView } from '@/components/QuizView'
import { cn } from '@/lib/utils'

type Tab = 'glossary' | 'quiz'

const TABS: { key: Tab; label: string; icon: typeof BookOpen }[] = [
  { key: 'glossary', label: 'Glossary', icon: BookOpen },
  { key: 'quiz', label: 'Quiz', icon: Brain },
]

export default function App() {
  const [tab, setTab] = useState<Tab>('glossary')

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-sm">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900 leading-tight">
                  hx Knowledge Hub
                </h1>
                <p className="text-[11px] text-slate-400 leading-tight">
                  hyperexponential &middot; Insurance &middot; InsurTech
                </p>
              </div>
            </div>
            <a
              href="https://www.hyperexponential.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-600 transition-colors"
            >
              hyperexponential.com <ExternalLink size={12} />
            </a>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 -mb-px">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all',
                  tab === key
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
                )}
              >
                <Icon size={16} />
                {label}
                {key === 'glossary' && (
                  <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-semibold text-slate-500">
                    {GLOSSARY.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {tab === 'glossary' ? <GlossaryView /> : <QuizView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-xs text-slate-400">
          <span>Built with React + TypeScript + Tailwind</span>
          <span>Senior Frontend Engineer — hx application</span>
        </div>
      </footer>
    </div>
  )
}
