// components/compare/ComparePicker.jsx
import { ROBOT_IMAGES } from '../../utils/robotImages'
import { motion } from 'framer-motion'
import { useCompareStore } from '../../context/CompareContext'
import { getScoreColor } from '../../utils/helpers'

function RobotSlot({ robot, slot, label }) {
  const { openModal } = useCompareStore()
  const scoreColor = robot ? getScoreColor(robot.score) : '#3A4055'

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={() => openModal(slot)}
      className="flex-1 rounded-2xl p-6 cursor-pointer transition-all duration-300 text-center"
      style={{
        background: robot ? '#0D1020' : 'rgba(255,255,255,0.02)',
        border: robot ? `1px solid ${scoreColor}33` : '2px dashed rgba(255,255,255,0.1)',
        minHeight: '200px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = robot ? `${scoreColor}55` : 'rgba(0,240,200,0.3)'
        e.currentTarget.style.boxShadow = `0 8px 40px rgba(0,0,0,0.5)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = robot ? `${scoreColor}33` : '2px dashed rgba(255,255,255,0.1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {robot ? (
        <div>
          <img src={ROBOT_IMAGES[robot.id]} alt={robot.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-3" style={{ background: "rgba(255,255,255,0.04)" }} onError={e => { e.currentTarget.style.display = "none" }} />
          <h3 className="font-heading text-2xl tracking-heading text-text-primary mb-1">{robot.name.toUpperCase()}</h3>
          <p className="text-sm text-text-secondary mb-3">{robot.maker}</p>
          <div className="text-4xl font-mono font-bold mb-1" style={{ color: scoreColor }}>{robot.score}</div>
          <p className="text-xs font-mono" style={{ color: '#7F8AA8' }}>SCORE / 100</p>
          <div
            className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-all hover:text-accent-teal"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#A7B0C8' }}
          >
            ✎ Change Robot
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full min-h-[140px] gap-3">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: 'rgba(0,240,200,0.06)', border: '1px solid rgba(0,240,200,0.15)' }}
          >
            +
          </div>
          <div>
            <p className="text-sm font-semibold text-text-secondary">{label}</p>
            <p className="text-xs text-text-secondary mt-1">Click to select a robot</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default function ComparePicker() {
  const { robotA, robotB } = useCompareStore()

  return (
    <div className="flex items-stretch gap-4 flex-col md:flex-row">
      <RobotSlot robot={robotA} slot="A" label="Robot A" />

      {/* VS divider */}
      <div className="flex items-center justify-center px-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-text-muted to-transparent hidden md:block" />
          <span
            className="font-heading text-2xl tracking-heading px-3 py-1.5 rounded-lg"
            style={{
              color: '#FF4060',
              background: 'rgba(255,64,96,0.08)',
              border: '1px solid rgba(255,64,96,0.2)',
            }}
          >
            VS
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-text-muted via-text-muted to-transparent hidden md:block" />
        </div>
      </div>

      <RobotSlot robot={robotB} slot="B" label="Robot B" />
    </div>
  )
}