import { ReactElement, useState } from "react";
import { cn } from "../../helpers/cn";
import {
  Bell,
  Layers,
  Search,
  TrendingUp,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { Tab } from "../../types/Tab";

export function Header({
  setTab,
  tab,
}: {
  setTab: (tab: Tab) => void;
  tab: Tab;
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems: { id: Tab; label: string; icon: ReactElement }[] = [
    { id: "home", label: "Home", icon: <TrendingUp size={16} /> },
    { id: "collection", label: "Collection", icon: <Layers size={16} /> },
    { id: "championships", label: "Championships", icon: <Trophy size={16} /> },
    { id: "community", label: "Community", icon: <Users size={16} /> },
    { id: "profile", label: "Profile", icon: <User size={16} /> },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center h-14 gap-4">
          {/* logo */}
          <div className="flex items-center gap-2 flex-shrink-0 mr-2">
            <div className="w-7 h-7 rounded-full border-2 border-primary flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-primary" />
            </div>
            <span
              className="font-black text-foreground text-base hidden sm:block"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              Trainer<span className="text-primary">Hub</span>
            </span>
          </div>

          {/* tabs */}
          <div className=" flex items-center gap-1 flex-1 min-w-0 overflow-x-auto scrollbar-none">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className={cn(
                  "hover:opacity-80 cursor-pointer transition-opacity flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors flex-shrink-0",
                  tab === n.id
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                )}
              >
                {n.icon}
                <span className="hidden md:inline">{n.label}</span>
              </button>
            ))}
          </div>

          {/* right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Search size={16} />
            </button>
            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors relative">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>
            <button
              onClick={() => setTab("profile")}
              className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-black text-primary hover:bg-primary/30 transition-colors"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              YO
            </button>
          </div>
        </div>

        {/* search bar */}
      </div>
    </nav>
  );
}
