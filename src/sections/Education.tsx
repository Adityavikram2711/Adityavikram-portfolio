import { motion } from "framer-motion";
import { BadgeCheck, GraduationCap } from "lucide-react";
import { education, certifications } from "../data/profile";
import { SectionHeading } from "../components/SectionHeading";
import { Badge } from "../components/Badge";

export function Education() {
  return (
    <section id="education" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="06" label="Education" title="Academic background." />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-surface text-accent-blue">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-ink">{education.institution}</h3>
                <p className="mt-1 text-sm text-ink-dim">{education.degree}</p>
                <p className="mt-1 font-mono text-xs text-ink-faint">
                  {education.duration} · {education.location}
                </p>
                <p className="mt-3 font-mono text-sm text-accent-cyan">CGPA: {education.cgpa}</p>
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-faint">Relevant coursework</p>
              <div className="flex flex-wrap gap-2">
                {education.coursework.map((course) => (
                  <Badge key={course}>{course}</Badge>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-border bg-surface p-6 md:p-8"
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ink-faint">Certifications</p>
            <ul className="space-y-4">
              {certifications.map((cert) => (
                <li key={cert.title} className="flex gap-3">
                  <BadgeCheck size={18} className="mt-0.5 shrink-0 text-accent-blue" />
                  <div>
                    <p className="text-sm font-medium text-ink">{cert.title}</p>
                    <p className="text-xs text-ink-faint">{cert.issuer}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
