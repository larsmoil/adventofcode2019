import test from 'ava';
import { part1, part2 } from './day04';

test('password - part1', (t) => {
  t.deepEqual(
    part1(111111, 111111),
    [111111]
  );
  t.deepEqual(
    part1(111111, 111112),
    [111111, 111112]
  );
  t.deepEqual(
    part1(123789, 123789),
    []
  );
  t.deepEqual(
    part1(223450, 223450),
    []
  );
});

test('password - part2', (t) => {
  t.deepEqual(
    part2(112233, 112233),
    [112233]
  );
  t.deepEqual(
    part2(123444, 123444),
    []
  );
  t.deepEqual(
    part2(111122, 111122),
    [111122]
  );
});
