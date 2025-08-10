import React, { useMemo, useState, useEffect } from "react";

/**
 * Player Name Generator — DI Colleges (A–Z) + Origin Modes + NFL Numbers + Age Control (Sport-specific)
 *
 * New (this version):
 * - Age control next to Quantity:
 *    * Use Random Age (default ON)
 *    * Manual Age input; range depends on Sport/Game:
 *        - NBA 2K: 18–38
 *        - Madden: 20–40
 *    * Lock Age (one age for the whole batch, random or manual)
 *
 * Still included:
 * - Quantity default = 1
 * - Origin options: Random, Random College, Random Country, College, Country
 * - Countries: Europe + South America (USA excluded), sorted A–Z
 * - Colleges: alphabetized NCAA Division I list
 * - NFL jersey numbers by position (QB 0–19, RB 0–44, WR 0–19 or 80–89, etc.)
 * - Realistic height/weight by position (archetypes)
 * - No duplicate names across the save
 * - “Portraits” = colored initials avatar
 * - Copy + Clear buttons
 */

type Sport = "madden" | "nba2k";
type Hand = "Right" | "Left";

type PlayerRow = {
  id: string;
  name: string;
  sport: Sport;
  position: string;
  archetype: string;
  heightIn: number;
  weightLb: number;
  age: number;
  dominantHand: Hand;
  jerseyNumber: number;
  originType: "college" | "country";
  collegeOrCountry: string;
};

const STORAGE_KEY = "sgnc_players_v11";

/* ==============================
   Countries — Europe + South America (A–Z), USA excluded
   ============================== */
const COUNTRIES_EU_SA: string[] = [
  // Europe
  "Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus","Belgium","Bosnia and Herzegovina","Bulgaria",
  "Croatia","Cyprus","Czechia","Denmark","Estonia","Finland","France","Georgia","Germany","Greece","Hungary",
  "Iceland","Ireland","Italy","Kazakhstan","Kosovo","Latvia","Liechtenstein","Lithuania","Luxembourg","Malta",
  "Moldova","Monaco","Montenegro","Netherlands","North Macedonia","Norway","Poland","Portugal","Romania",
  "San Marino","Serbia","Slovakia","Slovenia","Spain","Sweden","Switzerland","Turkey","Ukraine",
  "United Kingdom","Vatican City",
  // South America
  "Argentina","Bolivia","Brazil","Chile","Colombia","Ecuador","Guyana","Paraguay","Peru","Suriname","Uruguay",
  "Venezuela"
].sort((a,b)=>a.localeCompare(b));

/* ==============================
   NCAA Division I schools — Alphabetical (men’s D‑I)
   (Tell me if anything is missing/renamed; realignments happen.)
   ============================== */
