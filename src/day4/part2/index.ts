import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day4.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(countScratchCards(input));
}

function countScratchCards(input: string[]){
    const scratchCards: ScratchCard[] = [];

    input.forEach((stringGame: string) => {
        const [name, numberPart] = stringGame.split(": ");
        const [winningNumbersPart, shownNumbersPart] = numberPart.split(" | ");

        const winningNumbers = winningNumbersPart.match(/[0-9]+/g)
            ?.map((stringNumber: string) => parseInt(stringNumber)).sort(compare);
        const shownNumbers = shownNumbersPart.match(/[0-9]+/g)
            ?.map((stringNumber: string) => parseInt(stringNumber)).sort(compare);

        let numberOfWinners = 0;
        if (winningNumbers && shownNumbers) {
            for (let winNum of winningNumbers) {
                for (let shownNum of shownNumbers) {
                    if (winNum === shownNum) {
                        numberOfWinners++;
                        break;
                    }
                }
            }
        }
        scratchCards.push(new ScratchCard(name, numberOfWinners));
    });

    let totalScratchCards = 0;
    scratchCards.forEach((scratchCard: ScratchCard, index: number) => {
        for(let i = 0; i < scratchCard.numberOfCopies; i++) {
            for(let j = 1; j <= scratchCard.numberOfMatches; j++) {
                scratchCards[index+j].numberOfCopies++;
            }
        }
        totalScratchCards += scratchCard.numberOfCopies;
    });

    return totalScratchCards;
}

class ScratchCard {
    name;
    numberOfCopies;
    numberOfMatches: number;
    constructor(name: string, numberOfMatches: number){
        this.name = name;
        this.numberOfCopies = 1;
        this.numberOfMatches = numberOfMatches;
    }
}

function compare(a:number, b:number){
    if(a < b) return -1;
    else if (b < a) return 1;
    else return 0;
}