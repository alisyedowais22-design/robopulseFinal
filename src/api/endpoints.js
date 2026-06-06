import { wpFetch, normalizeRobot, normalizePost } from './wordpress'

// WordPress API functions
export async function getRobotsFromWordPress() {
  const data = await wpFetch('/humanoids&per_page=100')
  return data.map(normalizeRobot)
}

export async function getRobotBySlugFromWordPress(slug) {
  const data = await wpFetch(`/humanoids&slug=${slug}`)
  return data?.[0] ? normalizeRobot(data[0]) : null
}

export async function getNewsFromWordPress() {
  const data = await wpFetch('/posts&per_page=100')
  return data.map(normalizePost)
}

export async function getReviewsFromWordPress() {
  const data = await wpFetch('/reviews&per_page=100')
  return data.map(normalizePost)
}

export async function getGuidesFromWordPress() {
  const data = await wpFetch('/guides&per_page=100')
  return data.map(normalizePost)
}

// Old project import compatibility
// Project ke existing files robotsApi, newsApi, reviewsApi, guidesApi import kar rahe hain.
// Isliye ye objects export karna zaroori hai.

export const robotsApi = {
  getAll: getRobotsFromWordPress,
  getBySlug: getRobotBySlugFromWordPress,
  getById: async (id) => {
    const robots = await getRobotsFromWordPress()
    return robots.find((robot) => robot.id === id || robot.slug === id) || null
  },
}

export const newsApi = {
  getAll: getNewsFromWordPress,
  getBySlug: async (slug) => {
    const posts = await getNewsFromWordPress()
    return posts.find((post) => post.slug === slug || post.id === slug) || null
  },
}

export const reviewsApi = {
  getAll: getReviewsFromWordPress,
  getBySlug: async (slug) => {
    const reviews = await getReviewsFromWordPress()
    return reviews.find((review) => review.slug === slug || review.id === slug) || null
  },
}

export const guidesApi = {
  getAll: getGuidesFromWordPress,
  getBySlug: async (slug) => {
    const guides = await getGuidesFromWordPress()
    return guides.find((guide) => guide.slug === slug || guide.id === slug) || null
  },
}