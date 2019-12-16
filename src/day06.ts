import { readFileSync } from "fs";

export const program: (lines: string[]) => number = (lines) => {
  const connections: { [k: string]: string[] } = lines.reduce((o, c) => {
    const [from, to] = c.split(')');
    return {
      ...o,
      [to]: (o[to] || []).concat([from]),

    };
  }, {} as { [k: string]: string[]});

  const numConnections = (connection: string): number => {
    if (connection === 'COM') {
      return 0;
    }
    const directConnections = connections[connection];
    return directConnections.length + directConnections.reduce((sum, c) => {
      return sum + numConnections(c);
    }, 0);
  };
  return Object.keys(connections).reduce((sum, connection) => {
    return sum + numConnections(connection);
  }, 0);
};

export const programPt1: (lines: string[]) => number = (lines) => program(lines);
export const programPt2: (lines: string[]) => number = (lines) => program(lines);

if (process.mainModule && process.mainModule.filename === __filename) {
  const lines = readFileSync(0).toString().split(/\n/).filter(Boolean);

  console.log(`${ programPt1(lines) } (pt.1) / [${ programPt2(lines) }] (pt.2)`);
}
