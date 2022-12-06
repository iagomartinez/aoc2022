import { scan } from "../../src/day6/day6";

describe("Part 1", () => {
  describe("first marker", () => {
    test.each`
      line                                   | length
      ${"bvwbjplbgvbhsrlpgdmjqwftvncz"}      | ${5}
      ${"nppdvjthqldpwncqszvftbrmjlhg"}      | ${6}
      ${"nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"} | ${10}
      ${"zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"}  | ${11}
    `("scan($line) found in $length characters", ({ line, length }) => {
      expect(scan(line).length).toBe(length);
    });
  });
});
