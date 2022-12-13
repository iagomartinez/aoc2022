import { Rope, simulate, parseMove } from "../../src/day9/day9";

describe("input parsing", () => {
  it("splits out number of moves", () => {
    const move = parseMove("R 4");
    expect(move && move.count).toEqual("4");
  });
});
describe("simulate", () => {
  it("moves the head right four times", () => {
    const rope = simulate(["R 4"]);
    expect(rope.head).toStrictEqual([4, 0]);
  });

  it("moves the head up four times", () => {
    const rope = simulate(["U 4"]);
    expect(rope.head).toStrictEqual([0, 4]);
  });

  test.each`
    moves             | head      | tail
    ${["R 4"]}        | ${[4, 0]} | ${[3, 0]}
    ${["U 4"]}        | ${[0, 4]} | ${[0, 3]}
    ${["U 2", "R 2"]} | ${[2, 2]} | ${[1, 2]}
    ${["R 2", "L 1"]} | ${[1, 0]} | ${[1, 0]}
    ${["U 2", "D 2"]} | ${[0, 0]} | ${[0, 1]}
  `(
    "simulate($moves) should result in rope position $head, $tail",
    ({ moves, head, tail }) => {
      const rope = simulate(moves);
      expect(rope.head).toStrictEqual(head);
      expect(rope.tail).toStrictEqual(tail);
    }
  );
});

describe("rope bridge walking", () => {
  describe("Move right", () => {
    it("changes H but not T if the difference is < 2", () => {
      const rope = new Rope();
      rope.moveRight();
      expect(rope.tail).toStrictEqual([0, 0]);
    });

    it("changes T if H moves twice", () => {
      const rope = new Rope();
      rope.moveRight();
      rope.moveRight();
      expect(rope.tail).toStrictEqual([1, 0]);
      expect(rope.visited).toStrictEqual([
        [0, 0],
        [1, 0],
      ]);
    });
  });

  describe("Move up", () => {
    it("tail moves if y difference is > 1", () => {
      const rope = new Rope();
      rope.moveUp();
      rope.moveUp();
      expect(rope.head).toStrictEqual([0, 2]);
      expect(rope.tail).toStrictEqual([0, 1]);
    });

    it("tail moves diagonally if the head and tail are not in the same row or column", () => {
      const rope = new Rope();
      rope.moveRight();
      rope.moveUp();
      rope.moveUp();
      expect(rope.head).toStrictEqual([1, 2]);
      expect(rope.tail).toStrictEqual([1, 1]);
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
});
