// pages/PostDetail.jsx
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/common/PageTransition'
import { newsApi, reviewsApi, guidesApi } from '../api/endpoints'
import { formatDate } from '../utils/helpers'

function getPageConfig(pathname) {
  if (pathname.startsWith('/reviews')) {
    return {
      api: reviewsApi,
      backUrl: '/reviews',
      backLabel: 'Reviews',
      accent: '#6C63FF',
      badge: 'Review',
      badgeColor: 'rgba(108,99,255,0.14)',
      badgeBorder: 'rgba(108,99,255,0.35)',
    }
  }

  if (pathname.startsWith('/guides')) {
    return {
      api: guidesApi,
      backUrl: '/guides',
      backLabel: 'Guides',
      accent: '#F5C842',
      badge: 'Guide',
      badgeColor: 'rgba(245,200,66,0.14)',
      badgeBorder: 'rgba(245,200,66,0.35)',
    }
  }

  return {
    api: newsApi,
    backUrl: '/news',
    backLabel: 'News',
    accent: '#FF4060',
    badge: 'News',
    badgeColor: 'rgba(255,64,96,0.14)',
    badgeBorder: 'rgba(255,64,96,0.35)',
  }
}

function getAuthorInitial(name) {
  if (!name) return 'R'
  return String(name).trim().charAt(0).toUpperCase()
}

function decodeWpEntities(value) {
  if (!value) return ''

  let text = String(value)

  // Fix double/triple encoded entities:
  // &amp;#8217; => &#8217; => ’
  // &amp;hellip; => &hellip; => …
  for (let i = 0; i < 4; i += 1) {
    text = text.replace(/&amp;(#\d+;|#x[a-fA-F0-9]+;|[a-zA-Z]+;)/g, '&$1')
  }

  const namedEntities = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&apos;': "'",
    '&hellip;': '…',
    '&ndash;': '–',
    '&mdash;': '—',
    '&lsquo;': '‘',
    '&rsquo;': '’',
    '&ldquo;': '“',
    '&rdquo;': '”',
    '&bull;': '•',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
  }

  Object.entries(namedEntities).forEach(([entity, replacement]) => {
    text = text.split(entity).join(replacement)
  })

  text = text.replace(/&#(\d+);/g, (_, code) => {
    try {
      return String.fromCodePoint(Number(code))
    } catch {
      return _
    }
  })

  text = text.replace(/&#x([a-fA-F0-9]+);/g, (_, code) => {
    try {
      return String.fromCodePoint(parseInt(code, 16))
    } catch {
      return _
    }
  })

  return text
}

function getDisplayCategory(pathname, post, config) {
  if (pathname.startsWith('/guides')) {
    return 'Guide'
  }

  if (pathname.startsWith('/reviews')) {
    return 'Review'
  }

  if (pathname.startsWith('/news')) {
    return decodeWpEntities(post?.category || 'News')
  }

  return decodeWpEntities(post?.category || config.badge)
}

function slugify(text) {
  return decodeWpEntities(String(text || ''))
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function prepareContentAndToc(html) {
  if (!html || typeof window === 'undefined') {
    return {
      html: html || '',
      toc: [],
    }
  }

  const decodedHtml = decodeWpEntities(html)

  const parser = new DOMParser()
  const doc = parser.parseFromString(decodedHtml, 'text/html')

  // Remove empty Gutenberg / WP junk paragraphs
  Array.from(doc.body.querySelectorAll('p')).forEach((p) => {
    const text = p.textContent?.trim()
    const hasMedia = p.querySelector('img, iframe, video, audio')

    if (!text && !hasMedia) {
      p.remove()
    }
  })

  // Decode text nodes inside body again, but keep HTML tags safe
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT)

  const textNodes = []
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode)
  }

  textNodes.forEach((node) => {
    node.nodeValue = decodeWpEntities(node.nodeValue)
  })

  const headings = Array.from(doc.body.querySelectorAll('h2, h3, h4'))

  const toc = headings
    .map((heading, index) => {
      const text = decodeWpEntities(heading.textContent?.trim())

      if (!text) return null

      const level = heading.tagName.toLowerCase()
      const id = heading.getAttribute('id') || `${slugify(text)}-${index + 1}`

      heading.setAttribute('id', id)
      heading.classList.add('rp-content-heading')

      return {
        id,
        text,
        level,
      }
    })
    .filter(Boolean)

  return {
    html: doc.body.innerHTML,
    toc,
  }
}

