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
};

export function part1(inputfile: string): [string,number][]{
    return readFileSync(inputfile, 'utf-8')
        .split(/\r?\n/)
        .filter(line=>line.trim())
        .map(line=>splitContents(line))
        .map(compartments=>findInBoth(compartments[0], compartments[1]))
        .flat()
        .map(item=>[item, prioritise(item)]);
}

export function groupsof3(inputfile: string): string[][]{
    let lines = readFileSync(inputfile, 'utf-8')
        .split(/\r?\n/)
        .filter(line=>line.trim());

    let groups = []
    for (let i = 0; i < lines.length; i += 3) {
        const threes = lines.slice(i, i + 3);
        groups.push(threes)
    }
    return groups;    
};

function findInGroup(group:string[]): string[]{
    let matchgroup = [...group[0]];
    for (let i = 1; i < group.length; i++) {
        let set = new Set([...group[i]]);
        matchgroup = [...matchgroup].filter(item => set.has(item))
    };
    return [...new Set(matchgroup)];
}

export function part2(inputfile: string): [string,number][]{
    return groupsof3(inputfile)
        .map(findInGroup)
        .flat()
        .map(item=>[item, prioritise(item)]);
};

console.log(`AOC 2022 Day 3 result ⭐: ${ part1('src/day3/input.txt').reduce((agg,item) => agg += item[1],0)}`);
console.log(`AOC 2022 Day 3 result ⭐⭐: ${ part2('src/day3/input.txt').reduce((agg,item) => agg += item[1],0)}`);

