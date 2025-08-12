export function rng(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const pick = <T,>(arr: T[], r: () => number) =>
  arr[Math.floor(r() * arr.length)];

export const toTitleCase = (s: string) =>
  s.replace(/\b([a-z])/g, (m) => m.toUpperCase());

export const inchesToFtIn = (inches: number) => {
  const ft = Math.floor(inches / 12);
  const inch = Math.round(inches % 12);
  return `${ft}'${inch}"`;
};

export const randRange = (min: number, max: number, r: () => number) =>
  Math.round(min + (max - min) * r());

export const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

export function hash32(s: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() || "")
    .join("");

export function colorFromName(name: string) {
  const h = hash32(name);
  const hue = h % 360;
  const bg = `hsl(${hue} 70% 20%)`;
  const ring = `hsl(${hue} 85% 45%)`;
  return { bg, ring };
}
