import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day1.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(findSum(input));
}

function findSum(input: string[]){
    let sum = 0;
    input.forEach((calibrationString: string) => {
        sum += findCalibrationValue(calibrationString);
    })
    return sum;
}

function findCalibrationValue(calibrationString: string){
    const stringArray = calibrationString.match(/[0-9]/g)?.map((value) => value.toString()) as string[];
    let value = 0;

    if(stringArray.length > 0) {
        value = parseInt(stringArray[0] + stringArray[stringArray.length - 1]);
    }

    return value;
}
