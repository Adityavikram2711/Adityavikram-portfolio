import { useState, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, MapPin, Send } from "lucide-react";
import { profile } from "../data/profile";
import { leetcodeUrl } from "../data/problemSolving";
import { SectionHeading } from "../components/SectionHeading";
import { GridBackground } from "../components/GridBackground";
import { Button } from "../components/Button";
import { GithubIcon, LinkedinIcon, LeetCodeMark } from "../components/icons/BrandIcons";

const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    handle: "Adityavikram2711",
    href: profile.socials.github,
    icon: GithubIcon,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: null,
    href: profile.socials.linkedin,
    icon: LinkedinIcon,
  },
  {
    id: "leetcode",
    label: "LeetCode",
    handle: "Adityavikram2711",
    href: leetcodeUrl,
    icon: LeetCodeMark,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative px-5 py-24 md:px-8 md:py-32">
      <GridBackground />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          index="08"
          label="Contact"
          title="Have an opportunity, project, or interesting problem? Let's talk."
          description="I'm always open to discussing software engineering opportunities, interesting projects, technical problems, and collaborations."
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2"
          >
            <div className="glass-panel rounded-2xl p-6 md:p-8">
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Email</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-2 block break-all text-lg font-medium text-ink hover:text-accent-blue"
                  >
                    {profile.email}
                  </a>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Based in</p>
                  <p className="mt-2 flex items-center gap-2 text-lg font-medium text-ink">
                    <MapPin size={18} className="shrink-0 text-accent-blue" />
                    {profile.location}
                  </p>
                </div>

                <div className="border-t border-border pt-6">
                  <CopyEmailButton email={profile.email} />
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-surface p-6 md:p-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ink-faint">Find me on</p>
              <ul className="space-y-1">
                {socialLinks
                  .filter((link) => link.href)
                  .map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.id}>
                        <a
                          href={link.href!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between rounded-lg px-2 py-3 transition-colors hover:bg-surface-hover"
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong bg-bg-elevated text-ink-dim">
                              <Icon size={16} />
                            </span>
                            <span>
                              <span className="block text-sm font-medium text-ink">{link.label}</span>
                              {link.handle && (
                                <span className="block font-mono text-xs text-ink-faint">{link.handle}</span>
                              )}
                            </span>
                          </span>
                          <ArrowUpRight
                            size={16}
                            className="text-ink-faint transition-colors group-hover:text-accent-blue"
                          />
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access unavailable (permissions, insecure context, etc.) — fail quietly.
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-bg-elevated px-4 py-2 text-sm font-medium text-ink-dim transition-colors hover:text-ink hover:bg-surface-hover"
    >
      {copied ? <Check size={14} className="text-accent-cyan" /> : <Copy size={14} />}
      {copied ? "Copied!" : "Copy email"}
    </button>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const mailSubject = subject.trim() || `Portfolio contact from ${name.trim() || "website visitor"}`;
    const bodyLines: string[] = [];
    if (name.trim()) bodyLines.push(`Name: ${name.trim()}`);
    if (email.trim()) bodyLines.push(`Email: ${email.trim()}`);
    bodyLines.push("", message.trim());

    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(
      bodyLines.join("\n")
    )}`;

    window.location.href = mailtoUrl;
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 md:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name">
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-border-strong bg-bg-elevated px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent-blue/60 focus:outline-none"
          />
        </Field>

        <Field label="Email" htmlFor="contact-email">
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-border-strong bg-bg-elevated px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent-blue/60 focus:outline-none"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Subject — optional" htmlFor="contact-subject">
          <input
            id="contact-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Internship opportunity, collaboration, question..."
            className="w-full rounded-lg border border-border-strong bg-bg-elevated px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent-blue/60 focus:outline-none"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" htmlFor="contact-message">
          <textarea
            id="contact-message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me what you are building, or what you would like to talk about."
            className="w-full resize-none rounded-lg border border-border-strong bg-bg-elevated px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent-blue/60 focus:outline-none"
          />
        </Field>
      </div>

      <p className="mt-4 text-xs text-ink-faint">
        Opens your email client with this message pre-filled — nothing is sent from here directly.
      </p>

      <Button type="submit" icon={<Send size={16} />} className="mt-3 w-full sm:w-auto">
        Send message
      </Button>
    </form>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block font-mono text-xs uppercase tracking-widest text-ink-faint">
        {label}
      </label>
      {children}
    </div>
  );
}
