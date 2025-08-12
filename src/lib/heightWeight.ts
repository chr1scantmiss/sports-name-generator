// Height and Weight ranges for NBA2K and Madden positions
export interface HeightWeightRange {
  minHeight: number; // inches
  maxHeight: number; // inches
  minWeight: number; // lbs
  maxWeight: number; // lbs
}

export const HEIGHT_WEIGHT: Record<string, HeightWeightRange> = {
  // NBA2K
  PG: { minHeight: 72, maxHeight: 77, minWeight: 160, maxWeight: 200 },
  SG: { minHeight: 75, maxHeight: 80, minWeight: 180, maxWeight: 220 },
  SF: { minHeight: 78, maxHeight: 82, minWeight: 200, maxWeight: 240 },
  PF: { minHeight: 80, maxHeight: 84, minWeight: 220, maxWeight: 260 },
  C: { minHeight: 82, maxHeight: 87, minWeight: 240, maxWeight: 290 },

  // Madden
  QB: { minHeight: 72, maxHeight: 79, minWeight: 200, maxWeight: 240 },
  RB: { minHeight: 68, maxHeight: 74, minWeight: 190, maxWeight: 230 },
  WR: { minHeight: 70, maxHeight: 77, minWeight: 180, maxWeight: 220 },
  TE: { minHeight: 76, maxHeight: 80, minWeight: 240, maxWeight: 270 },
  OL: { minHeight: 74, maxHeight: 79, minWeight: 290, maxWeight: 340 },
  DL: { minHeight: 74, maxHeight: 79, minWeight: 280, maxWeight: 330 },
  LB: { minHeight: 72, maxHeight: 77, minWeight: 230, maxWeight: 260 },
  CB: { minHeight: 70, maxHeight: 75, minWeight: 180, maxWeight: 205 },
  S: { minHeight: 71, maxHeight: 76, minWeight: 195, maxWeight: 225 },
  K: { minHeight: 69, maxHeight: 75, minWeight: 160, maxWeight: 210 },
  P: { minHeight: 70, maxHeight: 76, minWeight: 170, maxWeight: 220 }
};

// Helper to get random height/weight
export const getRandomHeightWeight = (position: string) => {
  const range = HEIGHT_WEIGHT[position];
  if (!range) return { height: null, weight: null };

  const height = Math.floor(
    Math.random() * (range.maxHeight - range.minHeight + 1) + range.minHeight
  );
  const weight = Math.floor(
    Math.random() * (range.maxWeight - range.minWeight + 1) + range.minWeight
  );

  return { height, weight };
};

// Convert inches to feet-inches string
export const formatHeight = (inches: number) => {
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return `${feet}'${remainingInches}"`;
};
