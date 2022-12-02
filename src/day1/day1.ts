import { readFileSync } from 'fs';

const getElfCalories = (inputfile : string): number[] => {
    const filecontents = readFileSync(inputfile, 'utf-8');
    var textByLine = filecontents.split("\n")
    let totalcals: number = 0;
    let elfcals: number[] = []
    
    textByLine.forEach((line) => {    
        if (!line.trim()){
            elfcals.push(totalcals);
            totalcals = 0;
        }
        var calories: number = +line;
        totalcals += calories;
    })
    if (totalcals) {
        elfcals.push(totalcals)
    }
    return elfcals;
  };

const getTop3 = (elfcalories : number[]) : number[] => {
    const sorted: number[] = [...elfcalories].sort((a, b) => a - b).reverse()
    console.log(sorted);
    return sorted.slice(0, 3)
}

console.log(`AOC 2022 Day 1 result ⭐: ${ Math.max(...getElfCalories('src/day1/input.txt'))}`);
console.log(`AOC 2022 Day 1 result ⭐⭐: ${ getTop3([...getElfCalories('src/day1/input.txt')]).reduce((sum, current) => sum + current, 0)}`);