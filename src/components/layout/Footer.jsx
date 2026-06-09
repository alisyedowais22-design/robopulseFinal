import { Link } from 'react-router-dom'

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
                className="h-20 w-auto object-contain"              />
            </Link>

            <p className="text-text-secondary text-sm leading-relaxed max-w-xs mb-6">
              Independent coverage of the humanoid robot industry. No manufacturer money. No PR spin. The pulse of the robot revolution.
            </p>

            <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
              EST. 2024 | 20+ Models
            </p>
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