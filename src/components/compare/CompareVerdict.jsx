// components/compare/CompareVerdict.jsx
import { ROBOT_IMAGES } from '../../utils/robotImages'
import { motion } from 'framer-motion'
import { getScoreColor } from '../../utils/helpers'

export default function CompareVerdict({ robotA, robotB }) {
  if (!robotA || !robotB) return null

  const winner = robotA.score >= robotB.score ? robotA : robotB
  const loser = winner === robotA ? robotB : robotA
  const winnerColor = winner === robotA ? '#00F0C8' : '#6C63FF'
  const diff = Math.abs(robotA.score - robotB.score)

  const chooseA = robotA.priceNum < robotB.priceNum
    ? `You prioritize value — ${robotA.name} costs ${robotA.price} vs ${robotB.price}`
    : `You need ${robotA.tags[0]} capability and availability matters`

  const chooseB = robotB.scoreBreakdown.dexterity > robotA.scoreBreakdown.dexterity
    ? `You need maximum hand dexterity for precision tasks`
    : `You prefer ${robotB.maker}'s ecosystem and support`

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${winnerColor}33` }}
    >
      {/* Winner banner */}
      <div
        className="px-6 py-5 text-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${winnerColor}12, ${winnerColor}06)` }}
      >
        <div
          className="glow-orb w-48 h-48 opacity-20"
          style={{ background: `radial-gradient(circle, ${winnerColor}, transparent)`, top: '-50%', left: '50%', transform: 'translateX(-50%)' }}
        />
        <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: winnerColor }}>
          Our Verdict
        </p>
        <div className="flex items-center justify-center gap-3 mb-1">
          <img src={ROBOT_IMAGES[winner.id]} alt={winner.name} className="w-12 h-12 rounded-xl object-cover" onError={e => { e.currentTarget.style.display = "none" }} />
          <h3 className="font-heading text-3xl tracking-heading" style={{ color: winnerColor }}>
            {winner.name.toUpperCase()} WINS
          </h3>
        </div>
        {diff > 0 && (
          <p className="text-sm text-text-secondary">
            by <span className="font-mono font-bold" style={{ color: winnerColor }}>{diff} points</span> overall
          </p>
        )}
      </div>

      {/* Verdict text */}
      <div className="p-6" style={{ background: '#0D1020' }}>
        <p className="text-sm text-text-secondary leading-relaxed mb-6">
          {winner.verdict}
        </p>

        {/* Choose if */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="rounded-lg p-4"
            style={{ background: 'rgba(0,240,200,0.04)', border: '1px solid rgba(0,240,200,0.12)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <img src={ROBOT_IMAGES[robotA.id]} alt={robotA.name} className="w-8 h-8 rounded-lg object-cover" onError={e => { e.currentTarget.style.display = "none" }} />
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-accent-teal">
                Choose {robotA.name} if…
              </p>
            </div>
            <ul className="space-y-2">
              <li className="text-xs text-text-secondary flex items-start gap-2">
                <span className="text-accent-teal mt-0.5 flex-shrink-0">→</span>
                {chooseA}
              </li>
              <li className="text-xs text-text-secondary flex items-start gap-2">
                <span className="text-accent-teal mt-0.5 flex-shrink-0">→</span>
                You want it available sooner ({robotA.availability})
              </li>
              <li className="text-xs text-text-secondary flex items-start gap-2">
                <span className="text-accent-teal mt-0.5 flex-shrink-0">→</span>
                {robotA.countryCode === 'US' ? 'US-made hardware and support matters to you' : 'You\'re comfortable with international supply chains'}
              </li>
            </ul>
          </div>

          <div
            className="rounded-lg p-4"
            style={{ background: 'rgba(108,99,255,0.04)', border: '1px solid rgba(108,99,255,0.12)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <img src={ROBOT_IMAGES[robotB.id]} alt={robotB.name} className="w-8 h-8 rounded-lg object-cover" onError={e => { e.currentTarget.style.display = "none" }} />
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-accent-purple">
                Choose {robotB.name} if…
              </p>
            </div>
            <ul className="space-y-2">
              <li className="text-xs text-text-secondary flex items-start gap-2">
                <span className="text-accent-purple mt-0.5 flex-shrink-0">→</span>
                {chooseB}
              </li>
              <li className="text-xs text-text-secondary flex items-start gap-2">
                <span className="text-accent-purple mt-0.5 flex-shrink-0">→</span>
                You want {robotB.deploy} deployment capability
              </li>
              <li className="text-xs text-text-secondary flex items-start gap-2">
                <span className="text-accent-purple mt-0.5 flex-shrink-0">→</span>
                {robotB.ai} integration fits your tech stack
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom scores */}
        <div
          className="flex items-center justify-around mt-6 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="text-center">
            <p className="text-2xl font-mono font-bold" style={{ color: getScoreColor(robotA.score) }}>{robotA.score}</p>
            <p className="text-xs text-text-secondary font-mono mt-0.5">{robotA.name}</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-mono text-text-secondary uppercase tracking-widest">Score</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-mono font-bold" style={{ color: getScoreColor(robotB.score) }}>{robotB.score}</p>
            <p className="text-xs text-text-secondary font-mono mt-0.5">{robotB.name}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}