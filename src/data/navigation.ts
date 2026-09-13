export interface NavItem {
  id: string;
  label: string;
  index: string;
}

export const navItems: NavItem[] = [
  { id: "about", label: "About", index: "01" },
  { id: "skills", label: "Skills", index: "02" },
  { id: "projects", label: "Work", index: "03" },
  { id: "problem-solving", label: "Problem Solving", index: "04" },
  { id: "experience", label: "Leadership", index: "05" },
  { id: "education", label: "Education", index: "06" },
  { id: "achievements", label: "Achievements", index: "07" },
  { id: "contact", label: "Contact", index: "08" },
];
