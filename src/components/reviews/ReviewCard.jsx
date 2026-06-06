// components/reviews/ReviewCard.jsx
import { motion } from 'framer-motion'
import ScoreBar from '../common/ScoreBar'
import { CategoryBadge } from '../common/Badge'
import { getScoreColor, formatDate } from '../../utils/helpers'

/**
 * ReviewCard — individual review listing card
 * Props: review (object)
 */
export default function ReviewCard({ review }) {
  const scoreColor = getScoreColor(review.score)

  const handleClick = () => {
    alert(`Opening review: ${review.robotName}\n\nScore: ${review.score}/100\n\n${review.excerpt}`)
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={handleClick}
      className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: '#0D1020',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${scoreColor}33`
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.5)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {review.tags.map((tag) => (
                <CategoryBadge key={tag} category={tag} color="teal" />
              ))}
            </div>
            <h3 className="font-semibold text-text-primary text-base leading-snug">
              {review.robotName} — In-Depth Review
            </h3>
          </div>
          <div className="flex-shrink-0 text-center">
            <div
              className="text-3xl font-mono font-bold leading-none"
              style={{ color: scoreColor }}
            >
              {review.score}
            </div>
            <div className="text-xs text-text-secondary font-mono mt-0.5">/ 100</div>
          </div>
        </div>

        {/* Score bar */}
        <ScoreBar score={review.score} color={review.score >= 90 ? 'teal' : review.score >= 80 ? 'purple' : 'gold'} showValue={false} />

        {/* Excerpt */}
        <p className="text-sm text-text-secondary leading-relaxed mt-4">
          {review.excerpt}
        </p>

        {/* Pros / Cons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div>
            <p className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-2">Pros</p>
            <ul className="space-y-1">
              {review.pros.slice(0, 3).map((p) => (
                <li key={p} className="text-xs text-text-secondary flex items-start gap-1.5">
                  <span className="text-accent-teal mt-0.5">+</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-mono text-accent-pink uppercase tracking-wider mb-2">Cons</p>
            <ul className="space-y-1">
              {review.cons.slice(0, 3).map((c) => (
                <li key={c} className="text-xs text-text-secondary flex items-start gap-1.5">
                  <span className="text-accent-pink mt-0.5">−</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between mt-4 pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'rgba(0,240,200,0.1)', color: '#00F0C8' }}
            >
              {review.author[0]}
            </div>
            <div>
              <p className="text-xs font-medium text-text-primary">{review.author}</p>
              <p className="text-xs text-text-secondary">{review.authorTitle}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-secondary">{formatDate(review.date)}</p>
            <p className="text-xs text-text-secondary">{review.readTime} read</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}