// pages/Advertise.jsx
import { motion } from 'framer-motion'
import PageTransition from '../components/common/PageTransition'
import SEO from '../components/common/SEO'

export default function Advertise() {
  return (
    <PageTransition>
      <>
        <SEO
          title="Advertise With RoboPulse — Reach the Humanoid Robot Industry"
          description="Partner with RoboPulse to reach robotics buyers, engineers, investors, executives, and early adopters through clearly labeled advertising and sponsorship opportunities."
          canonical="/advertise"
        />

        <div className="pt-16">

          {/* Hero */}
          <section className="relative py-20 overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 80% at 80% 50%, rgba(0,240,200,.05) 0%, transparent 70%)' }} />
            <div className="container-wide relative z-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-accent-teal pulse-dot" />
                  <span className="text-xs font-mono text-accent-teal uppercase tracking-widest">Advertising</span>
                </div>
                <h1 className="font-heading tracking-heading text-text-primary mb-4" style={{ fontSize: 'clamp(2.8rem,6vw,4.5rem)', lineHeight: 0.95 }}>
                  Partner With <span className="text-accent-teal">Robo</span><span className="text-accent-pink">Pulse</span>
                </h1>
                <p className="text-text-secondary max-w-xl leading-relaxed text-base">
                  We're building the go-to independent resource for the humanoid robot industry. If your product or service belongs in front of people who buy, build, or invest in robots — let's talk.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Early Partner */}
          <section className="py-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="container-wide">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono text-accent-teal uppercase tracking-widest">// EARLY PARTNER OPPORTUNITY</span>
              </div>
              <h2 className="font-heading text-3xl tracking-heading text-text-primary mb-8">Get in early. Shape the conversation.</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <div className="max-w-[660px]">
                  <p className="text-sm text-text-secondary leading-relaxed mb-5">
                    RoboPulse launched in 2026 as the humanoid robot market reached its first real inflection point — twelve commercially available models, billions invested, and an audience of buyers, engineers, and investors actively looking for trusted, independent coverage.
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5">
                    We're currently onboarding <strong className="text-text-primary">founding advertising partners</strong> who want to establish their brand with this audience from day one. Founding partners receive preferred rates, prominent placements, and direct collaboration on how we cover topics relevant to their market.
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    We don't publish audience numbers we can't verify. What we can tell you is who we're building for: <strong className="text-text-primary">procurement decision-makers, robotics engineers, sector investors, and the curious early-adopters</strong> who are shaping what this industry looks like in five years.
                  </p>
                </div>

                <div className="rounded-xl overflow-hidden" style={{ background: '#0D1020', border: '1px solid rgba(0,240,200,.2)' }}>
                  <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="font-heading text-lg tracking-heading text-accent-teal">WHO WE'RE BUILDING FOR</p>
                  </div>
                  {[
                    { icon: '🏭', text: 'Manufacturing & operations decision-makers' },
                    { icon: '💰', text: 'Investors tracking the $165B robotics market' },
                    { icon: '⚙️', text: 'Engineers & technical professionals' },
                    { icon: '🎯', text: 'Executives evaluating robotics adoption' },
                    { icon: '🤔', text: 'Informed early adopters following the revolution' },
                  ].map((a, i, arr) => (
                    <div key={a.text} className="flex items-center gap-3 px-6 py-3.5" style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <span className="text-xl">{a.icon}</span>
                      <span className="text-sm text-text-secondary">{a.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* What We Offer */}
          <section className="py-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="container-wide">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono text-accent-teal uppercase tracking-widest">// WHAT WE OFFER</span>
              </div>
              <h2 className="font-heading text-3xl tracking-heading text-text-primary mb-3">Advertising formats available</h2>
              <p className="text-sm text-text-secondary max-w-xl leading-relaxed mb-8">
                All advertising is clearly labeled. We do not sell sponsored reviews or allow advertisers to influence editorial coverage. Pricing is discussed directly — we tailor packages based on your goals, not off a rate card.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: '📐', title: 'Display Advertising', desc: 'Banner placements site-wide across editorial pages. Standard formats (300×250, 728×90). Monthly impression reporting included.' },
                  { icon: '📝', title: 'Sponsored Content', desc: 'Editorial-style sponsored articles, clearly labeled. Written by your team or ours. Permanent archive placement and social promotion included.', featured: true },
                  { icon: '📬', title: 'Newsletter Sponsorship', desc: 'Dedicated placement in our weekly digest, sent directly to subscribers. Your message, reviewed for editorial fit.' },
                  { icon: '🤝', title: 'Founding Partner', desc: 'A longer-term arrangement combining all formats, preferred rates, and early access to new placements. Limited to a small number of partners to preserve value.' },
                ].map((pkg) => (
                  <div
                    key={pkg.title}
                    className="rounded-xl p-6 transition-colors duration-200"
                    style={{
                      background: pkg.featured ? 'rgba(0,240,200,.03)' : '#0D1020',
                      border: pkg.featured ? '1px solid rgba(0,240,200,.4)' : '1px solid rgba(255,255,255,0.06)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,240,200,.25)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = pkg.featured ? 'rgba(0,240,200,.4)' : 'rgba(255,255,255,0.06)'}
                  >
                    <span className="text-3xl block mb-4">{pkg.icon}</span>
                    <h3 className="text-sm font-semibold text-text-primary mb-2">{pkg.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">{pkg.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Who Can Advertise */}
          <section className="py-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="container-wide">
              <div className="max-w-[660px]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono text-accent-teal uppercase tracking-widest">// ADVERTISING POLICY</span>
                </div>
                <h2 className="font-heading text-3xl tracking-heading text-text-primary mb-6">Who can advertise (and who can't)</h2>

                <h3 className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-2">Eligible advertisers</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Companies whose products or services are relevant to our readers' professional lives. This includes: industrial automation software, robotic component suppliers, AI training data providers, manufacturing consultancies, investment platforms focused on technology, logistics and supply chain software, and technical training or certification programs.
                </p>

                <h3 className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-2">Robot manufacturers</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Robot manufacturers may purchase standard display advertising. They may <strong className="text-text-primary">not</strong> sponsor content on pages that review or compare their products. They may <strong className="text-text-primary">not</strong> sponsor newsletter editions that coincide with coverage of their product launches. This separation is non-negotiable and enforced editorially, not commercially.
                </p>

                <h3 className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-2">What we don't accept</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  We don't run advertising for: cryptocurrency projects, financial products with high retail investor risk, health or medical claims, or any advertiser whose claims we believe to be materially misleading. We reserve the right to decline any advertising for any reason.
                </p>

                <div className="rounded-xl p-6" style={{ background: 'linear-gradient(135deg,rgba(0,240,200,.06),rgba(108,99,255,.06))', border: '1px solid rgba(0,240,200,.12)' }}>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    <strong className="text-accent-teal">Custom research & reports:</strong> We also produce custom research for companies that need authoritative, independently-sourced market analysis on the humanoid robot industry. Contact us for pricing and scope. These projects are disclosed as commissioned research and carry our standard editorial methodology.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16">
            <div className="container-wide">
              <div className="rounded-xl p-10 text-center" style={{ background: 'linear-gradient(135deg,rgba(0,240,200,.06),rgba(108,99,255,.06))', border: '1px solid rgba(0,240,200,.12)' }}>
                <p className="font-heading text-3xl tracking-heading text-text-primary mb-3">Interested in partnering?</p>
                <p className="text-sm text-text-secondary max-w-lg mx-auto mb-8">
                  Tell us about your company and what you're trying to achieve. We'll come back with a straightforward conversation about what makes sense — no rate card, no hard sell.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <a
                    href="mailto:contentpublisherslimited@gmail.com"
                    className="btn btn-primary text-sm font-bold no-underline"
                    style={{ background: '#00F0C8', color: '#000' }}
                  >
                    ✉️ Start a Conversation
                  </a>
                  <a
                    href="tel:+447561432771"
                    className="btn btn-outline text-sm no-underline"
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#00F0C8'; e.currentTarget.style.color = '#00F0C8' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = '' }}
                  >
                    📞 +44 7561 432771
                  </a>
                </div>
                <p className="text-xs font-mono text-text-muted mt-6">WRE Content Publishers Limited · 368, 85 Dunstall Hill, Wolverhampton, WV6 0SR, UK</p>
              </div>
            </div>
          </section>

        </div>
      </>
    </PageTransition>
  )
}