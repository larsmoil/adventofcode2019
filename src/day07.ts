import { readFileSync } from "fs";
import { IntComputer } from "./day05";

const permutations = (a: number[]): number[][] => {
  if (a.length === 0) {
    return [[]];
  }
  return a.reduce((r: number[][], v: number, i: number) => [
    ...r,
    ...permutations([...a.slice(0, i), ...a.slice(i + 1)]).map(x => [v, ...x])
  ], []);
};

export const run = (data: number[], phases: number[]): string => {
  return phases.reduce((previousOutput, phase) => {
    return new IntComputer([...data], 0)
      .input(phase, ...previousOutput)
      .run()
      .slice(1);
  }, [0]).join("");
};

export const programPt1: (data: number[]) => string = (data) => {
  const phases = [0, 1, 2, 3, 4];
  const allPhases = permutations(phases);

  const bestPhaseSetting = allPhases.reduce((best: number[], phaseCombination: number[]) => {
    const output = run([...data], phaseCombination);
    const bestoutput = run([...data], best);

    return +output > +bestoutput ? phaseCombination : best;
  }, phases);
  return run([...data], bestPhaseSetting);
};

if (process.mainModule && process.mainModule.filename === __filename) {
  const data: number[] = readFileSync(0)
    .toString()
    .split(/\n/)
    .filter(Boolean)
    .reduce((a, e) => a.concat(e), "" as string)
    .split(",")
    .map((s) => +s);

  console.log(`${ programPt1(data) } (pt.1) / (pt.2)`);
}
