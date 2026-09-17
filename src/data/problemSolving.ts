import codingStats from "./coding-stats.json";

interface LanguageStat {
  name: string;
  count: number;
}

interface CodingStats {
  lastUpdated: string;
  leetcode: {
    username: string;
    profileUrl: string;
    // All-time peak contest rating — never the current one. See
    // scripts/update-coding-stats.js for how this is computed and why it
    // can only ever increase.
    maxRating: number | null;
    problemsSolved: number | null;
    languages: LanguageStat[];
    badges: number | null;
    badgeNames: string[];
    practiceAreas: string[];
  };
  codechef: {
    username: string;
    profileUrl: string;
    // All-time peak rating — CodeChef's own "(Highest Rating N)" figure,
    // never the current one.
    maxRating: number | null;
    stars: number | null;
    problemsSolved: number | null;
  };
}

// coding-stats.json is regenerated on a schedule by scripts/update-coding-stats.js
// (see .github/workflows/update-coding-stats.yml) — never hand-edit the numbers here.
const stats = codingStats as CodingStats;

export const leetcodeUrl = stats.leetcode.profileUrl;
export const codechefUrl = stats.codechef.profileUrl;
export const statsLastUpdated = stats.lastUpdated;

function floorPlus(n: number, step = 50): string {
  const floored = Math.floor(n / step) * step;
  return floored > 0 ? `${floored}+` : String(n);
}

export interface StatTile {
  value: string;
  label: string;
  sublabel: string;
}

// Only ever includes a tile when the underlying number was actually
// retrieved — a platform that failed to fetch (and has no prior data)
// simply doesn't get a card, rather than showing a placeholder or zero.
export const problemSolvingStats: StatTile[] = [];

const combinedSolved = (stats.leetcode.problemsSolved ?? 0) + (stats.codechef.problemsSolved ?? 0);
if (combinedSolved > 0) {
  problemSolvingStats.push({
    value: combinedSolved >= 50 ? floorPlus(combinedSolved) : String(combinedSolved),
    label: "DSA Problems",
    sublabel: "Solved across platforms",
  });
}

if (stats.leetcode.maxRating !== null) {
  problemSolvingStats.push({
    value: String(stats.leetcode.maxRating),
    label: "LeetCode Max Rating",
    sublabel: leetcodeUrl.replace(/^https?:\/\//, "").replace(/\/$/, ""),
  });
}

if (stats.codechef.stars !== null) {
  problemSolvingStats.push({
    value: `${stats.codechef.stars}★`,
    label: "CodeChef",
    sublabel: stats.codechef.maxRating !== null ? `Max rating ${stats.codechef.maxRating}` : "",
  });
}

export interface BreakdownItem {
  label: string;
  value: string;
}

// Top 3 languages by problems solved keeps this panel the same size it's
// always been rather than growing every time a new language shows up.
export const leetcodeBreakdown: BreakdownItem[] = stats.leetcode.languages
  .slice(0, 3)
  .map((l) => ({ label: l.name, value: `${l.count} problems` }));

if (stats.leetcode.badges !== null) {
  const knight = stats.leetcode.badgeNames.find((b) => /knight/i.test(b));
  leetcodeBreakdown.push({
    label: "Badges",
    value: knight ? `${stats.leetcode.badges} (incl. ${knight})` : String(stats.leetcode.badges),
  });
}

export const practiceAreas: string[] = stats.leetcode.practiceAreas;
