// pages/AuthorPage.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/common/PageTransition'
import SEO from '../components/common/SEO'
import { authorsApi } from '../api/endpoints'
import { formatDate } from '../utils/helpers'

function getPostUrl(post) {
  const base = post.urlBase || '/news'
  const slug = post.slug || post.id || post.wpId
  return `${base}/${slug}`
}

function getPostLabel(post) {
  if (post.postType === 'reviews') return 'Review'
  if (post.postType === 'guides') return 'Guide'
  return 'News'
}

export default function AuthorPage() {
  const { authorSlug } = useParams()

  const [author, setAuthor] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadAuthor() {
      try {
        setLoading(true)
        setError('')

        const bundle = await authorsApi.getBundleBySlug(authorSlug)

        if (active) {
          setAuthor(bundle?.author || null)
          setPosts(Array.isArray(bundle?.posts) ? bundle.posts : [])
        }
      } catch (err) {
        console.error('Author page error:', err)

        if (active) {
          setError('Unable to load author profile.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadAuthor()

    return () => {
      active = false
    }
  }, [authorSlug])

  const seoTitle = author?.name
    ? `${author.name} — RoboPulse Author Profile`
    : 'Author Profile — RoboPulse'

  const seoDescription = author?.bio
    ? author.bio
    : 'Read the latest articles, guides, reviews, and robotics industry coverage from RoboPulse authors.'

  return (
    <PageTransition>
      <div className="min-h-[75vh] pt-28 pb-24 overflow-hidden">
        <SEO
          title={seoTitle}
          description={seoDescription}
          canonical={`/author/${authorSlug}`}
          image={author?.avatar || undefined}
          type="profile"
        />

        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-[520px] h-[520px] rounded-full opacity-10 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #00F0C8, transparent 70%)',
              top: '80px',
              right: '5%',
            }}
          />

          <div
            className="absolute w-[420px] h-[420px] rounded-full opacity-10 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #6C63FF, transparent 70%)',
              bottom: '5%',
              left: '0%',
            }}
          />
        </div>

        <div className="container-wide relative z-10">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-mono text-accent-teal mb-10 transition-opacity hover:opacity-75"
          >
            ← Back to News
          </Link>

          {loading && (
            <div
              className="rounded-3xl p-10"
              style={{
                background: 'rgba(13,16,32,0.85)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p className="font-mono text-sm uppercase tracking-widest text-text-secondary">
                Loading author...
              </p>
            </div>
          )}

          {!loading && error && (
            <div
              className="rounded-3xl p-10"
              style={{
                background: 'rgba(255,64,96,0.08)',
                border: '1px solid rgba(255,64,96,0.25)',
              }}
            >
              <h1 className="font-heading text-5xl text-text-primary mb-4">
                ERROR
              </h1>

              <p className="text-accent-pink">{error}</p>
            </div>
          )}

          {!loading && !error && !author && (
            <div
              className="rounded-3xl p-10"
              style={{
                background: 'rgba(13,16,32,0.85)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <h1 className="font-heading text-5xl text-text-primary mb-4">
                AUTHOR NOT FOUND
              </h1>

              <p className="text-text-secondary">
                This author profile is not available.
              </p>
            </div>
          )}

          {!loading && !error && author && (
            <div>
              <motion.section
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="rounded-[32px] p-7 md:p-12 mb-12"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(13,16,32,0.96), rgba(5,6,10,0.92))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
                }}
              >
                <div className="flex flex-col md:flex-row gap-7 md:items-center">
                  {author.avatar ? (
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-28 h-28 rounded-3xl object-cover border border-white/10 bg-white/5"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-3xl flex items-center justify-center border border-white/10 bg-white/5 text-accent-teal">
                      <span className="font-heading text-5xl">
                        {author.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent-teal mb-3">
                      Author Profile
                    </p>

                    <h1 className="font-heading text-5xl md:text-7xl uppercase leading-none text-text-primary mb-5">
                      {author.name}
                    </h1>

                    {author.bio ? (
                      <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
                        {author.bio}
                      </p>
                    ) : (
                      <p className="text-lg text-text-muted leading-relaxed max-w-3xl">
                        No author biography has been added yet.
                      </p>
                    )}

                    <div className="mt-6 flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-accent-teal/10 border border-accent-teal/30 text-accent-teal font-mono text-xs uppercase">
                        {posts.length} Posts
                      </span>
                    </div>
                  </div>
                </div>
              </motion.section>

              <section>
                <div className="flex items-center justify-between gap-4 mb-7">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent-teal mb-2">
                      Latest Work
                    </p>

                    <h2 className="font-heading text-4xl md:text-5xl uppercase text-text-primary">
                      Posts by {author.name}
                    </h2>
                  </div>
                </div>

                {posts.length === 0 ? (
                  <div
                    className="rounded-2xl p-8"
                    style={{
                      background: 'rgba(13,16,32,0.72)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <p className="text-text-secondary">
                      No published posts found for this author.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-5">
                    {posts.map((post, index) => (
                      <motion.div
                        key={post.wpId || post.id || post.slug || index}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: index * 0.04 }}
                      >
                        <Link
                          to={getPostUrl(post)}
                          className="group block rounded-2xl p-6 h-full transition-all duration-300"
                          style={{
                            background: 'rgba(13,16,32,0.78)',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor =
                              'rgba(0,240,200,0.28)'
                            e.currentTarget.style.transform = 'translateY(-3px)'
                            e.currentTarget.style.boxShadow =
                              '0 12px 36px rgba(0,0,0,0.45)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor =
                              'rgba(255,255,255,0.08)'
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-accent-teal/10 border border-accent-teal/25 text-accent-teal font-mono text-xs uppercase">
                              {getPostLabel(post)}
                            </span>

                            {post.date && (
                              <span className="text-xs font-mono text-text-muted">
                                {formatDate(post.date)}
                              </span>
                            )}
                          </div>

                          <h3 className="font-heading text-3xl uppercase text-text-primary group-hover:text-accent-teal transition-colors mb-4">
                            {post.title}
                          </h3>

                          <p className="text-sm text-text-secondary leading-relaxed mb-5">
                            {post.excerpt || post.description}
                          </p>

                          <span className="font-mono text-xs text-accent-teal uppercase">
                            Read post →
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}