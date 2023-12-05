import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day5-test.txt", "utf-8");
    const input = stringInput.split(/\n\n/gm);
    console.log(findLowestLocation(input));
}

// seeds: 79 14 55 13
//
// seed-to-soil map:
// 50 98 2
// 52 50 48

function findLowestLocation(input:string[]) {
    const stringSeeds = input[0];
    const seeds: Seed[] = findSeeds(stringSeeds);
    input.shift();
    const maps: Map[] = input.map((stringMap) => new Map(stringMap));

    console.log(maps[0]);
    return 0;
}

class Map {
    name = "error";

    constructor(stringMap: string) {
        const arrayMap = stringMap.split("\n");
        this.name = arrayMap[0];
        arrayMap.shift();
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