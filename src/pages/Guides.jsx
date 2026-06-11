// pages/Guides.jsx
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PageTransition from '../components/common/PageTransition'
import SEO from '../components/common/SEO'
import { CategoryBadge } from '../components/common/Badge'
import { guidesApi } from '../api/endpoints'

function getGuideSlug(guide) {
  return guide.slug || guide.id || guide.wpId
}

function getGuideUrl(guide) {
  return `/guides/${getGuideSlug(guide)}`
}

function normalizeGuideType(type) {
  const value = String(type || '').toLowerCase().trim()

  if (
    value === 'buyers' ||
    value === 'buyer' ||
    value === 'buying' ||
    value === 'buyer-guide' ||
    value === 'buyers-guide' ||
    value === "buyer's guide" ||
    value === 'buying-guide'
  ) {
    return 'buyers'
  }

  if (
    value === 'explainer' ||
    value === 'explainers' ||
    value === 'technical' ||
    value === 'technical-explainer'
  ) {
    return 'explainer'
  }

  if (
    value === 'deep-dive' ||
    value === 'deep dive' ||
    value === 'deepdive' ||
    value === 'industry' ||
    value === 'analysis' ||
    value === 'industry-analysis'
  ) {
    return 'deep-dive'
  }

  return 'all'
}

function getGuideTags(guide) {
  const guideType = normalizeGuideType(guide.type || guide.guideType)

  if (guideType === 'buyers') {
    return ["Buyer's Guide"]
  }

  if (guideType === 'explainer') {
    return ['Explainer']
  }

  if (guideType === 'deep-dive') {
    return ['Deep Dive']
  }

  return ['Guide']
}

function getGuideDescription(guide) {
  return guide.description || guide.excerpt || 'Read the latest guide from RoboPulse.'
}

function matchesSearch(guide, query) {
  const q = String(query || '').toLowerCase().trim()

  if (!q) return true

  const searchableText = [
    guide.title,
    guide.description,
    guide.excerpt,
    guide.type,
    guide.guideType,
    guide.readTime,
    guide.slug,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return searchableText.includes(q)
}

function GuideCard({ guide, index, color = 'gold' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const tags = getGuideTags(guide)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={getGuideUrl(guide)}
        className="group block rounded-xl p-5 transition-all duration-300 h-full"
        style={{
          background: '#0D1020',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor =
            color === 'purple'
              ? 'rgba(108,99,255,0.3)'
              : 'rgba(245,200,66,0.25)'
          e.currentTarget.style.transform = 'translateY(-3px)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <CategoryBadge key={tag} category={tag} color={color} />
            ))}
          </div>

          {guide.readTime && (
            <span className="text-xs font-mono text-text-muted flex-shrink-0">
              {guide.readTime}
            </span>
          )}
        </div>

        <h3
          className={`font-semibold text-text-primary mb-2 leading-snug transition-colors ${
            color === 'purple'
              ? 'group-hover:text-accent-purple'
              : 'group-hover:text-accent-gold'
          }`}
        >
          {guide.title}
        </h3>

        <p className="text-sm text-text-secondary leading-relaxed">
          {getGuideDescription(guide)}
        </p>

        <div
          className={`mt-4 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity ${
            color === 'purple' ? 'text-accent-purple' : 'text-accent-gold'
          }`}
        >
          Read guide →
        </div>
      </Link>
    </motion.div>
  )
}

function ExplainerRow({ guide, index }) {
  const tags = getGuideTags(guide)

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={getGuideUrl(guide)}
        className="group flex items-start gap-4 py-4 transition-colors"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div
          className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 font-mono font-bold text-sm"
          style={{
            background: 'rgba(108,99,255,0.1)',
            border: '1px solid rgba(108,99,255,0.2)',
            color: '#6C63FF',
          }}
        >
          {index + 1}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-text-primary group-hover:text-accent-purple transition-colors mb-1">
            {guide.title}
          </h4>

          <p className="text-sm text-text-secondary">
            {getGuideDescription(guide)}
          </p>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {tags.map((tag) => (
              <CategoryBadge key={tag} category={tag} color="purple" />
            ))}
          </div>
        </div>

        {guide.readTime && (
          <span className="text-xs font-mono text-text-muted flex-shrink-0">
            {guide.readTime}
          </span>
        )}
      </Link>
    </motion.div>
  )
}

