import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import type { Project } from "../data/projects";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { Badge } from "./Badge";
import { GithubIcon } from "./icons/BrandIcons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useLockBodyScroll(project !== null);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} aria-hidden />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} details`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border-b-0 bg-bg-elevated sm:rounded-2xl sm:border-b"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-border bg-bg-elevated/95 px-6 py-5 backdrop-blur">
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-accent-blue">{project.category}</p>
                <h3 className="mt-1 text-2xl font-bold text-ink">{project.name}</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close project details"
                className="rounded-md border border-border-strong bg-surface p-2 text-ink-dim hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-8 px-6 py-6">
              <p className="text-ink-dim">{project.description}</p>

              {project.details.map((detail) => (
                <div key={detail.label}>
                  <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-ink-faint">{detail.label}</h4>
                  <ul className="space-y-2">
                    {detail.content.map((line, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-ink-dim">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-blue" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-faint">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 border-t border-border pt-6">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-bg hover:bg-white"
                >
                  <GithubIcon size={16} />
                  View on GitHub
                </a>
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface px-5 py-2.5 text-sm font-medium text-ink hover:bg-surface-hover"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
