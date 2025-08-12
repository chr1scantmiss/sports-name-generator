// NFL jersey rules and helpers
export const NFL_NUMBER_RANGES: Record<string, Array<[number, number]>> = {
  QB: [[0, 19]],
  RB: [[0, 44]],
  WR: [[0, 19], [80, 89]],
  TE: [[40, 49], [80, 89]],
  OL: [[50, 79]],
  DL: [[50, 79], [90, 99]],
  LB: [[0, 59], [90, 99]],
  CB: [[0, 49]],
  S:  [[0, 49]],
  K:  [[0, 19]],
  P:  [[0, 19]],
};

export const NFL_POS = ["QB","RB","WR","TE","OL","DL","LB","CB","S","K","P"];
export const NBA_POS = ["PG","SG","G/F","SF","PF","F/C","C"];

export const isInRanges = (n: number, ranges: Array<[number, number]>) =>
  ranges.some(([a, b]) => n >= a && n <= b);

export const pickFromRanges = (ranges: Array<[number, number]>, r: () => number) => {
  const idx = Math.floor(r() * ranges.length);
  const [a, b] = ranges[idx];
  return Math.round(a + (b - a) * r());
};