export default function Guides() {
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let active = true

    async function loadGuides() {
      try {
        setLoading(true)

        const data = await guidesApi.getAll()

        if (active) {
          setGuides(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Guides loading error:', error)

        if (active) {
          setGuides([])
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadGuides()

    return () => {
      active = false
    }
  }, [])

  const filteredGuides = useMemo(() => {
    const all = Array.isArray(guides) ? guides : []
    return all.filter((guide) => matchesSearch(guide, searchQuery))
  }, [guides, searchQuery])

  const groupedGuides = useMemo(() => {
    const all = Array.isArray(filteredGuides) ? filteredGuides : []

    return {
      all,
      buyers: all.filter(
        (guide) => normalizeGuideType(guide.type || guide.guideType) === 'buyers'
      ),
      explainers: all.filter(
        (guide) => normalizeGuideType(guide.type || guide.guideType) === 'explainer'
      ),
      deepDives: all.filter(
        (guide) => normalizeGuideType(guide.type || guide.guideType) === 'deep-dive'
      ),
      uncategorized: all.filter(
        (guide) => normalizeGuideType(guide.type || guide.guideType) === 'all'
      ),
    }
  }, [filteredGuides])

  const shouldShowStructuredSections =
    groupedGuides.buyers.length > 0 ||
    groupedGuides.explainers.length > 0 ||
    groupedGuides.deepDives.length > 0

  const hasGuides = Array.isArray(guides) && guides.length > 0
  const hasSearch = searchQuery.trim().length > 0

  return (
    <PageTransition>
      <div className="pt-16">
        <SEO
          title="Humanoid Robot Guides & Explainers — RoboPulse"
          description="Learn about humanoid robots through buyer's guides, explainers, industry deep dives, technical breakdowns, practical resources, and robotics insights."
          canonical="/guides"
        />

        <section className="relative py-20 overflow-hidden">
          <div
            className="glow-orb w-96 h-96 opacity-10"
            style={{
              background: 'radial-gradient(circle, #F5C842, transparent 70%)',
              top: '-10%',
              right: '15%',
            }}
          />

          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-xs font-mono text-accent-gold uppercase tracking-widest mb-3">
                Learn
              </p>

              <h1 className="font-heading text-6xl md:text-8xl tracking-heading text-text-primary mb-4">
                GUIDES & <span className="text-accent-gold">EXPLAINERS</span>
              </h1>

              <p className="text-text-secondary max-w-xl leading-relaxed">
                From buyer&apos;s guides to technical explainers and industry deep dives — everything you need to understand the humanoid robot revolution.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container-wide pb-20 space-y-10">
          <div
            className="rounded-xl p-5"
            style={{
              background: '#0D1020',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <label className="block text-xs font-mono text-accent-gold uppercase tracking-widest mb-2">
                  Search Guides
                </label>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, topic, type, or keyword..."
                  className="w-full text-sm outline-none"
                  style={{
                    background: '#161923',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#F0F2F8',
                    borderRadius: '10px',
                    padding: '13px 16px',
                  }}
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-text-muted whitespace-nowrap">
                  {groupedGuides.all.length} result{groupedGuides.all.length === 1 ? '' : 's'}
                </span>

                {hasSearch && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-3 rounded-lg text-xs font-mono uppercase transition-colors"
                    style={{
                      background: 'rgba(245,200,66,0.08)',
                      border: '1px solid rgba(245,200,66,0.22)',
                      color: '#F5C842',
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-16">
            {loading && (
              <div
                className="rounded-xl p-5"
                style={{
                  background: '#0D1020',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <p className="text-text-secondary font-mono text-sm">
                  Loading guides...
                </p>
              </div>
            )}

            {!loading && !hasGuides && (
              <div
                className="rounded-xl p-5"
                style={{
                  background: '#0D1020',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <p className="text-text-secondary">
                  No guides found.
                </p>
              </div>
            )}

            {!loading && hasGuides && groupedGuides.all.length === 0 && (
              <div
                className="rounded-xl p-5"
                style={{
                  background: '#0D1020',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <p className="text-text-secondary">
                  No guides matched your search.
                </p>
              </div>
            )}

            {!loading && groupedGuides.all.length > 0 && !shouldShowStructuredSections && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">📘</span>

                  <div>
                    <h2 className="font-heading text-3xl tracking-heading text-text-primary">
                      ALL GUIDES
                    </h2>

                    <p className="text-sm text-text-muted">
                      Latest guides from RoboPulse
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedGuides.all.map((guide, index) => (
                    <GuideCard
                      key={guide.wpId || guide.id || guide.slug}
                      guide={guide}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}

            {!loading && shouldShowStructuredSections && (
              <>
                {groupedGuides.buyers.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">📘</span>

                      <div>
                        <h2 className="font-heading text-3xl tracking-heading text-text-primary">
                          BUYER&apos;S GUIDES
                        </h2>

                        <p className="text-sm text-text-muted">
                          Essential reading before you spend five figures on a robot
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {groupedGuides.buyers.map((guide, index) => (
                        <GuideCard
                          key={guide.wpId || guide.id || guide.slug}
                          guide={guide}
                          index={index}
                          color="gold"
                        />
                      ))}
                    </div>
                  </section>
                )}

                {groupedGuides.explainers.length > 0 && (
                  <section>
                    <div
                      className="rounded-xl overflow-hidden"
                      style={{
                        background: '#0D1020',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div
                        className="px-6 py-5 flex items-center gap-3"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <span className="text-2xl">🔬</span>

                        <div>
                          <h2 className="font-heading text-3xl tracking-heading text-text-primary">
                            EXPLAINERS
                          </h2>

                          <p className="text-sm text-text-muted">
                            Technical concepts explained clearly for non-engineers
                          </p>
                        </div>
                      </div>

                      <div className="px-6">
                        {groupedGuides.explainers.map((guide, index) => (
                          <ExplainerRow
                            key={guide.wpId || guide.id || guide.slug}
                            guide={guide}
                            index={index}
                          />
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {groupedGuides.deepDives.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">🌐</span>

                      <div>
                        <h2 className="font-heading text-3xl tracking-heading text-text-primary">
                          INDUSTRY DEEP DIVES
                        </h2>

                        <p className="text-sm text-text-muted">
                          Longform analysis of the forces shaping robotics
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {groupedGuides.deepDives.map((guide, index) => (
                        <GuideCard
                          key={guide.wpId || guide.id || guide.slug}
                          guide={guide}
                          index={index}
                          color="purple"
                        />
                      ))}
                    </div>
                  </section>
                )}

                {groupedGuides.uncategorized.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">📄</span>

                      <div>
                        <h2 className="font-heading text-3xl tracking-heading text-text-primary">
                          MORE GUIDES
                        </h2>

                        <p className="text-sm text-text-muted">
                          Additional guides and resources
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {groupedGuides.uncategorized.map((guide, index) => (
                        <GuideCard
                          key={guide.wpId || guide.id || guide.slug}
                          guide={guide}
                          index={index}
                          color="gold"
                        />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}