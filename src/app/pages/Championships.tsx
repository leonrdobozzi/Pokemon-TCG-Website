import { useState } from "react";
import { CHAMPIONSHIPS } from "../data/Championships";

import { Layers, Trophy, MapPin, Calendar, Crown, Check } from "lucide-react";
import { cn } from "../helpers/cn";
import { tierColor } from "../functions/TierColor";

export function ChampionshipsPage() {
  const [tierFilter, setTierFilter] = useState("All");
  const tiers = ["All", "World", "International", "Regional", "Online", "Cup"];

  const filtered = CHAMPIONSHIPS.filter(
    (c) => tierFilter === "All" || c.tier === tierFilter,
  );
  const totalCP = CHAMPIONSHIPS.filter((c) => c.status === "completed").reduce(
    (s, c) => s + c.cp,
    0,
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div>
          <h1
            className="text-3xl font-black text-foreground"
            style={{ fontFamily: "'Exo 2', sans-serif" }}
          >
            Championships
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Season 2024–2025 ·{" "}
            <span className="text-primary font-bold">
              {totalCP.toLocaleString()} CP earned
            </span>
          </p>
        </div>
        {/* CP bar */}
        <div className="md:ml-auto flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
          <Trophy size={16} className="text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Championship Points</p>
            <p className="font-black text-foreground text-sm">
              {totalCP.toLocaleString()} / 2,500 for Worlds
            </p>
          </div>
          <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${Math.min(100, totalCP / 25)}%` }}
            />
          </div>
        </div>
      </div>

      {/* tier tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {tiers.map((t) => (
          <button
            key={t}
            onClick={() => setTierFilter(t)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-semibold border transition-all",
              tierFilter === t
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* tournament list */}
      <div className="space-y-4">
        {filtered.map((ev) => (
          <div
            key={ev.id}
            className={cn(
              "rounded-2xl border p-5 md:p-6 transition-colors",
              ev.status === "upcoming"
                ? "bg-card border-border hover:border-primary/30"
                : "bg-secondary/40 border-border/50",
            )}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* left info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={cn(
                      "text-[11px] font-bold px-2.5 py-1 rounded-full border",
                      tierColor(ev.tier),
                    )}
                  >
                    {ev.tier}
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-semibold px-2.5 py-1 rounded-full border",
                      ev.status === "upcoming"
                        ? "bg-green-500/15 text-green-400 border-green-500/25"
                        : "bg-slate-500/15 text-slate-400 border-slate-500/25",
                    )}
                  >
                    {ev.status === "upcoming" ? "Upcoming" : "Completed"}
                  </span>
                  {ev.reg && (
                    <span className="text-[11px] font-semibold text-green-400 flex items-center gap-1">
                      <Check size={10} />
                      Registered
                    </span>
                  )}
                  {ev.place === 1 && (
                    <span className="text-[11px] font-bold text-yellow-300 flex items-center gap-1">
                      <Crown size={10} />
                      Champion!
                    </span>
                  )}
                  {ev.place && ev.place > 1 && (
                    <span className="text-[11px] font-semibold text-slate-300">
                      #{ev.place} Place
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {ev.name}
                </h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {ev.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} />
                    {ev.loc}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Layers size={12} />
                    {ev.format}
                  </span>
                </div>
              </div>

              {/* right stats */}
              <div className="flex items-center gap-6 flex-shrink-0">
                <div className="text-center">
                  <p
                    className="text-lg font-black text-primary"
                    style={{ fontFamily: "'Exo 2', sans-serif" }}
                  >
                    {ev.prize}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    Prize
                  </p>
                </div>
                <div className="text-center">
                  <p
                    className="text-lg font-black text-foreground"
                    style={{ fontFamily: "'Exo 2', sans-serif" }}
                  >
                    {ev.filled}/{ev.cap}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    Players
                  </p>
                </div>
                <div className="text-center">
                  <p
                    className="text-lg font-black text-foreground"
                    style={{ fontFamily: "'Exo 2', sans-serif" }}
                  >
                    {ev.cp}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    CP
                  </p>
                </div>
                {ev.status === "upcoming" && !ev.reg && (
                  <button className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors whitespace-nowrap">
                    Register
                  </button>
                )}
                {ev.status === "upcoming" && ev.reg && (
                  <button className="px-5 py-2.5 rounded-lg bg-secondary border border-border text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
                    View Details
                  </button>
                )}
              </div>
            </div>

            {/* capacity bar */}
            {ev.status === "upcoming" && (
              <div className="mt-4 space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Registration</span>
                  <span>{Math.round((ev.filled / ev.cap) * 100)}% full</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${(ev.filled / ev.cap) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
