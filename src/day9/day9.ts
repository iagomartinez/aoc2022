import { readInput } from "../utils";

export interface Position {
  x: number;
  y: number;
}

export class Rope {
  head: [number, number] = [0, 0];
  tail: [number, number] = [0, 0];
  _visited: Set<string> = new Set<string>();

  constructor() {
    this._visited.add(JSON.stringify(this.tail));
  }

  get visited(): [number, number][] {
    return Array.from(this._visited).map((elem) => JSON.parse(elem));
  }

  moveRight(): void {
    this.moveX(1);
  }

  moveLeft(): void {
    this.moveX(-1);
  }

  moveX(move: number): void {
    this.head[0] += move;
    const xdiff = this.head[0] - this.tail[0];
    const ydiff = this.head[1] - this.tail[1];

    if (Math.abs(xdiff) > 1) {
      this.tail[0] += move;
      if (Math.abs(ydiff) > 0) {
        this.tail[1] += ydiff / Math.abs(ydiff);
      }
      this._visited.add(JSON.stringify(this.tail));
    }
  }

  moveY(move: number): void {
    this.head[1] += move;
    const xdiff = this.head[0] - this.tail[0];
    const ydiff = this.head[1] - this.tail[1];

    if (Math.abs(ydiff) > 1) {
      this.tail[1] += move;
      if (Math.abs(xdiff) > 0) {
        this.tail[0] += xdiff / Math.abs(xdiff);
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

export function part1(inputfile: string): [number, number][] {
  const rope = simulate(readInput(inputfile));
  console.log(rope.visited);
  return rope.visited;
}

console.log(`Day 9 ⭐: ${part1("src/day9/input.txt").length}`);
