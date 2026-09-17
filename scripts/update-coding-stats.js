#!/usr/bin/env node
/**
 * Fetches public LeetCode + CodeChef profile stats and writes them to
 * src/data/coding-stats.json.
 *
 * Safe to run repeatedly (e.g. from a daily GitHub Action): if a fetch
 * fails, or a platform returns partial/empty data, the previous value for
 * that specific field is preserved rather than being overwritten with
 * null or zero. Nothing here requires credentials — both sources are
 * fetched anonymously from their public endpoints.
 *
 * `leetcode.maxRating` and `codechef.maxRating` are the user's all-time
 * PEAK contest ratings, not their current ones — the merge step takes
 * max(fresh, previous) for these two fields specifically, so a rating
 * drop on either platform never lowers what the portfolio displays.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../src/data/coding-stats.json");

const LEETCODE_USERNAME = "Adityavikram2711";
const CODECHEF_USERNAME = "hardy_sheep_38";

const FETCH_TIMEOUT_MS = 15000;
const MAX_PRACTICE_AREAS = 9;

function loadPrevious() {
  if (!existsSync(OUTPUT_PATH)) return null;
  try {
    return JSON.parse(readFileSync(OUTPUT_PATH, "utf8"));
  } catch (err) {
    console.error("[coding-stats] Could not parse existing coding-stats.json, starting fresh:", err.message);
    return null;
  }
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------------
// LeetCode — public GraphQL endpoint, no authentication required for a
// user's public profile stats.
// ---------------------------------------------------------------------------

const LEETCODE_QUERY = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum { difficulty count }
      }
      languageProblemCount { languageName problemsSolved }
      badges { displayName }
      tagProblemCounts {
        advanced { tagName problemsSolved }
        intermediate { tagName problemsSolved }
        fundamental { tagName problemsSolved }
      }
    }
    userContestRankingHistory(username: $username) {
      attended
      rating
    }
  }
`;

async function fetchLeetCodeStats(username) {
  const res = await fetchWithTimeout("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: LEETCODE_QUERY, variables: { username } }),
  });

  if (!res.ok) throw new Error(`LeetCode responded with HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`LeetCode GraphQL error: ${json.errors[0]?.message ?? "unknown"}`);
  }

  const user = json.data?.matchedUser;
  if (!user) throw new Error("LeetCode returned no matchedUser (username not found or profile private)");

  const totalSolved = user.submitStats?.acSubmissionNum?.find((d) => d.difficulty === "All")?.count ?? null;

  const languages = (user.languageProblemCount ?? [])
    .filter((l) => l.problemsSolved > 0)
    .sort((a, b) => b.problemsSolved - a.problemsSolved)
    .map((l) => ({ name: l.languageName, count: l.problemsSolved }));

  const badgeNames = (user.badges ?? []).map((b) => b.displayName);
  const badgeCount = Array.isArray(user.badges) ? user.badges.length : null;

  const allTags = [
    ...(user.tagProblemCounts?.fundamental ?? []),
    ...(user.tagProblemCounts?.intermediate ?? []),
    ...(user.tagProblemCounts?.advanced ?? []),
  ];
  const practiceAreas = allTags
    .filter((t) => t.problemsSolved > 0)
    .sort((a, b) => b.problemsSolved - a.problemsSolved)
    .slice(0, MAX_PRACTICE_AREAS)
    .map((t) => t.tagName);

  // The portfolio must show the all-time PEAK contest rating, never the
  // current one — LeetCode's public API has no single field for that, so
  // it's derived as the max across every attended contest in the user's
  // full ranking history.
  const history = json.data?.userContestRankingHistory ?? [];
  const attendedRatings = history
    .filter((h) => h?.attended && typeof h.rating === "number" && !Number.isNaN(h.rating))
    .map((h) => h.rating);
  const maxRating = attendedRatings.length > 0 ? Math.round(Math.max(...attendedRatings)) : null;

  return {
    username: user.username,
    profileUrl: `https://leetcode.com/u/${user.username}/`,
    maxRating,
    problemsSolved: totalSolved,
    languages,
    badges: badgeCount,
    badgeNames,
    practiceAreas,
  };
}

// ---------------------------------------------------------------------------
// CodeChef — no public API, so we parse the fields we need out of the
// public profile page's HTML. Scoped narrowly and wrapped so a markup
// change fails the fetch cleanly instead of producing wrong numbers.
// ---------------------------------------------------------------------------

async function fetchCodeChefStats(username) {
  const res = await fetchWithTimeout(`https://www.codechef.com/users/${username}`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    },
  });

  if (!res.ok) throw new Error(`CodeChef responded with HTTP ${res.status}`);
  const html = await res.text();

  // Scope extraction to the main "CodeChef Rating" block (id="rating-block-all"),
  // not the separate DSA-rating block that immediately follows it in the markup.
  const blockMatch = html.match(/id="rating-block-all"([\s\S]*?)id="rating-block-/);
  const block = blockMatch ? blockMatch[1] : html;

  // CodeChef prints the current rating as "rating-number" and the all-time
  // peak separately as "(Highest Rating N)" — the portfolio only ever uses
  // the latter, never the former.
  const maxRatingMatch = block.match(/Highest Rating (\d+)/);
  const maxRating = maxRatingMatch ? Number(maxRatingMatch[1]) : null;

  const starBlockMatch = block.match(/rating-star">([\s\S]*?)<\/div>/);
  const stars = starBlockMatch ? (starBlockMatch[1].match(/&#9733;/g) ?? []).length : null;

  const solvedMatch = html.match(/Total Problems Solved:\s*(\d+)/);
  const problemsSolved = solvedMatch ? Number(solvedMatch[1]) : null;

  if (maxRating === null && stars === null) {
    throw new Error("Could not locate rating data in CodeChef profile HTML (page structure may have changed)");
  }

  return {
    username,
    profileUrl: `https://www.codechef.com/users/${username}`,
    maxRating,
    stars,
    problemsSolved,
  };
}

// ---------------------------------------------------------------------------
// Merge: a fresh fetch only ever replaces a field when it produced a real,
// non-empty value. A failed fetch, or one that comes back null/zero/empty
// for a field that previously had a real value, leaves that field alone.
// ---------------------------------------------------------------------------

function pickNonEmpty(fresh, previous) {
  if (fresh === null || fresh === undefined) return previous ?? null;
  if (typeof fresh === "number" && fresh === 0 && typeof previous === "number" && previous > 0) return previous;
  if (Array.isArray(fresh) && fresh.length === 0 && Array.isArray(previous) && previous.length > 0) return previous;
  return fresh;
}

// The displayed rating is a personal-best record, not a live value: it may
// only ever go up. Taking max(fresh, previous) — rather than just
// preferring whichever is non-null — means a transient bad parse or an
// incomplete history response can never make the displayed max regress.
function mergeMaxRating(fresh, previous) {
  const candidates = [fresh, previous].filter((v) => typeof v === "number" && !Number.isNaN(v));
  return candidates.length > 0 ? Math.max(...candidates) : null;
}

function mergeLeetCode(fresh, previous) {
  const prev = previous ?? {};
  return {
    username: fresh?.username ?? prev.username ?? LEETCODE_USERNAME,
    profileUrl: fresh?.profileUrl ?? prev.profileUrl ?? `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
    maxRating: mergeMaxRating(fresh?.maxRating, prev.maxRating ?? null),
    problemsSolved: pickNonEmpty(fresh?.problemsSolved, prev.problemsSolved ?? null),
    languages: pickNonEmpty(fresh?.languages, prev.languages) ?? [],
    badges: pickNonEmpty(fresh?.badges, prev.badges ?? null),
    badgeNames: pickNonEmpty(fresh?.badgeNames, prev.badgeNames) ?? [],
    practiceAreas: pickNonEmpty(fresh?.practiceAreas, prev.practiceAreas) ?? [],
  };
}

function mergeCodeChef(fresh, previous) {
  const prev = previous ?? {};
  return {
    username: fresh?.username ?? prev.username ?? CODECHEF_USERNAME,
    profileUrl: fresh?.profileUrl ?? prev.profileUrl ?? `https://www.codechef.com/users/${CODECHEF_USERNAME}`,
    maxRating: mergeMaxRating(fresh?.maxRating, prev.maxRating ?? null),
    stars: pickNonEmpty(fresh?.stars, prev.stars ?? null),
    problemsSolved: pickNonEmpty(fresh?.problemsSolved, prev.problemsSolved ?? null),
  };
}

async function main() {
  const previous = loadPrevious();
  let leetcodeFresh = null;
  let codechefFresh = null;
  let anySuccess = false;

  try {
    leetcodeFresh = await fetchLeetCodeStats(LEETCODE_USERNAME);
    anySuccess = true;
    console.log("[coding-stats] LeetCode fetch succeeded.");
  } catch (err) {
    console.error("[coding-stats] LeetCode fetch FAILED — preserving previous LeetCode values:", err.message);
  }

  try {
    codechefFresh = await fetchCodeChefStats(CODECHEF_USERNAME);
    anySuccess = true;
    console.log("[coding-stats] CodeChef fetch succeeded.");
  } catch (err) {
    console.error("[coding-stats] CodeChef fetch FAILED — preserving previous CodeChef values:", err.message);
  }

  const merged = {
    lastUpdated: anySuccess ? new Date().toISOString() : (previous?.lastUpdated ?? new Date().toISOString()),
    leetcode: mergeLeetCode(leetcodeFresh, previous?.leetcode),
    codechef: mergeCodeChef(codechefFresh, previous?.codechef),
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(merged, null, 2) + "\n", "utf8");
  console.log(`[coding-stats] Wrote ${OUTPUT_PATH}`);

  if (!anySuccess) {
    console.error("[coding-stats] Both fetches failed this run; previous data was preserved as-is.");
  }
}

main().catch((err) => {
  console.error("[coding-stats] Unexpected fatal error:", err);
  process.exit(1);
});
