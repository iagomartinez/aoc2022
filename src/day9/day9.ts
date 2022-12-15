import { readInput } from "../utils";

export interface KnotPosition {
  x: number;
  y: number;
}

export function euclideandistance(p1: KnotPosition, p2: KnotPosition): number {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

export class Rope {
  knots: KnotPosition[] = [];
  _visited: Set<string> = new Set<string>();

  constructor(size = 2) {
    for (let i = 0; i < size; i++) {
      this.knots.push({ x: 0, y: 0 });
    }
    this._visited.add(JSON.stringify(this.tail));
  }

  get head(): KnotPosition {
    return this.knots[0];
  }

  get tail(): KnotPosition {
    return this.knots.at(-1) ?? { x: 0, y: 0 };
  }

  get visited(): KnotPosition[] {
    return Array.from(this._visited).map((elem) => JSON.parse(elem));
  }

  moveRight(): void {
    this.moveX(1);
  }

  moveLeft(): void {
    this.moveX(-1);
  }

  moveX(move: number): void {
    this.head.x += move;
    this.moveKnots();
  }

  moveY(move: number): void {
    this.head.y += move;
    this.moveKnots();
  }

  moveKnots(): void {
    for (let i = 1; i < this.knots.length; i++) {
      const xdiff = this.knots[i - 1].x - this.knots[i].x;
      const ydiff = this.knots[i - 1].y - this.knots[i].y;

      if (euclideandistance(this.knots[i - 1], this.knots[i]) >= 2) {
        this.knots[i].y += ydiff ? ydiff / Math.abs(ydiff) : 0;
        this.knots[i].x += xdiff ? xdiff / Math.abs(xdiff) : 0;
      }
    }

    this._visited.add(JSON.stringify(this.tail));
  }

  moveUp(): void {
    this.moveY(1);
  }

  moveDown(): void {
    this.moveY(-1);
  }
}

export function parseMove(input: string) {
  const movepattern = /(?<direction>[RULD])\s(?<count>\d{1,})/;
  return movepattern.exec(input)?.groups;
}

export function simulate(moves: string[], size = 2, verbose = false): Rope {
  const rope = new Rope(size);

  moves.forEach((input) => {
    const move = parseMove(input);
    let movefn: () => void;
    if (move) {
      switch (move.direction) {
        case "R":
          movefn = () => rope.moveRight();
          break;
        case "L":
          movefn = () => rope.moveLeft();
          break;
        case "U":
          movefn = () => rope.moveUp();
          break;
        case "D":
          movefn = () => rope.moveDown();
          break;
        default:
          throw `unknown move ${+move.direction}`;
      }

      for (let i = 0; i < +move.count; i++) {
        movefn();
        if (verbose) {
          console.log(rope.knots);
        }
      }
    }
  });

  return rope;
}

export function part1(inputfile: string): KnotPosition[] {
  const rope = simulate(readInput(inputfile));
  console.log(rope.visited);
  return rope.visited;
}

export function part2(inputfile: string, verbose = false): KnotPosition[] {
  const rope = simulate(readInput(inputfile), 10, verbose);
  console.log(rope.visited);
  return rope.visited;
}

console.log(`Day 9 ⭐: ${part1("src/day9/input.txt").length}`);
console.log(`Day 9 ⭐⭐: ${part2("src/day9/input.txt").length}`);
