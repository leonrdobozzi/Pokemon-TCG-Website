import { useEffect, useState } from "react";
import { CHAMPIONSHIPS } from "../data/Championships";
import { POSTS } from "../data/Posts";
import { CardData } from "../types/CardData";
import { Tab } from "../types/Tab";

import { Zap, MessageSquare, ChevronRight, Heart } from "lucide-react";
import { TCGCard } from "../components/TCGCard/TCGCard";
import { GROUPS } from "../data/Groups";
import { getAllCards } from "../functions/GetAllCardsLength";
import StatsRow from "../components/StatsRow/StatsRow";
import { HeroBanner } from "../components/HeroBanner/HeroBanner";
import { UpcomingEvents } from "../components/UpcomingEvents/UpcomingEvents";
import { RecentCards } from "../components/RecentCards/RecentCards";

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

  useEffect(() => {
    getAllCards().then(setTotalCards);
  }, []);

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
      <HeroBanner featured={featured} setTab={setTab} />

      {/* stats row */}
      <StatsRow owned={owned} totalValue={totalValue} allCards={allCards} />

      {/* recent additions + upcoming events */}
      <div className="grid md:grid-cols-5 gap-6">
        {/* recent cards */}
        <RecentCards cards={cards} setTab={setTab} />
        {/* upcoming events */}
        <UpcomingEvents upcoming={upcoming} setTab={setTab} />
      </div>

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