const NCAA_ALL_DI_UNSORTED: string[] = [
  "Abilene Christian","Air Force","Akron","Alabama","Alabama A&M","Alabama State","Albany","Alcorn State",
  "American","Appalachian State","Arizona","Arizona State","Arkansas","Arkansas State","Arkansas–Pine Bluff",
  "Army West Point","Auburn","Austin Peay",
  "Ball State","Baylor","Belmont","Bellarmine","Bethune–Cookman","Binghamton","Boise State","Boston College",
  "Boston University","Bowling Green","Bradley","Brigham Young (BYU)","Brown","Bryant","Bucknell","Buffalo",
  "Butler",
  "Cal Poly","Cal State Bakersfield","Cal State Fullerton","California Baptist","Campbell","Canisius",
  "Central Arkansas","Central Connecticut State","Central Michigan","Charleston","Charleston Southern",
  "Charlotte","Chattanooga","Chicago State","Cincinnati","Clemson","Cleveland State","Coastal Carolina",
  "Colgate","Colorado","Colorado State","Columbia","Connecticut","Coppin State","Cornell","Creighton",
  "CSUN","Dartmouth","Davidson","Dayton","Delaware","Delaware State","Denver","DePaul","Detroit Mercy",
  "Drake","Drexel","Duke","Duquesne",
  "East Carolina","Eastern Illinois","Eastern Kentucky","Eastern Michigan","Eastern Washington","Elon",
  "Evansville",
  "Fairfield","Fairleigh Dickinson","Florida","Florida A&M","Florida Atlantic (FAU)",
  "Florida Gulf Coast (FGCU)","Florida International","Fordham","Fresno State","Furman",
  "Gardner–Webb","George Mason","George Washington","Georgetown","Georgia","Georgia Southern","Georgia State",
  "Georgia Tech","Gonzaga","Grand Canyon","Grambling State","Green Bay",
  "Hampton","Harvard","Hawai'i","High Point","Hofstra","Holy Cross","Houston","Houston Christian","Howard",
  "Idaho","Idaho State","Illinois","Illinois State","Incarnate Word","Indiana","Indiana State","Iona","Iowa",
  "Iowa State","IUPUI",
  "Jackson State","Jacksonville","Jacksonville State","James Madison","Kansas","Kansas City","Kansas State",
  "Kennesaw State","Kent State","Kentucky",
  "La Salle","Lafayette","Lamar","Le Moyne","Lehigh","Liberty","Lindenwood","LIU","Little Rock","Long Beach State",
  "Longwood","Louisiana","Louisiana Tech","Louisiana–Monroe","Louisville","Loyola (MD)","Loyola Chicago",
  "Loyola Marymount","LSU","Lipscomb",
  "Maine","Manhattan","Marist","Marquette","Marshall","Maryland","Maryland Eastern Shore","Massachusetts",
  "McNeese","Memphis","Mercer","Merrimack","Miami (FL)","Miami (OH)","Michigan","Michigan State","Middle Tennessee",
  "Milwaukee","Minnesota","Mississippi State","Mississippi Valley State","Missouri","Missouri State","Monmouth (NJ)",
  "Montana","Montana State","Morehead State","Morgan State","Mount St. Mary's","Murray State",
  "Navy","NC State","Nebraska","Nevada","New Hampshire","New Mexico","New Mexico State","New Orleans",
  "Niagara","Nicholls","NJIT","Norfolk State","North Alabama","North Carolina","North Dakota","North Dakota State",
  "North Florida","North Texas","Northeastern","Northern Arizona","Northern Colorado","Northern Illinois",
  "Northern Iowa","Northwestern","Northwestern State","Notre Dame",
  "Oakland","Ohio","Ohio State","Oklahoma","Oklahoma State","Old Dominion","Ole Miss","Omaha","Oral Roberts",
  "Oregon","Oregon State","Pacific","Penn","Penn State","Pepperdine","Pittsburgh","Portland","Portland State",
  "Prairie View A&M","Presbyterian","Princeton","Providence","Purdue","Purdue Fort Wayne",
  "Queens (NC)","Quinnipiac",
  "Radford","Rhode Island","Rice","Richmond","Rider","Robert Morris","Rutgers",
  "Sacramento State","Sacred Heart","Saint Francis (PA)","Saint Joseph's","Saint Louis","Saint Mary's (CA)",
  "Saint Peter's","Sam Houston","Samford","San Diego State","San Jose State","Santa Clara","Seattle U",
  "Seton Hall","Siena","SIU Edwardsville","SMU","South Alabama","South Carolina","South Carolina State",
  "South Dakota","South Dakota State","South Florida","Southeastern Louisiana","Southern (LA)","Southern Illinois",
  "Southern Miss","Southern Utah","St. Bonaventure","St. John's","St. Thomas (MN)",
  "Stanford","Stephen F. Austin","Stetson","Stonehill","Syracuse",
  "TCU","Temple","Tennessee","Tennessee State","Tennessee Tech","Texas","Texas A&M","Texas A&M–Commerce",
  "Texas A&M–Corpus Christi","Texas State","Texas Tech","The Citadel","Toledo","Towson","Troy","Tulane","Tulsa",
  "UAB","UC Davis","UC Irvine","UC Riverside","UC San Diego","UC Santa Barbara","UCF","UCLA","UIC",
  "UMass Lowell","UNLV","USC","USC Upstate","UT Arlington","UTEP","UT Martin","UTRGV","UTSA","Utah","Utah State",
  "Utah Tech","Utah Valley",
  "Valparaiso","Vanderbilt","VCU","Vermont","Villanova","Virginia","Virginia Tech","VMI",
  "Wagner","Wake Forest","Washington","Washington State","Weber State","West Virginia","Western Carolina",
  "Western Illinois","Western Kentucky","Western Michigan","Wichita State","William & Mary","Winthrop",
  "Wisconsin","Wofford","Wright State","Wyoming",
  "Xavier",
  "Yale","Youngstown State"
];
const NCAA_ALL_DI: string[] = [...NCAA_ALL_DI_UNSORTED].sort((a,b)=>a.localeCompare(b));

