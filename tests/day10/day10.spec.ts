import { readInput } from "../../src/utils";

function parse(input: string): number {
  const exp = /addx\s(?<addx>-?\d{1,})/;
  const g = exp.exec(input)?.groups;
  if (g) {
    return +g.addx;
  }
  throw `failed to parse ${input}`;
}

function calculate(inputs: string[]): { cycles: number[]; X: number } {
  let X = 1;
  const cycles: number[] = [];
  const queue: number[] = [];

  inputs.forEach((input) => {
    if (!input) {
      return;
    }
    if (input !== "noop") {
      queue.push(parse(input));
      cycles.push(X);
    }

    cycles.push(X);
    const addx = queue.shift();
    if (addx) {
      X += addx;
    }
  });
  return { cycles, X };
}

describe("signal strength", () => {
  describe("data structure", () => {
    it("could be two arrays", () => {
      const { cycles, X } = calculate(["noop", "addx 3", "addx -5"]);
      expect(cycles).toStrictEqual([1, 1, 1, 4, 4]);
      expect(X).toEqual(-1);
    });

    test.each`
      input         | addx
      ${"addx 15"}  | ${15}
      ${"addx 1"}   | ${1}
      ${"addx -1"}  | ${-1}
      ${"addx -15"} | ${-15}
    `("parse ($input) extracts ($addx)", ({ input, addx }) => {
      expect(parse(input)).toEqual(addx);
    });
  });

  describe("calculate", () => {
    it("calculates correct answer from testinput", () => {
      const { cycles } = calculate(readInput("tests/day10/testinput.txt"));
      const signalstrengths = [20, 60, 100, 140, 180, 220].map((cycle) => [
        cycle,
        cycles[cycle - 1],
      ]);
      console.log(signalstrengths);
      const total = signalstrengths.reduce(
        (acc, next) => (acc += next[0] * next[1]),
        0
      );
      expect(total).toEqual(13140);
    });
  });

  describe("Day 10 Results", () => {
    it("⭐", () => {
      const { cycles } = calculate(readInput("tests/day10/input.txt"));
      const total = [20, 60, 100, 140, 180, 220]
        .map((cycle) => [cycle, cycles[cycle - 1]])
        .reduce((acc, next) => (acc += next[0] * next[1]), 0);
      console.log(`Day 10 ⭐ ${total}`);
    });

    it("⭐⭐", () => {
      const { cycles } = calculate(readInput("tests/day10/input.txt"));
      let crt = "";
      for (let pixel = 0; pixel < 240; pixel++) {
        if (pixel > 0 && pixel % 40 === 0) {
          crt += "\n";
        }
        const X = cycles[pixel];
        crt += pixel % 40 >= X - 1 && pixel % 40 <= X + 1 ? "#" : ".";
      }
      console.log(crt);
    });
  });
});
