// pages/Reviews.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/common/PageTransition'
import SEO from '../components/common/SEO'
import { reviewsApi } from '../api/endpoints'

const isFeatured = (value) => {
  return value === true || value === 'true' || value === '1' || value === 1
}

const cleanText = (value) => {
  if (!value) return ''
  return String(value).replace(/<[^>]*>/g, '')
}

const getReviewTitle = (review) => {
  return (
    review?.robotName ||
    review?.title ||
    review?.name ||
    'Untitled Review'
  )
}

const getReviewDate = (review) => {
  return (
    review?.displayDate ||
    review?.date ||
    review?.createdAt ||
    ''
  )
}

const getReviewSlug = (review) => {
  return review?.slug || review?.id || review?.wpId
}

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const loadReviews = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await reviewsApi.getAll()
        const safeData = Array.isArray(data) ? data : []

        if (mounted) {
          setReviews(safeData)
        }
      } catch (err) {
        console.error('Reviews loading error:', err)

        if (mounted) {
          setReviews([])
          setError('Unable to load reviews right now.')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadReviews()

    return () => {
      mounted = false
    }
  }, [])

  const safeReviews = Array.isArray(reviews) ? reviews : []

  const featuredReview =
    safeReviews.find((review) => isFeatured(review?.featured)) ||
    safeReviews[0] ||
    null

  const otherReviews = featuredReview
    ? safeReviews.filter((review) => {
        const featuredId =
          featuredReview?.id ||
          featuredReview?.wpId ||
          featuredReview?.slug

        const currentId =
          review?.id ||
          review?.wpId ||
          review?.slug

        return currentId !== featuredId
      })
    : []

  return (
    <PageTransition>
      <div className="min-h-screen bg-bg-primary text-text-primary">
        <SEO
          title="Humanoid Robot Reviews — RoboPulse"
          description="Read expert humanoid robot reviews with real-world analysis, RoboPulse scores, pros and cons, verdicts, pricing context, and buying insights."
          canonical="/reviews"
        />

        <main className="pt-32 pb-20">
          <section className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-accent-teal shadow-[0_0_14px_rgba(0,240,200,0.9)]" />

                <p className="font-mono text-xs tracking-[0.35em] uppercase text-accent-teal">
                  Expert Analysis
                </p>
              </div>

              <h1 className="font-heading text-6xl md:text-8xl uppercase leading-none mb-6">
                Robot <span className="text-gradient-teal">Reviews</span>
              </h1>

              <p className="max-w-2xl text-text-secondary text-lg">
                In-depth humanoid robot reviews, real-world analysis, and expert verdicts.
              </p>
            </motion.div>

            {loading && (
              <div className="rounded-2xl border border-white/10 bg-bg-card/80 p-10">
                <p className="font-mono text-sm uppercase tracking-widest text-accent-teal">
                  Loading reviews...
                </p>
              </div>
            )}

            {!loading && error && (
              <div className="rounded-2xl border border-accent-pink/30 bg-accent-pink/10 p-8 mb-8">
                <p className="text-accent-pink font-mono text-sm uppercase tracking-widest">
                  {error}
                </p>
              </div>
            )}

            {!loading && safeReviews.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-bg-card/80 p-10">
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent-teal mb-4">
                  Reviews
                </p>

                <h2 className="font-heading text-4xl md:text-6xl uppercase mb-4">
                  No Reviews Found
                </h2>

                <p className="text-text-secondary max-w-2xl">
                  No robot reviews are currently published. Add a review from WordPress admin to display it here.
                </p>
              </div>
            )}

            {!loading && featuredReview && (
              <>
                <section className="mb-14">
                  <Link
                    to={`/reviews/${getReviewSlug(featuredReview)}`}
                    className="block rounded-3xl border border-accent-teal/25 bg-bg-card/90 overflow-hidden shadow-[0_0_40px_rgba(0,240,200,0.08)] hover:border-accent-teal/50 transition-all duration-300"
                  >
                    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-0">
                      <div className="p-8 md:p-10">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                          <span className="px-3 py-1 rounded-full border border-accent-teal/40 bg-accent-teal/10 text-accent-teal font-mono text-xs uppercase">
                            Featured Review
                          </span>

                          {getReviewDate(featuredReview) && (
                            <span className="text-text-muted font-mono text-xs">
                              {getReviewDate(featuredReview)}
                            </span>
                          )}

                          {featuredReview?.readTime && (
                            <span className="text-text-muted font-mono text-xs">
                              {featuredReview.readTime} read
                            </span>
                          )}
                        </div>

                        <h2 className="font-heading text-4xl md:text-6xl uppercase leading-none mb-5 group-hover:text-accent-teal">
                          {getReviewTitle(featuredReview)}
                        </h2>

                        <p className="text-text-secondary text-lg leading-relaxed mb-8">
                          {cleanText(featuredReview?.excerpt || featuredReview?.description)}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mb-8">
                          <div className="w-24 h-24 rounded-2xl border border-accent-teal/30 bg-accent-teal/10 flex flex-col items-center justify-center">
                            <span className="text-4xl font-heading text-accent-teal">
                              {featuredReview?.score || 0}
                            </span>

                            <span className="text-xs font-mono text-text-muted uppercase">
                              Score
                            </span>
                          </div>

                          <div>
                            <p className="text-text-primary font-semibold">
                              {featuredReview?.authorName ||
                                featuredReview?.author ||
                                featuredReview?.source ||
                                'RoboPulse Staff'}
                            </p>

                            {(featuredReview?.authorTitle || featuredReview?.category) && (
                              <p className="text-text-muted text-sm">
                                {featuredReview?.authorTitle || featuredReview?.category}
                              </p>
                            )}
                          </div>
                        </div>

                        {featuredReview?.verdict && (
                          <div className="rounded-2xl border border-white/10 bg-bg-secondary/80 p-5">
                            <p className="font-mono text-xs uppercase tracking-widest text-accent-gold mb-2">
                              Verdict
                            </p>

                            <p className="text-text-secondary">
                              {cleanText(featuredReview.verdict)}
                            </p>
                          </div>
                        )}

                        <div className="mt-6 text-accent-teal font-mono text-xs uppercase">
                          Read full review →
                        </div>
                      </div>

                      <div className="border-t lg:border-t-0 lg:border-l border-white/10 p-8 md:p-10 bg-bg-secondary/50">
                        <div className="grid gap-6">
                          {Array.isArray(featuredReview?.pros) && featuredReview.pros.length > 0 && (
                            <div>
                              <h3 className="font-mono text-xs uppercase tracking-widest text-accent-teal mb-4">
                                Pros
                              </h3>

                              <ul className="space-y-3">
                                {featuredReview.pros.map((item, index) => (
                                  <li key={index} className="flex gap-3 text-text-secondary">
                                    <span className="text-accent-teal">+</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {Array.isArray(featuredReview?.cons) && featuredReview.cons.length > 0 && (
                            <div>
                              <h3 className="font-mono text-xs uppercase tracking-widest text-accent-pink mb-4">
                                Cons
                              </h3>

                              <ul className="space-y-3">
                                {featuredReview.cons.map((item, index) => (
                                  <li key={index} className="flex gap-3 text-text-secondary">
                                    <span className="text-accent-pink">−</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {Array.isArray(featuredReview?.tags) && featuredReview.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                              {featuredReview.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-text-muted font-mono text-xs uppercase"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </section>

                {otherReviews.length > 0 && (
                  <section>
                    <h2 className="font-heading text-4xl uppercase mb-8">
                      More Reviews
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {otherReviews.map((review, index) => (
                        <motion.div
                          key={review?.id || review?.wpId || review?.slug || index}
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: index * 0.05 }}
                        >
                          <Link
                            to={`/reviews/${getReviewSlug(review)}`}
                            className="block h-full rounded-2xl border border-white/10 bg-bg-card/80 p-6 hover:border-accent-teal/40 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-5">
                              <span className="font-mono text-xs text-text-muted">
                                {getReviewDate(review)}
                              </span>

                              <span className="text-2xl font-heading text-accent-teal">
                                {review?.score || 0}
                              </span>
                            </div>

                            <h3 className="font-heading text-3xl uppercase mb-4">
                              {getReviewTitle(review)}
                            </h3>

                            <p className="text-text-secondary text-sm leading-relaxed mb-5">
                              {cleanText(review?.excerpt || review?.description)}
                            </p>

                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs text-text-muted">
                                {review?.readTime || ''}
                              </span>

                              <span className="text-accent-teal font-mono text-xs uppercase">
                                Review →
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </section>
        </main>
      </div>
    </PageTransition>
  )
}