import { pairContains } from "../src/day4/day4";

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
  `(
    "calculate($play, $response) should return $result",
    ({ section1, section2, result }) => {
      expect(pairContains(section1, section2)).toEqual(result);
    }
  );
});
