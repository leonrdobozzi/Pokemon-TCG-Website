import { Zap } from "lucide-react";
import { CardData } from "../../types/CardData";
import { Tab } from "../../types/Tab";
import { TCGCard } from "../TCGCard/TCGCard";

export function HeroBanner({
  featured,
  setTab,
}: {
  featured: CardData | null;
  setTab: (tab: Tab) => void;
}) {
  return (
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
  );
}
