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

//import { matches } from "z";

class CommandParser {
  cache: any[];
  cd = /\$\scd\s(?<target>.*)/;
  ls = /\$\sls/;
  dir = /dir\s(?<dir>.*)/;
  file = /(?<size>\d{1,})\s(?<file>[\w\.]*)/;
  constructor() {
    this.cache = [];
  }
  parse(line: string) {
    let m: RegExpExecArray | null;
    if ((m = this.cd.exec(line))) {
      console.log(`parsed cd ${m?.groups?.target}`);
    } else if ((m = this.ls.exec(line))) {
      console.log(`parsed ls`);
    } else if ((m = this.file.exec(line))) {
      console.log(`parsed file ${m?.groups?.size}, ${m?.groups?.file}`);
    } else if ((m = this.dir.exec(line))) {
      console.log(`parsed dir ${m?.groups?.dir}`);
    }
  }
  getFs() {
    return this.cache;
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
    parser.parse("$ cd /");
    parser.parse("$ ls");
    parser.parse("dir a");
    parser.parse("14848514 b.txt");

    expect(parser.getFs()).toBeTruthy();
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
