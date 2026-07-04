import { useEffect, useState } from "react";
import { CHAMPIONSHIPS } from "../data/Championships";
import { POSTS } from "../data/Posts";
import { CardData } from "../types/CardData";
import { Tab } from "../types/Tab";
import TCGdex from "@tcgdex/sdk";

import {
  Layers,
  Trophy,
  Zap,
  MapPin,
  Calendar,
  MessageSquare,
  ChevronRight,
  Crown,
  TrendingUp,
  Heart,
  Check,
  X,
} from "lucide-react";
import { TCGCard } from "../components/TCGCard/TCGCard";
import { tierColor } from "../functions/TierColor";
import { cn } from "../helpers/cn";
import { GROUPS } from "../data/Groups";

import { motion, AnimatePresence } from "motion/react";

export function HomePage({
  setTab,
  cards,
}: {
  setTab: (t: Tab) => void;
  cards: CardData[];
}) {
  const owned = cards.filter((c) => c.owned);
  const totalValue = owned.reduce((s, c) => s + c.value, 0);
  const featured = cards.find((c) => c.owned) ?? cards[0];
  const upcoming = CHAMPIONSHIPS.filter((c) => c.status === "upcoming").slice(
    0,
    3,
  );
  const recentPosts = POSTS.slice(0, 3);

  const [totalCards, setTotalCards] = useState<number | null>(null);

  const [selected, setSelected] = useState<CardData | null>(null);

  useEffect(() => {
    console.log("Selected card:", selected);
  }, [selected]);

  async function getAllCards() {
    const tcgdexall = new TCGdex("en");
    const card = await tcgdexall.card.list();
    setTotalCards(card.length);
  }

  getAllCards();

  const allCards: number = totalCards ?? 0;
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* hero banner */}
      <div
        className="relative rounded-2xl overflow-hidden border border-border"
        style={{
          background:
            "linear-gradient(135deg, #0d1120 0%, #1a0a2e 50%, #0d1120 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(255,203,5,0.08) 0%, transparent 65%)",
          }}
        />
        <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30">
              <Zap size={12} className="text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                Season 2025 · Active
              </span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black text-foreground leading-tight"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              Your Trainer
              <br />
              <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-muted-foreground text-base max-w-md">
              Track your collection, compete in championships, and connect with
              trainers worldwide.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setTab("collection")}
                className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors"
              >
                View Collection
              </button>
              <button
                onClick={() => setTab("championships")}
                className="px-5 py-2.5 rounded-lg bg-secondary border border-border text-foreground font-bold text-sm hover:bg-secondary/80 transition-colors"
              >
                Tournaments
              </button>
            </div>
          </div>
          <div className="w-40 md:w-48 flex-shrink-0">
            {featured ? <TCGCard card={featured} /> : null}
          </div>
        </div>
      </div>

      {/* stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Cards Owned",
            value: owned.length,
            icon: <Layers size={18} />,
            color: "#ffcb05",
            sub: `of ${allCards} tracked`,
          },
          {
            label: "Collection Value",
            value: `$${totalValue.toFixed(0)}`,
            icon: <TrendingUp size={18} />,
            color: "#10b981",
            sub: "+12% this month",
          },
          {
            label: "Championship Points",
            value: "1,240",
            icon: <Trophy size={18} />,
            color: "#a855f7",
            sub: "Season total",
          },
          {
            label: "World Ranking",
            value: "#347",
            icon: <Crown size={18} />,
            color: "#f97316",
            sub: "Top 5%",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-card p-5 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                {s.label}
              </span>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <p
              className="text-2xl font-black text-foreground"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              {s.value}
            </p>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* recent additions + upcoming events */}
      <div className="grid md:grid-cols-5 gap-6">
        {/* recent cards */}
        <div className="md:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2
              className="font-bold text-foreground"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              Recent Additions
            </h2>
            <button
              onClick={() => setTab("collection")}
              className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
            >
              See all <ChevronRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {cards
              .filter((c) => c.owned)
              .slice(0, 4)
              .map((c) => (
                <div
                  onClick={() => setSelected(c)}
                  key={c.id}
                  className="cursor-pointer"
                >
                  <TCGCard key={c.id} card={c} compact />
                </div>
              ))}
          </div>
        </div>

        {/* upcoming events */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2
              className="font-bold text-foreground"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              Upcoming Events
            </h2>
            <button
              onClick={() => setTab("championships")}
              className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
            >
              See all <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {upcoming.map((ev) => (
              <div
                key={ev.id}
                className="rounded-xl border border-border bg-card p-4 space-y-2 hover:border-primary/30 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {ev.name}
                  </p>
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0",
                      tierColor(ev.tier),
                    )}
                  >
                    {ev.tier}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {ev.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={11} />
                    {ev.loc}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">
                    {ev.prize}
                  </span>
                  {ev.reg && (
                    <span className="text-[10px] text-green-400 font-semibold flex items-center gap-1">
                      <Check size={10} />
                      Registered
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* card detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3
                    className="text-lg font-black text-foreground"
                    style={{ fontFamily: "'Exo 2', sans-serif" }}
                  >
                    {selected.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selected.set} · {selected.num}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="w-48 mx-auto mb-5">
                <TCGCard card={selected} />
              </div>
              <div className="space-y-3 text-sm">
                {[
                  ["Type", selected.type],
                  ["HP", `${selected.hp} HP`],
                  ["Rarity", selected.rarity],
                  ["Condition", selected.cond ?? "—"],
                  [
                    "PSA Grade",
                    selected.grade ? `PSA ${selected.grade}` : "Ungraded",
                  ],
                  ["Market Value", `$${selected.value.toFixed(2)}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-semibold text-foreground">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-5">
                <button className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                  List for Trade
                </button>
                <button className="px-4 py-2 rounded-lg bg-secondary border border-border text-sm font-semibold text-foreground">
                  Edit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* community activity */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            className="font-bold text-foreground"
            style={{ fontFamily: "'Exo 2', sans-serif" }}
          >
            Community Activity
          </h2>
          <button
            onClick={() => setTab("community")}
            className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
          >
            Join discussions <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-3">
          {recentPosts.map((p) => {
            const grp = GROUPS.find((g) => g.id === p.gid)!;
            return (
              <div
                key={p.id}
                className="rounded-xl border border-border bg-card p-4 hover:border-border/70 transition-colors cursor-pointer"
              >
                <div className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-foreground"
                    style={{
                      background: p.color + "40",
                      border: `1px solid ${p.color}50`,
                    }}
                  >
                    {p.init}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-foreground">
                        {p.user}
                      </span>
                      <span className="text-xs text-muted-foreground">in</span>
                      <span className="text-xs font-semibold text-primary">
                        {grp.name}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {p.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {p.body}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart size={11} />
                        {p.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={11} />
                        {p.replies}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
