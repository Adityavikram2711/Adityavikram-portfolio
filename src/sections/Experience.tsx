import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { experience } from "../data/experience";
import { SectionHeading } from "../components/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="05" label="Leadership" title="Leadership & Involvement." />

        <div className="space-y-6">
          {experience.map((item, i) => (
            <motion.div
              key={item.organization}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel flex flex-col gap-6 rounded-2xl p-6 md:flex-row md:p-8"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-surface text-accent-blue">
                <Users size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-ink">{item.role}</h3>
                <p className="mt-1 text-sm text-ink-dim">{item.organization}</p>
                <ul className="mt-4 space-y-2">
                  {item.points.map((point, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-ink-dim">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
