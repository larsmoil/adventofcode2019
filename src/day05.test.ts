import test from 'ava';
import { program as day2Program } from "./day02";
import { Instruction, InstructionType, ParameterMode, program } from "./day05";

test('day 5 - handles pt. 1 correctly', (t) => {
  t.deepEqual(
    program([
        3, 225, 1, 225, 6, 6, 1100, 1, 238, 225, 104, 0, 2, 136, 183, 224, 101, -5304, 224, 224, 4, 224, 1002, 223, 8, 223, 1001, 224, 6, 224, 1, 224, 223, 223, 1101, 72, 47, 225, 1101, 59, 55, 225, 1101, 46, 75, 225, 1101, 49, 15, 224, 101, -64, 224, 224, 4, 224, 1002, 223, 8, 223, 1001, 224, 5, 224, 1, 224, 223, 223, 102, 9, 210, 224, 1001, 224, -270, 224, 4, 224, 1002, 223, 8, 223, 1001, 224, 2, 224, 1, 223, 224, 223, 101, 14, 35, 224, 101, -86, 224, 224, 4, 224, 1002, 223, 8, 223, 101, 4, 224, 224, 1, 224, 223, 223, 1102, 40, 74, 224, 1001, 224, -2960, 224, 4, 224, 1002, 223, 8, 223, 101, 5, 224, 224, 1, 224, 223, 223, 1101, 10, 78, 225, 1001, 39, 90, 224, 1001, 224, -149, 224, 4, 224, 102, 8, 223, 223, 1001, 224, 4, 224, 1, 223, 224, 223, 1002, 217, 50, 224, 1001, 224, -1650, 224, 4, 224, 1002, 223, 8, 223, 1001, 224, 7, 224, 1, 224, 223, 223, 1102, 68, 8, 225, 1, 43, 214, 224, 1001, 224, -126, 224, 4, 224, 102, 8, 223, 223, 101, 3, 224, 224, 1, 224, 223, 223, 1102, 88, 30, 225, 1102, 18, 80, 225, 1102, 33, 28, 225, 4, 223, 99, 0, 0, 0, 677, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1105, 0, 99999, 1105, 227, 247, 1105, 1, 99999, 1005, 227, 99999, 1005, 0, 256, 1105, 1, 99999, 1106, 227, 99999, 1106, 0, 265, 1105, 1, 99999, 1006, 0, 99999, 1006, 227, 274, 1105, 1, 99999, 1105, 1, 280, 1105, 1, 99999, 1, 225, 225, 225, 1101, 294, 0, 0, 105, 1, 0, 1105, 1, 99999, 1106, 0, 300, 1105, 1, 99999, 1, 225, 225, 225, 1101, 314, 0, 0, 106, 0, 0, 1105, 1, 99999, 108, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 329, 1001, 223, 1, 223, 1107, 677, 226, 224, 102, 2, 223, 223, 1006, 224, 344, 1001, 223, 1, 223, 108, 226, 226, 224, 102, 2, 223, 223, 1005, 224, 359, 1001, 223, 1, 223, 1108, 677, 226, 224, 102, 2, 223, 223, 1006, 224, 374, 101, 1, 223, 223, 108, 677, 226, 224, 102, 2, 223, 223, 1006, 224, 389, 1001, 223, 1, 223, 107, 226, 226, 224, 102, 2, 223, 223, 1005, 224, 404, 1001, 223, 1, 223, 8, 226, 226, 224, 102, 2, 223, 223, 1006, 224, 419, 101, 1, 223, 223, 1107, 677, 677, 224, 102, 2, 223, 223, 1006, 224, 434, 1001, 223, 1, 223, 1107, 226, 677, 224, 1002, 223, 2, 223, 1006, 224, 449, 101, 1, 223, 223, 7, 677, 677, 224, 1002, 223, 2, 223, 1006, 224, 464, 1001, 223, 1, 223, 1108, 226, 677, 224, 1002, 223, 2, 223, 1005, 224, 479, 1001, 223, 1, 223, 8, 677, 226, 224, 1002, 223, 2, 223, 1005, 224, 494, 101, 1, 223, 223, 7, 226, 677, 224, 102, 2, 223, 223, 1005, 224, 509, 101, 1, 223, 223, 1008, 677, 226, 224, 102, 2, 223, 223, 1006, 224, 524, 101, 1, 223, 223, 8, 226, 677, 224, 1002, 223, 2, 223, 1006, 224, 539, 1001, 223, 1, 223, 1007, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 554, 101, 1, 223, 223, 107, 226, 677, 224, 1002, 223, 2, 223, 1005, 224, 569, 1001, 223, 1, 223, 1108, 677, 677, 224, 1002, 223, 2, 223, 1006, 224, 584, 1001, 223, 1, 223, 1008, 226, 226, 224, 1002, 223, 2, 223, 1005, 224, 599, 101, 1, 223, 223, 1008, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 614, 101, 1, 223, 223, 7, 677, 226, 224, 1002, 223, 2, 223, 1005, 224, 629, 1001, 223, 1, 223, 107, 677, 677, 224, 1002, 223, 2, 223, 1006, 224, 644, 101, 1, 223, 223, 1007, 226, 677, 224, 1002, 223, 2, 223, 1005, 224, 659, 1001, 223, 1, 223, 1007, 226, 226, 224, 102, 2, 223, 223, 1005, 224, 674, 101, 1, 223, 223, 4, 223, 99, 226
      ], 0
    ), [
      3,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      13978427,
    ]);
});

