import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Line {
  command: string;
  output: string[];
}

const SCRIPT: Line[] = [
  { command: "whoami", output: ["Adityavikram Mistry"] },
  { command: "focus", output: ["Software Engineering · DSA · Systems · Full-Stack"] },
  { command: "status", output: ["Building. Learning. Solving."] },
];

const TYPE_SPEED = 45;
const LINE_PAUSE = 900;

type Phase = "typing" | "output" | "pause";

export function TerminalWidget() {
  const [resolvedLines, setResolvedLines] = useState<Line[]>([]);
  const [typedCommand, setTypedCommand] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Typing out the current command, character by character.
  useEffect(() => {
    if (reducedMotion || phase !== "typing" || lineIndex >= SCRIPT.length) return;

    const current = SCRIPT[lineIndex];
    if (typedCommand.length < current.command.length) {
      const t = setTimeout(() => {
        setTypedCommand(current.command.slice(0, typedCommand.length + 1));
      }, TYPE_SPEED);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setPhase("output"), 250);
    return () => clearTimeout(t);
  }, [phase, typedCommand, lineIndex, reducedMotion]);

  // Committing the finished line to output, exactly once per line. This drives
  // a timed animation sequence (not derived state), so setState-in-effect is intentional here.
  useEffect(() => {
    if (reducedMotion || phase !== "output" || lineIndex >= SCRIPT.length) return;

    setResolvedLines((prev) => [...prev, SCRIPT[lineIndex]]);
    setTypedCommand("");
    const t = setTimeout(() => setPhase("pause"), LINE_PAUSE);
    return () => clearTimeout(t);
  }, [phase, lineIndex, reducedMotion]);

  // Advancing to the next line after the pause.
  useEffect(() => {
    if (reducedMotion || phase !== "pause") return;

    const next = lineIndex + 1;
    if (next < SCRIPT.length) {
      const t = setTimeout(() => {
        setLineIndex(next);
        setPhase("typing");
      }, 0);
      return () => clearTimeout(t);
    }
  }, [phase, lineIndex, reducedMotion]);

  if (reducedMotion) {
    return <StaticTerminal lines={SCRIPT} />;
  }

  const isDone = lineIndex >= SCRIPT.length - 1 && phase === "pause";
  const showTypingCursor = lineIndex < SCRIPT.length && phase === "typing";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel w-full max-w-md overflow-hidden rounded-xl"
    >
      <TerminalChrome />

      <div className="min-h-[168px] px-4 py-4 font-mono text-[13px] leading-relaxed">
        {resolvedLines.map((line, i) => (
          <TerminalLine key={i} line={line} />
        ))}

        {showTypingCursor && (
          <p>
            <span className="text-accent-cyan">$</span> <span className="text-ink">{typedCommand}</span>
            <Cursor />
          </p>
        )}

        {isDone && (
          <p>
            <span className="text-accent-cyan">$</span> <Cursor />
          </p>
        )}
      </div>
    </motion.div>
  );
}

function StaticTerminal({ lines }: { lines: Line[] }) {
  return (
    <div className="glass-panel w-full max-w-md overflow-hidden rounded-xl">
      <TerminalChrome />
      <div className="min-h-[168px] px-4 py-4 font-mono text-[13px] leading-relaxed">
        {lines.map((line, i) => (
          <TerminalLine key={i} line={line} />
        ))}
      </div>
    </div>
  );
}

function TerminalChrome() {
  return (
    <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-3 font-mono text-[11px] text-ink-faint">guest@portfolio ~ </span>
    </div>
  );
}

function TerminalLine({ line }: { line: Line }) {
  return (
    <div className="mb-2">
      <p>
        <span className="text-accent-cyan">$</span> <span className="text-ink">{line.command}</span>
      </p>
      {line.output.map((out, j) => (
        <p key={j} className="text-ink-dim">
          {out}
        </p>
      ))}
    </div>
  );
}

function Cursor() {
  return <span className="ml-0.5 inline-block h-[14px] w-[7px] translate-y-[2px] animate-blink bg-accent-blue" />;
}
