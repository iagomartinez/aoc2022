import { readFileSync } from 'fs';

const getElfCalories = (inputfile : string): number[] => {
    const filecontents = readFileSync(inputfile, 'utf-8');
    var textByLine = filecontents.split("\n")
    let totalcals: number = 0;
    let elfcals: number[] = []
    
    textByLine.forEach((line) => {    
        if (!line.trim()){
            console.log(`${totalcals}`);
            elfcals.push(totalcals);
            totalcals = 0;
        }
        var calories: number = +line;
        totalcals += calories;
    })
    if (totalcals) {
        elfcals.push(totalcals)
    }
    console.log(elfcals);
    return elfcals;
  };

//console.log(`AOC 2022 Day 1 test input: ${ Math.max(...getElfCalories('src/day1/testinput.txt'))}`);
console.log(`AOC 2022 Day 1 result ⭐: ${ Math.max(...getElfCalories('src/day1/input.txt'))}`);