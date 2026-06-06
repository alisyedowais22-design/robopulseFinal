// routes.jsx
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Reviews from './pages/Reviews'
import Compare from './pages/Compare'
import Database from './pages/Database'
import News from './pages/News'
import Guides from './pages/Guides'
import Categories from './pages/Categories'
import About from './pages/About'
import Contact from './pages/Contact'
import Advertise from './pages/Advertise'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

export default function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/database" element={<Database />} />
        <Route path="/news" element={<News />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/advertise" element={<Advertise />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </AnimatePresence>
  )
}
