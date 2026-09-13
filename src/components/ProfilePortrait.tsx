import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile, education } from "../data/profile";

export function ProfilePortrait() {
  const [errored, setErrored] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[420px] md:mx-0 md:w-fit">
      <div className="relative w-full overflow-hidden rounded-2xl border border-border-strong bg-surface md:w-fit">
        {!errored ? (
          <img
            src="/images/profile.png"
            alt="Portrait of Adityavikram Mistry"
            className="block h-auto w-full md:w-auto md:max-w-full md:max-h-[560px]"
            onError={() => setErrored(true)}
          />
        ) : (
          <div
            className="flex aspect-[4/5] w-full items-center justify-center font-mono text-6xl font-semibold text-ink-dim md:h-[560px] md:w-[284px]"
            style={{ background: "linear-gradient(160deg, #12151d, #0b0d12)" }}
          >
            AM
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4"
          style={{ background: "linear-gradient(to top, rgba(6,7,10,0.92) 0%, rgba(6,7,10,0.45) 55%, transparent 100%)" }}
          aria-hidden
        />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-lg font-semibold text-ink">{profile.name}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-ink-dim">{profile.location}</p>
        </div>
      </div>

      <div className="mt-5 space-y-4 border-t border-border pt-5">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Focus</p>
          <p className="mt-1 text-sm text-ink-secondary">Software Engineering · DSA · Full-Stack · Systems · Networking · AI/ML</p>
        </div>
        <div className="border-t border-border pt-4">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Degree</p>
          <p className="mt-1 text-sm text-ink-secondary">{education.degree}</p>
        </div>
        <div className="border-t border-border pt-4">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Duration</p>
          <p className="mt-1 text-sm text-ink-secondary">{education.duration}</p>
        </div>
      </div>

      {profile.socials.linkedin && (
        <div className="mt-5 border-t border-border pt-5">
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-ink-dim transition-colors hover:text-accent-blue"
          >
            <ArrowUpRight size={14} />
            Connect on LinkedIn
          </a>
        </div>
      )}
    </div>
  );
}
