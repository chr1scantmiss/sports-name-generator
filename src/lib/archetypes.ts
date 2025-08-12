import type { Archetype } from "../types";

export const NFL_ARCH: Record<string, Archetype[]> = {
  QB: [{ label: "Pocket Passer", hMin: 74, hMax: 79, wMin: 220, wMax: 245 }, { label: "Dual-Threat", hMin: 72, hMax: 77, wMin: 205, wMax: 230 }],
  RB: [{ label: "Speed Back", hMin: 67, hMax: 70, wMin: 190, wMax: 210 }, { label: "Power Back", hMin: 70, hMax: 73, wMin: 220, wMax: 240 }],
  WR: [{ label: "Slot WR", hMin: 69, hMax: 72, wMin: 175, wMax: 195 }, { label: "Outside WR", hMin: 72, hMax: 76, wMin: 190, wMax: 215 }, { label: "Big WR", hMin: 74, hMax: 77, wMin: 210, wMax: 230 }],
  TE: [{ label: "Move TE", hMin: 75, hMax: 78, wMin: 235, wMax: 255 }, { label: "Inline TE", hMin: 76, hMax: 79, wMin: 250, wMax: 270 }],
  OL: [{ label: "Tackle", hMin: 76, hMax: 80, wMin: 305, wMax: 340 }, { label: "Guard/Center", hMin: 75, hMax: 78, wMin: 300, wMax: 330 }],
  DL: [{ label: "EDGE", hMin: 75, hMax: 78, wMin: 245, wMax: 270 }, { label: "Interior DL", hMin: 74, hMax: 78, wMin: 295, wMax: 330 }],
  LB: [{ label: "Off-Ball LB", hMin: 72, hMax: 76, wMin: 225, wMax: 245 }, { label: "Edge LB", hMin: 74, hMax: 77, wMin: 245, wMax: 265 }],
  CB: [{ label: "Boundary CB", hMin: 70, hMax: 73, wMin: 185, wMax: 200 }, { label: "Nickel CB", hMin: 69, hMax: 72, wMin: 175, wMax: 190 }],
  S:  [{ label: "Free Safety", hMin: 71, hMax: 74, wMin: 190, wMax: 205 }, { label: "Strong Safety", hMin: 72, hMax: 75, wMin: 205, wMax: 220 }],
  K:  [{ label: "Kicker", hMin: 69, hMax: 74, wMin: 170, wMax: 200 }],
  P:  [{ label: "Punter", hMin: 70, hMax: 75, wMin: 175, wMax: 205 }],
};

export const NBA_ARCH: Record<string, Archetype[]> = {
  PG: [{ label: "Lead Guard", hMin: 72, hMax: 75, wMin: 170, wMax: 195 }],
  SG: [{ label: "Scoring Guard", hMin: 75, hMax: 78, wMin: 185, wMax: 210 }],
  "G/F": [{ label: "Combo Wing", hMin: 76, hMax: 79, wMin: 195, wMax: 220 }],
  SF: [{ label: "Two-Way Wing", hMin: 77, hMax: 80, wMin: 205, wMax: 230 }],
  PF: [{ label: "Stretch/Slasher PF", hMin: 79, hMax: 82, wMin: 220, wMax: 250 }],
  "F/C": [{ label: "Small-Ball 5", hMin: 80, hMax: 83, wMin: 230, wMax: 255 }],
  C:  [{ label: "Traditional 5", hMin: 82, hMax: 86, wMin: 240, wMax: 275 }],
};
