import { readFileSync } from 'fs';

const scores = new Map<string, number>([
    ['A', 1],
    ['B', 2],
    ['C', 3]
]);

function scoreMove(move:string|undefined): number{
    const s = move ? scores.get(move) : 0;
    return s ? s : 0;
}

export function scoreP1(play:string, response:string): [number, number]{
    const score : [number, number]= [0,0]

    const playMap = new Map<string, string>([
        ['X', 'A'],
        ['Y', 'B'],
        ['Z', 'C']
    ]);    
    const mappedResponse:string|undefined = playMap.get(response);
    score[0] = mappedResponse ? scoreMove(mappedResponse) : 0;

    if (play === mappedResponse){
        score[1] = 3;
    }
    else if (play === 'A' && mappedResponse === 'B' || play === 'B' && mappedResponse === 'C' || play === 'C' && mappedResponse === 'A' ){
        score[1] = 6;
    }
    else{
        score[1] = 0;
    }

    return score;
}

export function scoreP2(play:string, response:string): [number, number]{
    const win = new Map<string, string>([
        ['A', 'B'],
        ['B', 'C'],
        ['C', 'A']
    ]);

    const lose = new Map<string, string>([
        ['A', 'C'],
        ['B', 'A'],
        ['C', 'B']
    ]);

    switch (response){
        case 'X': //lose
            return [scoreMove(lose.get(play)), 0]
        case 'Y': //draw
            return [scoreMove(play), 3]
        case 'Z': //win
            return [scoreMove(win.get(play)), 6]
        default:
            return [0,0]
        }
}

export function parseinput(inputfile : string): string[][] {
    return readFileSync(inputfile, 'utf-8')
        .split(/\r?\n/)
        .filter(line=>line.trim())
        .map(line => line.trim().split(" "));
}

function calculate (inputfile : string, scoreFn : (play: string, response: string) => [number,number]): number[] {
    return parseinput(inputfile)
        .map(move => scoreFn(move[0], move[1]))
        .map(score => score[0]+score[1]);
}

export function p1 (inputfile : string) : number[]{
    return calculate(inputfile, scoreP1);    
}

export function p2 (inputfile : string) : number[]{
    return calculate(inputfile, scoreP2);
}

function total(scores: number[]):number{
    return scores.reduce((acc,val) => acc += val, 0);
}

console.log(`AOC 2022 Day 2 result ⭐: ${ total(p1('src/day2/input.txt'))}`);
console.log(`AOC 2022 Day 2 result ⭐⭐: ${ total(p2('src/day2/input.txt'))}`);

