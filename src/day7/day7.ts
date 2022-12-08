import { readFileSync } from "fs";

export interface F {
  file: string;
  size: number;
}

export interface D {
  dir: string;
  size?: number;
}

export class FS {
  _pwd = ".";
  directories = new Map<string, (F | D)[]>();
  genealogy = new Map<string, string>();
  cd(target: string) {
    if (target === "..") {
      this.cdUp();
    } else {
      //this._pwd += `/${target}`;
      const newpath = `${this._pwd}/${target}`;
      this.genealogy.set(newpath, this._pwd);
      this._pwd = newpath;
    }
  }
  cdUp() {
    this._pwd = this.genealogy.get(this._pwd) ?? "";
  }
  add(file: F | D) {
    if (!this.directories.has(this._pwd)) {
      this.directories.set(this._pwd, []);
    }
    this.directories.get(this._pwd)?.push(file);
  }
  calculateSizes() {
    return new Map<string, number>(
      [...this.directories.keys()].map((dir) => [dir, this.calculateInner(dir)])
    );
  }
  calculateInner(directory: string): number {
    const size = this.directories
      .get(directory)
      ?.reduce(
        (acc, f) =>
          "file" in f
            ? (acc += f.size)
            : (acc += f.size
                ? f.size
                : (f.size = this.calculateInner(`${directory}/${f.dir}`))),
        0
      );
    return size ? size : 0;
  }
}

export class CommandParser {
  cd = /\$\scd\s(?<target>.*)/;
  ls = /\$\sls/;
  dir = /dir\s(?<dir>.*)/;
  file = /(?<size>\d{1,})\s(?<file>[\w\.]*)/;
  fs = new FS();
  parse(line: string) {
    let m: RegExpExecArray | null;
    if ((m = this.cd.exec(line)) && m?.groups?.target) {
      this.fs.cd(m?.groups?.target);
    } else if ((m = this.file.exec(line))) {
      if (m.groups?.file && m.groups?.size) {
        this.fs.add({ file: m.groups?.file, size: +m.groups?.size });
      }
    } else if ((m = this.dir.exec(line))) {
      if (m.groups?.dir) {
        this.fs.add({ dir: m.groups?.dir });
      }
    }
  }
  getFs() {
    return this.fs;
  }
}

export function part1(inputfile: string): number {
  const parser = new CommandParser();
  readFileSync(inputfile, "utf-8")
    .split(/\r?\n/)
    .forEach((line) => parser.parse(line));

  const fs = parser.getFs();
  console.log(fs.directories);
  console.log(fs.genealogy);

  const sizes = fs.calculateSizes();
  return [...sizes.values()]
    .filter((val) => val <= 100000)
    .reduce((acc, val) => (acc += val), 0);
}

//  TODO: Implement cd ..!!!
console.log(`Day 7 ⭐: ${part1("src/day7/input.txt")}`);
