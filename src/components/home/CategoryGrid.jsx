// components/home/CategoryGrid.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { CATEGORIES } from '../../utils/mockData'

const CATEGORY_TO_PATH = {
  reviews: '/reviews',
  comparisons: '/compare',
  news: '/news',
  guides: '/guides',
  database: '/database',
  'us-vs-china': '/categories',
}

const COLOR_MAP = {
  teal: { bg: 'rgba(0,240,200,0.06)', border: 'rgba(0,240,200,0.15)', hover: 'rgba(0,240,200,0.12)', text: '#00F0C8' },
  purple: { bg: 'rgba(108,99,255,0.06)', border: 'rgba(108,99,255,0.15)', hover: 'rgba(108,99,255,0.12)', text: '#6C63FF' },
  pink: { bg: 'rgba(255,64,96,0.06)', border: 'rgba(255,64,96,0.15)', hover: 'rgba(255,64,96,0.12)', text: '#FF4060' },
  gold: { bg: 'rgba(245,200,66,0.06)', border: 'rgba(245,200,66,0.15)', hover: 'rgba(245,200,66,0.12)', text: '#F5C842' },
}

export default function CategoryGrid() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-20 relative" ref={ref}>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 100% 50% at 50% 100%, rgba(108,99,255,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="container-wide relative z-10">
        <div className="text-center mb-10">
          <p className="text-xs font-mono text-accent-teal uppercase tracking-widest mb-2">Explore</p>
          <h2 className="font-heading text-4xl tracking-heading text-text-primary">COVERAGE AREAS</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat, i) => {
            const colors = COLOR_MAP[cat.color] || COLOR_MAP.teal
            const path = CATEGORY_TO_PATH[cat.id] || '/'
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
              >
                <Link to={path}>
                  <div
                    className="p-6 rounded-xl transition-all duration-300 group cursor-pointer"
                    style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.hover
                      e.currentTarget.style.transform = 'translateY(-3px)'
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = colors.bg
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <span className="text-3xl block mb-3">{cat.icon}</span>
                    <h3 className="font-heading text-xl tracking-heading" style={{ color: colors.text }}>
                      {cat.name.toUpperCase()}
                    </h3>
                    <p className="text-xs text-text-secondary mt-1.5 mb-3">{cat.description}</p>
                    <p className="text-xs font-mono" style={{ color: colors.text }}>
                      {cat.count} articles →
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
