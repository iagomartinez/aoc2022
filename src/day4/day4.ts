import { readFileSync } from "fs";

export type Section = {
  start: number;
  end: number;
};

export function pairContains(section1: Section, section2: Section): boolean {
  const sorted = [section1, section2].sort((s1, s2) => {
    // Sort by start position, then check that the end of the resulting first section overlaps the second
    // Sort sections by start ascending, then end descending - to catch the case where they start on same section
    // e.g. 3-7,3-6
    return s1.start - s2.start || -(s1.end - s2.end);
  });
  return sorted[0].end >= sorted[1].end;
}

export function pairOverlaps(section1: Section, section2: Section): boolean {
  const sorted = [section1, section2].sort((s1, s2) => {
    return s1.start - s2.start || -(s1.end - s2.end);
  });
  // Same sort as in overlap case ^; but check that the second start is <= the first end
  // e.g. 3-7, 7-9
  return sorted[1].start <= sorted[0].end;
}

function parseSection(section: string): Section {
  const [sec1, sec2] = [...section.split("-")];
  return { start: +sec1, end: +sec2 };
}

function calculate(
  inputfile: string,
  overlapFn: (section1: Section, section2: Section) => boolean
): number {
  return readFileSync(inputfile, "utf-8")
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map((line) => line.split(","))
    .map((sections) => [parseSection(sections[0]), parseSection(sections[1])])
    .map(([sec1, sec2]) => overlapFn(sec1, sec2))
    .filter((isContained) => isContained).length;
}

export function part1(inputfile: string): number {
  return calculate(inputfile, pairContains);
}

export function part2(inputfile: string): number {
  return calculate(inputfile, pairOverlaps);
}

console.log(`AOC 2022 Day 4 result ⭐: ${part1("src/day4/input.txt")}`);
console.log(`AOC 2022 Day 4 result ⭐⭐: ${part2("src/day4/input.txt")}`);
