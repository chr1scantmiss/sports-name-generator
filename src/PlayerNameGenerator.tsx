import React, { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import PlayerCard from "./components/PlayerCard";

import { Sport, Hand, PlayerRow, Archetype } from "./types";

import {
  ageBoundsForSport,
  randomAgeForSport,
  randomRookieAgeForSport,
  rookieAgeBoundsForSport,
} from "./lib/ages";

import { NFL_ARCH, NBA_ARCH } from "./lib/archetypes";
import { NCAA_ALL_DI } from "./lib/colleges";
import { COUNTRIES_EU_SA } from "./lib/countries";

import {
  NFL_POS,
  NBA_POS,
  NFL_RANGE_MIN,
  NFL_RANGE_MAX,
} from "./lib/positions";

import {
  NFL_NUMBER_RANGES,
  isInRanges,
  pickFromRanges,
  allowedNFLNumberForPos,
} from "./lib/jersey";

import {
  rng,
  pick,
  randRange,
  clamp,
  hash32,
  initials,
  colorFromName,
  inchesToFtIn,
} from "./lib/utils";

import { makeName, namePoolForOrigin } from "./lib/names";

/* ------------------------------------------------------------------ */

type OriginMode = "random" | "random_college" | "random_country" | "college" | "country";

const STORAGE_KEY = "sgnc_players_v17";

/* Height/weight picker from archetype tables */
function chooseArchetype(sp: Sport, pos: string, r: () => number): { label: string; h: number; w: number } {
  const table = sp === "madden" ? NFL_ARCH : NBA_ARCH;
  const fallbackList = Object.values(table)[0] as Archetype[];
  const list = (table as any)[pos] || fallbackList;
  const a = pick(list, r);
  const h = clamp(randRange(a.hMin, a.hMax, r), a.hMin - 1, a.hMax + 1);
  const w = Math.round(clamp(randRange(a.wMin, a.wMax, r), a.wMin - 10, a.wMax + 10));
  return { label: a.label, h, w };
}

function randomHand(r: () => number): Hand {
  return r() < 0.85 ? "Right" : "Left";
}

function normalizeManualNumber(sp: Sport, pos: string, input: string, r: () => number) {
  const n = Math.max(0, Math.min(99, Math.floor(Number(input) || 0)));
  if (sp === "nba2k") return n;
  const ranges = NFL_NUMBER_RANGES[pos] || [[0, 99]];
  return isInRanges(n, ranges) ? n : pickFromRanges(ranges, r);
}

/* NBA 60-player mix (simple even-ish distribution) */
function nbaDraftPositions(): string[] {
  const counts: Record<string, number> = { PG: 10, SG: 10, SF: 10, PF: 10, C: 10, "G/F": 5, "F/C": 5 };
  const list: string[] = [];
  Object.entries(counts).forEach(([pos, c]) => { for (let i = 0; i < c; i++) list.push(pos); });
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

/* Small helper for NFL ranges */
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Build NFL 224-player mix with your min/max per position and slight fluctuation */
function nflDraftPositions(): string[] {
  const order = ["OL","DL","WR","CB","LB","S","RB","TE","QB","K","P"] as const;
  const counts: Record<string, number> = {} as any;

  // 1) random within range per position
  for (const p of order) counts[p] = randInt(NFL_RANGE_MIN[p], NFL_RANGE_MAX[p]);

  // 2) keep RB >= TE if possible
  if (counts.RB < counts.TE) {
    const diff = counts.TE - counts.RB;
    const roomUpRB = NFL_RANGE_MAX.RB - counts.RB;
    const roomDownTE = counts.TE - NFL_RANGE_MIN.TE;
    const shift = Math.min(diff, roomUpRB, roomDownTE);
    if (shift > 0) { counts.RB += shift; counts.TE -= shift; }
  }

  // 3) normalize to exactly 224
  const target = 224;
  let sum = Object.values(counts).reduce((a, b) => a + b, 0);
  const removePref = [...order];
  const addPref = [...order];

  let guard = 10000;
  while (sum !== target && guard-- > 0) {
    if (sum > target) {
      let changed = false;
      for (const p of removePref) {
        const next = counts[p] - 1;
        if (next >= NFL_RANGE_MIN[p]) {
          if (p === "RB" && next < counts.TE) continue;
          counts[p] = next; sum--; changed = true; break;
        }
      }
      if (!changed) break;
    } else {
      let changed = false;
      for (const p of addPref) {
        const next = counts[p] + 1;
        if (next <= NFL_RANGE_MAX[p]) {
          if (p === "TE" && counts.RB < next) continue;
          counts[p] = next; sum++; changed = true; break;
        }
      }
      if (!changed) break;
    }
  }

  // 4) list + shuffle
  const list: string[] = [];
  for (const [pos, c] of Object.entries(counts)) for (let i = 0; i < c; i++) list.push(pos);
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

/* ------------------------------------------------------------------ */

export default function PlayerNameGenerator() {
  /* Controls */
  const [sport, setSport] = useState<Sport>("madden");
  const [lockSport, setLockSport] = useState(false);

  const [position, setPosition] = useState<string>(""); // "" = random
  const [lockPosition, setLockPosition] = useState(false);

  const [quantity, setQuantity] = useState<number>(1);
  const [draftClass, setDraftClass] = useState<boolean>(false);
  const [clearBefore, setClearBefore] = useState<boolean>(false);

  // Age controls
  const [useRandomAge, setUseRandomAge] = useState<boolean>(true);
  const { min: ageMinCurrent, max: ageMaxCurrent } = ageBoundsForSport(sport);
  const [manualAge, setManualAge] = useState<number>(Math.round((ageMinCurrent + ageMaxCurrent) / 2));
  const [lockAge, setLockAge] = useState<boolean>(false);

  const [manualNumber, setManualNumber] = useState<string>("");
  const [lockNumber, setLockNumber] = useState(false);

  const [originMode, setOriginMode] = useState<OriginMode>("random");
  const [manualCollege, setManualCollege] = useState<string>("Abilene Christian");
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
      return raw ? (JSON.parse(raw) as PlayerRow[]) : [];
    } catch { return []; }
  });
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(rows)); }, [rows]);

  // Last batch breakdown
  const [lastBatch, setLastBatch] = useState<{ total: number; counts: Record<string, number> } | null>(null);

  // keep manualAge within current sport bounds when sport changes
  useEffect(() => {
    const { min, max } = ageBoundsForSport(sport);
    setManualAge(prev => clamp(prev, min, max));
  }, [sport]);

  // seeded rng (changes when seed/locks change to keep “batch seed” feel)
  const random = useMemo(() => {
    const base = seed.trim() ? Number(String(hash32(seed)) % 2 ** 32) : Math.floor(Math.random() * 2 ** 32);
    return rng(base);
  }, [
    seed, sport, position, quantity, useRandomSize, manualNumber, originMode, manualCollege, manualCountry,
    lockSport, lockPosition, lockNumber, lockOrigin, lockSize, useRandomAge, manualAge, lockAge, draftClass, clearBefore
  ]);

  /* Origin helpers */
  function resolveOrigin(r: () => number): { type: "college" | "country"; value: string } {
    const pickCollege = () => ({ type: "college" as const, value: pick(NCAA_ALL_DI, r) });
    const pickCountry = () => ({ type: "country" as const, value: pick(COUNTRIES_EU_SA, r) });

    if (lockOrigin) {
      switch (originMode) {
        case "college": return { type: "college", value: manualCollege };
        case "country": return { type: "country", value: manualCountry };
        case "random_college": return pickCollege();
        case "random_country": return pickCountry();
        case "random":
        default: return r() < 0.2 ? pickCountry() : pickCollege();
      }
    }
    switch (originMode) {
      case "college": return { type: "college", value: manualCollege };
      case "country": return { type: "country", value: manualCountry };
      case "random_college": return pickCollege();
      case "random_country": return pickCountry();
      case "random":
      default: return r() < 0.2 ? pickCountry() : pickCollege();
    }
  }

  /* Size & ages */
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

  function resolveAge(r: () => number, sp: Sport): number {
    if (draftClass) return randomRookieAgeForSport(sp, r);
    if (useRandomAge) return randomAgeForSport(sp, r);
    const { min, max } = ageBoundsForSport(sp);
    return clamp(Math.round(manualAge), min, max);
  }

  function resolveNumber(r: () => number, sp: Sport, pos: string): number {
    if (manualNumber.trim() !== "") return normalizeManualNumber(sp, pos, manualNumber, r);
    if (sp === "nba2k") return randRange(0, 99, r);
    return allowedNFLNumberForPos(pos, r);
  }

  function resolveSport(): Sport {
    return lockSport ? sport : sport; // (kept for symmetry / future multi-sport random)
  }
  function resolvePosition(r: () => number, sp: Sport): string {
    if (draftClass) return ""; // handled by draft allocations
    if (lockPosition) return position || (sp === "madden" ? NFL_POS[0] : NBA_POS[0]);
    return position || pick(sp === "madden" ? NFL_POS : NBA_POS, r);
  }

  /* Generate! */
  function generate() {
    const r = random;
    const out: PlayerRow[] = [];
    const globalSet = new Set(rows.map(n => n.name.toLowerCase()));
    const batchSet = new Set<string>();

    const sp = resolveSport();
    const targetCount = draftClass ? (sp === "nba2k" ? 60 : 224) : quantity;
    const draftPositions = draftClass ? (sp === "nba2k" ? nbaDraftPositions() : nflDraftPositions()) : null;

    const batchOrigin = lockOrigin ? resolveOrigin(r) : undefined;
    const batchAge = draftClass ? undefined : (lockAge ? resolveAge(r, sp) : undefined);
    const batchSizeSeed = lockSize && !draftClass
      ? resolveSize(r, sp, (position || (sp === "madden" ? NFL_POS[0] : NBA_POS[0])))
      : undefined;

    let attempts = 0;
    while (out.length < targetCount && attempts < targetCount * 500) {
      attempts++;

      const pos = draftClass
        ? (draftPositions as string[])[out.length]
        : resolvePosition(r, sp);

      const origin = batchOrigin ?? resolveOrigin(r);
      const name = makeName(r, origin);
      const key = name.toLowerCase();
      if (globalSet.has(key) || batchSet.has(key)) continue;

      const size = batchSizeSeed ?? resolveSize(r, sp, pos || (sp === "madden" ? NFL_POS[0] : NBA_POS[0]));
      const number = resolveNumber(r, sp, pos || (sp === "madden" ? NFL_POS[0] : NBA_POS[0]));
      const age = draftClass ? resolveAge(r, sp) : (batchAge ?? resolveAge(r, sp));

      out.push({
        id: cryptoId(),
        name,
        sport: sp,
        position: pos || (sp === "madden" ? NFL_POS[0] : NBA_POS[0]),
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

    // position breakdown for the batch header
    const counts: Record<string, number> = {};
    for (const p of out.map(o => o.position)) counts[p] = (counts[p] || 0) + 1;
    setLastBatch({ total: out.length, counts });

    if (clearBefore) setRows(out);
    else setRows(prev => [...out, ...prev]);
  }

  function cryptoId() {
    // @ts-ignore
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return (crypto as any).randomUUID();
    return Math.random().toString(36).slice(2);
  }

  function copyList() {
    const text = rows.map((n, i) =>
      `${i + 1}. ${n.name} — ${n.sport.toUpperCase()} ${n.position} • ${n.archetype} • ${inchesToFtIn(n.heightIn)}, ${n.weightLb} lb • Age ${n.age} • ${n.dominantHand}-hand • #${n.jerseyNumber} • ${n.collegeOrCountry}`
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

  function renderBreakdown() {
    if (!lastBatch || lastBatch.total === 0) return null;
    const entries = Object.entries(lastBatch.counts).sort((a, b) => b[1] - a[1]).map(([pos, c]) => `${pos} ${c}`);
    return <span className="text-xs text-gray-300">Last batch: {lastBatch.total} • {entries.join(" • ")}</span>;
  }

  /* UI */
  const { min: rookieMin, max: rookieMax } = rookieAgeBoundsForSport(sport);

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8 space-y-6 text-white">
      <Header onCopy={copyList} onClear={clearAll} />

      {/* Controls */}
      <div className="rounded-2xl border border-gray-700 shadow-sm bg-gray-900">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Generator Settings</h2>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sport/Game */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              <span className="inline-flex items-center gap-2">
                <img src="/logo.png" alt="USNG Logo" className="w-5 h-5 object-contain rounded" />
                <span>Sport/Game</span>
              </span>
              {lockBadge(lockSport)}
            </label>
            <div className="flex items-center gap-2">
              <select
                className="w-full border rounded px-2 py-2 bg-gray-900"
                value={sport}
                onChange={(e) => setSport(e.target.value as Sport)}
                disabled={lockSport || draftClass}
              >
                <option value="madden">Madden (NFL)</option>
                <option value="nba2k">NBA 2K</option>
              </select>
              <label className="text-xs flex items-center gap-1">
                <input type="checkbox" checked={lockSport} onChange={(e) => setLockSport(e.target.checked)} disabled={draftClass} /> Lock
              </label>
            </div>
          </div>

          {/* Position */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Position {draftClass ? <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded border border-blue-500 text-blue-400">Draft Class controls mix</span> : lockBadge(lockPosition)}
            </label>
            <div className="flex items-center gap-2">
              <select
                className="w-full border rounded px-2 py-2 bg-gray-900"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                disabled={lockPosition || draftClass}
              >
                <option value="">Random</option>
                {(sport === "madden" ? NFL_POS : NBA_POS).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <label className="text-xs flex items-center gap-1">
                <input type="checkbox" checked={lockPosition} onChange={(e) => setLockPosition(e.target.checked)} disabled={draftClass} /> Lock
              </label>
            </div>
          </div>

          {/* Quantity & Draft */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Quantity & Draft</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={200}
                className="w-28 border rounded px-2 py-2 bg-gray-900 disabled:opacity-50"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(200, Number(e.target.value) || 1)))}
                disabled={draftClass}
              />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={draftClass} onChange={(e) => setDraftClass(e.target.checked)} />
                Complete Draft Class ({sport === "nba2k" ? "60 players" : "224 players"})
              </label>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <input type="checkbox" checked={clearBefore} onChange={(e) => setClearBefore(e.target.checked)} />
              <span>Clear before generate</span>
            </div>
            {draftClass && (
              <p className="text-xs text-gray-400">Rookie ages auto‑set ({sport === "nba2k" ? `${rookieMin}–${rookieMax}` : `${rookieMin}–${rookieMax}`} yrs). Position mix uses your ranges.</p>
            )}
          </div>

          {/* Age */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Age {draftClass ? <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded border border-blue-500 text-blue-400">Rookie range locked</span> : lockBadge(lockAge)}
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={useRandomAge}
                onChange={(e) => setUseRandomAge(e.target.checked)}
                disabled={draftClass || lockAge}
              />
              Use Random Age
            </label>
            {!useRandomAge && !draftClass && (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  className="w-24 border rounded px-2 py-2 bg-gray-900"
                  min={ageMinCurrent}
                  max={ageMaxCurrent}
                  value={manualAge}
                  onChange={(e) => {
                    const v = Number(e.target.value) || 0;
                    const { min, max } = ageBoundsForSport(sport);
                    setManualAge(clamp(v, min, max));
                  }}
                  disabled={lockAge}
                />
                <span className="text-xs text-gray-400">Range: {ageMinCurrent}–{ageMaxCurrent}</span>
                <label className="text-xs flex items-center gap-1 ml-2">
                  <input type="checkbox" checked={lockAge} onChange={(e) => setLockAge(e.target.checked)} /> Lock
                </label>
              </div>
            )}
            {useRandomAge && !draftClass && (
              <div className="mt-2">
                <label className="text-xs flex items-center gap-1">
                  <input type="checkbox" checked={lockAge} onChange={(e) => setLockAge(e.target.checked)} /> Lock random age (pick once per batch)
                </label>
              </div>
            )}
          </div>

          {/* Jersey # */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Jersey Number (blank = Random) {lockBadge(lockNumber)}</label>
            <div className="flex items-center gap-2">
              <input
                className="w-full border rounded px-2 py-2 bg-gray-900"
                placeholder={sport === "nba2k" ? "0–99" : "varies by NFL position"}
                value={manualNumber}
                onChange={(e) => setManualNumber(e.target.value)}
                disabled={lockNumber && manualNumber.trim() !== ""}
              />
              <label className="text-xs flex items-center gap-1">
                <input type="checkbox" checked={lockNumber} onChange={(e) => setLockNumber(e.target.checked)} /> Lock
              </label>
            </div>
            {sport === "madden" && (
              <p className="text-xs text-gray-500 mt-1">
                NFL — QB: 0–19, RB: 0–44, WR: 0–19/80–89, TE: 40–49/80–89, OL: 50–79, DL: 50–79/90–99, LB: 0–59/90–99,
                DB: 0–49, K/P: 0–19.
              </p>
            )}
          </div>

          {/* Origin */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium">Origin {lockBadge(lockOrigin)}</label>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="origin" checked={originMode === "random"} onChange={() => setOriginMode("random")} disabled={lockOrigin} /> Random
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="origin" checked={originMode === "random_college"} onChange={() => setOriginMode("random_college")} disabled={lockOrigin} /> Random College
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="origin" checked={originMode === "random_country"} onChange={() => setOriginMode("random_country")} disabled={lockOrigin} /> Random Country
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="origin" checked={originMode === "college"} onChange={() => setOriginMode("college")} disabled={lockOrigin} /> College
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="origin" checked={originMode === "country"} onChange={() => setOriginMode("country")} disabled={lockOrigin} /> Country
              </label>
              <label className="text-xs flex items-center gap-1 ml-auto">
                <input type="checkbox" checked={lockOrigin} onChange={(e) => setLockOrigin(e.target.checked)} /> Lock
              </label>
            </div>

            {originMode === "college" && (
              <div className="mt-2">
                <select
                  className="w-full border rounded px-2 py-2 bg-gray-900"
                  value={manualCollege}
                  onChange={(e) => setManualCollege(e.target.value)}
                  disabled={lockOrigin}
                >
                  {NCAA_ALL_DI.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}

            {originMode === "country" && (
              <div className="mt-2">
                <select
                  className="w-full border rounded px-2 py-2 bg-gray-900"
                  value={manualCountry}
                  onChange={(e) => setManualCountry(e.target.value)}
                  disabled={lockOrigin}
                >
                  {COUNTRIES_EU_SA.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* Size */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Height & Weight {lockBadge(lockSize)}</label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={useRandomSize} onChange={(e) => setUseRandomSize(e.target.checked)} disabled={lockSize} />
              Use Random (position archetype)
            </label>
            {!useRandomSize && (
              <div className="flex items-center gap-2 mt-2">
                <input type="number" className="w-20 border rounded px-2 py-2 bg-gray-900" value={heightFt} min={4} max={7} onChange={(e) => setHeightFt(Number(e.target.value) || 0)} disabled={lockSize} />
                <span>ft</span>
                <input type="number" className="w-20 border rounded px-2 py-2 bg-gray-900" value={heightIn} min={0} max={11} onChange={(e) => setHeightIn(Number(e.target.value) || 0)} disabled={lockSize} />
                <span>in</span>
                <input type="number" className="w-24 border rounded px-2 py-2 bg-gray-900" value={weightLb} min={140} max={380} onChange={(e) => setWeightLb(Number(e.target.value) || 0)} disabled={lockSize} />
                <span>lb</span>
                <label className="text-xs flex items-center gap-1 ml-2">
                  <input type="checkbox" checked={lockSize} onChange={(e) => setLockSize(e.target.checked)} /> Lock
                </label>
              </div>
            )}
            {useRandomSize && (
              <div className="mt-2">
                <label className="text-xs flex items-center gap-1">
                  <input type="checkbox" checked={lockSize} onChange={(e) => setLockSize(e.target.checked)} /> Lock random size (pick once per batch)
                </label>
              </div>
            )}
          </div>

          {/* Seed */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Seed (optional)</label>
            <input className="w-full border rounded px-2 py-2 bg-gray-900" value={seed} onChange={(e) => setSeed(e.target.value)} />
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
          {renderBreakdown()}
        </div>

        <div className="p-4">
          {rows.length === 0 ? (
            <p className="text-sm text-gray-400">No players yet. Set your options and press <strong>Generate</strong>.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {rows.map((n) => (
                <PlayerCard key={n.id} player={n} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
