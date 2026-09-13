import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { SectionHeading } from "../components/SectionHeading";
import { ProfilePortrait } from "../components/ProfilePortrait";

export function About() {
  return (
    <section id="about" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" label="About" title="Engineering underneath the interface." />

        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1.7fr_1fr] md:gap-14 lg:gap-16">
          <div className="space-y-5">
            {profile.about.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-base leading-relaxed text-ink-dim md:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProfilePortrait />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
