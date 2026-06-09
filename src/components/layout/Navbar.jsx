// components/layout/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '../../utils/constants'

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const filteredNavLinks = NAV_LINKS.filter(
    (link) => link.path !== '/categories' && link.label !== 'Categories'
  )

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-300"
        style={{
          background: scrolled || mobileOpen ? 'rgba(5,6,10,0.96)' : 'rgba(5,6,10,0.35)',
          borderBottom:
            scrolled || mobileOpen
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid transparent',
          backdropFilter: scrolled || mobileOpen ? 'blur(16px)' : 'blur(8px)',
        }}
      >
        <div className="container-wide flex items-center justify-between h-20 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group shrink-0">
            <img
              src="/Robo.png"
              alt="RoboPulse"
              className="h-14 md:h-20 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {filteredNavLinks.map((link) => {
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
                      style={{
                        background: 'rgba(0,240,200,0.08)',
                        border: '1px solid rgba(0,240,200,0.2)',
                      }}
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

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
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
            type="button"
            className="lg:hidden relative z-[10001] flex flex-col items-center justify-center gap-1.5 w-11 h-11 rounded-xl border border-white/10 bg-white/5"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white rounded-full origin-center"
            />

            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-white rounded-full"
            />

            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white rounded-full origin-center"
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-0 right-0 bottom-0 z-[9998] lg:hidden overflow-y-auto"
            style={{
              background:
                'linear-gradient(180deg, rgba(5,6,10,0.98) 0%, rgba(10,12,20,0.98) 100%)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <nav className="container-wide py-6 flex flex-col gap-3">
              {filteredNavLinks.map((link, i) => {
                const isActive = location.pathname === link.path

                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={link.path}
                      className="flex items-center justify-between w-full px-5 py-4 rounded-2xl text-base font-semibold transition-all"
                      style={{
                        color: isActive ? '#00F0C8' : '#E8EAF0',
                        background: isActive
                          ? 'rgba(0,240,200,0.10)'
                          : 'rgba(255,255,255,0.04)',
                        border: isActive
                          ? '1px solid rgba(0,240,200,0.25)'
                          : '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <span>{link.label}</span>
                      <span className="text-text-muted">→</span>
                    </Link>
                  </motion.div>
                )
              })}

              <div className="pt-4 mt-3 border-t border-white/10">
                <Link
                  to="/compare"
                  className="flex items-center justify-center w-full px-5 py-4 rounded-2xl font-bold text-base"
                  style={{
                    background: '#00F0C8',
                    color: '#05060A',
                  }}
                >
                  ⚡ Compare Robots
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}