//  pseudocode:
//  parse crates based on fixed width (3 letters and a space separator)
//  push them onto arrays
//  then reverse each array
//  use push and shift for the movements

import { readFileSync } from "fs";

export class Stack {
  stacks: (string | null)[][] = [];
  build(row: (string | null)[]) {
    row.forEach((elem, i) => {
      if (this.stacks[i] === undefined) {
        console.log(`adding new stack ${i}`);
        this.stacks.push([]);
      }
      if (elem) {
        console.log(`adding new ${elem} to stack ${i}`);
        this.stacks[i].push(elem);
      }
    });
  }
  move(crates: number, from: number, to: number) {
    throw "not implemented";
  }
  get() {
    return this.stacks;
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
    console.log(`s: ${s}, x:${x}`);
    s ? stacks.push(s[1]) : stacks.push(null);
    x += 4;
  }
  return stacks;
}

export function rearrange(inputfile: string): Stack {
  const lines = readFileSync(inputfile, "utf-8").split(/\r?\n/);
  const countsregex = /$\d{1,}\s/g;
  const crateregex = /\[[A-Z]/g;
  const moveregex = /move\s\d{1,}\sfrom\s\d{1,}\sto\s\d{1,}/;

  const stacks = new Stack();
  const linecount = lines.length;
  for (let i = 0; i < linecount; i++) {
    const line = lines.shift();
    if (line) {
      if (line.match(countsregex)) {
        console.log("numbers line found");
        continue;
      } else if (line.match(crateregex)) {
        stacks.build(parseLine(line));
      } else if (line.match(moveregex)) {
        const groups = parseMove(line);
        //console.log(`move ${groups.move}`);
      }
    }
  }

  return stacks;
}
