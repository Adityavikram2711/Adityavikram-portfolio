import { useState } from "react";
import { featuredProject, secondaryProjects, type Project } from "../data/projects";
import { SectionHeading } from "../components/SectionHeading";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";

export function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          label="Selected Work"
          title="Three projects, built end to end."
          description="Each one represents a different area of technical interest — full-stack algorithms, embedded systems and networking, and blockchain — and I can speak to every layer of it, not just the UI."
        />

        <ProjectCard project={featuredProject} featured onOpen={setOpenProject} />

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {secondaryProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setOpenProject} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com/Adityavikram2711"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-ink-faint underline decoration-border-strong underline-offset-4 hover:text-accent-blue"
          >
            More on GitHub →
          </a>
        </div>
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
