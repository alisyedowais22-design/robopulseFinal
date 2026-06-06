// components/home/FeaturedArticles.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { CategoryBadge } from '../common/Badge'

const FEATURED = [
  {
    id: 1,
    category: 'Review',
    categoryColor: 'teal',
    title: 'Tesla Optimus Gen 3 Review: The Robot That Changes Everything',
    excerpt: 'After three weeks with Tesla\'s latest humanoid, we\'re ready to say it: Optimus is the first robot that actually feels like the future.',
    meta: '12 min read · May 2025',
    emoji: '⚡',
    score: 91,
    to: '/reviews',
    featured: true,
  },
  {
    id: 2,
    category: 'Comparison',
    categoryColor: 'purple',
    title: 'Unitree R1 vs Tesla Optimus: Price vs Performance',
    excerpt: 'One costs $16K and ships today. The other has the best AI in the industry. We break down exactly what you\'re paying for.',
    meta: '15 min read · Apr 2025',
    emoji: '⚖️',
    to: '/compare',
    featured: false,
  },
  {
    id: 3,
    category: 'Guide',
    categoryColor: 'gold',
    title: 'The 2025 Humanoid Robot Buyer\'s Guide',
    excerpt: 'Everything you need to know before spending $16K–$40K on a robot, from DOF counts to deployment reality checks.',
    meta: '25 min read · Mar 2025',
    emoji: '📘',
    to: '/guides',
    featured: false,
  },
]

export default function FeaturedArticles() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-20" ref={ref}>
      <div className="container-wide">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-mono text-accent-teal uppercase tracking-widest mb-2">Featured</p>
            <h2 className="font-heading text-4xl tracking-heading text-text-primary">LATEST COVERAGE</h2>
          </div>
          <Link to="/reviews" className="text-sm text-text-secondary hover:text-accent-teal transition-colors font-mono">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {FEATURED.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link to={article.to} className="block h-full group">
                <div
                  className="h-full rounded-xl p-6 transition-all duration-300 group-hover:-translate-y-1"
                  style={{
                    background: '#0D1020',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <CategoryBadge category={article.category} color={article.categoryColor} />
                    <span className="text-2xl">{article.emoji}</span>
                  </div>

                  <h3 className="text-base font-semibold text-text-primary mb-3 leading-snug group-hover:text-accent-teal transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <span className="text-xs text-text-muted font-mono">{article.meta}</span>
                    {article.score && (
                      <span className="text-xs font-mono font-bold text-accent-teal">{article.score}/100</span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
