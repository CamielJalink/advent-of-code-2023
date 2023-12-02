import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day1.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    input.pop(); // stupid last line added by IntelliJ...
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
    const firstNumRegexp = calibrationString.match(/(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|[0-9]/);
    let firstNumString = "";

    if(firstNumRegexp !== null){
        firstNumString = firstNumRegexp[0];
    }

    let reverseString = "";
    for(let i = calibrationString.length - 1; i >= 0; i--){
        reverseString += calibrationString[i];
    }

    const lastNumRegexp = reverseString.match(/(eno)|(owt)|(eerht)|(ruof)|(evif)|(xis)|(neves)|(thgie)|(enin)|[0-9]/);

    let lastNumString = "";
    if(lastNumRegexp !== null){
        lastNumString = lastNumRegexp[0];
    }

    const firstNumber: string = determineNumber(firstNumString);
    const lastNumber: string = determineNumber(lastNumString);

    return parseInt(firstNumber + lastNumber);
}

function determineNumber(numberString: string) {
    if(Array.from(numberString).length === 1){
        return numberString;
    }

    switch (numberString) {
        case 'one':
            return '1';
            break;
        case 'two':
            return '2';
            break;
        case 'three':
            return '3';
            break;
        case 'four':
            return '4';
            break;
        case 'five':
            return '5';
            break;
        case 'six':
            return '6';
            break;
        case 'seven':
            return '7';
            break;
        case 'eight':
            return '8';
            break;
        case 'nine':
            return '9';
            break;
        case 'eno':
            return '1';
            break;
        case 'owt':
            return '2';
            break;
        case 'eerht':
            return '3';
            break;
        case 'ruof':
            return '4';
            break;
        case 'evif':
            return '5';
            break;
        case 'xis':
            return '6';
            break;
        case 'neves':
            return '7';
            break;
        case 'thgie':
            return '8';
            break;
        case 'enin':
            return '9';
            break;
        default:
            console.error(numberString);
            return '-1';
    }
}
