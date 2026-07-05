import { TYPE_STYLE } from "../../data/TypeStyle";
import { CardData } from "../../types/CardData";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { rarityLabel } from "../../functions/RarityLabel";

import TypeIcon from "../TypeIcon/TypeIcon";

import { X } from "lucide-react";

export function TCGCard({
  card,
  compact = false,
  modal = true,
}: {
  card: CardData;
  compact?: boolean;
  modal?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState<CardData | null>(null);
  console.log("cards: ", card);
  return (
    <>
      <motion.div
        whileHover={{
          y: compact ? -4 : -10,
          scale: compact ? 1.02 : 1.04,
          rotateY: hovered ? 5 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className={`relative rounded-xl overflow-hidden cursor-pointer select-none background-image bg-[url(${card.img})]`}
        style={{
          aspectRatio: "63/88",
          // TODO: Adjust this functionality to use the actual card image from the API
          backgroundImage: `url(${card.img}) center/cover no-repeat`,
        }}
        onClick={() => modal && setSelected(card)}
      >
        {/* gradient base */}
        {/* <div
          className="absolute inset-0"
          style={{
            // background: `linear-gradient(145deg, ${card.gf}, ${card.gv} 55%, ${card.gt})`,
          }}
        /> */}

        {/* holographic shimmer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovered ? 0.35 : 0,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 45%, rgba(255,255,255,0.2) 100%)",
          }}
        />

        {/* inner glow ring */}
        <div
          className="absolute inset-0 rounded-xl border-2 pointer-events-none"
          style={{ borderColor: `${card.ac}50` }}
        />

        {/* top badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
          {card.grade && (
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: `${card.ac}30`, color: card.ac }}
            >
              PSA {card.grade}
            </span>
          )}
          {!card.owned && (
            <span className="ml-auto text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-black/50 text-slate-400 backdrop-blur-sm">
              Wishlist
            </span>
          )}
        </div>

        {/* center energy orb */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="rounded-full flex items-center justify-center opacity-25"
            style={{
              width: compact ? 44 : 64,
              height: compact ? 44 : 64,
              background: `radial-gradient(circle, ${card.ac}80, transparent)`,
              boxShadow: `0 0 ${compact ? 20 : 40}px ${card.ac}60`,
            }}
          >
            <TypeIcon type={card.type} size={compact ? 20 : 30} />
          </div>
        </div>

        {/* bottom info */}
        <div
          className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-6"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
          }}
        >
          <p
            className="font-extrabold text-white leading-tight drop-shadow"
            style={{ fontSize: compact ? 11 : 13 }}
          >
            {card.name}
          </p>
          {!compact && (
            <p className="text-[10px] text-white/55 mt-0.5">
              {card.set} · {card.num}
            </p>
          )}
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[9px] text-white/50">
              {rarityLabel(card.rarity)}
            </span>
            <span
              className="font-bold text-white/90"
              style={{ fontSize: compact ? 10 : 12 }}
            >
              ${card.value.toFixed(2)}
            </span>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3
                    className="text-lg font-black text-foreground"
                    style={{ fontFamily: "'Exo 2', sans-serif" }}
                  >
                    {selected.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selected.set} · {selected.num}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="w-48 mx-auto mb-5">
                <TCGCard card={selected} modal={false} />
              </div>
              <div className="space-y-3 text-sm">
                {[
                  ["Type", selected.type],
                  ["HP", `${selected.hp} HP`],
                  ["Rarity", selected.rarity],
                  ["Condition", selected.cond ?? "—"],
                  [
                    "PSA Grade",
                    selected.grade ? `PSA ${selected.grade}` : "Ungraded",
                  ],
                  ["Market Value", `$${selected.value.toFixed(2)}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-semibold text-foreground">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-5">
                <button className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                  List for Trade
                </button>
                <button className="px-4 py-2 rounded-lg bg-secondary border border-border text-sm font-semibold text-foreground">
                  Edit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