/* ==============================
   Jerseys: NFL position‑based
   ============================== */
const NFL_POS = ["QB","RB","WR","TE","OL","DL","LB","CB","S","K","P"];
const NBA_POS = ["PG","SG","G/F","SF","PF","F/C","C"];

// NFL jersey number rules (inclusive ranges)
const NFL_NUMBER_RANGES: Record<string, Array<[number, number]>> = {
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

/* ==============================
   Archetypes (realistic size bands)
   ============================== */
interface Archetype { label: string; hMin: number; hMax: number; wMin: number; wMax: number; }
const NFL_ARCH: Record<string, Archetype[]> = {
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
const NBA_ARCH: Record<string, Archetype[]> = {
  PG: [{ label: "Lead Guard", hMin: 72, hMax: 75, wMin: 170, wMax: 195 }],
  SG: [{ label: "Scoring Guard", hMin: 75, hMax: 78, wMin: 185, wMax: 210 }],
  "G/F": [{ label: "Combo Wing", hMin: 76, hMax: 79, wMin: 195, wMax: 220 }],
  SF: [{ label: "Two-Way Wing", hMin: 77, hMax: 80, wMin: 205, wMax: 230 }],
  PF: [{ label: "Stretch/Slasher PF", hMin: 79, hMax: 82, wMin: 220, wMax: 250 }],
  "F/C": [{ label: "Small-Ball 5", hMin: 80, hMax: 83, wMin: 230, wMax: 255 }],
  C:  [{ label: "Traditional 5", hMin: 82, hMax: 86, wMin: 240, wMax: 275 }],
};

/* ==============================
   Names (iconic surnames removed)
   ============================== */
const firstNamesUS = [
  "James","Michael","Christopher","Matthew","Andrew","Daniel","Joseph","Ryan","Brandon","Tyler",
  "Jacob","Ethan","Noah","Liam","Mason","Logan","Aiden","Elijah","Oliver","Carter",
  "Caleb","Jordan","Jason","Kevin","Jonathan","Anthony","Aaron","Nathan","Evan","Cole",
  "Dylan","Austin","Zachary","Shawn","Travis","Shane","Marcus","Justin","Bryce","Jaden",
  "Devin","Isaiah","Xavier","Jamal","Malik","Trey","Jayden","Miles","Jalen","Kyle"
];
const firstNamesIntl = [
  "Niko","Jonas","Dario","Pau","Marco","Thiago","Mateo","Pedro","Enzo","Leo","Hugo","Jules","Noel",
  "Anton","Roman","Milan","Emil","Maks","Ilya","Yuto","Daiki","Ren","Minho","Seojun","Arjun",
  "Kabir","Omar","Youssef","Amir","Ade","Tariq","Kwame","Soren","Magnus","Bjorn","Filip","Andrei",
  "Viktor","Tomas"
];
const lastNamesCommon = [
  "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez",
  "Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin",
  "Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson",
  "Walker","Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores",
  "Green","Adams","Nelson","Baker","Hall","Rivera","Campbell","Mitchell","Carter","Roberts"
];
const lastNamesIntl = [
  "Fernandez","Alvarez","Silva","Costa","Rossi","Moretti","Bianchi","Dubois","Lefevre","Kovacs",
  "Novak","Horvat","Popov","Ivanov","Vasilev","Kumar","Singh","Gupta","Hassan","Aziz","Amin","Ali",
  "Haddad","Yamamoto","Tanaka","Kim","Park","Choi","Santos","Reyes","Ibrahim","Mensah","Boateng",
  "Lund","Hansen","Petrov","Markovic","Iliev","Kowalski","Nowak"
];

/* ==============================
   Utils
   ============================== */
function rng(seed: number) {
  return function() {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pick<T>(arr: T[], r: () => number) { return arr[Math.floor(r() * arr.length)]; }
function toTitleCase(s: string) { return s.replace(/\b([a-z])/g, (m) => m.toUpperCase()); }
function inchesToFtIn(inches: number) { const ft = Math.floor(inches / 12); const inch = Math.round(inches % 12); return `${ft}'${inch}"`; }
function randRange(min: number, max: number, r: () => number) { return Math.round(min + (max - min) * r()); }
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }
function hash32(s: string) { let h=0x811c9dc5; for (let i=0;i<s.length;i++){h^=s.charCodeAt(i); h+= (h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24);} return h>>>0; }
function initials(name: string) { return name.split(/\s+/).slice(0,2).map(n=>n[0]?.toUpperCase()||"").join(""); }
function colorFromName(name: string) {
  const h = hash32(name);
  const hue = h % 360;
  const bg = `hsl(${hue} 70% 20%)`;
  const ring = `hsl(${hue} 85% 45%)`;
  return { bg, ring };
}
function isInRanges(n: number, ranges: Array<[number, number]>) {
  return ranges.some(([a,b]) => n >= a && n <= b);
}
function pickFromRanges(ranges: Array<[number, number]>, r: () => number) {
  const [a,b] = pick(ranges, r);
  return randRange(a, b, r);
}

/* ==============================
   Age helpers (sport‑specific ranges)
   ============================== */
function ageBoundsForSport(sp: Sport): {min:number; max:number} {
  return sp === "nba2k" ? { min: 18, max: 38 } : { min: 20, max: 40 };
}
function randomAgeForSport(sp: Sport, r: () => number): number {
  const { min, max } = ageBoundsForSport(sp);
  // Skew a bit younger but allow full range
  const roll = r();
  const target = roll < 0.7 ? randRange(min, Math.min(min + 5, max), r) : randRange(min, max, r);
  return clamp(target, min, max);
}

/* ==============================
   Component
   ============================== */
export default function PlayerNameGenerator() {
  // Controls
  const [sport, setSport] = useState<Sport>("madden");
  const [lockSport, setLockSport] = useState(false);

  const [position, setPosition] = useState<string>(""); // "" = Random
  const [lockPosition, setLockPosition] = useState(false);

  const [quantity, setQuantity] = useState<number>(1); // default = 1

  // Age controls (sport-specific ranges)
  const [useRandomAge, setUseRandomAge] = useState<boolean>(true); // default ON
  const { min: ageMinCurrent, max: ageMaxCurrent } = ageBoundsForSport(sport);
  const [manualAge, setManualAge] = useState<number>(Math.round((ageMinCurrent + ageMaxCurrent) / 2));
  const [lockAge, setLockAge] = useState<boolean>(false);

  const [manualNumber, setManualNumber] = useState<string>(""); // blank = Random
  const [lockNumber, setLockNumber] = useState(false);

  type OriginMode = "random" | "random_college" | "random_country" | "college" | "country";
  const [originMode, setOriginMode] = useState<OriginMode>("random");
  const [manualCollege, setManualCollege] = useState<string>(NCAA_ALL_DI[0] || "Abilene Christian");
  const [manualCountry, setManualCountry] = useState<string>(COUNTRIES_EU_SA[0]);
  const [lockOrigin, setLockOrigin] = useState(false);

  const [useRandomSize, setUseRandomSize] = useState<boolean>(true);
  const [heightFt, setHeightFt] = useState<number>(6);
  const [heightIn, setHeightIn] = useState<number>(2);
  const [weightLb, setWeightLb] = useState<number>(200);
  const [lockSize, setLockSize] = useState(false);

  const [seed, setSeed] = useState<string>("");

  const [rows, setRows] = useState<PlayerRow[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) as PlayerRow[] : [];
    } catch { return []; }
  });
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(rows)); }, [rows]);

  // Keep manualAge within the current sport's bounds when sport changes
  useEffect(() => {
    const { min, max } = ageBoundsForSport(sport);
    setManualAge(prev => clamp(prev, min, max));
  }, [sport]);

  // Seeded RNG
  const random = useMemo(() => {
    const base = seed.trim() ? Number(String(hash32(seed)) % 2 ** 32) : Math.floor(Math.random() * 2 ** 32);
    return rng(base);
  }, [seed, sport, position, quantity, useRandomSize, manualNumber, originMode, manualCollege, manualCountry,
      lockSport, lockPosition, lockNumber, lockOrigin, lockSize, useRandomAge, manualAge, lockAge]);

  // Names (NBA mixes in more intl)
  function poolFirst(): string[] {
    const base = [...firstNamesUS];
    if (sport === "nba2k") base.push(...firstNamesIntl);
    return base;
  }
  function poolLast(): string[] {
    const base = [...lastNamesCommon];
    if (sport === "nba2k") base.push(...lastNamesIntl);
    return base;
  }
  function makeName(r: () => number) {
    const first = pick(poolFirst(), r);
    const last = pick(poolLast(), r);
    return toTitleCase(`${first} ${last}`);
  }

  function chooseArchetype(sp: Sport, pos: string, r: () => number): { label: string; h: number; w: number } {
    const table = sp === "madden" ? NFL_ARCH : NBA_ARCH;
    const list = (table as any)[pos] || (Object.values(table)[0] as Archetype[]);
    const a = pick(list, r);
    const h = clamp(randRange(a.hMin, a.hMax, r), a.hMin - 1, a.hMax + 1);
    const w = Math.round(clamp(randRange(a.wMin, a.wMax, r), a.wMin - 10, a.wMax + 10));
    return { label: a.label, h, w };
  }

  function randomHand(r: () => number): Hand { return r() < 0.85 ? "Right" : "Left"; }

  // Pos lists
  const positionChoices = sport === "madden" ? NFL_POS : NBA_POS;

  function allowedNFLNumberForPos(pos: string, r: () => number) {
    const ranges = NFL_NUMBER_RANGES[pos] || [[0,99]];
    return pickFromRanges(ranges, r);
  }
  function normalizeManualNumber(sp: Sport, pos: string, input: string, r: () => number) {
    const n = Math.max(0, Math.min(99, Math.floor(Number(input) || 0)));
    if (sp === "nba2k") return n; // NBA allows 0–99
    const ranges = NFL_NUMBER_RANGES[pos] || [[0,99]];
    return isInRanges(n, ranges) ? n : pickFromRanges(ranges, r);
  }
  function resolveNumber(r: () => number, sp: Sport, pos: string): number {
    if (manualNumber.trim() !== "") return normalizeManualNumber(sp, pos, manualNumber, r);
    if (sp === "nba2k") return randRange(0, 99, r);
    return allowedNFLNumberForPos(pos, r);
  }

  // Origin resolution
  function resolveOrigin(r: () => number): { type: "college"|"country"; value: string } {
    if (lockOrigin) {
      switch (originMode) {
        case "college": return { type: "college", value: manualCollege };
        case "country": return { type: "country", value: manualCountry };
        case "random_college": return { type: "college", value: pick(NCAA_ALL_DI, r) };
        case "random_country": return { type: "country", value: pick(COUNTRIES_EU_SA, r) };
        case "random":
        default:
          if (r() < 0.2) return { type: "country", value: pick(COUNTRIES_EU_SA, r) };
          return { type: "college", value: pick(NCAA_ALL_DI, r) };
      }
    }
    // Unlocked: per player
    switch (originMode) {
      case "college": return { type: "college", value: manualCollege };
      case "country": return { type: "country", value: manualCountry };
      case "random_college": return { type: "college", value: pick(NCAA_ALL_DI, r) };
      case "random_country": return { type: "country", value: pick(COUNTRIES_EU_SA, r) };
      case "random":
      default:
        if (r() < 0.2) return { type: "country", value: pick(COUNTRIES_EU_SA, r) };
        return { type: "college", value: pick(NCAA_ALL_DI, r) };
    }
  }

  // Size resolution
  function resolveSize(r: () => number, sp: Sport, pos: string): { label: string; h: number; w: number } {
    if (lockSize) {
      if (useRandomSize) return chooseArchetype(sp, pos, r);
      const inches = Math.max(58, Math.min(90, heightFt * 12 + heightIn));
      const w = Math.max(140, Math.min(380, Math.round(weightLb)));
      return { label: "Manual", h: inches, w };
    }
    if (useRandomSize) return chooseArchetype(sp, pos, r);
    const inches = Math.max(58, Math.min(90, heightFt * 12 + heightIn));
    const w = Math.max(140, Math.min(380, Math.round(weightLb)));
    return { label: "Manual", h: inches, w };
  }

  // Age resolution
  function resolveAge(r: () => number, sp: Sport): number {
    if (useRandomAge) return randomAgeForSport(sp, r);
    const { min, max } = ageBoundsForSport(sp);
    return clamp(Math.round(manualAge), min, max);
  }

  function resolveSport(_r: () => number, prior?: Sport): Sport {
    return lockSport ? (prior ?? sport) : sport;
  }
  function resolvePosition(r: () => number, sp: Sport): string {
    if (lockPosition) return position || (sp === "madden" ? NFL_POS[0] : NBA_POS[0]);
    return position || pick(sp === "madden" ? NFL_POS : NBA_POS, r);
  }

  function generate() {
    const r = random;
    const out: PlayerRow[] = [];
    const globalSet = new Set(rows.map(n => n.name.toLowerCase()));
    const batchSet = new Set<string>();

    const batchSport = resolveSport(r);
    const batchPos = lockPosition ? resolvePosition(r, batchSport) : undefined;
    const batchOrigin = lockOrigin ? resolveOrigin(r) : undefined;
    const batchSizeSeed = lockSize ? resolveSize(r, batchSport, batchPos || resolvePosition(r, batchSport)) : undefined;
    const batchAge = lockAge ? resolveAge(r, batchSport) : undefined;

    let attempts = 0;
    while (out.length < quantity && attempts < quantity * 300) {
      attempts++;
      const sp = batchSport;
      const pos = batchPos ?? resolvePosition(r, sp);

      const name = makeName(r);
      const key = name.toLowerCase();
      if (globalSet.has(key) || batchSet.has(key)) continue;

      const size = batchSizeSeed ?? resolveSize(r, sp, pos);
      const origin = batchOrigin ?? resolveOrigin(r);
      const number = resolveNumber(r, sp, pos);
      const age = batchAge ?? resolveAge(r, sp);

      out.push({
        id: cryptoId(),
        name,
        sport: sp,
        position: pos,
        archetype: size.label,
        heightIn: size.h,
        weightLb: size.w,
        age,
        dominantHand: randomHand(r),
        jerseyNumber: number,
        originType: origin.type,
        collegeOrCountry: origin.value,
      });

      batchSet.add(key);
      globalSet.add(key);
    }

    setRows(prev => [...out, ...prev]);
  }

  function cryptoId() {
    // @ts-ignore
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return (crypto as any).randomUUID();
    return Math.random().toString(36).slice(2);
  }

  function copyList() {
    const text = rows.map((n, i) =>
      `${i+1}. ${n.name} — ${n.sport.toUpperCase()} ${n.position} • ${n.archetype} • ${inchesToFtIn(n.heightIn)}, ${n.weightLb} lb • Age ${n.age} • ${n.dominantHand}-hand • #${n.jerseyNumber} • ${n.collegeOrCountry}`
    ).join("\n");
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  }
  function clearAll() { setRows([]); }

  const lockBadge = (locked: boolean) => (
    <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded border ${locked ? "border-green-500 text-green-400" : "border-gray-600 text-gray-400"}`}>
      {locked ? "LOCKED" : "unlocked"}
    </span>
  );

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8 space-y-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Sports Player Name Generator</h1>
          <p className="text-sm text-gray-400">Choose/lock values, then generate. Names are unique across the whole save.</p>
        </div>
        <div className="flex gap-2">
          <button className="border rounded px-3 py-2" onClick={copyList}>Copy</button>
          <button className="border rounded px-3 py-2 text-red-400" onClick={clearAll}>Clear</button>
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-2xl border border-gray-700 shadow-sm bg-gray-900">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Generator Settings</h2>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sport/Game + lock */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Sport/Game {lockBadge(lockSport)}
            </label>
            <div className="flex items-center gap-2">
              <select className="w-full border rounded px-2 py-2 bg-gray-900" value={sport} onChange={(e)=>setSport(e.target.value as Sport)} disabled={lockSport}>
                <option value="madden">Madden (NFL)</option>
                <option value="nba2k">NBA 2K</option>
              </select>
              <label className="text-xs flex items-center gap-1">
                <input type="checkbox" checked={lockSport} onChange={e=>setLockSport(e.target.checked)} /> Lock
              </label>
            </div>
          </div>

          {/* Position + lock */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Position {lockBadge(lockPosition)}
            </label>
            <div className="flex items-center gap-2">
              <select className="w-full border rounded px-2 py-2 bg-gray-900" value={position} onChange={(e)=>setPosition(e.target.value)} disabled={lockPosition}>
                <option value="">Random</option>
                {(sport==="madden"?NFL_POS:NBA_POS).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <label className="text-xs flex items-center gap-1">
                <input type="checkbox" checked={lockPosition} onChange={e=>setLockPosition(e.target.checked)} /> Lock
              </label>
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              min={1}
              max={200}
              className="w-28 border rounded px-2 py-2 bg-gray-900"
              value={quantity}
              onChange={e=>setQuantity(Math.max(1, Math.min(200, Number(e.target.value)||1)))}
            />
          </div>

          {/* Age (sport-specific) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Age (NBA 18–38, Madden 20–40) {lockBadge(lockAge)}
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={useRandomAge}
                onChange={e=>setUseRandomAge(e.target.checked)}
                disabled={lockAge}
              />
              Use Random Age
            </label>
            {!useRandomAge && (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  className="w-24 border rounded px-2 py-2 bg-gray-900"
                  min={ageMinCurrent}
                  max={ageMaxCurrent}
                  value={manualAge}
                  onChange={e=>{
                    const v = Number(e.target.value)||0;
                    const { min, max } = ageBoundsForSport(sport);
                    setManualAge(clamp(v, min, max));
                  }}
                  disabled={lockAge}
                />
                <span className="text-xs text-gray-400">
                  Range: {ageMinCurrent}–{ageMaxCurrent}
                </span>
                <label className="text-xs flex items-center gap-1 ml-2">
                  <input type="checkbox" checked={lockAge} onChange={e=>setLockAge(e.target.checked)} /> Lock
                </label>
              </div>
            )}
            {useRandomAge && (
              <div className="mt-2">
                <label className="text-xs flex items-center gap-1">
                  <input type="checkbox" checked={lockAge} onChange={e=>setLockAge(e.target.checked)} /> Lock random age (pick once per batch)
                </label>
              </div>
            )}
          </div>

          {/* Jersey # + lock */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Jersey Number (blank = Random) {lockBadge(lockNumber)}
            </label>
            <div className="flex items-center gap-2">
              <input
                className="w-full border rounded px-2 py-2 bg-gray-900"
                placeholder={sport==="nba2k"?"0–99":"varies by NFL position"}
                value={manualNumber}
                onChange={e=>setManualNumber(e.target.value)}
                disabled={lockNumber && manualNumber.trim()!==""}
              />
              <label className="text-xs flex items-center gap-1">
                <input type="checkbox" checked={lockNumber} onChange={e=>setLockNumber(e.target.checked)} /> Lock
              </label>
            </div>
            {sport==="madden" && (
              <p className="text-xs text-gray-500 mt-1">
                NFL examples — QB: 0–19, RB: 0–44, WR: 0–19 or 80–89, TE: 40–49/80–89, OL: 50–79, DL: 50–79/90–99, LB: 0–59/90–99, DB: 0–49, K/P: 0–19.
              </p>
            )}
          </div>

          {/* Origin + lock */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium">
              Origin {lockBadge(lockOrigin)}
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="origin" checked={originMode==="random"} onChange={()=>setOriginMode("random")} disabled={lockOrigin}/> Random
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="origin" checked={originMode==="random_college"} onChange={()=>setOriginMode("random_college")} disabled={lockOrigin}/> Random College
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="origin" checked={originMode==="random_country"} onChange={()=>setOriginMode("random_country")} disabled={lockOrigin}/> Random Country
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="origin" checked={originMode==="college"} onChange={()=>setOriginMode("college")} disabled={lockOrigin}/> College
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="origin" checked={originMode==="country"} onChange={()=>setOriginMode("country")} disabled={lockOrigin}/> Country
              </label>
              <label className="text-xs flex items-center gap-1 ml-auto">
                <input type="checkbox" checked={lockOrigin} onChange={e=>setLockOrigin(e.target.checked)} /> Lock
              </label>
            </div>

            {originMode==="college" && (
              <div className="mt-2">
                <select className="w-full border rounded px-2 py-2 bg-gray-900" value={manualCollege} onChange={e=>setManualCollege(e.target.value)} disabled={lockOrigin}>
                  {NCAA_ALL_DI.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}

            {originMode==="country" && (
              <div className="mt-2">
                <select className="w-full border rounded px-2 py-2 bg-gray-900" value={manualCountry} onChange={e=>setManualCountry(e.target.value)} disabled={lockOrigin}>
                  {COUNTRIES_EU_SA.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* Size + lock */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Height & Weight {lockBadge(lockSize)}
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={useRandomSize} onChange={e=>setUseRandomSize(e.target.checked)} disabled={lockSize}/>
              Use Random (position archetype)
            </label>
            {!useRandomSize && (
              <div className="flex items-center gap-2 mt-2">
                <input type="number" className="w-20 border rounded px-2 py-2 bg-gray-900" value={heightFt} min={4} max={7} onChange={e=>setHeightFt(Number(e.target.value)||0)} disabled={lockSize}/>
                <span>ft</span>
                <input type="number" className="w-20 border rounded px-2 py-2 bg-gray-900" value={heightIn} min={0} max={11} onChange={e=>setHeightIn(Number(e.target.value)||0)} disabled={lockSize}/>
                <span>in</span>
                <input type="number" className="w-24 border rounded px-2 py-2 bg-gray-900" value={weightLb} min={140} max={380} onChange={e=>setWeightLb(Number(e.target.value)||0)} disabled={lockSize}/>
                <span>lb</span>
                <label className="text-xs flex items-center gap-1 ml-2">
                  <input type="checkbox" checked={lockSize} onChange={e=>setLockSize(e.target.checked)} /> Lock
                </label>
              </div>
            )}
            {useRandomSize && (
              <div className="mt-2">
                <label className="text-xs flex items-center gap-1">
                  <input type="checkbox" checked={lockSize} onChange={e=>setLockSize(e.target.checked)} /> Lock random size (pick once per batch)
                </label>
              </div>
            )}
          </div>

          {/* Seed */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Seed (optional)</label>
            <input className="w-full border rounded px-2 py-2 bg-gray-900" value={seed} onChange={e=>setSeed(e.target.value)} />
          </div>

          {/* Generate */}
          <div className="flex items-end">
            <button className="px-3 py-2 border rounded" onClick={generate}>Generate</button>
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="rounded-2xl border border-gray-700 shadow-sm bg-gray-900">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Generated Players ({rows.length})</h2>
        </div>
        <div className="p-4">
          {rows.length === 0 ? (
            <p className="text-sm text-gray-400">No players yet. Set your options and press <strong>Generate</strong>.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {rows.map((n) => {
                const { bg, ring } = colorFromName(n.name);
                return (
                  <div key={n.id} className="rounded-2xl border border-gray-700 p-3 flex gap-3 items-center">
                    {/* Portrait */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold border-2"
                      style={{ background: bg, borderColor: ring }}
                    >
                      {initials(n.name) || "??"}
                    </div>

                    {/* Info */}
                    <div className="min-w-0">
                      <div className="font-medium truncate">{n.name}</div>
                      <div className="text-xs text-gray-400 mt-1 flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full border border-gray-700">{n.sport.toUpperCase()}</span>
                        <span className="px-2 py-0.5 rounded-full border border-gray-700">{n.position}</span>
                        <span>{n.archetype}</span>
                        <span>•</span>
                        <span>{inchesToFtIn(n.heightIn)}, {n.weightLb} lb</span>
                        <span>•</span>
                        <span>Age {n.age}</span>
                        <span>•</span>
                        <span>#{n.jerseyNumber}</span>
                        <span>•</span>
                        <span>{n.collegeOrCountry}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
