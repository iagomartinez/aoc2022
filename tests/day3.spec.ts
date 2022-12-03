import {splitContents, findInBoth, prioritise, part1} from '../src/day3/day3';

const sampleContents = 'vJrwpWtwJgWrhcsFMMfFFhFp';

describe('Day 3 splitContents', () => {
    it('should split the string in two equal parts', () => {
        let [h1,h2] = splitContents(sampleContents);
        expect(h1.length).toEqual(h2.length);
    });
});

describe('Day 3 findInBoth', () => {
    it('should find the single common item in sample', () => {
        let [h1,h2] = splitContents(sampleContents);
        let commonItems = findInBoth(h1,h2);
        expect(commonItems).toStrictEqual(['p']);
    });
});

describe('Day 3 prioritise', () => {
    it('should assign 16 to p', () => {
        expect(prioritise('p')).toBe(16);
    });
});

describe('Day 3 part 1', () => {
    it ('should find the single common item in each rucksack', () => {
        let repeatedItems = part1('src/day3/testinput.txt');
        expect(repeatedItems).toStrictEqual([['p', 16], ['L', 38], ['P', 42],['v', 22], ['t', 20],['s', 19]]);
    });
});