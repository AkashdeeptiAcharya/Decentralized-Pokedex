import { TYPE_COLORS } from "./typeColors";

export const POKEMON_DATA = {1: { name: "Bulbasaur", type: "Grass/Poison", color: TYPE_COLORS.Grass },
  2: { name: "Ivysaur", type: "Grass/Poison", color: TYPE_COLORS.Grass },
  3: { name: "Venusaur", type: "Grass/Poison", color: TYPE_COLORS.Grass },

  4: { name: "Charmander", type: "Fire", color: TYPE_COLORS.Fire },
  5: { name: "Charmeleon", type: "Fire", color: TYPE_COLORS.Fire },
  6: { name: "Charizard", type: "Fire/Flying", color: TYPE_COLORS.Fire },

  7: { name: "Squirtle", type: "Water", color: TYPE_COLORS.Water },
  8: { name: "Wartortle", type: "Water", color: TYPE_COLORS.Water },
  9: { name: "Blastoise", type: "Water", color: TYPE_COLORS.Water },

  10: { name: "Caterpie", type: "Bug", color: TYPE_COLORS.Bug },
  11: { name: "Metapod", type: "Bug", color: TYPE_COLORS.Bug },
  12: { name: "Butterfree", type: "Bug/Flying", color: TYPE_COLORS.Bug },

  13: { name: "Weedle", type: "Bug/Poison", color: TYPE_COLORS.Bug },
  14: { name: "Kakuna", type: "Bug/Poison", color: TYPE_COLORS.Bug },
  15: { name: "Beedrill", type: "Bug/Poison", color: TYPE_COLORS.Bug },

  16: { name: "Pidgey", type: "Normal/Flying", color: TYPE_COLORS.Flying },
  17: { name: "Pidgeotto", type: "Normal/Flying", color: TYPE_COLORS.Flying },
  18: { name: "Pidgeot", type: "Normal/Flying", color: TYPE_COLORS.Flying },

  19: { name: "Rattata", type: "Normal", color: TYPE_COLORS.Normal },
  20: { name: "Raticate", type: "Normal", color: TYPE_COLORS.Normal },

  21: { name: "Spearow", type: "Normal/Flying", color: TYPE_COLORS.Flying },
  22: { name: "Fearow", type: "Normal/Flying", color: TYPE_COLORS.Flying },

  23: { name: "Ekans", type: "Poison", color: TYPE_COLORS.Poison },
  24: { name: "Arbok", type: "Poison", color: TYPE_COLORS.Poison },

  25: { name: "Pikachu", type: "Electric", color: TYPE_COLORS.Electric },
  26: { name: "Raichu", type: "Electric", color: TYPE_COLORS.Electric },

  27: { name: "Sandshrew", type: "Ground", color: TYPE_COLORS.Ground },
  28: { name: "Sandslash", type: "Ground", color: TYPE_COLORS.Ground },

  29: { name: "Nidoran♀", type: "Poison", color: TYPE_COLORS.Poison },
  30: { name: "Nidorina", type: "Poison", color: TYPE_COLORS.Poison },
  31: { name: "Nidoqueen", type: "Poison/Ground", color: TYPE_COLORS.Poison },

  32: { name: "Nidoran♂", type: "Poison", color: TYPE_COLORS.Poison },
  33: { name: "Nidorino", type: "Poison", color: TYPE_COLORS.Poison },
  34: { name: "Nidoking", type: "Poison/Ground", color: TYPE_COLORS.Poison },

  35: { name: "Clefairy", type: "Fairy", color: TYPE_COLORS.Fairy },
  36: { name: "Clefable", type: "Fairy", color: TYPE_COLORS.Fairy },

  37: { name: "Vulpix", type: "Fire", color: TYPE_COLORS.Fire },
  38: { name: "Ninetales", type: "Fire", color: TYPE_COLORS.Fire },

  39: { name: "Jigglypuff", type: "Normal/Fairy", color: TYPE_COLORS.Fairy },
  40: { name: "Wigglytuff", type: "Normal/Fairy", color: TYPE_COLORS.Fairy },

  41: { name: "Zubat", type: "Poison/Flying", color: TYPE_COLORS.Poison },
  42: { name: "Golbat", type: "Poison/Flying", color: TYPE_COLORS.Poison },

  43: { name: "Oddish", type: "Grass/Poison", color: TYPE_COLORS.Grass },
  44: { name: "Gloom", type: "Grass/Poison", color: TYPE_COLORS.Grass },
  45: { name: "Vileplume", type: "Grass/Poison", color: TYPE_COLORS.Grass },

  46: { name: "Paras", type: "Bug/Grass", color: TYPE_COLORS.Bug },
  47: { name: "Parasect", type: "Bug/Grass", color: TYPE_COLORS.Bug },

  48: { name: "Venonat", type: "Bug/Poison", color: TYPE_COLORS.Bug },
  49: { name: "Venomoth", type: "Bug/Poison", color: TYPE_COLORS.Bug },

  50: { name: "Diglett", type: "Ground", color: TYPE_COLORS.Ground },
  51: { name: "Dugtrio", type: "Ground", color: TYPE_COLORS.Ground },

  52: { name: "Meowth", type: "Normal", color: TYPE_COLORS.Normal },
  53: { name: "Persian", type: "Normal", color: TYPE_COLORS.Normal },

  54: { name: "Psyduck", type: "Water", color: TYPE_COLORS.Water },
  55: { name: "Golduck", type: "Water", color: TYPE_COLORS.Water },

  56: { name: "Mankey", type: "Fighting", color: TYPE_COLORS.Fighting },
  57: { name: "Primeape", type: "Fighting", color: TYPE_COLORS.Fighting },

  58: { name: "Growlithe", type: "Fire", color: TYPE_COLORS.Fire },
  59: { name: "Arcanine", type: "Fire", color: TYPE_COLORS.Fire },

  60: { name: "Poliwag", type: "Water", color: TYPE_COLORS.Water },
  61: { name: "Poliwhirl", type: "Water", color: TYPE_COLORS.Water },
  62: { name: "Poliwrath", type: "Water/Fighting", color: TYPE_COLORS.Water },

  63: { name: "Abra", type: "Psychic", color: TYPE_COLORS.Psychic },
  64: { name: "Kadabra", type: "Psychic", color: TYPE_COLORS.Psychic },
  65: { name: "Alakazam", type: "Psychic", color: TYPE_COLORS.Psychic },

  66: { name: "Machop", type: "Fighting", color: TYPE_COLORS.Fighting },
  67: { name: "Machoke", type: "Fighting", color: TYPE_COLORS.Fighting },
  68: { name: "Machamp", type: "Fighting", color: TYPE_COLORS.Fighting },

  69: { name: "Bellsprout", type: "Grass/Poison", color: TYPE_COLORS.Grass },
  70: { name: "Weepinbell", type: "Grass/Poison", color: TYPE_COLORS.Grass },
  71: { name: "Victreebel", type: "Grass/Poison", color: TYPE_COLORS.Grass },

  72: { name: "Tentacool", type: "Water/Poison", color: TYPE_COLORS.Water },
  73: { name: "Tentacruel", type: "Water/Poison", color: TYPE_COLORS.Water },

  74: { name: "Geodude", type: "Rock/Ground", color: TYPE_COLORS.Rock },
  75: { name: "Graveler", type: "Rock/Ground", color: TYPE_COLORS.Rock },
  76: { name: "Golem", type: "Rock/Ground", color: TYPE_COLORS.Rock },

  77: { name: "Ponyta", type: "Fire", color: TYPE_COLORS.Fire },
  78: { name: "Rapidash", type: "Fire", color: TYPE_COLORS.Fire },

  79: { name: "Slowpoke", type: "Water/Psychic", color: TYPE_COLORS.Water },
  80: { name: "Slowbro", type: "Water/Psychic", color: TYPE_COLORS.Water },

  81: { name: "Magnemite", type: "Electric/Steel", color: TYPE_COLORS.Electric },
  82: { name: "Magneton", type: "Electric/Steel", color: TYPE_COLORS.Electric },

  83: { name: "Farfetch’d", type: "Normal/Flying", color: TYPE_COLORS.Flying },

  84: { name: "Doduo", type: "Normal/Flying", color: TYPE_COLORS.Flying },
  85: { name: "Dodrio", type: "Normal/Flying", color: TYPE_COLORS.Flying },

  86: { name: "Seel", type: "Water", color: TYPE_COLORS.Water },
  87: { name: "Dewgong", type: "Water/Ice", color: TYPE_COLORS.Water },

  88: { name: "Grimer", type: "Poison", color: TYPE_COLORS.Poison },
  89: { name: "Muk", type: "Poison", color: TYPE_COLORS.Poison },

  90: { name: "Shellder", type: "Water", color: TYPE_COLORS.Water },
  91: { name: "Cloyster", type: "Water/Ice", color: TYPE_COLORS.Water },

  92: { name: "Gastly", type: "Ghost/Poison", color: TYPE_COLORS.Ghost },
  93: { name: "Haunter", type: "Ghost/Poison", color: TYPE_COLORS.Ghost },
  94: { name: "Gengar", type: "Ghost/Poison", color: TYPE_COLORS.Ghost },

  95: { name: "Onix", type: "Rock/Ground", color: TYPE_COLORS.Rock },

  96: { name: "Drowzee", type: "Psychic", color: TYPE_COLORS.Psychic },
  97: { name: "Hypno", type: "Psychic", color: TYPE_COLORS.Psychic },

  98: { name: "Krabby", type: "Water", color: TYPE_COLORS.Water },
  99: { name: "Kingler", type: "Water", color: TYPE_COLORS.Water },

  100: { name: "Voltorb", type: "Electric", color: TYPE_COLORS.Electric },
  101: { name: "Electrode", type: "Electric", color: TYPE_COLORS.Electric },

  102: { name: "Exeggcute", type: "Grass/Psychic", color: TYPE_COLORS.Grass },
  103: { name: "Exeggutor", type: "Grass/Psychic", color: TYPE_COLORS.Grass },

  104: { name: "Cubone", type: "Ground", color: TYPE_COLORS.Ground },
  105: { name: "Marowak", type: "Ground", color: TYPE_COLORS.Ground },

  106: { name: "Hitmonlee", type: "Fighting", color: TYPE_COLORS.Fighting },
  107: { name: "Hitmonchan", type: "Fighting", color: TYPE_COLORS.Fighting },

  108: { name: "Lickitung", type: "Normal", color: TYPE_COLORS.Normal },

  109: { name: "Koffing", type: "Poison", color: TYPE_COLORS.Poison },
  110: { name: "Weezing", type: "Poison", color: TYPE_COLORS.Poison },

  111: { name: "Rhyhorn", type: "Ground/Rock", color: TYPE_COLORS.Ground },
  112: { name: "Rhydon", type: "Ground/Rock", color: TYPE_COLORS.Ground },

  113: { name: "Chansey", type: "Normal", color: TYPE_COLORS.Normal },

  114: { name: "Tangela", type: "Grass", color: TYPE_COLORS.Grass },

  115: { name: "Kangaskhan", type: "Normal", color: TYPE_COLORS.Normal },

  116: { name: "Horsea", type: "Water", color: TYPE_COLORS.Water },
  117: { name: "Seadra", type: "Water", color: TYPE_COLORS.Water },

  118: { name: "Goldeen", type: "Water", color: TYPE_COLORS.Water },
  119: { name: "Seaking", type: "Water", color: TYPE_COLORS.Water },

  120: { name: "Staryu", type: "Water", color: TYPE_COLORS.Water },
  121: { name: "Starmie", type: "Water/Psychic", color: TYPE_COLORS.Water },

  122: { name: "Mr. Mime", type: "Psychic/Fairy", color: TYPE_COLORS.Psychic },

  123: { name: "Scyther", type: "Bug/Flying", color: TYPE_COLORS.Bug },

  124: { name: "Jynx", type: "Ice/Psychic", color: TYPE_COLORS.Ice },

  125: { name: "Electabuzz", type: "Electric", color: TYPE_COLORS.Electric },

  126: { name: "Magmar", type: "Fire", color: TYPE_COLORS.Fire },

  127: { name: "Pinsir", type: "Bug", color: TYPE_COLORS.Bug },

  128: { name: "Tauros", type: "Normal", color: TYPE_COLORS.Normal },

  129: { name: "Magikarp", type: "Water", color: TYPE_COLORS.Water },
  130: { name: "Gyarados", type: "Water/Flying", color: TYPE_COLORS.Water },

  131: { name: "Lapras", type: "Water/Ice", color: TYPE_COLORS.Water },

  132: { name: "Ditto", type: "Normal", color: TYPE_COLORS.Normal },

  133: { name: "Eevee", type: "Normal", color: TYPE_COLORS.Normal },
  134: { name: "Vaporeon", type: "Water", color: TYPE_COLORS.Water },
  135: { name: "Jolteon", type: "Electric", color: TYPE_COLORS.Electric },
  136: { name: "Flareon", type: "Fire", color: TYPE_COLORS.Fire },

  137: { name: "Porygon", type: "Normal", color: TYPE_COLORS.Normal },

  138: { name: "Omanyte", type: "Rock/Water", color: TYPE_COLORS.Rock },
  139: { name: "Omastar", type: "Rock/Water", color: TYPE_COLORS.Rock },

  140: { name: "Kabuto", type: "Rock/Water", color: TYPE_COLORS.Rock },
  141: { name: "Kabutops", type: "Rock/Water", color: TYPE_COLORS.Rock },

  142: { name: "Aerodactyl", type: "Rock/Flying", color: TYPE_COLORS.Rock },

  143: { name: "Snorlax", type: "Normal", color: TYPE_COLORS.Normal },

  144: { name: "Articuno", type: "Ice/Flying", color: TYPE_COLORS.Ice },
  145: { name: "Zapdos", type: "Electric/Flying", color: TYPE_COLORS.Electric },
  146: { name: "Moltres", type: "Fire/Flying", color: TYPE_COLORS.Fire },

  147: { name: "Dratini", type: "Dragon", color: TYPE_COLORS.Dragon },
  148: { name: "Dragonair", type: "Dragon", color: TYPE_COLORS.Dragon },
  149: { name: "Dragonite", type: "Dragon/Flying", color: TYPE_COLORS.Dragon },

  150: { name: "Mewtwo", type: "Psychic", color: TYPE_COLORS.Psychic },
  151: { name: "Mew", type: "Psychic", color: TYPE_COLORS.Psychic }
};