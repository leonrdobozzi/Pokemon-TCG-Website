import { ChevronRight } from "lucide-react";
import { TCGCard } from "../TCGCard/TCGCard";
import { Tab } from "../../types/Tab";

export function RecentCards({
  cards,
  setTab,
}: {
  cards: any[];
  setTab: (tab: Tab) => void;
}) {
  return (
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
          className="text-xs cursor-pointer text-primary font-semibold hover:underline flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          See all <ChevronRight size={12} />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {cards
          .filter((c) => c.owned)
          .slice(0, 4)
          .map((c) => (
            <TCGCard key={c.id} card={c} compact />
          ))}
      </div>
    </div>
  );
}
