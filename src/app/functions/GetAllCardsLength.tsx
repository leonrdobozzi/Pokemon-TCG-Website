import TCGdex from "@tcgdex/sdk";

export async function getAllCards() {
  const tcgdexall = new TCGdex("en");
  const card = await tcgdexall.card.list();
  return card.length;
}
