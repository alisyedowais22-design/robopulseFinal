// components/robots/RobotSort.jsx
import { SORT_OPTIONS } from '../../utils/constants'
import { useRobotStore } from '../../context/RobotContext'

/**
 * RobotSort — result count + sort dropdown
 * Props: count (number)
 */
export default function RobotSort({ count }) {
  const { sort, setSort } = useRobotStore()

  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-text-secondary font-mono">
        <span className="text-accent-teal font-bold">{count}</span> robots
      </p>
      <div className="flex items-center gap-2">
        <label className="text-xs text-text-muted font-mono uppercase">Sort</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-sm py-1.5 px-3 cursor-pointer"
          style={{
            background: 'rgba(13,16,32,0.8)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#E8EAF0',
            borderRadius: '6px',
          }}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
