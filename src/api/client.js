// api/client.js — API client (ready for WordPress backend integration)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.robopulse.com/wp-json/robopulse/v1'

export async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export default apiFetch
