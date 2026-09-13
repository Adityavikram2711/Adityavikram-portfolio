import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { leetcodeBreakdown, leetcodeUrl, practiceAreas, problemSolvingStats } from "../data/problemSolving";
import { SectionHeading } from "../components/SectionHeading";
import { Badge } from "../components/Badge";

export function ProblemSolving() {
  return (
    <section id="problem-solving" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          label="Problem Solving"
          title="Beyond projects."
          description="Consistent algorithmic practice, not just project work — verified on LeetCode and CodeChef."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {problemSolvingStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel rounded-2xl p-6 text-center sm:text-left"
            >
              <p className="text-gradient font-mono text-4xl font-bold sm:text-5xl">{stat.value}</p>
              <p className="mt-2 font-medium text-ink">{stat.label}</p>
              <p className="mt-1 text-xs text-ink-faint">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-faint">LeetCode breakdown</h3>
            <dl className="mt-4 space-y-3">
              {leetcodeBreakdown.map((item) => (
                <div key={item.label} className="flex items-center justify-between border-b border-border pb-2 last:border-none last:pb-0">
                  <dt className="text-sm text-ink-dim">{item.label}</dt>
                  <dd className="font-mono text-sm text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href={leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-border-strong bg-bg-elevated px-4 py-2 text-sm font-medium text-ink hover:bg-surface-hover"
            >
              View LeetCode Profile
              <ArrowUpRight size={14} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-faint">Areas I practice</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {practiceAreas.map((area) => (
                <Badge key={area}>{area}</Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
