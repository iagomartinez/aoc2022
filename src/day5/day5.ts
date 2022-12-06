//  pseudocode:
//  parse crates based on fixed width (3 letters and a space separator)
//  push them onto arrays
//  then reverse each array
//  use pop and push for the movements

import { readFileSync } from "fs";

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

export function buildStacks(inputfile: string): (string | null)[][] {
  const lines = readFileSync(inputfile, "utf-8").split(/\r?\n/);
  const regex = /\d{1,}\s/g;

  let line = "";
  const stacks: (string | null)[][] = [];
  for (let row = 0; row < lines.length; row++) {
    line = lines[row];
    if (line.match(regex)) {
      console.log("numbers line found");
      break;
    }

    parseLine(line).forEach((elem, i) => {
      if (stacks[i] === undefined) {
        console.log(`adding new stack ${i}`);
        stacks.push([]);
      }
      if (elem) {
        console.log(`adding new ${elem} to stack ${i}`);
        stacks[i].push(elem);
      }
    });
    console.log(`stacks: ${stacks} after line ${line}; ${line.match(regex)}`);
  }

  return stacks;
}
