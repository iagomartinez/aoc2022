import {scoreP1, p1, p2, parseinput} from '../src/day2/day2';

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
            expect(scoreP1(play, response)).toStrictEqual(result);
        });

    it ('should parse three rows from test input', () => {
        expect(parseinput('src/day2/testinput.txt')).toStrictEqual([['A','Y'],['B','X'],['C','Z']])
    });

    it('should work out a score of 15 with test input', () =>{
        expect(p1('src/day2/testinput.txt')).toStrictEqual([8,1,6]);
    });
});

describe('Day 2 part 2 score function', () => {
    it ('should work out a score of 12 with test input', () =>{
        expect(p2('src/day2/testinput.txt')).toStrictEqual([4, 1, 7]);
    });

});
