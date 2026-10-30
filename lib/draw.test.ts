import type { Assignment, Exclusion } from '@/model/event.model';
import { describe, expect, it } from 'vitest';

import { drawAssignments } from './draw';

const ids = (n: number) => Array.from({ length: n }, (_, i) => `p${i}`);

/** Deterministic PRNG (mulberry32) for reproducible tests. */
const seeded = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const expectValid = (people: string[], assignments: Assignment[], exclusions: Exclusion[] = []) => {
  expect(assignments).toHaveLength(people.length);
  expect(new Set(assignments.map((a) => a.giverId))).toEqual(new Set(people));
  expect(new Set(assignments.map((a) => a.receiverId))).toEqual(new Set(people));
  for (const { giverId, receiverId } of assignments) {
    expect(giverId).not.toBe(receiverId);
    for (const { a, b } of exclusions) {
      expect([giverId, receiverId].sort()).not.toEqual([a, b].sort());
    }
  }
};

describe('drawAssignments', () => {
  it('rejects fewer than two participants', () => {
    expect(drawAssignments([])).toEqual({ ok: false, reason: 'too-few' });
    expect(drawAssignments(['a'])).toEqual({ ok: false, reason: 'too-few' });
  });

  it.each([2, 3, 13, 14, 30])('produces a valid derangement for %i people (odd counts allowed)', (n) => {
    const people = ids(n);
    const result = drawAssignments(people);
    expect(result.ok).toBe(true);
    if (result.ok) expectValid(people, result.assignments);
  });

  it('never fails across many random draws', () => {
    const people = ids(14);
    for (let i = 0; i < 1000; i++) {
      const result = drawAssignments(people);
      expect(result.ok).toBe(true);
      if (result.ok) expectValid(people, result.assignments);
    }
  });

  it('respects exclusions in both directions', () => {
    const people = ids(13);
    const exclusions = [
      { a: 'p0', b: 'p1' },
      { a: 'p2', b: 'p3' },
      { a: 'p4', b: 'p5' }
    ];
    for (let i = 0; i < 200; i++) {
      const result = drawAssignments(people, exclusions);
      expect(result.ok).toBe(true);
      if (result.ok) expectValid(people, result.assignments, exclusions);
    }
  });

  it('finds the only valid assignment via matching fallback when constraints are tight', () => {
    // a,b,c,d where everyone but one receiver is excluded -> single 4-cycle-ish solution
    const people = ['a', 'b', 'c', 'd'];
    const exclusions = [
      { a: 'a', b: 'c' },
      { a: 'b', b: 'd' }
    ];
    const result = drawAssignments(people, exclusions, () => 0);
    expect(result.ok).toBe(true);
    if (result.ok) expectValid(people, result.assignments, exclusions);
  });

  it('reports impossible when exclusions leave no valid assignment', () => {
    const result = drawAssignments(
      ['a', 'b', 'c'],
      [
        { a: 'a', b: 'b' },
        { a: 'a', b: 'c' }
      ]
    );
    expect(result).toEqual({ ok: false, reason: 'impossible' });
  });

  it('is deterministic with a seeded rng', () => {
    const people = ids(10);
    expect(drawAssignments(people, [], seeded(42))).toEqual(drawAssignments(people, [], seeded(42)));
  });
});
