import { GroupIcon } from "../../functions/GroupIcon";
import { cn } from "../../helpers/cn";

export function GroupsSidebarCard({
  group,
  activeGroup,
  setActiveGroup,
}: {
  group: any;
  activeGroup: number | null;
  setActiveGroup: (id: number | null) => void;
}) {
  return (
    <button
      key={group.id}
      onClick={() => setActiveGroup(group.id === activeGroup ? null : group.id)}
      className={cn(
        "w-full text-left rounded-xl border p-4 space-y-2 transition-all cursor-pointer hover:opacity-80 transition-opacity",
        activeGroup === group.id
          ? "border-primary/50 bg-primary/10"
          : "border-border bg-card hover:border-border/70",
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "p-1.5 rounded-lg",
            activeGroup === group.id
              ? "bg-primary/20 text-primary"
              : "bg-secondary text-muted-foreground",
          )}
        >
          <GroupIcon icon={group.icon} />
        </span>
        <div className="min-w-0">
          <p
            className={cn(
              "text-sm font-bold truncate",
              activeGroup === group.id ? "text-foreground" : "text-foreground",
            )}
          >
            {group.name}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {group.members.toLocaleString()} members
          </p>
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground line-clamp-2">
        {group.desc}
      </p>
      <p className="text-[10px] text-muted-foreground">Active {group.last}</p>
    </button>
  );
}
