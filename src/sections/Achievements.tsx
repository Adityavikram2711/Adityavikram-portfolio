import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { problemSolvingStats } from "../data/problemSolving";
import { competitionResults } from "../data/achievements";
import { SectionHeading } from "../components/SectionHeading";

export function Achievements() {
  return (
    <section id="achievements" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="07" label="Achievements" title="Recognition along the way." />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {problemSolvingStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel rounded-2xl p-6"
            >
              <p className="text-gradient font-mono text-4xl font-bold sm:text-5xl">{stat.value}</p>
              <p className="mt-2 font-medium text-ink">{stat.label}</p>
              <p className="mt-1 text-xs text-ink-faint">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {competitionResults.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-strong bg-bg-elevated text-accent-cyan">
                <Trophy size={18} />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent-cyan">{item.result}</p>
                <h3 className="mt-1 font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-xs text-ink-faint">{item.meta}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