function TableOfContents({ items, accent }) {
  if (!items?.length) return null

  return (
    <div
      className="mt-8 rounded-3xl p-6 md:p-7"
      style={{
        background: 'linear-gradient(135deg, rgba(13,16,32,0.92), rgba(5,6,10,0.92))',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 18px 60px rgba(0,0,0,0.28)',
      }}
    >
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <p
            className="font-mono text-xs uppercase tracking-[0.28em] mb-2"
            style={{ color: accent }}
          >
            Table of Contents
          </p>

          <h2 className="font-heading text-3xl tracking-heading text-text-primary">
            IN THIS ARTICLE
          </h2>
        </div>

        <span
          className="hidden md:inline-flex px-3 py-1 rounded-full text-xs font-mono"
          style={{
            color: accent,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {items.length} Sections
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {items.map((item, index) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="group flex items-start gap-3 rounded-2xl px-4 py-3 transition-all duration-200 hover:bg-white/5"
            style={{
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <span
              className="mt-0.5 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-xs"
              style={{
                color: accent,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {index + 1}
            </span>

            <span
              className={`text-sm leading-relaxed transition-colors ${
                item.level === 'h3'
                  ? 'pl-2 text-text-secondary'
                  : item.level === 'h4'
                    ? 'pl-4 text-text-muted'
                    : 'text-text-primary'
              }`}
            >
              {decodeWpEntities(item.text)}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default function PostDetail() {
  const { slug } = useParams()
  const location = useLocation()

  const config = useMemo(() => getPageConfig(location.pathname), [location.pathname])

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadPost() {
      try {
        setLoading(true)
        setError('')

        const data = await config.api.getBySlug(slug)

        if (active) {
          setPost(data || null)
        }
      } catch (err) {
        console.error('Post detail error:', err)

        if (active) {
          setError('Unable to load post.')
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
  }, [slug, config])

  const preparedContent = useMemo(() => {
    return prepareContentAndToc(post?.content || '')
  }, [post?.content])

  const cleanTitle = decodeWpEntities(post?.title || '')
  const cleanExcerpt = decodeWpEntities(post?.excerpt || post?.description || '')
  const cleanAuthor = decodeWpEntities(post?.authorName || post?.author || '')
  const cleanCategory = getDisplayCategory(location.pathname, post, config)

  return (
    <PageTransition>
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }

          .post-content {
            color: #A7B0C8;
            font-size: 17px;
            line-height: 1.85;
          }

          .post-content > *:first-child {
            margin-top: 0 !important;
          }

          .post-content h1,
          .post-content h2,
          .post-content h3,
          .post-content h4,
          .post-content h5,
          .post-content h6 {
            color: #E8EAF0;
            font-family: var(--font-heading, inherit);
            letter-spacing: 0.04em;
            line-height: 1.08;
            scroll-margin-top: 140px;
            text-transform: uppercase;
          }

          .post-content h1 {
            font-size: clamp(42px, 6vw, 72px);
            margin: 48px 0 20px;
          }

          .post-content h2 {
            font-size: clamp(34px, 4.5vw, 54px);
            margin: 54px 0 18px;
            padding-top: 8px;
          }

          .post-content h3 {
            font-size: clamp(26px, 3vw, 36px);
            margin: 42px 0 16px;
          }

          .post-content h4 {
            font-size: clamp(21px, 2.2vw, 28px);
            margin: 34px 0 14px;
          }

          .post-content h5 {
            font-size: 20px;
            margin: 28px 0 12px;
          }

          .post-content h6 {
            font-size: 17px;
            margin: 24px 0 10px;
          }

          .post-content p {
            margin: 0 0 22px;
            color: #B8C1D9;
          }

          .post-content strong,
          .post-content b {
            color: #E8EAF0;
            font-weight: 800;
          }

          .post-content em,
          .post-content i {
            color: #CBD5E1;
          }

          .post-content a {
            color: #00F0C8;
            text-decoration: none;
            border-bottom: 1px solid rgba(0,240,200,0.35);
          }

          .post-content a:hover {
            color: #7FFFEA;
            border-bottom-color: rgba(127,255,234,0.8);
          }

          .post-content ul,
          .post-content ol {
            margin: 22px 0 30px;
            padding-left: 26px;
            color: #B8C1D9;
          }

          .post-content li {
            margin-bottom: 12px;
            padding-left: 6px;
          }

          .post-content ul li::marker {
            color: #00F0C8;
          }

          .post-content ol li::marker {
            color: #F5C842;
            font-weight: 800;
          }

          .post-content blockquote {
            margin: 34px 0;
            padding: 24px 28px;
            border-left: 4px solid #00F0C8;
            background: linear-gradient(135deg, rgba(0,240,200,0.07), rgba(108,99,255,0.05));
            border-radius: 0 18px 18px 0;
            color: #DDE5F5;
          }

          .post-content blockquote p {
            margin-bottom: 0;
            color: #DDE5F5;
            font-size: 19px;
            line-height: 1.75;
          }

          .post-content img {
            width: 100%;
            height: auto;
            border-radius: 22px;
            margin: 34px 0;
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 20px 70px rgba(0,0,0,0.35);
          }

          .post-content figure {
            margin: 34px 0;
          }

          .post-content figcaption {
            margin-top: -18px;
            color: #7F8AA8;
            font-size: 14px;
            text-align: center;
          }

          .post-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 34px 0;
            overflow: hidden;
            border-radius: 18px;
            background: rgba(13,16,32,0.72);
            border: 1px solid rgba(255,255,255,0.08);
          }

          .post-content thead {
            background: rgba(0,240,200,0.08);
          }

          .post-content th {
            color: #E8EAF0;
            font-weight: 800;
            text-align: left;
            padding: 16px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }

          .post-content td {
            color: #B8C1D9;
            padding: 15px 16px;
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }

          .post-content tr:last-child td {
            border-bottom: none;
          }

          .post-content code {
            color: #00F0C8;
            background: rgba(0,240,200,0.08);
            border: 1px solid rgba(0,240,200,0.14);
            padding: 2px 6px;
            border-radius: 6px;
            font-size: 0.92em;
          }

          .post-content pre {
            margin: 32px 0;
            padding: 22px;
            overflow-x: auto;
            border-radius: 18px;
            background: #05060A;
            border: 1px solid rgba(255,255,255,0.08);
          }

          .post-content pre code {
            background: transparent;
            border: 0;
            padding: 0;
            color: #DDE5F5;
          }

          .post-content hr {
            border: 0;
            height: 1px;
            margin: 42px 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent);
          }

          .post-content .wp-block-heading {
            color: #E8EAF0;
          }

          .post-content .wp-block-list {
            margin: 22px 0 30px;
          }

          .post-content .wp-block-table {
            overflow-x: auto;
          }

          .post-content .wp-block-image img {
            margin-bottom: 10px;
          }

          .post-content .ez-toc-container,
          .post-content #ez-toc-container,
          .post-content .lwptoc,
          .post-content .toc,
          .post-content .table-of-contents {
            margin: 32px 0;
            padding: 22px;
            border-radius: 22px;
            background: rgba(13,16,32,0.86);
            border: 1px solid rgba(255,255,255,0.08);
          }

          @media (max-width: 768px) {
            .post-content {
              font-size: 16px;
              line-height: 1.78;
            }

            .post-content h1 {
              font-size: 38px;
            }

            .post-content h2 {
              font-size: 32px;
            }

            .post-content h3 {
              font-size: 25px;
            }

            .post-content h4 {
              font-size: 21px;
            }

            .post-content table {
              display: block;
              overflow-x: auto;
              white-space: nowrap;
            }
          }
        `}
      </style>

      <div className="min-h-[75vh] pt-28 pb-24 overflow-hidden">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-[620px] h-[620px] rounded-full opacity-10 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${config.accent}, transparent 70%)`,
              top: '110px',
              right: '-120px',
            }}
          />

          <div
            className="absolute w-[480px] h-[480px] rounded-full opacity-10 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #00F0C8, transparent 70%)',
              bottom: '8%',
              left: '-120px',
            }}
          />
        </div>

        <div className="container-wide relative z-10">
          <Link
            to={config.backUrl}
            className="inline-flex items-center gap-2 text-sm font-mono mb-10 transition-opacity hover:opacity-75"
            style={{ color: config.accent }}
          >
            ← Back to {config.backLabel}
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
                Loading article...
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
                This post is not available.
              </p>
            </div>
          )}

          {!loading && !error && post && (
            <article>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="rounded-[32px] p-7 md:p-12 mb-10"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(13,16,32,0.96), rgba(5,6,10,0.92))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
                }}
              >
                <div className="flex items-center gap-3 flex-wrap mb-8">
                  <span
                    className="px-3 py-1 rounded-full font-mono text-xs uppercase"
                    style={{
                      color: config.accent,
                      background: config.badgeColor,
                      border: `1px solid ${config.badgeBorder}`,
                    }}
                  >
                    {cleanCategory}
                  </span>

                  {post.date && (
                    <>
                      <span className="text-text-muted font-mono text-sm">
                        {formatDate(post.date)}
                      </span>
                      <span className="text-text-muted font-mono text-sm">·</span>
                    </>
                  )}

                  {cleanAuthor && (
                    <div className="flex items-center gap-2">
                      {post.authorAvatar ? (
                        <img
                          src={post.authorAvatar}
                          alt={cleanAuthor}
                          className="w-8 h-8 rounded-full object-cover border border-white/10"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs"
                          style={{
                            color: config.accent,
                            border: `1px solid ${config.badgeBorder}`,
                            background: config.badgeColor,
                          }}
                        >
                          {getAuthorInitial(cleanAuthor)}
                        </span>
                      )}

                      <div className="flex flex-col leading-tight">
                        <span className="text-text-secondary font-mono text-sm">
                          By{' '}
                          {post.authorSlug ? (
                            <Link
                              to={`/author/${post.authorSlug}/`}
                              className="font-bold hover:opacity-80"
                              style={{ color: '#E8EAF0' }}
                            >
                              {cleanAuthor}
                            </Link>
                          ) : (
                            <strong className="text-text-primary">
                              {cleanAuthor}
                            </strong>
                          )}
                        </span>

                        <span
                          className="text-[11px] font-mono mt-1"
                          style={{ color: config.accent }}
                        >
                          Fact checked by RoboPulse editorial team
                        </span>
                      </div>
                    </div>
                  )}

                  {post.readTime && (
                    <>
                      <span className="text-text-muted font-mono text-sm">·</span>
                      <span className="text-text-muted font-mono text-sm">
                        {decodeWpEntities(post.readTime)}
                      </span>
                    </>
                  )}
                </div>

                <h1 className="font-heading text-5xl md:text-7xl uppercase leading-none text-text-primary mb-8 max-w-5xl">
                  {cleanTitle}
                </h1>

                {cleanExcerpt && (
                  <p className="text-xl text-text-secondary leading-relaxed max-w-5xl">
                    {cleanExcerpt}
                  </p>
                )}

                {post.featuredImage && (
                  <div
                    className="mt-10 overflow-hidden rounded-3xl"
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(255,255,255,0.03)',
                      boxShadow: '0 20px 70px rgba(0,0,0,0.35)',
                    }}
                  >
                    <img
                      src={post.featuredImage}
                      alt={cleanTitle}
                      className="w-full max-h-[560px] object-cover"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <TableOfContents items={preparedContent.toc} accent={config.accent} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8"
              >
                <div
                  className="rounded-[28px] p-7 md:p-10 overflow-hidden"
                  style={{
                    background: 'rgba(13,16,32,0.72)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {preparedContent.html ? (
                    <div
                      className="post-content"
                      dangerouslySetInnerHTML={{ __html: preparedContent.html }}
                    />
                  ) : (
                    <p className="text-text-secondary">
                      Content is not available for this post.
                    </p>
                  )}
                </div>

                <aside className="space-y-5">
                  {cleanAuthor && (
                    <div
                      className="rounded-2xl p-6"
                      style={{
                        background: 'rgba(13,16,32,0.78)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <p
                        className="font-mono text-xs uppercase tracking-[0.25em] mb-4"
                        style={{ color: config.accent }}
                      >
                        Author
                      </p>

                      <div className="flex items-center gap-4 mb-4">
                        {post.authorAvatar ? (
                          <img
                            src={post.authorAvatar}
                            alt={cleanAuthor}
                            className="w-14 h-14 rounded-2xl object-cover border border-white/10"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center"
                            style={{
                              color: config.accent,
                              border: `1px solid ${config.badgeBorder}`,
                              background: config.badgeColor,
                            }}
                          >
                            <span className="font-heading text-3xl">
                              {getAuthorInitial(cleanAuthor)}
                            </span>
                          </div>
                        )}

                        <div>
                          {post.authorSlug ? (
                            <Link
                              to={`/author/${post.authorSlug}/`}
                              className="font-semibold text-text-primary hover:opacity-80"
                            >
                              {cleanAuthor}
                            </Link>
                          ) : (
                            <h3 className="font-semibold text-text-primary">
                              {cleanAuthor}
                            </h3>
                          )}

                          {post.authorTitle && (
                            <p className="text-xs text-text-muted mt-1">
                              {decodeWpEntities(post.authorTitle)}
                            </p>
                          )}

                          <p
                            className="text-xs font-mono mt-2"
                            style={{ color: config.accent }}
                          >
                            Fact checked by RoboPulse editorial team
                          </p>
                        </div>
                      </div>

                      {post.authorBio ? (
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {decodeWpEntities(post.authorBio)}
                        </p>
                      ) : (
                        <p className="text-sm text-text-muted leading-relaxed">
                          No author biography has been added yet.
                        </p>
                      )}
                    </div>
                  )}

                  {post.tags?.length > 0 && (
                    <div
                      className="rounded-2xl p-6"
                      style={{
                        background: 'rgba(13,16,32,0.78)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <p
                        className="font-mono text-xs uppercase tracking-[0.25em] mb-4"
                        style={{ color: config.accent }}
                      >
                        Tags
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs font-mono uppercase"
                            style={{
                              color: config.accent,
                              background: config.badgeColor,
                              border: `1px solid ${config.badgeBorder}`,
                            }}
                          >
                            {decodeWpEntities(tag)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </aside>
              </motion.div>
            </article>
          )}
        </div>
      </div>
    </PageTransition>
  )
}