const WP_SITE_URL = import.meta.env.VITE_WP_API_URL || "https://robopulse.net";

const ENABLE_WORDPRESS = import.meta.env.VITE_ENABLE_WORDPRESS === "true";
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const isWordPressEnabled = () => {
  return ENABLE_WORDPRESS && !USE_MOCK;
};

export async function wpFetch(route) {
  if (!isWordPressEnabled()) {
    throw new Error("WordPress API disabled");
  }

  const cleanRoute = route.startsWith("/") ? route : `/${route}`;

  const url = `${WP_SITE_URL}/?rest_route=/wp/v2${cleanRoute}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status}`);
  }

  return response.json();
}

export function normalizeRobot(item) {
  const acf = item.acf || {};

  return {
    id: acf.originalId || item.slug || String(item.id),
    name: acf.name || item.title?.rendered || "",
    maker: acf.maker || "",
    country: acf.country || "",
    countryCode: acf.countryCode || "",
    price: acf.price || "",
    priceNum: Number(acf.priceNum || 0),
    availability: acf.availability || "",
    availClass: acf.availClass || "",
    score: Number(acf.score || 0),
    dof: acf.dof || "",
    height: acf.height || "",
    weight: acf.weight || "",
    speed: acf.speed || "",
    battery: acf.battery || "",
    ai: acf.ai || "",
    hand: acf.hand || "",
    deploy: acf.deploy || "",
    payload: acf.payload || "",
    tags: Array.isArray(acf.tags) ? acf.tags : [],
    scoreBreakdown: acf.scoreBreakdown || {},
    verdict: acf.verdict || "",
    pros: Array.isArray(acf.pros) ? acf.pros : [],
    cons: Array.isArray(acf.cons) ? acf.cons : [],
    excerpt: acf.excerpt || "",
    slug: item.slug,
    wpId: item.id,
  };
}

export function normalizePost(item) {
  const acf = item.acf || {};

  return {
    id: acf.originalId || item.slug || String(item.id),
    title: item.title?.rendered || "",
    excerpt: acf.excerpt || item.excerpt?.rendered || "",
    category: acf.newsCategory || "News",
    categoryColor: acf.categoryColor || "teal",
    date: acf.displayDate || item.date || "",
    readTime: acf.readTime || "",
    source: acf.source || "RoboPulse Staff",
    slug: item.slug,
    wpId: item.id,
  };
}