// components/compare/CompareTable.jsx
import { ROBOT_IMAGES } from '../../utils/robotImages'

const SPECS = [
  { key: 'price', label: 'Price' },
  { key: 'height', label: 'Height' },
  { key: 'weight', label: 'Weight' },
  { key: 'dof', label: 'Degrees of Freedom' },
  { key: 'speed', label: 'Walking Speed' },
  { key: 'battery', label: 'Battery Life' },
  { key: 'ai', label: 'AI System' },
  { key: 'hand', label: 'Hand Type' },
  { key: 'availability', label: 'Availability' },
  { key: 'deploy', label: 'Deployment' },
]

export default function CompareTable({ robotA, robotB }) {
  if (!robotA || !robotB) return null

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Header */}
      <div
        className="grid grid-cols-3 gap-0"
        style={{ background: '#0D1020', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="p-4">
          <span className="text-xs font-mono uppercase tracking-widest text-text-secondary">Specification</span>
        </div>
        <div className="p-4 text-center" style={{ borderLeft: '1px solid rgba(255,255,255,0.04)' }}>
          <img src={ROBOT_IMAGES[robotA.id]} alt={robotA.name} className="w-8 h-8 rounded-lg object-cover mx-auto" onError={e => { e.currentTarget.style.display = "none" }} />
          <p className="text-xs font-semibold text-text-primary mt-1">{robotA.name}</p>
        </div>
        <div className="p-4 text-center" style={{ borderLeft: '1px solid rgba(255,255,255,0.04)' }}>
          <img src={ROBOT_IMAGES[robotB.id]} alt={robotB.name} className="w-8 h-8 rounded-lg object-cover mx-auto" onError={e => { e.currentTarget.style.display = "none" }} />
          <p className="text-xs font-semibold text-text-primary mt-1">{robotB.name}</p>
        </div>
      </div>

      {/* Rows */}
      {SPECS.map((spec, i) => {
        const valA = robotA[spec.key]
        const valB = robotB[spec.key]

        // Numeric comparison
        let winA = false
        let winB = false
        const numA = typeof valA === 'number' ? valA : null
        const numB = typeof valB === 'number' ? valB : null
        if (numA !== null && numB !== null) {
          // For weight, lower is better; for others, higher is better
          if (spec.key === 'weight') {
            winA = numA < numB
            winB = numB < numA
          } else {
            winA = numA > numB
            winB = numB > numA
          }
        }

        return (
          <div
            key={spec.key}
            className="grid grid-cols-3 gap-0 hover:bg-white/[0.01] transition-colors"
            style={{
              background: i % 2 === 0 ? '#0A0C14' : '#0D1020',
              borderBottom: i < SPECS.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
            }}
          >
            <div className="p-4">
              <span className="text-xs text-text-secondary font-mono">{spec.label}</span>
            </div>
            <div
              className="p-4 text-center"
              style={{ borderLeft: '1px solid rgba(255,255,255,0.03)' }}
            >
              <span
                className="text-sm font-mono"
                style={{ color: winA ? '#00F0C8' : winB ? '#4DD9AC' : '#E8EAF0' }}
              >
                {winA && '★ '}{String(valA)}
              </span>
            </div>
            <div
              className="p-4 text-center"
              style={{ borderLeft: '1px solid rgba(255,255,255,0.03)' }}
            >
              <span
                className="text-sm font-mono"
                style={{ color: winB ? '#6C63FF' : winA ? '#4DD9AC' : '#E8EAF0' }}
              >
                {winB && '★ '}{String(valB)}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}