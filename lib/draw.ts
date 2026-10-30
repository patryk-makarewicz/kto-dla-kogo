import type { Assignment, Exclusion } from '@/model/event.model';

export type DrawResult = { ok: true; assignments: Assignment[] } | { ok: false; reason: 'too-few' | 'impossible' };

type Rng = () => number;

const REJECTION_ATTEMPTS = 500;

const shuffle = <T>(items: readonly T[], rng: Rng): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const buildForbidden = (ids: readonly string[], exclusions: readonly Exclusion[]) => {
  const forbidden = new Map<string, Set<string>>(ids.map((id) => [id, new Set([id])]));
  for (const { a, b } of exclusions) {
    forbidden.get(a)?.add(b);
    forbidden.get(b)?.add(a);
  }
  return forbidden;
};

/** Uniform sampling: shuffle and accept when no forbidden pair appears. */
const tryRejectionSampling = (ids: readonly string[], forbidden: Map<string, Set<string>>, rng: Rng) => {
  for (let attempt = 0; attempt < REJECTION_ATTEMPTS; attempt++) {
    const receivers = shuffle(ids, rng);
    if (ids.every((giver, i) => !forbidden.get(giver)!.has(receivers[i]))) return receivers;
  }
  return null;
};

/**
 * Randomized bipartite matching (Kuhn's augmenting paths).
 * Always finds a valid assignment when one exists.
 */
const tryMatching = (ids: readonly string[], forbidden: Map<string, Set<string>>, rng: Rng) => {
  const receiverOf = new Map<string, string>();
  const giverOf = new Map<string, string>();
  const candidates = new Map(
    ids.map((giver) => [giver, shuffle(ids, rng).filter((r) => !forbidden.get(giver)!.has(r))])
  );

  const augment = (giver: string, visited: Set<string>): boolean => {
    for (const receiver of candidates.get(giver)!) {
      if (visited.has(receiver)) continue;
      visited.add(receiver);
      const current = giverOf.get(receiver);
      if (current === undefined || augment(current, visited)) {
        receiverOf.set(giver, receiver);
        giverOf.set(receiver, giver);
        return true;
      }
    }
    return false;
  };

  for (const giver of shuffle(ids, rng)) {
    if (!augment(giver, new Set())) return null;
  }

  return ids.map((giver) => receiverOf.get(giver)!);
};

export const drawAssignments = (
  ids: readonly string[],
  exclusions: readonly Exclusion[] = [],
  rng: Rng = Math.random
): DrawResult => {
  if (ids.length < 2) return { ok: false, reason: 'too-few' };

  const forbidden = buildForbidden(ids, exclusions);
  const receivers = tryRejectionSampling(ids, forbidden, rng) ?? tryMatching(ids, forbidden, rng);

  if (!receivers) return { ok: false, reason: 'impossible' };

  return {
    ok: true,
    assignments: ids.map((giverId, i) => ({ giverId, receiverId: receivers[i] }))
  };
};
