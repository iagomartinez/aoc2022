import { pairContains, part1 } from "../src/day4/day4";

describe("Day 4 pairContains function", () => {
  it("should identify a clear overlapping section", () => {
    const section1: [number, number] = [2, 8];
    const section2: [number, number] = [3, 7];
    expect(pairContains(section1, section2)).toBeTruthy();
  });

  test.each`
    section1  | section2  | result
    ${[6, 6]} | ${[4, 6]} | ${true}
    ${[2, 3]} | ${[4, 8]} | ${false}
    ${[2, 6]} | ${[4, 8]} | ${false}
    ${[2, 6]} | ${[2, 8]} | ${true}
    ${[1, 1]} | ${[1, 1]} | ${true}
    ${[1, 3]} | ${[1, 3]} | ${true}
  `(
    "calculate($play, $response) should return $result",
    ({ section1, section2, result }) => {
      expect(pairContains(section1, section2)).toEqual(result);
    }
  );
});

describe("Day 4 part 1", () => {
  it("should find 2 overlapping pairs in test input", () => {
    expect(part1("src/day4/testinput.txt")).toEqual(2);
  });
});
