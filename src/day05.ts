import { readFileSync } from "fs";

export enum InstructionType {
  ADD = 1,
  MULTIPLY = 2,
  STORE = 3,
  OUTPUT = 4,
  JUMP_IF_TRUE = 5,
  JUMP_IF_FALSE = 6,
  LESS_THAN = 7,
  EQUALS = 8,
  HALT = 99,
}

export enum ParameterMode {
  POSITION = 0,
  IMMEDIATE = 1,
}

export interface Modes {
  mode1: ParameterMode;
  mode2: ParameterMode;
  mode3: ParameterMode;
}

export class Instruction {

  private readonly program: number[];
  private readonly programCounter: number;
  private readonly userInput: () => number;

  constructor(program: number[], programCounter: number, userInput: () => number) {
    this.program = program;
    this.programCounter = programCounter;
    this.userInput = userInput;
  }

  public get instructionType(): InstructionType {
    const instructionNumber = +`${ this.program[this.programCounter] }`.match(/(.?.)$/)![1];
    switch (instructionNumber) {
      case 1:
        return InstructionType.ADD;
      case 2:
        return InstructionType.MULTIPLY;
      case 3:
        return InstructionType.STORE;
      case 4:
        return InstructionType.OUTPUT;
      case 5:
        return InstructionType.JUMP_IF_TRUE;
      case 6:
        return InstructionType.JUMP_IF_FALSE;
      case 7:
        return InstructionType.LESS_THAN;
      case 8:
        return InstructionType.EQUALS;
      case 99:
        return InstructionType.HALT;
      default:
        throw new Error(`Unknown instruction '${ instructionNumber }' (extracted from input '${ this.program[this.programCounter] }', programCounter = ${ this.programCounter }, program = ${ this.program }).`);
    }
  }

  public get modes(): Modes {
    const [_, modes = ''] = `${ this.program[this.programCounter] }`.match(/^(.+)?../) || [];
    const [allModes, mode3, mode2, mode1] = ('000' + modes).substr(-3).match(/(.)(.)(.)/)!;
    return {
      mode1: mode1 === '1' ? ParameterMode.IMMEDIATE : ParameterMode.POSITION,
      mode2: mode2 === '1' ? ParameterMode.IMMEDIATE : ParameterMode.POSITION,
      mode3: mode3 === '1' ? ParameterMode.IMMEDIATE : ParameterMode.POSITION,
    };
  }

  private get parameters(): number[] {
    const argument1 = this.program[this.programCounter + 1];
    const argument2 = this.program[this.programCounter + 2];
    const parameter1 = this.modes.mode1 === ParameterMode.IMMEDIATE ? argument1 : this.program[argument1];
    const parameter2 = this.modes.mode2 === ParameterMode.IMMEDIATE ? argument2 : this.program[argument2];
    switch (this.instructionType) {
      case InstructionType.ADD:
      case InstructionType.MULTIPLY:
      case InstructionType.JUMP_IF_FALSE:
      case InstructionType.JUMP_IF_TRUE:
      case InstructionType.LESS_THAN:
      case InstructionType.EQUALS:
        return [parameter1, parameter2];
      case InstructionType.OUTPUT:
        return [parameter1];
      case InstructionType.STORE:
        throw new Error(`InstructionType.STORE does not have any parameters.`);
      case InstructionType.HALT:
        throw new Error(`InstructionType.HALT does not have any parameters.`);
    }
  }

  public get result(): number {
    switch (this.instructionType) {
      case InstructionType.ADD: {
        return this.parameters.reduce((res, num) => res + num);
      }
      case InstructionType.MULTIPLY: {
        return this.parameters.reduce((res, num) => res * num);
      }
      case InstructionType.STORE: {
        return this.userInput();
      }
      case InstructionType.OUTPUT:
        return this.parameters[0];
      case InstructionType.JUMP_IF_FALSE:
      case InstructionType.JUMP_IF_TRUE:
        throw new Error(`InstructionType.JUMP does not have any result.`);
      case InstructionType.LESS_THAN:
        return this.parameters[0] < this.parameters[1] ? 1 : 0;
      case InstructionType.EQUALS:
        return this.parameters[0] === this.parameters[1] ? 1 : 0;
      case InstructionType.HALT:
        return this.program[0];
    }
  }

  public get destination(): number {
    const d = (offset: 1 | 3): number => {
      return this.program[this.programCounter + offset];
    };
    switch (this.instructionType) {
      case InstructionType.ADD:
      case InstructionType.MULTIPLY:
      case InstructionType.LESS_THAN:
      case InstructionType.EQUALS:
        return d(3);
      case InstructionType.STORE:
      case InstructionType.OUTPUT:
        return d(1);
      case InstructionType.JUMP_IF_FALSE:
        return this.parameters[0] === 0 ? this.parameters[1] : this.programCounter + 3;
      case InstructionType.JUMP_IF_TRUE:
        return this.parameters[0] !== 0 ? this.parameters[1] : this.programCounter + 3;
      case InstructionType.HALT:
        throw new Error(`InstructionType.HALT does not have any destination.`);
    }
  }

}

export class IntComputer {

  private readonly program: number[];
  private readonly userInput: number[];
  private readonly startProgramCounter: number;
  private readonly output: number[];

  constructor(program: number[], programCounter: number = 0) {
    this.program = program;
    this.userInput = [];
    this.startProgramCounter = programCounter;
    this.output = [];
  }

  public input(...inp: number[]): IntComputer {
    this.userInput.push(...inp);
    return this;
  }

  public run(): number[] {
    for (let i = this.startProgramCounter; i < this.program.length;) {
      const instruction = new Instruction(this.program, i, () => {
        const inp = this.userInput.shift();
        if (typeof inp === 'undefined') {
          throw new Error('Cannot supply userInput!');
        }
        return inp;
      });
      switch (instruction.instructionType) {
        case InstructionType.HALT: {
          return [instruction.result].concat(this.output);
        }
        case InstructionType.ADD:
        case InstructionType.EQUALS:
        case InstructionType.LESS_THAN:
        case InstructionType.MULTIPLY: {
          this.program[instruction.destination] = instruction.result;
          i += 4;
          break;
        }
        case InstructionType.STORE: {
          this.program[instruction.destination] = instruction.result;
          i += 2;
          break;
        }
        case InstructionType.OUTPUT: {
          this.output.push(instruction.result);
          i += 2;
          break;
        }
        case InstructionType.JUMP_IF_FALSE:
        case InstructionType.JUMP_IF_TRUE: {
          i = instruction.destination;
          break;
        }
        default:
          throw new Error(`Unhandled InstructionType: ${ instruction.instructionType }`);
      }
    }
    throw new Error('Found no solution!');
  }
}

export const program: (input: number[], i: number, userInput: number) => number[] = (inp, i, userInput) => {
  return new IntComputer([...inp], i)
    .input(userInput)
    .run();
};

export const programPt1: (input: number[], i: number) => number[] = (inp, i) => {
  const input = [...inp];
  return program(input, i, 1);
};

export const programPt2: (input: number[], i: number) => number[] = (inp, i) => {
  const input = [...inp];
  return program(input, i, 5);
};

if (process.mainModule && process.mainModule.filename === __filename) {
  const lines = readFileSync(0).toString().split(/\n/).filter(Boolean);
  const parsed: number[] = lines.map((l) => l.split(",").map((s) => +s)).reduce((a, n) => a.concat(n), []);

  console.log(`${ programPt1(parsed, 0) } (pt.1) / [${ programPt2(parsed, 0).join(", ") }] (pt.2)`);
}
