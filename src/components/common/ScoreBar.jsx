// components/common/ScoreBar.jsx
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

const COLOR_MAP = {
  teal: '#00F0C8',
  purple: '#6C63FF',
  pink: '#FF4060',
  gold: '#F5C842',
}

/**
 * ScoreBar — animated progress bar that fills on scroll
 * Props: score (0-100), label, showValue, color, size
 */
export default function ScoreBar({ score = 0, label, showValue = true, color = 'teal', size = 'md' }) {
  const [width, setWidth] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setWidth(score), 100)
      return () => clearTimeout(timer)
    }
  }, [inView, score])

  const accent = COLOR_MAP[color] || COLOR_MAP.teal
  const heightClass = size === 'sm' ? 'h-1' : size === 'lg' ? 'h-2.5' : 'h-1.5'

  return (
    <div ref={ref} className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-xs text-text-secondary font-mono uppercase tracking-wider">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-xs font-mono font-bold" style={{ color: accent }}>
              {score}
            </span>
          )}
        </div>
      )}
      <div className={`w-full ${heightClass} bg-white/5 rounded-full overflow-hidden`}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${accent}99, ${accent})`,
            boxShadow: `0 0 8px ${accent}40`,
          }}
        />
      </div>
    </div>
  )
}
