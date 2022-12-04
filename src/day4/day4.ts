import { readFileSync } from "fs";

export function pairContains(
  section1: [number, number],
  section2: [number, number]
): boolean {
  const sorted = [section1, section2].sort((s1, s2) => {
    return s1[0] - s2[0];
  });

  return sorted[0][1] >= sorted[1][1];
}
