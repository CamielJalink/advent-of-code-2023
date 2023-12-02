import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day2.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(findSumOfIds(input));
}

function findSumOfIds(input: string[]){
    let sumPowers = 0;
    input.forEach((stringGame: string) => {
        const gameRounds: string[] = getGameRounds(stringGame);
        sumPowers += getSumPowers(gameRounds);
    });

    return sumPowers;
}

function getSumPowers(game :string[]) {
    let greenMax = 1, redMax = 1, blueMax = 1;

    game.forEach((round: string) => {
        const colors = round.split(", ");

        colors.forEach((color: string) => {
            const valuePair = color.split(" ");
            const value = parseInt(valuePair[0]);
            const colorName = valuePair[1];
            if(colorName === "red"){
                redMax = Math.max(value, redMax);
            }
            else if(colorName === "green") {
                greenMax = Math.max(value, greenMax);
            }
            else if(colorName === "blue") {
                blueMax = Math.max(value, blueMax);
            }
        });
    });

    return greenMax * redMax * blueMax;
}

function getGameRounds(stringGame: string){
    const allRounds = stringGame.split(": ")[1];
    return allRounds.split("; ");
}
