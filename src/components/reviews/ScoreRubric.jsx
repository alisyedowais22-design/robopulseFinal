// components/reviews/ScoreRubric.jsx
import { SCORE_METRICS } from '../../utils/mockData'
import ScoreBar from '../common/ScoreBar'

export default function ScoreRubric() {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: '#0D1020', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <h3 className="font-heading text-xl tracking-heading text-text-primary mb-1">SCORING RUBRIC</h3>
      <p className="text-xs text-text-secondary mb-6">How we evaluate every humanoid robot on RoboPulse.</p>

      <div className="space-y-5">
        {SCORE_METRICS.map((metric) => (
          <div key={metric.key}>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <p className="text-sm font-semibold text-text-primary">{metric.label}</p>
                <p className="text-xs text-text-muted mt-0.5">{metric.description}</p>
              </div>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded flex-shrink-0"
                style={{
                  background: metric.color === 'teal' ? 'rgba(0,240,200,0.1)' : metric.color === 'purple' ? 'rgba(108,99,255,0.1)' : metric.color === 'gold' ? 'rgba(245,200,66,0.1)' : 'rgba(255,64,96,0.1)',
                  color: metric.color === 'teal' ? '#00F0C8' : metric.color === 'purple' ? '#6C63FF' : metric.color === 'gold' ? '#F5C842' : '#FF4060',
                }}
              >
                /100
              </span>
            </div>
            <div
              className="h-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.04)' }}
            />
          </div>
        ))}
      </div>

      <div
        className="mt-6 pt-4 text-xs text-text-muted leading-relaxed"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        Final score = weighted average. Dexterity (20%), AI (25%), Value (15%), Hype (10%), Real-world (20%), Build (10%).
      </div>
    </div>
  )
}
