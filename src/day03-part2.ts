import { Coordinate, Direction, ICoordinate, coordinates } from "./day03-part1";

export class CoordinateWithSteps implements ICoordinate {

  private readonly _steps: number;
  private readonly coordinate: Coordinate;

  constructor(coordinate: Coordinate, steps: number) {
    this._steps = steps;
    this.coordinate = coordinate;
  }

  public go<T extends ICoordinate>(direction: Direction): T {
    return new CoordinateWithSteps(this.coordinate.go(direction), this.steps + 1) as unknown as T;
  }

  public toString(): string {
    return this.coordinate.toString();
  }

  get steps(): number {
    return this._steps;
  }

  public stepItUp(steps: number): CoordinateWithSteps {
    return new CoordinateWithSteps(this.coordinate, this.steps + steps);
  }
}

export const intersection = (arr1: CoordinateWithSteps[], arr2: CoordinateWithSteps[]): CoordinateWithSteps[] => {
  const obj: { [k: string]: number | undefined } = arr1.map((c) => [c.toString(), c.steps]).reduce((o, e) => Object.assign(o, { [e[0]]: e[1] }), {});
  return arr2.filter((c) => obj[c.toString()]).map((c) => c.stepItUp(obj[c.toString()]!));
};

export const shortestDistance: (coordinates: CoordinateWithSteps[]) => number = (coordinates) => {
  return coordinates.reduce((min, c) => {
    return Math.min(c.steps, min);
  }, Number.MAX_SAFE_INTEGER);
};

export const part2: (instructions: string[][]) => number = (instructions) => {
  const coordinatesLine1 = coordinates(instructions[0], new CoordinateWithSteps(new Coordinate(0, 0), 0));
  const coordinatesLine2 = coordinates(instructions[1], new CoordinateWithSteps(new Coordinate(0, 0), 0));
  const common = intersection(coordinatesLine1, coordinatesLine2);

  return shortestDistance(common);
};
