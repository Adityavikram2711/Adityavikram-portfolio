import { ArrowUp, Mail } from "lucide-react";
import { profile } from "../data/profile";
import { leetcodeUrl } from "../data/problemSolving";
import { scrollToSection } from "../lib/scroll";
import { GithubIcon, LinkedinIcon, LeetCodeMark } from "./icons/BrandIcons";

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-mono text-sm font-semibold text-ink">{profile.name}</p>
          <p className="mt-1 text-sm text-ink-faint">Building, learning, and solving.</p>
        </div>

        <div className="flex items-center gap-4">
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-ink-faint hover:text-ink">
            <GithubIcon size={18} />
          </a>
          <a href={leetcodeUrl} target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="text-ink-faint hover:text-ink">
            <LeetCodeMark size={18} />
          </a>
          {profile.socials.linkedin && (
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-ink-faint hover:text-ink">
              <LinkedinIcon size={18} />
            </a>
          )}
          <a href={`mailto:${profile.email}`} aria-label="Email" className="text-ink-faint hover:text-ink">
            <Mail size={18} />
          </a>
        </div>

        <div className="flex flex-col items-center gap-2 sm:items-end">
          <button
            onClick={() => scrollToSection("home")}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-faint transition-colors hover:text-ink-dim"
          >
            <ArrowUp size={12} />
            Back to top
          </button>
          <p className="font-mono text-xs text-ink-faint">© 2026 {profile.name}</p>
        </div>
      </div>
    </footer>
  );
}
