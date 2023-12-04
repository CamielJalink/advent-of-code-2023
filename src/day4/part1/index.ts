import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day4.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(countPoints(input))
}

function countPoints(input: string[]) {
    let score = 0;
    input.forEach((stringGame: string) => {
        const numberPart = stringGame.split(": ")[1];
        const [winningNumbersPart, shownNumbersPart] = numberPart.split(" | ");

        const winningNumbers = winningNumbersPart.match(/[0-9]+/g)
            ?.map((stringNumber: string) => parseInt(stringNumber)).sort(compare);
        const shownNumbers = shownNumbersPart.match(/[0-9]+/g)
            ?.map((stringNumber: string) => parseInt(stringNumber)).sort(compare);

        let numberOfWinners = 0;

        if(winningNumbers && shownNumbers){
            for(let winNum of winningNumbers) {
                for (let shownNum of shownNumbers) {
                    if(winNum === shownNum){
                        numberOfWinners++;
                        break;
                    }
                }
            }
        }
        const gameScore = getScore(numberOfWinners);
        score += gameScore;
    });

    return score;
}

function compare(a:number, b:number){
    if(a < b) return -1;
    else if (b < a) return 1;
    else return 0;
}

function getScore(numberOfWinners: number){
    return Math.floor(Math.pow(2, numberOfWinners-1));
}