import test from 'ava';
import { programPt1 } from "./day07";
import { readFileSync } from "fs";
import { resolve } from "path";

test('day 7 - example 1', (t) => {
  t.deepEqual(
    programPt1([
      3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0,
    ]),
    "43210"
  );
});

test('day 7 - example 2', (t) => {
  t.deepEqual(
    programPt1([
      3, 23, 3, 24, 1002, 24, 10, 24, 1002, 23, -1, 23,
      101, 5, 23, 23, 1, 24, 23, 23, 4, 23, 99, 0, 0,
    ]),
    "54321"
  );
});

test('day 7 - example 3', (t) => {
  t.deepEqual(
    programPt1([
      3, 31, 3, 32, 1002, 32, 10, 32, 1001, 31, -2, 31, 1007, 31, 0, 33,
      1002, 33, 7, 33, 1, 33, 31, 31, 1, 32, 31, 31, 4, 31, 99, 0, 0, 0,
    ]),
    "65210"
  );
});

test('day 7 - pt. 1', (t) => {
  const data: number[] = readFileSync(resolve(__dirname, "..", "puzzle-inputs", "day07.txt"))
    .toString()
    .split(/\n/)
    .filter(Boolean)
    .map((l) => l.split(",").map((s) => +s)).reduce((a, e) => a.concat(e));
  t.deepEqual(
    programPt1(data),
    "67023"
  );
});
