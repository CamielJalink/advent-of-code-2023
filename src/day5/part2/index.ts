import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day5-test.txt", "utf-8");
    const input = stringInput.split(/\n\n/gm);
    console.log(findLowestLocation(input));
}

function findLowestLocation(input:string[]) {
    const stringSeeds = input[0];
    const seeds: Set<bigint> = findSeeds(stringSeeds);

    input.shift();
    const maps: Map[] = input.map((stringMap) => new Map(stringMap));

    seeds.forEach((seed: bigint) => {
        maps.forEach((map: Map) => {
            seed = map.transform(seed);
        });
    });

    let lowestLocation = 999999999999999n;
    seeds.forEach((seed: bigint) => {
        if(seed < lowestLocation){
            lowestLocation = seed;
        }
    });
    return lowestLocation;
}

class Map {
    name = "error";
    rules: bigint[][] = [];

    constructor(stringMap: string) {
        const arrayMap = stringMap.split("\n");
        this.name = arrayMap[0];
        arrayMap.shift();
        arrayMap.forEach((stringRule: string) => {
            this.rules.push(stringRule.split(" ").map((stringNum) => BigInt(stringNum)));
        });
    }

    transform(input: bigint){
        for(const rule of this.rules) {
            const [destRange, sourceRangeStart, rangeLength] = rule;
            if(input >= sourceRangeStart && input < (sourceRangeStart + rangeLength)) {
                input = (destRange + (input - sourceRangeStart));
                break;
            }
        }
        return input;
    }
}

// function findSeeds(stringSeeds: string) {
//     const stringNumbers = stringSeeds.split(" ");
//     stringNumbers.shift();
//
//     const seeds: Set<bigint> = new Set();
//     for(let i = 0; i < stringNumbers.length - 1; i+=2){
//         const numberFrom = BigInt(stringNumbers[i]);
//         const numberLoops = BigInt(stringNumbers[i+1]);
//
//         for(let j = numberFrom; j < numberFrom + numberLoops; j++){
//             seeds.add(j);
//         }
//     }
//
//     return seeds;
// }