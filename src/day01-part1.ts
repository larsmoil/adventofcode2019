const puzzle = (lines: string[]): number => {
    const fuelSum = (n: number): number => Math.floor(n / 3) - 2;
    const fuelSums = lines.map((line) => fuelSum(+line));
    return fuelSums.reduce((sum, num) => sum + num, 0);
};

export default puzzle;
