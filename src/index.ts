import { readdirSync, readFileSync } from "fs";
import { basename, resolve } from "path";
import { spawnSync, SpawnSyncReturns } from "child_process";

readdirSync(__dirname).filter((f) => f.match(/day\d+.js/)).forEach((f) => {
  const input = readFileSync(resolve(__dirname, "..", "puzzle-inputs", `${basename(f, ".js")}.txt`)).toString();
  const result: SpawnSyncReturns<Buffer> = spawnSync("node", [resolve(__dirname, f)], { input });
  const stdout = result.stdout.toString();
  console.log(`${f}: `, stdout[stdout.length - 1] === '\n' ? stdout.slice(0, stdout.length - 1) : stdout)
});
