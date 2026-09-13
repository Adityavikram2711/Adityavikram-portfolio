export interface ExperienceItem {
  organization: string;
  role: string;
  duration?: string;
  points: string[];
}

export const experience: ExperienceItem[] = [
  {
    organization: "ACE Coding Club, M. S. Ramaiah Institute of Technology",
    role: "Vice President",
    points: [
      "Led the organization of coding competitions, workshops, and hackathons for 100+ participants",
      "Coordinated between club members and faculty to plan and run technical events",
      "Conducted peer-learning sessions on data structures and algorithms for club members",
    ],
  },
];
