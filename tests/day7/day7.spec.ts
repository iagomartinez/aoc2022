// pseudocode
//  fsparser: parses input, builds a filesystem
//  - detect commands
//  - consumes ls output
//  filesystem:
//  - has a folder structure
//  - has a lookup of folder -> files
//  - has a string pointer to `pwd`
//  commands:
//  cd: moves pointer
//  ls: creates folder structure; populates folder lookup

import { readFileSync } from "fs";

interface F {
  file: string;
  size: number;
}

interface D {
  parent?: D;
  dir: string;
  size?: number;
}

class FS {
  _pwd = "";
  directories = new Map<string, (F | D)[]>();
  set pwd(pwd: string) {
    this._pwd = pwd;
    console.log(`set pwd ${pwd}`);
  }
  add(file: F | D) {
    if (!this.directories.has(this._pwd)) {
      this.directories.set(this._pwd, []);
    }
    this.directories.get(this._pwd)?.push(file);
    console.log(`added file ${file}`);
  }
}

class CommandParser {
  cache: any[];
  cd = /\$\scd\s(?<target>.*)/;
  ls = /\$\sls/;
  dir = /dir\s(?<dir>.*)/;
  file = /(?<size>\d{1,})\s(?<file>[\w\.]*)/;
  fs = new FS();
  constructor() {
    this.cache = [];
  }
  parse(line: string) {
    let m: RegExpExecArray | null;
    if ((m = this.cd.exec(line)) && m?.groups?.target) {
      this.fs.pwd = m?.groups?.target;
    }
    //else if ((m = this.ls.exec(line))) {
    //console.log(`parsed ls`);
    //}
    else if ((m = this.file.exec(line))) {
      if (m.groups?.file && m.groups?.size) {
        this.fs.add({ file: m.groups?.file, size: +m.groups?.size });
      }
    } else if ((m = this.dir.exec(line))) {
      if (m.groups?.dir) {
        this.fs.add({ dir: m.groups?.dir });
      }
      //console.log(`parsed dir ${m?.groups?.dir}`);
    }
  }
  getFs() {
    return this.fs;
  }
}

describe("command parsing", () => {
  it("can extract cd", () => {
    const cd = /\$\scd\s(?<target>.*)/;
    const input = "$ cd /";
    const groups = cd.exec(input)?.groups;
    expect(groups).toMatchObject({ target: "/" });
  });

  it("can match ls", () => {
    const input = "$ ls";
    const ls = /\$\sls/;
    expect(input.match(ls)).toBeTruthy();
  });

  describe("CommandParser", () => {
    const parser = new CommandParser();

    readFileSync("tests/day7/testinput.txt", "utf-8")
      .split(/\r?\n/)
      .forEach((line) => parser.parse(line));

    console.log(parser.getFs().directories);
    expect(parser.getFs().directories).toBeTruthy();
  });

  describe("match file and size", () => {
    test.each`
      input               | groups
      ${"14848514 b.txt"} | ${{ size: "14848514", file: "b.txt" }}
      ${"62596 h.lst"}    | ${{ size: "62596", file: "h.lst" }}
      ${"4060174 j"}      | ${{ size: "4060174", file: "j" }}
    `("matching ($input) should return $groups", ({ input, groups }) => {
      const file = /(?<size>\d{1,})\s(?<file>[\w\.]*)/;
      expect(file.exec(input)?.groups).toMatchObject(groups);
    });
  });
});
