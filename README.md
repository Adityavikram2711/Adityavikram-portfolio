# Adityavikram Mistry — Portfolio

Personal developer portfolio built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Adding your profile photo

Drop a square headshot at `public/images/profile.png`. Until then, the site falls back to a clean "AM" placeholder automatically — nothing needs to be changed in code.

## Adding your résumé

Drop your résumé PDF at `public/resume.pdf`. The Hero section's "Résumé" button already links to `/resume.pdf` and opens it in a new tab — until the file exists, that link will 404.

## Project structure

```
src/
  components/   Reusable UI (Navbar, Buttons, ProjectCard, CommandPalette, ...)
  sections/     One file per page section (Hero, About, Skills, Projects, ...)
  data/         All content — edit these files to update copy, projects, skills, etc.
  hooks/        Small shared hooks (active-section tracking, scroll lock)
  lib/          Small utilities (smooth scroll helper)
```

To update content (bio, projects, skills, achievements, links), edit the files in `src/data/` — the components read from there.

## Build

```bash
npm run build   # type-checks and outputs to dist/
npm run preview # serve the production build locally
```
