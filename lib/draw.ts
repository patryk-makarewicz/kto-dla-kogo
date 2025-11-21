import { DrawResult } from "@/contexts";

export const drawUsers = (users: string[]): DrawResult[] | null => {
  const n = users.length;

  if (n < 2) return null;

  let shuffled: string[];
  let tries = 10;
  do {
    shuffled = [...users];
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    tries--;
  } while (shuffled.some((name, i) => name === users[i]) && tries > 0);

  if (shuffled.some((name, i) => name === users[i])) return null;

  return users.map((giver, i) => ({ giver, receiver: shuffled[i] }));
};
