import {readFileSync} from "fs";

type Instruction =
    | 1 // add
    | 2  // multiply
    | 99 // halt
    ;

export const program: (input: number[], i: number) => number = (inp, i) => {
    const input = [...inp];
    const instruction: Instruction = input[i] as Instruction;
    const operand1 = input[input[i + 1]];
    const operand2 = input[input[i + 2]];
    const destination = input[i + 3];

    if (instruction === 99) {
        return input[0];
    }

    input[destination] = instruction === 1 ? (operand1 + operand2) : (operand1 * operand2);
    return program(input, i + 4);
};

export const programPt1: (input: number[], i: number) => number = (inp, i) => {
    const input = [...inp];
    input[1] = 12;
    input[2] = 2;
    return program(input, 0);
};

export const programPt2: (input: number[]) => number[] = (inp) => {
    const input = [...inp];
    for (let i = 0; i < 100; i += 1) {
        for (let j = 0; j < 100; j += 1) {
            input[1] = i;
            input[2] = j;

            if (program(input, 0) === 19690720) {
                return [i, j];
            }
        }
    }
    console.log('Found no solution, exiting!');
    process.exit(1);
};

if (process.mainModule && process.mainModule.filename === __filename) {
    const lines = readFileSync(0).toString().split(/\n/).filter(Boolean);
    const parsed: number[] = lines.map((l) => l.split(",").map((s) => +s)).reduce((a, n) => a.concat(n), []);

    console.log(`${programPt1(parsed, 0)} (pt.1) / [${programPt2(parsed).join(", ")}] (pt.2)`);
}
