// Position and Archetype Data for NBA2K and Madden
export interface Position {
  name: string;
  sport: "NBA2K" | "Madden";
  archetypes: string[];
}

// NBA2K Positions
export const NBA2K_POSITIONS: Position[] = [
  {
    name: "PG",
    sport: "NBA2K",
    archetypes: ["Playmaker", "Sharpshooter", "Slasher", "Defender", "Two-Way", "Shot Creator"]
  },
  {
    name: "SG",
    sport: "NBA2K",
    archetypes: ["Sharpshooter", "Slasher", "Defender", "Two-Way", "Shot Creator", "Playmaker"]
  },
  {
    name: "SF",
    sport: "NBA2K",
    archetypes: ["Slasher", "Sharpshooter", "Defender", "Two-Way", "Shot Creator", "Playmaker"]
  },
  {
    name: "PF",
    sport: "NBA2K",
    archetypes: ["Stretch Big", "Slasher", "Defender", "Two-Way", "Post Scorer", "Rebounder"]
  },
  {
    name: "C",
    sport: "NBA2K",
    archetypes: ["Paint Beast", "Stretch Big", "Defender", "Two-Way", "Post Scorer", "Rebounder"]
  }
];

// Madden Positions
export const MADDEN_POSITIONS: Position[] = [
  { name: "QB", sport: "Madden", archetypes: ["Pocket Passer", "Scrambler", "Strong Arm"] },
  { name: "RB", sport: "Madden", archetypes: ["Power Back", "Elusive Back", "Receiving Back"] },
  { name: "WR", sport: "Madden", archetypes: ["Deep Threat", "Possession", "Route Runner"] },
  { name: "TE", sport: "Madden", archetypes: ["Blocking", "Receiving", "Balanced"] },
  { name: "OL", sport: "Madden", archetypes: ["Pass Blocker", "Run Blocker", "Balanced"] },
  { name: "DL", sport: "Madden", archetypes: ["Pass Rusher", "Run Stopper", "Balanced"] },
  { name: "LB", sport: "Madden", archetypes: ["Pass Coverage", "Run Stopper", "Blitzer"] },
  { name: "CB", sport: "Madden", archetypes: ["Man Coverage", "Zone Coverage", "Press"] },
  { name: "S", sport: "Madden", archetypes: ["Free Safety", "Strong Safety", "Hybrid"] },
  { name: "K", sport: "Madden", archetypes: ["Accurate", "Power"] },
  { name: "P", sport: "Madden", archetypes: ["Accurate", "Power"] }
];

// Get positions by sport
export const getPositionsBySport = (sport: "NBA2K" | "Madden") => {
  return sport === "NBA2K" ? NBA2K_POSITIONS : MADDEN_POSITIONS;
};

// Get random position for a sport
export const getRandomPosition = (sport: "NBA2K" | "Madden") => {
  const positions = getPositionsBySport(sport);
  return positions[Math.floor(Math.random() * positions.length)];
};
