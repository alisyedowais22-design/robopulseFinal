const WP_SITE_URL = import.meta.env.VITE_WP_API_URL || 'https://robopulse.net'

const ENABLE_WORDPRESS = import.meta.env.VITE_ENABLE_WORDPRESS === 'true'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const isWordPressEnabled = () => {
  return ENABLE_WORDPRESS && !USE_MOCK
}

function stripHtml(value) {
  if (!value) return ''
  return String(value).replace(/<[^>]*>/g, '').trim()
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

export function normalizeRobot(item) {
  const acf = item.acf || {}
  const wpAuthor = item._embedded?.author?.[0] || null

  return {
    id: acf.originalId || item.slug || String(item.id),
    name: acf.name || item.title?.rendered || '',
    maker: acf.maker || '',
    country: acf.country || '',
    countryCode: acf.countryCode || '',
    price: acf.price || '',
    priceNum: Number(acf.priceNum || 0),
    availability: acf.availability || '',
    availClass: acf.availClass || '',
    score: Number(acf.score || 0),
    dof: acf.dof || '',
    height: acf.height || '',
    weight: acf.weight || '',
    speed: acf.speed || '',
    battery: acf.battery || '',
    ai: acf.ai || '',
    hand: acf.hand || '',
    deploy: acf.deploy || '',
    payload: acf.payload || '',
    tags: Array.isArray(acf.tags) ? acf.tags : [],
    scoreBreakdown: acf.scoreBreakdown || {},
    verdict: acf.verdict || '',
    pros: Array.isArray(acf.pros) ? acf.pros : [],
    cons: Array.isArray(acf.cons) ? acf.cons : [],
    excerpt: acf.excerpt || stripHtml(item.excerpt?.rendered) || '',
    content: item.content?.rendered || '',
    authorName: wpAuthor?.name || acf.authorName || acf.author || 'RoboPulse Staff',
    authorId: item.author || wpAuthor?.id || '',
    authorSlug: wpAuthor?.slug || '',
    slug: item.slug,
    wpId: item.id,
  }
}

export function normalizeAuthor(item) {
  return {
    id: item.id,
    name: item.name || 'RoboPulse Author',
    slug: item.slug || '',
    bio: item.description || item.bio || '',
    description: item.description || item.bio || '',
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

  const renderedTitle =
    item.title?.rendered ||
    item.title ||
    ''

  const renderedExcerpt =
    item.excerpt?.rendered ||
    item.excerpt ||
    ''

  const renderedContent =
    item.content?.rendered ||
    item.content ||
    ''

  const wpAuthor = item._embedded?.author?.[0] || null

  /*
    Important fix:
    Real WordPress author ko first priority di hai.
    Pehle acf.author/source aa raha tha, isliye Reviews/Guides me old author show ho raha tha.
  */
  const authorName =
    wpAuthor?.name ||
    item.authorName ||
    acf.authorName ||
    acf.author ||
    item.source ||
    acf.source ||
    'RoboPulse Staff'

  const authorAvatar =
    wpAuthor?.avatar_urls?.['96'] ||
    wpAuthor?.avatar_urls?.['48'] ||
    wpAuthor?.avatar_urls?.['24'] ||
    item.authorAvatar ||
    item.authorImage ||
    acf.authorImage ||
    acf.authorAvatar ||
    ''

  const authorBio =
    wpAuthor?.description ||
    item.authorBio ||
    item.authorDescription ||
    acf.authorBio ||
    acf.authorDescription ||
    ''

  const authorSlug =
    wpAuthor?.slug ||
    item.authorSlug ||
    acf.authorSlug ||
    ''

  return {
    id: acf.originalId || item.slug || String(item.id),

    title: renderedTitle,
    name: acf.name || renderedTitle,

    excerpt:
      acf.excerpt ||
      acf.description ||
      stripHtml(renderedExcerpt) ||
      '',

    description:
      acf.description ||
      acf.excerpt ||
      stripHtml(renderedExcerpt) ||
      '',

    content:
      renderedContent ||
      acf.content ||
      acf.description ||
      acf.excerpt ||
      '',

    category:
      acf.newsCategory ||
      acf.guideType ||
      acf.category ||
      item.category ||
      'News',

    categoryColor: acf.categoryColor || 'teal',

    date: acf.displayDate || item.displayDate || item.date || '',
    displayDate: acf.displayDate || item.displayDate || item.date || '',

    readTime: acf.readTime || item.readTime || '',

    /*
      source bhi real author se sync kar diya,
      taa ke list cards me bhi old source na aaye.
    */
    source: authorName,

    authorName,
    author: authorName,
    authorAvatar,
    authorImage: authorAvatar,
    authorBio,
    authorDescription: authorBio,
    authorId: item.authorId || item.author || wpAuthor?.id || '',
    authorSlug,

    type: acf.guideType || acf.type || item.type || 'buyers',

    tags: Array.isArray(acf.tags)
      ? acf.tags
      : Array.isArray(item.tags)
        ? item.tags
        : typeof acf.tags === 'string'
          ? acf.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
          : [],

    robotName: acf.robotName || acf.name || item.robotName || renderedTitle,
    score: Number(acf.score || item.score || 0),
    verdict: acf.verdict || item.verdict || '',

    featured:
      acf.featured === true ||
      acf.featured === 'true' ||
      acf.featured === '1' ||
      acf.featured === 1 ||
      item.featured === true,

    pros: Array.isArray(acf.pros)
      ? acf.pros
      : Array.isArray(item.pros)
        ? item.pros
        : [],

    cons: Array.isArray(acf.cons)
      ? acf.cons
      : Array.isArray(item.cons)
        ? item.cons
        : [],

    authorTitle: acf.authorTitle || item.authorTitle || '',

    postType: item.postType || '',
    urlBase: item.urlBase || '',

    slug: item.slug,
    wpId: item.wpId || item.id,
  }
}