// components/layout/NewsTicker.jsx
import { TICKER_ITEMS } from '../../utils/mockData'

export default function NewsTicker() {
  // Duplicate items for seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div
      className="w-full overflow-hidden py-2.5"
      style={{
        background: 'rgba(0,240,200,0.05)',
        borderBottom: '1px solid rgba(0,240,200,0.1)',
      }}
    >
      <div className="flex items-center gap-0">
        {/* Label */}
        <div
          className="flex-shrink-0 flex items-center gap-2 px-4 z-10"
          style={{ background: 'linear-gradient(90deg, #05060A 60%, transparent)' }}
        >
          <span
            className="w-2 h-2 rounded-full pulse-dot flex-shrink-0"
            style={{ background: '#00F0C8', boxShadow: '0 0 6px #00F0C8' }}
          />
          <span className="text-xs font-mono font-bold text-accent-teal tracking-widest uppercase whitespace-nowrap pr-4">
            BREAKING
          </span>
        </div>

        {/* Ticker track */}
        <div className="flex-1 overflow-hidden">
          <div className="ticker-track flex items-center gap-0">
            {items.map((item, i) => (
              <span key={i} className="flex items-center gap-6 flex-shrink-0">
                <span className="text-xs text-text-secondary font-mono whitespace-nowrap px-4">
                  {item}
                </span>
                <span className="text-text-muted text-xs">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
