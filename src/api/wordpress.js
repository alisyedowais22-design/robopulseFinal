const WP_SITE_URL = import.meta.env.VITE_WP_API_URL || 'https://robopulse.net'

const ENABLE_WORDPRESS = import.meta.env.VITE_ENABLE_WORDPRESS === 'true'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const isWordPressEnabled = () => {
  return ENABLE_WORDPRESS && !USE_MOCK
}

function decodeHtmlEntities(value) {
  if (!value) return ''

  let text = String(value)

  // Double encoded entities fix:
  // &amp;#8217; -> &#8217;
  // &amp;hellip; -> &hellip;
  for (let i = 0; i < 3; i += 1) {
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
  }

  Object.entries(namedEntities).forEach(([entity, replacement]) => {
    text = text.split(entity).join(replacement)
  })

  text = text.replace(/&#(\d+);/g, (_, code) => {
    try {
      return String.fromCharCode(Number(code))
    } catch {
      return _
    }
  })

  text = text.replace(/&#x([a-fA-F0-9]+);/g, (_, code) => {
    try {
      return String.fromCharCode(parseInt(code, 16))
    } catch {
      return _
    }
  })

  return text.trim()
}

function stripHtml(value) {
  if (!value) return ''
  return decodeHtmlEntities(String(value).replace(/<[^>]*>/g, '').trim())
}

