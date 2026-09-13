import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "../data/projects";
import { Badge } from "./Badge";
import { GithubIcon } from "./icons/BrandIcons";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, featured = false, onOpen }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-strong ${
        featured ? "p-6 md:p-8" : "p-6"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--x, 50%) var(--y, 0%), rgba(79,124,255,0.08), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-accent-blue">
          <span>{project.category}</span>
        </div>
        <span className="font-mono text-xs text-ink-faint">{project.year}</span>
      </div>

      <h3 className={`font-bold text-ink ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>{project.name}</h3>
      <p className={`mt-3 text-ink-secondary ${featured ? "text-base" : "text-sm"}`}>{project.tagline}</p>

      <ul className="mt-5 space-y-2">
        {project.highlights.slice(0, featured ? 4 : 2).map((h, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-ink-secondary">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
            <span className={featured ? "" : "line-clamp-2"}>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.slice(0, featured ? 8 : 5).map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
        {!featured && project.tech.length > 5 && (
          <Badge>+{project.tech.length - 5}</Badge>
        )}
      </div>

      <div className="mt-auto flex items-center gap-3 pt-6">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-bg-elevated px-3.5 py-2 text-xs font-medium text-ink-dim hover:text-ink"
        >
          <GithubIcon size={14} />
          GitHub
        </a>
        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-bg-elevated px-3.5 py-2 text-xs font-medium text-ink-dim hover:text-ink"
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        )}
        <button
          onClick={() => onOpen(project)}
          className="ml-auto inline-flex items-center gap-1 rounded-md px-3.5 py-2 text-xs font-medium text-accent-blue hover:underline"
        >
          Technical deep dive
          <ArrowUpRight size={14} />
        </button>
      </div>
    </motion.article>
  );
}
