import { motion } from "framer-motion";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ index, label, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center mx-auto" : ""}`}
    >
      <div className={`flex items-center gap-3 mb-4 font-mono text-xs tracking-widest ${align === "center" ? "justify-center" : ""}`}>
        <span className="text-accent-blue">{index}</span>
        <span className="h-px w-8 bg-border-strong" />
        <span className="text-ink-faint uppercase">{label}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink">{title}</h2>
      {description && (
        <p className={`mt-4 max-w-2xl text-base md:text-lg text-ink-dim ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
