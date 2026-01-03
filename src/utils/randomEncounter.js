import { RARITY_POOLS } from "../data/pokemonRarity";

export function getRandomEncounter() {
  const roll = Math.random() * 100;

  let pool;
  if (roll < 60) pool = "common";        // 60%
  else if (roll < 85) pool = "uncommon"; // 25%
  else if (roll < 97) pool = "rare";     // 12%
  else pool = "legendary";               // 3%

  const candidates = RARITY_POOLS[pool];
  const pokemonId =
    candidates[Math.floor(Math.random() * candidates.length)];

  return {
    pokemonId,
    rarity: pool
  };
}