test('day 5 - handles day 2 input', (t) => {
  const input = [
    1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 1, 10, 19, 1, 6, 19, 23, 1, 10, 23, 27, 2, 27, 13, 31, 1, 31, 6, 35, 2, 6, 35, 39, 1, 39, 5, 43, 1, 6, 43, 47, 2, 6, 47, 51, 1, 51, 5, 55, 2, 55, 9, 59, 1, 6, 59, 63, 1, 9, 63, 67, 1, 67, 10, 71, 2, 9, 71, 75, 1, 6, 75, 79, 1, 5, 79, 83, 2, 83, 10, 87, 1, 87, 5, 91, 1, 91, 9, 95, 1, 6, 95, 99, 2, 99, 10, 103, 1, 103, 5, 107, 2, 107, 6, 111, 1, 111, 5, 115, 1, 9, 115, 119, 2, 119, 10, 123, 1, 6, 123, 127, 2, 13, 127, 131, 1, 131, 6, 135, 1, 135, 10, 139, 1, 13, 139, 143, 1, 143, 13, 147, 1, 5, 147, 151, 1, 151, 2, 155, 1, 155, 5, 0, 99, 2, 0, 14, 0
  ];
  input[1] = 12;
  input[2] = 2;
  t.is(
    program([...input], 160)[0],
    day2Program([...input], 160)
  );
  t.is(
    program([...input], 156)[0],
    day2Program([...input], 156)
  );
  t.is(
    program([...input], 152)[0],
    day2Program([...input], 152)
  );
  t.is(
    program([...input], 100)[0],
    day2Program([...input], 100)
  );
  t.is(
    program([...input], 0)[0],
    day2Program([...input], 0)
  );
});

test('day5 - very simple baseProgram', (t) => {
  t.is(program([
    1, 9, 10, 3,
    2, 3, 11, 0,
    99,
    30, 40, 50], 4)[0], 3 * 50);
});

test('day5 - simple baseProgram', (t) => {
  t.is(program([
    1, 9, 10, 3,
    2, 3, 11, 0,
    99,
    30, 40, 50], 0)[0], 3500);
});

test('day5 - extremely simple program', (t) => {
  t.is(program([
    10001, 1, 1, 0,
    99,
  ], 0)[0], 2);
});

test('day5 - simplest program', (t) => {
  t.is(program([
    1, 0, 0, 0,
    99,
  ], 4)[0], 1);
});

