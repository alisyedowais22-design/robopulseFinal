// components/common/Badge.jsx

/**
 * Badge — country/availability/category badges
 * Props: type ('country'|'avail'|'category'), value, label
 */

const AVAIL_STYLES = {
  available: { bg: 'rgba(0,240,200,0.12)', border: 'rgba(0,240,200,0.3)', color: '#00F0C8', dot: true },
  beta: { bg: 'rgba(245,200,66,0.12)', border: 'rgba(245,200,66,0.3)', color: '#F5C842', dot: true },
  soon: { bg: 'rgba(108,99,255,0.12)', border: 'rgba(108,99,255,0.3)', color: '#6C63FF', dot: false },
  research: { bg: 'rgba(255,64,96,0.12)', border: 'rgba(255,64,96,0.3)', color: '#FF4060', dot: false },
}

const COUNTRY_STYLES = {
  US: { bg: 'rgba(0,112,255,0.12)', border: 'rgba(0,112,255,0.25)', color: '#4080FF', label: '🇺🇸 US' },
  CN: { bg: 'rgba(255,64,60,0.12)', border: 'rgba(255,64,60,0.25)', color: '#FF5050', label: '🇨🇳 CN' },
  EU: { bg: 'rgba(108,99,255,0.12)', border: 'rgba(108,99,255,0.25)', color: '#6C63FF', label: '🇪🇺 EU' },
}

const CATEGORY_STYLES = {
  teal: { bg: 'rgba(0,240,200,0.1)', border: 'rgba(0,240,200,0.25)', color: '#00F0C8' },
  gold: { bg: 'rgba(245,200,66,0.1)', border: 'rgba(245,200,66,0.25)', color: '#F5C842' },
  purple: { bg: 'rgba(108,99,255,0.1)', border: 'rgba(108,99,255,0.25)', color: '#6C63FF' },
  pink: { bg: 'rgba(255,64,96,0.1)', border: 'rgba(255,64,96,0.25)', color: '#FF4060' },
}

export function AvailBadge({ availClass, label }) {
  const style = AVAIL_STYLES[availClass] || AVAIL_STYLES.soon
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium"
      style={{ background: style.bg, border: `1px solid ${style.border}`, color: style.color }}
    >
      {style.dot && (
        <span
          className="w-1.5 h-1.5 rounded-full pulse-dot"
          style={{ background: style.color }}
        />
      )}
      {label}
    </span>
  )
}

export function CountryBadge({ countryCode }) {
  const style = COUNTRY_STYLES[countryCode] || COUNTRY_STYLES.EU
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-semibold"
      style={{ background: style.bg, border: `1px solid ${style.border}`, color: style.color }}
    >
      {style.label}
    </span>
  )
}

export function CategoryBadge({ category, color = 'teal' }) {
  const style = CATEGORY_STYLES[color] || CATEGORY_STYLES.teal
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono font-semibold uppercase tracking-wider"
      style={{ background: style.bg, border: `1px solid ${style.border}`, color: style.color }}
    >
      {category}
    </span>
  )
}

export default function Badge({ type = 'category', value, label, color }) {
  if (type === 'country') return <CountryBadge countryCode={value} />
  if (type === 'avail') return <AvailBadge availClass={value} label={label} />
  return <CategoryBadge category={label || value} color={color} />
}
