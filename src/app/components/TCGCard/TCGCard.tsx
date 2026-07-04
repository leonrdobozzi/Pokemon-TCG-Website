import { TYPE_STYLE } from "../../data/TypeStyle";
import { CardData } from "../../types/CardData";

import { motion } from "motion/react";
import { useState } from "react";
import { rarityLabel } from "../../functions/RarityLabel";

import TypeIcon from "../TypeIcon/TypeIcon";

export function TCGCard({
  card,
  compact = false,
}: {
  card: CardData;
  compact?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const ts = TYPE_STYLE[card.type] ?? TYPE_STYLE.Colorless;

  return (
    <motion.div
      whileHover={{
        y: compact ? -4 : -10,
        scale: compact ? 1.02 : 1.04,
        rotateY: hovered ? 5 : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-xl overflow-hidden cursor-pointer select-none"
      style={{ aspectRatio: "63/88" }}
    >
      {/* gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(145deg, ${card.gf}, ${card.gv} 55%, ${card.gt})`,
        }}
      />

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
          background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
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
  );
}
