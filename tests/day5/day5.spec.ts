import {
  parseLine,
  rearrange,
  parseMove,
  Stack,
  mover9000,
  mover9001,
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
      const stack = rearrange(mover9000, "tests/day5/testinput.txt");
      expect([...stack.get()]).toStrictEqual([
        ["C"],
        ["M"],
        ["Z", "N", "D", "P"],
      ]);
    });

    it("has the correct answer for test input using CrateMover9001", () => {
      const stack = rearrange(mover9001, "tests/day5/testinput.txt");
      expect([...stack.get()]).toStrictEqual([
        ["M"],
        ["C"],
        ["D", "N", "Z", "P"],
      ]);
    });
  });

  describe("Stack", () => {
    it("moves crates", () => {
      const stack = new Stack();
      const lines = ["    [D]    ", "[N] [C]    ", "[Z] [M] [P]"];
      lines.map((line) => parseLine(line)).forEach((line) => stack.build(line));
      let move = parseMove("move 1 from 2 to 1");
      stack.move(move.move, move.from, move.to);
      move = parseMove("move 3 from 1 to 3");
      stack.move(move.move, move.from, move.to);
      const stacks = [...stack.stacks];
      expect(stacks[0]).toStrictEqual([]);
      expect(stacks[2]).toStrictEqual(["Z", "N", "D", "P"]);
    });
  });
});
