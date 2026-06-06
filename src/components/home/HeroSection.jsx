// components/home/HeroSection.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const STATS = [
  { value: '20+', label: 'Models Tracked' },
  { value: '$5.9K', label: 'Cheapest Robot' },
  { value: '$165B', label: 'Market Size' },
  { value: '12', label: 'Available Now' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      {/* Glow orbs */}
      <div
        className="glow-orb w-[600px] h-[600px] opacity-15 animate-glow-pulse"
        style={{
          background: 'radial-gradient(circle, #00F0C8, transparent 70%)',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      <div
        className="glow-orb w-80 h-80 opacity-10"
        style={{
          background: 'radial-gradient(circle, #6C63FF, transparent 70%)',
          bottom: '20%',
          left: '10%',
        }}
      />
      <div
        className="glow-orb w-64 h-64 opacity-10"
        style={{
          background: 'radial-gradient(circle, #FF4060, transparent 70%)',
          top: '30%',
          right: '5%',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,240,200,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,200,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-wide relative z-10 text-center">
        {/* Pre-label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full"
          style={{ background: 'rgba(0,240,200,0.08)', border: '1px solid rgba(0,240,200,0.2)' }}
        >
          <span
            className="w-2 h-2 rounded-full pulse-dot"
            style={{ background: '#00F0C8', boxShadow: '0 0 6px #00F0C8' }}
          />
          <span className="text-xs font-mono text-accent-teal tracking-widest uppercase">
            20 Robots Tracked · Updated Daily
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-heading tracking-heading text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-none mb-6"
        >
          <span className="text-text-primary block">THE PULSE OF</span>
          <span
            className="block"
            style={{
              background: 'linear-gradient(135deg, #00F0C8 0%, #6C63FF 50%, #00F0C8 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ROBOT REVOLUTION
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Expert reviews, head-to-head comparisons, and live data on every humanoid robot that matters. No hype — just signal.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex items-center justify-center gap-4 flex-wrap mb-16"
        >
          <Link
            to="/reviews"
            className="btn btn-primary px-8 py-3.5 text-base font-bold"
            style={{ background: '#00F0C8', color: '#05060A' }}
          >
            Read Reviews ↗
          </Link>
          <Link
            to="/compare"
            className="btn btn-outline px-8 py-3.5 text-base"
          >
            ⚡ Compare Models
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="inline-flex items-center gap-0 rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(13,16,32,0.8)',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="px-6 py-4 text-center"
              style={{
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <p className="font-mono font-bold text-xl text-accent-teal">{stat.value}</p>
              <p className="text-xs text-text-muted mt-0.5 whitespace-nowrap">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-text-muted font-mono uppercase tracking-wider">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-accent-teal to-transparent"
        />
      </motion.div>
    </section>
  )
}
