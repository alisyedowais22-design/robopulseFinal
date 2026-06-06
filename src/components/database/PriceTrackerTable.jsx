// components/database/PriceTrackerTable.jsx
import { ROBOT_IMAGES } from '../../utils/robotImages'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { PRICE_TRACKER } from '../../utils/mockData'

function TrendBar({ change }) {
  const [width, setWidth] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setWidth(Math.abs(change)), 100)
      return () => clearTimeout(timer)
    }
  }, [inView, change])

  const color = change < 0 ? '#00F0C8' : change > 0 ? '#FF4060' : '#00ff00'
  return (
    <div ref={ref} className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000"
        style={{ width: `${Math.min(width * 2, 100)}%`, background: color }}
      />
    </div>
  )
}

export default function PriceTrackerTable() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0D1020' }}
      >
        <div>
          <h3 className="font-heading text-xl tracking-heading text-text-primary">PRICE TRACKER</h3>
          <p className="text-xs text-text-muted mt-0.5">6-month price changes across major models</p>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1 rounded"
          style={{ background: 'rgba(0,240,200,0.06)', border: '1px solid rgba(0,240,200,0.15)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-teal pulse-dot" />
          <span className="text-xs font-mono text-accent-teal">Live</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full" style={{ background: '#0A0C14' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              {['Model', 'Current', '6 Mo Ago', 'Change', 'Trend'].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-text-muted"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRICE_TRACKER.map((item, i) => {
              const isDown = item.change < 0
              const isUp = item.change > 0
              const changeColor = isDown ? '#00F0C8' : isUp ? '#FF4060' : '#fffb00'

              return (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-white/[0.02]"
                  style={{ borderBottom: i < PRICE_TRACKER.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img src={ROBOT_IMAGES[item.id]} alt={item.name} className="w-8 h-8 rounded-lg object-cover" onError={e => { e.currentTarget.style.display = "none" }} />
                      <span className="text-sm text-text-primary font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono font-bold text-text-primary">
                      ${item.current.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-text-secondary">
                      ${item.sixMonthAgo.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono font-bold" style={{ color: changeColor }}>
                      {isDown ? '↓' : isUp ? '↑' : '→'} {Math.abs(item.change)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <TrendBar change={item.change} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}