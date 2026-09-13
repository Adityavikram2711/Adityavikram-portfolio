import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, FileText } from "lucide-react";
import { profile } from "../data/profile";
import { leetcodeUrl } from "../data/problemSolving";
import { GridBackground } from "../components/GridBackground";
import { SystemMap } from "../components/SystemMap";
import { TerminalWidget } from "../components/TerminalWidget";
import { Button } from "../components/Button";
import { scrollToSection } from "../lib/scroll";
import { GithubIcon, LinkedinIcon, LeetCodeMark } from "../components/icons/BrandIcons";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pb-20 pt-28 md:px-8"
    >
      <GridBackground />
      <SystemMap containerRef={heroRef} />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_320px] lg:gap-10">
        <div className="max-w-2xl">
          <motion.p
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mb-5 font-mono text-xs tracking-[0.14em] text-accent-blue"
          >
            {profile.eyebrow}
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-3xl font-semibold leading-tight tracking-tight text-ink-secondary sm:text-4xl md:text-5xl"
          >
            Hi, I'm <span className="text-gradient font-bold">{profile.name}</span>.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-5 text-lg font-medium leading-snug text-ink sm:text-xl"
          >
            {profile.headline}
          </motion.p>

          <motion.p
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-4 max-w-xl text-base leading-relaxed text-ink-secondary"
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
            className="mt-7 flex items-center gap-4 text-ink-dim"
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

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        onClick={() => scrollToSection("about")}
        aria-label="Scroll to About section"
        className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit flex-col items-center gap-2 text-ink-faint transition-colors hover:text-ink-dim"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.14em]">Scroll to explore</span>
        <ChevronDown size={16} />
      </motion.button>
    </section>
  );
}
