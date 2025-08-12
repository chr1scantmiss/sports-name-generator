// src/types.ts

export interface Player {
  name: string;
  sport: string;
  position: string;
  number: number;
  country?: string;
  college?: string;
  height: number; // inches
  weight: number; // pounds
  age?: number;
  archetype?: string;
}
