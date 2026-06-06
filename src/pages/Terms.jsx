// pages/Terms.jsx
import { motion } from 'framer-motion'
import PageTransition from '../components/common/PageTransition'

export default function Terms() {
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
                Terms of <span className="text-accent-teal">Service</span>
              </h1>
              <p className="text-text-secondary max-w-xl leading-relaxed text-base">
                The rules of using RoboPulse. Plain English, minimal legalese. By using this site, you agree to these terms.
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
                <div><span className="text-text-muted">Jurisdiction: </span>England & Wales</div>
                <div><span className="text-text-muted">Company: </span>WRE Content Publishers Limited</div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-8">
                These Terms of Service ("Terms") govern your use of robopulse.com and any related services operated by WRE Content Publishers Limited, trading as RoboPulse ("RoboPulse," "we," "us"), registered in England and Wales. By using our site, you agree to be bound by these Terms. If you don't agree, please don't use the site.
              </p>

              {/* Section 1 */}
              <h2 className="font-heading text-2xl tracking-heading text-text-primary mb-4 mt-10 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>1. Using RoboPulse</h2>
              <h3 className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-2">Permitted use</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">You may access and use RoboPulse for personal, non-commercial purposes: reading articles, browsing our database, using our price tracker, and subscribing to our newsletter. You may share links to our content freely.</p>
              <h3 className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-2">Prohibited use</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">You may not: scrape or systematically download our content without written permission; republish substantial portions of our content without a licence; use our site in any way that impairs its operation or interferes with other users; attempt to access systems or data you're not authorised to access; or use our content to train AI or machine learning models without written permission.</p>
              <h3 className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-2">Accounts</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">If you create a premium account, you are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. Notify us immediately at <a href="mailto:contentpublisherslimited@gmail.com" className="text-accent-teal">contentpublisherslimited@gmail.com</a> if you suspect unauthorised access.</p>

              {/* Section 2 */}
              <h2 className="font-heading text-2xl tracking-heading text-text-primary mb-4 mt-10 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>2. Our Content</h2>
              <h3 className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-2">Ownership</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">All content on RoboPulse — articles, reviews, database entries, scores, graphics, and design — is owned by RoboPulse Media Ltd. or our content partners and is protected by copyright law. Nothing in these Terms grants you ownership of any of our content.</p>
              <h3 className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-2">Accuracy</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">We work hard to ensure our content is accurate, but we make no warranties about the completeness, reliability, or suitability of any information on this site for any particular purpose. Robot specifications, pricing, and availability change frequently. Always verify critical information independently before making a purchasing, investment, or business decision based on our content.</p>
              <h3 className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-2">Corrections and updates</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">We maintain a corrections policy — errors are corrected with a notice in the affected article. However, historical versions of articles may contain information that has since been superseded. The database is updated on a best-efforts basis; we cannot guarantee it reflects every change the moment it occurs.</p>
              <h3 className="text-xs font-mono text-accent-teal uppercase tracking-wider mb-2">Opinions and editorial</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">Our reviews, scores, comparisons, and opinion pieces represent the editorial judgment of RoboPulse. They are not endorsements, financial advice, purchasing recommendations, or investment advice. Do your own research before making significant decisions.</p>

              {/* Section 3 */}
              <h2 className="font-heading text-2xl tracking-heading text-text-primary mb-4 mt-10 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>3. User Content</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">If you submit any content to RoboPulse — through contact forms, tip lines, or any comments functionality — you grant RoboPulse a non-exclusive, royalty-free licence to use, edit, and publish that content as part of our editorial operation. You represent that you have the right to submit it. We are not required to publish any submitted content.</p>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">Do not submit content that is: unlawful, defamatory, infringing of third-party intellectual property, or material you obtained through unauthorised means.</p>

              {/* Section 4 */}
              <h2 className="font-heading text-2xl tracking-heading text-text-primary mb-4 mt-10 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>4. Links to Third-Party Sites</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">RoboPulse links to third-party websites including manufacturer sites, news sources, and research papers. These links are provided for convenience and information. We don't endorse the content of third-party sites and take no responsibility for their content, privacy practices, or accuracy. Visit external sites at your own risk.</p>

              {/* Section 5 */}
              <h2 className="font-heading text-2xl tracking-heading text-text-primary mb-4 mt-10 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>5. Advertising and Sponsored Content</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">RoboPulse carries advertising and sponsored content, all of which is clearly labeled. The presence of advertising does not imply our endorsement of any advertiser's products or services. Sponsored content reflects the views of the sponsor and is labeled accordingly; it does not represent editorial opinion. See our Advertise page for details of our editorial separation policy.</p>

              {/* Section 6 */}
              <h2 className="font-heading text-2xl tracking-heading text-text-primary mb-4 mt-10 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>6. Disclaimers and Limitation of Liability</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">RoboPulse is provided "as is" without warranty of any kind, express or implied. We don't guarantee uninterrupted access to the site.</p>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">To the maximum extent permitted by law, WRE Content Publishers Limited (trading as RoboPulse) and its employees, contributors, and partners are not liable for any direct, indirect, incidental, or consequential loss arising from: your use of or inability to use the site; any reliance on content published on the site; errors or omissions in our content; or any interruption to our service.</p>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">Nothing in these Terms limits liability for death or personal injury caused by our negligence, fraud, or any liability that cannot be excluded or limited by applicable law.</p>

              {/* Section 7 */}
              <h2 className="font-heading text-2xl tracking-heading text-text-primary mb-4 mt-10 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>7. Indemnification</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">You agree to indemnify and hold harmless WRE Content Publishers Limited (trading as RoboPulse) from any claims, losses, or damages (including legal fees) arising from your violation of these Terms or your misuse of the site.</p>

              {/* Section 8 */}
              <h2 className="font-heading text-2xl tracking-heading text-text-primary mb-4 mt-10 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>8. Governing Law</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">These Terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales, except where applicable consumer protection law in your country gives you additional rights.</p>

              {/* Section 9 */}
              <h2 className="font-heading text-2xl tracking-heading text-text-primary mb-4 mt-10 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>9. Changes to These Terms</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">We may update these Terms from time to time. We'll notify newsletter subscribers of material changes. Continued use of the site after changes are posted constitutes acceptance of the updated Terms. The "Last updated" date at the top of this page tells you when changes were last made.</p>

              {/* Section 10 */}
              <h2 className="font-heading text-2xl tracking-heading text-text-primary mb-4 mt-10 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>10. Contact</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                Questions about these Terms? Email <a href="mailto:contentpublisherslimited@gmail.com" className="text-accent-teal">contentpublisherslimited@gmail.com</a> or write to: WRE Content Publishers Limited, 368, 85 Dunstall Hill, Wolverhampton, WV6 0SR, United Kingdom.
              </p>

            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  )
}
