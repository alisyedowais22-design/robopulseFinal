// pages/About.jsx
import { motion } from 'framer-motion'
import PageTransition from '../components/common/PageTransition'

export default function About() {
  return (
    <PageTransition>
      <div className="pt-16">

        {/* Hero */}
        <section className="relative py-20 overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 80% at 80% 50%, rgba(0,240,200,.05) 0%, transparent 70%)' }} />
          <div className="container-wide relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-accent-teal pulse-dot" />
                <span className="text-xs font-mono text-accent-teal uppercase tracking-widest">Who We Are</span>
              </div>
              <h1 className="font-heading tracking-heading text-text-primary mb-4" style={{ fontSize: 'clamp(2.8rem,6vw,4.5rem)', lineHeight: 0.95 }}>
                About <span className="text-accent-teal">Robo</span><span className="text-accent-pink">Pulse</span>
              </h1>
              <p className="text-text-secondary max-w-xl leading-relaxed text-base">
                The independent authority on humanoid robots. No manufacturer money. No PR spin. Just honest coverage of the machines that are about to change everything.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container-wide">
            <div className="max-w-[660px]">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-mono text-accent-teal uppercase tracking-widest">// THE MISSION</span>
              </div>
              <h2 className="font-heading text-3xl tracking-heading text-text-primary mb-4">We cover the robot revolution honestly</h2>
              <h3 className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-3">Why independent coverage matters now</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Humanoid robots went from science fiction to factory floors in less than three years. By 2026, <strong className="text-text-primary">twelve commercially available models</strong> span a price range from $5,900 to $250,000. Billions of dollars have been invested. Millions of words written. And yet most of the coverage is still either <strong className="text-text-primary">pure hype from company PR teams</strong> or dismissive skepticism from people who haven't touched the hardware.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                RoboPulse exists to fill the gap. We test robots ourselves when we can. When we can't, we read every technical document, track every deployment, and apply a consistent scoring rubric so you can compare models fairly. Our <strong className="text-text-primary">RoboPulse Score</strong> evaluates dexterity, AI capability, real-world usefulness, value for money, build quality, and what we call the <strong className="text-text-primary">"hype ratio"</strong> — the gap between what a company claims and what the robot actually does.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                We don't take money from robot manufacturers. We track the <strong className="text-text-primary">US–China race</strong> without a nationalist agenda. And we write everything in <strong className="text-text-primary">plain English</strong>, because this technology is too important to be locked behind jargon.
              </p>

              {/* Highlight box */}
              <div className="rounded-xl p-6 mb-6" style={{ background: 'linear-gradient(135deg,rgba(0,240,200,.06),rgba(108,99,255,.06))', border: '1px solid rgba(0,240,200,.12)' }}>
                <p className="text-sm text-text-secondary leading-relaxed">
                  <strong className="text-accent-teal">Our editorial rule:</strong> If a robot can't do it reliably in front of us (or in independently verified video), we don't report it as a capability. Demo footage is not the same as deployed capability. We say so every time it matters.
                </p>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <button
                  onClick={() => alert('Rankings page coming soon!')}
                  className="inline-flex items-center gap-2 font-bold rounded-xl px-7 py-3.5 text-sm transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg,#00F0C8,#00C8A8)', color: '#000', boxShadow: '0 4px 20px rgba(0,240,200,.25)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,240,200,.35)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,240,200,.25)' }}
                >
                  Explore the 2026 Rankings →
                </button>
                <span className="text-xs font-mono text-text-muted">40+ models scored & compared</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Pillars */}
        <section className="py-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container-wide">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-accent-teal uppercase tracking-widest">// OUR COMMITMENT</span>
            </div>
            <h2 className="font-heading text-3xl tracking-heading text-text-primary mb-6">What makes us different</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: '🚫💰', label: 'No Manufacturer Money', desc: 'We are not funded by any robot maker, investor, or government entity with a stake in the outcome.' },
                { icon: '🌍', label: 'No National Agenda', desc: 'We track the US–China race without taking sides. Facts over flags.' },
                { icon: '✅', label: 'Verified Before Published', desc: 'Demo footage ≠ deployed capability. We say so every time it matters.' },
                { icon: '💬', label: 'Plain English Always', desc: "No jargon walls. If you're not an engineer, you shouldn't need to be one to understand this technology." },
                { icon: '🔖', label: 'Ads Clearly Labeled', desc: 'Sponsored content is marked prominently. Editorial is editorial. The line never moves.' },
                { icon: '🔄', label: 'Corrections Policy', desc: 'Errors corrected at the top of the article, same day — never buried at the bottom.' },
              ].map((p) => (
                <div key={p.label} className="rounded-xl p-5 flex flex-col gap-3 transition-colors duration-200 cursor-default"
                  style={{ background: '#0D1020', border: '1px solid rgba(255,255,255,0.06)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,240,200,.25)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: 'rgba(0,240,200,.08)', border: '1px solid rgba(0,240,200,.15)' }}>{p.icon}</div>
                  <p className="text-sm font-semibold text-text-primary">{p.label}</p>
                  <p className="text-xs text-text-secondary leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container-wide">
            <div className="flex flex-wrap rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { val: '40+', label: 'Models in database' },
                { val: '12', label: 'Available now in 2026' },
                { val: 'Daily', label: 'News coverage' },
                { val: '6', label: 'Scoring categories' },
                { val: '0', label: 'Sponsored reviews' },
              ].map((s, i, arr) => (
                <div key={s.label} className="flex-1 min-w-[120px] p-6 text-center" style={{ borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', background: '#0A0C14' }}>
                  <p className="font-heading text-3xl tracking-heading text-accent-teal">{s.val}</p>
                  <p className="text-xs font-mono text-text-secondary mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Cover */}
        <section className="py-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container-wide">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-accent-teal uppercase tracking-widest">// WHAT WE COVER</span>
            </div>
            <h2 className="font-heading text-3xl tracking-heading text-text-primary mb-6">Everything in the humanoid robot space</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '⭐', title: 'Independent Reviews', desc: 'Scored on a consistent 10-point rubric. We test dexterity, real-world capability, value, build quality, and what manufacturers actually deliver vs. what they promise.' },
                { icon: '⚖️', title: 'Head-to-Head Comparisons', desc: "Model-vs-model, maker-vs-maker, US-vs-China. We build comparison frameworks that let buyers make informed decisions, not just read spec sheets." },
                { icon: '📰', title: 'Daily News Coverage', desc: 'Funding rounds, factory deployments, new model announcements, geopolitical developments. Covered with context, not just press release rewrites.' },
                { icon: '🗄️', title: 'Model Database', desc: 'Every humanoid robot tracked: full specs, price history, availability, company background, and RoboPulse scores. Updated when new information becomes available.' },
                { icon: '💰', title: 'Price Tracking', desc: 'Real-time price monitoring for every available model. Includes total cost of ownership analysis, leasing vs. buying breakdowns, and price drop history.' },
                { icon: '📖', title: 'Plain-English Guides', desc: 'From "what is a humanoid robot" for complete beginners to detailed buying guides for factory procurement managers. We write for humans, not engineers.' },
              ].map((c) => (
                <div key={c.title} className="rounded-xl p-6 transition-colors duration-200"
                  style={{ background: '#0D1020', border: '1px solid rgba(255,255,255,0.06)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,240,200,.2)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                >
                  <span className="text-3xl block mb-3">{c.icon}</span>
                  <h3 className="text-sm font-semibold text-text-primary mb-2">{c.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Write For */}
        <section className="py-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container-wide">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-accent-teal uppercase tracking-widest">// OUR AUDIENCE</span>
            </div>
            <h2 className="font-heading text-3xl tracking-heading text-text-primary mb-2">Who reads RoboPulse</h2>
            <p className="text-sm text-text-secondary mb-6">Our readers span a wide range — from curious consumers to C-suite executives making seven-figure procurement decisions.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { icon: '🏭', strong: 'Manufacturing Decision-Makers', text: 'Evaluating robots for warehouse, automotive, and logistics operations' },
                { icon: '🏠', strong: 'Early Adopters', text: 'Considering a home robot for elder care, personal assistance, or curiosity' },
                { icon: '💰', strong: 'Investors & Analysts', text: 'Tracking the sector for VC decisions, public equity, and market sizing' },
                { icon: '🎓', strong: 'Researchers & Students', text: 'Following humanoid AI, locomotion, and dexterous manipulation' },
                { icon: '📰', strong: 'Journalists', text: 'Using our database and analysis as a reliable primary source' },
                { icon: '🤔', strong: 'Curious People', text: 'Who read "robots are taking jobs" and want to know what\'s actually true' },
              ].map((a) => (
                <div key={a.strong} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: '#161923', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-2xl">{a.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{a.strong}</p>
                    <p className="text-xs text-text-secondary mt-1 leading-snug">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container-wide">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-accent-teal uppercase tracking-widest">// THE TEAM</span>
            </div>
            <h2 className="font-heading text-3xl tracking-heading text-text-primary mb-3">Professionals who are obsessed with this technology</h2>
            <p className="text-sm text-text-secondary max-w-[660px] leading-relaxed mb-8">
              RoboPulse is built by <strong className="text-text-primary">WRE Content Publishers Limited</strong> — a UK-based team of writers, researchers, and technology specialists who genuinely believe humanoid robots are the most consequential technological shift of our generation. We don't cover this beat because it's popular. We cover it because we find it extraordinary, and we think everyone deserves clear, honest information about what's coming.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { avatar: '🤖', bg: 'linear-gradient(135deg,rgba(0,240,200,.12),rgba(108,99,255,.12))', border: 'rgba(0,240,200,.2)', name: 'Editorial', role: 'Research & Writing', bio: "Technology specialists who've spent years tracking robotics, AI, and automation. We read every paper, attend every keynote, and apply consistent standards so our coverage means something — not just fills a page." },
                { avatar: '📊', bg: 'linear-gradient(135deg,rgba(108,99,255,.12),rgba(255,64,96,.12))', border: 'rgba(108,99,255,.2)', name: 'Data & Analysis', role: 'Database, Pricing & Scores', bio: 'Our research team tracks specifications, pricing, deployment data, and funding across every major humanoid robot platform. The RoboPulse database is updated weekly — or the moment something material changes.' },
                { avatar: '🌍', bg: 'linear-gradient(135deg,rgba(245,200,66,.1),rgba(0,232,122,.1))', border: 'rgba(245,200,66,.2)', name: 'Global Coverage', role: 'US, China & Europe', bio: 'The humanoid robot race is genuinely global — with meaningful action in the US, China, Norway, Germany, and Japan. We track all of it without a national agenda, just a commitment to reporting what\'s real.' },
              ].map((t) => (
                <div key={t.name} className="rounded-xl p-6" style={{ background: '#0D1020', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4" style={{ background: t.bg, border: `1px solid ${t.border}` }}>{t.avatar}</div>
                  <p className="text-sm font-semibold text-text-primary mb-1">{t.name}</p>
                  <p className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-3">{t.role}</p>
                  <p className="text-xs text-text-secondary leading-relaxed">{t.bio}</p>
                </div>
              ))}
            </div>

            {/* Why we do this box */}
            <div className="rounded-xl p-6 mb-6" style={{ background: 'linear-gradient(135deg,rgba(0,240,200,.06),rgba(108,99,255,.06))', border: '1px solid rgba(0,240,200,.12)' }}>
              <p className="text-sm text-text-secondary leading-relaxed">
                <strong className="text-accent-teal">Why we do this:</strong> Humanoid robots are moving from demo floors to factory floors faster than most people realise. By 2026, twelve commercially available models exist. Billions are being invested. Millions of workers will be affected. We believe that makes clear, independent, jargon-free coverage more important — not less. That's the mission. That's why we built this.
              </p>
            </div>

            {/* Publisher info */}
            <div className="flex items-center gap-5 flex-wrap p-6 rounded-xl" style={{ background: '#0D1020', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Published by</p>
                <p className="text-base font-semibold text-text-primary mb-1">WRE Content Publishers Limited</p>
                <p className="text-sm text-text-secondary">368, 85 Dunstall Hill, Wolverhampton, WV6 0SR, United Kingdom</p>
              </div>
              <div className="ml-auto flex gap-3 flex-wrap">
                <a href="mailto:contentpublisherslimited@gmail.com" className="px-4 py-2 rounded-lg text-sm font-medium text-accent-teal no-underline" style={{ background: 'rgba(0,240,200,.08)', border: '1px solid rgba(0,240,200,.2)' }}>✉️ Email Us</a>
                <a href="tel:+447561432771" className="px-4 py-2 rounded-lg text-sm text-text-secondary no-underline" style={{ background: '#161923', border: '1px solid rgba(255,255,255,0.12)' }}>📞 +44 7561 432771</a>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Standards */}
        <section className="py-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container-wide">
            <div className="max-w-[660px]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono text-accent-teal uppercase tracking-widest">// EDITORIAL POLICY</span>
              </div>
              <h2 className="font-heading text-3xl tracking-heading text-text-primary mb-6">Our standards</h2>

              <h3 className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-2">Independence</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">RoboPulse is not funded by any robot manufacturer, investor in the robotics sector, or government entity with a stake in the outcome of the US–China robotics competition. Our revenue comes from advertising (clearly labeled), premium subscriptions, and event partnerships with companies that are not robot manufacturers.</p>

              <h3 className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-2">Corrections</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">We correct errors prominently and quickly. If a specification in our database changes, the database is updated within 48 hours of verified information. If we get something wrong in a review or article, we add a correction notice at the top of the piece, not buried at the bottom.</p>

              <h3 className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-2">Scores & Methodology</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">The <strong className="text-text-primary">RoboPulse Score</strong> is calculated across six equally-weighted categories. We publish the full rubric and individual category scores alongside every rating, and update scores whenever a manufacturer ships a material software or hardware change.</p>
              <ul className="mb-6 space-y-2">
                {[
                  { k: 'Dexterity', v: 'Fine motor control, grip strength, and manipulation precision in real-world tasks.' },
                  { k: 'AI Capability', v: 'Onboard reasoning, task generalisation, and adaptation to novel environments.' },
                  { k: 'Real-World Utility', v: 'Practical usefulness across the most common deployment scenarios today.' },
                  { k: 'Value for Price', v: 'Performance delivered relative to purchase cost and ongoing running costs.' },
                  { k: 'Build Quality', v: 'Hardware reliability, repairability, and long-term durability under continuous operation.' },
                  { k: 'Hype Ratio', v: "Our proprietary signal: how much of the manufacturer's marketing holds up against independent testing. A low hype ratio means the robot does what it says on the box." },
                ].map((item) => (
                  <li key={item.k} className="text-sm text-text-secondary pl-5 py-1.5 relative" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span className="absolute left-0 text-accent-teal text-xs top-2">▸</span>
                    <strong className="text-text-primary">{item.k}</strong> — {item.v}
                  </li>
                ))}
              </ul>

              <h3 className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-2">Sponsored Content</h3>
              <p className="text-sm text-text-secondary leading-relaxed">We run clearly labeled sponsored content for companies adjacent to the robotics industry (software platforms, industrial components, training data). Robot manufacturers may not sponsor individual reviews or comparisons. All sponsored content carries a prominent disclosure at the top of every piece.</p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16">
          <div className="container-wide">
            <div className="rounded-xl p-10 text-center" style={{ background: 'linear-gradient(135deg,rgba(0,240,200,.06),rgba(108,99,255,.06))', border: '1px solid rgba(0,240,200,.12)' }}>
              <p className="font-heading text-3xl tracking-heading text-text-primary mb-3">Want to work with us?</p>
              <p className="text-sm text-text-secondary mb-6">Press inquiries, editorial tips, corrections, or partnership discussions — we respond to everything.</p>
              <a href="/contact" className="btn btn-primary inline-block" style={{ background: '#00F0C8', color: '#000', fontWeight: 700 }}>Get in Touch →</a>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  )
}
