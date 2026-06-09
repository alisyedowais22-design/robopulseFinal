// pages/PostDetail.jsx
import { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/common/PageTransition'
import { newsApi, guidesApi, reviewsApi } from '../api/endpoints'
import { formatDate } from '../utils/helpers'

function getPostType(pathname) {
  if (pathname.startsWith('/guides')) return 'guides'
  if (pathname.startsWith('/reviews')) return 'reviews'
  return 'news'
}

function getBackInfo(type) {
  if (type === 'guides') {
    return {
      url: '/guides',
      label: 'Guides',
      eyebrow: 'Learning Center',
      accent: '#F5C842',
      badge: 'Guide',
    }
  }

  if (type === 'reviews') {
    return {
      url: '/reviews',
      label: 'Reviews',
      eyebrow: 'Expert Review',
      accent: '#00F0C8',
      badge: 'Review',
    }
  }

  return {
    url: '/news',
    label: 'News',
    eyebrow: 'Robot News',
    accent: '#FF4060',
    badge: 'News',
  }
}

function cleanHtml(value) {
  return value || ''
}

function getAuthorName(post) {
  return post?.authorName || post?.author || post?.source || 'RoboPulse Staff'
}

function getAuthorAvatar(post) {
  return post?.authorAvatar || post?.authorImage || ''
}

function getAuthorBio(post) {
  return post?.authorBio || post?.authorDescription || ''
}

export default function PostDetail() {
  const { slug } = useParams()
  const location = useLocation()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const postType = getPostType(location.pathname)
  const backInfo = getBackInfo(postType)

  useEffect(() => {
    let active = true

    async function loadPost() {
      try {
        setLoading(true)
        setError('')

        let data = null

        if (postType === 'guides') {
          data = await guidesApi.getBySlug(slug)
        } else if (postType === 'reviews') {
          data = await reviewsApi.getBySlug(slug)
        } else {
          data = await newsApi.getBySlug(slug)
        }

        if (active) {
          setPost(data)
        }
      } catch (err) {
        console.error('Post detail loading error:', err)

        if (active) {
          setError('Unable to load this post.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadPost()

    return () => {
      active = false
    }
  }, [slug, postType])

  return (
    <PageTransition>
      <div className="min-h-[75vh] pt-28 pb-24 overflow-hidden">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-[520px] h-[520px] rounded-full opacity-10 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${backInfo.accent}, transparent 70%)`,
              top: '80px',
              right: '5%',
            }}
          />

          <div
            className="absolute w-[420px] h-[420px] rounded-full opacity-10 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #00F0C8, transparent 70%)',
              bottom: '5%',
              left: '0%',
            }}
          />
        </div>

        <div className="container-wide relative z-10">
          <Link
            to={backInfo.url}
            className="inline-flex items-center gap-2 text-sm font-mono mb-10 transition-opacity hover:opacity-75"
            style={{ color: backInfo.accent }}
          >
            ← Back to {backInfo.label}
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
                Loading post...
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

          {!loading && !error && !post && (
            <div
              className="rounded-3xl p-10"
              style={{
                background: 'rgba(13,16,32,0.85)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <h1 className="font-heading text-5xl text-text-primary mb-4">
                POST NOT FOUND
              </h1>

              <p className="text-text-secondary">
                This post is not available or it may have been removed from WordPress.
              </p>
            </div>
          )}

          {!loading && !error && post && (
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-5xl"
            >
              <div
                className="rounded-[32px] p-7 md:p-12 mb-10"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(13,16,32,0.96), rgba(5,6,10,0.92))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
                }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-7">
                  <span
                    className="px-3 py-1 rounded-full font-mono text-xs uppercase tracking-widest"
                    style={{
                      color: backInfo.accent,
                      background: `${backInfo.accent}18`,
                      border: `1px solid ${backInfo.accent}40`,
                    }}
                  >
                    {post.category || backInfo.badge}
                  </span>

                  {(post.displayDate || post.date) && (
                    <span className="text-xs font-mono text-text-muted">
                      {formatDate(post.displayDate || post.date)}
                    </span>
                  )}

                  <span className="text-xs text-text-muted">•</span>

                  <div className="flex items-center gap-2">
                    {getAuthorAvatar(post) ? (
                      <img
                        src={getAuthorAvatar(post)}
                        alt={getAuthorName(post)}
                        className="w-8 h-8 rounded-full object-cover border border-white/10 bg-white/5"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 bg-white/5"
                        style={{ color: backInfo.accent }}
                      >
                        <span className="font-mono text-xs uppercase">
                          {getAuthorName(post).charAt(0)}
                        </span>
                      </div>
                    )}

                    <span className="text-xs font-mono">
                      <span className="text-text-muted">By </span>
                      <span className="text-text-primary font-semibold">
                        {getAuthorName(post)}
                      </span>
                    </span>
                  </div>

                  {post.readTime && (
                    <>
                      <span className="text-xs text-text-muted">•</span>
                      <span className="text-xs font-mono text-text-muted">
                        {post.readTime} read
                      </span>
                    </>
                  )}
                </div>

                <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.95] tracking-heading text-text-primary mb-8">
                  {post.title}
                </h1>

                {(post.excerpt || post.description) && (
                  <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-4xl">
                    {post.excerpt || post.description}
                  </p>
                )}
              </div>

              {postType === 'reviews' && (
                <div
                  className="rounded-[28px] p-7 md:p-10 mb-10"
                  style={{
                    background: 'rgba(13,16,32,0.72)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="grid md:grid-cols-[160px_1fr] gap-8">
                    <div
                      className="w-32 h-32 rounded-3xl flex flex-col items-center justify-center"
                      style={{
                        background: `${backInfo.accent}14`,
                        border: `1px solid ${backInfo.accent}45`,
                      }}
                    >
                      <span
                        className="font-heading text-5xl"
                        style={{ color: backInfo.accent }}
                      >
                        {post.score || 0}
                      </span>

                      <span className="font-mono text-xs text-text-muted uppercase">
                        Score
                      </span>
                    </div>

                    <div>
                      {post.verdict && (
                        <>
                          <p
                            className="font-mono text-xs uppercase tracking-widest mb-3"
                            style={{ color: backInfo.accent }}
                          >
                            Verdict
                          </p>

                          <p className="text-text-secondary leading-relaxed">
                            {post.verdict}
                          </p>
                        </>
                      )}

                      {(post.pros?.length > 0 || post.cons?.length > 0) && (
                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                          {post.pros?.length > 0 && (
                            <div>
                              <h3 className="font-mono text-xs uppercase tracking-widest text-accent-teal mb-4">
                                Pros
                              </h3>

                              <ul className="space-y-3">
                                {post.pros.map((item, index) => (
                                  <li
                                    key={index}
                                    className="flex gap-3 text-text-secondary"
                                  >
                                    <span className="text-accent-teal">+</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {post.cons?.length > 0 && (
                            <div>
                              <h3 className="font-mono text-xs uppercase tracking-widest text-accent-pink mb-4">
                                Cons
                              </h3>

                              <ul className="space-y-3">
                                {post.cons.map((item, index) => (
                                  <li
                                    key={index}
                                    className="flex gap-3 text-text-secondary"
                                  >
                                    <span className="text-accent-pink">−</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div
                className="rounded-[28px] p-7 md:p-10"
                style={{
                  background: 'rgba(13,16,32,0.72)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="
                    post-content
                    text-text-secondary
                    text-base
                    md:text-lg
                    leading-8
                    md:leading-9
                    max-w-none
                    [&_p]:mb-6
                    [&_h1]:text-text-primary
                    [&_h2]:text-text-primary
                    [&_h3]:text-text-primary
                    [&_h2]:font-heading
                    [&_h3]:font-heading
                    [&_h2]:text-4xl
                    [&_h3]:text-3xl
                    [&_h2]:mt-10
                    [&_h3]:mt-8
                    [&_h2]:mb-4
                    [&_h3]:mb-3
                    [&_strong]:text-text-primary
                    [&_strong]:font-bold
                    [&_a]:text-accent-teal
                    [&_ul]:list-disc
                    [&_ul]:pl-6
                    [&_ol]:list-decimal
                    [&_ol]:pl-6
                    [&_li]:mb-2
                    [&_blockquote]:border-l-4
                    [&_blockquote]:pl-5
                    [&_blockquote]:italic
                    [&_blockquote]:text-text-primary
                  "
                  dangerouslySetInnerHTML={{
                    __html: cleanHtml(
                      post.content ||
                        post.body ||
                        post.description ||
                        post.excerpt ||
                        ''
                    ),
                  }}
                />
              </div>

              {/* Author bio */}
              {(getAuthorBio(post) || getAuthorName(post)) && (
                <div
                  className="rounded-[28px] p-7 md:p-8 mt-10"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(13,16,32,0.82), rgba(5,6,10,0.75))',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-5">
                    {getAuthorAvatar(post) ? (
                      <img
                        src={getAuthorAvatar(post)}
                        alt={getAuthorName(post)}
                        className="w-16 h-16 rounded-2xl object-cover border border-white/10 bg-white/5 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 flex-shrink-0"
                        style={{ color: backInfo.accent }}
                      >
                        <span className="font-mono text-xl uppercase">
                          {getAuthorName(post).charAt(0)}
                        </span>
                      </div>
                    )}

                    <div>
                      <p
                        className="font-mono text-xs uppercase tracking-widest mb-2"
                        style={{ color: backInfo.accent }}
                      >
                        About the Author
                      </p>

                      <h3 className="text-text-primary font-semibold text-lg mb-2">
                        {getAuthorName(post)}
                      </h3>

                      {getAuthorBio(post) ? (
                        <p className="text-text-secondary leading-relaxed">
                          {getAuthorBio(post)}
                        </p>
                      ) : (
                        <p className="text-text-muted leading-relaxed">
                          No author biography has been added yet.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.article>
          )}
        </div>
      </div>
    </PageTransition>
  )
}