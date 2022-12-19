import { readInput } from "../../src/utils";

export interface Monkey {
  items: number[];
  worryfn: (item: number) => number;
  nextmonkey: (worry: number) => number;
  inspections: number;
}

function createmonkeys(): Monkey[] {
  return [
    {
      items: [77, 69, 76, 77, 50, 58],
      worryfn: (item: number) => item * 11,
      nextmonkey: (worry: number) => (worry % 5 === 0 ? 1 : 5),
      inspections: 0,
    },
    {
      items: [75, 70, 82, 83, 96, 64, 62],
      worryfn: (item: number) => item + 8,
      nextmonkey: (worry: number) => (worry % 17 === 0 ? 5 : 6),
      inspections: 0,
    },
    {
      items: [53],
      worryfn: (item: number) => item * 3,
      nextmonkey: (worry: number) => (worry % 2 === 0 ? 0 : 7),
      inspections: 0,
    },
    {
      items: [85, 64, 93, 64, 99],
      worryfn: (item: number) => item + 4,
      nextmonkey: (worry: number) => (worry % 7 === 0 ? 7 : 2),
      inspections: 0,
    },
    {
      items: [61, 92, 71],
      worryfn: (item: number) => item * item,
      nextmonkey: (worry: number) => (worry % 3 === 0 ? 2 : 3),
      inspections: 0,
    },
    {
      items: [79, 73, 50, 90],
      worryfn: (item: number) => item + 2,
      nextmonkey: (worry: number) => (worry % 11 === 0 ? 4 : 6),
      inspections: 0,
    },
    {
      items: [50, 89],
      worryfn: (item: number) => item + 3,
      nextmonkey: (worry: number) => (worry % 13 === 0 ? 4 : 3),
      inspections: 0,
    },
    {
      items: [83, 56, 64, 58, 93, 91, 56, 65],
      worryfn: (item: number) => item + 5,
      nextmonkey: (worry: number) => (worry % 19 === 0 ? 1 : 0),
      inspections: 0,
    },
  ];
}

export function inspect(monkeys: Monkey[], turncount: number): Monkey[] {
  let actionlog = `Starting turns\n`;
  for (let turn = 1; turn <= turncount; turn++) {
    actionlog += `Monkeys turn ${turn} \n`;
    monkeys.forEach((monkey) => {
      while (monkey.items.length > 0) {
        const item = monkey.items.shift();
        if (item) {
          const newworry = Math.floor(monkey.worryfn(item) / 3);
          const next = monkey.nextmonkey(newworry);
          monkeys[next].items.push(newworry);
          monkey.inspections += 1;
        }
      }
    });
    actionlog += monkeys.reduce(
      (agg, monkey, id) => (agg += `Monkey ${id} holds ${monkey.items}\n`),
      ""
    );
  }
  console.log(actionlog);
  return [...monkeys];
}

function part1(): number {
  const newmonkeys = inspect(createmonkeys(), 20);
  const sortedinspections = newmonkeys
    .map((monkey) => monkey.inspections)
    .sort((a, b) => b - a);
  return sortedinspections[0] * sortedinspections[1];
}

console.log(`Day 11 part 1 ⭐: monkey business ${part1()}`);
