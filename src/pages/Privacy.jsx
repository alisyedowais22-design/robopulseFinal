// pages/Privacy.jsx
import { motion } from 'framer-motion'
import PageTransition from '../components/common/PageTransition'

export default function Privacy() {
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
                <span className="text-xs font-mono text-accent-teal uppercase tracking-widest">Legal</span>
              </div>
              <h1 className="font-heading tracking-heading text-text-primary mb-4" style={{ fontSize: 'clamp(2.8rem,6vw,4.5rem)', lineHeight: 0.95 }}>
                Privacy <span className="text-accent-teal">Policy</span>
              </h1>
              <p className="text-text-secondary max-w-xl leading-relaxed text-base">
                How RoboPulse collects, uses, and protects your personal data. Written in plain English, not legal boilerplate designed to obscure.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container-wide">
            <div style={{ maxWidth: '760px' }}>

              {/* Meta bar */}
              <div className="flex flex-wrap gap-6 rounded-lg px-5 py-4 mb-10 text-xs font-mono text-text-secondary" style={{ background: '#161923', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div><span className="text-text-muted">Effective: </span>1 January 2026</div>
                <div><span className="text-text-muted">Last updated: </span>1 May 2026</div>
                <div><span className="text-text-muted">Controller: </span>WRE Content Publishers Limited</div>
                <div><span className="text-text-muted">Contact: </span><a href="mailto:contentpublisherslimited@gmail.com" className="text-accent-teal">contentpublisherslimited@gmail.com</a></div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-8">
                This Privacy Policy explains how RoboPulse, published by WRE Content Publishers Limited ("we," "us," or "our"), handles personal information when you visit robopulse.com, sign up for our newsletter, contact us, or use any of our services. We've written it to be readable. If something is still unclear, email <a href="mailto:contentpublisherslimited@gmail.com" className="text-accent-teal">contentpublisherslimited@gmail.com</a>.
              </p>

              {[
                {
                  title: '1. What Data We Collect',
                  sections: [
                    { h: 'Information you give us directly', p: 'When you subscribe to our newsletter, contact us, or create an account, you provide us with: your email address, your name (optional), and any information you choose to include in messages you send us. We collect only what you provide — we don\'t ask for more than we need.' },
                    { h: 'Information collected automatically', p: 'When you visit our site, our servers automatically log: your IP address (anonymised after 24 hours), browser type, the pages you visit, time spent on those pages, and referring URLs. We use this to understand how people use the site and to diagnose technical problems — not to build profiles of individual users.' },
                    { h: 'Cookies and similar technologies', p: 'We use a small number of cookies. Some are essential for the site to function (session cookies, preference cookies). Others help us understand aggregate traffic patterns (analytics cookies). We do not use advertising cookies or cross-site tracking cookies. You can refuse non-essential cookies when you first visit the site, and you can change your preferences at any time in the cookie settings link in the footer.' },
                  ],
                },
                {
                  title: '2. How We Use Your Data',
                  body: (
                    <>
                      <p className="text-sm text-text-secondary leading-relaxed mb-4">We use the data we collect for the following purposes:</p>
                      <ul className="mb-5 space-y-2">
                        {[
                          'To send you the newsletter editions you subscribed to, and occasional product updates from RoboPulse',
                          'To respond to messages and enquiries you send us',
                          'To analyse aggregate site usage and improve our content and user experience',
                          'To detect and prevent fraud, abuse, or security threats to our systems',
                          'To comply with legal obligations where applicable',
                        ].map((item, i) => (
                          <li key={i} className="text-sm text-text-secondary pl-5 py-1.5 relative" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <span className="absolute left-0 text-accent-teal text-xs top-2">▸</span>{item}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-text-secondary leading-relaxed">We do not sell your personal data to any third party. We do not share your email address with advertisers. When we publish sponsored content, advertisers do not receive any data about individual readers.</p>
                    </>
                  ),
                },
                {
                  title: '3. Email Newsletter',
                  sections: [
                    { p: 'If you subscribe to the RoboPulse newsletter, your email address is stored on our email platform (currently Mailchimp or equivalent). We send editorial newsletters, occasional updates about new features, and — clearly labeled — sponsored editions where an advertiser has paid for a placement. Every newsletter contains an unsubscribe link that works immediately. We do not send newsletters more than once per day.' },
                    { p: 'We track aggregate open rates and click rates to understand which content performs well. We do not share individual open or click data with any third party, including advertisers.' },
                  ],
                },
                {
                  title: '4. Data Sharing',
                  body: (
                    <>
                      <p className="text-sm text-text-secondary leading-relaxed mb-4">We share your data only in the following limited circumstances:</p>
                      <ul className="mb-5 space-y-2">
                        {[
                          { k: 'Service providers:', v: 'Companies that help us run our systems (hosting, email delivery, analytics). They access data only as needed to perform their services and are bound by data processing agreements.' },
                          { k: 'Legal requirements:', v: "If we're required to disclose data by law, court order, or government authority, we will comply. Where legally permitted, we will notify you." },
                          { k: 'Business transfers:', v: 'If RoboPulse is acquired or merges with another entity, your data may transfer to the new owner. We will notify subscribers before this happens and provide an option to delete your data.' },
                        ].map((item, i) => (
                          <li key={i} className="text-sm text-text-secondary pl-5 py-1.5 relative" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <span className="absolute left-0 text-accent-teal text-xs top-2">▸</span>
                            <strong className="text-text-primary">{item.k}</strong> {item.v}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-text-secondary leading-relaxed">In all other circumstances, we do not share your personal data.</p>
                    </>
                  ),
                },
                {
                  title: '5. Your Rights',
                  body: (
                    <>
                      <p className="text-sm text-text-secondary leading-relaxed mb-4">Depending on where you're located, you have some or all of the following rights:</p>
                      <ul className="mb-5 space-y-2">
                        {[
                          { k: 'Access:', v: 'Request a copy of the data we hold about you' },
                          { k: 'Correction:', v: 'Ask us to correct inaccurate data' },
                          { k: 'Deletion:', v: "Ask us to delete your data. We will do so unless we have a legal obligation to retain it" },
                          { k: 'Portability:', v: 'Request your data in a machine-readable format' },
                          { k: 'Objection:', v: 'Object to certain uses of your data' },
                          { k: 'Unsubscribe:', v: 'Remove yourself from any or all of our communications at any time' },
                        ].map((item, i) => (
                          <li key={i} className="text-sm text-text-secondary pl-5 py-1.5 relative" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <span className="absolute left-0 text-accent-teal text-xs top-2">▸</span>
                            <strong className="text-text-primary">{item.k}</strong> {item.v}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-text-secondary leading-relaxed">To exercise any of these rights, email <a href="mailto:contentpublisherslimited@gmail.com" className="text-accent-teal">contentpublisherslimited@gmail.com</a>. We will respond within 30 days.</p>
                    </>
                  ),
                },
                {
                  title: '6. Data Retention',
                  sections: [{ p: 'Newsletter subscriber data is retained until you unsubscribe, at which point it is deleted within 30 days. Contact form submissions are retained for 12 months and then deleted. Analytics data is retained in aggregate form indefinitely; individual IP addresses are anonymised within 24 hours. We review our retention practices annually.' }],
                },
                {
                  title: '7. Security',
                  sections: [{ p: 'We take reasonable technical and organisational measures to protect your data: HTTPS everywhere, access controls for staff who can see personal data, regular security reviews of our systems, and data processor agreements with our service providers. No system is completely secure. If we become aware of a data breach that affects your personal information, we will notify you as required by applicable law.' }],
                },
                {
                  title: "8. Children's Privacy",
                  sections: [{ p: 'RoboPulse is not directed at children under 13. We do not knowingly collect data from children. If you believe a child has provided us with their personal information, please contact us at contentpublisherslimited@gmail.com and we will delete it promptly.' }],
                },
                {
                  title: '9. Changes to This Policy',
                  sections: [{ p: 'We may update this Privacy Policy from time to time. Material changes — changes that affect how we use your data in ways you wouldn\'t reasonably expect — will be communicated via a newsletter notice and an updated "Last updated" date at the top of this page. Minor clarifications may be made without notification.' }],
                },
                {
                  title: '10. Contact',
                  sections: [{ p: 'Questions, requests, or complaints about this Privacy Policy or our data practices should be sent to contentpublisherslimited@gmail.com or by post to: WRE Content Publishers Limited, 368, 85 Dunstall Hill, Wolverhampton, WV6 0SR, United Kingdom. If you\'re in the EU and you\'re not satisfied with our response, you have the right to lodge a complaint with your national data protection authority.' }],
                },
              ].map((section) => (
                <div key={section.title}>
                  <h2
                    className="font-heading text-2xl tracking-heading text-text-primary mb-4 mt-10 pt-5"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    {section.title}
                  </h2>
                  {section.body ? section.body : section.sections?.map((s, i) => (
                    <div key={i}>
                      {s.h && <h3 className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-2 mt-5">{s.h}</h3>}
                      <p className="text-sm text-text-secondary leading-relaxed mb-4">{s.p}</p>
                    </div>
                  ))}
                </div>
              ))}

            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  )
}
