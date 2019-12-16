import { readFileSync } from "fs";

export const buildGraph: (lines: string[]) => { [k: string]: string[] } = (lines) => {
  return lines.reduce((o, c) => {
    const [from, to] = c.split(')');
    return {
      ...o,
      [to]: (o[to] || []).concat([from]),
    };
  }, {} as { [k: string]: string[]});
};

export const programPt1: (lines: string[]) => number = (lines) => {
  const connections = buildGraph(lines);
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

export const programPt2: (lines: string[]) => number = (lines) => {
  const connections = buildGraph(lines);
  const shortestPath = (from: string, to: string, visited: string[]): number => {
    const incomingConnections: string[] = Object.keys(connections)
      .filter((c) => {
        return connections[c].includes(from);
      })
      .reduce((a, e) => a.concat([e]), [] as string[]);
    const directConnections = (connections[from] || [])
      .concat(incomingConnections)
      .filter((c) => c !== from)
      .filter((c) => !visited.includes(c));

    if (directConnections.includes(to)) {
      return 0;
    }
    if (!directConnections) {
      return Number.MAX_SAFE_INTEGER;
    }

    return 1 + Math.min(...directConnections.map((c) => shortestPath(c, to, visited.concat(c))));
  };

  const santaConnections = connections['SAN'];
  return Math.min(...santaConnections.map((c) => shortestPath('YOU', c, [])));

};

if (process.mainModule && process.mainModule.filename === __filename) {
  const lines = readFileSync(0).toString().split(/\n/).filter(Boolean);

  console.log(`${ programPt1(lines) } (pt.1) / ${ programPt2(lines) } (pt.2)`);
}
