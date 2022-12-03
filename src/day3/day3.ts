import { readFileSync } from 'fs';

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function prioritise(item: string): number{
    return alphabet.indexOf(item) + 1;
};

export function splitContents(contents : string): [string, string]{
    return [contents.slice(0,contents.length / 2), contents.slice(contents.length / 2)];
};

export function findInBoth(compartment1:string, compartment2:string): string[]{
    let set = new Set([...compartment2]);
    return [...new Set([...compartment1].filter(item => set.has(item)))];
}

export function part1(inputfile: string) : [string,number][]{
    return readFileSync(inputfile, 'utf-8')
        .split(/\r?\n/)
        .filter(line=>line.trim())
        .map(line=>splitContents(line))
        .map(compartments=>findInBoth(compartments[0], compartments[1]))
        .flat()
        .map(item=>[item, prioritise(item)]);
}

console.log(`AOC 2022 Day 3 result ⭐: ${ part1('src/day3/input.txt').reduce((agg,item) => agg += item[1],0)}`);
