import {
  pairContains,
  part1,
  part2,
  pairOverlaps,
  Section,
} from "../src/day4/day4";

describe("Day 4 pairContains function", () => {
  it("should identify a clear overlapping section", () => {
    const section1: Section = { start: 2, end: 8 };
    const section2: Section = { start: 3, end: 7 };
    expect(pairContains(section1, section2)).toBeTruthy();
  });

  test.each`
    section1                | section2                | result
    ${{ start: 6, end: 6 }} | ${{ start: 4, end: 6 }} | ${true}
    ${{ start: 2, end: 3 }} | ${{ start: 4, end: 8 }} | ${false}
    ${{ start: 2, end: 6 }} | ${{ start: 4, end: 8 }} | ${false}
    ${{ start: 2, end: 6 }} | ${{ start: 2, end: 8 }} | ${true}
    ${{ start: 1, end: 1 }} | ${{ start: 1, end: 1 }} | ${true}
    ${{ start: 1, end: 3 }} | ${{ start: 1, end: 3 }} | ${true}
  `(
    "pairContains($section1, $section2) should return $result",
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

describe("Day 4 part 2", () => {
  test.each`
    section1                | section2                | result
    ${{ start: 5, end: 7 }} | ${{ start: 7, end: 9 }} | ${true}
  `(
    "pairOverlaps($section1, $section2) should return $result",
    ({ section1, section2, result }) => {
      expect(pairOverlaps(section1, section2)).toEqual(result);
    }
  );

  it("should find 4 overlapping pairs in test input", () => {
    expect(part2("src/day4/testinput.txt")).toEqual(4);
  });
});
