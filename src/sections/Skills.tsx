import { useState } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "../data/skills";
import { SectionHeading } from "../components/SectionHeading";

export function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const active = skillCategories.find((c) => c.id === activeId)!;

  return (
    <section id="skills" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          label="Capabilities"
          title="What I work with."
          description="Grouped by the kind of problem it solves for me, not a made-up proficiency score."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr] md:gap-8">
          <div className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveId(category.id)}
                className={`flex shrink-0 items-center gap-2.5 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors md:shrink ${
                  activeId === category.id
                    ? "border-accent-blue/50 bg-surface text-ink"
                    : "border-border bg-transparent text-ink-faint hover:text-ink-dim hover:bg-surface"
                }`}
              >
                <span className="font-mono text-xs text-accent-blue">{category.index}</span>
                {category.label}
              </button>
            ))}
          </div>

          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel rounded-2xl p-6 md:p-8"
          >
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-ink-faint">{active.description}</p>
            <div className="flex flex-wrap gap-3">
              {active.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="rounded-lg border border-border-strong bg-bg-elevated px-4 py-2.5 text-sm text-ink"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
