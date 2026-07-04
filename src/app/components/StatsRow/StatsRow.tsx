import { CardData } from "../../types/CardData";
import { Layers, Trophy, Crown, TrendingUp } from "lucide-react";
export default function StatsRow({
  owned,
  totalValue,
  allCards,
}: {
  owned: CardData[];
  totalValue: number;
  allCards: number;
}) {
  return (
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
  );
}
