import { readFileSync } from "fs";
import { part1 } from "./day03-part1";

if (process.mainModule && process.mainModule.filename === __filename) {
  const lines = readFileSync(0).toString().split(/\n/).filter(Boolean);
  const parsed: string[][] = lines.map((l) => l.split(",").reduce((a: string[], n) => a.concat(n), []));

  console.log(`${ part1(parsed) } (pt. 1) / (pt. 2)`);
}
