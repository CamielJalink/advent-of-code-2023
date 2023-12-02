import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day2.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(findSumOfIds(input));
}

function findSumOfIds(input: string[]){
    let sumIDs = 0;
    input.forEach((stringGame: string, id) => {
        const gameRounds: string[] = getGameRounds(stringGame);
        let isValid = true;
        gameRounds.forEach((round: string) => {
            if(!isValidGame(round)){
                isValid = false;
            }
        });

        if(isValid){
            sumIDs += id+1; // 0-index index so plus 1
        }
    });

    return sumIDs;
}

function isValidGame(round:string) {
    let gameIsValid = true;
    const colors = round.split(", ");

    colors.forEach((color: string) => {
        const valuePair = color.split(" ");
        if(valuePair[1] === "red" && parseInt(valuePair[0]) > 12){
            gameIsValid = false;
        }
        else if(valuePair[1] === "green" && parseInt(valuePair[0]) > 13) {
            gameIsValid = false;
        }
        else if(valuePair[1] === "blue" && parseInt(valuePair[0]) > 14) {
            gameIsValid = false;
        }
    });

    return gameIsValid;
}

function getGameRounds(stringGame: string){
    const allRounds = stringGame.split(": ")[1];
    return allRounds.split("; ");

}
