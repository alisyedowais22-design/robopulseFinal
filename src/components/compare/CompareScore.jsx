// components/compare/CompareScore.jsx
import { ROBOT_IMAGES } from '../../utils/robotImages'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { SCORE_METRICS } from '../../utils/mockData'
import { getScoreColor } from '../../utils/helpers'

function CompareBar({ scoreA, scoreB, label, color }) {
  const [widthA, setWidthA] = useState(0)
  const [widthB, setWidthB] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setWidthA(scoreA)
        setWidthB(scoreB)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [inView, scoreA, scoreB])

  const colorA = '#00F0C8'
  const colorB = '#6C63FF'
  const winnerA = scoreA > scoreB

  return (
    <div ref={ref} className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-mono font-bold" style={{ color: winnerA ? colorA : '#7A8299' }}>{scoreA}</span>
        <span className="text-xs text-text-secondary uppercase tracking-wider font-mono">{label}</span>
        <span className="text-sm font-mono font-bold" style={{ color: !winnerA ? colorB : '#7A8299' }}>{scoreB}</span>
      </div>
      <div className="flex gap-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
        {/* A bar (fills from left) */}
        <div className="h-full rounded-l-full transition-all duration-1000 ease-out" style={{ width: `${widthA / 2}%`, background: colorA }} />
        {/* B bar (fills from right) */}
        <div className="h-full rounded-r-full transition-all duration-1000 ease-out ml-auto" style={{ width: `${widthB / 2}%`, background: colorB }} />
      </div>
    </div>
  )
}

export default function CompareScore({ robotA, robotB }) {
  if (!robotA || !robotB) return null

  return (
    <div
      className="rounded-xl p-6"
      style={{ background: '#0D1020', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Legend */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <img src={ROBOT_IMAGES[robotA.id]} alt={robotA.name} className="w-8 h-8 rounded-lg object-cover" onError={e => { e.currentTarget.style.display = "none" }} />
          <span className="text-sm font-semibold text-text-primary">{robotA.name}</span>
          <div className="w-3 h-3 rounded-full" style={{ background: '#00F0C8' }} />
        </div>
        <span className="font-heading text-lg tracking-heading text-text-secondary">SCORE BREAKDOWN</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: '#6C63FF' }} />
          <span className="text-sm font-semibold text-text-primary">{robotB.name}</span>
          <img src={ROBOT_IMAGES[robotB.id]} alt={robotB.name} className="w-8 h-8 rounded-lg object-cover" onError={e => { e.currentTarget.style.display = "none" }} />
        </div>
      </div>

      {SCORE_METRICS.map((metric) => (
        <CompareBar
          key={metric.key}
          label={metric.label}
          scoreA={robotA.scoreBreakdown[metric.key]}
          scoreB={robotB.scoreBreakdown[metric.key]}
          color={metric.color}
        />
      ))}

      {/* Total scores */}
      <div
        className="flex items-center justify-between mt-4 pt-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="text-center">
          <div className="text-3xl font-mono font-bold" style={{ color: getScoreColor(robotA.score) }}>{robotA.score}</div>
          <div className="text-xs text-text-secondary">TOTAL SCORE</div>
        </div>
        <span className="font-heading text-xl tracking-heading text-text-secondary">VS</span>
        <div className="text-center">
          <div className="text-3xl font-mono font-bold" style={{ color: getScoreColor(robotB.score) }}>{robotB.score}</div>
          <div className="text-xs text-text-secondary">TOTAL SCORE</div>
        </div>
      </div>
    </div>
  )
}