import { GROUPS } from "../../data/Groups";

import { X } from "lucide-react";
import { GroupsSidebarCard } from "../GroupsSidebarCard/GroupsSidebarCard";
import { PageSubtitle } from "../PageSubtitle/PageSubtitle";

export function GroupsSidebar({
  activeGroup,
  setActiveGroup,
}: {
  activeGroup: number | null;
  setActiveGroup: (id: number | null) => void;
}) {
  return (
    <div className="space-y-3">
      <PageSubtitle>Groups</PageSubtitle>
      {activeGroup && (
        <button
          onClick={() => setActiveGroup(null)}
          className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 bg-secondary border border-border"
        >
          <X size={13} /> Show all activity
        </button>
      )}
      {GROUPS.map((g) => (
        <GroupsSidebarCard
          key={g.id}
          group={g}
          activeGroup={activeGroup}
          setActiveGroup={setActiveGroup}
        />
      ))}
    </div>
  );
}
