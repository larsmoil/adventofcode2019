import { readFileSync } from "fs";

export const part1 = (lower: number, upper: number): number[] => {
  const result: number[] = [];

  for (let n = lower; n <= upper; n += 1) {
    const digits = `${ n }`.split('');
    const sixDigits = digits.length === 6;
    const adjacentDigits = digits.find((n, i, a) => a.indexOf(n) === i - 1) !== undefined;
    const increasing = !digits.find((d, i, a) => i > 0 && a[i - 1] > a[i]);

    if (sixDigits && adjacentDigits && increasing) {
      result.push(n);
    }
  }
  return result;
};
export const part2 = (lower: number, upper: number): number[] => {
  return part1(lower, upper).filter((n) => {
    const str = `${ n }`;
    return str.match(/(^|[^0])(00)(?!0)/) ||
      str.match(/(^|[^1])(11)(?!1)/) ||
      str.match(/(^|[^2])(22)(?!2)/) ||
      str.match(/(^|[^3])(33)(?!3)/) ||
      str.match(/(^|[^4])(44)(?!4)/) ||
      str.match(/(^|[^5])(55)(?!5)/) ||
      str.match(/(^|[^6])(66)(?!6)/) ||
      str.match(/(^|[^7])(77)(?!7)/) ||
      str.match(/(^|[^8])(88)(?!8)/) ||
      str.match(/(^|[^9])(99)(?!9)/);
  });
};

if (process.mainModule && process.mainModule.filename === __filename) {
  const [line] = readFileSync(0).toString().split(/\n/).filter(Boolean);
  const [lower, upper] = line.split("-").map((s) => +s);

  // console.log('line: ', line)
  // console.log('lower: ', lower)
  // console.log('upper: ', upper)

  console.log(`${ part1(lower, upper).length } (pt. 1) / ${ part2(lower, upper).length } (pt. 2)`);
}
