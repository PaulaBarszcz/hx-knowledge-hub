# hx Knowledge Hub

A study companion app for learning about [hyperexponential (hx)](https://www.hyperexponential.com), the insurance industry, and insurtech concepts.

## Features

- **Glossary** — 90+ searchable terms covering hx company, platform, insurance basics, pricing & underwriting, reinsurance, industry roles, and insurtech
- **Fuzzy Search** — multi-word search across terms and definitions
- **Category Filters** — filter by 7 topic categories with visual pills
- **Interactive Quiz** — multiple-choice questions with instant feedback, configurable question count (10/20/30)
- **Results Export** — copy results to clipboard or print/export as PDF
- **Responsive Design** — works on desktop and mobile

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Vite | Build tool & dev server |
| Vitest | Unit & component testing |
| Testing Library | Component testing utilities |
| Lucide React | Icon system |

> **Note**: This project intentionally uses a standalone Vite setup rather than nx monorepo for simplicity as a demo application. In a production environment at hx, this would sit within the nx workspace alongside shadcn/ui components.

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── CategoryBadge.tsx    # Reusable category pill component
│   ├── GlossaryView.tsx     # Glossary tab with search & filters
│   ├── QuizView.tsx         # Quiz tab with gameplay & results
│   └── TermCard.tsx         # Expandable glossary card
├── data/
│   ├── categories.ts        # Category configuration
│   ├── glossary.ts          # 90 terms + quiz questions
│   └── types.ts             # TypeScript interfaces
├── hooks/
│   └── useGlossarySearch.ts # Fuzzy search hook
├── lib/
│   ├── exportResults.ts     # Clipboard & print utilities
│   ├── shuffle.ts           # Fisher-Yates shuffle
│   └── utils.ts             # cn() utility (clsx + tailwind-merge)
├── test/
│   ├── setup.ts             # Vitest setup with jest-dom
│   ├── glossary.test.ts     # Data integrity tests
│   ├── useGlossarySearch.test.ts  # Search hook tests
│   ├── GlossaryView.test.tsx      # Component tests
│   └── shuffle.test.ts      # Utility tests
├── App.tsx                  # Root component with tab navigation
├── main.tsx                 # Entry point
└── index.css                # Tailwind directives & global styles
```

## Design Decisions

- **Client-side fuzzy search** over Elasticsearch — for a static dataset of ~90 terms, a full search engine is over-engineering. Multi-word matching covers the use case.
- **Standalone Vite** over nx monorepo — faster setup for a demo; in production, this would integrate into hx's nx workspace.
- **No external state management** — React useState is sufficient for this scope. No Redux, Zustand, or context API overhead.
- **Extracted utilities** — `exportResults.ts` handles clipboard fallbacks and print window generation, keeping QuizView focused on UI logic.

## Deploy

```bash
# Vercel
npx vercel

# Netlify
npx netlify deploy --prod --dir=dist
```

---

Built as part of a Senior Frontend Engineer application for hyperexponential.
