// pages/Home.jsx
import NewsTicker from '../components/layout/NewsTicker'
import HeroSection from '../components/home/HeroSection'
import FeaturedArticles from '../components/home/FeaturedArticles'
import TopRobots from '../components/home/TopRobots'
import CategoryGrid from '../components/home/CategoryGrid'
import NewsletterSignup from '../components/layout/NewsletterSignup'
import PageTransition from '../components/common/PageTransition'

export default function Home() {
  return (
    <PageTransition>
      {/* News ticker at very top */}
      <div className="pt-16">
        <NewsTicker />
      </div>

      <HeroSection />
      <FeaturedArticles />
      <TopRobots />
      <CategoryGrid />
      <NewsletterSignup />
    </PageTransition>
  )
}
