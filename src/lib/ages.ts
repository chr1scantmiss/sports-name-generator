import type { Sport } from "../types";

export function ageBoundsForSport(sp: Sport) {
  return sp === "nba2k" ? { min: 18, max: 38 } : { min: 20, max: 40 };
}
export function rookieAgeBoundsForSport(sp: Sport) {
  return sp === "nba2k" ? { min: 18, max: 23 } : { min: 21, max: 24 };
}
