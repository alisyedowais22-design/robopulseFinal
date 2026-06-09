// pages/Guides.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PageTransition from '../components/common/PageTransition'
import { CategoryBadge } from '../components/common/Badge'
import { GUIDES } from '../utils/mockData'
import { guidesApi } from '../api/endpoints'

function getGuideSlug(guide) {
  return guide?.slug || guide?.id || guide?.wpId
}

function getGuideTags(guide) {
  return Array.isArray(guide?.tags) ? guide.tags : []
}

function GuideCard({ guide, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const guideSlug = getGuideSlug(guide)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07 }}
    >
      <Link
        to={`/guides/${guideSlug}`}
        className="group block rounded-xl p-5 cursor-pointer transition-all duration-300"
        style={{
          background: '#0D1020',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(245,200,66,0.25)'
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
            {getGuideTags(guide).map((tag) => (
              <CategoryBadge key={tag} category={tag} color="gold" />
            ))}
          </div>

          <span className="text-xs font-mono text-text-muted flex-shrink-0">
            {guide.readTime || '5 min'}
          </span>
        </div>

        <h3 className="font-semibold text-text-primary mb-2 leading-snug group-hover:text-accent-gold transition-colors">
          {guide.title}
        </h3>

        <p className="text-sm text-text-secondary leading-relaxed">
          {guide.description || guide.excerpt}
        </p>

        <div className="mt-4 text-xs font-mono text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity">
          Read guide →
        </div>
      </Link>
    </motion.div>
  )
}

function ExplainerRow({ guide, index }) {
  const guideSlug = getGuideSlug(guide)

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <Link
        to={`/guides/${guideSlug}`}
        className="group flex items-start gap-4 py-4 cursor-pointer transition-colors"
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
            {guide.description || guide.excerpt}
          </p>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            {getGuideTags(guide).map((tag) => (
              <CategoryBadge key={tag} category={tag} color="purple" />
            ))}
          </div>
        </div>

        <span className="text-xs font-mono text-text-muted flex-shrink-0">
          {guide.readTime || '5 min'}
        </span>
      </Link>
    </motion.div>
  )
}

function DeepDiveCard({ guide, index }) {
  const guideSlug = getGuideSlug(guide)

  return (
    <motion.div
      key={guide.id || guide.slug || index}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Link
        to={`/guides/${guideSlug}`}
        className="group block rounded-xl p-5 cursor-pointer transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(108,99,255,0.06), rgba(13,16,32,1))',
          border: '1px solid rgba(108,99,255,0.15)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(108,99,255,0.3)'
          e.currentTarget.style.transform = 'translateY(-3px)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(108,99,255,0.15)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex gap-2 flex-wrap">
            {getGuideTags(guide).map((tag) => (
              <CategoryBadge key={tag} category={tag} color="purple" />
            ))}
          </div>

          <span className="text-xs font-mono text-text-muted">
            {guide.readTime || '8 min'}
          </span>
        </div>

        <h3 className="font-semibold text-text-primary mb-2 leading-snug group-hover:text-accent-purple transition-colors">
          {guide.title}
        </h3>

        <p className="text-sm text-text-secondary">
          {guide.description || guide.excerpt}
        </p>

        <div className="mt-4 text-xs font-mono text-accent-purple opacity-0 group-hover:opacity-100 transition-opacity">
          Read deep dive →
        </div>
      </Link>
    </motion.div>
  )
}

export default function Guides() {
  const [guides, setGuides] = useState(GUIDES)

  useEffect(() => {
    let active = true

    guidesApi
      .getAll()
      .then((data) => {
        if (active) setGuides(data?.length ? data : GUIDES)
      })
      .catch(() => {
        if (active) setGuides(GUIDES)
      })

    return () => {
      active = false
    }
  }, [])

  const buyersGuides = guides.filter((g) => g.type === 'buyers')
  const explainers = guides.filter((g) => g.type === 'explainer')
  const deepDives = guides.filter((g) => g.type === 'deep-dive')

  return (
    <PageTransition>
      <div className="pt-16">
        {/* Hero */}
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

        <div className="container-wide pb-20 space-y-16">
          {/* Section 1: Buyer's Guides */}
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
              {buyersGuides.map((guide, i) => (
                <GuideCard
                  key={guide.id || guide.slug || i}
                  guide={guide}
                  index={i}
                />
              ))}
            </div>
          </section>

          {/* Section 2: Explainers */}
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
                {explainers.map((guide, i) => (
                  <ExplainerRow
                    key={guide.id || guide.slug || i}
                    guide={guide}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: Deep Dives */}
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
              {deepDives.map((guide, i) => (
                <DeepDiveCard
                  key={guide.id || guide.slug || i}
                  guide={guide}
                  index={i}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  )
}