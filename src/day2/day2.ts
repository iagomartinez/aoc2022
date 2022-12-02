import { readFileSync } from 'fs';

export function score(play:string, response:string): number | undefined {
    switch(response){
        case 'X':
            return 1;
        case 'Y':
            return 2;
        case 'Z':
            return 3;
        default:
            return undefined;
    }    
}