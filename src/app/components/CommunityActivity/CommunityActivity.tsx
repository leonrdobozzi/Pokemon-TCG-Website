import { MessageSquare, ChevronRight, Heart } from "lucide-react";
import { Tab } from "../../types/Tab";
import { GROUPS } from "../../data/Groups";

export default function CommunityActivity({
  recentPosts,
  setTab,
}: {
  recentPosts: any[];
  setTab: (tab: Tab) => void;
}) {
  return (
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
  );
}
