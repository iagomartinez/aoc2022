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
      expect(scan(4, line).length).toBe(length);
    });
  });
});
describe("Part 2", () => {
  describe("first marker", () => {
    test.each`
      line                                   | length
      ${"mjqjpqmgbljsphdztnvjfqwrcgsmlb"}    | ${19}
      ${"bvwbjplbgvbhsrlpgdmjqwftvncz"}      | ${23}
      ${"nppdvjthqldpwncqszvftbrmjlhg"}      | ${23}
      ${"nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"} | ${29}
      ${"zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"}  | ${26}
    `("scan($line) found in $length characters", ({ line, length }) => {
      expect(scan(14, line).length).toBe(length);
    });
  });
});
