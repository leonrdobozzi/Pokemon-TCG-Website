import { POSTS } from "../../data/Posts";
import { GROUPS } from "../../data/Groups";
import { MessageSquare, Heart, X, Plus } from "lucide-react";
import { cn } from "../../helpers/cn";
import { useState } from "react";
import { PageSubtitle } from "../PageSubtitle/PageSubtitle";
import { PostCard } from "../PostCard/PostCard";
import { Group } from "../../types/Group";
import { Post } from "../../types/Post";

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

  const group = GROUPS.find((g: Group) => g.id === activeGroup);

  const [postLikes, setPostLikes] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(POSTS.map((p) => [p.id, p.liked])),
  );

  function toggleLike(id: number) {
    setPostLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="md:col-span-2 space-y-4">
      <div className="flex items-center justify-between">
        <PageSubtitle>{group ? group.name : "All Activity"}</PageSubtitle>
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
        visiblePosts.map((p: Post) => {
          const grp: Group = GROUPS.find((g) => g.id === p.gid)!;
          const liked = postLikes[p.id];
          const likeCount =
            p.likes + (liked !== p.liked ? (liked ? 1 : -1) : 0);
          return (
            <PostCard
              post={p}
              activeGroup={activeGroup}
              setActiveGroup={setActiveGroup}
              group={grp}
              liked={postLikes[p.id]}
              likeCount={likeCount}
              toggleLike={toggleLike}
              key={p.id}
            />
          );
        })
      )}
    </div>
  );
}
