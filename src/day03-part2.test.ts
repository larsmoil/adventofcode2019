import test from 'ava';
import { CoordinateWithSteps } from "./day03-part2";
import { Coordinate } from "./day03-part1";

test('CoordinateWithSteps - go()', (t) => {
  t.deepEqual(
    new CoordinateWithSteps(new Coordinate(1, 3), 4).go("D"),
    new CoordinateWithSteps(new Coordinate(1, 2), 5)
  );
});
