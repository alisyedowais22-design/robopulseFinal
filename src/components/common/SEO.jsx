import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'RoboPulse'
const SITE_URL = 'https://robopulse.net'
const DEFAULT_IMAGE = `${SITE_URL}/Robo.png`

export default function SEO({
  title = 'RoboPulse — Humanoid Robot Reviews & Comparisons',
  description = 'RoboPulse delivers expert humanoid robot reviews, comparisons, guides, robot database insights, and robotics industry news.',
  canonical = '',
  image = DEFAULT_IMAGE,
  type = 'website',
}) {
  const pageUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}