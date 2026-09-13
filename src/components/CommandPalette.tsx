import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FileText, Mail, Search, TerminalSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeMark } from "./icons/BrandIcons";
import { navItems } from "../data/navigation";
import { scrollToSection } from "../lib/scroll";
import { profile } from "../data/profile";
import { leetcodeUrl } from "../data/problemSolving";
import { projects } from "../data/projects";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";

const EASTER_EGGS: Record<string, string> = {
  whoami: profile.name,
  focus: "Software Engineering · DSA · Systems",
  status: "Building. Learning. Solving.",
};

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

interface Command {
  id: string;
  label: string;
  hint: string;
  action: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  useLockBodyScroll(open);

  const commands: Command[] = useMemo(
    () => [
      {
        id: "nav-home",
        label: "Go to Home",
        hint: "Section",
        action: () => scrollToSection("home"),
      },
      ...navItems.map((item) => ({
        id: `nav-${item.id}`,
        label: `Go to ${item.label}`,
        hint: "Section",
        action: () => scrollToSection(item.id),
      })),
      ...projects.map((project) => ({
        id: `project-${project.id}`,
        label: `Open ${project.name}`,
        hint: "Project",
        action: () => window.open(project.github, "_blank", "noopener,noreferrer"),
      })),
      {
        id: "github",
        label: "View GitHub",
        hint: "External",
        action: () => window.open(profile.socials.github, "_blank", "noopener,noreferrer"),
      },
      ...(profile.socials.linkedin
        ? [
            {
              id: "linkedin",
              label: "View LinkedIn",
              hint: "External",
              action: () => window.open(profile.socials.linkedin!, "_blank", "noopener,noreferrer"),
            },
          ]
        : []),
      {
        id: "leetcode",
        label: "View LeetCode",
        hint: "External",
        action: () => window.open(leetcodeUrl, "_blank", "noopener,noreferrer"),
      },
      {
        id: "resume",
        label: "Open Résumé",
        hint: "External",
        action: () => window.open("/resume.pdf", "_blank", "noopener,noreferrer"),
      },
      {
        id: "email",
        label: `Email ${profile.email}`,
        hint: "Contact",
        action: () => window.open(`mailto:${profile.email}`, "_self"),
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return commands;

    if (trimmed in EASTER_EGGS) {
      return [
        {
          id: `easter-${trimmed}`,
          label: EASTER_EGGS[trimmed],
          hint: "$ " + trimmed,
          action: () => {},
        },
      ];
    }

    return commands.filter((c) => c.label.toLowerCase().includes(trimmed));
  }, [commands, query]);

  // Reset the highlighted row whenever the query changes or the palette (re)opens.
  const [resetKey, setResetKey] = useState({ query, open });
  if (resetKey.query !== query || resetKey.open !== open) {
    setResetKey({ query, open });
    if (activeIndex !== 0) setActiveIndex(0);
  }

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[activeIndex];
        if (cmd) {
          cmd.action();
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, filtered, activeIndex, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel relative w-full max-w-lg overflow-hidden rounded-xl shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search size={16} className="text-ink-faint" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
              />
              <kbd className="rounded border border-border-strong px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">
                ESC
              </kbd>
            </div>

            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-ink-faint">No results</li>
              )}
              {filtered.map((cmd, i) => (
                <li key={cmd.id}>
                  <button
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => {
                      cmd.action();
                      onClose();
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      activeIndex === i ? "bg-surface-hover text-ink" : "text-ink-dim"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {cmd.id === "github" && <GithubIcon size={14} />}
                      {cmd.id === "linkedin" && <LinkedinIcon size={14} />}
                      {cmd.id === "leetcode" && <LeetCodeMark size={14} />}
                      {cmd.id === "email" && <Mail size={14} />}
                      {cmd.id === "resume" && <FileText size={14} />}
                      {cmd.id.startsWith("project-") && <ArrowRight size={14} />}
                      {cmd.id.startsWith("easter-") && <TerminalSquare size={14} className="text-accent-cyan" />}
                      {cmd.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-ink-faint">{cmd.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
