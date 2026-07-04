import { useEffect, useState } from "react";
import { CHAMPIONSHIPS } from "../data/Championships";
import { POSTS } from "../data/Posts";
import { CardData } from "../types/CardData";
import { Tab } from "../types/Tab";

import { getAllCards } from "../functions/GetAllCardsLength";
import StatsRow from "../components/StatsRow/StatsRow";
import { HeroBanner } from "../components/HeroBanner/HeroBanner";
import { UpcomingEvents } from "../components/UpcomingEvents/UpcomingEvents";
import { RecentCards } from "../components/RecentCards/RecentCards";
import CommunityActivity from "../components/CommunityActivity/CommunityActivity";

export function HomePage({
  setTab,
  cards,
}: {
  setTab: (t: Tab) => void;
  cards: CardData[];
}) {
  const owned = cards.filter((c) => c.owned);
  const totalValue = owned.reduce((s, c) => s + c.value, 0);
  const featured = cards.find((c) => c.owned) ?? cards[0];
  const upcoming = CHAMPIONSHIPS.filter((c) => c.status === "upcoming").slice(
    0,
    3,
  );
  const recentPosts = POSTS.slice(0, 3);

  const [totalCards, setTotalCards] = useState<number | null>(null);

  useEffect(() => {
    getAllCards().then(setTotalCards);
  }, []);

  const allCards: number = totalCards ?? 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* hero banner */}
      <HeroBanner featured={featured} setTab={setTab} />

      {/* stats row */}
      <StatsRow owned={owned} totalValue={totalValue} allCards={allCards} />

      {/* recent additions + upcoming events */}
      <div className="grid md:grid-cols-5 gap-6">
        {/* recent cards */}
        <RecentCards cards={cards} setTab={setTab} />
        {/* upcoming events */}
        <UpcomingEvents upcoming={upcoming} setTab={setTab} />
      </div>

      {/* community activity */}
      <CommunityActivity recentPosts={recentPosts} setTab={setTab} />
    </div>
  );
}
