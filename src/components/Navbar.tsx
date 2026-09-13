import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import { navItems } from "../data/navigation";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToSection } from "../lib/scroll";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";

interface NavbarProps {
  onOpenPalette: () => void;
}

export function Navbar({ onOpenPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection(navItems.map((item) => item.id));
  useLockBodyScroll(mobileOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  const isMac = typeof navigator !== "undefined" && /Mac|iPhone/.test(navigator.platform ?? navigator.userAgent);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-lg bg-bg/80 border-b border-border" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8" aria-label="Primary">
        <button
          onClick={() => handleNavClick("home")}
          className="font-mono text-sm font-semibold tracking-tight text-ink"
        >
          AM<span className="text-accent-blue">.</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`relative rounded-md px-3 py-2 font-mono text-xs uppercase tracking-wide transition-colors ${
                  activeId === item.id ? "text-ink" : "text-ink-faint hover:text-ink-dim"
                }`}
                aria-current={activeId === item.id ? "true" : undefined}
              >
                {item.label}
                {activeId === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-0.5 h-px bg-accent-blue"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            className="hidden items-center gap-2 rounded-md border border-border-strong bg-surface px-3 py-1.5 font-mono text-xs text-ink-faint transition-colors hover:text-ink-dim md:flex"
            aria-label="Open command palette"
          >
            <Command size={12} />
            <span>{isMac ? "⌘K" : "Ctrl K"}</span>
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-md border border-border-strong bg-surface p-2 text-ink-dim lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border bg-bg/95 backdrop-blur-lg lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-3 font-mono text-sm uppercase tracking-wide ${
                      activeId === item.id ? "text-ink bg-surface" : "text-ink-faint"
                    }`}
                  >
                    <span className="text-accent-blue text-xs">{item.index}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
