import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day5.txt", "utf-8");
    const input = stringInput.split(/\n\n/gm);
    console.log(findLowestLocation(input));
}

function findLowestLocation(input:string[]) {
    const stringSeeds = input[0];
    const seeds: Seed[] = findSeeds(stringSeeds);
    input.shift();
    const maps: Map[] = input.map((stringMap) => new Map(stringMap));

    seeds.forEach((seed: Seed) => {
        maps.forEach((map: Map) => {
            seed.value = map.transform(seed.value);
        });
    });

    let lowestLocation: bigint = seeds[0].value;
    seeds.forEach((seed: Seed) => {
        if(seed.value < lowestLocation){
            lowestLocation = seed.value;
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

class Seed {
    value: bigint;
    constructor(value: bigint){
        this.value = value;
    }
}

function findSeeds(stringSeeds: string) {
    const stringNumbers = stringSeeds.split(" ");
    stringNumbers.shift();
    const seeds: Seed[] = [];
    stringNumbers.forEach((seedNumber: string) => {
        seeds.push(new Seed(BigInt(seedNumber)));
    });
    return seeds;
}