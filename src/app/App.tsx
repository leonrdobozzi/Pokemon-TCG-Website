import { useEffect, useState, type ReactElement } from "react";
import TCGdex, { Query } from "@tcgdex/sdk";
import {
  Layers,
  Trophy,
  Users,
  User,
  Search,
  Bell,
  TrendingUp,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";

import { buildCardDataFromApi } from "./functions/BuildCardDataFromApi";
import { CardData } from "./types/CardData";
import { Tab } from "./types/Tab";

import { cn } from "./helpers/cn";
import { HomePage } from "./pages/Home";
import { CollectionPage } from "./pages/Collection";
import { ChampionshipsPage } from "./pages/Championships";
import { CommunityPage } from "./pages/Community";
import { ProfilePage } from "./pages/Profile";
import Footer from "./components/Footer/Footer";

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    let active = true;

    const loadCards = async () => {
      try {
        const tcgdex = new TCGdex("en");
        const response = (await tcgdex.card.list(
          Query.create().paginate(1, 50),
        )) as Array<Record<string, any>>;

        if (!active) return;

        const mapped = await Promise.all(
          response.map((card: Record<string, any>, index: number) =>
            fetch(
              `https://api.tcgdex.net/v2/en/cards/${card.id}?itemsPerPage=1&page=1`,
            )
              .then((res) => res.json())
              .then(async (data) => {
                return await buildCardDataFromApi(data, index);
              }),
          ),
        );

        setCards(mapped);
      } catch (error) {
        console.error("Failed to load cards from TCGdex", error);
        if (active) {
          setCards([]);
        }
      }
    };

    void loadCards();

    return () => {
      active = false;
    };
  }, []);

  const navItems: { id: Tab; label: string; icon: ReactElement }[] = [
    { id: "home", label: "Home", icon: <TrendingUp size={16} /> },
    { id: "collection", label: "Collection", icon: <Layers size={16} /> },
    { id: "championships", label: "Championships", icon: <Trophy size={16} /> },
    { id: "community", label: "Community", icon: <Users size={16} /> },
    { id: "profile", label: "Profile", icon: <User size={16} /> },
  ];

  return (
    <div
      className="min-h-screen bg-background"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* navigation */}
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
            <div className="flex items-center gap-1 flex-1 min-w-0 overflow-x-auto scrollbar-none">
              {navItems.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setTab(n.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors flex-shrink-0",
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

      {/* page content */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
          >
            {tab === "home" && <HomePage setTab={setTab} cards={cards} />}
            {tab === "collection" && <CollectionPage cards={cards} />}
            {tab === "championships" && <ChampionshipsPage />}
            {tab === "community" && <CommunityPage />}
            {tab === "profile" && <ProfilePage cards={cards} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
}
