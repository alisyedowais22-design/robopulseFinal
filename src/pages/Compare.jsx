// pages/Compare.jsx
import { motion } from 'framer-motion'
import PageTransition from '../components/common/PageTransition'
import ComparePicker from '../components/compare/ComparePicker'
import CompareScore from '../components/compare/CompareScore'
import CompareTable from '../components/compare/CompareTable'
import CompareVerdict from '../components/compare/CompareVerdict'
import RobotSelectorModal from '../components/compare/RobotSelectorModal'
import { useCompareStore } from '../context/CompareContext'

export default function Compare() {
  const { robotA, robotB } = useCompareStore()
  const hasTwo = robotA && robotB

  return (
    <PageTransition>
      <div className="pt-16">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div
            className="glow-orb w-96 h-96 opacity-10"
            style={{ background: 'radial-gradient(circle, #6C63FF, transparent 70%)', top: '-10%', right: '10%' }}
          />
          <div className="container-wide relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-xs font-mono text-accent-purple uppercase tracking-widest mb-3">Head-to-Head</p>
              <h1 className="font-heading text-6xl md:text-8xl tracking-heading text-text-primary mb-4">
                COMPARE <span className="text-accent-purple">ROBOTS</span>
              </h1>
              <p className="text-text-secondary max-w-xl leading-relaxed">
                Select any two humanoid robots for a full side-by-side breakdown — specs, scores, and our definitive verdict.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container-wide pb-20 space-y-8">
          {/* Robot picker */}
          <ComparePicker />

          {/* Comparison content */}
          {hasTwo ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Score breakdown */}
              <div>
                <h2 className="font-heading text-2xl tracking-heading text-text-primary mb-4">SCORE BREAKDOWN</h2>
                <CompareScore robotA={robotA} robotB={robotB} />
              </div>

              {/* Full spec table */}
              <div>
                <h2 className="font-heading text-2xl tracking-heading text-text-primary mb-4">FULL SPEC COMPARISON</h2>
                <CompareTable robotA={robotA} robotB={robotB} />
              </div>

              {/* Verdict */}
              <div>
                <h2 className="font-heading text-2xl tracking-heading text-text-primary mb-4">VERDICT</h2>
                <CompareVerdict robotA={robotA} robotB={robotB} />
              </div>
            </motion.div>
          ) : (
            <div
              className="text-center py-20 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.08)' }}
            >
              <p className="text-5xl mb-4">⚖️</p>
              <p className="text-text-secondary text-lg mb-2">Select two robots to compare</p>
              <p className="text-text-muted text-sm">Click the slots above to choose your robots</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <RobotSelectorModal />
    </PageTransition>
  )
}
