import { MapPin, Calendar, ChevronRight, Check } from "lucide-react";
import { cn } from "../../helpers/cn";
import { tierColor } from "../../functions/TierColor";
import { Tab } from "../../types/Tab";

export function UpcomingEvents({
  setTab,
  upcoming,
}: {
  setTab: (tab: Tab) => void;
  upcoming: any[];
}) {
  return (
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
          className="text-xs cursor-pointer text-primary font-semibold hover:underline flex items-center gap-1 hover:opacity-80 transition-opacity"
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
              <span className="text-xs font-bold text-primary">{ev.prize}</span>
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
  );
}
