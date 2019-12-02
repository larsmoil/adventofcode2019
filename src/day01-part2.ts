const puzzle = (lines: string[]): number => {
  const fuelSum = (n: number): number => {
    const sum: number = Math.max(Math.floor(n / 3) - 2, 0);
    return sum > 0 ? (sum + fuelSum(sum)) : sum;
  };
  const fuelSums = lines.map((line) => fuelSum(+line));
  return fuelSums.reduce((sum, num) => sum + num, 0);
};

export default puzzle;
