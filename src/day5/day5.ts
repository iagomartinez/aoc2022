//  pseudocode:
//  parse crates based on fixed width (3 letters and a space separator)
//  push them onto arrays
//  then reverse each array
//  use push and shift for the movements

import { readFileSync } from "fs";

export class CrateMover {
  stacks: (string | null)[][] = [];
  stack(row: (string | null)[]) {
    row.forEach((elem, i) => {
      if (this.stacks[i] === undefined) {
        this.stacks.push([]);
      }
      if (elem) {
        this.stacks[i].push(elem);
      }
    });
  }
  move(crates: number, from: number, to: number) {
    for (let i = 1; i <= crates; i++) {
      const item = this.stacks[from - 1].shift();
      if (item) {
        this.stacks[to - 1].unshift(item);
      } else {
        throw `not enough crates to move from ${from} to ${to}!`;
      }
    }
  }

  get() {
    return [...this.stacks];
  }
}

class CrateMover9001 extends CrateMover {
  move(count: number, from: number, to: number) {
    const crates: (string | null)[] = [];
    for (let i = 1; i <= count; i++) {
      const item = this.stacks[from - 1].shift();
      if (item) {
        crates.push(item);
      } else {
        throw `not enough crates to move from ${from} to ${to}!`;
      }
    }
    crates.push(...this.stacks[to - 1]);
    this.stacks[to - 1] = crates;
  }
}

export function parseMove(line: string): any {
  const r =
    /move (?<move>\d{1,})\sfrom\s(?<from>\d{1,})\sto\s(?<to>\d{1,})/.exec(line);
  return r ? r.groups : undefined;
}

export function parseLine(line: string): (string | null)[] {
  let x = 0;
  const stacks: (string | null)[] = [];
  while (x < line.length) {
    const s = line.slice(x, x + 3).trim();
    s ? stacks.push(s[1]) : stacks.push(null);
    x += 4;
  }
  return stacks;
}

export function cratemover9000() {
  return new CrateMover();
}

export function cratemover9001() {
  return new CrateMover9001();
}

export function rearrange(
  cranefunction: () => CrateMover,
  inputfile: string
): (string | null)[][] {
  const lines = readFileSync(inputfile, "utf-8").split(/\r?\n/);
  const countsregex = /$\d{1,}\s/g;
  const crateregex = /\[[A-Z]/g;
  const moveregex = /move\s\d{1,}\sfrom\s\d{1,}\sto\s\d{1,}/;

  const crane = cranefunction();
  const linecount = lines.length;
  for (let i = 0; i < linecount; i++) {
    const line = lines.shift();
    if (line) {
      if (line.match(countsregex)) {
        console.log("numbers line found");
        continue;
      } else if (line.match(crateregex)) {
        crane.stack(parseLine(line));
      } else if (line.match(moveregex)) {
        const move = parseMove(line);
        crane.move(move.move, move.from, move.to);
      }
    }
  }

  return crane.get();
}

console.log(
  `AOC 2022 Day 5 result ⭐: ${rearrange(
    cratemover9000,
    "src/day5/input.txt"
  ).reduce((acc, stack) => (acc += stack[0] ? stack[0] : "-ERROR-"), "")}`
);

console.log(
  `AOC 2022 Day 5 result ⭐: ${rearrange(
    cratemover9001,
    "src/day5/input.txt"
  ).reduce((acc, stack) => (acc += stack[0] ? stack[0] : "-ERROR-"), "")}`
);
