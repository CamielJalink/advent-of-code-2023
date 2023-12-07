import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day6.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(beatRaces(input));
}

// Time:      7  15   30
// Distance:  9  40  200
function beatRaces(input: string[]) {
    const times = input[0].match(/[0-9]+/g)!.map((stringNumber) => parseInt(stringNumber));
    const distances = input[1].match(/[0-9]+/g)!.map((stringNumber) => parseInt(stringNumber));

    let solutionScore = 1;
    for(let i = 0; i < times.length; i++){
        solutionScore *= raceSolutions(times[i], distances[i]);
    }
    return solutionScore;
}

function raceSolutions(time: number, distance: number){
    let solutions = 0;

    for(let t = 0; t <= time; t++){
        if(checkSolution(t, time, distance)){
            solutions++;
        }
    }
    return solutions;
}

function checkSolution(pressTime: number, raceTime: number, recordDistance: number){
    const moveTime = raceTime - pressTime;
    const distance = moveTime * pressTime;
    if(distance > recordDistance){
        return true;
    }
}