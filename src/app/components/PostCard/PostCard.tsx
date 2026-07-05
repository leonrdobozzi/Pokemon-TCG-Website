import { cn } from "../../helpers/cn";
import { MessageSquare, Heart, X, Plus } from "lucide-react";
import { Post } from "../../types/Post";
import { Group } from "../../types/Group";

export function PostCard({
  post,
  activeGroup,
  setActiveGroup,
  group,
  liked,
  likeCount,
  toggleLike,
}: {
  post: Post;
  activeGroup: number | null;
  setActiveGroup: (id: number | null) => void;
  group: Group;
  liked: boolean;
  likeCount: number;
  toggleLike: (id: number) => void;
}) {
  return (
    <div
      key={post.id}
      className="rounded-xl border border-border bg-card p-5 space-y-3 hover:border-border/70 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
          style={{
            background: post.color + "30",
            color: post.color,
            border: `1px solid ${post.color}40`,
          }}
        >
          {post.init}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-foreground">
              {post.user}
            </span>
            {!activeGroup && (
              <>
                <span className="text-xs text-muted-foreground">in</span>
                <span className="text-xs font-semibold text-primary">
                  {group.name}
                </span>
              </>
            )}
            <span className="text-xs text-muted-foreground ml-auto">
              {post.time}
            </span>
          </div>
          <p className="text-sm text-foreground/85 mt-1.5 leading-relaxed">
            {post.body}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5 pt-1 border-t border-border/50">
        <button
          onClick={() => toggleLike(post.id as number)}
          className={cn(
            "flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer hover:opacity-80 transition-opacity",
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
          {post.replies} Replies
        </button>
        <button className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors font-semibold">
          Share
        </button>
      </div>
    </div>
  );
}
