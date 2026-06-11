// pages/Home.jsx
import NewsTicker from '../components/layout/NewsTicker'
import HeroSection from '../components/home/HeroSection'
import FeaturedArticles from '../components/home/FeaturedArticles'
import TopRobots from '../components/home/TopRobots'
import CategoryGrid from '../components/home/CategoryGrid'
import NewsletterSignup from '../components/layout/NewsletterSignup'
import PageTransition from '../components/common/PageTransition'
import SEO from '../components/common/SEO'

export default function Home() {
  return (
    <PageTransition>
      <div>
        <SEO
          title="RoboPulse — Humanoid Robot Reviews & Comparisons"
          description="Explore expert humanoid robot reviews, robot comparisons, buying guides, industry news, robot database insights, and the latest updates from the robotics world."
          canonical="/"
        />

        {/* News ticker at very top */}
        <div className="pt-16">
          <NewsTicker />
        </div>

        <HeroSection />
        <FeaturedArticles />
        <TopRobots />
        <CategoryGrid />
        <NewsletterSignup />
      </div>
    </PageTransition>
  )
}