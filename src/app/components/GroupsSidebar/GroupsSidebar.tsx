import { GroupIcon } from "../../functions/GroupIcon";
import { cn } from "../../helpers/cn";
import { GROUPS } from "../../data/Groups";

import { X } from "lucide-react";

export function GroupsSidebar({
  activeGroup,
  setActiveGroup,
}: {
  activeGroup: number | null;
  setActiveGroup: (id: number | null) => void;
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
        Groups
      </h2>
      {activeGroup && (
        <button
          onClick={() => setActiveGroup(null)}
          className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 bg-secondary border border-border"
        >
          <X size={13} /> Show all activity
        </button>
      )}
      {GROUPS.map((g) => (
        <button
          key={g.id}
          onClick={() => setActiveGroup(g.id === activeGroup ? null : g.id)}
          className={cn(
            "w-full text-left rounded-xl border p-4 space-y-2 transition-all",
            activeGroup === g.id
              ? "border-primary/50 bg-primary/10"
              : "border-border bg-card hover:border-border/70",
          )}
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "p-1.5 rounded-lg",
                activeGroup === g.id
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary text-muted-foreground",
              )}
            >
              <GroupIcon icon={g.icon} />
            </span>
            <div className="min-w-0">
              <p
                className={cn(
                  "text-sm font-bold truncate",
                  activeGroup === g.id ? "text-foreground" : "text-foreground",
                )}
              >
                {g.name}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {g.members.toLocaleString()} members
              </p>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground line-clamp-2">
            {g.desc}
          </p>
          <p className="text-[10px] text-muted-foreground">Active {g.last}</p>
        </button>
      ))}
    </div>
  );
}
