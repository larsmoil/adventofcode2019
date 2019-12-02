import day1Part1 from "./day01-part1";
import day1Part2 from "./day01-part2";
import { readFileSync } from "fs";

const lines = readFileSync(0).toString().split(/\n/).filter(Boolean);
const part1 = day1Part1(lines);
const part2 = day1Part2(lines);
console.log(`${part1} (pt.1) / ${part2} (pt.2)`);