export async function wpFetch(route) {
  if (!isWordPressEnabled()) {
    throw new Error('WordPress API disabled')
  }

  const cleanRoute = route.startsWith('/') ? route : `/${route}`
  const url = `${WP_SITE_URL}/?rest_route=/wp/v2${cleanRoute}`

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status}`)
  }

  return response.json()
}

export async function robopulseFetch(route) {
  if (!isWordPressEnabled()) {
    throw new Error('WordPress API disabled')
  }

  const cleanRoute = route.startsWith('/') ? route : `/${route}`
  const url = `${WP_SITE_URL}/?rest_route=/robopulse/v1${cleanRoute}`

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`RoboPulse API error: ${response.status}`)
  }

  return response.json()
}

function getFeaturedImage(item, acf = {}) {
  const featuredMedia = item._embedded?.['wp:featuredmedia']?.[0] || null

  return (
    featuredMedia?.source_url ||
    featuredMedia?.media_details?.sizes?.full?.source_url ||
    featuredMedia?.media_details?.sizes?.large?.source_url ||
    featuredMedia?.media_details?.sizes?.medium_large?.source_url ||
    featuredMedia?.media_details?.sizes?.medium?.source_url ||
    item.featuredImage ||
    item.featured_image ||
    item.image ||
    item.thumbnail ||
    acf.featuredImage ||
    acf.featured_image ||
    acf.image ||
    acf.thumbnail ||
    ''
  )
}

export function normalizeRobot(item) {
  const acf = item.acf || {}

  const wpAuthor = item._embedded?.author?.[0] || null
  const rpAuthor = item.rp_author || null
  const featuredImage = getFeaturedImage(item, acf)

  const authorName = decodeHtmlEntities(
    rpAuthor?.name ||
      wpAuthor?.name ||
      item.authorName ||
      acf.authorName ||
      acf.author ||
      'RoboPulse Staff'
  )

  const authorAvatar =
    rpAuthor?.avatar ||
    wpAuthor?.avatar_urls?.['96'] ||
    wpAuthor?.avatar_urls?.['48'] ||
    wpAuthor?.avatar_urls?.['24'] ||
    item.authorAvatar ||
    acf.authorAvatar ||
    acf.authorImage ||
    ''

  const authorBio = decodeHtmlEntities(
    rpAuthor?.bio ||
      wpAuthor?.description ||
      item.authorBio ||
      acf.authorBio ||
      acf.authorDescription ||
      ''
  )

  const authorSlug =
    rpAuthor?.slug ||
    wpAuthor?.slug ||
    item.authorSlug ||
    acf.authorSlug ||
    ''

  return {
    id: acf.originalId || item.slug || String(item.id),
    name: decodeHtmlEntities(acf.name || item.title?.rendered || ''),
    maker: decodeHtmlEntities(acf.maker || ''),
    country: decodeHtmlEntities(acf.country || ''),
    countryCode: acf.countryCode || '',
    price: decodeHtmlEntities(acf.price || ''),
    priceNum: Number(acf.priceNum || 0),
    availability: decodeHtmlEntities(acf.availability || ''),
    availClass: acf.availClass || '',
    score: Number(acf.score || 0),
    dof: decodeHtmlEntities(acf.dof || ''),
    height: decodeHtmlEntities(acf.height || ''),
    weight: decodeHtmlEntities(acf.weight || ''),
    speed: decodeHtmlEntities(acf.speed || ''),
    battery: decodeHtmlEntities(acf.battery || ''),
    ai: decodeHtmlEntities(acf.ai || ''),
    hand: decodeHtmlEntities(acf.hand || ''),
    deploy: decodeHtmlEntities(acf.deploy || ''),
    payload: decodeHtmlEntities(acf.payload || ''),
    tags: Array.isArray(acf.tags) ? acf.tags.map(decodeHtmlEntities) : [],
    scoreBreakdown: acf.scoreBreakdown || {},
    verdict: decodeHtmlEntities(acf.verdict || ''),
    pros: Array.isArray(acf.pros) ? acf.pros.map(decodeHtmlEntities) : [],
    cons: Array.isArray(acf.cons) ? acf.cons.map(decodeHtmlEntities) : [],
    excerpt: decodeHtmlEntities(acf.excerpt) || stripHtml(item.excerpt?.rendered) || '',
    content: decodeHtmlEntities(item.content?.rendered || ''),

    authorName,
    author: authorName,
    authorAvatar,
    authorImage: authorAvatar,
    authorBio,
    authorDescription: authorBio,
    authorId: rpAuthor?.id || item.author || wpAuthor?.id || '',
    authorSlug,

    featuredImage,
    image: featuredImage,
    thumbnail: featuredImage,
    featuredMediaId: item.featured_media || '',

    slug: item.slug,
    wpId: item.id,
  }
}

export function normalizeAuthor(item) {
  return {
    id: item.id,
    name: decodeHtmlEntities(item.name || 'RoboPulse Author'),
    slug: item.slug || '',
    bio: decodeHtmlEntities(item.description || item.bio || ''),
    description: decodeHtmlEntities(item.description || item.bio || ''),
    link: item.link || '',
    avatar:
      item.avatar ||
      item.avatar_urls?.['96'] ||
      item.avatar_urls?.['48'] ||
      item.avatar_urls?.['24'] ||
      '',
    postsCount: Number(item.postsCount || item.posts_count || 0),
  }
}

export function normalizePost(item) {
  const acf = item.acf || {}

  const renderedTitle = decodeHtmlEntities(
    item.title?.rendered ||
      item.title ||
      ''
  )

  const renderedExcerpt = decodeHtmlEntities(
    item.excerpt?.rendered ||
      item.excerpt ||
      ''
  )

  const renderedContent = decodeHtmlEntities(
    item.content?.rendered ||
      item.content ||
      ''
  )

  const wpAuthor = item._embedded?.author?.[0] || null
  const rpAuthor = item.rp_author || null
  const featuredImage = getFeaturedImage(item, acf)

  const authorName = decodeHtmlEntities(
    rpAuthor?.name ||
      wpAuthor?.name ||
      item.authorName ||
      acf.authorName ||
      acf.author ||
      item.source ||
      acf.source ||
      'RoboPulse Staff'
  )

  const authorAvatar =
    rpAuthor?.avatar ||
    wpAuthor?.avatar_urls?.['96'] ||
    wpAuthor?.avatar_urls?.['48'] ||
    wpAuthor?.avatar_urls?.['24'] ||
    item.authorAvatar ||
    item.authorImage ||
    acf.authorImage ||
    acf.authorAvatar ||
    ''

  const authorBio = decodeHtmlEntities(
    rpAuthor?.bio ||
      wpAuthor?.description ||
      item.authorBio ||
      item.authorDescription ||
      acf.authorBio ||
      acf.authorDescription ||
      ''
  )

  const authorSlug =
    rpAuthor?.slug ||
    wpAuthor?.slug ||
    item.authorSlug ||
    acf.authorSlug ||
    ''

  return {
    id: acf.originalId || item.slug || String(item.id),

    title: renderedTitle,
    name: decodeHtmlEntities(acf.name || renderedTitle),

    excerpt:
      decodeHtmlEntities(acf.excerpt) ||
      decodeHtmlEntities(acf.description) ||
      stripHtml(renderedExcerpt) ||
      '',

    description:
      decodeHtmlEntities(acf.description) ||
      decodeHtmlEntities(acf.excerpt) ||
      stripHtml(renderedExcerpt) ||
      '',

    content:
      renderedContent ||
      decodeHtmlEntities(acf.content) ||
      decodeHtmlEntities(acf.description) ||
      decodeHtmlEntities(acf.excerpt) ||
      '',

    category: decodeHtmlEntities(
      acf.newsCategory ||
        acf.guideType ||
        acf.category ||
        item.category ||
        'News'
    ),

    categoryColor: acf.categoryColor || 'teal',

    date: acf.displayDate || item.displayDate || item.date || '',
    displayDate: acf.displayDate || item.displayDate || item.date || '',

    readTime: decodeHtmlEntities(acf.readTime || item.readTime || ''),

    source: authorName,

    authorName,
    author: authorName,
    authorAvatar,
    authorImage: authorAvatar,
    authorBio,
    authorDescription: authorBio,
    authorId: rpAuthor?.id || item.authorId || item.author || wpAuthor?.id || '',
    authorSlug,

    featuredImage,
    image: featuredImage,
    thumbnail: featuredImage,
    featuredMediaId: item.featured_media || '',

    type: decodeHtmlEntities(acf.guideType || acf.type || item.type || 'buyers'),

    tags: Array.isArray(acf.tags)
      ? acf.tags.map(decodeHtmlEntities)
      : Array.isArray(item.tags)
        ? item.tags.map(decodeHtmlEntities)
        : typeof acf.tags === 'string'
          ? acf.tags.split(',').map((tag) => decodeHtmlEntities(tag.trim())).filter(Boolean)
          : [],

    robotName: decodeHtmlEntities(acf.robotName || acf.name || item.robotName || renderedTitle),
    score: Number(acf.score || item.score || 0),
    verdict: decodeHtmlEntities(acf.verdict || item.verdict || ''),

    featured:
      acf.featured === true ||
      acf.featured === 'true' ||
      acf.featured === '1' ||
      acf.featured === 1 ||
      item.featured === true,

    pros: Array.isArray(acf.pros)
      ? acf.pros.map(decodeHtmlEntities)
      : Array.isArray(item.pros)
        ? item.pros.map(decodeHtmlEntities)
        : [],

    cons: Array.isArray(acf.cons)
      ? acf.cons.map(decodeHtmlEntities)
      : Array.isArray(item.cons)
        ? item.cons.map(decodeHtmlEntities)
        : [],

    authorTitle: decodeHtmlEntities(acf.authorTitle || item.authorTitle || ''),

    postType: item.postType || '',
    urlBase: item.urlBase || '',

    slug: item.slug,
    wpId: item.wpId || item.id,
  }
}