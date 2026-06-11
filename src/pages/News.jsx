// pages/News.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/common/PageTransition'
import SEO from '../components/common/SEO'
import { CategoryBadge } from '../components/common/Badge'
import LiveDot from '../components/common/LiveDot'
import { NEWS } from '../utils/mockData'
import { newsApi } from '../api/endpoints'
import { formatDate } from '../utils/helpers'

const CATEGORIES = ['All', 'Launches', 'Funding', 'Deployments', 'Geopolitics']

const BY_THE_NUMBERS = [
  { value: '$675M', label: 'Figure AI Series C', color: '#F5C842' },
  { value: '500+', label: 'Figure robots at BMW', color: '#00F0C8' },
  { value: '45%', label: 'Proposed China tariff', color: '#FF4060' },
  { value: '1M hrs', label: 'Tesla Optimus uptime', color: '#6C63FF' },
]

const UPCOMING_EVENTS = [
  { date: 'Jun 5', name: 'RoboCup 2025 — Tokyo' },
  { date: 'Jun 12', name: 'Tesla Bot Day (Rumored)' },
  { date: 'Jul 8', name: 'ICRA 2025 — Atlanta' },
  { date: 'Aug 15', name: 'Figure AI Developer Day' },
]

const CATEGORY_COLORS = {
  Launches: 'teal',
  Funding: 'gold',
  Deployments: 'purple',
  Geopolitics: 'pink',
  News: 'teal',
}

function getPostSlug(item) {
  return item?.slug || item?.id || item?.wpId
}

export default function News() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [newsItems, setNewsItems] = useState(NEWS)

  useEffect(() => {
    let active = true

    newsApi
      .getAll()
      .then((data) => {
        if (active) {
          setNewsItems(data?.length ? data : NEWS)
        }
      })
      .catch(() => {
        if (active) {
          setNewsItems(NEWS)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const filtered =
    activeCategory === 'All'
      ? newsItems
      : newsItems.filter((n) => n.category === activeCategory)

  return (
    <PageTransition>
      <div className="pt-16">
        <SEO
          title="Humanoid Robot News — RoboPulse"
          description="Follow the latest humanoid robot news, robotics company updates, AI breakthroughs, product launches, funding rounds, deployments, and industry developments."
          canonical="/news"
        />

        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div
            className="glow-orb w-96 h-96 opacity-10"
            style={{
              background: 'radial-gradient(circle, #FF4060, transparent 70%)',
              top: '-10%',
              left: '20%',
            }}
          />

          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <LiveDot text="LIVE FEED" color="#FF4060" />
              </div>

              <h1 className="font-heading text-6xl md:text-8xl tracking-heading text-text-primary mb-4">
                ROBOT <span className="text-accent-pink">NEWS</span>
              </h1>

              <p className="text-text-secondary max-w-xl leading-relaxed">
                Breaking news, funding rounds, product launches, and geopolitical shifts in the humanoid robot industry.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container-wide pb-20">
          {/* Category chips */}
          <div className="flex items-center gap-2 flex-wrap mb-8">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    background: isActive
                      ? 'rgba(255,64,96,0.12)'
                      : 'rgba(255,255,255,0.04)',
                    border: isActive
                      ? '1px solid rgba(255,64,96,0.3)'
                      : '1px solid rgba(255,255,255,0.06)',
                    color: isActive ? '#FF4060' : '#7A8299',
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* News list */}
            <div className="lg:col-span-2 space-y-4">
              {filtered.map((item, i) => {
                const postSlug = getPostSlug(item)
                const postUrl = postSlug ? `/news/${postSlug}` : '/news'

                return (
                  <motion.div
                    key={item.id || item.slug || i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      to={postUrl}
                      className="group block rounded-xl p-5 cursor-pointer transition-all duration-300"
                      style={{
                        background: '#0D1020',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <CategoryBadge
                              category={item.category || 'News'}
                              color={CATEGORY_COLORS[item.category] || 'teal'}
                            />

                            <span className="text-xs text-text-muted font-mono">
                              {formatDate(item.date)}
                            </span>
                          </div>

                          <h3 className="font-semibold text-text-primary mb-2 leading-snug group-hover:text-accent-teal transition-colors">
                            {item.title}
                          </h3>

                          <p className="text-sm text-text-secondary leading-relaxed mb-3">
                            {item.excerpt || item.description}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-text-secondary font-mono">
                            <span>{item.source || 'RoboPulse Staff'}</span>
                            <span>·</span>
                            <span>{item.readTime || '4 min'} read</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}

              {filtered.length === 0 && (
                <div
                  className="rounded-xl p-6"
                  style={{
                    background: '#0D1020',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <p className="text-text-secondary">
                    No news found in this category.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* By the numbers */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: '#0D1020',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <h3 className="font-heading text-lg tracking-heading text-text-primary mb-4">
                  BY THE NUMBERS
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {BY_THE_NUMBERS.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg p-3 text-center"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.04)',
                      }}
                    >
                      <p
                        className="text-xl font-mono font-bold"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </p>

                      <p className="text-xs text-text-secondary mt-1 leading-tight">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: '#0D1020',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <h3 className="font-heading text-lg tracking-heading text-text-primary mb-4">
                  UPCOMING EVENTS
                </h3>

                <div className="space-y-3">
                  {UPCOMING_EVENTS.map((event, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-2"
                      style={{
                        borderBottom:
                          i < UPCOMING_EVENTS.length - 1
                            ? '1px solid rgba(255,255,255,0.04)'
                            : 'none',
                      }}
                    >
                      <div
                        className="flex-shrink-0 w-14 text-center rounded py-1"
                        style={{
                          background: 'rgba(108,99,255,0.1)',
                          border: '1px solid rgba(108,99,255,0.2)',
                        }}
                      >
                        <span className="text-xs font-mono font-bold text-accent-purple">
                          {event.date}
                        </span>
                      </div>

                      <p className="text-sm text-text-secondary">
                        {event.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter CTA mini */}
              <div
                className="rounded-xl p-5 text-center"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0,240,200,0.06), rgba(108,99,255,0.06))',
                  border: '1px solid rgba(0,240,200,0.12)',
                }}
              >
                <p className="text-xs font-mono text-accent-teal uppercase tracking-widest mb-2">
                  Stay Updated
                </p>

                <p className="text-sm text-text-secondary mb-4">
                  Get this news in your inbox every week.
                </p>

                <button
                  className="btn btn-primary w-full justify-center text-sm"
                  style={{
                    background: '#00F0C8',
                    color: '#05060A',
                    fontWeight: 700,
                  }}
                  onClick={() => alert('Subscribe to newsletter!')}
                >
                  Subscribe Free →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}