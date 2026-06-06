// components/compare/RobotSelectorModal.jsx
import { ROBOT_IMAGES } from '../../utils/robotImages'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCompareStore } from '../../context/CompareContext'
import { useRobotData } from '../../hooks/useRobotData'
import { CountryBadge, AvailBadge } from '../common/Badge'
import { getScoreColor } from '../../utils/helpers'

export default function RobotSelectorModal() {
  const { modalOpen, closeModal, selectRobot, selectingSlot } = useCompareStore()
  const [search, setSearch] = useState('')
  const { robots } = useRobotData()

  const filtered = robots.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.maker.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AnimatePresence>
      {modalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(5,6,10,0.85)', backdropFilter: 'blur(6px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-3xl mx-auto rounded-2xl overflow-hidden"
            style={{
              background: '#0A0C14',
              border: '1px solid rgba(255,255,255,0.1)',
              maxHeight: '80vh',
            }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div>
                <h3 className="font-heading text-xl tracking-heading text-text-primary">
                  SELECT ROBOT {selectingSlot}
                </h3>
                <p className="text-xs text-text-muted">Choose a robot to compare</p>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                ✕
              </button>
            </div>

            {/* Search */}
            <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <input
                type="text"
                placeholder="Search robots..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-sm"
                autoFocus
              />
            </div>

            {/* Grid */}
            <div className="overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ maxHeight: '50vh' }}>
              {filtered.map((robot) => {
                const scoreColor = getScoreColor(robot.score)
                return (
                  <motion.button
                    key={robot.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => selectRobot(robot)}
                    className="text-left rounded-xl p-4 transition-all duration-200"
                    style={{
                      background: '#0D1020',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0,240,200,0.25)'
                      e.currentTarget.style.background = '#10131E'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                      e.currentTarget.style.background = '#0D1020'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img src={ROBOT_IMAGES[robot.id]} alt={robot.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)" }} onError={e => { e.currentTarget.style.display = "none" }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold text-text-primary truncate">{robot.name}</h4>
                          <span className="text-sm font-mono font-bold flex-shrink-0" style={{ color: scoreColor }}>
                            {robot.score}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted">{robot.maker}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <CountryBadge countryCode={robot.countryCode} />
                      <AvailBadge availClass={robot.availClass} label={robot.availability} />
                      <span className="text-xs font-mono text-text-muted ml-auto">{robot.price}</span>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}