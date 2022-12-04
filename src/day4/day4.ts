import { readFileSync } from "fs";

export function pairContains(
  section1: [number, number],
  section2: [number, number]
): boolean {
  const sorted = [section1, section2].sort((s1, s2) => {
    return s1[0] - s2[0] || -(s1[1] - s2[1]);
  });

  return sorted[0][1] >= sorted[1][1];
}

function parseSection(section: string): [number, number] {
  const [sec1, sec2] = [...section.split("-")];
  return [+sec1, +sec2];
}

export function part1(inputfile: string): number {
  return readFileSync(inputfile, "utf-8")
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map((line) => line.split(","))
    .map((sections) => [parseSection(sections[0]), parseSection(sections[1])])
    .map(([sec1, sec2]) => pairContains(sec1, sec2))
    .filter((isContained) => isContained).length;
}

console.log(`AOC 2022 Day 4 result ⭐: ${part1("src/day4/input.txt")}`);
