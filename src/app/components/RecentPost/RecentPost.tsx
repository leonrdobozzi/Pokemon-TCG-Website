import { Heart, MessageSquare } from "lucide-react";
import { Post } from "../../types/Post";
import { Group } from "../../types/Group";

export default function RecentPost({
  post,
  group,
}: {
  post: Post;
  group: Group;
}) {
  return (
    <div
      key={post.id}
      className="rounded-xl border border-border bg-card p-4 hover:border-border/70 transition-colors cursor-pointer"
    >
      <div className="flex gap-3">
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-foreground"
          style={{
            background: post.color + "40",
            border: `1px solid ${post.color}50`,
          }}
        >
          {post.init}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-foreground">
              {post.user}
            </span>
            <span className="text-xs text-muted-foreground">in</span>
            <span className="text-xs font-semibold text-primary">
              {group.name}
            </span>
            <span className="text-xs text-muted-foreground ml-auto">
              {post.time}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.body}
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart size={11} />
              {post.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare size={11} />
              {post.replies}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
