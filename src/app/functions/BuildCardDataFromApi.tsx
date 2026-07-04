import { TYPE_STYLE } from "../data/TypeStyle";
import { CardData } from "../types/CardData";

export async function buildCardDataFromApi(
  card: Record<string, any>,
  index: number,
): Promise<CardData> {
  const apiCard = card as Record<string, any>;

  const typeName =
    Array.isArray(apiCard.types) && apiCard.types.length
      ? apiCard.types[0]
      : "Colorless";
  const typeStyle = TYPE_STYLE[typeName] ?? TYPE_STYLE.Colorless;
  const setName =
    typeof apiCard.set === "string"
      ? apiCard.set
      : (apiCard.set?.name ?? "Unknown Set");
  const rarity =
    typeof apiCard.rarity === "string" ? apiCard.rarity : "Unknown";
  const hp = Number(apiCard.hp ?? 0);
  const price = Number(
    apiCard.pricing?.tcgplayer?.market ??
      apiCard.pricing?.cardmarket?.prices?.averageSellPrice ??
      0,
  );

  return {
    id: index + 1,
    name: apiCard.name ?? "Unknown Card",
    set: setName,
    num: String(apiCard.localId ?? `#${index + 1}`),
    type: typeName,
    rarity,
    hp: Number.isFinite(hp) ? hp : 0,
    value: price > 0 ? price : Math.max(5, (index + 1) * 3),
    owned: index < 6,
    cond: index < 6 ? "Near Mint" : null,
    grade: index === 1 ? 9 : null,
    gf: typeStyle.glow,
    gv: typeStyle.glow,
    gt: "#0f172a",
    ac: typeStyle.glow,
  };
}
