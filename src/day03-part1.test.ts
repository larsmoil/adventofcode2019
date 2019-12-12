import test from 'ava';
import { Coordinate, coordinates, intersection, shortestDistance } from "./day03-part1";

test('coordinates - 1', (t) => {
  t.deepEqual(coordinates(['R8'], new Coordinate(0, 0)), [
    // R8:
    new Coordinate(1, 0),
    new Coordinate(2, 0),
    new Coordinate(3, 0),
    new Coordinate(4, 0),
    new Coordinate(5, 0),
    new Coordinate(6, 0),
    new Coordinate(7, 0),
    new Coordinate(8, 0),
  ]);
});
test('coordinates - 2', (t) => {
  t.deepEqual(coordinates(['R8', 'U5'], new Coordinate(0, 0)), [
    // R8:
    new Coordinate(1, 0),
    new Coordinate(2, 0),
    new Coordinate(3, 0),
    new Coordinate(4, 0),
    new Coordinate(5, 0),
    new Coordinate(6, 0),
    new Coordinate(7, 0),
    new Coordinate(8, 0),
    // U5:
    new Coordinate(8, 1),
    new Coordinate(8, 2),
    new Coordinate(8, 3),
    new Coordinate(8, 4),
    new Coordinate(8, 5),
  ]);
});

test('coordinates - 3', (t) => {
  t.deepEqual(coordinates(['R8', 'U5', 'L5'], new Coordinate(0, 0)), [
    // R8:
    new Coordinate(1, 0),
    new Coordinate(2, 0),
    new Coordinate(3, 0),
    new Coordinate(4, 0),
    new Coordinate(5, 0),
    new Coordinate(6, 0),
    new Coordinate(7, 0),
    new Coordinate(8, 0),
    // U5:
    new Coordinate(8, 1),
    new Coordinate(8, 2),
    new Coordinate(8, 3),
    new Coordinate(8, 4),
    new Coordinate(8, 5),
    // L5:
    new Coordinate(7, 5),
    new Coordinate(6, 5),
    new Coordinate(5, 5),
    new Coordinate(4, 5),
    new Coordinate(3, 5),
  ]);
});

test('coordinates - 4', (t) => {
  t.deepEqual(coordinates(['R8', 'U5', 'L5', 'D3'], new Coordinate(0, 0)), [
    // R8:
    new Coordinate(1, 0),
    new Coordinate(2, 0),
    new Coordinate(3, 0),
    new Coordinate(4, 0),
    new Coordinate(5, 0),
    new Coordinate(6, 0),
    new Coordinate(7, 0),
    new Coordinate(8, 0),
    // U5:
    new Coordinate(8, 1),
    new Coordinate(8, 2),
    new Coordinate(8, 3),
    new Coordinate(8, 4),
    new Coordinate(8, 5),
    // L5:
    new Coordinate(7, 5),
    new Coordinate(6, 5),
    new Coordinate(5, 5),
    new Coordinate(4, 5),
    new Coordinate(3, 5),
    // D3:
    new Coordinate(3, 4),
    new Coordinate(3, 3),
    new Coordinate(3, 2),
  ]);
});

test('intersection', (t) => {
  const arr1 = coordinates(['R8', 'U5', 'L5', 'D3', 'R5'], new Coordinate(0, 0));
  const arr2: Coordinate[] = [
    new Coordinate(8, 3),
    new Coordinate(3, 5),
  ];
  t.deepEqual(intersection(arr1, arr2), [
    new Coordinate(8, 3),
    new Coordinate(3, 5),
  ]);
});

test('shortestDistance', (t) => {
  t.is(shortestDistance([
    new Coordinate(6, 5),
    new Coordinate(3, 3),
  ]), 6);
});
