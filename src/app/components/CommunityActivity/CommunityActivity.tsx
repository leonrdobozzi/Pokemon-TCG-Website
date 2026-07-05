import { ChevronRight } from "lucide-react";
import { Tab } from "../../types/Tab";
import { GROUPS } from "../../data/Groups";
import RecentPost from "../RecentPost/RecentPost";
import { Post } from "../../types/Post";
import { Group } from "../../types/Group";

export default function CommunityActivity({
  recentPosts,
  setTab,
}: {
  recentPosts: Post[];
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
          className="text-xs cursor-pointer text-primary font-semibold hover:underline flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          Join discussions <ChevronRight size={12} />
        </button>
      </div>
      <div className="space-y-3">
        {recentPosts.map((p) => {
          const grp: Group = GROUPS.find((g) => g.id === p.gid)!;
          return <RecentPost key={p.id} post={p} group={grp} />;
        })}
      </div>
    </div>
  );
}
