/**
 * Tiny fuzzy matcher for the command palette.
 * Scores a candidate by how tightly the query characters appear in order;
 * returns `null` when the query is not a subsequence of the candidate.
 */
export function fuzzyScore(query: string, candidate: string): number | null {
  const q = normalise(query);
  const c = normalise(candidate);
  if (q.length === 0) return 0;

  let score = 0;
  let ci = 0;
  let streak = 0;
  for (const ch of q) {
    const found = c.indexOf(ch, ci);
    if (found === -1) return null;
    const adjacent = found === ci;
    streak = adjacent ? streak + 1 : 0;
    const wordStart = found === 0 || c[found - 1] === ' ';
    score += 1 + streak * 2 + (wordStart ? 3 : 0) - Math.min(found - ci, 5) * 0.2;
    ci = found + 1;
  }
  // Prefer shorter candidates when the score is otherwise equal.
  return score - c.length * 0.01;
}

export function fuzzyFilter<T>(items: readonly T[], query: string, text: (item: T) => string): T[] {
  if (!query.trim()) return [...items];
  return items
    .map((item) => ({ item, score: fuzzyScore(query, text(item)) }))
    .filter((r): r is { item: T; score: number } => r.score !== null)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
}

function normalise(input: string): string {
  return input.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}
