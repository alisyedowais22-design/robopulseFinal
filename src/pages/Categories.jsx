// pages/Categories.jsx
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PageTransition from '../components/common/PageTransition'
import { CategoryBadge } from '../components/common/Badge'

const COLOR_MAP = {
  teal: { accent: '#00F0C8', bg: 'rgba(0,240,200,0.06)', border: 'rgba(0,240,200,0.15)' },
  purple: { accent: '#6C63FF', bg: 'rgba(108,99,255,0.06)', border: 'rgba(108,99,255,0.15)' },
  pink: { accent: '#FF4060', bg: 'rgba(255,64,96,0.06)', border: 'rgba(255,64,96,0.15)' },
  gold: { accent: '#F5C842', bg: 'rgba(245,200,66,0.06)', border: 'rgba(245,200,66,0.15)' },
}

const ALL_CATEGORIES = [
  {
    id: 'reviews',
    icon: '⭐',
    name: 'Reviews',
    description: 'In-depth expert evaluations scored across 6 metrics.',
    count: 24,
    color: 'teal',
    articles: [
      { title: 'Tesla Optimus Gen 3 Review', meta: '12 min · May 2025' },
      { title: 'Unitree R1 Review: Best Value Robot', meta: '9 min · Apr 2025' },
      { title: 'Figure 03 Review: The Hand Master', meta: '11 min · Apr 2025' },
      { title: 'Atlas Electric Review', meta: '14 min · Mar 2025' },
    ],
  },
  {
    id: 'comparisons',
    icon: '⚖️',
    name: 'Comparisons',
    description: 'Head-to-head robot battles with definitive verdicts.',
    count: 18,
    color: 'purple',
    articles: [
      { title: 'Unitree R1 vs Tesla Optimus', meta: '15 min · May 2025' },
      { title: 'Figure 03 vs Optimus: Hands Battle', meta: '12 min · Apr 2025' },
      { title: 'AgiBot A2 vs Fourier GR-2', meta: '10 min · Apr 2025' },
      { title: 'Every US Humanoid Ranked', meta: '20 min · Mar 2025' },
    ],
  },
  {
    id: 'news',
    icon: '📡',
    name: 'Breaking News',
    description: 'Real-time coverage of the humanoid robot industry.',
    count: 142,
    color: 'pink',
    articles: [
      { title: 'Unitree R1 US Mass Shipments Begin', meta: '4 min · May 2025' },
      { title: 'Figure AI $675M Series C', meta: '6 min · May 2025' },
      { title: 'BMW Reaches 500 Figure Robots', meta: '5 min · Apr 2025' },
      { title: 'Senate China Robot Tariff Bill', meta: '7 min · Apr 2025' },
    ],
  },
  {
    id: 'guides',
    icon: '📘',
    name: 'Buyer\'s Guides',
    description: 'Everything you need to make the right robot purchase.',
    count: 12,
    color: 'gold',
    articles: [
      { title: 'Complete 2025 Robot Buyer\'s Guide', meta: '25 min' },
      { title: 'Industrial Robot Procurement Guide', meta: '30 min' },
      { title: 'Are Home Robots Ready in 2025?', meta: '15 min' },
      { title: 'Chinese vs American Robots', meta: '18 min' },
    ],
  },
  {
    id: 'explainers',
    icon: '🔬',
    name: 'Explainers',
    description: 'Technical concepts made clear for every reader.',
    count: 19,
    color: 'purple',
    articles: [
      { title: 'How Humanoid Robots Actually Work', meta: '20 min' },
      { title: 'AI in Robots: LLMs, VLMs, World Models', meta: '16 min' },
      { title: 'Degrees of Freedom Explained', meta: '8 min' },
      { title: 'The Truth About Battery Life', meta: '10 min' },
    ],
  },
  {
    id: 'deep-dives',
    icon: '🌐',
    name: 'Deep Dives',
    description: 'Longform industry analysis for serious readers.',
    count: 8,
    color: 'teal',
    articles: [
      { title: 'Manufacturing Robots: The $50B Opportunity', meta: '35 min' },
      { title: 'China\'s Robotics Strategy: The Full Picture', meta: '40 min' },
      { title: 'Humanoids in Healthcare: Promise vs Reality', meta: '28 min' },
      { title: 'The $165B Investment Landscape', meta: '32 min' },
    ],
  },
  {
    id: 'us-made',
    icon: '🇺🇸',
    name: 'US-Made Robots',
    description: 'American humanoid robots — Tesla, Figure, Apptronik, Boston Dynamics.',
    count: 16,
    color: 'purple',
    articles: [
      { title: 'Every US Humanoid Robot Ranked 2025', meta: '18 min' },
      { title: 'Tesla vs Figure: The American Showdown', meta: '14 min' },
      { title: 'Apptronik Apollo: The NASA Robot', meta: '9 min' },
    ],
  },
  {
    id: 'china-made',
    icon: '🇨🇳',
    name: 'China-Made Robots',
    description: 'Chinese humanoid robots shaping the global market.',
    count: 14,
    color: 'pink',
    articles: [
      { title: 'China\'s Humanoid Robots: Full Breakdown', meta: '22 min' },
      { title: 'Unitree: How a Startup Beat the Giants', meta: '12 min' },
      { title: 'AgiBot A2: The Dark Horse', meta: '10 min' },
    ],
  },
  {
    id: 'us-vs-china',
    icon: '⚔️',
    name: 'US vs China',
    description: 'The geopolitical battle for humanoid robot dominance.',
    count: 22,
    color: 'gold',
    articles: [
      { title: 'The Robot Cold War: 2025 State of Play', meta: '30 min' },
      { title: 'Tariffs, Bans, and Robot Politics', meta: '15 min' },
      { title: 'Who Wins the Robot Race?', meta: '20 min' },
      { title: 'US Robot Policy Under the New Admin', meta: '12 min' },
    ],
  },
  {
    id: 'industrial',
    icon: '🏭',
    name: 'Industrial Use',
    description: 'Robots in factories, warehouses, and supply chains.',
    count: 31,
    color: 'teal',
    articles: [
      { title: 'BMW + Figure: Inside the Partnership', meta: '16 min' },
      { title: 'Tesla Gigafactory Robot Report', meta: '20 min' },
      { title: 'Warehouse Robots: The Real ROI', meta: '14 min' },
    ],
  },
  {
    id: 'home-robots',
    icon: '🏠',
    name: 'Home Robots',
    description: 'Humanoids designed to live alongside us.',
    count: 9,
    color: 'purple',
    articles: [
      { title: '1X NEO: Living with a Home Robot', meta: '18 min' },
      { title: 'When Will Robots Do My Laundry?', meta: '12 min' },
      { title: 'Home Robot Safety Standards 2025', meta: '10 min' },
    ],
  },
  {
    id: 'funding',
    icon: '💰',
    name: 'Funding & Markets',
    description: 'Investment, valuations, and market intelligence.',
    count: 28,
    color: 'gold',
    articles: [
      { title: 'Figure AI $675M Round: What It Means', meta: '8 min' },
      { title: 'The $165B Robot Market Explained', meta: '14 min' },
      { title: 'Which Robot Companies Will Win?', meta: '22 min' },
      { title: 'Robot Startup Graveyard: Lessons', meta: '16 min' },
    ],
  },
]

