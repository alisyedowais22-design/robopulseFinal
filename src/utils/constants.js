// utils/constants.js

export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/reviews', label: 'Reviews' },
  { path: '/compare', label: 'Compare' },
  { path: '/database', label: 'Database' },
  { path: '/news', label: 'News' },
  { path: '/guides', label: 'Guides' },
  { path: '/categories', label: 'Categories' },
  { path: '/about', label: 'About' },
]

export const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'available', label: 'Available Now' },
  { value: 'under30k', label: 'Under $30K' },
  { value: 'us', label: 'US Made' },
  { value: 'china', label: 'China Made' },
  { value: 'home', label: 'Home Use' },
  { value: 'industrial', label: 'Industrial' },
]

export const SORT_OPTIONS = [
  { value: 'score', label: 'Score (High to Low)' },
  { value: 'price-low', label: 'Price (Low to High)' },
  { value: 'price-high', label: 'Price (High to Low)' },
  { value: 'name', label: 'Name (A–Z)' },
]

export const AVAIL_COLORS = {
  available: { bg: 'rgba(0,240,200,0.1)', border: 'rgba(0,240,200,0.3)', text: '#00F0C8' },
  beta: { bg: 'rgba(245,200,66,0.1)', border: 'rgba(245,200,66,0.3)', text: '#F5C842' },
  soon: { bg: 'rgba(108,99,255,0.1)', border: 'rgba(108,99,255,0.3)', text: '#6C63FF' },
  research: { bg: 'rgba(255,64,96,0.1)', border: 'rgba(255,64,96,0.3)', text: '#FF4060' },
}

export const COUNTRY_COLORS = {
  US: { bg: 'rgba(0,112,255,0.15)', text: '#4080FF', label: '🇺🇸 US' },
  CN: { bg: 'rgba(255,64,60,0.15)', text: '#FF4040', label: '🇨🇳 CN' },
  EU: { bg: 'rgba(108,99,255,0.15)', text: '#6C63FF', label: '🇪🇺 EU' },
}

export const NEWS_CATEGORY_COLORS = {
  Launches: 'teal',
  Funding: 'gold',
  Deployments: 'purple',
  Geopolitics: 'pink',
}
