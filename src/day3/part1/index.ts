import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day3.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(parseInput(input));
}

function parseInput(input: string[]){
    const parts: Part[] = [];

    for(let y = 0; y < input.length; y++){
        for(let x = 0; x < input[y].length; x++){

            if(isNumber(input[y][x])) {
                const numberCoords: number[][] = [[y, x]];
                let checkNext = true;
                let partName: string = input[y][x];
                while(checkNext){
                    if(input[y][x+1] && isNumber(input[y][x+1])) {
                        numberCoords.push([y, x+1]);
                        partName += input[y][x+1];
                        x++;
                    } else{
                        checkNext = false;
                    }
                }
                parts.push(new Part(partName, numberCoords));
            }
        }
    }

    parts.forEach((part: Part) => {
        part.findNeighbors(input);
    });

    let sumOfParts = 0;
    parts.forEach((part: Part) => {
        let hasSymbol = false;
        part.neighbors.forEach((neighbor: number[]) => {
            if(input[neighbor[0]][neighbor[1]] !== "."){
                hasSymbol = true;
            }
        });

        if(hasSymbol){
           sumOfParts += parseInt(part.name);
        }
    });

    return sumOfParts;
}

function isNumber(char: string){
    const allNums = "1234567890";
    return allNums.includes(char);
}

class Part {
    name: string;
    coords: number[][];
    neighbors: number[][] = [];
    constructor(name: string, coords: number[][]){
        this.name = name;
        this.coords = coords;
    }

    findNeighbors(input: string[]){
        this.coords.forEach((coord: number[]) => {
            const y = coord[0];
            const x = coord[1];

            this.addValidNeighbors([[y,x+1], [y,x-1], [y-1, x+1], [y-1, x-1], [y-1,x], [y+1,x], [y+1, x+1], [y+1, x-1]], input);
        });
    }

    addValidNeighbors(checkCoords: number[][], input: string[]){
        checkCoords.forEach((coord: number[]) => {
            if(input[coord[0]] && input[coord[0]][coord[1]]) {

                let isNewCoord = true;
                this.coords.forEach((myCoord: number[]) => {
                    if(myCoord[0] === coord[0] && myCoord[1] === coord[1]){
                        isNewCoord = false;
                    }
                });

                this.neighbors.forEach((neighbor: number[]) => {
                    if(neighbor[0] === coord[0] && neighbor[1] === coord[1]){
                        isNewCoord = false;
                    }
                });
                if(isNewCoord){
                    this.neighbors.push(coord);
                }
            }
        });
    }
}