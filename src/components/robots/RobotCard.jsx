// components/robots/RobotCard.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import ScoreBar from '../common/ScoreBar'
import { AvailBadge, CountryBadge } from '../common/Badge'
import { getScoreColor, getRobotImage } from '../../utils/helpers'

export default function RobotCard({ robot, rank, compact = false }) {
  const scoreColor = getScoreColor(robot.score)
  const [imgError, setImgError] = useState(false)
  const imgSrc = getRobotImage(robot)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group relative rounded-xl overflow-hidden cursor-pointer flex flex-col"
      style={{
        background: '#0D1020',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${scoreColor}33`
        e.currentTarget.style.boxShadow = `0 8px 40px rgba(0,0,0,0.6), 0 0 20px ${scoreColor}11`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {rank && (
        <div
          className="absolute top-3 left-3 w-6 h-6 flex items-center justify-center rounded-full text-xs font-mono font-bold z-10"
          style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.1)', color: '#7A8299' }}
        >
          {rank}
        </div>
      )}

      <div className="p-5 pb-3 flex-1">
        <div className="flex items-center gap-3 mb-3">
          {/* Image box — fixed size always */}
          <div
            className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {imgSrc && !imgError ? (
              <img
                src={imgSrc}
                alt={robot.name}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-xl">🤖</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary text-sm leading-tight" style={{ wordBreak: 'break-word' }}>
              {robot.name}
            </h3>
            <p className="text-xs text-text-secondary mt-0.5 truncate">{robot.maker}</p>
          </div>

          <div
            className="flex-shrink-0 font-mono font-bold text-xl leading-none"
            style={{ color: scoreColor }}
          >
            {robot.score}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-3">
          <CountryBadge countryCode={robot.countryCode} />
          <AvailBadge availClass={robot.availClass} label={robot.availability} />
        </div>

        <ScoreBar
          score={robot.score}
          color={robot.score >= 90 ? 'teal' : robot.score >= 80 ? 'purple' : 'gold'}
          showValue={false}
          size="sm"
        />
      </div>

      {!compact && (
        <div
          className="px-5 py-3 grid grid-cols-2 gap-x-4 gap-y-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          {[
            
            { label: 'DOF',     value: robot.dof     },
            { label: 'Speed',   value: robot.speed   },
            { label: 'Battery', value: robot.battery },
          ].map((spec) => (
            <div key={spec.label}>
              <p className="text-xs text-text-secondary font-mono uppercase">{spec.label}</p>
              <p className="text-xs text-text-primary font-semibold mt-0.5 leading-snug">{spec.value}</p>
            </div>
          ))}
        </div>
      )}

      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="flex gap-1 flex-wrap">
          {robot.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ background: 'rgba(255,255,255,0.04)', color: '#3A4055' }}
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          to="/reviews"
          className="text-xs font-mono text-text-secondary hover:text-accent-teal transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          Review →
        </Link>
      </div>
    </motion.div>
  )
}