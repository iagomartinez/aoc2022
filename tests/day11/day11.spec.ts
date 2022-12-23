import { Monkey, inspect, inspectp2 } from "../../src/day11/day11";

function createmonkeys(): Monkey[] {
  return [
    {
      items: [79, 98],
      worryfn: (item: number) => item * 19,
      nextmonkey: (worry: number) => (worry % 23 === 0 ? 2 : 3),
      inspections: 0,
    },
    {
      items: [54, 65, 75, 74],
      worryfn: (item: number) => item + 6,
      nextmonkey: (worry: number) => (worry % 19 === 0 ? 2 : 0),
      inspections: 0,
    },
    {
      items: [79, 60, 97],
      worryfn: (item: number) => item * item,
      nextmonkey: (worry: number) => (worry % 13 === 0 ? 1 : 3),
      inspections: 0,
    },
    {
      items: [74],
      worryfn: (item: number) => item + 3,
      nextmonkey: (worry: number) => (worry % 17 === 0 ? 0 : 1),
      inspections: 0,
    },
  ];
}

describe("monkey parsing", () => {
  it("extracts monkey number", () => {
    const input = "Monkey 1:";
    const exp = /Monkey (?<id>\d{1,}):/;
    const g = exp.exec(input)?.groups;
    if (g) {
      let id = 0;
      id = +g.id;
      expect(id).toEqual(1);
    }
  });
  it("extracts items", () => {
    const input = "Starting items: 79, 98";
    const exp = /Starting items: (?<items>.*)/;
    const g = exp.exec(input)?.groups;
    if (g) {
      const items: number[] = g.items.split(",").map((i) => +i);
      expect(items).toStrictEqual([79, 98]);
    }
  });

  it("init Monkey", () => {
    const monkey: Monkey = {
      items: [79, 98],
      worryfn: (item: number) => item + 4,
      nextmonkey: (worry: number) => (worry % 7 === 0 ? 2 : 3),
      inspections: 0,
    };

    const results = monkey.items.map((item) =>
      monkey.nextmonkey(monkey.worryfn(item) / 3)
    );
    expect(results).toStrictEqual([3, 3]);
  });
});

describe("Test case with 4 monkeys", () => {
  it("loops through the monkeys", () => {
    const newmonkeys = inspect(createmonkeys(), 1, (item) =>
      Math.floor(item / 3)
    );

    expect(newmonkeys[0].items).toStrictEqual([20, 23, 27, 26]);
    expect(newmonkeys[1].items).toStrictEqual([2080, 25, 167, 207, 401, 1046]);
    expect(newmonkeys[2].items).toStrictEqual([]);
    expect(newmonkeys[3].items).toStrictEqual([]);
  });

  it("items are correct after 20 turns", () => {
    const newmonkeys = inspect(createmonkeys(), 20, (item) =>
      Math.floor(item / 3)
    );

    expect(newmonkeys[0].items).toStrictEqual([10, 12, 14, 26, 34]);
    expect(newmonkeys[1].items).toStrictEqual([245, 93, 53, 199, 115]);
    expect(newmonkeys[2].items).toStrictEqual([]);
    expect(newmonkeys[3].items).toStrictEqual([]);
  });

  it("finds correct value of monkey business with different worrry fn", () => {
    const expected = [99, 97, 8, 103];
    let actionlog = `Starting analysis\n`;

    const newmonkeys = inspectp2(
      createmonkeys(),
      20,
      (item: number) => item % (23 * 19 * 13 * 17)
    );
    const inspections = newmonkeys.map((monkey) => monkey.inspections);
    actionlog += newmonkeys.reduce(
      (agg, monkey, id) => (agg += `Monkey ${id} holds ${monkey.items}; `),
      ""
    );
    actionlog += "/n";
    console.log(actionlog);
    expect(inspections).toStrictEqual(expected);
  });
});
