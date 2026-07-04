import { useState } from "react";
import { CardFilter } from "../types/CardFilter";
import { CardData } from "../types/CardData";

import { Search, Filter, X, Plus } from "lucide-react";
import { cn } from "../helpers/cn";
import { TCGCard } from "../components/TCGCard/TCGCard";

export function CollectionPage({ cards }: { cards: CardData[] }) {
  const [filter, setFilter] = useState<CardFilter>("all");
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");

  const types = [
    "All",
    "Fire",
    "Lightning",
    "Psychic",
    "Dragon",
    "Darkness",
    "Fighting",
    "Colorless",
  ];
  const owned = cards.filter((c) => c.owned);
  const totalValue = owned.reduce((s, c) => s + c.value, 0);

  const filtered = cards.filter((c) => {
    if (filter === "owned" && !c.owned) return false;
    if (filter === "wishlist" && c.owned) return false;
    if (typeFilter !== "All" && c.type !== typeFilter) return false;
    if (
      search &&
      !c.name.toLowerCase().includes(search.toLowerCase()) &&
      !c.set.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div>
          <h1
            className="text-3xl font-black text-foreground"
            style={{ fontFamily: "'Exo 2', sans-serif" }}
          >
            My Collection
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {owned.length} cards · Total value{" "}
            <span className="text-primary font-bold">
              ${totalValue.toFixed(2)}
            </span>
          </p>
        </div>
        <div className="md:ml-auto flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
            <Plus size={14} /> Add Card
          </button>
        </div>
      </div>

      {/* filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cards…"
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          {(["all", "owned", "wishlist"] as CardFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors",
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary border border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={13} className="text-muted-foreground" />
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold transition-all",
                typeFilter === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary border border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* card grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {filtered.map((card) => (
          <TCGCard key={card.id} card={card} compact />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground text-sm">
            No cards match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
