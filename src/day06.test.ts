import test from 'ava';
import { program } from "./day06";
import { readFileSync } from "fs";
import { resolve } from "path";

test('day 6 - example', (t) => {
  t.deepEqual(
    program([
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
  )
});

test('day 6 - part 1', (t) => {
  const lines: string[] = readFileSync(resolve(__dirname, "..", "puzzle-inputs", "day06.txt")).toString().split(/\n/).filter(Boolean);
  t.deepEqual(
    program(lines),
    268504
  );
});
