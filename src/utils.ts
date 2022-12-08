import { readFileSync } from "fs";

export function readInput(inputfile: string): string[] {
  return readFileSync(inputfile, "utf-8").split(/\r?\n/);
}
