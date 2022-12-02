import {score, p1, parseinput} from '../src/day2/day2';

describe('Day 2 score function', () => {
        test.each`
            play    | response  | result
            ${'A'}  | ${'X'}    | ${[1,3]}
            ${'B'}  | ${'Y'}    | ${[2,3]}
            ${'C'}  | ${'Z'}    | ${[3,3]}
            ${'A'}  | ${'Y'}    | ${[2,6]}
            ${'B'}  | ${'Z'}    | ${[3,6]}
            ${'C'}  | ${'X'}    | ${[1,6]}
            ${'A'}  | ${'Z'}    | ${[3,0]}
            ${'B'}  | ${'X'}    | ${[1,0]}
            ${'C'}  | ${'Y'}    | ${[2,0]}
            `('calculate($play, $response) should return $result', ({ play, response, result }) => {
                expect(score(play, response)).toStrictEqual(result);
            });

        it ('should parse three rows from test input', () => {
            let parsed = parseinput('src/day2/testinput.txt');
            console.log(parsed);
            expect(parsed).toStrictEqual([['A','Y'],['B','X'],['C','Z']])
        });

        it('should work out a score of 15 with test input', () =>{
            let scores = p1('src/day2/testinput.txt');
            console.log(scores);
            expect(scores).toStrictEqual([8,1,6]);
        });
    });
