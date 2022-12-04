import { readFileSync } from "fs";

const getElfCalories = (inputfile: string): number[] => {
  return readFileSync(inputfile, "utf-8")
    .split("\n")
    .reduce(
      ([head, ...tail], line) =>
        line.trim() ? [(head += +line), ...tail] : [0, head, ...tail],
      [0]
    );
};

const getTop3 = (elfcalories: number[]): number[] => {
  return [...elfcalories]
    .sort((a, b) => a - b)
    .reverse()
    .slice(0, 3);
};

console.log(
  `AOC 2022 Day 1 result ⭐: ${Math.max(
    ...getElfCalories("src/day1/input.txt")
  )}`
);
console.log(
  `AOC 2022 Day 1 result ⭐⭐: ${getTop3([
    ...getElfCalories("src/day1/input.txt"),
  ]).reduce((sum, current) => sum + current, 0)}`
);
