// components/robots/RobotGrid.jsx
import { motion } from 'framer-motion'
import RobotCard from './RobotCard'

export default function RobotGrid({ robots, showRank = false }) {
  if (!robots || robots.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-4">🤖</p>
        <p className="text-text-secondary">No robots match your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
      {robots.map((robot, i) => (
        <motion.div
          key={robot.id}
          className="flex"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.35 }}
        >
          <div className="w-full">
            <RobotCard robot={robot} rank={showRank ? i + 1 : undefined} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}