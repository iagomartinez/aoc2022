import { Rope, simulate, parseMove, part1, part2 } from "../../src/day9/day9";

describe("input parsing", () => {
  it("splits out number of moves", () => {
    const move = parseMove("R 4");
    expect(move && move.count).toEqual("4");
  });
});
describe("simulate", () => {
  it("moves the head right four times", () => {
    const rope = simulate(["R 4"]);
    expect(rope.head).toStrictEqual({ x: 4, y: 0 });
  });

  it("moves the head up four times", () => {
    const rope = simulate(["U 4"]);
    expect(rope.head).toStrictEqual({ x: 0, y: 4 });
  });

  test.each`
    moves             | head              | tail
    ${["R 4"]}        | ${{ x: 4, y: 0 }} | ${{ x: 3, y: 0 }}
    ${["U 4"]}        | ${{ x: 0, y: 4 }} | ${{ x: 0, y: 3 }}
    ${["U 2", "R 2"]} | ${{ x: 2, y: 2 }} | ${{ x: 1, y: 2 }}
    ${["R 2", "L 1"]} | ${{ x: 1, y: 0 }} | ${{ x: 1, y: 0 }}
    ${["U 2", "D 2"]} | ${{ x: 0, y: 0 }} | ${{ x: 0, y: 1 }}
  `(
    "simulate($moves) should result in rope position $head, $tail",
    ({ moves, head, tail }) => {
      const rope = simulate(moves);
      expect(rope.head).toStrictEqual(head);
      expect(rope.tail).toStrictEqual(tail);
    }
  );

  it("returns right answer for test input", () => {
    expect(part1("tests/day9/testinput.txt").length).toEqual(13);
  });

  it("returns the right answer for ten knots example", () => {
    expect(part2("tests/day9/testinput.txt", true).length).toEqual(1);
  });

  it("returns the right answer for the larger test", () => {
    expect(part2("tests/day9/largertest.txt", true).length).toEqual(36);
  });
});

describe("rope bridge walking", () => {
  describe("Move right", () => {
    it("changes H but not T if the difference is < 2", () => {
      const rope = new Rope();
      rope.moveRight();
      expect(rope.tail).toStrictEqual({ x: 0, y: 0 });
    });

    it("changes T if H moves twice", () => {
      const rope = new Rope();
      rope.moveRight();
      rope.moveRight();
      expect(rope.tail).toStrictEqual({ x: 1, y: 0 });
      expect(rope.visited).toStrictEqual([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ]);
    });
  });

  describe("Move up", () => {
    it("tail moves if y difference is > 1", () => {
      const rope = new Rope();
      rope.moveUp();
      rope.moveUp();
      expect(rope.head).toStrictEqual({ x: 0, y: 2 });
      expect(rope.tail).toStrictEqual({ x: 0, y: 1 });
    });

    it("tail moves diagonally if the head and tail are not in the same row or column", () => {
      const rope = new Rope();
      rope.moveRight();
      rope.moveUp();
      rope.moveUp();
      expect(rope.head).toStrictEqual({ x: 1, y: 2 });
      expect(rope.tail).toStrictEqual({ x: 1, y: 1 });
    });
  });

  describe("storing visited positions", () => {
    it("counts visited positions once only", () => {
      const visited: Set<string> = new Set<string>();
      visited.add(JSON.stringify({ x: 0, y: 0 }));
      visited.add(JSON.stringify({ x: 0, y: 0 }));
      expect(Array.from(visited)).toHaveLength(1);
    });
  });

  describe("euclidean distance", () => {
    it("calculates a horizontal move", () => {
      //???(x - a)?? + (y - b)??
      const p1 = { x: 2, y: 4 };
      const p2 = { x: 4, y: 3 };

      const distance = Math.sqrt(
        Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
      );
      console.log(distance);
    });
  });
});
