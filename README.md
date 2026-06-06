# 🤖 RoboPulse — Humanoid Robot Review Platform

The definitive source for humanoid robot reviews, comparisons, and industry intelligence. Dark-themed, neon-accented, built for robot enthusiasts and serious buyers.

## Tech Stack

- **React 18** + **Vite** — Fast dev server and optimized builds
- **React Router DOM v6** — Client-side routing with animated transitions
- **Tailwind CSS** — Utility-first styling with custom design tokens
- **Framer Motion** — Page transitions, hover effects, scroll animations
- **Zustand** — Lightweight state management for filters and compare
- **React Intersection Observer** — Scroll-triggered animations

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env

# 3. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, featured articles, top robots, categories |
| `/reviews` | Reviews | Review cards, score rubric, best-in-class sidebar |
| `/compare` | Compare | Robot picker modal, score bars, spec table, verdict |
| `/database` | Database | Full robot grid with filters, sort, price tracker |
| `/news` | News | Chronological news with category filters |
| `/guides` | Guides | Buyer's guides, explainers, deep dives |
| `/categories` | Categories | All content organized by category |

## Project Structure

```
src/
├── api/           # API client & endpoints (mocked for MVP)
├── components/    
│   ├── common/    # ScoreBar, Badge, LiveDot, PageTransition
│   ├── layout/    # Navbar, Footer, NewsTicker, Newsletter
│   ├── robots/    # RobotCard, RobotGrid, RobotFilters, RobotSort
│   ├── compare/   # ComparePicker, CompareScore, CompareTable, CompareVerdict, Modal
│   ├── reviews/   # ReviewCard, ScoreRubric
│   ├── database/  # PriceTrackerTable
│   └── home/      # HeroSection, FeaturedArticles, TopRobots, CategoryGrid
├── context/       # Zustand stores (RobotContext, CompareContext)
├── hooks/         # useRobots custom hook
├── pages/         # Route-level page components
├── styles/        # globals.css with design tokens
└── utils/         # mockData.js, constants.js, helpers.js
```

## Design System

### Colors
```css
--bg-primary: #05060A      /* Main background */
--bg-secondary: #0A0C14    /* Secondary bg */
--bg-card: #0D1020         /* Card background */
--accent-teal: #00F0C8     /* Primary accent */
--accent-pink: #FF4060     /* Alert/warning */
--accent-purple: #6C63FF   /* Secondary accent */
--accent-gold: #F5C842     /* Premium/highlight */
```

### Typography
- **Headings**: Bebas Neue (uppercase, 0.06em tracking)
- **Body**: Outfit (400/500/600/700)
- **Monospace**: JetBrains Mono (scores, badges, meta)

## WordPress Backend Integration

The API layer is stubbed with mock data but ready for WordPress integration:

1. Install the `robopulse-api` WordPress plugin (coming soon)
2. Set `VITE_API_BASE_URL` in your `.env` file
3. Replace mock returns in `src/api/endpoints.js` with `apiFetch()` calls

## Build for Production

```bash
npm run build
npm run preview  # Preview the production build locally
```

## Robots Included (8 models)

| Robot | Maker | Country | Score |
|-------|-------|---------|-------|
| Tesla Optimus Gen 3 | Tesla | 🇺🇸 US | 91 |
| Atlas Electric | Boston Dynamics | 🇺🇸 US | 93 |
| Figure 03 | Figure AI | 🇺🇸 US | 86 |
| Unitree R1 | Unitree Robotics | 🇨🇳 CN | 88 |
| AgiBot A2 | AgiBot | 🇨🇳 CN | 82 |
| Fourier GR-2 | Fourier Intelligence | 🇨🇳 CN | 79 |
| 1X NEO Gamma | 1X Technologies | 🇪🇺 EU | 78 |
| Apptronik Apollo | Apptronik | 🇺🇸 US | 80 |

---

Built with ♥ by the RoboPulse team. Not affiliated with any robot manufacturer.
