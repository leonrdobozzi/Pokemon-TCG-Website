import { useState } from "react";
import { POSTS } from "../data/Posts";
import { GROUPS } from "../data/Groups";

import { MessageSquare, Heart, X, Plus } from "lucide-react";
import { cn } from "../helpers/cn";

import { GroupIcon } from "../functions/GroupIcon";
import { GroupsSidebar } from "../components/GroupsSidebar/GroupsSidebar";
import { PostsFeed } from "../components/PostsFeed/PostsFeed";

export function CommunityPage() {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1
          className="text-3xl font-black text-foreground"
          style={{ fontFamily: "'Exo 2', sans-serif" }}
        >
          Community
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Connect with trainers, share knowledge, and find trades.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* groups sidebar */}
        <GroupsSidebar
          activeGroup={activeGroup}
          setActiveGroup={setActiveGroup}
        />

        {/* posts feed */}
        <PostsFeed activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
      </div>
    </div>
  );
}
