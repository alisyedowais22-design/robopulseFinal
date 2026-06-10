import { Link } from 'react-router-dom'

function SocialIcon({ href = '#', label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#A7B0C8',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#00F0C8'
        e.currentTarget.style.borderColor = 'rgba(0,240,200,0.35)'
        e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,240,200,0.12)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#A7B0C8'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {children}
    </a>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.25 22 17.08 22 12.06Z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.25-8.29L2.96 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.84h1.72L8.42 4.05H6.57l11.23 15.79Z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.3 8.1h4.4V23H.3V8.1Zm7.2 0h4.22v2.04h.06c.59-1.12 2.03-2.3 4.18-2.3 4.47 0 5.3 2.94 5.3 6.76V23h-4.4v-7.45c0-1.78-.03-4.06-2.47-4.06-2.48 0-2.86 1.93-2.86 3.93V23H7.5V8.1Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2s-.23-1.64-.95-2.36c-.91-.95-1.93-.96-2.4-1.01C16.8 2.58 12 2.58 12 2.58h-.01s-4.8 0-8.15.25c-.47.05-1.49.06-2.4 1.01C.72 4.56.5 6.2.5 6.2S.25 8.13.25 10.06v1.81c0 1.93.24 3.86.24 3.86s.23 1.64.95 2.36c.91.95 2.1.92 2.63 1.02 1.91.18 7.93.24 7.93.24s4.81-.01 8.16-.26c.47-.05 1.49-.06 2.4-1.01.72-.72.95-2.36.95-2.36s.24-1.93.24-3.86v-1.81c0-1.93-.25-3.86-.25-3.86ZM9.75 14.05V7.35l6.25 3.36-6.25 3.34Z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg-primary pt-20 pb-8">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center mb-8">
              <img
                src="/Robo.png"
                alt="RoboPulse"
                className="h-20 w-auto object-contain"
              />
            </Link>

            <p className="text-text-secondary text-sm leading-relaxed max-w-xs mb-6">
              Independent coverage of the humanoid robot industry. No manufacturer money. No PR spin. The pulse of the robot revolution.
            </p>

            <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-6">
              EST. 2024 | 20+ Models
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <SocialIcon href="#" label="Facebook">
                <FacebookIcon />
              </SocialIcon>

              <SocialIcon href="#" label="X">
                <XIcon />
              </SocialIcon>

              <SocialIcon href="#" label="LinkedIn">
                <LinkedinIcon />
              </SocialIcon>

              <SocialIcon href="#" label="Instagram">
                <InstagramIcon />
              </SocialIcon>

              <SocialIcon href="#" label="YouTube">
                <YoutubeIcon />
              </SocialIcon>
            </div>
          </div>

          {/* Reviews + Compare merged */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.35em] text-text-muted mb-6">
              Reviews & Compare
            </h4>

            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/reviews" className="text-text-secondary hover:text-accent-teal transition-colors">
                  All Reviews
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Top Picks
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Compare Tool
                </Link>
              </li>
              <li>
                <Link to="/database" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Spec Database
                </Link>
              </li>
              <li>
                <Link to="/database" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Price Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.35em] text-text-muted mb-6">
              Learn
            </h4>

            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/guides" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Buyer&apos;s Guides
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Explainers
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Industry Analysis
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-text-secondary hover:text-accent-teal transition-colors">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.35em] text-text-muted mb-6">
              Company
            </h4>

            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/about" className="text-text-secondary hover:text-accent-teal transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Advertise
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.35em] text-text-muted mb-6">
              Legal
            </h4>

            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/privacy" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Cookie Settings
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Corrections Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-text-muted">
            © 2026 RoboPulse Media Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs">
            <Link to="/privacy" className="text-text-muted hover:text-accent-teal transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-text-muted hover:text-accent-teal transition-colors">
              Terms
            </Link>
            <Link to="/advertise" className="text-text-muted hover:text-accent-teal transition-colors">
              Advertise
            </Link>
            <Link to="/contact" className="text-text-muted hover:text-accent-teal transition-colors">
              Contact
            </Link>
          </div>

          <p className="font-mono text-xs text-accent-teal">
            ● All systems operational
          </p>
        </div>
      </div>
    </footer>
  )
}