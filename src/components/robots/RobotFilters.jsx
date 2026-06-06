// components/robots/RobotFilters.jsx
import { FILTER_OPTIONS } from '../../utils/constants'
import { useRobotStore } from '../../context/RobotContext'

export default function RobotFilters() {
  const { filter, setFilter } = useRobotStore()

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {FILTER_OPTIONS.map((opt) => {
        const isActive = filter === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              background: isActive ? 'rgba(0,240,200,0.12)' : 'rgba(255,255,255,0.04)',
              border: isActive ? '1px solid rgba(0,240,200,0.3)' : '1px solid rgba(255,255,255,0.06)',
              color: isActive ? '#00F0C8' : '#00ff0d',
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
