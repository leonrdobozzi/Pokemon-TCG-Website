import { POSTS } from "../../data/Posts";
import { GROUPS } from "../../data/Groups";
import { MessageSquare, Heart, X, Plus } from "lucide-react";
import { cn } from "../../helpers/cn";
import { useState } from "react";

export function PostsFeed({
  activeGroup,
  setActiveGroup,
}: {
  activeGroup: number | null;
  setActiveGroup: (id: number | null) => void;
}) {
  const visiblePosts = activeGroup
    ? POSTS.filter((p) => p.gid === activeGroup)
    : POSTS;

  const group = GROUPS.find((g) => g.id === activeGroup);

  const [postLikes, setPostLikes] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(POSTS.map((p) => [p.id, p.liked])),
  );

  function toggleLike(id: number) {
    setPostLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="md:col-span-2 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          {group ? group.name : "All Activity"}
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
          <Plus size={14} /> New Post
        </button>
      </div>

      {/* new post input */}
      <div className="rounded-xl border border-border bg-card p-4 flex gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex-shrink-0 flex items-center justify-center text-xs font-bold text-primary">
          YO
        </div>
        <input
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          placeholder="Share something with the community…"
        />
      </div>

      {visiblePosts.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground text-sm">
          No posts yet. Be the first!
        </div>
      ) : (
        visiblePosts.map((p) => {
          const grp = GROUPS.find((g) => g.id === p.gid)!;
          const liked = postLikes[p.id];
          const likeCount =
            p.likes + (liked !== p.liked ? (liked ? 1 : -1) : 0);
          return (
            <div
              key={p.id}
              className="rounded-xl border border-border bg-card p-5 space-y-3 hover:border-border/70 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                  style={{
                    background: p.color + "30",
                    color: p.color,
                    border: `1px solid ${p.color}40`,
                  }}
                >
                  {p.init}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-foreground">
                      {p.user}
                    </span>
                    {!activeGroup && (
                      <>
                        <span className="text-xs text-muted-foreground">
                          in
                        </span>
                        <span className="text-xs font-semibold text-primary">
                          {grp.name}
                        </span>
                      </>
                    )}
                    <span className="text-xs text-muted-foreground ml-auto">
                      {p.time}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/85 mt-1.5 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 pt-1 border-t border-border/50">
                <button
                  onClick={() => toggleLike(p.id)}
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold transition-colors",
                    liked
                      ? "text-red-400"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Heart size={13} fill={liked ? "currentColor" : "none"} />
                  {likeCount}
                </button>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
                  <MessageSquare size={13} />
                  {p.replies} Replies
                </button>
                <button className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors font-semibold">
                  Share
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
