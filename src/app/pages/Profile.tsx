import {
  Layers,
  Trophy,
  Users,
  Zap,
  Star,
  Package,
  Crown,
  TrendingUp,
  Settings,
  LogOut,
  Award,
} from "lucide-react";
import { CardData } from "../types/CardData";
import { cn } from "../helpers/cn";
import { CHAMPIONSHIPS } from "../data/Championships";

export function ProfilePage({ cards }: { cards: CardData[] }) {
  const owned = cards.filter((c) => c.owned);
  const totalValue = owned.reduce((s, c) => s + c.value, 0);
  const achievements = [
    {
      label: "First Championship",
      icon: <Trophy size={14} />,
      color: "#ffcb05",
      unlocked: true,
    },
    {
      label: "Top 8 Regionals",
      icon: <Award size={14} />,
      color: "#a855f7",
      unlocked: true,
    },
    {
      label: "League Champion",
      icon: <Crown size={14} />,
      color: "#f97316",
      unlocked: true,
    },
    {
      label: "Collector — 100 Cards",
      icon: <Layers size={14} />,
      color: "#10b981",
      unlocked: false,
    },
    {
      label: "1,000 CP Season",
      icon: <Star size={14} />,
      color: "#3b82f6",
      unlocked: false,
    },
    {
      label: "World Qualifier",
      icon: <Zap size={14} />,
      color: "#ec4899",
      unlocked: true,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* profile header */}
      <div
        className="relative rounded-2xl overflow-hidden border border-border"
        style={{ background: "linear-gradient(135deg, #0d1120, #1a0a2e)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(255,203,5,0.07) 0%, transparent 65%)",
          }}
        />
        <div className="relative p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div
            className="w-20 h-20 rounded-2xl bg-primary/20 border-2 border-primary/40 flex items-center justify-center text-2xl font-black text-primary"
            style={{ fontFamily: "'Exo 2', sans-serif" }}
          >
            YO
          </div>
          <div className="flex-1">
            <h1
              className="text-2xl font-black text-foreground"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              TrainerYou
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Master Trainer · Pacific Northwest · Member since Jan 2023
            </p>
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users size={13} />
                142 following
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users size={13} />
                891 followers
              </span>
              <span className="flex items-center gap-1.5 text-sm text-primary font-semibold">
                <Crown size={13} />
                World Ranked #347
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg bg-secondary border border-border text-sm font-semibold text-foreground hover:bg-secondary/80 transition-colors flex items-center gap-2">
              <Settings size={14} />
              Settings
            </button>
            <button className="px-4 py-2 rounded-lg bg-secondary border border-border text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* stats */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
            Stats
          </h2>
          {[
            {
              label: "Cards Owned",
              value: owned.length,
              icon: <Layers size={15} />,
              color: "#ffcb05",
            },
            {
              label: "Collection Value",
              value: `$${totalValue.toFixed(2)}`,
              icon: <TrendingUp size={15} />,
              color: "#10b981",
            },
            {
              label: "Season CP",
              value: "1,240",
              icon: <Trophy size={15} />,
              color: "#a855f7",
            },
            {
              label: "Tournament Wins",
              value: "3",
              icon: <Crown size={15} />,
              color: "#f97316",
            },
            {
              label: "Best Placement",
              value: "Top 4",
              icon: <Award size={15} />,
              color: "#3b82f6",
            },
            {
              label: "Trades Completed",
              value: "47",
              icon: <Package size={15} />,
              color: "#ec4899",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0"
            >
              <div className="flex items-center gap-2">
                <span style={{ color: s.color }}>{s.icon}</span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
              <span className="font-bold text-foreground text-sm">
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* achievements + history */}
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              Achievements
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {achievements.map((a) => (
                <div
                  key={a.label}
                  className={cn(
                    "rounded-xl border p-4 text-center space-y-2 transition-colors",
                    a.unlocked
                      ? "border-border bg-card"
                      : "border-border/30 bg-secondary/30 opacity-50",
                  )}
                >
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center"
                    style={{
                      background: a.unlocked ? `${a.color}20` : "transparent",
                      border: `1px solid ${a.color}30`,
                    }}
                  >
                    <span style={{ color: a.unlocked ? a.color : "#4b5563" }}>
                      {a.icon}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-foreground leading-tight">
                    {a.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {a.unlocked ? "Unlocked" : "Locked"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              Tournament History
            </h2>
            {CHAMPIONSHIPS.filter((c) => c.status === "completed").map((ev) => (
              <div
                key={ev.id}
                className="rounded-xl border border-border bg-card p-4 flex items-center gap-4"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: ev.place === 1 ? "#ffcb0520" : "#1e293b",
                  }}
                >
                  {ev.place === 1 ? (
                    <Crown size={18} className="text-primary" />
                  ) : (
                    <Trophy size={18} className="text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {ev.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{ev.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p
                    className={cn(
                      "text-sm font-bold",
                      ev.place === 1 ? "text-primary" : "text-foreground",
                    )}
                  >
                    {ev.place === 1 ? "Champion" : `#${ev.place} Place`}
                  </p>
                  <p className="text-xs text-muted-foreground">+{ev.cp} CP</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
