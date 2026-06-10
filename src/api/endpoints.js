import {
  wpFetch,
  robopulseFetch,
  normalizeRobot,
  normalizePost,
  normalizeAuthor,
} from './wordpress'

// -----------------------------
// Helpers
// -----------------------------

function withContentGroup(item, group) {
  return {
    ...item,
    contentGroup: group,
  }
}

function isValidPost(item) {
  return item && (item.slug || item.id || item.wpId)
}

// -----------------------------
// Robots
// -----------------------------

export async function getRobotsFromWordPress() {
  const data = await wpFetch('/humanoids&per_page=100&_embed=1')

  return Array.isArray(data)
    ? data.map(normalizeRobot).filter(isValidPost)
    : []
}

export async function getRobotBySlugFromWordPress(slug) {
  const data = await wpFetch(`/humanoids&slug=${encodeURIComponent(slug)}&_embed=1`)

  return Array.isArray(data) && data[0]
    ? normalizeRobot(data[0])
    : null
}

// -----------------------------
// News
// WordPress normal Posts only
// -----------------------------

export async function getNewsFromWordPress() {
  const data = await wpFetch('/posts&per_page=100&_embed=1')

  return Array.isArray(data)
    ? data
        .filter((item) => item.type === 'post')
        .map((item) => withContentGroup(normalizePost(item), 'news'))
        .filter(isValidPost)
    : []
}

export async function getNewsBySlugFromWordPress(slug) {
  const data = await wpFetch(`/posts&slug=${encodeURIComponent(slug)}&_embed=1`)

  return Array.isArray(data) && data[0] && data[0].type === 'post'
    ? withContentGroup(normalizePost(data[0]), 'news')
    : null
}

// -----------------------------
// Reviews
// Custom Post Type: robopulse_review
// REST base: reviews
// -----------------------------

export async function getReviewsFromWordPress() {
  const data = await wpFetch('/reviews&per_page=100&_embed=1')

  return Array.isArray(data)
    ? data
        .filter((item) => item.type === 'robopulse_review')
        .map((item) => withContentGroup(normalizePost(item), 'reviews'))
        .filter(isValidPost)
    : []
}

export async function getReviewBySlugFromWordPress(slug) {
  const data = await wpFetch(`/reviews&slug=${encodeURIComponent(slug)}&_embed=1`)

  return Array.isArray(data) && data[0] && data[0].type === 'robopulse_review'
    ? withContentGroup(normalizePost(data[0]), 'reviews')
    : null
}

// -----------------------------
// Guides
// Custom Post Type: robopulse_guide
// REST base: guides
// -----------------------------

export async function getGuidesFromWordPress() {
  const data = await wpFetch('/guides&per_page=100&_embed=1')

  return Array.isArray(data)
    ? data
        .filter((item) => item.type === 'robopulse_guide')
        .map((item) => withContentGroup(normalizePost(item), 'guides'))
        .filter(isValidPost)
    : []
}

export async function getGuideBySlugFromWordPress(slug) {
  const data = await wpFetch(`/guides&slug=${encodeURIComponent(slug)}&_embed=1`)

  return Array.isArray(data) && data[0] && data[0].type === 'robopulse_guide'
    ? withContentGroup(normalizePost(data[0]), 'guides')
    : null
}

// -----------------------------
// Authors
// -----------------------------

export async function getAuthorBundleBySlugFromWordPress(slug) {
  const data = await robopulseFetch(`/authors&slug=${encodeURIComponent(slug)}`)

  if (!data?.success || !data?.author) {
    return {
      author: null,
      posts: [],
    }
  }

  return {
    author: normalizeAuthor(data.author),
    posts: Array.isArray(data.posts)
      ? data.posts.map(normalizePost).filter(isValidPost)
      : [],
  }
}

// -----------------------------
// Export API objects
// -----------------------------

export const robotsApi = {
  getAll: getRobotsFromWordPress,

  getBySlug: getRobotBySlugFromWordPress,

  getById: async (id) => {
    const robots = await getRobotsFromWordPress()

    return (
      robots.find(
        (robot) =>
          robot.id === id ||
          robot.slug === id ||
          String(robot.wpId) === String(id)
      ) || null
    )
  },
}

export const newsApi = {
  getAll: getNewsFromWordPress,

  getBySlug: async (slug) => {
    const post = await getNewsBySlugFromWordPress(slug)

    if (post) return post

    const posts = await getNewsFromWordPress()

    return (
      posts.find(
        (item) =>
          item.slug === slug ||
          item.id === slug ||
          String(item.wpId) === String(slug)
      ) || null
    )
  },
}

export const reviewsApi = {
  getAll: getReviewsFromWordPress,

  getBySlug: async (slug) => {
    const review = await getReviewBySlugFromWordPress(slug)

    if (review) return review

    const reviews = await getReviewsFromWordPress()

    return (
      reviews.find(
        (item) =>
          item.slug === slug ||
          item.id === slug ||
          String(item.wpId) === String(slug)
      ) || null
    )
  },
}

export const guidesApi = {
  getAll: getGuidesFromWordPress,

  getBySlug: async (slug) => {
    const guide = await getGuideBySlugFromWordPress(slug)

    if (guide) return guide

    const guides = await getGuidesFromWordPress()

    return (
      guides.find(
        (item) =>
          item.slug === slug ||
          item.id === slug ||
          String(item.wpId) === String(slug)
      ) || null
    )
  },
}

export const authorsApi = {
  getBundleBySlug: getAuthorBundleBySlugFromWordPress,
}