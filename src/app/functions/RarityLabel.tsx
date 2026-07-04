export function rarityLabel(r: string) {
  if (r === "Rainbow Rare") return "✦ Rainbow";
  if (r === "Special Illustration Rare") return "★ SIR";
  if (r === "Alternate Art") return "◆ Alt Art";
  if (r === "Double Rare") return "◈ Double";
  return r;
}
