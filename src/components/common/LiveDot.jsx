// components/common/LiveDot.jsx

/**
 * LiveDot — blinking live indicator
 * Props: text, color
 */
export default function LiveDot({ text = 'LIVE', color = '#00F0C8' }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="w-2 h-2 rounded-full pulse-dot"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />
      {text && (
        <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color }}>
          {text}
        </span>
      )}
    </span>
  )
}
