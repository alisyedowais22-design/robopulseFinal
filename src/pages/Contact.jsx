// pages/Contact.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/common/PageTransition'

const FAQ = [
  {
    q: 'Do you accept robot manufacturer press materials?',
    a: "Yes, but we treat them as PR, not facts. Send us your press kit, specs, and demo access. We'll verify independently before publishing anything as editorial fact. A manufacturer claiming X capability is a claim — we'll say so until we can confirm it.",
  },
  {
    q: 'How do I submit a correction?',
    a: 'Use the contact form above and select "Correction or factual dispute." Include the specific claim, the article URL, and your evidence. We investigate all corrections seriously. If we\'re wrong, we publish a correction notice at the top of the relevant piece, same day.',
  },
  {
    q: 'Can I republish or syndicate RoboPulse content?',
    a: 'With permission and attribution, yes. Contact us with details of your publication and the specific content you want to use. We generally say yes to academic, non-profit, and journalistic use. We charge licensing fees for commercial republication.',
  },
  {
    q: "I'm a researcher — can I use your database in my work?",
    a: 'Yes. Cite us as "RoboPulse Robot Database, accessed [date]." If you\'re publishing research that relies heavily on our data, we\'d appreciate a heads-up — we may be able to verify or expand the dataset for you.',
  },
  {
    q: 'Do you offer product placement or sponsored reviews?',
    a: 'No. Reviews are editorial only. We do offer sponsored content packages for companies adjacent to the robotics industry (not robot manufacturers). See the Advertise page for full details and our editorial separation policy.',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', org: '', type: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

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
                <span className="text-xs font-mono text-accent-teal uppercase tracking-widest">Get In Touch</span>
              </div>
              <h1 className="font-heading tracking-heading text-text-primary mb-4" style={{ fontSize: 'clamp(2.8rem,6vw,4.5rem)', lineHeight: 0.95 }}>
                Contact <span className="text-accent-teal">Us</span>
              </h1>
              <p className="text-text-secondary max-w-xl leading-relaxed text-base">
                Editorial tips, corrections, partnership inquiries, press requests — pick the right channel below and we'll respond fast. We read everything.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">

              {/* Form */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs font-mono text-accent-teal uppercase tracking-widest">// SEND A MESSAGE</span>
                </div>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl p-10 text-center"
                    style={{ background: 'rgba(0,240,200,.05)', border: '1px solid rgba(0,240,200,.2)' }}
                  >
                    <p className="text-4xl mb-3">✅</p>
                    <p className="font-heading text-2xl tracking-heading text-text-primary mb-2">Message Sent</p>
                    <p className="text-sm text-text-secondary">We'll respond within 1–2 business days. Editorial tips may take longer if we're verifying information.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-text-secondary mb-2">Your Name</label>
                      <input
                        type="text"
                        placeholder="First and last name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full text-sm"
                        style={{ background: '#161923', border: '1px solid rgba(255,255,255,0.12)', color: '#F0F2F8', borderRadius: '10px', padding: '12px 16px' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-text-secondary mb-2">Email Address</label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                        className="w-full text-sm"
                        style={{ background: '#161923', border: '1px solid rgba(255,255,255,0.12)', color: '#F0F2F8', borderRadius: '10px', padding: '12px 16px' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-text-secondary mb-2">Organisation (optional)</label>
                      <input
                        type="text"
                        placeholder="Company, publication, or institution"
                        value={form.org}
                        onChange={e => setForm({ ...form, org: e.target.value })}
                        className="w-full text-sm"
                        style={{ background: '#161923', border: '1px solid rgba(255,255,255,0.12)', color: '#F0F2F8', borderRadius: '10px', padding: '12px 16px' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-text-secondary mb-2">Inquiry Type</label>
                      <select
                        value={form.type}
                        onChange={e => setForm({ ...form, type: e.target.value })}
                        className="w-full text-sm cursor-pointer"
                        style={{ background: '#161923', border: '1px solid rgba(255,255,255,0.12)', color: form.type ? '#F0F2F8' : '#6B7280', borderRadius: '10px', padding: '12px 16px' }}
                      >
                        <option value="">Select a category</option>
                        <option>Editorial tip or news lead</option>
                        <option>Correction or factual dispute</option>
                        <option>Press or media inquiry</option>
                        <option>Advertising or sponsorship</option>
                        <option>Robot manufacturer / PR</option>
                        <option>Research or academic collaboration</option>
                        <option>General feedback</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-text-secondary mb-2">Subject</label>
                      <input
                        type="text"
                        placeholder="Brief summary of your message"
                        value={form.subject}
                        onChange={e => setForm({ ...form, subject: e.target.value })}
                        className="w-full text-sm"
                        style={{ background: '#161923', border: '1px solid rgba(255,255,255,0.12)', color: '#F0F2F8', borderRadius: '10px', padding: '12px 16px' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-text-secondary mb-2">Message</label>
                      <textarea
                        placeholder="Tell us what you have. The more specific, the better — especially for tips and corrections."
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        className="w-full text-sm resize-y"
                        style={{ background: '#161923', border: '1px solid rgba(255,255,255,0.12)', color: '#F0F2F8', borderRadius: '10px', padding: '12px 16px', minHeight: '130px' }}
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary px-7 py-3 text-sm font-bold"
                        style={{ background: '#00F0C8', color: '#000' }}
                      >
                        Send Message →
                      </button>
                      <p className="text-xs font-mono text-text-muted mt-3">We respond to all messages within 1–2 business days. Editorial tips may take longer if we're verifying information.</p>
                    </div>
                  </form>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">

                {/* Direct Channels */}
                <div className="rounded-xl p-6" style={{ background: '#0D1020', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 className="font-heading text-lg tracking-heading text-text-primary mb-4">DIRECT CHANNELS</h3>
                  {[
                    { icon: '✉️', label: 'Email (All Enquiries)', val: <a href="mailto:contentpublisherslimited@gmail.com" className="text-accent-teal no-underline hover:underline" style={{ fontSize: '14px', fontWeight: 500 }}>contentpublisherslimited@gmail.com</a> },
                    { icon: '📞', label: 'Phone', val: <a href="tel:+447561432771" className="text-text-primary no-underline" style={{ fontSize: '14px', fontWeight: 500 }}>+44 7561 432771</a> },
                    { icon: '🏢', label: 'Registered Address', val: <span className="text-text-primary text-sm leading-relaxed">WRE Content Publishers Limited<br />368, 85 Dunstall Hill<br />Wolverhampton, WV6 0SR<br />United Kingdom</span> },
                  ].map((m, i, arr) => (
                    <div key={m.label} className="flex items-start gap-3 py-3" style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: 'rgba(0,240,200,.08)', border: '1px solid rgba(0,240,200,.15)' }}>{m.icon}</div>
                      <div>
                        <p className="text-xs font-mono text-text-secondary mb-0.5">{m.label}</p>
                        {m.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Response Times */}
                <div className="rounded-xl p-6" style={{ background: '#0D1020', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 className="font-heading text-lg tracking-heading text-text-primary mb-4">RESPONSE TIMES</h3>
                  <div className="space-y-0">
                    {[
                      { label: 'Editorial tips', time: '24–72 hrs' },
                      { label: 'Corrections', time: 'Same day' },
                      { label: 'Press requests', time: '1–2 business days' },
                      { label: 'Advertising', time: '1–3 business days' },
                    ].map((r, i, arr) => (
                      <div key={r.label} className="flex items-center justify-between py-2.5" style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                        <span className="text-sm text-text-secondary">{r.label}</span>
                        <span className="text-xs font-mono text-accent-teal">{r.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Follow */}
                <div className="rounded-xl p-6" style={{ background: '#0D1020', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 className="font-heading text-lg tracking-heading text-text-primary mb-3">FOLLOW THE PULSE</h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">Daily robot news, breaking model announcements, and our latest reviews — straight to your inbox or feed.</p>
                  <div className="flex flex-col gap-2">
                    <button className="w-full py-2.5 rounded-lg text-sm font-bold" style={{ background: '#00F0C8', color: '#000' }}>Subscribe to Newsletter</button>
                    <button
                      className="w-full py-2.5 rounded-lg text-sm text-text-secondary transition-colors"
                      style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#00F0C8'; e.currentTarget.style.color = '#00F0C8' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '' }}
                    >
                      Follow on X / Twitter →
                    </button>
                  </div>
                </div>

                {/* Tip Line */}
                <div className="rounded-xl p-6" style={{ background: 'rgba(108,99,255,.05)', border: '1px solid rgba(108,99,255,.2)' }}>
                  <h3 className="font-heading text-lg tracking-heading mb-3" style={{ color: '#6C63FF' }}>🤫 TIP LINE</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Inside information about a robot company, a deployment gone wrong, or specs that don't match what's being marketed? We protect all sources. Use the form and select "Editorial tip" — or email{' '}
                    <a href="mailto:contentpublisherslimited@gmail.com" style={{ color: '#6C63FF' }}>contentpublisherslimited@gmail.com</a> directly.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container-wide">
            <div className="max-w-[760px]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono text-accent-teal uppercase tracking-widest">// COMMON QUESTIONS</span>
              </div>
              <h2 className="font-heading text-3xl tracking-heading text-text-primary mb-6">Before you write</h2>
              <div>
                {FAQ.map((item, i) => (
                  <div key={i} className="py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-sm font-semibold text-text-primary mb-2">{item.q}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  )
}
