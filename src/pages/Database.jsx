// pages/Database.jsx
import { motion } from 'framer-motion'
import PageTransition from '../components/common/PageTransition'
import SEO from '../components/common/SEO'
import RobotFilters from '../components/robots/RobotFilters'
import RobotSort from '../components/robots/RobotSort'
import RobotGrid from '../components/robots/RobotGrid'
import PriceTrackerTable from '../components/database/PriceTrackerTable'
import { useRobots } from '../hooks/useRobots'
import { useRobotStore } from '../context/RobotContext'

export default function Database() {
  const { robots, total } = useRobots()
  const { search, setSearch } = useRobotStore()

  return (
    <PageTransition>
      <div className="pt-16">
        <SEO
          title="Humanoid Robot Database — RoboPulse"
          description="Browse the RoboPulse humanoid robot database with robot models, makers, specifications, pricing, availability, scores, country filters, and real-time price tracking."
          canonical="/database"
        />

        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div
            className="glow-orb w-96 h-96 opacity-10"
            style={{ background: 'radial-gradient(circle, #F5C842, transparent 70%)', top: '-10%', right: '5%' }}
          />
          <div className="container-wide relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-xs font-mono text-accent-gold uppercase tracking-widest mb-3">Complete Data</p>
              <h1 className="font-heading text-6xl md:text-8xl tracking-heading text-text-primary mb-4">
                ROBOT <span className="text-accent-gold">DATABASE</span>
              </h1>
              <p className="text-text-secondary max-w-xl leading-relaxed">
                Every humanoid robot that matters, tracked in real time. Specs, scores, pricing, and availability — all in one place.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container-wide pb-20 space-y-8">
          {/* Filters + Search bar */}
          <div
            className="rounded-xl p-5 space-y-4"
            style={{ background: '#0D1020', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search robots, makers, countries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-sm"
              />
            </div>
            <RobotFilters />
          </div>

          {/* Sort row */}
          <RobotSort count={total} />

          {/* Grid */}
          <RobotGrid robots={robots} showRank />

          {/* Price tracker */}
          <div className="mt-12">
            <h2 className="font-heading text-3xl tracking-heading text-text-primary mb-6">PRICE TRACKER</h2>
            <PriceTrackerTable />
          </div>

          {/* Stats banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Models Tracked', value: '20+', color: '#00F0C8' },
              { label: 'Available Now', value: '3', color: '#00F0C8' },
              { label: 'Avg Price Drop', value: '−16%', color: '#00F0C8' },
              { label: 'New This Month', value: '4', color: '#F5C842' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-5 text-center"
                style={{ background: '#0D1020', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-2xl font-mono font-bold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs text-text-secondary mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}