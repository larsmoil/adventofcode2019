import test from 'ava';
import { programPt1, programPt2 } from "./day06";
import { readFileSync } from "fs";
import { resolve } from "path";

test('day 6 - part 2', (t) => {
  const lines: string[] = readFileSync(resolve(__dirname, "..", "puzzle-inputs", "day06.txt")).toString().split(/\n/).filter(Boolean);
  t.deepEqual(
    programPt2(lines),
    409
  );
});


test('day 6 - part 2 example', (t) => {
  t.deepEqual(
    programPt2([
      'COM)B',
      'B)C',
      'C)D',
      'D)E',
      'E)F',
      'B)G',
      'G)H',
      'D)I',
      'E)J',
      'J)K',
      'K)L',
      'K)YOU',
      'I)SAN',
    ]),
    4
  );
});

test('day 6 - part 1 example', (t) => {
  t.deepEqual(
    programPt1([
      'COM)B',
      'B)C',
      'C)D',
      'D)E',
      'E)F',
      'B)G',
      'G)H',
      'D)I',
      'E)J',
      'J)K',
      'K)L',
    ]),
    42
  );
});

test('day 6 - part 1', (t) => {
  const lines: string[] = readFileSync(resolve(__dirname, "..", "puzzle-inputs", "day06.txt")).toString().split(/\n/).filter(Boolean);
  t.deepEqual(
    programPt1(lines),
    268504
  );
});
