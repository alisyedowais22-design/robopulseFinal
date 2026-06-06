// components/layout/Footer.jsx
import { Link } from 'react-router-dom'

const FOOTER_LINKS = {
  'Reviews': [
    { label: 'All Reviews', to: '/reviews' },
    { label: 'Top Picks', to: '/reviews' },
    { label: 'Newest', to: '/reviews' },
    { label: 'Best Value', to: '/reviews' },
  ],
  'Compare': [
    { label: 'Compare Tool', to: '/compare' },
    { label: 'US vs China', to: '/categories' },
    { label: 'Price Tracker', to: '/database' },
    { label: 'Spec Database', to: '/database' },
  ],
  'Learn': [
    { label: 'Buyer\'s Guides', to: '/guides' },
    { label: 'Explainers', to: '/guides' },
    { label: 'Industry Analysis', to: '/guides' },
    { label: 'News', to: '/news' },
  ],
  'Company': [
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Advertise', to: '/advertise' },
    { label: 'Newsletter', to: '/' },
  ],
  'Legal': [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Cookie Settings', to: '/' },
    { label: 'Corrections Policy', to: '/about' },
  ],
}

export default function Footer() {
  return (
    <footer
      className="mt-24 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#05060A' }}
    >
      <div className="container-wide py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/Robo.png"
                alt="RoboPulse"
                className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Independent coverage of the humanoid robot industry. No manufacturer money. No PR spin. The pulse of the robot revolution.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-muted font-mono">EST. 2024</span>
              <span className="w-px h-3 bg-text-muted" />
              <span className="text-xs text-text-muted font-mono">40+ MODELS</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted mb-4">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-text-secondary hover:text-accent-teal transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs text-text-muted font-mono">
            © 2026 RoboPulse Media Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-text-muted hover:text-text-secondary transition-colors">Privacy</Link>
            <Link to="/terms" className="text-xs text-text-muted hover:text-text-secondary transition-colors">Terms</Link>
            <Link to="/advertise" className="text-xs text-text-muted hover:text-text-secondary transition-colors">Advertise</Link>
            <Link to="/contact" className="text-xs text-text-muted hover:text-text-secondary transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-teal pulse-dot" />
            <span className="text-xs font-mono text-accent-teal">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}