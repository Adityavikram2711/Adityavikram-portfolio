export interface SkillCategory {
  id: string;
  index: string;
  label: string;
  description: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    index: "01",
    label: "Languages",
    description: "Core languages I write and think in",
    items: ["C++", "C", "Python", "Java", "JavaScript", "SQL"],
  },
  {
    id: "frontend",
    index: "02",
    label: "Frontend",
    description: "Building interfaces people actually use",
    items: ["React", "HTML", "CSS", "Tailwind"],
  },
  {
    id: "backend",
    index: "03",
    label: "Backend",
    description: "Server-side logic and the APIs that expose it",
    items: ["Node.js", "Express", "Flask", "REST APIs"],
  },
  {
    id: "databases",
    index: "04",
    label: "Databases",
    description: "Storing and querying application data",
    items: ["MongoDB", "MySQL"],
  },
  {
    id: "systems-devops",
    index: "05",
    label: "Systems & DevOps",
    description: "Version control, containers, and networked systems",
    items: ["Docker", "Kubernetes", "Git", "Networking"],
  },
  {
    id: "cs-fundamentals",
    index: "06",
    label: "CS Fundamentals",
    description: "Fundamentals I keep coming back to",
    items: ["DSA", "DBMS", "OS", "Computer Networks", "OOP"],
  },
];
