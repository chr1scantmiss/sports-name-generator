import React from "react";
import { inchesToFtIn, colorFromName, initials } from "../lib/utils";
import type { PlayerRow } from "../types";

export default function PlayerCard({ p }: { p: PlayerRow }) {
  const { bg, ring } = colorFromName(p.name);

  return (
    <div className="rounded-2xl border border-gray-700 p-3 flex gap-3 items-center">
      {/* Portrait bubble */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold border-2"
        style={{ background: bg, borderColor: ring }}
        aria-label={`Avatar for ${p.name}`}
      >
        {initials(p.name) || "??"}
      </div>

      {/* Info */}
      <div className="min-w-0">
        <div className="font-medium truncate">{p.name}</div>
        <div className="text-xs text-gray-400 mt-1 flex flex-wrap items-center gap-2">
          <span className="px-2 py-0.5 rounded-full border border-gray-700">
            {p.sport.toUpperCase()}
          </span>
          <span className="px-2 py-0.5 rounded-full border border-gray-700">
            {p.position}
          </span>
          <span>{p.archetype}</span>
          <span>•</span>
          <span>
            {inchesToFtIn(p.heightIn)}, {p.weightLb} lb
          </span>
          <span>•</span>
          <span>Age {p.age}</span>
          <span>•</span>
          <span>#{p.jerseyNumber}</span>
          <span>•</span>
          <span>{p.collegeOrCountry}</span>
        </div>
      </div>
    </div>
  );
}
