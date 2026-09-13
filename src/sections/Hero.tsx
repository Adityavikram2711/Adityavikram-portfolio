import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { profile } from "../data/profile";
import { leetcodeUrl } from "../data/problemSolving";
import { GridBackground } from "../components/GridBackground";
import { SystemMap } from "../components/SystemMap";
import { TerminalWidget } from "../components/TerminalWidget";
import { Button } from "../components/Button";
import { scrollToSection } from "../lib/scroll";
import { GithubIcon, LinkedinIcon, LeetCodeMark } from "../components/icons/BrandIcons";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pt-28 pb-16 md:px-8"
    >
      <GridBackground />
      <SystemMap containerRef={heroRef} />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_320px] lg:gap-10">
        <div className="max-w-3xl">
          <motion.p
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mb-4 font-mono text-xs tracking-widest text-accent-blue"
          >
            {profile.eyebrow}
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="font-semibold uppercase leading-[1.02] tracking-[0.04em] text-ink text-[clamp(2.75rem,6vw,5rem)]"
          >
            <span className="block">{profile.firstName}</span>
            <span className="block text-ink-dim">{profile.lastName}</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-4 font-bold leading-[1.15] tracking-tight text-[clamp(2rem,4vw,3.4rem)]"
          >
            <span className="block text-gradient">{profile.headline}</span>
          </motion.p>

          <motion.p
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-5 max-w-xl text-base text-ink-dim sm:text-lg"
          >
            {profile.subheadline}
          </motion.p>

          <motion.div custom={4} initial="hidden" animate="show" variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => scrollToSection("projects")} icon={<ArrowRight size={16} />}>
              View My Work
            </Button>
            <Button
              as="a"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              icon={<FileText size={16} />}
            >
              Résumé
            </Button>
          </motion.div>

          <motion.div
            custom={5}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-8 flex items-center gap-4 text-ink-faint"
          >
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="rounded-md border border-border-strong bg-surface p-2.5 transition-colors hover:text-ink hover:border-accent-blue/50"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode profile"
              className="rounded-md border border-border-strong bg-surface p-2.5 transition-colors hover:text-ink hover:border-accent-blue/50"
            >
              <LeetCodeMark size={18} />
            </a>
            {profile.socials.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="rounded-md border border-border-strong bg-surface p-2.5 transition-colors hover:text-ink hover:border-accent-blue/50"
              >
                <LinkedinIcon size={18} />
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden justify-self-end lg:block"
        >
          <TerminalWidget />
        </motion.div>
      </div>
    </section>
  );
}
