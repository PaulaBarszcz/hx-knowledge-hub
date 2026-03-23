import type { CategoryConfig, CategoryKey } from './types'

export const CATEGORIES: Record<CategoryKey, CategoryConfig> = {
  company: {
    label: 'hx Company',
    color: 'bg-teal-100 text-teal-800 border-teal-200',
    dot: 'bg-teal-500',
  },
  platform: {
    label: 'hx Platform',
    color: 'bg-sky-100 text-sky-800 border-sky-200',
    dot: 'bg-sky-500',
  },
  basics: {
    label: 'Insurance Basics',
    color: 'bg-violet-100 text-violet-800 border-violet-200',
    dot: 'bg-violet-500',
  },
  pricing: {
    label: 'Pricing & Underwriting',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    dot: 'bg-amber-500',
  },
  reinsurance: {
    label: 'Reinsurance',
    color: 'bg-pink-100 text-pink-800 border-pink-200',
    dot: 'bg-pink-500',
  },
  roles: {
    label: 'Industry Roles',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  insurtech: {
    label: 'InsurTech & Innovation',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    dot: 'bg-orange-500',
  },
}
