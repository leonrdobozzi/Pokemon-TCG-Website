import { useEffect, useState, type ReactElement } from "react";
import TCGdex, { Query } from "@tcgdex/sdk";

import { motion, AnimatePresence } from "motion/react";

import { buildCardDataFromApi } from "./functions/BuildCardDataFromApi";
import { CardData } from "./types/CardData";
import { Tab } from "./types/Tab";

import { HomePage } from "./pages/Home";
import { CollectionPage } from "./pages/Collection";
import { ChampionshipsPage } from "./pages/Championships";
import { CommunityPage } from "./pages/Community";
import { ProfilePage } from "./pages/Profile";
import Footer from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
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

  return (
    <div
      className="min-h-screen bg-background"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* navigation */}
      <Header setTab={setTab} tab={tab} />

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
