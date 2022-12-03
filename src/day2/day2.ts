import { readFileSync } from 'fs';

export function score(play:string, response:string): [number, number]{
    let score : [number, number]= [0,0]

    let playMap = new Map<string, string>([
        ['X', 'A'],
        ['Y', 'B'],
        ['Z', 'C']
    ]);    

    let mappedResponse:string|undefined = playMap.get(response);

    switch(mappedResponse){
        case 'A':
            score[0] = 1;
            break;
        case 'B':
            score[0] = 2;
            break;
        case 'C':
            score[0] = 3;
            break;
        default:
            break;
    }

    if (play === mappedResponse){
        score[1] = 3;
    }
    else if (play === 'A' && mappedResponse === 'B' || play === 'B' && mappedResponse === 'C' || play === 'C' && mappedResponse === 'A' ){
        score[1] = 6;
    }
    else{
        score[1] = 0;
    }

    console.log(`${play}, ${response}:${mappedResponse} => ${score}`)
    return score;
}


export function scoreP2(play:string, response:string): [number, number]{
    let score : [number, number]= [0,0]
    
    let win = new Map<string, string>([
        ['A', 'B'],
        ['B', 'C'],
        ['C', 'A']
    ]);

    let lose = new Map<string, string>([
        ['A', 'C'],
        ['B', 'A'],
        ['C', 'B']
    ]);

    let scores = new Map<string, number>([
        ['A', 1],
        ['B', 2],
        ['C', 3]
    ]);

    switch (response){
        case 'X': //lose
            let x = lose.get(play);
            if (x){
                let s = scores.get(x);
                score = [s ? s : 0, 0]
            }
            break;
        case 'Y': //draw
            let s1 = scores.get(play);
            score =  [s1 ? s1 : 0, 3]
            break;
        case 'Z': //win
            let z = win.get(play);
            if (z){
                let s = scores.get(z);
                score = [s ? s : 0, 6]
            }    
            break;
        }

    console.log(`${play}, ${response} => ${score}`)
    return score;
};

export function parseinput(inputfile : string): string[][] {
    return readFileSync(inputfile, 'utf-8')
        .split(/\r?\n/)
        .filter(line=>line.trim())
        .map(line => line.trim().split(" "));
}

export function p1 (inputfile : string): number[] {
    let parsed = parseinput(inputfile);
    console.log(parsed);
    return parsed
        .map(move => score(move[0], move[1]))
        .map(score => score[0]+score[1]);    
}

export function p2 (inputfile : string): number[] {
    let parsed = parseinput(inputfile);
    console.log(parsed);
    return parsed
        .map(move => scoreP2(move[0], move[1]))
        .map(score => score[0]+score[1]);    
}

console.log(`AOC 2022 Day 2 result ⭐: ${ p1('src/day2/input.txt').reduce((acc,val) => acc += val, 0)}`);
console.log(`AOC 2022 Day 2 result ⭐⭐: ${ p2('src/day2/input.txt').reduce((acc,val) => acc += val, 0)}`);

