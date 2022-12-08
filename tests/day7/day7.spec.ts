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

import { part1, CommandParser } from "../../src/day7/day7";
import { readFileSync } from "fs";

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

  describe("p1 function", () => {
    expect(part1("tests/day7/testinput.txt")).toEqual(95437);
  });

  describe("CommandParser", () => {
    const parser = new CommandParser();
    readFileSync("tests/day7/testinput.txt", "utf-8")
      .split(/\r?\n/)
      .forEach((line) => parser.parse(line));

    console.log(parser.getFs().genealogy);
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