test('day 5 - Instruction.instructionType', (t) => {
  t.is(new Instruction([1001], 0, () => 1).instructionType, InstructionType.ADD);
  t.is(new Instruction([101], 0, () => 1).instructionType, InstructionType.ADD);
  t.is(new Instruction([1], 0, () => 1).instructionType, InstructionType.ADD);
  t.is(new Instruction([1002], 0, () => 1).instructionType, InstructionType.MULTIPLY);
  t.is(new Instruction([102], 0, () => 1).instructionType, InstructionType.MULTIPLY);
  t.is(new Instruction([2], 0, () => 1).instructionType, InstructionType.MULTIPLY);
  t.is(new Instruction([1003], 0, () => 1).instructionType, InstructionType.STORE);
  t.is(new Instruction([103], 0, () => 1).instructionType, InstructionType.STORE);
  t.is(new Instruction([3], 0, () => 1).instructionType, InstructionType.STORE);
  t.is(new Instruction([1004], 0, () => 1).instructionType, InstructionType.OUTPUT);
  t.is(new Instruction([104], 0, () => 1).instructionType, InstructionType.OUTPUT);
  t.is(new Instruction([4], 0, () => 1).instructionType, InstructionType.OUTPUT);
  t.is(new Instruction([10099], 0, () => 1).instructionType, InstructionType.HALT);
  t.is(new Instruction([1099], 0, () => 1).instructionType, InstructionType.HALT);
  t.is(new Instruction([199], 0, () => 1).instructionType, InstructionType.HALT);
  t.is(new Instruction([99], 0, () => 1).instructionType, InstructionType.HALT);
  t.is(new Instruction([1, 0, 0, 0, 99], 4, () => 1).instructionType, InstructionType.HALT);
});


test('day 5 - Instruction.modes', (t) => {
  t.deepEqual(new Instruction([10002], 0, () => 1).modes, {
    mode1: ParameterMode.POSITION,
    mode2: ParameterMode.POSITION,
    mode3: ParameterMode.IMMEDIATE,
  });
  t.deepEqual(new Instruction([1002], 0, () => 1).modes, {
    mode1: ParameterMode.POSITION,
    mode2: ParameterMode.IMMEDIATE,
    mode3: ParameterMode.POSITION,
  });
  t.deepEqual(new Instruction([102], 0, () => 1).modes, {
    mode1: ParameterMode.IMMEDIATE,
    mode2: ParameterMode.POSITION,
    mode3: ParameterMode.POSITION,
  });
  t.deepEqual(new Instruction([2], 0, () => 1).modes, {
    mode1: ParameterMode.POSITION,
    mode2: ParameterMode.POSITION,
    mode3: ParameterMode.POSITION,
  });

});

test('day 5 - Instruction.parameters', (t) => {
  t.deepEqual(new Instruction([1002, 4, 3, 4, 33], 0, () => 1).parameters, [33, 3]);
});

test('day 5 - Instruction.result', (t) => {
  t.deepEqual(new Instruction([1, 0, 0, 0,], 0, () => 1).result, 2);
  t.deepEqual(new Instruction([1001, 4, 3, 4, 33], 0, () => 1).result, 36);
  t.deepEqual(new Instruction([1002, 4, 3, 4, 33], 0, () => 1).result, 99);
  t.deepEqual(new Instruction([1002, 4, 3, 4, 99], 0, () => 1).result, 297);
});

test('day 5 - Instruction.destination', (t) => {
  t.deepEqual(new Instruction([1, 0, 0, 0,], 0, () => 1).destination, 0);
  t.deepEqual(new Instruction([10001, 0, 0, 0,], 0, () => 1).destination, 0);
  t.deepEqual(new Instruction([11002, 4, 3, 5, 33], 0, () => 1).destination, 5);
  t.deepEqual(new Instruction([1002, 4, 3, 4, 33], 0, () => 1).destination, 4);
  t.deepEqual(new Instruction([1003, 1, 3, 4, 33], 0, () => 1).destination, 1);
  t.deepEqual(new Instruction([1003, 2, 3, 4, 33], 0, () => 1).destination, 2);
});
