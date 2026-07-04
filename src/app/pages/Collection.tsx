import { useState } from "react";
import { CardFilter } from "../types/CardFilter";
import { CardData } from "../types/CardData";

import { Search, Filter, X, Plus } from "lucide-react";
import { cn } from "../helpers/cn";
import { TCGCard } from "../functions/TCGCard";

import { motion, AnimatePresence } from "motion/react";

export function CollectionPage({ cards }: { cards: CardData[] }) {
  const [filter, setFilter] = useState<CardFilter>("all");
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<CardData | null>(null);

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
          <div key={card.id} onClick={() => setSelected(card)}>
            <TCGCard card={card} compact />
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground text-sm">
            No cards match your filters.
          </div>
        )}
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
    </div>
  );
}
