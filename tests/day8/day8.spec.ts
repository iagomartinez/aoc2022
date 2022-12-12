import {
  readTrees,
  findVisible,
  scenicScore,
  Visibility,
  part2,
} from "../../src/day8/day8";

describe("Tree scanning", () => {
  describe("part 1", () => {
    it("extracts trees as numbers", () => {
      const trees = readTrees("tests/day8/testinput.txt");
      expect(trees.rows[0]).toStrictEqual([3, 0, 3, 7, 3]);
      expect(trees.rows.length).toEqual(5);
      expect(trees.cols[0]).toStrictEqual([3, 2, 6, 3, 3]);
      expect(trees.cols.length).toEqual(5);
    });

    it("marks trees as visible", () => {
      const visibility = findVisible(readTrees("tests/day8/testinput.txt"));
      console.log(visibility);
      expect(visibility).toStrictEqual([
        [
          Visibility.Edge,
          Visibility.Edge,
          Visibility.Edge,
          Visibility.Edge,
          Visibility.Edge,
        ],
        [
          Visibility.Edge,
          Visibility.Left | Visibility.Top,
          Visibility.Right | Visibility.Top,
          Visibility.None,
          Visibility.Edge,
        ],
        [
          Visibility.Edge,
          Visibility.Right,
          Visibility.None,
          Visibility.Right,
          Visibility.Edge,
        ],
        [
          Visibility.Edge,
          Visibility.None,
          Visibility.Left | Visibility.Bottom,
          Visibility.None,
          Visibility.Edge,
        ],
        [
          Visibility.Edge,
          Visibility.Edge,
          Visibility.Edge,
          Visibility.Edge,
          Visibility.Edge,
        ],
      ]);
    });
  });
  describe("part 2", () => {
    it("solves test input", () => {
      const scores = scenicScore(readTrees("tests/day8/testinput.txt"));
      console.log(scores);
      expect(scores).toStrictEqual([
        [0, 0, 0, 0, 0],
        [0, 1, 4, 1, 0],
        [0, 6, 1, 2, 0],
        [0, 1, 8, 3, 0],
        [0, 0, 0, 0, 0],
      ]);
    });

    it("finds the highest scenic score", () => {
      expect(part2("tests/day8/testinput.txt")).toEqual(8);
    });
  });
});
