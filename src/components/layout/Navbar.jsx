// components/layout/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '../../utils/constants'

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(5,6,10,0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="container-wide flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src="/Robo.png"
            alt="RoboPulse"
            className="h-12 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded"
                style={{ color: isActive ? '#00F0C8' : '#7A8299' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded"
                    style={{ background: 'rgba(0,240,200,0.08)', border: '1px solid rgba(0,240,200,0.2)' }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 hover:text-text-primary transition-colors">
                  {link.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* CTA button desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/compare"
            className="btn btn-primary text-xs px-4 py-2"
            style={{ background: '#00F0C8', color: '#05060A' }}
          >
            ⚡ Compare Robots
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-text-primary origin-center"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-text-primary"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-text-primary origin-center"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(5,6,10,0.98)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <nav className="container-wide py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => {
                const isActive = location.pathname === link.path
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className="block px-4 py-3 rounded text-sm font-medium transition-colors"
                      style={{
                        color: isActive ? '#00F0C8' : '#7A8299',
                        background: isActive ? 'rgba(0,240,200,0.08)' : 'transparent',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
              <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <Link to="/compare" className="btn btn-primary w-full justify-center text-sm">
                  ⚡ Compare Robots
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
