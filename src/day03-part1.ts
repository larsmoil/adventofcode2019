export type Direction =
  | "U"
  | "L"
  | "D"
  | "R"
  ;

export interface ICoordinate {
  go<T extends ICoordinate>(direction: Direction): T;
  toString(): string;
}

export class Coordinate implements ICoordinate {

  private readonly x: number;
  private readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  private up(): Coordinate {
    return new Coordinate(this.x, this.y + 1);
  }

  private down(): Coordinate {
    return new Coordinate(this.x, this.y - 1);
  }

  private left(): Coordinate {
    return new Coordinate(this.x - 1, this.y);
  }

  private right(): Coordinate {
    return new Coordinate(this.x + 1, this.y);
  }

  public go<T extends ICoordinate>(direction: Direction): T {
    switch (direction) {
      case "U":
        return this.up() as unknown as T;
      case "D":
        return this.down() as unknown as T;
      case "L":
        return this.left() as unknown as T;
      case "R":
        return this.right() as unknown as T;
    }
  }

  public toString(): string {
    return `{ "x": ${ this.x }, "y": ${ this.y } }`;
  }

  public manhattan(): number {
    return Math.abs(this.x) + Math.abs(this.y);
  }

}

export const intersection = <T extends ICoordinate> (arr1: T[], arr2: T[]): T[] => {
  const obj: { [k: string]: number | undefined } = arr1.map((c) => c.toString()).reduce((o, e) => Object.assign(o, { [e]: 1 }), {});
  return arr2.filter((e) => obj[e.toString()]);
};

export const coordinates = <T extends ICoordinate> (input: string[], start: T): T[] => {
  let coordinate: T = start;
  const result: T[] = [];

  for (let i = 0; i < input.length; i += 1) {
    const [_, direction, steps] = input[i].match(/^(.)(\d+)/)! as [string, Direction, string];

    for (let step = 0; step < +steps; step += 1) {
      coordinate = coordinate.go(direction);
      result.push(coordinate);
    }
  }

  return result;
};

export const shortestDistance: (coordinates: Coordinate[]) => number = (coordinates) => {
  return coordinates.reduce((min, c) => {
    return Math.min(c.manhattan(), min);
  }, Number.MAX_SAFE_INTEGER);
};

export const part1: (instructions: string[][]) => number = (instructions) => {
  const coordinatesLine1 = coordinates(instructions[0], new Coordinate(0, 0));
  const coordinatesLine2 = coordinates(instructions[1], new Coordinate(0, 0));
  const common = intersection(coordinatesLine1, coordinatesLine2);

  return shortestDistance(common);
};
