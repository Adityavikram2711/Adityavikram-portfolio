export interface SkillCategory {
  id: string;
  index: string;
  label: string;
  description: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    index: "01",
    label: "Programming",
    description: "Core languages I write and think in",
    items: ["C", "C++", "Python", "Java", "JavaScript", "R", "SQL"],
  },
  {
    id: "fullstack",
    index: "02",
    label: "Full-Stack Development",
    description: "Building interfaces and the services behind them",
    items: ["React", "Node.js", "Express.js", "HTML", "CSS"],
  },
  {
    id: "backend",
    index: "03",
    label: "Backend & APIs",
    description: "Server-side logic and the APIs that expose it",
    items: ["Node.js", "Express.js", "REST APIs", "Flask"],
  },
  {
    id: "databases",
    index: "04",
    label: "Databases",
    description: "Storing and querying application data",
    items: ["MongoDB", "MySQL"],
  },
  {
    id: "infra",
    index: "05",
    label: "Infrastructure & Tooling",
    description: "Version control, containers, and day-to-day workflow",
    items: ["Git", "GitHub", "Docker", "Kubernetes", "Postman", "VS Code"],
  },
  {
    id: "cs",
    index: "06",
    label: "Computer Science",
    description: "Fundamentals I keep coming back to",
    items: ["Data Structures & Algorithms", "Operating Systems", "DBMS", "Computer Networks", "AI / ML"],
  },
];
