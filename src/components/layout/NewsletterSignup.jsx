// components/layout/NewsletterSignup.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,240,200,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="glow-orb w-96 h-96 opacity-20"
        style={{
          background: 'radial-gradient(circle, #00F0C8, transparent)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="container-wide relative z-10">
        <div
          className="max-w-2xl mx-auto text-center p-10 rounded-2xl"
          style={{
            background: 'rgba(13,16,32,0.8)',
            border: '1px solid rgba(0,240,200,0.15)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full" style={{ background: 'rgba(0,240,200,0.1)', border: '1px solid rgba(0,240,200,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-teal pulse-dot" />
            <span className="text-xs font-mono text-accent-teal uppercase tracking-widest">Intelligence Briefing</span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl tracking-heading text-text-primary mb-4">
            THE ROBOT INTELLIGENCE <span className="text-accent-teal">BRIEF</span>
          </h2>
          <p className="text-text-secondary mb-8 leading-relaxed">
            Weekly robot reviews, price drops, funding rounds, and industry moves — curated for people who actually care about the humanoid revolution.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 py-4"
            >
              <span className="text-2xl">🤖</span>
              <div className="text-left">
                <p className="text-accent-teal font-semibold">You're in the loop.</p>
                <p className="text-sm text-text-secondary">First briefing lands next Monday.</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 text-sm"
                style={{
                  background: 'rgba(10,12,20,0.8)',
                  border: '1px solid rgba(255, 0, 0, 0.1)',
                  color: '#E8EAF0',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                }}
              />
              <button
                type="submit"
                className="btn btn-primary whitespace-nowrap"
                style={{ background: '#00F0C8', color: '#05060A', fontWeight: 700 }}
              >
                Subscribe Free →
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-text-muted">
            3,200+ readers. No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