function CategorySection({ category, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const colors = COLOR_MAP[category.color] || COLOR_MAP.teal

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.05, duration: 0.4 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${colors.border}`, background: colors.bg }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${colors.border}` }}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{category.icon}</span>
          <div>
            <h2 className="font-heading text-2xl tracking-heading" style={{ color: colors.accent }}>
              {category.name.toUpperCase()}
            </h2>
            <p className="text-sm text-text-secondary mt-0.5">{category.description}</p>
          </div>
        </div>
        <div
          className="flex-shrink-0 px-3 py-1 rounded font-mono text-sm font-bold"
          style={{ background: `${colors.accent}15`, color: colors.accent }}
        >
          {category.count} articles
        </div>
      </div>

      {/* Articles grid */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {category.articles.map((article, i) => (
          <div
            key={i}
            className="group rounded-lg p-4 cursor-pointer transition-all duration-200"
            style={{
              background: 'rgba(13,16,32,0.6)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
            onClick={() => alert(`Opening: ${article.title}`)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${colors.accent}33`
              e.currentTarget.style.background = 'rgba(13,16,32,0.9)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.background = 'rgba(13,16,32,0.6)'
            }}
          >
            <p className="text-sm font-medium text-text-primary leading-snug mb-2 group-hover:text-white transition-colors">
              {article.title}
            </p>
            {article.meta && (
              <p className="text-xs text-text-muted font-mono">{article.meta}</p>
            )}
            <p className="text-xs mt-2 font-mono opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: colors.accent }}>
              Read →
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  )
}

export default function Categories() {
  return (
    <PageTransition>
      <div className="pt-16">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div
            className="glow-orb w-96 h-96 opacity-10"
            style={{ background: 'radial-gradient(circle, #6C63FF, transparent 70%)', top: '-10%', left: '30%' }}
          />
          <div className="container-wide relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-xs font-mono text-accent-purple uppercase tracking-widest mb-3">Browse</p>
              <h1 className="font-heading text-6xl md:text-8xl tracking-heading text-text-primary mb-4">
                ALL <span className="text-accent-purple">CATEGORIES</span>
              </h1>
              <p className="text-text-secondary max-w-xl leading-relaxed">
                Every piece of content we've published, organized by topic. From buyer's guides to deep geopolitical analysis.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container-wide pb-20 space-y-6">
          {ALL_CATEGORIES.map((category, i) => (
            <CategorySection key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
