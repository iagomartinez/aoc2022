import {score} from '../src/day2/day2';

describe('Day 2 score function', () => {
        it ('should return undefined', async () => {
            expect(score('A', 'B')).toBe(undefined);
        });

        it ('scores X(Rock) as 1', async () => {
            expect(score('_', 'X')).toBe(1);
        })

        it ('scores Y(Paper) as 2', async () => {
            expect(score('_', 'Y')).toBe(2);
        })

        it ('scores Z(Scissors) as 3', async () => {
            expect(score('_', 'Z')).toBe(3);
        })

    })