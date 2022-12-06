import { parseLine, buildStacks } from "../../src/day5/day5";

describe("Day 5 part s", () => {
  describe("container parsing", () => {
    test.each`
      line             | stacks
      ${"    [D]    "} | ${[null, "D", null]}
      ${"[N] [C]    "} | ${["N", "C", null]}
      ${"[Z] [M] [P]"} | ${["Z", "M", "P"]}
    `("parseLine($line) should return $stacks", ({ line, stacks }) => {
      expect(parseLine(line)).toStrictEqual(stacks);
    });

    it("builds stacks", () => {
      expect(buildStacks("tests/day5/testinput.txt")).toStrictEqual([
        ["N", "Z"],
        ["D", "C", "M"],
        ["P"],
      ]);
    });

    it("can identify the last line with regex", () => {
      const regex = /\d{1,}\s/g;
      expect("    [D]    ".match(regex)).toBeNull();
      expect(" 1   2   3 ".match(regex)).toBeTruthy();
    });
  });
});
