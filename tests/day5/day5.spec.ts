import {
  parseLine,
  rearrange,
  parseMove,
  cratemover9000,
  cratemover9001,
} from "../../src/day5/day5";

describe("Day 5 part 1", () => {
  describe("container parsing", () => {
    test.each`
      line             | stacks
      ${"    [D]    "} | ${[null, "D", null]}
      ${"[N] [C]    "} | ${["N", "C", null]}
      ${"[Z] [M] [P]"} | ${["Z", "M", "P"]}
    `("parseLine($line) should return $stacks", ({ line, stacks }) => {
      expect(parseLine(line)).toStrictEqual(stacks);
    });

    it("can identify the last line with regex", () => {
      const regex = /\d{1,}\s/g;
      expect("    [D]    ".match(regex)).toBeNull();
      expect(" 1   2   3 ".match(regex)).toBeTruthy();
    });
  });

  describe("instruction parsing", () => {
    it("can extract moves with regex", () => {
      const input = "move 1 from 2 to 1";
      expect(parseMove(input)).toMatchObject({
        move: "1",
        from: "2",
        to: "1",
      });
    });
  });

  describe("rearrange function", () => {
    it("has the correct answer for test input using CrateMover9000", () => {
      expect(
        rearrange(cratemover9000, "tests/day5/testinput.txt")
      ).toStrictEqual([["C"], ["M"], ["Z", "N", "D", "P"]]);
    });

    it("has the correct answer for test input using CrateMover9001", () => {
      expect(
        rearrange(cratemover9001, "tests/day5/testinput.txt")
      ).toStrictEqual([["M"], ["C"], ["D", "N", "Z", "P"]]);
    });
  });
});
