import { readInput } from "../utils";

export interface KnotPosition {
  x: number;
  y: number;
}

export class Rope {
  head: KnotPosition = { x: 0, y: 0 };
  tail: KnotPosition = { x: 0, y: 0 };
  _visited: Set<string> = new Set<string>();

  constructor() {
    this._visited.add(JSON.stringify(this.tail));
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
    const xdiff = this.head.x - this.tail.x;
    const ydiff = this.head.y - this.tail.y;

    if (Math.abs(xdiff) > 1) {
      this.tail.x += move;
      if (Math.abs(ydiff) > 0) {
        this.tail.y += ydiff / Math.abs(ydiff);
      }
      this._visited.add(JSON.stringify(this.tail));
    }
  }

  moveY(move: number): void {
    this.head.y += move;
    const xdiff = this.head.x - this.tail.x;
    const ydiff = this.head.y - this.tail.y;

    if (Math.abs(ydiff) > 1) {
      this.tail.y += move;
      if (Math.abs(xdiff) > 0) {
        this.tail.x += xdiff / Math.abs(xdiff);
      }
      this._visited.add(JSON.stringify(this.tail));
    }
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

export function simulate(moves: string[]): Rope {
  const rope = new Rope();

  moves.forEach((input) => {
    const move = parseMove(input);
    if (move) {
      switch (move.direction) {
        case "R":
          for (let i = 0; i < +move.count; i++) {
            rope.moveRight();
          }
          break;
        case "L":
          for (let i = 0; i < +move.count; i++) {
            rope.moveLeft();
          }
          break;
        case "U":
          for (let i = 0; i < +move.count; i++) {
            rope.moveUp();
          }
          break;
        case "D":
          for (let i = 0; i < +move.count; i++) {
            rope.moveDown();
          }
          break;
        default:
          throw `unknown move ${+move.direction}`;
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

console.log(`Day 9 ⭐: ${part1("src/day9/input.txt").length}`);
