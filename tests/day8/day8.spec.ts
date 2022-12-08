import { readInput } from "../../src/utils";

function readTrees(inputfile: string): number[][] {
  return readInput(inputfile).map((line) => [...line].map((char) => +char));
}

enum Visibility {
  None = 0,
  Left = 1,
  Right = 2,
  Top = 4,
  Bottom = 8,
  Edge = 15,
}

describe("Tree scanning", () => {
  describe("part 1", () => {
    it("extracts trees as numbers", () => {
      const trees = readTrees("tests/day8/testinput.txt");
      expect(trees[0]).toStrictEqual([3, 0, 3, 7, 3]);
    });

    it("marks trees as visible", () => {
      const trees = readTrees("tests/day8/testinput.txt");
      const height = trees.length,
        width = trees[0].length;
      const visibility = trees.map((row, y) =>
        row.map((tree, x) => {
          let visible = Visibility.None;
          if (x == 0 || y == 0 || x == width - 1 || y == height - 1) {
            return Visibility.Edge;
          } else {
            visible ||= trees[y].slice(0, x).every((t) => tree > t)
              ? Visibility.Left
              : 0;
            visible ||= trees[y].slice(x + 1).every((t) => tree > t)
              ? Visibility.Right
              : 0;
            console.log(`(${x}, ${y})=>${visible}`);
            return visible;
          }
        })
      );
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
});
