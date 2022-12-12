import { scoreP1 } from "day2/day2";
import { readInput } from "../utils";

export interface Trees {
  rows: number[][];
  cols: number[][];
}

export function readTrees(inputfile: string): Trees {
  const lines = readInput(inputfile);
  const cols: number[][] = [];
  lines.map((line) =>
    [...line].forEach((elem, x) => {
      if (cols[x]) {
        cols[x].push(+elem);
      } else {
        cols.push([+elem]);
      }
    })
  );
  return {
    rows: lines.map((line) => [...line].map((char) => +char)),
    cols: cols,
  };
}

export enum Visibility {
  None = 0,
  Left = 1,
  Right = 2,
  Top = 4,
  Bottom = 8,
  Edge = 15,
}

export function findVisible(trees: Trees): Visibility[][] {
  const height = trees.rows.length,
    width = trees.rows[0].length;
  return trees.rows.map((row, y) =>
    row.map((tree, x) => {
      let visible = Visibility.None;
      if (x == 0 || y == 0 || x == width - 1 || y == height - 1) {
        return Visibility.Edge;
      } else {
        visible |= trees.rows[y].slice(0, x).every((t: number) => tree > t)
          ? Visibility.Left
          : 0;
        visible |= trees.rows[y].slice(x + 1).every((t: number) => tree > t)
          ? Visibility.Right
          : 0;
        visible |= trees.cols[x].slice(0, y).every((t: number) => tree > t)
          ? Visibility.Top
          : 0;
        visible |= trees.cols[x].slice(y + 1).every((t: number) => tree > t)
          ? Visibility.Bottom
          : 0;

        return visible;
      }
    })
  );
}

function notFound(val: number, alt: number) {
  if (val === -1) {
    return alt;
  }
  return val + 1;
}

export function scenicScore(trees: Trees): number[][] {
  const height = trees.rows.length,
    width = trees.rows[0].length;
  return trees.rows.map((row, y) =>
    row.map((tree, x) => {
      if (x == 0 || y == 0 || x == width - 1 || y == height - 1) {
        return 0;
      } else {
        let score = 1;
        //  Left
        score *= notFound(
          trees.rows[y].slice(x + 1).findIndex((first) => first >= tree),
          trees.rows[y].slice(x + 1).length
        );
        // Right
        score *= notFound(
          trees.rows[y]
            .slice(0, x)
            .reverse()
            .findIndex((first) => first >= tree),
          trees.rows[y].slice(0, x).length
        );
        // Bottom
        score *= notFound(
          trees.cols[x].slice(y + 1).findIndex((first) => first >= tree),
          trees.cols[x].slice(y + 1).length
        );
        // Top
        score *= notFound(
          trees.cols[x]
            .slice(0, y)
            .reverse()
            .findIndex((first) => first >= tree),
          trees.cols[x].slice(0, y).length
        );

        return score;
      }
    })
  );
}

function part1(inputfile: string): number {
  return findVisible(readTrees(inputfile))
    .flat()
    .filter((t) => t !== Visibility.None).length;
}

export function part2(inputfile: string): number {
  return Math.max(...scenicScore(readTrees(inputfile)).flat());
}

console.log(`Day 8 ⭐: ${part1("src/day8/input.txt")}`);
console.log(`Day 8 ⭐⭐: ${part2("src/day8/input.txt")}`);
