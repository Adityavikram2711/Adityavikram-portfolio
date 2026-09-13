export interface CompetitionResult {
  result: "Winner" | "Finalist";
  title: string;
  meta: string;
}

export const competitionResults: CompetitionResult[] = [
  { result: "Winner", title: "CodeGolf 2.0", meta: "ACM-RIT, Bengaluru" },
  { result: "Winner", title: "Bug Bash", meta: "IEEE-RIT, Bengaluru" },
  { result: "Finalist", title: "CodeCrafters", meta: "National-level · Top 17 of 170+ teams" },
];
