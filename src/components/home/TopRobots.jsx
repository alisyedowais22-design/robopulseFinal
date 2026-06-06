// components/home/TopRobots.jsx
import { ROBOT_IMAGES } from '../../utils/robotImages'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import ScoreBar from '../common/ScoreBar'
import { AvailBadge, CountryBadge } from '../common/Badge'
import { useMemo } from 'react'
import { useRobotData } from '../../hooks/useRobotData'
import { getScoreColor, getRobotImage } from '../../utils/helpers'

export default function TopRobots() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { robots } = useRobotData()
  const TOP_ROBOTS = useMemo(() => [...robots].sort((a, b) => b.score - a.score).slice(0, 6), [robots])

  return (
    <section className="py-20" ref={ref}>
      <div className="container-wide">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-mono text-accent-teal uppercase tracking-widest mb-2">Ranked</p>
            <h2 className="font-heading text-4xl tracking-heading text-text-primary">TOP ROBOTS 2025</h2>
          </div>
          <Link to="/database" className="text-sm text-text-secondary hover:text-accent-teal transition-colors font-mono">
            Full database →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {TOP_ROBOTS.map((robot, i) => {
            const scoreColor = getScoreColor(robot.score)
            return (
              <motion.div
                key={robot.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="group rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
                style={{ background: '#0D1020', border: '1px solid rgba(255,255,255,0.06)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${scoreColor}33`
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = `0 8px 40px rgba(0,0,0,0.6)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 font-mono font-bold text-sm"
                      style={{
                        background: i === 0 ? 'rgba(245,200,66,0.15)' : 'rgba(255,255,255,0.04)',
                        color: i === 0 ? '#F5C842' : '#3A4055',
                        border: i === 0 ? '1px solid rgba(245,200,66,0.3)' : '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {i + 1}
                    </div>

                    {/* Emoji */}
                    <img src={ROBOT_IMAGES[robot.id]} alt={robot.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)" }} onError={e => { e.currentTarget.style.display = "none" }} />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-text-primary text-sm truncate">{robot.name}</h3>
                        <span className="font-mono font-bold text-sm flex-shrink-0" style={{ color: scoreColor }}>
                          {robot.score}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-text-muted">{robot.maker}</span>
                        <span className="text-text-muted text-xs">·</span>
                        <span className="text-xs font-mono" style={{ color: robot.priceNum >= 999999 ? '#3A4055' : '#7A8299' }}>
                          {robot.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Score bar */}
                  <div className="mt-3">
                    <ScoreBar
                      score={robot.score}
                      color={robot.score >= 90 ? 'teal' : robot.score >= 80 ? 'purple' : 'gold'}
                      showValue={false}
                      size="sm"
                    />
                  </div>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <CountryBadge countryCode={robot.countryCode} />
                      <AvailBadge availClass={robot.availClass} label={robot.availability} />
                    </div>
                    {i === 0 && (
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)', color: '#F5C842' }}
                      >
                        #1 Pick
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Link to="/database" className="btn btn-outline">
            View All 40+ Robots →
          </Link>
        </div>
      </div>
    </section>
  )
}